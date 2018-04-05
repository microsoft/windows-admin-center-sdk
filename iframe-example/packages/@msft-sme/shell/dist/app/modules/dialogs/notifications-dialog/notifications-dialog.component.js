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
import { AlertBarService, AlertSeverity, AppContextService, DialogService } from '../../../../angular';
import { NotificationChangeEvent, NotificationState } from '../../../../core';
import { AppBarBaseDialogComponent } from '../app-bar-dialog.component';
var NotificationsDialogComponent = /** @class */ (function (_super) {
    __extends(NotificationsDialogComponent, _super);
    /**
     * Initializes a new instance of the NotificationsPaneComponent class.
     *
     * @param appContextService the app context service.
     * @param alertBarService the alert bar service.
     * @param dialogService the dialog service.
     */
    function NotificationsDialogComponent(appContextService, alertBarService, dialogService) {
        var _this = _super.call(this, dialogService, 'sme-notifications-dialog', 'sme-notifications-button') || this;
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
        // keep track of the last element in focus so we know if an updated notification was previously focused
        document.body.addEventListener('focus', function (event) {
            _this.currrentlySelected = event.target;
        }, true);
        // after we update a notification, it is removed and then added back by the DOM
        // we can detect when this has just happened using this MutationObserver
        this.observer = new MutationObserver(function (records) {
            var dialogContentRecords = records.filter(function (x) { return x.target.tagName.toLowerCase() === 'sme-dialog-content'; });
            if (dialogContentRecords.length >= 2) {
                // MutationRecords are always in the order in which they happened
                // so first, we look at removed nodes, then we look at added nodes
                var removedNodesList = dialogContentRecords[0].removedNodes;
                var addedNodesList = dialogContentRecords[1].addedNodes;
                var removed = removedNodesList && removedNodesList.length > 0 ? removedNodesList.item(0) : null;
                var added = addedNodesList && addedNodesList.length > 0 ? addedNodesList.item(0) : null;
                if (removed && added && removed.id === added.id && _this.isInsideNotification(_this.currrentlySelected, added.id)) {
                    var selectedNotification = document.getElementById(_this.currrentlySelected.id);
                    if (selectedNotification) {
                        selectedNotification.focus();
                    }
                }
            }
        });
        // observe changes to the children of sme-notifications and their subtrees
        this.observer.observe(document.getElementById('sme-notifications'), { childList: true, subtree: true });
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
     * return true if the currently selected element is inside a particular notification
     * @param element the current element
     * @param notificationId the id of the notification
     */
    NotificationsDialogComponent.prototype.isInsideNotification = function (element, notificationId) {
        // stop looking once you get to dialog content
        if (!element || element.tagName.toLowerCase() === 'sme-dialog-content') {
            return false;
        }
        return element.id === notificationId ? true : this.isInsideNotification(element.parentElement, notificationId);
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
        this.observer.disconnect();
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
     * Get the id of the remove icon of a specific notification
     * @param notification the notification
     */
    NotificationsDialogComponent.prototype.getRemoveNotificationId = function (notification) {
        return 'sme-notifications-remove-' + notification.id;
    };
    /**
     * Get notification dom id
     * @param id the id of the notification object
     */
    NotificationsDialogComponent.prototype.getNotificationElementId = function (notification) {
        return 'sme-notifications-' + notification.id;
    };
    /**
     * select notification and
     * focus on the back button of notification details
     * @param notification the selected notification
     */
    NotificationsDialogComponent.prototype.selectNotification = function (notification) {
        this.selectedNotification = notification;
        // wait for DOM to update then focus
        setTimeout(function () {
            var backButton = document.getElementById('sme-notification-details-back-button');
            if (backButton) {
                backButton.focus();
            }
        });
    };
    /**
     * return to all notifications list and focus on selected notification
     */
    NotificationsDialogComponent.prototype.onClickBackButton = function () {
        var id = this.getNotificationElementId(this.selectedNotification);
        this.selectedNotification = null;
        // wait for DOM to update then focus
        setTimeout(function () {
            var currentNotification = document.getElementById(id);
            if (currentNotification) {
                currentNotification.focus();
            }
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
    NotificationsDialogComponent.count = 0;
    NotificationsDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-notifications-dialog',
                    template: "\n      <sme-dialog id=\"sme-notifications\" #dialog [showBackdrop]=\"false\" dialogMode=\"compact\" class=\"sme-theme-dark\">\n\n        <!-- All Notifications -->\n        <sme-dialog-header *ngIf=\"!selectedNotification\">\n          <div class=\"sme-arrange-stack-h\">\n            <h2 id=\"sme-dialog-title\" class=\"sme-position-flex-auto\">{{strings.MsftSmeShell.App.NotificationsDialog.title}}</h2>\n            <button class=\"sme-button-trigger sme-position-flex-none\" (click)=\"clearAll()\">\n              <span class=\"sme-icon sme-icon-clear sme--xxs\"></span>\n              <span>{{strings.MsftSmeShell.App.NotificationsDialog.clearAll}}</span>\n            </button>\n          </div>\n        </sme-dialog-header>\n        <sme-dialog-content *ngIf=\"!selectedNotification\" class=\"sme-layout-content-zone\">\n          <div role=\"button\" [id]=\"getNotificationElementId(msg)\" *ngFor=\"let msg of msgs\" class=\"sme-scheme-nav-menu-item sme-padding-squish-v-lg sme-behavior-hover-trigger\"\n            tabindex=\"0\" (click)=\"selectNotification(msg)\" (keydown.space)=\"selectNotification(msg)\" (keydown.enter)=\"selectNotification(msg)\">\n            <!-- Title -->\n            <div class=\" sme-arrange-stack-h\">\n              <!-- Icon -->\n              <div class=\"sme-position-flex-none sme-padding-right-xs\">\n                <div *ngIf=\"msg.state === 4\" class=\"sme-icon sme-icon-error sme-icon-size-sm\"></div>\n                <div *ngIf=\"msg.state === 7 || msg.state === 1 || msg.state === 3\" class=\"sme-icon sme-icon-info sme-icon-size-sm\"></div>\n                <div *ngIf=\"msg.state === 5\" class=\"sme-icon sme-icon-warning sme-icon-size-sm\"></div>\n                <div *ngIf=\"msg.state === 6\" class=\"sme-icon sme-icon-completed sme-icon-size-sm\"></div>\n                <div *ngIf=\"msg.state === 2\" class=\"sme-icon sme-icon-sync sme-icon-size-sm\"></div>\n              </div>\n              <!-- Title Text -->\n              <div class=\"sme-position-flex-auto sme-arrange-ellipsis\">{{ getNotificationTitle(msg) }}</div>\n\n              <!-- Clear Button -->\n              <button [id]=\"getRemoveNotificationId(msg)\" class=\"sme-button-trigger sme-button-auto-width sme-position-flex-none sme-padding-inset-none sme-behavior-hover-trigger\"\n                (click)=\"removeNotification(msg)\">\n                  <span class=\"sme-icon sme-icon-cancel sme-behavior-hover-target-show\"></span>\n              </button>\n            </div>\n            <!-- Details -->\n            <div class=\"sme-arrange-stack-h sme-padding-top-xxs sme-padding-left-lg sme-font-label\">\n              <div class=\"sme-position-flex-auto sme-arrange-ellipsis\">{{ msg.nodeName }}</div>\n              <div class=\"sme-position-flex-none\">{{ msg.changedTimestamp | date: 'short' }}</div>\n            </div>\n            <!-- Progress -->\n            <div *ngIf=\"msg.state === 2\" class=\"sme-arrange-stack-h\">\n              <!-- Determinate -->\n              <progress *ngIf=\"msg.progressPercent\" class=\"sme-progress\" role=\"progressbar\" max=\"100\" value=\"{{msg.progressPercent}}\" tabindex=\"0\"\n                [attr.aria-valuenow]=\"msg.progressPercent\" aria-valuemin=\"0\" aria-valuemax=\"100\" [attr.aria-label]=\"strings.MsftSmeShell.App.NotificationsDialog.DeterminateProgress.AriaLabel\"></progress>\n\n              <!-- Indeterminate -->\n              <div *ngIf=\"!msg.progressPercent\" class=\"sme-progress sme-progress-indeterminate-regional sme-progress-small\" [ngClass]=\"progressSize\"\n                role=\"progressbar\" tabindex=\"0\" [attr.aria-valuetext]=\"strings.MsftSmeShell.App.NotificationsDialog.IndeterminateProgress.AriaValueText\"\n                [attr.aria-label]=\"strings.MsftSmeShell.App.NotificationsDialog.IndeterminateProgress.AriaLabel\">\n                <span></span>\n                <span></span>\n                <span></span>\n                <span></span>\n                <span></span>\n              </div>\n            </div>\n          </div>\n        </sme-dialog-content>\n\n        <!-- Details Pane -->\n        <sme-dialog-content aria-live=\"assertive\" *ngIf=\"selectedNotification\">\n          <!-- Back Button -->\n          <button id=\"sme-notification-details-back-button\" (click)=\"onClickBackButton()\" class=\"sme-button-trigger sme-button-auto-width sme-padding-inset-none sme-margin-bottom-md sme-margin-top-sm\">\n            <span class=\"sme-icon sme-icon-back\"></span>\n          </button>\n          <h3 class=\"sme-screen-reader\" id=\"sme-dialog-title\">{{ strings.MsftSmeShell.App.NotificationsDialog.Details.AriaTitle }}</h3>\n          <div class=\"sme-arrange-stack-h\">\n            <!-- Icon -->\n            <div class=\"sme-position-flex-none sme-padding-right-sm\">\n              <div *ngIf=\"selectedNotification.state === 4\" class=\"sme-icon sme-icon-error sme-icon-size-sm\"></div>\n              <div *ngIf=\"selectedNotification.state === 7 || selectedNotification.state === 1 || selectedNotification.state === 3\" class=\"sme-icon sme-icon-info sme-icon-size-sm\"></div>\n              <div *ngIf=\"selectedNotification.state === 5\" class=\"sme-icon sme-icon-warning sme-icon-size-sm\"></div>\n              <div *ngIf=\"selectedNotification.state === 6\" class=\"sme-icon sme-icon-completed sme-icon-size-sm\"></div>\n              <div *ngIf=\"selectedNotification.state === 2\" class=\"sme-icon sme-icon-sync sme-icon-size-sm\"></div>\n            </div>\n            <!-- Title -->\n            <h3 class=\"sme-position-flex-auto sme-padding-bottom-sm\">{{ getNotificationTitle(selectedNotification) }}</h3>\n          </div>\n          <div id=\"sme-dialog-desc\" class=\"sme-padding-left-xl\">\n            <p>{{ selectedNotification.changedTimestamp | date: 'short' }}</p>\n            <p class=\"sme-padding-top-xs\">{{ selectedNotification.nodeName }}</p>\n            <a class=\"sme-link sme-layout-block sme-padding-top-xs\" [routerLink]=\"getRouterLink()\" [queryParams]=\"getQueryParams()\" (click)=\"this.hide();\">{{ getLinkText() }}</a>\n            <h3 class=\"sme-padding-top-lg\">{{strings.MsftSmeShell.Angular.Common.details}}</h3>\n            <p class=\"sme-padding-top-xs\">{{ selectedNotification.message }}</p>\n          </div>\n        </sme-dialog-content>\n\n      </sme-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    NotificationsDialogComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: AlertBarService, },
        { type: DialogService, },
    ]; };
    return NotificationsDialogComponent;
}(AppBarBaseDialogComponent));
export { NotificationsDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RpYWxvZ3Mvbm90aWZpY2F0aW9ucy1kaWFsb2cvbm90aWZpY2F0aW9ucy1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFFN0QsT0FBTyxFQUNILGVBQWUsRUFDZixhQUFhLEVBQ2IsaUJBQWlCLEVBR2pCLGFBQWEsRUFDaEIsTUFBTSxxQkFBQSxDQUFzQjtBQUM3QixPQUFPLEVBQW9DLHVCQUFBLEVBQXlCLGlCQUFBLEVBQWtCLE1BQU8sa0JBQUEsQ0FBbUI7QUFFaEgsT0FBTyxFQUFFLHlCQUFBLEVBQTBCLE1BQU8sNkJBQUEsQ0FBOEI7QUFHeEU7SUFBa0QsZ0RBQXNEO0lBVXBHOzs7Ozs7T0FNRztJQUNILHNDQUNZLGlCQUFvQyxFQUNwQyxlQUFnQyxFQUN4QyxhQUE0QjtRQUhoQyxZQUlJLGtCQUFNLGFBQWEsRUFBRSwwQkFBMEIsRUFBRSwwQkFBMEIsQ0FBQyxTQUUvRTtRQUxXLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMscUJBQWUsR0FBZixlQUFlLENBQWlCO1FBakJyQyxVQUFJLEdBQW1CLEVBQUUsQ0FBQztRQUUxQiwwQkFBb0IsR0FBaUIsSUFBSSxDQUFDO1FBQzFDLDZCQUF1QixHQUFtQixFQUFFLENBQUM7UUFDN0MsYUFBTyxHQUFZLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDO1FBZ0IxRCxLQUFJLENBQUMsRUFBRSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDOztJQUNwRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwrQ0FBUSxHQUFmO1FBQUEsaUJBa0ZDO1FBakZHLHVHQUF1RztRQUN2RyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUMxQixPQUFPLEVBQ1AsVUFBQyxLQUFLO1lBQ0YsS0FBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxNQUFx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