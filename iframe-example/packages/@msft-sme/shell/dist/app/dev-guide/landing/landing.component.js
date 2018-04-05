import { Component } from '@angular/core';
import { AppContextService, DialogService } from '../../../angular';
import { ClientNotificationType, NotificationState } from '../../../core';
var LandingComponent = /** @class */ (function () {
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
        this.appContextService.notification.notify('<noNodename.nodomain.abc.123.xyz.com>', notification);
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
    LandingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-landing',
                    template: "\n      <div class=\"sme-focus-zone sme-layout-absolute sme-position-horizontal-sm sme-position-vertical-none\">\n        <button class=\"sme-button-primary\" (click)=\"manageAs('MyServer')\">Show Manage As Dialog for 'MyServer'</button>\n        <button (click)=\"manageAs('MyServer', true)\">With Pre-Exsisting credentials</button>\n        <button (click)=\"clientNotificationClick()\">Client Notification</button>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    LandingComponent.ctorParameters = function () { return [
        { type: DialogService, },
        { type: AppContextService, },
    ]; };
    return LandingComponent;
}());
export { LandingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbGFuZGluZy9sYW5kaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUUxQyxPQUFPLEVBQUUsaUJBQUEsRUFBbUIsYUFBQSxFQUFjLE1BQU8sa0JBQUEsQ0FBbUI7QUFDcEUsT0FBTyxFQUFzQixzQkFBQSxFQUF3QyxpQkFBQSxFQUFrQixNQUFPLGVBQUEsQ0FBZ0I7QUFHOUc7SUFLSSwwQkFBb0IsYUFBNEIsRUFBVSxpQkFBb0M7UUFBMUUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQzlGLENBQUM7SUFMYSxnQ0FBZSxHQUE3QixVQUE4QixpQkFBb0MsRUFBRSxRQUFnQztRQUNoRyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFLTSxtQ0FBUSxHQUFmLFVBQWdCLFFBQXFCLEVBQUUsV0FBNEI7UUFBbkQseUJBQUEsRUFBQSxhQUFxQjtRQUFFLDRCQUFBLEVBQUEsbUJBQTRCO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztnQkFDNUQsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxDQUFDO1FBQzlHLENBQUM7UUFFRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSxrREFBdUIsR0FBOUI7UUFBQSxpQkFxQ0M7UUFwQ0c7O1dBRUc7UUFDSCxJQUFJLFlBQVksR0FBdUI7WUFDbkMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDekIsSUFBSSxFQUFFLHNCQUFzQixDQUFDLGtCQUFrQjtZQUMvQyxLQUFLLEVBQUUsNkNBQTZDO1lBQ3BELE9BQU8sRUFBRSwwREFBMEQ7WUFDbkUsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxLQUFLLEVBQUUsaUJBQWlCLENBQUMsT0FBTztTQUNuQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsdUNBQXVDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFbEcsVUFBVSxDQUNOO1lBQ0ksWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7WUFDbkMsWUFBWSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7WUFDbEQsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2pFLENBQUMsRUFDRCxJQUFJLENBQUMsQ0FBQztRQUVWLFVBQVUsQ0FDTjtZQUNJLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1lBQ25DLFlBQVksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDO1lBQ2xELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNqRSxDQUFDLEVBQ0QsS0FBSyxDQUFDLENBQUM7UUFFWCxVQUFVLENBQ047WUFDSSxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztZQUNuQyxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztZQUMvQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDakUsQ0FBQyxFQUNELEtBQUssQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUNFLDJCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLHViQU1UO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwrQkFBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsYUFBYSxHQUFHO1FBQ3ZCLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO0tBQzFCLEVBSDZGLENBRzdGLENBQUM7SUFDRix1QkFBQztDQXhFRCxBQXdFQyxJQUFBO1NBeEVZLGdCQUFnQiIsImZpbGUiOiJsYW5kaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=