import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { NotificationState } from '@microsoft/windows-admin-center-sdk/core';
import { take } from 'rxjs/operators';

import { ExtensionProfileSettings } from './models/ExtensionProfileSettings';

@Component({
  selector: 'default-component',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  public settings: ExtensionProfileSettings;
  public settingsFailed: boolean;

  private settingsSubscription: ExtensionProfileSettings;

  /**
   * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
   * functionality.  This is also required of any component that modifies the URL in any way or shape.
   */
  public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
    return 'test';
  }

  constructor(private appContextService: AppContextService) {
    appContextService.settingsManager
      .getExtensionUserSettings(ExtensionProfileSettings)
      .pipe(
      take(1))
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

  private saveSettings() {
    // Note that 'trySave(<Function>)' is also an option for saving. 
    // It will execute a save and rollback an changes made in <Function>. this is usefull for reverting settings after a save fails.
    // using the 'save' method below will not rollback changes.
    this.settings.save()
      .pipe(
      take(1))
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
  public ngOnInit() {
    //
  }

}
