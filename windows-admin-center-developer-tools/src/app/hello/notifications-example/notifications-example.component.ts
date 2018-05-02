// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { NotificationState, WorkItemResult, WorkItemSubmitRequest } from '@microsoft/windows-admin-center-sdk/core';
import { Observable, Subscription } from 'rxjs';
import { PowerShellScripts } from '../../../generated/powerShell-scripts';
import { Strings } from '../../../generated/strings';
import { HelloService } from '../hello.service';

@Component({
    selector: 'sme-notifications-example',
    templateUrl: './notifications-example.component.html',
    styleUrls: ['./notifications-example.component.css']
})
export class NotificationsExampleComponent implements OnInit, OnDestroy {
    private alertCount: number;
    private notificationCount: number;
    private longRunningMessage: string;
    public codeDisplay: string;

    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return MsftSme.resourcesStrings<Strings>().HelloWorld.notifications.title;
    }

    constructor(private appContextService: AppContextService, private helloService: HelloService) {
        this.alertCount = 0;
        this.notificationCount = 0;
    }

    public ngOnInit() {
        // todo: init logic.
    }

    public ngOnDestroy() {
        // Cleanup logic.
    }

    public sendAlert(event) {
        //  Alerts show up as red message boxes on the right hand side of the screen.
        //  These messages will stay open until the page is refreshed (full browser)
        //  or the user dismisses them.
        //  There is currently no way to modify the icon on the alert.
        const nodeName = this.appContextService.activeConnection.nodeName;
        ++this.alertCount;
        this.appContextService.notification.alert(
            nodeName,
            NotificationState.Error,
            'This demo error has been shown: ' + this.alertCount + ' time(s).',
            'DEMO ERROR');

        this.codeDisplay = 'alert';
    }

    public sendNotification(event) {
        //  Notifications show up as a grey message box on the right hand side of the screen.
        //  These messages will automatically close after ~10 seconds.
        //  There is currently no way to modify the icon on the notification.
        const nodeName = this.appContextService.activeConnection.nodeName;  // move to service
        ++this.notificationCount;
        this.appContextService.notification.alert(
            nodeName,
            NotificationState.Informational,
            'This demo notification has been shown: ' + this.notificationCount + ' time(s).',
            'DEMO NOTIFICATION');

        this.codeDisplay = 'notify';
    }

    /**
     * Illustrates how to setup and subscribe to the results of a long running task,
     * as well as process the response from the task.
     * 
     * This method uses the RX take(1) rather than managing a local subscription reference.  The reason for doing this
     * is so that the component does not have to manage the descruction / clean up of the subscription.
     * You should use this method of subscription management when you have a quick (sub 200ms) method
     * that needs to be executed.
     */
    public initiateLongRunningNotifiaction(event) {
        this.setupNotification().take(1).subscribe(
            response => {
                if (response.state === NotificationState.Success) {
                    this.longRunningMessage = 'Long running task was finished successfully';
                } else {
                    this.longRunningMessage = 'There were issues running the task.';
                }
            }
        );
    }

    /*
    *  The AppContextService work item class is used to initiate the UX notification tray experience,
    *  the most common usage is for long running tasks that user notification and progress are required.
    *  This event will show up in the Action Pane, under the bell button on Honolulu.
    */
    private setupNotification(): Observable<WorkItemResult> {
        this.codeDisplay = 'longrunning';
        return this.appContextService.workItem.submitAndWait(
            this.appContextService.activeConnection.nodeName,
            <WorkItemSubmitRequest>{
                title: 'Executing a long running work item.',
                description: 'Test long running powershell script with notification.',
                powerShellScript: PowerShellScripts.Get_WinRmState,
                startedMessage: 'Starting {{objectName}}...',
                successMessage: 'Successfully completed: {{objectName}} - {{name}}.',
                errorMessage: 'Failed: {{message}}',
                progressMessage: 'In progress: {{percent}}%',
                objectName: 'My hello object'
            });
    }
}
