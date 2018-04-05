var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '@angular/core';
import { AlertSeverity, BaseDialogComponent } from '../../../../angular';
import { NotificationChangeEvent, NotificationState } from '../../../../core';
var NotificationsDialogComponent = (function (_super) {
    __extends(NotificationsDialogComponent, _super);
    /**
     * Initializes a new instance of the NotificationsPaneComponent class.
     *
     * @param appContextService the app context service.
     * @param alertBarService the alert bar service.
     * @param dialogService the dialog service.
     */
    function NotificationsDialogComponent(appContextService, alertBarService, dialogService) {
        var _this = _super.call(this, dialogService) || this;
        _this.appContextService = appContextService;
        _this.alertBarService = alertBarService;
        _this.msgs = [];
        _this.selectedNotification = null;
        _this.inProgressNotifications = [];
        _this.strings = MsftSme.resourcesStrings();
        _this.id = dialogService.commonIds.notifications;
        return _this;
    }
    /**
     * The method to run when the component is initialized. Sets up notification subscription.
     */
    NotificationsDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.notificationsSubscription = this.appContextService.notification.notificationManager.changed.subscribe(function (event) {
            switch (event.changeEvent) {
                case NotificationChangeEvent.Change:
                    // don't push state changes for dismissed progress notifications
                    // add new notification when process completes
                    if (event.notification.state !== 2) {
                        if (event.notification.dismissed) {
                            _this.msgs.push(event.notification);
                            _this.updateCount();
                        }
                        else if (_this.inProgressNotifications.find(function (x) { return x.id === event.notification.id; })) {
                            _this.updateCount();
                        }
                    }
                    break;
                case NotificationChangeEvent.Add:
                    _this.msgs.push(event.notification);
                    _this.updateCount();
                    break;
                case NotificationChangeEvent.Remove:
                    MsftSme.remove(_this.msgs, _this.msgs.find(function (x) { return x.id === event.notification.id; }));
                    break;
                case NotificationChangeEvent.Instant:
                    var severity = AlertSeverity.Informational;
                    switch (event.notification.state) {
                        case NotificationState.Critical:
                        case NotificationState.Error:
                            severity = AlertSeverity.Error;
                            break;
                        case NotificationState.Warning:
                            severity = AlertSeverity.Warning;
                            break;
                        case NotificationState.Started:
                        case NotificationState.InProgress:
                        case NotificationState.Informational:
                        case NotificationState.Success:
                            severity = AlertSeverity.Informational;
                            break;
                    }
                    _this.alertBarService.showAlert({
                        title: event.notification.title,
                        message: event.notification.message,
                        severity: severity
                    });
                    break;
            }
            _this.msgs = _this.msgs.sort(function (x, y) { return x.changedTimestamp < y.changedTimestamp ? 1 : -1; });
        });
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * update notification count if notifications pane is closed
     */
    NotificationsDialogComponent.prototype.updateCount = function () {
        if (!this.dialogService.activeDialogsStack || this.dialogService.activeDialogsStack.length === 0 ||
            (this.dialogService.activeDialogsStack.length > 0 && MsftSme.last(this.dialogService.activeDialogsStack).id !== this.id)) {
            NotificationsDialogComponent.count++;
        }
    };
    /**
     * The method to run when the component is destroyed. Unsubscribes notification subscription.
     */
    NotificationsDialogComponent.prototype.ngOnDestroy = function () {
        this.notificationsSubscription.unsubscribe();
    };
    /**
     * Remove unread notifications flag
     * @param options
     */
    NotificationsDialogComponent.prototype.show = function (options) {
        NotificationsDialogComponent.count = 0;
        return _super.prototype.show.call(this, options);
    };
    /**
     * Hides the dialog.
     *
     * @param result The result of the dialog action.
     */
    NotificationsDialogComponent.prototype.hide = function (result) {
        this.selectedNotification = null;
        _super.prototype.hide.call(this, result);
    };
    /**
     * Removes active notifications
     * @param msg
     */
    NotificationsDialogComponent.prototype.removeNotification = function (msg) {
        this.appContextService.notification.notificationManager.dismiss(msg.id);
    };
    /**
     * Defines action to take when a close is requested
     * @param reason
     */
    NotificationsDialogComponent.prototype.closeRequested = function (reason) {
        this.hide();
        // keep track of the notifications that were in progress so we can alert the user when they finish later
        this.inProgressNotifications = this.msgs.filter(function (x) { return x.state === 2; });
    };
    /**
     * Removes all notifications from pane
     */
    NotificationsDialogComponent.prototype.clearAll = function () {
        var _this = this;
        this.appContextService.notification.notificationManager.items.forEach(function (x) {
            _this.appContextService.notification.notificationManager.dismiss(x.id);
        });
    };
    /**
     * Gets the status string for the notification title
     */
    NotificationsDialogComponent.prototype.getStatusString = function (state) {
        switch (state) {
            case 4: return this.strings.MsftSmeShell.Angular.Common.failed;
            case 5: return this.strings.MsftSmeShell.Angular.Common.failed;
            case 6: return this.strings.MsftSmeShell.Angular.Common.succeeded;
            case 2: return this.strings.MsftSmeShell.Angular.Common.inProgress;
            default: return '';
        }
    };
    /**
     * Gets the notification title with current status
     * @param notification the notification
     */
    NotificationsDialogComponent.prototype.getNotificationTitle = function (notification) {
        return '{0} {1}'.format(notification.title, this.getStatusString(notification.state));
    };
    /**
     * Gets the text for the notification link
     */
    NotificationsDialogComponent.prototype.getLinkText = function () {
        return this.strings.MsftSmeShell.App.NotificationsDialog.goTo.format(this.selectedNotification.moduleDisplayName, this.selectedNotification.nodeName);
    };
    NotificationsDialogComponent.prototype.getRouterLink = function () {
        if (!this.selectedNotification || !this.selectedNotification.link) {
            return null;
        }
        var segments = this.selectedNotification.link.split('?');
        return segments[0] || null;
    };
    NotificationsDialogComponent.prototype.getQueryParams = function () {
        if (!this.selectedNotification || !this.selectedNotification.link) {
            return null;
        }
        var segments = this.selectedNotification.link.split('?');
        if (segments.length !== 2) {
            return null;
        }
        segments = segments[1].split('&');
        if (segments.length > 0 && segments[0].length > 0) {
            var params_1 = {};
            segments.forEach(function (value, index, array) {
                var parts = value.split('=');
                if (parts.length === 2) {
                    params_1[parts[0]] = parts[1];
                }
            });
            return params_1;
        }
        return null;
    };
    return NotificationsDialogComponent;
}(BaseDialogComponent));
export { NotificationsDialogComponent };
NotificationsDialogComponent.count = 0;
NotificationsDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-notifications-dialog',
                template: "\n      <sme-dialog #dialog [showBackdrop]=\"false\" [actionPane]=\"true\" class=\"dark-theme\">\n\n        <!-- All Notifications -->\n        <sme-dialog-header *ngIf=\"!selectedNotification\">\n          <p class=\"pull-right clear-all\"><a (click)=\"clearAll()\">{{strings.MsftSmeShell.App.NotificationsDialog.clearAll}}</a></p>\n          <h4 class=\"notification-header\">{{strings.MsftSmeShell.App.NotificationsDialog.title}}</h4>\n        </sme-dialog-header>\n        <sme-dialog-content *ngIf=\"!selectedNotification\">\n          <div *ngFor=\"let msg of msgs\" class=\"notification selectable\" (click)=\"selectedNotification=msg\">\n            <div role=\"alert\" class=\"alert alert-dismissible notification-body\">\n              <div class=\"row title-row\">\n                <div class=\"col-md-2\">\n                  <div *ngIf=\"msg.state === 4\" class=\"sme-icon sme-icon-error icon-size\"></div>\n                  <div *ngIf=\"msg.state === 7 || msg.state === 1 || msg.state === 3\" class=\"sme-icon sme-icon-info icon-size\"></div>\n                  <div *ngIf=\"msg.state === 5\" class=\"sme-icon sme-icon-warning icon-size\"></div>\n                  <div *ngIf=\"msg.state === 6\" class=\"sme-icon sme-icon-completed icon-size\"></div>\n                  <div *ngIf=\"msg.state === 2\" class=\"sme-icon sme-icon-sync icon-size\"></div>\n                </div>\n                <div class=\"title-padding\">\n                  <div class=\"sme-icon sme-icon-cancel icon-size pull-right close-button\" (click)=\"removeNotification(msg)\"></div>\n                  <p class=\"notification-title\">{{ getNotificationTitle(msg) }}</p>\n                </div>\n              </div>\n              <div class=\"row details-row\">\n                <div class=\"col-md-13\">\n                  <p class=\"notification-details notification-tab\">{{ msg.nodeName }}</p>\n                </div>\n                <p class=\"notification-details time pull-right\">{{ msg.changedTimestamp | date: 'short' }}</p>\n              </div>\n            </div>\n            <div class=\"notification-progress\">\n              <div *ngIf=\"msg.state === 2\">\n                <!-- Determinate Progress -->\n                <div *ngIf=\"msg.progressPercent\" class=\"progress percent-progress\">\n                  <div class=\"progress progress-bar\" role=\"progressbar\" attr.aria-valuenow=\"{{msg.progressPercent}}\" aria-valuemin=\"0\" aria-valuemax=\"100\"\n                    style.width=\"{{msg.progressPercent}}%\">\n                  </div>\n                </div>\n                <!-- Indeterminate Progress not functional yet-->\n                <div *ngIf=\"!msg.progressPercent\">\n                  <div class=\"progress-bar indeterminate-progress\">\n                    <div class=\"progress-circle\"></div>\n                    <div class=\"progress-circle\"></div>\n                    <div class=\"progress-circle\"></div>\n                    <div class=\"progress-circle\"></div>\n                    <div class=\"progress-circle\"></div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </sme-dialog-content>\n\n        <!-- Details Pane -->\n        <sme-dialog-header *ngIf=\"selectedNotification\">\n          <div class=\"back-button-div pull-left\">\n            <span class=\"sme-icon sme-icon-back p-xxs back-button\" (click)=\"selectedNotification=null\"></span>\n          </div>\n          <div class=\"notification-details-body\">\n            <div class=\"details-icon-div pull-left\">\n              <span *ngIf=\"selectedNotification.state === 4\" class=\"sme-icon sme-icon-error details-icon\"></span>\n              <span *ngIf=\"selectedNotification.state === 7 || selectedNotification.state === 1 || selectedNotification.state === 3\" class=\"sme-icon sme-icon-info details-icon\"></span>\n              <span *ngIf=\"selectedNotification.state === 5\" class=\"sme-icon sme-icon-warning details-icon\"></span>\n              <span *ngIf=\"selectedNotification.state === 6\" class=\"sme-icon sme-icon-completed details-icon\"></span>\n              <span *ngIf=\"selectedNotification.state === 2\" class=\"sme-icon sme-icon-sync details-icon\"></span>\n            </div>\n          <h5 class=\"details-l details-title\">{{ getNotificationTitle(selectedNotification) }}</h5>\n          </div>\n        </sme-dialog-header>\n        <sme-dialog-content *ngIf=\"selectedNotification\">\n          <p class=\"details-s\">{{ selectedNotification.changedTimestamp | date: 'short' }}</p>\n          <p class=\"details-s\">{{ selectedNotification.nodeName }}</p>\n          <p class=\"details-s go-to-tool\"><a [routerLink]=\"getRouterLink()\" [queryParams]=\"getQueryParams()\" routerLinkActive=\"active\" (click)=\"this.hide();\">{{ getLinkText() }}</a></p>\n          <h5 class=\"details-l\">{{strings.MsftSmeShell.Angular.Common.details}}</h5>\n          <p class=\"details-s\">{{ selectedNotification.message }}</p>\n        </sme-dialog-content>\n\n      </sme-dialog>\n    ",
                styles: ["\n      :host >>> p,\n      :host >>> span,\n      :host >>> h4,\n      :host >>> h5 {\n        color: #ffffff;\n      }\n\n      :host >>> .pane .modal-content {\n        width: 384px!important;\n        background: #414141;\n        overflow-x: hidden;\n      }\n\n      :host >>> .pane .modal-body,\n      :host >>> .pane .modal-header {\n        padding: 0px;\n        margin-left: 0px;\n      }\n\n      .alert {\n        padding-bottom: 0px;\n      }\n\n      .notification {\n        background: #414141;\n      }\n\n      .notification-body {\n        padding-top: 0px;\n        padding-left: 20px;\n        padding-right: 0px;\n        margin-bottom: 0px;\n      }\n\n      .notification-header {\n        padding-left: 20px;\n        padding-bottom: 15px;\n        padding-top: 15px;\n      }\n\n      .clear-all {\n        font-size: 13px;\n        line-height: 16px;\n        padding-top: 36px;\n        padding-bottom: 0px;\n        padding-right: 20px;\n      }\n\n      .details-row {\n        height: 16px;\n      }\n\n      .title-row {\n        height: 36px;\n      }\n\n      .title-padding {\n        padding-left: 5px;\n      }\n\n      .icon-size{\n        padding-top: 5px;\n        color: #ffffff;\n        width: 36px;\n      }\n\n      .notification.selectable:hover {\n        background: #3f3f3f;\n        cursor: pointer;\n      }\n\n      .close-button {\n        display: none;\n        padding-right: 0px;\n        color: #ffffff\n      }\n\n      .notification.selectable:hover .close-button {\n        display: block;\n        padding-right: 0px;\n      }\n\n      .notification-progress {\n        padding-top: 0px;\n        padding-bottom: 0px;\n        padding-left: 0px;\n        padding-right: 0px;\n        margin-bottom: 0px;\n        height: 16px;\n      }\n\n      .percent-progress {\n        width: 100%;\n        background: #262626\n      }\n\n      .notification.selectable:hover .percent-progress {\n        background: #3f3f3f\n      }\n\n      .indeterminate-progress {\n        background: #262626;\n        box-shadow: none;\n        padding-bottom: 10px;\n      }\n\n      .notification.selectable:hover .indeterminate-progress {\n        background: #3f3f3f\n      }\n\n      .notification-details {\n        font-size: 11px;\n        line-height: 15px;\n        text-overflow: ellipsis;\n        overflow: hidden;\n        white-space: nowrap;\n      }\n\n      .notification-title {\n        font-size: 13px;\n        line-height: 16px;\n        width: 280px;\n        padding-top: 10px;\n        padding-bottom: 10px;\n        text-overflow: ellipsis;\n        overflow: hidden;\n        white-space: nowrap;\n      }\n\n      .notification-tab {\n        padding-left: 25px;\n        padding-bottom: 0px;\n      }\n\n      .time {\n        padding-right: 36px;\n        padding-left: 12px;\n        width: 160px;\n      }\n\n      .notification-details-body {\n        padding-right: 36px;\n      }\n\n      .details-l {\n        font-size: 20px;\n        line-height: 24px;\n        padding: 0px 0px 8px 48px;\n      }\n\n      .details-s {\n        font-size: 13px;\n        line-height: 16x;\n        padding: 0px 0px 4px 48px;\n      }\n\n      .go-to-tool {\n        padding-top: 20px;\n        padding-bottom: 40px;\n      }\n\n      .details-icon-div {\n        width: 48px;\n        text-align: center;\n        margin-right: 0px;\n        height: 28px;\n      }\n\n      .details-icon {\n        vertical-align: middle;\n        font-size: 20px;\n        height: 20px;\n        line-height: 28px;\n      }\n\n      .details-title {\n        padding-left: 0px;\n        width: 348px;\n      }\n\n      .back-button {\n        cursor: pointer;\n        height: 48px;\n        width: 48px;\n        vertical-align: middle;\n        color: #ffffff\n      }\n\n      .back-button:hover {\n        background-color: #3f3f3f\n      }\n\n      .back-button-div {\n        width: 48px;\n        height: 48px;\n        padding-top: 12px;\n        padding-bottom: 12px;\n        color: #ffffff;\n        text-align: center;\n        margin-right: 300px;\n      }\n    "]
            },] },
];
/** @nocollapse */
NotificationsDialogComponent.ctorParameters = function () { return [
    null,
    null,
    null,
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RpYWxvZ3Mvbm90aWZpY2F0aW9ucy1kaWFsb2cvbm90aWZpY2F0aW9ucy1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFFN0QsT0FBTyxFQUVILGFBQWEsRUFFYixtQkFBbUIsRUFJdEIsTUFBTSxxQkFBQSxDQUFzQjtBQUM3QixPQUFPLEVBQW9DLHVCQUFBLEVBQXlCLGlCQUFBLEVBQWtCLE1BQU8sa0JBQUEsQ0FBbUI7QUFJaEg7SUFBa0QsZ0RBQWdEO0lBUTlGOzs7Ozs7T0FNRztJQUNILHNDQUNZLGlCQUFvQyxFQUNwQyxlQUFnQyxFQUN4QyxhQUE0QjtRQUhoQyxZQUlJLGtCQUFNLGFBQWEsQ0FBQyxTQUV2QjtRQUxXLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMscUJBQWUsR0FBZixlQUFlLENBQWlCO1FBZnJDLFVBQUksR0FBbUIsRUFBRSxDQUFDO1FBRTFCLDBCQUFvQixHQUFpQixJQUFJLENBQUM7UUFDMUMsNkJBQXVCLEdBQW1CLEVBQUUsQ0FBQztRQUM3QyxhQUFPLEdBQVksT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUM7UUFjMUQsS0FBSSxDQUFDLEVBQUUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQzs7SUFDcEQsQ0FBQztJQUVEOztPQUVHO0lBQ0ksK0NBQVEsR0FBZjtRQUFBLGlCQW1EQztRQWxERyxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUM1RyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsS0FBSyx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQixnRUFBZ0U7b0JBQ2hFLDhD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