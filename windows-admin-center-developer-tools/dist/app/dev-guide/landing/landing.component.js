import { Component } from '@angular/core';
import { AppContextService, DialogService } from '@msft-sme/shell/angular';
import { ClientNotificationType, NotificationState } from '@msft-sme/shell/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbGFuZGluZy9sYW5kaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUUxQyxPQUFPLEVBQUUsaUJBQUEsRUFBbUIsYUFBQSxFQUFjLE1BQU8seUJBQUEsQ0FBMEI7QUFDM0UsT0FBTyxFQUFzQixzQkFBQSxFQUF3QyxpQkFBQSxFQUFrQixNQUFPLHNCQUFBLENBQXVCO0FBR3JIO0lBS0ksMEJBQW9CLGFBQTRCLEVBQVUsaUJBQW9DO1FBQTFFLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUM5RixDQUFDO0lBTGEsZ0NBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBS00sbUNBQVEsR0FBZixVQUFnQixRQUFxQixFQUFFLFdBQTRCO1FBQW5ELHlCQUFBLEVBQUEsYUFBcUI7UUFBRSw0QkFBQSxFQUFBLG1CQUE0QjtRQUMvRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7Z0JBQzVELEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsQ0FBQztRQUM5RyxDQUFDO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRU0sa0RBQXVCLEdBQTlCO1FBQUEsaUJBcUNDO1FBcENHOztXQUVHO1FBQ0gsSUFBSSxZQUFZLEdBQXVCO1lBQ25DLEVBQUUsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ3pCLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxrQkFBa0I7WUFDL0MsS0FBSyxFQUFFLDZDQUE2QztZQUNwRCxPQUFPLEVBQUUsMERBQTBEO1lBQ25FLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsS0FBSyxFQUFFLGlCQUFpQixDQUFDLE9BQU87U0FDbkMsQ0FBQztRQUNGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLHVDQUF1QyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRWxHLFVBQVUsQ0FDTjtZQUNJLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1lBQ25DLFlBQVksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDO1lBQ2xELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNqRSxDQUFDLEVBQ0QsSUFBSSxDQUFDLENBQUM7UUFFVixVQUFVLENBQ047WUFDSSxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztZQUNuQyxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztZQUNsRCxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDakUsQ0FBQyxFQUNELEtBQUssQ0FBQyxDQUFDO1FBRVgsVUFBVSxDQUNOO1lBQ0ksWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7WUFDbkMsWUFBWSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFDL0MsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2pFLENBQUMsRUFDRCxLQUFLLENBQUMsQ0FBQztJQUNmLENBQUM7SUFDRSwyQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSx1YkFNVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsK0JBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGFBQWEsR0FBRztRQUN2QixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztLQUMxQixFQUg2RixDQUc3RixDQUFDO0lBQ0YsdUJBQUM7Q0F4RUQsQUF3RUMsSUFBQTtTQXhFWSxnQkFBZ0IiLCJmaWxlIjoibGFuZGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbWF0d2lscy9Tb3VyY2UvYmFzZS9tc2Z0LXNtZS1kZXZlbG9wZXItdG9vbHMvaW5saW5lU3JjLyJ9