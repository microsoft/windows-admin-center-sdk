import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';
import { VersionedObject } from '@msft-sme/shell/core';
/**
 * The Versioned representation of the Hello Extension Settings
 */
export declare class HelloExtensionSettings extends VersionedObject {
    private static propertyNames;
    /**
     * Getter for the latest version of the user profile.
     */
    readonly latestVersion: number;
    /**
     * Getter for the example property.
     * You must use 'getProperty' to get values from the internal object properties store
     */
    /**
     * Setter for the example property.
     * You must use 'setProperty' to set values from the internal object properties store
     */
    booleanExample: boolean;
    /**
     * Attempts to upgrade the current version of the object at least one version toward the latest version.
     * if this.currentVersion is null or undefined, then the upgrade should initialize to the latest version
     * this is called itterativly untill the current version is equal to the latest version
     */
    protected upgrade(): void;
}
export declare class UserProfileExampleComponent {
    private appContextService;
    settings: HelloExtensionSettings;
    settingsFailed: boolean;
    private settingsSubscription;
    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor(appContextService: AppContextService);
    private saveSettings();
}
