import { Observable, ReplaySubject } from 'rxjs';
import { Rpc } from '../rpc/rpc';
import { RpcNotification, RpcWorkItem, RpcWorkItemFind, RpcWorkItemFindResult } from '../rpc/rpc-base';
import { Notification, NotificationEvent, NotificationState } from './notification';
import { PowerShellWorkItemMessage } from './powershell-notification';
import { SocketMessage } from './socket-signalr';
import { RecoveredWorkItem } from './work-item-request';
/**
 * Notification manager class.
 */
export declare class NotificationManager {
    private rpc;
    private collection;
    private rpcNotifySubscription;
    private rpcQuerySubscription;
    private changedEventSubject;
    /**
     * Initializes a new instance of the NotificationManager class.
     *
     * @param rpc the RPC object.
     */
    constructor(rpc: Rpc);
    /**
     * Gets the items from current notification collection including dismissed.
     */
    readonly items: Notification[];
    /**
     * Gets the subject of notification changed event.
     */
    readonly changed: ReplaySubject<NotificationEvent>;
    /**
     * Initializes the rpc notification call.
     */
    initialize(): void;
    /**
     * Stop the notification manager.
     */
    uninitialize(): void;
    /**
     * Find a notification.
     *
     * @param id the notification id.
     */
    find(id: string): Notification;
    /**
     * Remove a notification.
     * There is no dismiss API on the gateway, this just remove from the list.
     * Don't remove active notification. Use dismiss api instead, so it doesn't displays to .items property.
     *
     * @param id the session id (notification id).
     * @return boolean true if removed.
     */
    remove(id: string): boolean;
    /**
     * Dismiss a notification to mark dismiss property.
     *
     * @param id the session id (notification id).
     * @return boolean true if dismissed.
     */
    dismiss(id: string): boolean;
    /**
     * Add notification from WorkItem.
     *
     * @param id the notification ID.
     * @param workItem the RPC work item.
     * @param state the initial state.
     * @param object the object from query result.
     * @return notification the notification object.
     */
    addFromWorkItem(id: string, workItem: RpcWorkItem, state: NotificationState, object: any): void;
    /**
     * Add notification from Recover.
     *
     * @param id the notification ID.
     * @param workItem the RPC work item.
     * @param state the initial state.
     * @param object the object from query result.
     * @return notification the notification object.
     */
    addFromRecover(recover: RecoveredWorkItem): void;
    /**
     * Update notification from socket message.
     *
     * @param id the notification ID.
     * @param message the socket message.
     */
    updateFromMessage(id: string, message: SocketMessage<PowerShellWorkItemMessage>): boolean;
    /**
     * Add or update client notification.
     *
     * @param clientNotification the client notification object.
     * @param Observable the observable of void.
     */
    notify(clientNotification: RpcNotification): Observable<any>;
    /**
     * Find current work item by the typeId/sourceName/nodeName.
     *
     * @param workItemFind the query notification object.
     * @param RpcWorkItemFindResult the result of query.
     */
    workItemFind(workItemFind: RpcWorkItemFind): RpcWorkItemFindResult;
    /**
     * Add an event to report the change of notification data or collection.
     *
     * @param changeEvent the changed event.
     * @param notification the notification object. (optional)
     */
    private addEvent(changeEvent, notification?);
}
