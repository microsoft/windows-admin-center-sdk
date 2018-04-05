import { LocalizationManager, LocalizationManagerOptions } from './localization-manager';
/**
 * Interface for manifest loading.
 */
export interface ManifestLoadingOptions {
    /**
     * Specify shell or module name.
     */
    name: string;
    /**
     * Specify angular-cli production state used by the module loading only.
     */
    isProduction?: boolean;
    /**
     * Specify shell origin URL for sideloading debugging.
     */
    shellOrigin?: string;
}
/**
 * Interface for runtime options.
 */
export interface RuntimeOptions {
    /**
     * Enable websocket if true.
     */
    websocket?: boolean;
}
/**
 * Interface for ElementFocusingEvent.
 */
export interface ElementFocusingEvent {
    /**
     * It indicates the source focus zone.
     */
    sourceZone: HTMLElement;
    /**
     * It indicates the target focus zone.
     */
    targetZone: HTMLElement;
    /**
     * It indicates the target focus element.
     */
    targetElement: HTMLElement;
    /**
     * If this function is called in the event handler, it cancels the default behavior of focusing
     */
    preventDefaultFocusBehavior: () => void;
    /**
     * If this function is called in the event handler, it cancels the default event of focusing
     */
    preventDefaultEvent: () => void;
    nativeEvent: KeyboardEvent;
}
/**
 * Class to initialize and the SME environment
 *  (Localized string cannot be used in this class due to initialization phase when the strings are not ready yet.)
 */
export declare class CoreEnvironment {
    /**
     * The localization manager once the environment has been initialized
     */
    static localizationManager: LocalizationManager<void>;
    /**
     * The CSS class to disable the focus rectangle even in keyboard mode
     */
    static hiddenFocusClass: string;
    /**
     * The CSS class to enable mouse specific accessibility styles
     */
    static mouseNavigationModeClass: string;
    /**
     * The CSS class to enable keyboard specific accessibility styles
     */
    static keyboardNavigationModeClass: string;
    /**
     * The set of elements that have had the hiddenFocusClass applied
     */
    static hiddenFocusElements: HTMLElement[];
    /**
     * The set of events for element focusing.
     */
    private static elementFocusingEvents;
    /**
     * Indicates that body focus class handlers have already been setup and should not be setup again
     */
    private static hiddenFocusHandlersInitialized;
    /**
     * Initializes the environment with manifest loading mode.
     *
     * @param manifestOptions the name of manifest loading options.
     * @param localizationOptions the options to initialize the Localization Manager
     * @param runtimeOptions the optional runtime options.
     */
    static initialize(manifestOptions: ManifestLoadingOptions, localizationOptions: LocalizationManagerOptions, runtimeOptions?: RuntimeOptions): Promise<void[]>;
    /**
     * Injects dynamic assets (css, js, etc..) from the shell
     * This is only meant to be called once during an extensions lifecycle (during init)
     * @param theme the current theme name
     * @param assets the assets to process
     */
    static loadAssets(theme: string, assets: MsftSme.MsftSmeAssets): void;
    static hookupGlobalHandlers(): void;
    /**
     * Registers the event handler for ElementFocusingEvent
     */
    static registerElementFocusingEvent(handler: (event: ElementFocusingEvent) => void): () => void;
    /**
     * focus on given element and prevent the default of the event
     * @param element the element to focus on
     * @param event the event that triggered the focus
     * @param allowBrowserFocusHandling it indicates whether to allow browser to handle focus.
     */
    private static focusOnElement(element, event, allowBrowserFocusHandling?);
    /**
     * Handlers the element focusing in either the default way or custom ways based on ElementFocusingEvent handler.
     */
    static processElementFocusing(event: KeyboardEvent, elementToFocus: HTMLElement, sourceZone: HTMLElement, targetZone: HTMLElement, allowBrowserFocusHandling?: boolean): void;
    /**
     * click on given element and prevent the default of the event
     * @param element the element to click
     * @param event the event that triggered the click
     */
    private static clickOnElement(element, event);
    /**
     * Changes the Accessibility Mode to mouse or keyboard
     * @param keyboardMode indicates that keyboard mode should be set
     */
    static changeAccessibilityMode(keyboardMode: boolean): void;
    /**
     * Ensures Resources are Initialized
     */
    private static ensureResourcesInitialized();
    /**
     * Validate and load localized strings if the localeId doesn't match with current locale Id.
     * @param localeId the local ID to reload.
     */
    static moduleLoadLocale(localeId: string): Promise<void>;
    /**
     * Initialize and load localization data by option settings.
     */
    private static localization();
    /**
     * Check tab list aria-selected with active status
     */
    private static checkActiveTab();
    /**
     * Update tab aria-selected status
     */
    private static updateAriaSelect(currentElement, isActive);
}
