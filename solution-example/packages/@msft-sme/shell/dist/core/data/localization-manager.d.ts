import { Observable } from 'rxjs/Observable';
export declare const defaultSupportedLocales: LocaleIdAndName[];
/**
 * Interface to represent a locale id and it's display name in the actual language
 */
export interface LocaleIdAndName {
    id: string;
    name: string;
}
/**
 * Options to initialize the localization manager
 */
export interface LocalizationManagerOptions {
    /**
     * Indicates if the localization manager should delay loading localized resources
     * defaults to 'false'
     */
    delayLoad?: boolean;
    /**
     * The URL path (relative or absolute)
     * to the resources folder containing the json files with the localized assets.
     * defaults to '/assets/resources' if not specified
     * Ex: '/assets/resources'
     */
    resourcesPath?: string;
    /**
     * The file name format of the json file containing the
     * specified localized strings. The format must have only one parameter and that is the locale name
     * This defaults to '{0}/strings.json'. For Spanish, this is converted to 'es/strings.json'
     * Ex: '{0}/strings.json'
     */
    stringsFileNameFormat?: string;
    /**
     * The file name of the default json file containing the
     * default locale strings to serve as a failback for any string that is not found.
     * This defaults to 'strings.json'
     * Ex: 'strings.json'
     */
    defaultStringsFileName?: string;
    /**
     * The default locale to use. This will be used if we cannot identify
     * the user settings or the file for a given locale doesn't exist or there are missing strings in the
     * locale specific json file.
     * This defaults to 'en'
     * Ex: 'es'
     */
    defaultLocale?: string;
    /**
     * The supported locales for this instance and their display value
     * This defaults to the supported languages defined by SME
     * Ex: [
     *    {
     *        id: 'en',
     *        name: 'English'
     *    },
     *    {
     *        id: 'es',
     *        name: 'Español'
     *    }
     * ]
     */
    supportedLocales?: LocaleIdAndName[];
}
/**
 * Class to retrieve localized resources based on the user locale
 * This class lets you load resources from a json file in an
 * arbitrary location and determines what locale resources to return
 * on the user preference
 */
export declare class LocalizationManager<T> {
    private currentLocale;
    private readonly defaultLocale;
    private readonly resourcesStringFormat;
    private readonly resourcesStringDefaultFile;
    private http;
    supportedLocales: LocaleIdAndName[];
    /**
     * Creates a new instance of the LocalizationManager class that reads the localized assets from
     * the given locations.
     * @param {LocalizationManagerOptions} options? The options to initialize the localization manager
     */
    constructor(options?: LocalizationManagerOptions);
    /**
     * Fetches the localized strings from the server based on the current culture
     * @returns an observable with object the localized strings.
     */
    fetchLocalizedStrings(): Observable<T>;
    /**
     * Gets the current locale
     * @returns The current locale selected by the user
     */
    getCurrentLocale(): string;
    /**
     * Sets the current locale in persistent storage
     * @param locale the string representing the locale selected by the user. Ex: 'es' or 'en'
     */
    setCurrentLocale(locale: string): void;
    private fetchDefaultStrings();
    private fetchCurrentLocaleStrings();
    private getNavigatorLanguage();
}
