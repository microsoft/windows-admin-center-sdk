import { GatewayConnection } from '../../core';
import { HttpService } from './http.service';
import { RpcService } from './rpc.service';
export declare class GatewayService extends GatewayConnection {
    /**
     * Initializes a new instance of the GatewayService class.
     *
     * @param http the Http object.
     * @param rpcService the RPC service.
     */
    constructor(httpService: HttpService, rpcService: RpcService);
}
