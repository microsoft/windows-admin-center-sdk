import { ConnectionManager } from '../../core';
import { GatewayService } from './gateway.service';
import { RpcService } from './rpc.service';
export declare class ConnectionService extends ConnectionManager {
    constructor(rpc: RpcService, gatewayService: GatewayService);
}
