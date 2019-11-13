import { Component } from '@angular/core';
import { AppContextService, DialogOptions, DialogService, NavigationTitle } from '@msft-sme/angular';
import { PowerShell } from '@msft-sme/core/data/powershell';
import { ClientNotification } from '@msft-sme/core/notification/client-notification';
import { NotificationLinkType } from '@msft-sme/core/notification/notification-link-type';
import { NotificationState } from '@msft-sme/core/notification/notification-state';
import { WorkItemResult, WorkItemSubmitRequest } from '@msft-sme/core/notification/work-item-request';
import { empty, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PowerShellScripts } from '../../../../generated/powershell-scripts';
import { LongRunningNotificationDialogResult } from './long-running-notification-dialog/long-running-notification-dialog.component';

@Component({
    selector: 'sme-dev-guide-shell-services-notifications',
    templateUrl: './notification-service.component.html'
})
@NavigationTitle({
    getTitle: () => 'Notification Service'
})
export class NotificationServiceExampleComponent {
    private alertCount: number;
    private notificationCount: number;
    public codeDisplay: string;

    constructor(private dialogService: DialogService, private appContextService: AppContextService) {
        this.alertCount = 0;
        this.notificationCount = 0;
    }

    public clientNotificationClick(): void {
        const notificationInstance = this.appContextService.notification.create('<noNodename.nodomain.abc.123.xyz.com>');
        const inProgressTitle = 'Executing example action';

        notificationInstance.showInProgress(
            inProgressTitle,
            'message 0 something happened that was really interesting. something happened that was really interesting.'
            + ' something happened that was really interesting.'
        );
        setTimeout(
            () => {
                notificationInstance.showInProgress(inProgressTitle, 'message 1');
            },
            5000);

        setTimeout(
            () => {
                notificationInstance.showInProgress(inProgressTitle, 'message 2');
            },
            10000);

        setTimeout(
            () => {
                notificationInstance.showSuccess('Successfully finished example action', 'message 3');
            },
            15000);

            this.codeDisplay = 'process';
    }

    public onClickLongRunning(shouldSucceed: boolean) {
        this.dialogService.show<DialogOptions, LongRunningNotificationDialogResult>('sme-long-running-notification-dialog', {})
            .pipe(
                mergeMap(result => {
                    if (result && result.targetMachine) {
                        this.submitWorkItemRequest(shouldSucceed, result.targetMachine);
                    }
                    return empty();
                })
            )
            .subscribe();

        this.codeDisplay = 'longRunning';
    }

    public submitWorkItemRequest(shouldSucceed: boolean, targetMachine: string): void {
        this.sendWorkItemRequest(shouldSucceed, targetMachine).subscribe(
            result => {
                if (result.error) {
                    const notification: ClientNotification = {
                        title: 'Long Running Request',
                        message: 'The long running notification failed',
                        id: result.id,
                        state: NotificationState.Error
                    };
                    this.appContextService.notification.notify(targetMachine, notification);
                }

            }
        );
    }

    private sendWorkItemRequest(shouldSucceed: boolean, targetMachine: string): Observable<WorkItemResult> {
        const script = shouldSucceed ?
            PowerShellScripts.Notifications.Start_LongRunningTaskSuccessExample
            : PowerShellScripts.Notifications.Start_LongRunningTaskFailureExample;
        const command = PowerShell.createCommand(script);

        const workItem: WorkItemSubmitRequest = {
            typeId: 'longRunning',
            powerShellCommand: command,

            // in progress notifications
            inProgressTitle: 'Executing long running request',
            startedMessage: 'The long running request has been started',
            progressMessage: 'Working on long running request',

            // success notification
            successTitle: 'Successfully executed long running request',
            successMessage: 'The test {{name}} was successful',
            successLinkText: 'Bing',
            successLink: 'http://www.bing.com',
            successLinkType: NotificationLinkType.Absolute,

            // error notification
            disableErrorNotification: true,
            errorTitle: 'Failed to execute long running request',
            errorMessage: 'Error during test'
        };

        return this.appContextService.workItem.submitAndWait(targetMachine, workItem);
    }

    public sendAlert() {
        const notificationInstance = this.appContextService.notification.create('<noNodename.nodomain.abc.123.xyz.com>');
        const errorTitle = 'Showing Error example';
        ++this.alertCount;
        notificationInstance.showError(
            errorTitle,
            'This demo error has been shown: ' + this.alertCount + ' time(s).'
        );
        this.codeDisplay = 'alert';
    }

    public sendInformation() {
        const notificationInstance = this.appContextService.notification.create('<noNodename.nodomain.abc.123.xyz.com>');
        ++this.notificationCount;
        const informationTitle = 'Showing Information example';
        notificationInstance.showInformation(
            informationTitle,
            'This demo notification has been shown: ' + this.notificationCount + ' time(s).'
        );
        this.codeDisplay = 'notify';
    }
}
