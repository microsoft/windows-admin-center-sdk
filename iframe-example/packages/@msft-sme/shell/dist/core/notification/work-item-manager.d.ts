import { Observable } from 'rxjs';
import { GatewayConnection } from '../data/gateway-connection';
import { NodeConnection } from '../data/node-connection';
import { Rpc } from '../rpc/rpc';
import { RpcWorkItem } from '../rpc/rpc-base';
import { NotificationConnection } from './notification-connection';
import { WorkItemResult } from './work-item-request';
/**
 * Work item manager class.
 */
export declare class WorkItemManager {
    private rpc;
    private gatewayConnection;
    private nodeConnection;
    notificationConnection: NotificationConnection;
    private static apiWorkItems24hours;
    active: boolean;
    private startSubscription;
    private powerShellNotification;
    private notificationSubscription;
    private rpcWorkItemSubscription;
    private notificationManager;
    /**
     * Initializes a new instance of the WorkItemManager class.
     *
     * @param rpc the RPC object.
     * @param gatewayConnection the gateway connection service.
     * @param nodeConnection the node connection service.
     * @param notificationManager the notification manager.
     */
    constructor(rpc: Rpc, gatewayConnection: GatewayConnection, nodeConnection: NodeConnection, notificationConnection: NotificationConnection);
    /**
     * Start the work item management.
     */
    start(): void;
    /**
     * Stop the work item management.
     */
    stop(): void;
    /**
     * Create and submit a workItem.
     *
     * @param request the work item request.
     * @return Observable the WorkItemResult observable.
     */
    submitWorkItem(request: RpcWorkItem): Observable<WorkItemResult>;
    /**
     * Query a workItem.
     *
     * @param request the work item request.
     * @return Observable the WorkItemResult observable.
     */
    queryWorkItem(request: RpcWorkItem): Observable<WorkItemResult>;
}
