import { Observable } from 'rxjs/Observable';
import { Net } from './net';
// TODO: use shared cache for user profile
var UserProfileManager = (function () {
    /**
     * Initializes a new instance of the UserProfile class.
     *
     * @param gatewayConnection the GatewayConnection class instance.
     * @param authorizationManager the AuthorizationManager class instance.
     */
    function UserProfileManager(gatewayConnection) {
        this.gatewayConnection = gatewayConnection;
    }
    Object.defineProperty(UserProfileManager.prototype, "moduleName", {
        get: function () {
            var global = window;
            return global.MsftSme.Init.moduleName;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get module settings or specific module setting
     * @param settingName the setting in the current module that you want to access, return all module settings if null
     */
    UserProfileManager.prototype.getModuleSettings = function (settingName) {
        var _this = this;
        return this.gatewayConnection.get(Net.userProfile).flatMap(function (profile) {
            // if module or profile isn't set up yet, add it
            if (!profile || !profile.modules || !profile.modules[_this.moduleName]) {
                var newProfile = _this.ensureValidProfile(profile);
                newProfile.modules[_this.moduleName] = {};
                return _this.setProfile(newProfile);
            }
            // grab the specific setting or entire module
            if (settingName) {
                return Observable.of(profile.modules[_this.moduleName][settingName] || null);
            }
            else {
                return Observable.of(profile.modules[_this.moduleName] || null);
            }
        });
    };
    /**
     * overwrites the value of a setting in the current module
     * @param settingName The setting within the module to set
     * @param value The value of the setting, can be string, number, boolean, or js object
     * @return the updated profile
     */
    UserProfileManager.prototype.setModuleSettings = function (settingName, value) {
        var _this = this;
        // get existing profile then update
        return this.gatewayConnection.get(Net.userProfile).flatMap(function (profile) {
            // if modules haven't been set up yet add them
            profile = _this.ensureValidProfile(profile, _this.moduleName);
            profile.modules[_this.moduleName][settingName] = value;
            return _this.setProfile(profile);
        });
    };
    /**
     * Resets current module settings to nothing
     * @return the updated profile
     */
    UserProfileManager.prototype.clearModuleSettings = function () {
        var _this = this;
        return this.gatewayConnection.get(Net.userProfile).flatMap(function (profile) {
            profile = _this.ensureValidProfile(profile);
            profile.modules[_this.moduleName] = {};
            return _this.setProfile(profile);
        });
    };
    /**
     * Sets up the structure of the profile if it hasn't been set up yet
     * @param profile The profile object to be validated
     * @param moduleName The moduleName to validate
     * @return a validated profile object that retains all original data
     */
    UserProfileManager.prototype.ensureValidProfile = function (profile, moduleName) {
        profile = profile || {};
        profile.global = profile.global || {};
        profile.modules = profile.modules || {};
        if (moduleName) {
            profile.modules[moduleName] = profile.modules[moduleName] || {};
        }
        return profile;
    };
    /**
     * Sets the profile object on the gateway
     * @param profile The complete profile object to set
     * @return An observable with the result from the set operation
     */
    UserProfileManager.prototype.setProfile = function (profile) {
        return this.gatewayConnection.put(Net.userProfile, JSON.stringify(profile)).map(function (x) { return profile; });
    };
    return UserProfileManager;
}());
export { UserProfileManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS91c2VyLXByb2ZpbGUtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHN0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQU81QiwwQ0FBMEM7QUFDMUM7SUFDSTs7Ozs7T0FLRztJQUNILDRCQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUFJLENBQUM7SUFFN0Qsc0JBQVksMENBQVU7YUFBdEI7WUFDSSxJQUFNLE1BQU0sR0FBMkIsTUFBTSxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFFRDs7O09BR0c7SUFDSSw4Q0FBaUIsR0FBeEIsVUFBNEIsV0FBb0I7UUFBaEQsaUJBaUJDO1FBaEJHLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQ3RELFVBQUEsT0FBTztZQUNILGdEQUFnRDtZQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLElBQUksVUFBVSxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUN6QyxNQUFNLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2QyxDQUFDO1lBRUQsNkNBQTZDO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7WUFDaEYsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1lBQ25FLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLDhDQUFpQixHQUF4QixVQUF5QixXQUFtQixFQUFFLEtBQVU7UUFBeEQsaUJBU0M7UUFSRyxtQ0FBbUM7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FDdEQsVUFBQSxPQUFPO1lBQ0gsOENBQThDO1lBQzlDLE9BQU8sR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1RCxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDdEQsTUFBTSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksZ0RBQW1CLEdBQTFCO1FBQUEsaUJBUUM7UUFQRyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUN0RCxVQUFBLE9BQU87WUFDSCxPQUFPLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN0QyxNQUFNLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUVYLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLCtDQUFrQixHQUExQixVQUEyQixPQUFZLEVBQUUsVUFBbUI7UUFDeEQsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDeEIsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUN0QyxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDYixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BFLENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssdUNBQVUsR0FBbEIsVUFBbUIsT0FBWTtRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxPQUFPLEVBQVAsQ0FBTyxDQUFDLENBQUM7SUFDbEcsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0E1RkEsQUE0RkMsSUFBQSIsImZpbGUiOiJ1c2VyLXByb2ZpbGUtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=