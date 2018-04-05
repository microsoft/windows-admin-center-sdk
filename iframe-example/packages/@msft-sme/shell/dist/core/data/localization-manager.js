import { Observable } from 'rxjs/Observable';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { Http } from './http';
/**
 * Class to retrieve localized resources based on the user locale
 * This class lets you load resources from a json file in an
 * arbitrary location and determines what locale resources to return
 * on the user preference
 */
var LocalizationManager = /** @class */ (function () {
    /**
     * Initializes a new instance of the LocalizationManager class that reads the localized assets from
     * the given locations.
     * @param {LocalizationManagerOptions} options? The options to initialize the localization manager.
     */
    function LocalizationManager(options) {
        this.defaultLocaleId = LocalizationManager.supportedLocales[0].id;
        this.http = new Http();
        var resourcesPath = options && options.resourcesPath;
        if (resourcesPath) {
            resourcesPath = MsftSme.trimEnd(resourcesPath.trim(), '/');
        }
        else {
            resourcesPath = LocalizationManager.defaultResourcesStringsFolder;
        }
        this.resourcesStringFormat = resourcesPath + LocalizationManager.resourcesStringsFileFormat;
        this.resourcesStringDefaultFile = resourcesPath + LocalizationManager.resourcesStringsFile;
    }
    Object.defineProperty(LocalizationManager.prototype, "localeId", {
        /**
         * Gets current locale.
         * @return string the locale string.
         */
        get: function () {
            return this.localeIdInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocalizationManager.prototype, "navigatorLanguage", {
        /**
         * Gets the navigator language
         */
        get: function () {
            return navigator.language;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the current locale in persistent storage
     * @param localeId the string representing the locale selected by the user. Ex: 'es' or 'en'
     */
    LocalizationManager.prototype.saveLocale = function (localeId) {
        var defaultLocale = LocalizationManager.supportedLocales.find(function (loc) { return loc.id.localeCompareIgnoreCase(localeId) === 0; });
        if (!defaultLocale) {
            throw new Error("The default locale specified: " + localeId + " is not defined in the array of " +
                ("supported locales " + JSON.stringify(LocalizationManager.supportedLocales)));
        }
        this.localeIdInternal = localeId;
        localStorage.setItem(LocalizationManager.localStorageLocaleKey, localeId);
    };
    /**
     * Fetches the localized strings from the server based on the current culture.
     * @returns an observable with object the localized strings.
     */
    LocalizationManager.prototype.fetchLocalizedStrings = function () {
        this.getLocaleId();
        if (this.localeId === this.defaultLocaleId) {
            // Only fetch the default locale
            return this.fetchDefaultStrings();
        }
        // TODO: Once the localization team is engaged we can remove this code and just fetch the
        // locale and be sure that it exists
        return Observable.zip(this.fetchDefaultStrings(), this.fetchLocaleStrings().catch(function (error, caught) { return Observable.of(null); }), function (fetchDefault, fetchLocale) {
            // get the english strings and replace those properties of the localized json
            var strings;
            if (fetchLocale) {
                return MsftSme.deepAssign({}, fetchDefault, fetchLocale);
            }
            return fetchDefault;
        });
    };
    /**
     * Gets the current locale
     * @returns The current locale selected by the user
     */
    LocalizationManager.prototype.getLocaleId = function () {
        // TODO: remove isProduction section to officially support localization.
        // if (MsftSme.self().Init && MsftSme.self().Init.isProduction) {
        //     this.localeIdInternal = this.defaultLocaleId;
        //     return this.localeId;
        // }
        if (!this.localeId) {
            var localeId_1 = localStorage.getItem(LocalizationManager.localStorageLocaleKey);
            if (!localeId_1) {
                // Now we read the browser locales and if it's supported, then we use that;
                // otherwise use default locale
                var navigatorLanguage = this.getNavigatorLanguage();
                if (navigatorLanguage) {
                    localeId_1 = navigatorLanguage;
                }
                if (!localeId_1) {
                    localeId_1 = this.defaultLocaleId;
                }
            }
            // now check if if the locale is supported
            var locale = LocalizationManager.supportedLocales.find(function (loc) { return loc.id.localeCompareIgnoreCase(localeId_1) === 0; });
            // Try with the first part only
            if (!locale) {
                var first_1 = localeId_1.split('-')[0];
                locale = LocalizationManager.supportedLocales.find(function (loc) { return loc.id.split('-')[0].localeCompareIgnoreCase(first_1) === 0; });
            }
            if (!locale) {
                Logging.log({
                    source: 'LocalizationManager',
                    level: LogLevel.Warning,
                    message: "The current user locale: " + localeId_1 + " is not defined in the array of " +
                        ("supported locales " + JSON.stringify(LocalizationManager.supportedLocales) + " so we will use the ") +
                        ("default locale: " + JSON.stringify(LocalizationManager.supportedLocales[0]))
                });
                locale = LocalizationManager.supportedLocales[0];
            }
            this.localeIdInternal = locale.id;
        }
        return this.localeId;
    };
    LocalizationManager.prototype.fetchDefaultStrings = function () {
        var _this = this;
        return this.http.getNoCache(this.resourcesStringDefaultFile)
            .catch(function (error, caught) {
            if (error.status >= 400) {
                // If we got any error, we just reply with that error and the map function will handle it
                Logging.log({
                    source: 'LocalizationManager',
                    level: LogLevel.Error,
                    message: "Error " + error.status + " received when getting default localized strings for the " +
                        (_this.defaultLocaleId + " locale. The error was: " + error.message)
                });
            }
            return Observable.throw(error);
        }).map(function (result) {
            return result.response.Strings;
        });
    };
    LocalizationManager.prototype.fetchLocaleStrings = function () {
        var _this = this;
        return this.http.getNoCache(this.resourcesStringFormat.format(this.localeId))
            .catch(function (error, caught) {
            if (error.status >= 400) {
                // If we got any error, we just reply with that error and the map function will handle it
                Logging.log({
                    source: 'LocalizationManager',
                    level: LogLevel.Warning,
                    message: "Error " + error.status + " received when getting localized strings for the " +
                        ("user specified locale: '" + _this.getLocaleId() + "'. The error was: " + error.message)
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
        return this.navigatorLanguage;
    };
    LocalizationManager.localStorageLocaleKey = 'locale:@msft-sme/shell';
    LocalizationManager.supportedLocales = [
        {
            id: 'en-US',
            name: 'English'
        },
        {
            id: 'cs-CZ',
            name: 'Čeština'
        },
        {
            id: 'de-DE',
            name: 'Deutsch'
        },
        {
            id: 'es-ES',
            name: 'Español'
        },
        {
            id: 'fr-FR',
            name: 'Français'
        },
        {
            id: 'hu-HU',
            name: 'Magyar'
        },
        {
            id: 'it-IT',
            name: 'Italiano'
        },
        {
            id: 'ja-JP',
            name: '日本語‎'
        },
        {
            id: 'ko-KR',
            name: '한국어'
        },
        {
            id: 'nl-NL',
            name: 'Nederlands'
        },
        {
            id: 'pl-PL',
            name: 'Polski'
        },
        {
            id: 'pt-BR',
            name: 'Português (Brasil)'
        },
        {
            id: 'pt-PT',
            name: 'Português (Portugal)'
        },
        {
            id: 'ru-RU',
            name: 'Русский'
        },
        {
            id: 'sv-SE',
            name: 'Svenska'
        },
        {
            id: 'tr-TR',
            name: 'Türkçe'
        },
        {
            id: 'zh-CN',
            name: '中文(简体)'
        },
        {
            id: 'zh-TW',
            name: '中文(繁體)‎'
        }
    ];
    LocalizationManager.defaultResourcesStringsFolder = 'assets/strings';
    LocalizationManager.resourcesStringsFile = '/strings.json';
    LocalizationManager.resourcesStringsFileFormat = '/{0}/strings.json';
    return LocalizationManager;
}());
export { LocalizationManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9sb2NhbGl6YXRpb24tbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXBELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBOEI5Qjs7Ozs7R0FLRztBQUNIO0lBd0ZJOzs7O09BSUc7SUFDSCw2QkFBbUIsT0FBb0M7UUFadEMsb0JBQWUsR0FBRyxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFJdEUsU0FBSSxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7UUFTNUIsSUFBSSxhQUFhLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFFckQsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNoQixhQUFhLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osYUFBYSxHQUFHLG1CQUFtQixDQUFDLDZCQUE2QixDQUFDO1FBQ3RFLENBQUM7UUFFRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsYUFBYSxHQUFHLG1CQUFtQixDQUFDLDBCQUEwQixDQUFDO1FBQzVGLElBQUksQ0FBQywwQkFBMEIsR0FBRyxhQUFhLEdBQUcsbUJBQW1CLENBQUMsb0JBQW9CLENBQUM7SUFDL0YsQ0FBQztJQU1ELHNCQUFXLHlDQUFRO1FBSm5COzs7V0FHRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLGtEQUFpQjtR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VUFBVTtTQUNuQjtRQUNEO1lBQ0ksRUFBRSxFQUFFLE9BQU87WUFDWCxJQUFJLEVBQUUsTUFBTTtTQUNmO1FBQ0Q7WUFDSSxFQUFFLEVBQUUsT0FBTztZQUNYLElBQUksRUFBRSxLQUFLO1NBQ2Q7UUFDRDtZQUNJLEVBQUUsRUFBRSxPQUFPO1lBQ1gsSUFBSSxFQUFFLFlBQVk7U0FDckI7UUFDRDtZQUNJLEVBQUUsRUFBRSxPQUFPO1lBQ1gsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRDtZQUNJLEVBQUUsRUFBRSxPQUFPO1lBQ1gsSUFBSSxFQUFFLG9CQUFvQjtTQUM3QjtRQUNEO1lBQ0ksRUFBRSxFQUFFLE9BQU87WUFDWCxJQUFJLEVBQUUsc0JBQXNCO1NBQy9CO1FBQ0Q7WUFDSSxFQUFFLEVBQUUsT0FBTztZQUNYLElBQUksRUFBRSxTQUFTO1NBQ2xCO1FBQ0Q7WUFDSSxFQUFFLEVBQUUsT0FBTztZQUNYLElBQUksRUFBRSxTQUFTO1NBQ2xCO1FBQ0Q7WUFDSSxFQUFFLEVBQUUsT0FBTztZQUNYLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0Q7WUFDSSxFQUFFLEVBQUUsT0FBTztZQUNYLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0Q7WUFDSSxFQUFFLEVBQUUsT0FBTztZQUNYLElBQUksRUFBRSxTQUFTO1NBQ2xCO0tBQ0osQ0FBQztJQUVTLGlEQUE2QixHQUFHLGdCQUFnQixDQUFDO0lBQ2pELHdDQUFvQixHQUFHLGVBQWUsQ0FBQztJQUN2Qyw4Q0FBMEIsR0FBRyxtQkFBbUIsQ0FBQztJQXlMcEUsMEJBQUM7Q0F4UUQsQUF3UUMsSUFBQTtTQXhRWSxtQkFBbUIiLCJmaWxlIjoibG9jYWxpemF0aW9uLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9