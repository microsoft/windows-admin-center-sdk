import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { GatewayService } from '../../../angular';
import { Logging, LogLevel, Net, VersionedObject } from '../../../core';
import { UserProfile } from './models/user-profile';
/**
 * User Profile Service. Manages User Profile operations and maintains the internal structure of the user profile.
 */
var UserProfileService = /** @class */ (function () {
    /**
     * Initializes a new instance of the UserProfileService class.
     *
     * @param gatewayService the GatewayService class instance.
     */
    function UserProfileService(gatewayService) {
        var _this = this;
        this.gatewayService = gatewayService;
        /**
         * The user profile subject for caching the user profile instance for use during the application lifecycle.
         */
        this.userProfile = new ReplaySubject(1);
        // initialize cache for user profile
        this.getUserProfile()
            .retry(3)
            .take(1)
            .subscribe(function (profile) {
            _this.userProfile.next(profile);
        });
    }
    /**
     * Gets the common user settings
     * @return Observable of the common user settings object
     */
    UserProfileService.prototype.getCommonSettings = function () {
        return this.userProfile.map(function (profile) { return profile.common; });
    };
    /**
     * Sets the common user settings
     * @param settings the common user settings object to save
     * @return An observable for the user profile save process.
     */
    UserProfileService.prototype.setCommonSettings = function (settings) {
        return this.userProfile
            .flatMap(function (profile) { return profile.trySave(function () { profile.common = settings; }); });
    };
    /**
     * Gets the user extension settings
     * @param extensionName the name of the extension to get settings for
     * @return the settings object for the given extension name
     */
    UserProfileService.prototype.getExtensionSettings = function (extensionName) {
        return this.userProfile.map(function (profile) { return VersionedObject.ensureIsVersionedObject(profile.extensions[extensionName]); });
    };
    /**
     * Sets the extension user settings
     * @param extensionSettings the extension settings object to save
     * @param extensionName the name of the extension to get settings for
     * @return An observable for the user profile save process.
     */
    UserProfileService.prototype.setExtensionSettings = function (extensionName, extensionSettings) {
        return this.userProfile
            .flatMap(function (profile) { return profile.trySave(function () { profile.extensions[extensionName] = extensionSettings; }); });
    };
    /**
     * Gets the profile object from the gateway
     * @return the UserProfile
     */
    UserProfileService.prototype.getUserProfile = function () {
        var _this = this;
        return this.gatewayService
            .get(Net.userProfile)
            .take(1)
            .catch(function (error, obs) {
            if (error && error.status === 404) {
                Logging.log({
                    source: 'UserProfileService.getUserProfile',
                    level: LogLevel.Warning,
                    message: 'Unable to find user profile, creating new one'
                });
                return Observable.of(null);
            }
            var messageFormat = MsftSme.resourcesStrings().MsftSmeShell.App.Errors.UserProfile.Get.formatMessage;
            Logging.log({
                source: 'UserProfileService.getUserProfile',
                level: LogLevel.Error,
                message: messageFormat.format(Net.getErrorMessage(error))
            });
            throw error;
        })
            .map(function (profile) {
            // If the profile is not versioned (or not defined), then start with an empty profile.
            profile = VersionedObject.ensureIsVersionedObject(profile);
            // return a new user profile object
            return new UserProfile(profile, {
                save: function (object) { return _this.setUserProfile(object); }
            });
        });
    };
    /**
     * Sets the profile object on the gateway
     * @param profile a PlainVersionedObject from the UserProfile.ToJson method
     * @return An observable with the result from the set operation
     */
    UserProfileService.prototype.setUserProfile = function (profile) {
        return this.gatewayService
            .put(Net.userProfile, JSON.stringify(profile))
            .take(1)
            .catch(function (error, obs) {
            var messageFormat = MsftSme.resourcesStrings().MsftSmeShell.App.Errors.UserProfile.Put.formatMessage;
            Logging.log({
                source: 'UserProfileService.setUserProfile',
                level: LogLevel.Error,
                message: messageFormat.format(Net.getErrorMessage(error))
            });
            throw error;
        });
    };
    UserProfileService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    UserProfileService.ctorParameters = function () { return [
        { type: GatewayService, },
    ]; };
    return UserProfileService;
}());
export { UserProfileService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3VzZXItcHJvZmlsZS91c2VyLXByb2ZpbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsVUFBQSxFQUFZLGFBQUEsRUFBYyxNQUFPLE1BQUEsQ0FBTztBQUNqRCxPQUFPLEVBQUUsY0FBQSxFQUFlLE1BQU8sa0JBQUEsQ0FBbUI7QUFDbEQsT0FBTyxFQUVILE9BQU8sRUFDUCxRQUFRLEVBQ1IsR0FBRyxFQUVILGVBQWUsRUFDbEIsTUFBTSxlQUFBLENBQWdCO0FBRXZCLE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyx1QkFBQSxDQUF3QjtBQUVwRDs7R0FFRztBQUVIO0lBT0k7Ozs7T0FJRztJQUNILDRCQUFvQixjQUE4QjtRQUFsRCxpQkFTQztRQVRtQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFWbEQ7O1dBRUc7UUFDSyxnQkFBVyxHQUFHLElBQUksYUFBYSxDQUFjLENBQUMsQ0FBQyxDQUFBO1FBUW5ELG9DQUFvQztRQUNwQyxJQUFJLENBQUMsY0FBYyxFQUFFO2FBQ2hCLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDUixJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ1AsU0FBUyxDQUNWLFVBQUEsT0FBTztZQUNILEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDhDQUFpQixHQUF4QjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxNQUFNLEVBQWQsQ0FBYyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSw4Q0FBaUIsR0FBeEIsVUFBeUIsUUFBNEI7UUFDakQsTUFBTSxDQUFDLElBQUksQ0FB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WUFDZCxJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztZQUM5RyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNSLE1BQU0sRUFBRSxtQ0FBbUM7Z0JBQzNDLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztnQkFDckIsT0FBTyxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1RCxDQUFDLENBQUM7WUFDSCxNQUFNLEtBQUssQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRSw2QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGlDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7S0FDdkIsRUFGNkYsQ0FFN0YsQ0FBQztJQUNGLHlCQUFDO0NBMUhELEFBMEhDLElBQUE7U0ExSFksa0JBQWtCIiwiZmlsZSI6InVzZXItcHJvZmlsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==