import { VersionedObject } from '../../../../core';
/**
 * The Versioned representation of the Shell Common Settings
 * Unlike Common Application settings, these settings are specific to the shell and not available to extensions.
 *
 * TODO: Populate with properties when needed
 */
export declare class ShellApplicationSettings extends VersionedObject {
    /**
     * Getter for the latest version of the user profile.
     */
    readonly latestVersion: number;
    /**
     * Attempts to upgrade the current version of the object at least one version toward the latest version.
     * if this.currentVersion is null or undefined, then the upgrade should initialize to the latest version
     * this is called itterativly untill the current version is equal to the latest version
     */
    protected upgrade(): void;
}
