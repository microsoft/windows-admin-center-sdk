import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';
import { NotificationState, WorkItemResult, WorkItemSubmitRequest } from '@msft-sme/shell/core';
import { Observable, Subscription } from 'rxjs';
import { PowerShellScripts } from '../../../generated/powerShell-scripts';
import { Strings } from '../../../generated/strings';
import { HelloService } from '../hello.service';

@Component({
    selector: 'sme-notifications-example',
    template: `
      <!-- <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script> -->
      <sme-tool-header>Notification Examples</sme-tool-header>
      <div class="overflow-margins table-indent">
          This component provides a short overview / example on how to utilize the alert and notification features provided by the
          Honolulu project, and shell. At this point in time, there are 3 examples, 2 popups and one tray notification. <br/>    Popup notifications fall in 2 forms: Notification and Alert. Notifications are grey in color, and disappear after ~10
          seconds, while Alerts are red, and do not automatically dismiss (requires user acknowledgement).
      </div>
      <div>
          <sme-action-bar class="fixed-flex-size tool-bar first-row">
              <sme-action-button #action [text]="'Send Alert'" [iconClass]="'sme-icon icon-win-upload'" (execute)="sendAlert($event)"></sme-action-button>
              <sme-action-button #action [text]="'Send Popup Notification'" [iconClass]="'sme-icon icon-win-download'" (execute)="sendNotification($event)"></sme-action-button>
              <sme-action-button #action [text]="'Send Long Running Notification'" [iconClass]="'sme-icon icon-win-powerButton'" (execute)="initiateLongRunningNotifiaction($event)"></sme-action-button>
          </sme-action-bar>
      </div>
      <div>
          <div *ngIf="codeDisplay === 'alert'">
              <pre class="prettyprint">
                  <code>
                          //  Alerts show up as red message boxes on the right hand side of the screen.
                          //  These messages will stay open until the page is refreshed (full browser)
                          //  or the user dismesses them.
                          //  There is currently no way to modify the icon on the alert.
                          const nodeName = this.appContextService.activeConnection.nodeName;
                          ++this.alertCount;
                          this.appContextService.notification.alert(
                              nodeName,
                              NotificationState.Error,
                              'This demo error has been shown: ' + this.alertCount + ' time(s).',
                              'DEMO ERROR');
                  </code>
              </pre>
          </div>
          <div *ngIf="codeDisplay === 'notify'">
              <pre class="prettyprint">
                  <code>
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
                  </code>
              </pre>
          </div>
          <div *ngIf="codeDisplay === 'longrunning'">
                  <pre class="prettyprint">
                      <code ng-non-bindable>
                          /*
                          *  The AppContextService work item class is used to initiate the UX notification tray experience,
                          *  the most common usage is for long running tasks that user notification and progress are required.
                          *  This event will show up in the Action Pane, under the bell button on Honolulu.
                          */
                          return this.appContextService.workItem.submitAndWait(
                              this.appContextService.activeConnection.nodeName,
                              &lt;WorkItemSubmitRequest&gt;{{ '{' }}
                                  title: 'Executing a long running work item.',
                                  description: 'Test long running powershell script with notification.',
                                  powerShellScript: PowerShellScripts.Get_WinRmState,
                                  startedMessage: 'Starting %7B%7BobjectName%7D...',
                                  successMessage: 'Successfully completed: %7B%7BobjectName%7D%7D - %7B%7Bname%7D%7D.',
                                  errorMessage: 'Failed: %7B%7Bmessage%7D%7D',
                                  progressMessage: 'In progress: %7B%7Bpercent%7D%7D%',
                                  objectName: 'My hello object'
                                  {{ '}' }});
                      </code>
                  </pre>
              </div>
      </div>
    `,
    styles: [`

    `]
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
