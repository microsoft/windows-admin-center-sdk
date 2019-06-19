import { VersionedObject } from '@msft-sme/core/base/versioned-object';

/**
 * The Versioned representation of the User Extension Settings
 */
export class UserProfile extends VersionedObject {

    private static propertyNames = {
        booleanExample: 'booleanExample'
    };

    /**
     * Getter for the latest version of the user profile.
     */
    public get latestVersion(): number {
        return 0;
    }

    /**
     * Getter for the example property.
     * You must use 'getProperty' to get values from the internal object properties store
     */
    public get booleanExample(): boolean {
        return <boolean>this.getProperty(UserProfile.propertyNames.booleanExample);
    }

    /**
     * Setter for the example property.
     * You must use 'setProperty' to set values from the internal object properties store
     */
    public set booleanExample(value: boolean) {
        this.setProperty(UserProfile.propertyNames.booleanExample, value);
    }

    /**
     * Attempts to upgrade the current version of the object at least one version toward the latest version.
     * if this.currentVersion is null or undefined, then the upgrade should initialize to the latest version
     * this is called itterativly untill the current version is equal to the latest version
     */
    protected upgrade() {
        // For now, we dont need to do anything but initialize to the latest version.
        // NOTE: When latestVersion is updated, then we need to add logic here to upgrade old settings objects
        if (MsftSme.isNullOrUndefined(this.currentVersion)) {
            this.clear();
            this.booleanExample = false;
            this.currentVersion = this.latestVersion;
            return;
        }
    }
}
