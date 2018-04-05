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
 * Class to initialize and the SME environment
 *  (Localized string cannot be used in this class due to initialization phase when the strings are not ready yet.)
 */
export declare class CoreEnvironment {
    /**
     * The localization manager once the environment has been initialized
     */
    static localizationManager: LocalizationManager<void>;
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
    /**
     * Ensures Resources are Initialized
     */
    private static ensureResourcesInitialized();
    /**
     * Initialize and load localization data by option settings.
     *
     * @param localizationOptions the options to initialize the Localization Manager
     */
    private static localization(localizationOptions?);
}
