import { CoreEnvironment } from '../core';
var AssetManager = (function () {
    function AssetManager() {
    }
    Object.defineProperty(AssetManager, "theme", {
        get: function () {
            var themeName = localStorage.getItem(AssetManager.storageKey);
            if (!AssetManager.assets[themeName]) {
                themeName = AssetManager.defaultTheme;
            }
            return themeName;
        },
        set: function (theme) {
            localStorage.setItem(AssetManager.storageKey, theme);
        },
        enumerable: true,
        configurable: true
    });
    AssetManager.getAssetLocationPath = function (relativePath) {
        return window.location.origin + "/assets/styles/" + relativePath + "?v=" + AssetManager.version;
    };
    AssetManager.initialize = function (production) {
        if (!production) {
            // in development mode, give the injected css a version breaker
            AssetManager.version = Date.now();
        }
        // TODO: localize assets
        var locale = CoreEnvironment.localizationManager.getCurrentLocale();
        // initialize sme common assets
        AssetManager.assets = {
            css: [
                AssetManager.getAssetLocationPath('main.css')
            ],
            js: []
        };
        // load assets so far
        CoreEnvironment.loadAssets(AssetManager.theme, AssetManager.assets);
        // store with module only assets so that moduleInit passes them along as well (currently empty)
        // this might be some javascript that should execute in modules, but not the shell.
        (_a = window.MsftSme.Resources.assets.css).push.apply(_a, []);
        (_b = window.MsftSme.Resources.assets.js).push.apply(_b, []);
        // TODO: These lines effectivly disable css injection for modules. Remove when we are ready to inject css into modules
        window.MsftSme.Resources.assets.css = [];
        window.MsftSme.Resources.assets.js = [];
        var _a, _b;
    };
    return AssetManager;
}());
export { AssetManager };
AssetManager.version = 0;
AssetManager.storageKey = "msft.sme.shell-assetManager-v" + AssetManager.version;
AssetManager.defaultTheme = 'light';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3NldC1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFMUM7SUFBQTtJQWlEQSxDQUFDO0lBM0NHLHNCQUFrQixxQkFBSzthQUF2QjtZQUNJLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlELEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLFNBQVMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO1lBQzFDLENBQUM7WUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUM7YUFDRCxVQUF3QixLQUFhO1lBQ2pDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6RCxDQUFDOzs7T0FIQTtJQUthLGlDQUFvQixHQUFsQyxVQUFtQyxZQUFvQjtRQUNuRCxNQUFNLENBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLHVCQUFrQixZQUFZLFdBQU0sWUFBWSxDQUFDLE9BQVMsQ0FBQztJQUMvRixDQUFDO0lBRWEsdUJBQVUsR0FBeEIsVUFBeUIsVUFBbUI7UUFDeEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2QsK0RBQStEO1lBQy9ELFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3RDLENBQUM7UUFDRCx3QkFBd0I7UUFDeEIsSUFBSSxNQUFNLEdBQUcsZUFBZSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFcEUsK0JBQStCO1FBQy9CLFlBQVksQ0FBQyxNQUFNLEdBQUc7WUFDbEIsR0FBRyxFQUFFO2dCQUNELFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUM7YUFDaEQ7WUFDRCxFQUFFLEVBQUUsRUFBRTtTQUNULENBQUM7UUFFRixxQkFBcUI7UUFDckIsZUFBZSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVwRSwrRkFBK0Y7UUFDL0YsbUZBQW1GO1FBQ25GLENBQUEsS0FBb0IsTUFBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQSxDQUFDLElBQUksV0FBSSxFQUFFLEVBQUU7UUFDckUsQ0FBQSxLQUFvQixNQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFBLENBQUMsSUFBSSxXQUFJLEVBQUUsRUFBRTtRQUVwRSxzSEFBc0g7UUFDbEcsTUFBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDMUMsTUFBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7O0lBQ2pFLENBQUM7SUFDTCxtQkFBQztBQUFELENBakRBLEFBaURDOztBQWhEaUIsb0JBQU8sR0FBRyxDQUFDLENBQUM7QUFDWCx1QkFBVSxHQUFHLGtDQUFnQyxZQUFZLENBQUMsT0FBUyxDQUFDO0FBQ3BFLHlCQUFZLEdBQUcsT0FBTyxDQUFDIiwiZmlsZSI6ImFzc2V0LW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9