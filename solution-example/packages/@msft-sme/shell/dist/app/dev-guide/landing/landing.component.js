import { Component } from '@angular/core';
import { ClientNotificationType, NotificationState } from '../../../core';
var LandingComponent = (function () {
    function LandingComponent(dialogService, appContextService) {
        this.dialogService = dialogService;
        this.appContextService = appContextService;
    }
    LandingComponent.navigationTitle = function (appContextService, snapshot) {
        return 'Landing';
    };
    LandingComponent.prototype.manageAs = function (nodeName, addOverride) {
        if (nodeName === void 0) { nodeName = ''; }
        if (addOverride === void 0) { addOverride = false; }
        if (addOverride) {
            this.appContextService.authorizationManager.nodeTokens[nodeName] =
                { username: 'admin', value: 'thisisafaketoken', useLaps: false, lapsLocalAdminName: 'administrator' };
        }
        this.appContextService.authorizationManager.getNewToken(nodeName);
    };
    LandingComponent.prototype.clientNotificationClick = function () {
        var _this = this;
        /**
         * Create client based notification. (not tracked by the gateway.)
         */
        var notification = {
            id: MsftSme.getUniqueId(),
            type: ClientNotificationType.NotificationCenter,
            title: 'My notification for the click button action',
            message: 'message 0 something happened that was really interesting',
            description: 'my notification description',
            state: NotificationState.Started
        };
        this.appContextService.notification.notify('<noNodename>', notification);
        setTimeout(function () {
            notification.message = 'message 1';
            notification.state = NotificationState.InProgress;
            _this.appContextService.notification.notify('', notification);
        }, 5000);
        setTimeout(function () {
            notification.message = 'message 2';
            notification.state = NotificationState.InProgress;
            _this.appContextService.notification.notify('', notification);
        }, 10000);
        setTimeout(function () {
            notification.message = 'message 3';
            notification.state = NotificationState.Success;
            _this.appContextService.notification.notify('', notification);
        }, 15000);
    };
    return LandingComponent;
}());
export { LandingComponent };
LandingComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-landing',
                template: "\n      <div class=\"m-l-xxs tool-container\">\n        <h1>Development Guide</h1>\n        <button (click)=\"manageAs('MyServer')\">Show Manage As Dialog for 'MyServer'</button>\n        <button (click)=\"manageAs('MyServer', true)\">With Pre-Exsisting credentials</button>\n        <button (click)=\"clientNotificationClick()\">Client Notification</button>\n      </div>\n    "
            },] },
];
/** @nocollapse */
LandingComponent.ctorParameters = function () { return [
    null,
    null,
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbGFuZGluZy9sYW5kaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUcxQyxPQUFPLEVBQXNCLHNCQUFBLEVBQXdDLGlCQUFBLEVBQWtCLE1BQU8sZUFBQSxDQUFnQjtBQUc5RztJQUtJLDBCQUFvQixhQUE0QixFQUFVLGlCQUFvQztRQUExRSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFDOUYsQ0FBQztJQUxhLGdDQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUtNLG1DQUFRLEdBQWYsVUFBZ0IsUUFBcUIsRUFBRSxXQUE0QjtRQUFuRCx5QkFBQSxFQUFBLGFBQXFCO1FBQUUsNEJBQUEsRUFBQSxtQkFBNEI7UUFDL0QsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO2dCQUM1RCxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLENBQUM7UUFDOUcsQ0FBQztRQUVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVNLGtEQUF1QixHQUE5QjtRQUFBLGlCQXFDQztRQXBDRzs7V0FFRztRQUNILElBQUksWUFBWSxHQUF1QjtZQUNuQyxFQUFFLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUN6QixJQUFJLEVBQUUsc0JBQXNCLENBQUMsa0JBQWtCO1lBQy9DLEtBQUssRUFBRSw2Q0FBNkM7WUFDcEQsT0FBTyxFQUFFLDBEQUEwRDtZQUNuRSxXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxPQUFPO1NBQ25DLENBQUM7UUFDRixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFekUsVUFBVSxDQUNOO1lBQ0ksWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7WUFDbkMsWUFBWSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7WUFDbEQsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2pFLENBQUMsRUFDRCxJQUFJLENBQUMsQ0FBQztRQUVWLFVBQVUsQ0FDTjtZQUNJLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1lBQ25DLFlBQVksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDO1lBQ2xELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNqRSxDQUFDLEVBQ0QsS0FBSyxDQUFDLENBQUM7UUFFWCxVQUFVLENBQ047WUFDSSxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztZQUNuQyxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztZQUMvQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDakUsQ0FBQyxFQUNELEtBQUssQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQW1CTCx1QkFBQztBQUFELENBekVBLEFBeUVDOztBQWxCTSwyQkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRSw0WEFPVDthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCwrQkFBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsSUFBSTtJQUNKLElBQUk7Q0FDSCxFQUg2RixDQUc3RixDQUFDIiwiZmlsZSI6ImxhbmRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==