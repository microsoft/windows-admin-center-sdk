import { Component } from '@angular/core';
import { AppContextService, NavigationTitle } from '@msft-sme/angular';
import { NotificationState } from '@msft-sme/core/notification/notification-state';
import { take } from 'rxjs/operators';
import { UserProfile } from './user-profile';


@Component({
    selector: 'sme-dev-guide-settings-service',
    templateUrl: './user-profile.component.html'
})
@NavigationTitle({
    getTitle: () => 'User Profile Example'
})
export class UserProfileComponent {
    public settings: UserProfile;
    public settingsFailed: boolean;
    public userCode = `
\`\`\` ts
// get my extension's user settings
appContextService.settingsManager
// get the settings into the type for the versionedObject extension we defined
    .getExtensionUserSettings(ExampleExtensionSettings)
    .pipe(take(1))
    .subscribe( settings => {
        // change settings
        settings.booleanExample = true;
        // save the settings
        return settings.save();
        // alternatively, we can save and revert if there is a failure.
        return settings.trySave(() => {
            settings.booleanExample = true;
        });
    });
\`\`\`
`;

    constructor(private appContextService: AppContextService) {
        appContextService.settingsManager
            .getExtensionUserSettings(UserProfile)
            .pipe(take(1))
            .subscribe(
            settings => {
                this.settings = settings;
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

    public saveSettings() {
        // Note that 'trySave(<Function>)' is also an option for saving.
        // It will execute a save and rollback an changes made in <Function>. this is usefull for reverting settings after a save fails.
        // using the 'save' method below will not rollback changes.
        this.settings.save()
        .pipe(take(1))
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

    public clearProperty(key: string) {
        if (this.settings.clearProperty(key)) {
            this.appContextService.notification.alert(
                null,
                NotificationState.Success,
                `The user profile have been updated to ${JSON.stringify(this.settings.toJson())}\n
                The property ${key} has been removed.`,
                'User Profile Saved'
            );
        } else {
            this.appContextService.notification.alert(
                null,
                NotificationState.Error,
                `Failed to clear property ${key}`,
                'User Profile Failed'
            );
        }
    }
 }
