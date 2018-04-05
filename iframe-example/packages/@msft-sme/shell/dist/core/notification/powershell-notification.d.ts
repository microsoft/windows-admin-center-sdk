/// <reference types="jquery" />
import { Observable, Subject } from 'rxjs';
import { NodeConnection, NodeRequestOptions } from '../data/node-connection';
import { NotificationState } from './notification-state';
import { SocketMessage, SocketSignalR } from './socket-signalr';
import { WorkItemResult } from './work-item-request';
/**
 * PowerShell Submit result object.
 */
export interface PowerShellSubmitResult {
    id: string;
    completed: boolean;
    error: any;
    state: NotificationState;
}
/**
 * Powershell work item message.
 */
export interface PowerShellWorkItemMessage {
    sessionId?: string;
    completed?: string;
    results?: any[];
    progress?: any[];
    errors?: any[];
    exception?: string;
}
/**
 * The PowerShell script based notification class.
 */
export declare class PowerShellNotification extends SocketSignalR<PowerShellWorkItemMessage> {
    private static connectionUrl;
    private static proxyName;
    private static notify;
    private static subscribe;
    private subjectInternal;
    static hasConnectionError(item: SocketMessage<PowerShellWorkItemMessage>): boolean;
    static hasError(item: SocketMessage<PowerShellWorkItemMessage>): boolean;
    static hasException(item: SocketMessage<PowerShellWorkItemMessage>): boolean;
    static hasCompleted(item: SocketMessage<PowerShellWorkItemMessage>): boolean;
    static hasData(item: SocketMessage<PowerShellWorkItemMessage>): boolean;
    static hasProgress(item: SocketMessage<PowerShellWorkItemMessage>): boolean;
    /**
     * Initializes a new instance of the GatewaySocket class.
     */
    constructor(gatewayUrl: string);
    /**
     * Gets the subject observable to get notifications.
     */
    readonly subject: Subject<SocketMessage<PowerShellWorkItemMessage>>;
    /**
     * Submit PowerShell command as a work item.
     *
     * @param nodeConnection The node connection.
     * @param command The PowerShell command.
     * @param metadata The meta data.
     * @param nodeRequestOptions The node request options.
     * @param create The callback to create new notification.
     * @return Observable the observable of initial powershell query result.
     */
    submit(nodeConnection: NodeConnection, nodeName: string, command: string, metadata: any, nodeRequestOptions?: NodeRequestOptions, create?: (result: PowerShellSubmitResult) => void): Observable<WorkItemResult>;
    /**
     * Initialize to subscribe the web socket connection.
     */
    initialize(): JQueryPromise<any>;
    /**
     * Uninitialize to subscribe the web socket connection.
     */
    uninitialize(): void;
    /**
     * Invoke subscribe method to a  session.
     *
     * @param id the session ID of work item.
     * @return Promise the promise object.
     */
    subscribeSession(id: string): JQueryPromise<any>;
    /**
     * The client handler to process message.
     *
     * @param notification the message notification.
     */
    protected clientHandler(notification: SocketMessage<PowerShellWorkItemMessage>): void;
    /**
     * Process the message.
     *
     * @param messages the messages.
     */
    protected processMessage(message: string): void;
    private processData(data);
}
