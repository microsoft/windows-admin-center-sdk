import { NotificationConnection } from '../../core';
import { RpcService } from './rpc.service';
/**
 * Notification service class.
 */
export declare class NotificationService extends NotificationConnection {
    /**
     * Initializes a new instance of the NotificationConnectionService class.
     *
     * @param rpcService the RPC service.
     * @param connectionService the connection service.
     */
    constructor(rpcService: RpcService);
}
