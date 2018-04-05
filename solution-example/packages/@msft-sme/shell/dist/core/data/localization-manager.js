import { Observable } from 'rxjs/Observable';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { Http } from './http';
var localStorageLocaleKey = 'sme-userLocale';
var defaultResourcesStringsFolder = 'assets/resources';
var defaultResourcesStringsFileFormat = '{0}/strings.json';
var defaultResourcesStringsFile = 'strings.json';
var defaultGlobalLocale = 'en';
export var defaultSupportedLocales = [
    {
        id: 'en',
        name: 'English'
    }
];
/**
 * Class to retrieve localized resources based on the user locale
 * This class lets you load resources from a json file in an
 * arbitrary location and determines what locale resources to return
 * on the user preference
 */
var LocalizationManager = (function () {
    /**
     * Creates a new instance of the LocalizationManager class that reads the localized assets from
     * the given locations.
     * @param {LocalizationManagerOptions} options? The options to initialize the localization manager
     */
    function LocalizationManager(options) {
        var _this = this;
        var resourcesPath = options && options.resourcesPath;
        var stringsFileNameFormat = options && options.stringsFileNameFormat;
        var defaultStringsFileName = options && options.defaultStringsFileName;
        var defaultLocale = options && options.defaultLocale;
        var supportedLocales = options && options.supportedLocales;
        if (resourcesPath) {
            resourcesPath = resourcesPath.trim();
        }
        else {
            resourcesPath = defaultResourcesStringsFolder;
        }
        if (stringsFileNameFormat) {
            stringsFileNameFormat = stringsFileNameFormat.trim();
        }
        else {
            stringsFileNameFormat = defaultResourcesStringsFileFormat;
        }
        if (defaultStringsFileName) {
            defaultStringsFileName = defaultStringsFileName.trim();
        }
        else {
            defaultStringsFileName = defaultResourcesStringsFile;
        }
        if (supportedLocales) {
            // create a copy
            this.supportedLocales = supportedLocales.slice(0);
        }
        else {
            this.supportedLocales = defaultSupportedLocales.slice(0);
        }
        if (defaultLocale) {
            this.defaultLocale = defaultLocale.trim();
        }
        else {
            this.defaultLocale = defaultGlobalLocale;
        }
        var defaultLocaleIdAndName = this.supportedLocales.find(function (supportedLocale) { return supportedLocale.id.localeCompareIgnoreCase(_this.defaultLocale) === 0; });
        if (!defaultLocaleIdAndName) {
            throw new Error("The default locale specified: " + this.defaultLocale + " is not defined in the array of " +
                ("supported locales " + JSON.stringify(this.supportedLocales)));
        }
        resourcesPath = resourcesPath + ((!resourcesPath.endsWith('/')) ? '/' : null);
        this.resourcesStringFormat = resourcesPath + stringsFileNameFormat;
        this.resourcesStringDefaultFile = resourcesPath + defaultStringsFileName;
        this.http = new Http();
    }
    /**
     * Fetches the localized strings from the server based on the current culture
     * @returns an observable with object the localized strings.
     */
    LocalizationManager.prototype.fetchLocalizedStrings = function () {
        var currentLocale = this.getCurrentLocale();
        if (currentLocale === this.defaultLocale) {
            // Only fetch the default locale
            return this.fetchDefaultStrings();
        }
        // TODO: Once the localization team is engaged we can remove this code and just fetch the
        // locale and be sure that it exists
        return this.fetchDefaultStrings().zip(this.fetchCurrentLocaleStrings(), function (englishStrings, currentLocaleStrings) {
            // get the english strings and replace those properties of the localized json
            var strings;
            if (currentLocaleStrings) {
                return currentLocaleStrings;
            }
            return englishStrings;
        });
    };
    /**
     * Gets the current locale
     * @returns The current locale selected by the user
     */
    LocalizationManager.prototype.getCurrentLocale = function () {
        if (!this.currentLocale) {
            // TODO: Read the locale from the user settings,
            var locale_1 = localStorage.getItem(localStorageLocaleKey);
            if (!locale_1) {
                // Now we read the browser locales and if it's supported, then we use that;
                // otherwise use default locale
                var navigatorLanguage = this.getNavigatorLanguage();
                if (navigatorLanguage) {
                    locale_1 = navigatorLanguage.toLocaleLowerCase();
                }
                if (!locale_1) {
                    locale_1 = this.defaultLocale;
                }
            }
            // now check if if the locale is supported
            var localeIdAndName = this.supportedLocales.find(function (supportedLocale) {
                return supportedLocale.id.localeCompareIgnoreCase(locale_1) === 0;
            });
            // Try with the first part only
            if (!localeIdAndName) {
                var majorLocale_1 = locale_1.split('-')[0];
                localeIdAndName = this.supportedLocales.find(function (supportedLocale) {
                    return supportedLocale.id.localeCompareIgnoreCase(majorLocale_1) === 0;
                });
                // Try with the first part of both the locale and supported locale
                if (!localeIdAndName) {
                    localeIdAndName = this.supportedLocales.find(function (supportedLocale) {
                        return supportedLocale.id.split('-')[0].localeCompareIgnoreCase(majorLocale_1) === 0;
                    });
                }
            }
            if (!localeIdAndName) {
                Logging.log({
                    source: 'LocaliaztionManager',
                    level: LogLevel.Warning,
                    message: "The current user locale: " + locale_1 + " is not defined in the array of " +
                        ("supported locales " + JSON.stringify(this.supportedLocales) + " so we will use the ") +
                        ("first supported locale: " + JSON.stringify(this.supportedLocales[0]))
                });
                localeIdAndName = this.supportedLocales[0];
            }
            this.currentLocale = localeIdAndName.id.toLocaleLowerCase();
        }
        return this.currentLocale;
    };
    /**
     * Sets the current locale in persistent storage
     * @param locale the string representing the locale selected by the user. Ex: 'es' or 'en'
     */
    LocalizationManager.prototype.setCurrentLocale = function (locale) {
        var defaultLocaleIdAndName = this.supportedLocales.find(function (supportedLocale) { return supportedLocale.id.localeCompareIgnoreCase(locale) === 0; });
        if (!defaultLocaleIdAndName) {
            throw new Error("The default locale specified: " + locale + " is not defined in the array of " +
                ("supported locales " + JSON.stringify(this.supportedLocales)));
        }
        localStorage.setItem(localStorageLocaleKey, locale);
    };
    LocalizationManager.prototype.fetchDefaultStrings = function () {
        var _this = this;
        return this.http.getNoCache(this.resourcesStringDefaultFile)
            .catch(function (error, caught) {
            if (error.status >= 400) {
                // If we got any error, we just reply with that error and the map function will handle it
                Logging.log({
                    source: 'LocaliaztionManager',
                    level: LogLevel.Error,
                    message: "Error " + error.status + " received when getting default localized strings for the " +
                        (_this.defaultLocale + " locale. The error was: " + error.message)
                });
            }
            return Observable.throw(error);
        }).map(function (result) {
            return result.response.Strings;
        });
    };
    LocalizationManager.prototype.fetchCurrentLocaleStrings = function () {
        var _this = this;
        return this.http.getNoCache(this.resourcesStringFormat.format(this.getCurrentLocale()))
            .catch(function (error, caught) {
            if (error.status >= 400) {
                // If we got any error, we just reply with that error and the map function will handle it
                Logging.log({
                    source: 'LocaliaztionManager',
                    level: LogLevel.Warning,
                    message: "Error " + error.status + " received when getting localized strings for the " +
                        ("user specified locale: '" + _this.getCurrentLocale() + "'. The error was: " + error.message)
                });
                return Observable.of({});
            }
        }).map(function (result) {
            // If response has body, use that
            if (!result || !result.response) {
                return null;
            }
            return result.response.Strings;
        });
    };
    LocalizationManager.prototype.getNavigatorLanguage = function () {
        return navigator.language;
    };
    return LocalizationManager;
}());
export { LocalizationManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9sb2NhbGl6YXRpb24tbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXBELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRTlCLElBQU0scUJBQXFCLEdBQUcsZ0JBQWdCLENBQUM7QUFFL0MsSUFBTSw2QkFBNkIsR0FBRyxrQkFBa0IsQ0FBQztBQUN6RCxJQUFNLGlDQUFpQyxHQUFHLGtCQUFrQixDQUFDO0FBQzdELElBQU0sMkJBQTJCLEdBQUcsY0FBYyxDQUFDO0FBQ25ELElBQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0FBQ2pDLE1BQU0sQ0FBQyxJQUFNLHVCQUF1QixHQUF1QjtJQUNuRDtRQUNJLEVBQUUsRUFBRSxJQUFJO1FBQ1IsSUFBSSxFQUFFLFNBQVM7S0FDbEI7Q0FDSixDQUFDO0FBNkVOOzs7OztHQUtHO0FBQ0g7SUFRSTs7OztPQUlHO0lBQ0gsNkJBQ0ksT0FBb0M7UUFEeEMsaUJBb0RDO1FBbERHLElBQUksYUFBYSxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ3JELElBQUkscUJBQXFCLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztRQUNyRSxJQUFJLHNCQUFzQixHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsc0JBQXNCLENBQUM7UUFDdkUsSUFBSSxhQUFhLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDckQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDO1FBRTNELEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDaEIsYUFB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QUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFvQjtZQUN4QixNQUFNLENBQXlCLE1BQU0sQ0FBQyxRQUFTLENBQUMsT0FBTyxDQUFDO1FBQzVELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLHVEQUF5QixHQUFqQztRQUFBLGlCQXFCQztRQXBCRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2FBQ3RGLEtBQUssQ0FBQyxVQUFDLEtBQWdCLEVBQUUsTUFBZ0M7WUFDdEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0Qix5RkFBeUY7Z0JBQ3pGLE9BQU8sQ0FBQyxHQUFHLENBQVk7b0JBQ25CLE1BQU0sRUFBRSxxQkFBcUI7b0JBQzdCLEtBQUssRUFBRSxRQUFRLENBQUMsT0FBTztvQkFDdkIsT0FBTyxFQUFFLFdBQVMsS0FBSyxDQUFDLE1BQU0sc0RBQW1EO3lCQUNqRiw2QkFBMkIsS0FBSSxDQUFDLGdCQUFnQixFQUFFLDBCQUFxQixLQUFLLENBQUMsT0FBUyxDQUFBO2lCQUN6RixDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0IsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQW9CO1lBQ3hCLGlDQUFpQztZQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFFRCxNQUFNLENBQXlCLE1BQU0sQ0FBQyxRQUFTLENBQUMsT0FBTyxDQUFDO1FBQzVELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGtEQUFvQixHQUE1QjtRQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQzlCLENBQUM7SUFDTCwwQkFBQztBQUFELENBeE5BLEFBd05DLElBQUEiLCJmaWxlIjoibG9jYWxpemF0aW9uLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9