import { Observable } from 'rxjs/Observable';
import { GatewayConnection } from './gateway-connection';
export interface UserProfile {
    global: MsftSme.StringMap<any>;
    modules: MsftSme.StringMap<MsftSme.StringMap<any>>;
}
export declare class UserProfileManager {
    private gatewayConnection;
    /**
     * Initializes a new instance of the UserProfile class.
     *
     * @param gatewayConnection the GatewayConnection class instance.
     * @param authorizationManager the AuthorizationManager class instance.
     */
    constructor(gatewayConnection: GatewayConnection);
    private readonly moduleName;
    /**
     * Get module settings or specific module setting
     * @param settingName the setting in the current module that you want to access, return all module settings if null
     */
    getModuleSettings<T>(settingName?: string): Observable<T>;
    /**
     * overwrites the value of a setting in the current module
     * @param settingName The setting within the module to set
     * @param value The value of the setting, can be string, number, boolean, or js object
     * @return the updated profile
     */
    setModuleSettings(settingName: string, value: any): Observable<UserProfile>;
    /**
     * Resets current module settings to nothing
     * @return the updated profile
     */
    clearModuleSettings(): Observable<UserProfile>;
    /**
     * Sets up the structure of the profile if it hasn't been set up yet
     * @param profile The profile object to be validated
     * @param moduleName The moduleName to validate
     * @return a validated profile object that retains all original data
     */
    private ensureValidProfile(profile, moduleName?);
    /**
     * Sets the profile object on the gateway
     * @param profile The complete profile object to set
     * @return An observable with the result from the set operation
     */
    private setProfile(profile);
}
