import { WorkItemConnection } from '../../core';
import { GatewayService } from './gateway.service';
import { NodeService } from './node.service';
import { NotificationService } from './notification.service';
import { RpcService } from './rpc.service';
/**
 * Work item service class.
 */
export declare class WorkItemService extends WorkItemConnection {
    /**
     * Initializes a new instance of the WorkItemService class.
     *
     * @param rpcService the RPC service.
     * @param nodeService the Node service.
     * @param gatewayService the gateway service.
     * @param notificationService the notification service.
     */
    constructor(rpcService: RpcService, nodeService: NodeService, gatewayService: GatewayService, notificationService: NotificationService);
}
