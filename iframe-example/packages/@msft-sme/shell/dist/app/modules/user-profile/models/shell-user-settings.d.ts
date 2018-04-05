import { VersionedObject } from '../../../../core';
/**
 * The Versioned representation of the Shell User Settings
 * This object is used for settings that specific to the current user and to shell
 */
export declare class ShellUserSettings extends VersionedObject {
    private static propertyNames;
    /**
     * Getter for the latest version of the user profile.
     */
    readonly latestVersion: number;
    /**
     * The latest day zero dialog version to check against
     */
    private latestDayZeroVersion;
    /**
     * Getter for indicating if the dayZeroExperience is enabled
     */
    readonly dayZeroEnabled: boolean;
    /**
     * Getter for the users current dayZeroVersion
     */
    /**
     * Setter for the users current dayZeroVersion
     */
    private dayZeroVersion;
    /**
     * Getter for the users prefrence on having the tools list expanded
     */
    /**
     * Setter for the users prefrence on having the tools list expanded
     */
    isToolsExpanded: boolean;
    /**
     * Attempts to upgrade the current version of the object at least one version toward the latest version.
     * if this.currentVersion is null or undefined, then the upgrade should initialize to the latest version
     * this is called itterativly untill the current version is equal to the latest version
     */
    protected upgrade(): void;
    /**
     * Marks the day zero experience as completed
     */
    completeDayZeroExperience(): void;
}
