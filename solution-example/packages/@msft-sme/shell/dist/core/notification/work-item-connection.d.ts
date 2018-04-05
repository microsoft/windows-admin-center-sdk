import { Observable } from 'rxjs';
import { GatewayConnection } from '../data/gateway-connection';
import { NodeConnection } from '../data/node-connection';
import { Rpc } from '../rpc/rpc';
import { NotificationConnection } from './notification-connection';
import { WorkItemManager } from './work-item-manager';
import { WorkItemFindResult, WorkItemResult, WorkItemSubmitRequest } from './work-item-request';
/**
 * Work item connection to submit a powershell work item, and to query its state.
 */
export declare class WorkItemConnection {
    private rpc;
    workItemManager: WorkItemManager;
    /**
     * Initializes a new instance of the WorkItemConnection class.
     *
     * @param rpc the RPC.
     * @param gatewayConnection the gateway connection.
     * @param notificationConnection the notification connection.
     */
    constructor(rpc: Rpc, gatewayConnection: GatewayConnection, nodeConnection: NodeConnection, notificationConnection: NotificationConnection);
    /**
     * Submit a work item either directly to NotificationManager or through RPC.
     *
     * @param nodeName the name of the node to submit the item against.
     * @param request the work item request.
     * @return Observable the observable of WorkItemResult object.
     */
    submit(nodeName: string, request: WorkItemSubmitRequest): Observable<WorkItemResult>;
    /**
     * Query a work item either directly to NotificationManager or through RPC.
     *
     * @param request the work item request.
     * @return Observable the observable of WorkItemResult object.
     */
    query(id: string): Observable<WorkItemResult>;
    /**
     * Find existing work item with state.
     *
     * @param nodeName the node name.
     * @param moduleName the module name.
     * @param typeId the type ID.
     * @return Observable<WorkItemFindResult> the observable of WorkItemFindResult.
     */
    find(nodeName: string, moduleName: string, typeId: string): Observable<WorkItemFindResult>;
    /**
     * Submit a work item either directly to NotificationManager or through RPC, and wait for completion.
     *
     * @param nodeName the name of the node to submit the work item against
     * @param request the work item request.
     * @param timeout the timeout milliseconds. (optional, default forever until unsubscribe)
     * @param interval the interval period milliseconds. (optional, default 1 sec)
     * @return Observable the observable of WorkItemResult object.
     */
    submitAndWait(nodeName: string, request: WorkItemSubmitRequest, timeout?: number, interval?: number): Observable<WorkItemResult>;
    /**
     * Wait for existing work item with state.
     *
     * @param workItemResult the work item result to wait for the final result.
     * @param timeout the timeout milliseconds. (optional, default forever until unsubscribe)
     * @param interval the interval period milliseconds. (optional, default 1 sec)
     * @return Observable<WorkItemFindResult> the observable of WorkItemFindResult.
     */
    wait(workItemResult: WorkItemResult, timeout?: number, interval?: number): Observable<WorkItemResult>;
    /**
     * Check if work item result was finished.
     *
     * @param result the work item result.
     * @return boolean true if work item was completed with success or error.
     */
    isFinished(result: WorkItemResult): boolean;
    /**
     * Wait for existing work item with state.
     *
     * @param workItemResult the work item result to wait for the final result.
     * @param timeout the timeout milliseconds. (optional, default forever until unsubscribe)
     * @param interval the interval period milliseconds. (optional, default 1 sec)
     * @return Observable<WorkItemFindResult> the observable of WorkItemFindResult.
     */
    private waitObservable(observable, timeout?, interval?);
}
