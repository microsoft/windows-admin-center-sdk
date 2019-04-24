// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { VersionedObject } from '@microsoft/windows-admin-center-sdk/core';


/**
 * The Versioned representation of the Hello Extension Settings
 */
export class ExtensionProfileSettings extends VersionedObject {

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
        return <boolean>this.getProperty(ExtensionProfileSettings.propertyNames.booleanExample);
    }

    /**
     * Setter for the example property.
     * You must use 'setProperty' to set values from the internal object properties store
     */
    public set booleanExample(value: boolean) {
        this.setProperty(ExtensionProfileSettings.propertyNames.booleanExample, value);
    }

    /**
     * Attempts to upgrade the current version of the object at least one version toward the latest version.
     * if this.currentVersion is null or undefined, then the upgrade should initialize to the latest version
     * this is called iteratively until the current version is equal to the latest version
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
