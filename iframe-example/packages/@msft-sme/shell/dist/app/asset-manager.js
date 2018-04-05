import { CoreEnvironment } from '../core';
var AssetManager = /** @class */ (function () {
    function AssetManager() {
    }
    Object.defineProperty(AssetManager, "theme", {
        get: function () {
            var themeName = localStorage.getItem(AssetManager.themeStorageKey);
            if (themeName == null || !AssetManager.assets[themeName]) {
                themeName = AssetManager.defaultTheme;
            }
            return themeName;
        },
        set: function (theme) {
            localStorage.setItem(AssetManager.themeStorageKey, theme);
        },
        enumerable: true,
        configurable: true
    });
    AssetManager.getAssetLocationPath = function (relativePath) {
        if (!AssetManager.version) {
            throw new Error('AssetManager.getAssetLocationPath() called before AssetManager.initialize()');
        }
        return window.location.origin + "/assets/styles/" + relativePath + "?v=" + AssetManager.version;
    };
    AssetManager.initialize = function (production) {
        // in development mode, use the current time for the version. In production mode, use the current shell version.
        var self = MsftSme.self();
        AssetManager.version = production && self.Environment.version ? self.Environment.version : Date.now().toString();
        // TODO: localize assets
        var locale = CoreEnvironment.localizationManager.getLocaleId();
        // initialize sme common assets. (shell loads these sooner from angular-cli.json)
        AssetManager.assets = { css: [], js: [] };
        // load assets so far
        CoreEnvironment.loadAssets(AssetManager.theme, AssetManager.assets);
        // store with module only assets so that moduleInit passes them along as well (currently empty)
        // this might be some javascript that should execute in modules, but not the shell.
        (_a = window.MsftSme.Resources.assets.css).push.apply(_a, [
            AssetManager.getAssetLocationPath('main.css')
        ]);
        (_b = window.MsftSme.Resources.assets.js).push.apply(_b, []);
        var _a, _b;
    };
    AssetManager.themeStorageKey = "msft.sme.shell-assetManager-theme";
    AssetManager.defaultTheme = 'light';
    return AssetManager;
}());
export { AssetManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3NldC1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQXFCLE1BQU0sU0FBUyxDQUFDO0FBRTdEO0lBQUE7SUE2Q0EsQ0FBQztJQXZDRyxzQkFBa0IscUJBQUs7YUFBdkI7WUFDSSxJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNuRSxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELFNBQVMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO1lBQzFDLENBQUM7WUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUM7YUFDRCxVQUF3QixLQUFhO1lBQ2pDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5RCxDQUFDOzs7T0FIQTtJQUthLGlDQUFvQixHQUFsQyxVQUFtQyxZQUFvQjtRQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkVBQTZFLENBQUMsQ0FBQztRQUNuRyxDQUFDO1FBQ0QsTUFBTSxDQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSx1QkFBa0IsWUFBWSxXQUFNLFlBQVksQ0FBQyxPQUFTLENBQUM7SUFDL0YsQ0FBQztJQUVhLHVCQUFVLEdBQXhCLFVBQXlCLFVBQW1CO1FBQ3hDLGdIQUFnSDtRQUNoSCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUIsWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakgsd0JBQXdCO1FBQ3hCLElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUUvRCxpRkFBaUY7UUFDakYsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBRTFDLHFCQUFxQjtRQUNyQixlQUFlLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBFLCtGQUErRjtRQUMvRixtRkFBbUY7UUFDbkYsQ0FBQSxLQUFvQixNQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFBLENBQUMsSUFBSSxXQUFJO1lBQzdELFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUM7U0FDaEQsRUFBRTtRQUNILENBQUEsS0FBb0IsTUFBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQSxDQUFDLElBQUksV0FBSSxFQUFFLEVBQUU7O0lBQ3hFLENBQUM7SUExQ2MsNEJBQWUsR0FBRyxtQ0FBbUMsQ0FBQztJQUN0RCx5QkFBWSxHQUFHLE9BQU8sQ0FBQztJQTBDMUMsbUJBQUM7Q0E3Q0QsQUE2Q0MsSUFBQTtTQTdDWSxZQUFZIiwiZmlsZSI6ImFzc2V0LW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9