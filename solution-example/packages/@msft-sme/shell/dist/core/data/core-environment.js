import { LogLevel } from '../diagnostics/log-level';
import { EnvironmentModule } from '../manifest/environment-modules';
import { ManifestLoader } from '../manifest/manifest-loader';
import { LocalizationManager } from './localization-manager';
/**
 * Class to initialize and the SME environment
 *  (Localized string cannot be used in this class due to initialization phase when the strings are not ready yet.)
 */
var CoreEnvironment = (function () {
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
        var global = window;
        if (manifestOptions.name === EnvironmentModule.nameOfShell) {
            // shell manifest loading 
            global.MsftSme.Init = {
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
            global.MsftSme.Init = {
                mode: 1 /* LoadEmbedded */,
                moduleName: manifestOptions.name,
                isProduction: manifestOptions.isProduction,
                shellOrigin: manifestOptions && manifestOptions.shellOrigin ? manifestOptions.shellOrigin : global.location.origin,
                sessionId: 'N/A',
                logLevel: logLevel
            };
        }
        else {
            // module side-loading manifest. non production environment accept any shell origin.
            global.MsftSme.Init = {
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
            global.MsftSme.Init.websocket = true;
        }
        CoreEnvironment.ensureResourcesInitialized();
        return Promise.all([ManifestLoader.loadManifest(), CoreEnvironment.localization(localizationOptions)]);
    };
    /**
     * Injects dynamic assets (css, js, etc..) from the shell
     * This is only meant to be called once during an extensions lifecycle (during init)
     * @param theme the current theme name
     * @param assets the assets to process
     */
    CoreEnvironment.loadAssets = function (theme, assets) {
        CoreEnvironment.ensureResourcesInitialized();
        var global = window;
        global.MsftSme.Resources.theme = theme;
        global.MsftSme.Resources.assets = assets;
        // apply the theme class to the body of the document
        var body = document.getElementsByTagName('body')[0];
        body.classList.add("sme-theme-" + theme);
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
         * Disabling untill we have a more solid use case and we know the most secure way to achieve this functionality.
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
    /**
     * Ensures Resources are Initialized
     */
    CoreEnvironment.ensureResourcesInitialized = function () {
        var global = window;
        if (!global.MsftSme.Resources) {
            global.MsftSme.Resources = {};
        }
    };
    /**
     * Initialize and load localization data by option settings.
     *
     * @param localizationOptions the options to initialize the Localization Manager
     */
    CoreEnvironment.localization = function (localizationOptions) {
        var global = window;
        CoreEnvironment.localizationManager = new LocalizationManager(localizationOptions);
        var currentLocale = CoreEnvironment.localizationManager.getCurrentLocale();
        global.MsftSme.Resources.strings = {};
        global.MsftSme.Resources.currentLocale = currentLocale;
        global.MsftSme.Resources.localizationManger = CoreEnvironment.localizationManager;
        // If the consumer doesn't want to load the localization data then we just return
        if (localizationOptions && localizationOptions.delayLoad) {
            return Promise.resolve();
        }
        return CoreEnvironment.localizationManager.fetchLocalizedStrings().toPromise().then(function (stringResources) {
            global.MsftSme.Resources.strings = stringResources;
        });
    };
    return CoreEnvironment;
}());
export { CoreEnvironment };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9jb3JlLWVudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUE4QixNQUFNLHdCQUF3QixDQUFDO0FBaUN6Rjs7O0dBR0c7QUFDSDtJQUFBO0lBc0tBLENBQUM7SUFoS0c7Ozs7OztPQU1HO0lBQ1csMEJBQVUsR0FBeEIsVUFDSSxlQUF1QyxFQUN2QyxtQkFBK0MsRUFDL0MsY0FBK0I7UUFDL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QyxtQkFBbUI7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFFRCxJQUFJLFNBQVMsR0FBVyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUMsSUFBSSxRQUFRLEdBQWEsT0FBTyxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyRyxJQUFJLE1BQU0sR0FBMkIsTUFBTSxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEtBQUssaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN6RCwwQkFBMEI7WUFDMUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUc7Z0JBQ2xCLElBQUksY0FBOEI7Z0JBQ2xDLFVBQVUsRUFBRSxlQUFlLENBQUMsSUFBSTtnQkFDaEMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxZQUFZO2dCQUMxQyxTQUFTLEVBQUUsU0FB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QUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXFCRztRQUVILGdDQUFnQztRQUNoQyxtQkFBbUI7UUFDbkIsa0NBQWtDO1FBQ2xDLHlEQUF5RDtRQUN6RCwwREFBMEQ7UUFDMUQsNENBQTRDO1FBQzVDLG9DQUFvQztRQUNwQyxVQUFVO1FBQ1YsSUFBSTtJQUNSLENBQUM7SUFFRDs7T0FFRztJQUNZLDBDQUEwQixHQUF6QztRQUNJLElBQUksTUFBTSxHQUEyQixNQUFNLENBQUM7UUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQTZCLEVBQUUsQ0FBQztRQUM1RCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDWSw0QkFBWSxHQUEzQixVQUE0QixtQkFBZ0Q7UUFDeEUsSUFBSSxNQUFNLEdBQTJCLE1BQU0sQ0FBQztRQUM1QyxlQUFlLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxtQkFBbUIsQ0FBTSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3hGLElBQU0sYUFBYSxHQUFHLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzdFLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUN2RCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsR0FBRyxlQUFlLENBQUMsbUJBQW1CLENBQUM7UUFFbEYsaUZBQWlGO1FBQ2pGLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixJQUFJLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3QixDQUFDO1FBRUQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLGVBQW9CO1lBQ3JHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQXRLQSxBQXNLQyxJQUFBIiwiZmlsZSI6ImNvcmUtZW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9