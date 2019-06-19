import { Component } from '@angular/core';
import { AppContextService, NavigationTitle } from '@msft-sme/angular';
import { NotificationState } from '@msft-sme/core/notification/notification-state';
import { take } from 'rxjs/operators';
import { ApplicationSettings } from './application-settings';


@Component({
    selector: 'sme-dev-guide-settings-service',
    templateUrl: './application-settings.component.html'
})
@NavigationTitle({
    getTitle: () => 'Application Settings Example'
})
export class ApplicationSettingsComponent {
    public settings: ApplicationSettings;
    public settingsFailed: boolean;
    public appCode = `
\`\`\` ts
// get my extension's app settings
appContextService.settingsManager
// get the settings into the type for the versionedObject extension we defined
    .getExtensionApplicationSettings(ExampleExtensionSettings)
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
            .getExtensionApplicationSettings(ApplicationSettings)
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
                    `Failed to load application settings`,
                    'Application Settings Failed');
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
                    `The application settings have been updated with ${JSON.stringify(this.settings.toJson())}`,
                    'Application Settings Saved');
            },
            e => {
                this.appContextService.notification.alert(
                    null,
                    NotificationState.Error,
                    `The application settings failed to save: ${JSON.stringify(this.settings.toJson())}`,
                    'Application Settings Failed');
            });

    }
 }
