import { RpcNotification, RpcWorkItem } from '../rpc/rpc-base';
import { PowerShellWorkItemMessage } from './powershell-notification';
import { SocketMessage } from './socket-signalr';
import { RecoveredWorkItem } from './work-item-request';
/**
 * Notification State
 * TODO: supported state from powershell is limited. InProgress, Error and Success.
 */
export declare enum NotificationState {
    Started = 1,
    InProgress = 2,
    Critical = 3,
    Error = 4,
    Warning = 5,
    Success = 6,
    Informational = 7,
}
/**
 * Notification changed event type.
 */
export declare enum NotificationChangeEvent {
    Initialized = 0,
    InitializationFailed = 1,
    Add = 2,
    Remove = 3,
    Change = 4,
    Instant = 5,
}
/**
 * Notification changed event packet.
 */
export interface NotificationEvent {
    changeEvent: NotificationChangeEvent;
    notification?: Notification;
}
/**
 * Notification object.
 */
export declare class Notification {
    id: string;
    /**
     * Work item passed from RPC or client on shell.
     */
    private workItem;
    /**
     * The type ID of work item.
     */
    typeId: string;
    /**
     * The node name.
     */
    nodeName: string;
    /**
     * The module name.
     */
    moduleName: string;
    /**
     * The module display name.
     */
    moduleDisplayName: string;
    /**
     * Object included last response.
     */
    object: any;
    /**
     * The state of notification.
     */
    state: NotificationState;
    /**
     * The title of work item to display user. (localized)
     */
    title: string;
    /**
     * The description of work item to display user. (localized)
     */
    description: string;
    /**
     * The message. (localized)
     */
    message: string;
    /**
     * The start timestamp. Date.now() / the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
     */
    startTimestamp: number;
    /**
     * The last changed timestamp. Date.now() / the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
     */
    changedTimestamp: number;
    /**
     * The end timestamp. Date.now() / the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
     */
    endTimestamp: number;
    /**
     * The progress percent.
     */
    progressPercent: number;
    /**
     * The success link to navigate to the object view. (optional)
     * At default, it brings to the home page of the module.
     */
    link: string;
    /**
     * Marked it's no longer display to include list of notifications.
     */
    dismissed: boolean;
    /**
     * The parent URI window.location.pathname.
     */
    locationPathname: string;
    /**
     * The parent URI window.location.search
     */
    locationSearch: string;
    /**
     * Create notification from WorkItem.
     *
     * @param id the notification ID.
     * @param workItem the RPC work item.
     * @param state the initial state.
     * @param object the object from query result.
     * @return notification the notification object.
     */
    static createFromWorkItem(id: string, workItem: RpcWorkItem, state: NotificationState, object: any): Notification;
    /**
     * Create notification from recovered work item.
     *
     * @param recoveredWorkItem the recovered work item.
     * @return notification the notification object.
     */
    static createFromRecover(recoveredWorkItem: RecoveredWorkItem): Notification;
    /**
     * Create notification from instant request.
     *
     * @param client the RPC notication request.
     * @return notification the notification object.
     */
    static createFromClient(client: RpcNotification): Notification;
    /**
     * Initializes a new instance of the Notification class.
     *
     * @param id the notification ID.
     */
    constructor(id: string);
    /**
     * Update the notification by socket message from the gateway.
     *
     * @param item the socket message.
     * @return boolean the changed status.
     */
    updateFromMessage(item: SocketMessage<PowerShellWorkItemMessage>): boolean;
    /**
     * Update the notification by instant notification message from the client.
     *
     * @param client the instant notification object.
     * @param boolean the changed status.
     */
    updateFromClient(client: RpcNotification): boolean;
    /**
     * Gets the module display name.
     */
    private getModuleDisplayName(moduleName);
    /**
     * Update the state.
     *
     * @param state the new state.
     * @return boolean the changed state.
     */
    private updateState(state);
    private initializeFromWorkItem(item);
    private updateMessageAndLink(item);
    private initializeFromInstant(client);
    private formatLink(relative);
    private formatMessage(template);
    private findParameters(template);
    private replaceParameters(message, parameters);
}
