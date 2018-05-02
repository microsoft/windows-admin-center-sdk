// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { NotificationState, VersionedObject, WorkItemResult, WorkItemSubmitRequest } from '@microsoft/windows-admin-center-sdk/core';
import { Observable, Subscription } from 'rxjs';
import { error } from 'util';
import { PowerShellScripts } from '../../../generated/powerShell-scripts';
import { Strings } from '../../../generated/strings';
import { HelloService } from '../hello.service';

/**
 * The Versioned representation of the Hello Extension Settings
 */
export class HelloExtensionSettings extends VersionedObject {

    private static propertyNames = {
        booleanExample: 'booleanExample'
    }

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
        return <boolean>this.getProperty(HelloExtensionSettings.propertyNames.booleanExample)
    }

    /**
     * Setter for the example property.
     * You must use 'setProperty' to set values from the internal object properties store
     */
    public set booleanExample(value: boolean) {
        this.setProperty(HelloExtensionSettings.propertyNames.booleanExample, value);
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

@Component({
    selector: 'sme-user-profile-example',
    templateUrl: './user-profile-example.component.html'
})
export class UserProfileExampleComponent {
    public settings: HelloExtensionSettings;
    public settingsFailed: boolean;

    private settingsSubscription: HelloExtensionSettings;

    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return MsftSme.resourcesStrings<Strings>().HelloWorld.dll.title;
    }

    constructor(private appContextService: AppContextService) {
        appContextService.settingsManager
            .getExtensionUserSettings(HelloExtensionSettings)
            .take(1)
            .subscribe(
            settings => {
                this.settings = settings
            },
            e => {
                this.settingsFailed = true;
                this.appContextService.notification.alert(
                    null,
                    NotificationState.Error,
                    `Failed to load user profile`,
                    'User Profile Failed');
            });
    }

    private saveSettings() {
        // Note that 'trySave(<Function>)' is also an option for saving. 
        // It will execute a save and rollback an changes made in <Function>. this is usefull for reverting settings after a save fails.
        // using the 'save' method below will not rollback changes.
        this.settings.save()
            .take(1)
            .subscribe(
            () => {
                this.appContextService.notification.alert(
                    null,
                    NotificationState.Success,
                    `This user profile has been updated with ${JSON.stringify(this.settings.toJson())}`,
                    'User Profile Saved');
            },
            e => {
                this.appContextService.notification.alert(
                    null,
                    NotificationState.Error,
                    `This user profile failed to save: ${JSON.stringify(this.settings.toJson())}`,
                    'User Profile Failed');
            });

    }
}
