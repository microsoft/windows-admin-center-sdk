import { FrameConnection } from '../../core';
import { RpcService } from './rpc.service';
export declare class FrameService extends FrameConnection {
    /**
     * Initializes a new instance of the FrameService class.
     *
     * @param rpcService the RpcService class instance injected.
     */
    constructor(rpc: RpcService);
}
