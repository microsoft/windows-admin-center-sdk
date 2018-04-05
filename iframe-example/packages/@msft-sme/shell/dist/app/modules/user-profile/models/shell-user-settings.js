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
 * The Versioned representation of the Shell User Settings
 * This object is used for settings that specific to the current user and to shell
 */
var ShellUserSettings = /** @class */ (function (_super) {
    __extends(ShellUserSettings, _super);
    function ShellUserSettings() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * The latest day zero dialog version to check against
         */
        _this.latestDayZeroVersion = 0;
        return _this;
    }
    Object.defineProperty(ShellUserSettings.prototype, "latestVersion", {
        /**
         * Getter for the latest version of the user profile.
         */
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShellUserSettings.prototype, "dayZeroEnabled", {
        /**
         * Getter for indicating if the dayZeroExperience is enabled
         */
        get: function () {
            return MsftSme.isNullOrUndefined(this.dayZeroVersion) || this.dayZeroVersion !== this.latestDayZeroVersion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShellUserSettings.prototype, "dayZeroVersion", {
        /**
         * Getter for the users current dayZeroVersion
         */
        get: function () {
            return this.getProperty(ShellUserSettings.propertyNames.dayZeroVersion);
        },
        /**
         * Setter for the users current dayZeroVersion
         */
        set: function (value) {
            this.setProperty(ShellUserSettings.propertyNames.dayZeroVersion, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShellUserSettings.prototype, "isToolsExpanded", {
        /**
         * Getter for the users prefrence on having the tools list expanded
         */
        get: function () {
            return this.getProperty(ShellUserSettings.propertyNames.isToolsExpanded);
        },
        /**
         * Setter for the users prefrence on having the tools list expanded
         */
        set: function (value) {
            this.setProperty(ShellUserSettings.propertyNames.isToolsExpanded, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attempts to upgrade the current version of the object at least one version toward the latest version.
     * if this.currentVersion is null or undefined, then the upgrade should initialize to the latest version
     * this is called itterativly untill the current version is equal to the latest version
     */
    ShellUserSettings.prototype.upgrade = function () {
        // For now, we dont need to do anything but initialize to the latest version.
        // NOTE: When latestVersion is updated, then we need to add logic here to upgrade old user profile objects.
        if (MsftSme.isNullOrUndefined(this.currentVersion)) {
            this.clear();
            this.dayZeroVersion = null;
            this.isToolsExpanded = true;
            this.currentVersion = this.latestVersion;
            return;
        }
    };
    /**
     * Marks the day zero experience as completed
     */
    ShellUserSettings.prototype.completeDayZeroExperience = function () {
        this.dayZeroVersion = this.latestDayZeroVersion;
    };
    ShellUserSettings.propertyNames = {
        dayZeroVersion: 'dayZeroVersion',
        isToolsExpanded: 'isToolsExpanded'
    };
    return ShellUserSettings;
}(VersionedObject));
export { ShellUserSettings };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3VzZXItcHJvZmlsZS9tb2RlbHMvc2hlbGwtdXNlci1zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUdILGVBQWUsRUFDbEIsTUFBTSxrQkFBa0IsQ0FBQztBQUUxQjs7O0dBR0c7QUFDSDtJQUF1QyxxQ0FBZTtJQUF0RDtRQUFBLHFFQTZFQztRQS9ERzs7V0FFRztRQUNLLDBCQUFvQixHQUFHLENBQUMsQ0FBQzs7SUE0RHJDLENBQUM7SUFuRUcsc0JBQVcsNENBQWE7UUFIeEI7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDYixDQUFDOzs7T0FBQTtJQVVELHNCQUFXLDZDQUFjO1FBSHpCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUMvRyxDQUFDOzs7T0FBQTtJQUtELHNCQUFZLDZDQUFjO1FBSDFCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDbkYsQ0FBQztRQUVEOztXQUVHO2FBQ0gsVUFBMkIsS0FBYTtZQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUUsQ0FBQzs7O09BUEE7SUFZRCxzQkFBVyw4Q0FBZTtRQUgxQjs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFVLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3JGLENBQUM7UUFFRDs7V0FFRzthQUNILFVBQTJCLEtBQWM7WUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdFLENBQUM7OztPQVBBO0lBU0Q7Ozs7T0FJRztJQUNPLG1DQUFPLEdBQWpCO1FBQ0ksNkVBQTZFO1FBQzdFLDJHQUEyRztRQUMzRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMzQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztZQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDekMsTUFBTSxDQUFDO1FBQ1gsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLHFEQUF5QixHQUFoQztRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ3BELENBQUM7SUExRWMsK0JBQWEsR0FBRztRQUMzQixjQUFjLEVBQUUsZ0JBQWdCO1FBQ2hDLGVBQWUsRUFBRSxpQkFBaUI7S0FDckMsQ0FBQztJQXdFTix3QkFBQztDQTdFRCxBQTZFQyxDQTdFc0MsZUFBZSxHQTZFckQ7U0E3RVksaUJBQWlCIiwiZmlsZSI6InNoZWxsLXVzZXItc2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9