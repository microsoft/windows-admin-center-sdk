import { Observable } from 'rxjs';
import { JsonObject } from '../base/json';
import { VersionedObject, VersionedObjectConstructor } from '../base/versioned-object';
import { Rpc } from '../rpc/rpc';
/**
 * Defines The common user settings object that is shared through the whole application.
 */
export interface CommonUserSettings extends JsonObject {
}
/**
 * Defines The common application settings object that is shared through the whole application.
 */
export interface CommonApplicationSettings extends JsonObject {
}
/**
 * Manager for the settings. Provides an api for managing user and application settings.
 */
export declare class SettingsManager {
    private rpc;
    /**
     * Initializes a new instance of the SettingsManager class.
     *
     * @param rpc the RPC class instance.
     */
    constructor(rpc: Rpc);
    /**
     * Get common user settings. This is currently read-only
     */
    getCommonUserSettings(): Observable<CommonUserSettings>;
    /**
     * Get common application settings. This is currently read-only
     */
    getCommonApplicationSettings(): Observable<CommonUserSettings>;
    /**
     * Get extension user settings
     * Extension settings objects must be an object that extends VersionedObject or implements the VersionedObjectConstructor
     * example: if TestObject extends VersionedObject, then getExtensionSettings(TestObject) will return an Observable<TestObject>
     * you should only create 1 versioned object for your extensions user settings.
     */
    getExtensionUserSettings<T extends VersionedObject>(type: VersionedObjectConstructor<T>): Observable<T>;
    /**
     * Get extension application settings
     * Extension settings objects must be an object that extends VersionedObject or implements the VersionedObjectConstructor
     * example: if TestObject extends VersionedObject, then getExtensionSettings(TestObject) will return an Observable<TestObject>
     * you should only create 1 versioned object for your extensions application settings.
     */
    getExtensionApplicationSettings<T extends VersionedObject>(type: VersionedObjectConstructor<T>): Observable<T>;
}
