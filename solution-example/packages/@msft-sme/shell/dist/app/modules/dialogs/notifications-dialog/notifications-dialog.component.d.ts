import { OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AlertBarService, AppContextService, BaseDialogComponent, DialogOptions, DialogResult, DialogService } from '../../../../angular';
import { Notification } from '../../../../core';
import { Strings } from '../../../../generated/Strings';
export declare class NotificationsDialogComponent extends BaseDialogComponent<DialogOptions, DialogResult> implements OnInit, OnDestroy {
    private appContextService;
    private alertBarService;
    static count: number;
    msgs: Notification[];
    notificationsSubscription: Subscription;
    selectedNotification: Notification;
    inProgressNotifications: Notification[];
    strings: Strings;
    /**
     * Initializes a new instance of the NotificationsPaneComponent class.
     *
     * @param appContextService the app context service.
     * @param alertBarService the alert bar service.
     * @param dialogService the dialog service.
     */
    constructor(appContextService: AppContextService, alertBarService: AlertBarService, dialogService: DialogService);
    /**
     * The method to run when the component is initialized. Sets up notification subscription.
     */
    ngOnInit(): void;
    /**
     * update notification count if notifications pane is closed
     */
    updateCount(): void;
    /**
     * The method to run when the component is destroyed. Unsubscribes notification subscription.
     */
    ngOnDestroy(): void;
    /**
     * Remove unread notifications flag
     * @param options
     */
    show(options: DialogOptions): Subject<DialogResult>;
    /**
     * Hides the dialog.
     *
     * @param result The result of the dialog action.
     */
    hide(result?: DialogResult): void;
    /**
     * Removes active notifications
     * @param msg
     */
    removeNotification(msg: Notification): void;
    /**
     * Defines action to take when a close is requested
     * @param reason
     */
    closeRequested(reason: any): void;
    /**
     * Removes all notifications from pane
     */
    clearAll(): void;
    /**
     * Gets the status string for the notification title
     */
    getStatusString(state: number): string;
    /**
     * Gets the notification title with current status
     * @param notification the notification
     */
    getNotificationTitle(notification: Notification): string;
    /**
     * Gets the text for the notification link
     */
    getLinkText(): string;
    getRouterLink(): string;
    getQueryParams(): any;
}
