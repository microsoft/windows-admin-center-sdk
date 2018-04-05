import { Component } from '@angular/core';
import { AppContextService } from '@msft-sme/shell/angular';
import { NotificationState } from '@msft-sme/shell/core';
import { PowerShellScripts } from '../../../generated/powerShell-scripts';
import { HelloService } from '../hello.service';
var NotificationsExampleComponent = /** @class */ (function () {
    function NotificationsExampleComponent(appContextService, helloService) {
        this.appContextService = appContextService;
        this.helloService = helloService;
        this.alertCount = 0;
        this.notificationCount = 0;
    }
    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    NotificationsExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return MsftSme.resourcesStrings().HelloWorld.notifications.title;
    };
    NotificationsExampleComponent.prototype.ngOnInit = function () {
        // todo: init logic.
    };
    NotificationsExampleComponent.prototype.ngOnDestroy = function () {
        // Cleanup logic.
    };
    NotificationsExampleComponent.prototype.sendAlert = function (event) {
        //  Alerts show up as red message boxes on the right hand side of the screen.
        //  These messages will stay open until the page is refreshed (full browser)
        //  or the user dismisses them.
        //  There is currently no way to modify the icon on the alert.
        var nodeName = this.appContextService.activeConnection.nodeName;
        ++this.alertCount;
        this.appContextService.notification.alert(nodeName, NotificationState.Error, 'This demo error has been shown: ' + this.alertCount + ' time(s).', 'DEMO ERROR');
        this.codeDisplay = 'alert';
    };
    NotificationsExampleComponent.prototype.sendNotification = function (event) {
        //  Notifications show up as a grey message box on the right hand side of the screen.
        //  These messages will automatically close after ~10 seconds.
        //  There is currently no way to modify the icon on the notification.
        var nodeName = this.appContextService.activeConnection.nodeName; // move to service
        ++this.notificationCount;
        this.appContextService.notification.alert(nodeName, NotificationState.Informational, 'This demo notification has been shown: ' + this.notificationCount + ' time(s).', 'DEMO NOTIFICATION');
        this.codeDisplay = 'notify';
    };
    /**
     * Illustrates how to setup and subscribe to the results of a long running task,
     * as well as process the response from the task.
     *
     * This method uses the RX take(1) rather than managing a local subscription reference.  The reason for doing this
     * is so that the component does not have to manage the descruction / clean up of the subscription.
     * You should use this method of subscription management when you have a quick (sub 200ms) method
     * that needs to be executed.
     */
    NotificationsExampleComponent.prototype.initiateLongRunningNotifiaction = function (event) {
        var _this = this;
        this.setupNotification().take(1).subscribe(function (response) {
            if (response.state === NotificationState.Success) {
                _this.longRunningMessage = 'Long running task was finished successfully';
            }
            else {
                _this.longRunningMessage = 'There were issues running the task.';
            }
        });
    };
    /*
    *  The AppContextService work item class is used to initiate the UX notification tray experience,
    *  the most common usage is for long running tasks that user notification and progress are required.
    *  This event will show up in the Action Pane, under the bell button on Honolulu.
    */
    NotificationsExampleComponent.prototype.setupNotification = function () {
        this.codeDisplay = 'longrunning';
        return this.appContextService.workItem.submitAndWait(this.appContextService.activeConnection.nodeName, {
            title: 'Executing a long running work item.',
            description: 'Test long running powershell script with notification.',
            powerShellScript: PowerShellScripts.Get_WinRmState,
            startedMessage: 'Starting {{objectName}}...',
            successMessage: 'Successfully completed: {{objectName}} - {{name}}.',
            errorMessage: 'Failed: {{message}}',
            progressMessage: 'In progress: {{percent}}%',
            objectName: 'My hello object'
        });
    };
    NotificationsExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-notifications-example',
                    template: "\n      <!-- <script src=\"https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js\"></script> -->\n      <sme-tool-header>Notification Examples</sme-tool-header>\n      <div class=\"overflow-margins table-indent\">\n          This component provides a short overview / example on how to utilize the alert and notification features provided by the\n          Honolulu project, and shell. At this point in time, there are 3 examples, 2 popups and one tray notification. <br/>    Popup notifications fall in 2 forms: Notification and Alert. Notifications are grey in color, and disappear after ~10\n          seconds, while Alerts are red, and do not automatically dismiss (requires user acknowledgement).\n      </div>\n      <div>\n          <sme-action-bar class=\"fixed-flex-size tool-bar first-row\">\n              <sme-action-button #action [text]=\"'Send Alert'\" [iconClass]=\"'sme-icon icon-win-upload'\" (execute)=\"sendAlert($event)\"></sme-action-button>\n              <sme-action-button #action [text]=\"'Send Popup Notification'\" [iconClass]=\"'sme-icon icon-win-download'\" (execute)=\"sendNotification($event)\"></sme-action-button>\n              <sme-action-button #action [text]=\"'Send Long Running Notification'\" [iconClass]=\"'sme-icon icon-win-powerButton'\" (execute)=\"initiateLongRunningNotifiaction($event)\"></sme-action-button>\n          </sme-action-bar>\n      </div>\n      <div>\n          <div *ngIf=\"codeDisplay === 'alert'\">\n              <pre class=\"prettyprint\">\n                  <code>\n                          //  Alerts show up as red message boxes on the right hand side of the screen.\n                          //  These messages will stay open until the page is refreshed (full browser)\n                          //  or the user dismesses them.\n                          //  There is currently no way to modify the icon on the alert.\n                          const nodeName = this.appContextService.activeConnection.nodeName;\n                          ++this.alertCount;\n                          this.appContextService.notification.alert(\n                              nodeName,\n                              NotificationState.Error,\n                              'This demo error has been shown: ' + this.alertCount + ' time(s).',\n                              'DEMO ERROR');\n                  </code>\n              </pre>\n          </div>\n          <div *ngIf=\"codeDisplay === 'notify'\">\n              <pre class=\"prettyprint\">\n                  <code>\n                      //  Notifications show up as a grey message box on the right hand side of the screen.\n                      //  These messages will automatically close after ~10 seconds.\n                      //  There is currently no way to modify the icon on the notification.\n                      const nodeName = this.appContextService.activeConnection.nodeName;  // move to service\n                      ++this.notificationCount;\n                      this.appContextService.notification.alert(\n                          nodeName,\n                          NotificationState.Informational,\n                          'This demo notification has been shown: ' + this.notificationCount + ' time(s).',\n                          'DEMO NOTIFICATION');\n                  </code>\n              </pre>\n          </div>\n          <div *ngIf=\"codeDisplay === 'longrunning'\">\n                  <pre class=\"prettyprint\">\n                      <code ng-non-bindable>\n                          /*\n                          *  The AppContextService work item class is used to initiate the UX notification tray experience,\n                          *  the most common usage is for long running tasks that user notification and progress are required.\n                          *  This event will show up in the Action Pane, under the bell button on Honolulu.\n                          */\n                          return this.appContextService.workItem.submitAndWait(\n                              this.appContextService.activeConnection.nodeName,\n                              &lt;WorkItemSubmitRequest&gt;{{ '{' }}\n                                  title: 'Executing a long running work item.',\n                                  description: 'Test long running powershell script with notification.',\n                                  powerShellScript: PowerShellScripts.Get_WinRmState,\n                                  startedMessage: 'Starting %7B%7BobjectName%7D...',\n                                  successMessage: 'Successfully completed: %7B%7BobjectName%7D%7D - %7B%7Bname%7D%7D.',\n                                  errorMessage: 'Failed: %7B%7Bmessage%7D%7D',\n                                  progressMessage: 'In progress: %7B%7Bpercent%7D%7D%',\n                                  objectName: 'My hello object'\n                                  {{ '}' }});\n                      </code>\n                  </pre>\n              </div>\n      </div>\n    ",
                    styles: ["\n\n    "]
                },] },
    ];
    /** @nocollapse */
    NotificationsExampleComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: HelloService, },
    ]; };
    return NotificationsExampleComponent;
}());
export { NotificationsExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9oZWxsby9ub3RpZmljYXRpb25zLWV4YW1wbGUvbm90aWZpY2F0aW9ucy1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFFN0QsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8seUJBQUEsQ0FBMEI7QUFDNUQsT0FBTyxFQUFFLGlCQUFBLEVBQXlELE1BQU8sc0JBQUEsQ0FBdUI7QUFFaEcsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sdUNBQUEsQ0FBd0M7QUFFMUUsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGtCQUFBLENBQW1CO0FBR2hEO0lBY0ksdUNBQW9CLGlCQUFvQyxFQUFVLFlBQTBCO1FBQXhFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUN4RixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFYRDs7O09BR0c7SUFDVyw2Q0FBZSxHQUE3QixVQUE4QixpQkFBb0MsRUFBRSxRQUFnQztRQUNoRyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDOUUsQ0FBQztJQU9NLGdEQUFRLEdBQWY7UUFDSSxvQkFBb0I7SUFDeEIsQ0FBQztJQUVNLG1EQUFXLEdBQWxCO1FBQ0ksaUJBQWlCO0lBQ3JCLENBQUM7SUFFTSxpREFBUyxHQUFoQixVQUFpQixLQUFLO1FBQ2xCLDZFQUE2RTtRQUM3RSw0RUFBNEU7UUFDNUUsK0JBQStCO1FBQy9CLDhEQUE4RDtRQUM5RCxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO1FBQ2xFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNsQixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FDckMsUUFBUSxFQUNSLGlCQUFpQixDQUFDLEtBQUssRUFDdkIsa0NBQWtDLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLEVBQ2xFLFlBQVksQ0FBQyxDQUFDO1FBRWxCLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFFTSx3REFBZ0IsR0FBdkIsVUFBd0IsS0FBSztRQUN6QixxRkFBcUY7UUFDckYsOERBQThEO1FBQzlELHFFQUFxRTtRQUNyRSxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUUsa0JBQWtCO1FBQ3RGLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUNyQyxRQUFRLEVBQ1IsaUJBQWlCLENBQUMsYUFBYSxFQUMvQix5Q0FBeUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsV0FBVyxFQUNoRixtQkFBbUIsQ0FBQyxDQUFDO1FBRXpCLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLHVFQUErQixHQUF0QyxVQUF1QyxLQUFLO1FBQTVDLGlCQVVDO1FBVEcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FDdEMsVUFBQSxRQUFRO1lBQ0osRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxLQUFJLENBQUMsa0JBQWtCLEdBQUcsNkNBQTZDLENBQUM7WUFDNUUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxxQ0FBcUMsQ0FBQztZQUNwRSxDQUFDO1FBQ0wsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNNLHlEQUFpQixHQUF6QjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FDaEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFDekI7WUFDbkIsS0FBSyxFQUFFLHFDQUFxQztZQUM1QyxXQUFXLEVBQUUsd0RBQXdEO1lBQ3JFLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLGNBQWM7WUFDbEQsY0FBYyxFQUFFLDRCQUE0QjtZQUM1QyxjQUFjLEVBQUUsb0RBQW9EO1lBQ3BFLFlBQVksRUFBRSxxQkFBcUI7WUFDbkMsZUFBZSxFQUFFLDJCQUEyQjtZQUM1QyxVQUFVLEVBQUUsaUJBQWlCO1NBQ2hDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRSx3Q0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFFBQVEsRUFBRSw0N0pBeUVUO29CQUNELE1BQU0sRUFBRSxDQUFDLFVBRVIsQ0FBQztpQkFDTCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsNENBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO1FBQzNCLEVBQUMsSUFBSSxFQUFFLFlBQVksR0FBRztLQUNyQixFQUg2RixDQUc3RixDQUFDO0lBQ0Ysb0NBQUM7Q0ExTEQsQUEwTEMsSUFBQTtTQTFMWSw2QkFBNkIiLCJmaWxlIjoibm90aWZpY2F0aW9ucy1leGFtcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL1NvdXJjZS9iYXNlL21zZnQtc21lLWRldmVsb3Blci10b29scy9pbmxpbmVTcmMvIn0=