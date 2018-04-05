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
 * The Versioned representation of the User Profile.
 */
var UserProfile = /** @class */ (function (_super) {
    __extends(UserProfile, _super);
    function UserProfile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UserProfile.prototype, "latestVersion", {
        /**
         * Getter for the latest version of the user profile.
         */
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserProfile.prototype, "common", {
        /**
         * Getter for common user settings object
         * The settings in the object are available to all extensions
         */
        get: function () {
            return this.getProperty(UserProfile.propertyNames.common);
        },
        /**
         * Setter for common user settings object
         */
        set: function (value) {
            this.setProperty(UserProfile.propertyNames.common, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserProfile.prototype, "extensions", {
        /**
         * Getter for user extension settings object map
         * Each extension has its own object in this map.
         */
        get: function () {
            return this.getProperty(UserProfile.propertyNames.extensions);
        },
        /**
         * Setter for user extension settings object map
         */
        set: function (value) {
            this.setProperty(UserProfile.propertyNames.extensions, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * upgrades the current properties to the latest version
     * if this.currentVersion is null or undefined, then the upgrade should initialize to the latest version
     */
    UserProfile.prototype.upgrade = function () {
        // For now, we dont need to do anything but initialize to the latest version.
        // NOTE: When latestVersion is updated, then we need to add logic here to upgrade old user profile objects.
        if (MsftSme.isNullOrUndefined(this.currentVersion)) {
            this.clear();
            this.common = {};
            this.extensions = {};
            this.currentVersion = this.latestVersion;
            return;
        }
    };
    /**
     * The names of properties that are saved into the versioned object
     */
    UserProfile.propertyNames = {
        common: 'common',
        extensions: 'extensions'
    };
    return UserProfile;
}(VersionedObject));
export { UserProfile };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3VzZXItcHJvZmlsZS9tb2RlbHMvdXNlci1wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBS0gsZUFBZSxFQUNsQixNQUFNLGtCQUFrQixDQUFDO0FBWTFCOztHQUVHO0FBQ0g7SUFBaUMsK0JBQWU7SUFBaEQ7O0lBOERBLENBQUM7SUFqREcsc0JBQVcsc0NBQWE7UUFIeEI7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDYixDQUFDOzs7T0FBQTtJQU1ELHNCQUFXLCtCQUFNO1FBSmpCOzs7V0FHRzthQUNIO1lBQ0ksTUFBTSxDQUFxQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDakYsQ0FBQztRQUVEOztXQUVHO2FBQ0gsVUFBa0IsS0FBeUI7WUFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5RCxDQUFDOzs7T0FQQTtJQWFELHNCQUFXLG1DQUFVO1FBSnJCOzs7V0FHRzthQUNIO1lBQ0ksTUFBTSxDQUEyQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDM0YsQ0FBQztRQUVEOztXQUVHO2FBQ0gsVUFBc0IsS0FBK0I7WUFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRSxDQUFDOzs7T0FQQTtJQVNEOzs7T0FHRztJQUNPLDZCQUFPLEdBQWpCO1FBQ0ksNkVBQTZFO1FBQzdFLDJHQUEyRztRQUMzRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDekMsTUFBTSxDQUFDO1FBQ1gsQ0FBQztJQUNMLENBQUM7SUEzREQ7O09BRUc7SUFDWSx5QkFBYSxHQUFHO1FBQzNCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLFVBQVUsRUFBRSxZQUFZO0tBQzNCLENBQUM7SUFzRE4sa0JBQUM7Q0E5REQsQUE4REMsQ0E5RGdDLGVBQWUsR0E4RC9DO1NBOURZLFdBQVciLCJmaWxlIjoidXNlci1wcm9maWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==