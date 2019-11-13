import { Component } from '@angular/core';
import { AppContextService, NavigationTitle } from '@msft-sme/angular';
import { NotificationState } from '@msft-sme/core/notification/notification-state';
import { take } from 'rxjs/operators';
import { AdminSettings } from './admin-settings';


@Component({
    selector: 'sme-dev-guide-settings-service',
    templateUrl: './admin-settings.component.html'
})
@NavigationTitle({
    getTitle: () => 'Admin Settings Example'
})
export class AdminSettingsComponent {
    public settings: AdminSettings;
    public settingsFailed: boolean;
    public adminCode = `
\`\`\` ts
// get my extension's admin settings
appContextService.settingsManager
// get the settings into the type for the versionedObject extension we defined
    .getExtensionAdminSettings(ExampleExtensionSettings)
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
            .getExtensionAdminSettings(AdminSettings)
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
                    `Failed to load admin settings`,
                    'Admin Settings Failed');
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
                    `The admin settings have been updated with ${JSON.stringify(this.settings.toJson())}`,
                    'Admin Settings Saved');
            },
            e => {
                this.appContextService.notification.alert(
                    null,
                    NotificationState.Error,
                    `The admin settings failed to save: ${JSON.stringify(this.settings.toJson())}\n
                     You may need to allow elevated privileges or refresh the page.`,
                    'Admin Settings Failed');
            });

    }

    public clearProperty(key: string) {
        if (this.settings.clearProperty(key)) {
            this.appContextService.notification.alert(
                null,
                NotificationState.Success,
                `The admin settings have been updated to ${JSON.stringify(this.settings.toJson())}\n
                The property ${key} has been removed `,
                'Admin Settings Saved'
            );
        } else {
            this.appContextService.notification.alert(
                null,
                NotificationState.Error,
                `Failed to clear property ${key}
                 You may need to allow elevated privileges or refresh the page.`,
                'Admin Settings Failed'
            );
        }
    }
 }
