import { CommonUserSettings, PlainVersionedObject, VersionedObject } from '../../../../core';
/**
 * Defines The extension settings object for the user. Each key identifies the settings for one extension
 */
export interface ExtensionUserSettingsMap extends MsftSme.StringMap<PlainVersionedObject> {
}
/**
 * Defines The extension settings object for the application. Each key identifies the settings for one extension
 */
export interface ExtensionApplicationSettingsMap extends MsftSme.StringMap<PlainVersionedObject> {
}
/**
 * The Versioned representation of the User Profile.
 */
export declare class UserProfile extends VersionedObject {
    /**
     * The names of properties that are saved into the versioned object
     */
    private static propertyNames;
    /**
     * Getter for the latest version of the user profile.
     */
    readonly latestVersion: number;
    /**
     * Getter for common user settings object
     * The settings in the object are available to all extensions
     */
    /**
     * Setter for common user settings object
     */
    common: CommonUserSettings;
    /**
     * Getter for user extension settings object map
     * Each extension has its own object in this map.
     */
    /**
     * Setter for user extension settings object map
     */
    extensions: ExtensionUserSettingsMap;
    /**
     * upgrades the current properties to the latest version
     * if this.currentVersion is null or undefined, then the upgrade should initialize to the latest version
     */
    protected upgrade(): void;
}
