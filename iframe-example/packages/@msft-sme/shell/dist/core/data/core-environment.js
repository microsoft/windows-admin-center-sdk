import { LogLevel } from '../diagnostics/log-level';
import { EnvironmentModule } from '../manifest/environment-modules';
import { ManifestLoader } from '../manifest/manifest-loader';
import { LocalizationManager } from './localization-manager';
import { NativeQ } from './native-q';
/**
 * Class to initialize and the SME environment
 *  (Localized string cannot be used in this class due to initialization phase when the strings are not ready yet.)
 */
var CoreEnvironment = /** @class */ (function () {
    function CoreEnvironment() {
    }
    /**
     * Initializes the environment with manifest loading mode.
     *
     * @param manifestOptions the name of manifest loading options.
     * @param localizationOptions the options to initialize the Localization Manager
     * @param runtimeOptions the optional runtime options.
     */
    CoreEnvironment.initialize = function (manifestOptions, localizationOptions, runtimeOptions) {
        if (!manifestOptions || !manifestOptions.name) {
            // no localization.
            throw new Error('CoreEnvironment.initialize() - Argument error: manifestOptions.');
        }
        var sessionId = MsftSme.newGuid();
        var logLevel = MsftSme.consoleDebug() === null ? LogLevel.Warning : MsftSme.consoleDebug();
        var self = MsftSme.self();
        if (manifestOptions.name === EnvironmentModule.nameOfShell) {
            // shell manifest loading
            self.Init = {
                mode: 2 /* Load */,
                moduleName: manifestOptions.name,
                isProduction: manifestOptions.isProduction,
                sessionId: sessionId,
                logLevel: logLevel
            };
        }
        else if (manifestOptions.isProduction) {
            // module on the production using the same site origin from location information
            // if not specified by manifestOptions.shellOrigin.
            self.Init = {
                mode: 1 /* LoadEmbedded */,
                moduleName: manifestOptions.name,
                isProduction: manifestOptions.isProduction,
                shellOrigin: manifestOptions && manifestOptions.shellOrigin ? manifestOptions.shellOrigin : window.location.origin,
                sessionId: 'N/A',
                logLevel: logLevel
            };
        }
        else {
            // module side-loading manifest. non production environment accept any shell origin.
            self.Init = {
                mode: 1 /* LoadEmbedded */,
                moduleName: manifestOptions.name,
                isProduction: manifestOptions.isProduction,
                shellOrigin: '*',
                sessionId: 'N/A',
                logLevel: logLevel
            };
        }
        // enable websocket stream query only if requested.
        if (runtimeOptions && runtimeOptions.websocket) {
            self.Init.websocket = true;
        }
        CoreEnvironment.localizationManager = new LocalizationManager(localizationOptions);
        // initialize resources
        CoreEnvironment.ensureResourcesInitialized();
        // hookup global handlers
        CoreEnvironment.hookupGlobalHandlers();
        return Promise.all([ManifestLoader.loadManifest(), CoreEnvironment.localization()]);
    };
    /**
     * Injects dynamic assets (css, js, etc..) from the shell
     * This is only meant to be called once during an extensions lifecycle (during init)
     * @param theme the current theme name
     * @param assets the assets to process
     */
    CoreEnvironment.loadAssets = function (theme, assets) {
        CoreEnvironment.ensureResourcesInitialized();
        var self = MsftSme.self();
        self.Resources.theme = theme;
        self.Resources.assets = assets;
        // apply the theme class to the body of the document
        document.body.classList.add("sme-theme-" + theme);
        if (!assets) {
            return;
        }
        // get the page header
        var head = document.getElementsByTagName('head')[0];
        // inject css tags into header
        if (assets.css) {
            assets.css.forEach(function (href) {
                var link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('type', 'text/css');
                link.setAttribute('href', href);
                head.appendChild(link);
            });
        }
        /**
         * The js injection mechanism below is subject to the following attack:
         *
         * 1. User visits malicious website (MW) from their workstation
         * 2. MW randomly or sequentially opens hidden iframes to localhost on various ports.
         * 3. once each iframe loads it send rpc init and inpersonates the shell side of the communication channel
         * 4. The iframe will respond because it trusts * domains for onMessage requests. (this is a basic requirement of our infastructure)
         * 5. The MW can then inject any javascript it wants into the module and presumably knows the gateway is running on the same port.
         * 6. Because we use windows authentication, the MW can execute powershell requests on any servers the user has access to.
         * 7. The MW has now compromised the server acting as the user.
         *
         * How to fix:
         * In order for this to work, we need an ironclad way of validating that our parent is the shell.
         * some possibilities are:
         *
         * 1. Three way handshake with gateway to discover the only acceptable shell origin.
         *      a. this could be done with javascript or it could be a static file that the module always reads at startup
         * 2. certificate based authentication before rpc communication
         * 3. other methods?
         *
         * Disabling until we have a more solid use case and we know the most secure way to achieve this functionality.
         */
        // // inject js tags into header
        // if (assets.js) {
        //     assets.js.forEach(href => {
        //         let script = document.createElement('script');
        //         script.setAttribute('type', 'text/javascript');
        //         script.setAttribute('src', href);
        //         head.appendChild(script);
        //     });
        // }
    };
    CoreEnvironment.hookupGlobalHandlers = function () {
        var _this = this;
        // hookup body focus class handlers.
        // We do not need to unhook these as they last the entire applications lifecycle.
        if (!CoreEnvironment.hiddenFocusHandlersInitialized) {
            // ensure this is only called once
            CoreEnvironment.hiddenFocusHandlersInitialized = true;
            // apply the mouse navigation class to the body of the document as default
            CoreEnvironment.changeAccessibilityMode(false);
            // when the user clicks on the page, we need to exit keyboard mode and enter mouse mode again
            document.body.addEventListener('mousedown', function (event) {
                CoreEnvironment.changeAccessibilityMode(false);
                setTimeout(function () { return _this.checkActiveTab(); }, 0);
            });
            document.body.addEventListener('keydown', function (event) {
                var isKeyboardMode = MsftSme.self().Resources.accessibilityMode;
                var currentElement = event.target;
                var currentTrap = MsftSme.getAncestorTrap(currentElement);
                var currentForm = MsftSme.getAncestorForm(currentElement);
                var keyCode = event.keyCode;
                setTimeout(function () { return _this.checkActiveTab(); }, 0);
                if (event.shiftKey && keyCode === MsftSme.KeyCode.Tab) {
                    // current element in a trap, shift-tab should go to previous focusable element
                    if (currentTrap) {
                        _this.focusOnElement(MsftSme.getPreviousFocusableElementInTrap(currentElement), event);
                    }
                    else {
                        var focusOn = MsftSme.getPreviousFocusableElement(currentElement);
                        // if we are in a form, use shift tab to navigate through form
                        // unless we are at the beginning of the form
                        if (currentForm && focusOn !== currentElement) {
                            _this.focusOnElement(focusOn, event);
                        }
                        else {
                            // shift tab - go back to previous zone
                            focusOn = MsftSme.getPreviousZoneElement(currentElement);
                            var currentZone = MsftSme.getAncestorZone(currentElement);
                            var targetZone = MsftSme.getAncestorZone(focusOn);
                            if (focusOn !== currentElement) {
                                CoreEnvironment.processElementFocusing(event, focusOn, currentZone, targetZone);
                            }
                            // else we are at the beginning of the page and want shift tab to perform its default action
                        }
                    }
                }
                else if (keyCode === MsftSme.KeyCode.Tab) {
                    // when the user presses 'tab' we will enter keyboard mode
                    CoreEnvironment.changeAccessibilityMode(true);
                    // current element in a trap, tab should go to next focusable element
                    if (currentTrap) {
                        _this.focusOnElement(MsftSme.getNextFocusableElementInTrap(currentElement), event);
                    }
                    else {
                        var focusOn = MsftSme.getNextFocusableElement(currentElement);
                        // if we are in a form, use tab to navigate through form
                        // unless we are at the end of the form
                        if (currentForm && focusOn !== currentElement) {
                            _this.focusOnElement(focusOn, event);
                        }
                        else {
                            var currentZone = MsftSme.getAncestorZone(currentElement);
                            var nextElement = MsftSme.getNextFocusableElement(currentElement);
                            focusOn = MsftSme.getNextZoneElement(currentElement);
                            var targetZone = MsftSme.getAncestorZone(focusOn);
                            // Check and move to next element
                            if (currentZone && currentZone.tagName === 'FORM' && currentElement !== nextElement) {
                                _this.focusOnElement(nextElement, event);
                            }
                            else if (focusOn && targetZone !== currentZone) {
                                // go to next zone
                                CoreEnvironment.processElementFocusing(event, focusOn, currentZone, targetZone);
                            }
                            else {
                                // else we are at the end of the page and want tab to perform its default action
                                var lastElement = MsftSme.getLastElementInZone(currentElement);
                                if (lastElement) {
                                    CoreEnvironment.processElementFocusing(event, lastElement, currentZone, targetZone, true);
                                }
                            }
                        }
                    }
                }
                else if (keyCode === MsftSme.KeyCode.RightArrow && !currentTrap && !currentForm) {
                    // use default if the cursor is in the middle of search box text
                    var useArrowKeys = MsftSme.useArrowKeysWithinSearchbox(currentElement, true);
                    if (!useArrowKeys && isKeyboardMode) {
                        // go to next focusable element within current zone
                        _this.focusOnElement(MsftSme.getNextFocusableElement(currentElement), event);
                    }
                }
                else if (keyCode === MsftSme.KeyCode.DownArrow && !currentTrap && !currentForm) {
                    // go to next focusable element within current zone
                    _this.focusOnElement(MsftSme.getNextFocusableElement(currentElement), event);
                }
                else if (keyCode === MsftSme.KeyCode.UpArrow && !currentTrap && !currentForm) {
                    // go to previous focusable element within current zone
                    _this.focusOnElement(MsftSme.getPreviousFocusableElement(currentElement), event);
                }
                else if (event.keyCode === MsftSme.KeyCode.LeftArrow && !currentTrap && !currentForm) {
                    // use default if the cursor is in the middle of search box text
                    var useArrowKeys = MsftSme.useArrowKeysWithinSearchbox(currentElement, false);
                    if (!useArrowKeys && isKeyboardMode) {
                        // go to previous focusable element within current zone
                        _this.focusOnElement(MsftSme.getPreviousFocusableElement(currentElement), event);
                    }
                }
                else if (event.keyCode === MsftSme.KeyCode.Enter) {
                    if (document.body.classList.contains(CoreEnvironment.keyboardNavigationModeClass)) {
                        var ancestorZone = MsftSme.getAncestorZone(currentElement);
                        if (ancestorZone && ancestorZone.tagName !== 'FORM') {
                            _this.clickOnElement(currentElement, event);
                        }
                    }
                }
                else if (event.keyCode === MsftSme.KeyCode.End && !MsftSme.isSearchBox(currentElement) && !currentForm) {
                    _this.focusOnElement(MsftSme.getLastElementInZone(currentElement), event);
                }
                else if (event.keyCode === MsftSme.KeyCode.Home && !MsftSme.isSearchBox(currentElement) && !currentForm) {
                    _this.focusOnElement(MsftSme.getFirstElementInZone(currentElement), event);
                }
            });
        }
    };
    /**
     * Registers the event handler for ElementFocusingEvent
     */
    CoreEnvironment.registerElementFocusingEvent = function (handler) {
        var unregisterEventFunction = function () {
            var index = CoreEnvironment.elementFocusingEvents.indexOf(handler);
            if (index !== -1) {
                CoreEnvironment.elementFocusingEvents.splice(index, 1);
            }
        };
        CoreEnvironment.elementFocusingEvents.push(handler);
        return unregisterEventFunction;
    };
    /**
     * focus on given element and prevent the default of the event
     * @param element the element to focus on
     * @param event the event that triggered the focus
     * @param allowBrowserFocusHandling it indicates whether to allow browser to handle focus.
     */
    CoreEnvironment.focusOnElement = function (element, event, allowBrowserFocusHandling) {
        if (element) {
            element.focus();
            if (!allowBrowserFocusHandling) {
                event.preventDefault();
            }
        }
    };
    /**
     * Handlers the element focusing in either the default way or custom ways based on ElementFocusingEvent handler.
     */
    CoreEnvironment.processElementFocusing = function (event, elementToFocus, sourceZone, targetZone, allowBrowserFocusHandling) {
        var useCustomFocusHandling = false;
        var preventDefaultEvent = false;
        CoreEnvironment.elementFocusingEvents.forEach(function (focusEvent) {
            focusEvent({
                nativeEvent: event,
                sourceZone: sourceZone,
                targetZone: targetZone,
                targetElement: elementToFocus,
                preventDefaultFocusBehavior: function () {
                    useCustomFocusHandling = true;
                },
                preventDefaultEvent: function () {
                    preventDefaultEvent = true;
                }
            });
        });
        if (useCustomFocusHandling) {
            if (preventDefaultEvent) {
                event.stopPropagation();
                event.preventDefault();
            }
        }
        else {
            this.focusOnElement(elementToFocus, event, allowBrowserFocusHandling);
        }
    };
    /**
     * click on given element and prevent the default of the event
     * @param element the element to click
     * @param event the event that triggered the click
     */
    CoreEnvironment.clickOnElement = function (element, event) {
        if (element) {
            element.click();
            event.preventDefault();
        }
    };
    /**
     * Changes the Accessibility Mode to mouse or keyboard
     * @param keyboardMode indicates that keyboard mode should be set
     */
    CoreEnvironment.changeAccessibilityMode = function (keyboardMode) {
        // toggle accessibility mode across all iframes in the document
        // only works for same origin iframes
        // TODO: support cross origin iframes and replace this with RPC broadcasting to all iframes
        var allBodys = MsftSme.getAllBodys();
        for (var i = 0; i < allBodys.length; i++) {
            var currentBody = allBodys[i];
            currentBody.classList.toggle(CoreEnvironment.mouseNavigationModeClass, !keyboardMode);
            currentBody.classList.toggle(CoreEnvironment.keyboardNavigationModeClass, keyboardMode);
        }
        // register accessibility mode with self so RPC can use it
        var self = MsftSme.self();
        self.Resources.accessibilityMode = keyboardMode;
    };
    /**
     * Ensures Resources are Initialized
     */
    CoreEnvironment.ensureResourcesInitialized = function () {
        var self = MsftSme.self();
        if (!self.Resources) {
            var locale = CoreEnvironment.localizationManager.getLocaleId();
            self.Resources = { strings: {}, localeId: locale };
        }
    };
    /**
     * Validate and load localized strings if the localeId doesn't match with current locale Id.
     * @param localeId the local ID to reload.
     */
    CoreEnvironment.moduleLoadLocale = function (localeId) {
        if (CoreEnvironment.localizationManager.localeId !== localeId) {
            CoreEnvironment.localizationManager.saveLocale(localeId);
            return CoreEnvironment.localization();
        }
        return NativeQ.resolved();
    };
    /**
     * Initialize and load localization data by option settings.
     */
    CoreEnvironment.localization = function () {
        var self = MsftSme.self();
        return CoreEnvironment.localizationManager.fetchLocalizedStrings()
            .toPromise()
            .then(function (strings) { return self.Resources.strings = strings; });
    };
    /**
     * Check tab list aria-selected with active status
     */
    CoreEnvironment.checkActiveTab = function () {
        var tablists = document.querySelectorAll("[role='tablist']");
        for (var _i = 0, _a = Array.from(tablists); _i < _a.length; _i++) {
            var tablist = _a[_i];
            this.updateAriaSelect(tablist, false);
        }
    };
    /**
     * Update tab aria-selected status
     */
    CoreEnvironment.updateAriaSelect = function (currentElement, isActive) {
        if (!currentElement) {
            return;
        }
        if (currentElement.classList.contains('active') || currentElement.classList.contains('sme-active')) {
            isActive = true;
        }
        if (currentElement.getAttribute('aria-selected') && !isActive) {
            currentElement.setAttribute('aria-selected', 'false');
        }
        if (currentElement.getAttribute('role') === 'tab' && isActive) {
            currentElement.setAttribute('aria-selected', 'true');
        }
        for (var _i = 0, _a = Array.from(currentElement.children); _i < _a.length; _i++) {
            var childElement = _a[_i];
            this.updateAriaSelect(childElement, isActive);
        }
    };
    /**
     * The CSS class to disable the focus rectangle even in keyboard mode
     */
    CoreEnvironment.hiddenFocusClass = 'sme-hidden-focus';
    /**
     * The CSS class to enable mouse specific accessibility styles
     */
    CoreEnvironment.mouseNavigationModeClass = 'sme-accessibility-mode-mouse';
    /**
     * The CSS class to enable keyboard specific accessibility styles
     */
    CoreEnvironment.keyboardNavigationModeClass = 'sme-accessibility-mode-keyboard';
    /**
     * The set of elements that have had the hiddenFocusClass applied
     */
    CoreEnvironment.hiddenFocusElements = [];
    /**
     * The set of events for element focusing.
     */
    CoreEnvironment.elementFocusingEvents = [];
    /**
     * Indicates that body focus class handlers have already been setup and should not be setup again
     */
    CoreEnvironment.hiddenFocusHandlersInitialized = false;
    return CoreEnvironment;
}());
export { CoreEnvironment };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9jb3JlLWVudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUE4QixNQUFNLHdCQUF3QixDQUFDO0FBQ3pGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFpRXJDOzs7R0FHRztBQUNIO0lBQUE7SUF1YkEsQ0FBQztJQXBaRzs7Ozs7O09BTUc7SUFDVywwQkFBVSxHQUF4QixVQUNJLGVBQXVDLEVBQ3ZDLG1CQUErQyxFQUMvQyxjQUErQjtRQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVDLG1CQUFtQjtZQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLGlFQUFpRSxDQUFDLENBQUM7UUFDdkYsQ0FBQztRQUVELElBQUksU0FBUyxHQUFXLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQyxJQUFJLFFBQVEsR0FBYSxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckcsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEtBQUssaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN6RCx5QkFBeUI7WUFDekIsSUFBSSxDQUFDLElBQUksR0FBRztnQkFDUixJQUFJLGNBQThCO2dCQUNsQyxVQUFVLEVBQUUsZUFB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QVksQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDN0QsY0FBYyxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUNELEdBQUcsQ0FBQyxDQUFxQixVQUFtQyxFQUFuQyxLQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFuQyxjQUFtQyxFQUFuQyxJQUFtQztZQUF2RCxJQUFJLFlBQVksU0FBQTtZQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBMkIsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUMvRDtJQUNKLENBQUM7SUFoYkY7O09BRUc7SUFDVyxnQ0FBZ0IsR0FBRyxrQkFBa0IsQ0FBQztJQUNwRDs7T0FFRztJQUNXLHdDQUF3QixHQUFHLDhCQUE4QixDQUFDO0lBRXhFOztPQUVHO0lBQ1csMkNBQTJCLEdBQUcsaUNBQWlDLENBQUM7SUFFOUU7O09BRUc7SUFDVyxtQ0FBbUIsR0FBa0IsRUFBRSxDQUFDO0lBRXREOztPQUVHO0lBQ1kscUNBQXFCLEdBQThDLEVBQUUsQ0FBQztJQUVyRjs7T0FFRztJQUNZLDhDQUE4QixHQUFHLEtBQUssQ0FBQztJQXNaMUQsc0JBQUM7Q0F2YkQsQUF1YkMsSUFBQTtTQXZiWSxlQUFlIiwiZmlsZSI6ImNvcmUtZW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9