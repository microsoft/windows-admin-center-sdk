import { Observable } from 'rxjs/Observable';
/**
 * Interface to represent a locale id and it's display name in the actual language
 */
export interface LocaleSet {
    id: string;
    name: string;
}
/**
 * Options to initialize the localization manager
 */
export interface LocalizationManagerOptions {
    /**
     * The URL path (relative or absolute)
     * to the resources folder containing the json files with the localized assets.
     * defaults to '/assets/strings' if not specified.
     * Ex: '/assets/strings'
     */
    resourcesPath?: string;
}
/**
 * Class to retrieve localized resources based on the user locale
 * This class lets you load resources from a json file in an
 * arbitrary location and determines what locale resources to return
 * on the user preference
 */
export declare class LocalizationManager<T> {
    static localStorageLocaleKey: string;
    static supportedLocales: LocaleSet[];
    private static defaultResourcesStringsFolder;
    private static resourcesStringsFile;
    private static resourcesStringsFileFormat;
    private readonly defaultLocaleId;
    private readonly resourcesStringFormat;
    private readonly resourcesStringDefaultFile;
    private http;
    private localeIdInternal;
    /**
     * Initializes a new instance of the LocalizationManager class that reads the localized assets from
     * the given locations.
     * @param {LocalizationManagerOptions} options? The options to initialize the localization manager.
     */
    constructor(options?: LocalizationManagerOptions);
    /**
     * Gets current locale.
     * @return string the locale string.
     */
    readonly localeId: string;
    /**
     * Gets the navigator language
     */
    readonly navigatorLanguage: string;
    /**
     * Sets the current locale in persistent storage
     * @param localeId the string representing the locale selected by the user. Ex: 'es' or 'en'
     */
    saveLocale(localeId: string): void;
    /**
     * Fetches the localized strings from the server based on the current culture.
     * @returns an observable with object the localized strings.
     */
    fetchLocalizedStrings(): Observable<T>;
    /**
     * Gets the current locale
     * @returns The current locale selected by the user
     */
    getLocaleId(): string;
    private fetchDefaultStrings();
    private fetchLocaleStrings();
    getNavigatorLanguage(): string;
}
