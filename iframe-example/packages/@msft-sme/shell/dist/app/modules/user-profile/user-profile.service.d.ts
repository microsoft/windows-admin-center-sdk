import { Observable } from 'rxjs';
import { GatewayService } from '../../../angular';
import { CommonUserSettings, PlainVersionedObject } from '../../../core';
/**
 * User Profile Service. Manages User Profile operations and maintains the internal structure of the user profile.
 */
export declare class UserProfileService {
    private gatewayService;
    /**
     * The user profile subject for caching the user profile instance for use during the application lifecycle.
     */
    private userProfile;
    /**
     * Initializes a new instance of the UserProfileService class.
     *
     * @param gatewayService the GatewayService class instance.
     */
    constructor(gatewayService: GatewayService);
    /**
     * Gets the common user settings
     * @return Observable of the common user settings object
     */
    getCommonSettings(): Observable<CommonUserSettings>;
    /**
     * Sets the common user settings
     * @param settings the common user settings object to save
     * @return An observable for the user profile save process.
     */
    setCommonSettings(settings: CommonUserSettings): Observable<void>;
    /**
     * Gets the user extension settings
     * @param extensionName the name of the extension to get settings for
     * @return the settings object for the given extension name
     */
    getExtensionSettings(extensionName: string): Observable<PlainVersionedObject>;
    /**
     * Sets the extension user settings
     * @param extensionSettings the extension settings object to save
     * @param extensionName the name of the extension to get settings for
     * @return An observable for the user profile save process.
     */
    setExtensionSettings(extensionName: string, extensionSettings: PlainVersionedObject): Observable<void>;
    /**
     * Gets the profile object from the gateway
     * @return the UserProfile
     */
    private getUserProfile();
    /**
     * Sets the profile object on the gateway
     * @param profile a PlainVersionedObject from the UserProfile.ToJson method
     * @return An observable with the result from the set operation
     */
    private setUserProfile(profile);
}
