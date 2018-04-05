var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { VersionedObject } from '../../../../core';
/**
 * The Versioned representation of the Shell Common Settings
 * Unlike Common Application settings, these settings are specific to the shell and not available to extensions.
 *
 * TODO: Populate with properties when needed
 */
var ShellApplicationSettings = /** @class */ (function (_super) {
    __extends(ShellApplicationSettings, _super);
    function ShellApplicationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ShellApplicationSettings.prototype, "latestVersion", {
        /**
         * Getter for the latest version of the user profile.
         */
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attempts to upgrade the current version of the object at least one version toward the latest version.
     * if this.currentVersion is null or undefined, then the upgrade should initialize to the latest version
     * this is called itterativly untill the current version is equal to the latest version
     */
    ShellApplicationSettings.prototype.upgrade = function () {
        // For now, we dont need to do anything but initialize to the latest version.
        // NOTE: When latestVersion is updated, then we need to add logic here to upgrade old user profile objects.
        if (MsftSme.isNullOrUndefined(this.currentVersion)) {
            this.clear();
            this.currentVersion = this.latestVersion;
            return;
        }
    };
    return ShellApplicationSettings;
}(VersionedObject));
export { ShellApplicationSettings };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3VzZXItcHJvZmlsZS9tb2RlbHMvc2hlbGwtYXBwbGljYXRpb24tc2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVuRDs7Ozs7R0FLRztBQUNIO0lBQThDLDRDQUFlO0lBQTdEOztJQXVCQSxDQUFDO0lBbEJHLHNCQUFXLG1EQUFhO1FBSHhCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQzs7O09BQUE7SUFFRDs7OztPQUlHO0lBQ08sMENBQU8sR0FBakI7UUFDSSw2RUFBNkU7UUFDN0UsMkdBQTJHO1FBQzNHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUN6QyxNQUFNLENBQUM7UUFDWCxDQUFDO0lBQ0wsQ0FBQztJQUNMLCtCQUFDO0FBQUQsQ0F2QkEsQUF1QkMsQ0F2QjZDLGVBQWUsR0F1QjVEIiwiZmlsZSI6InNoZWxsLWFwcGxpY2F0aW9uLXNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==