import { SettingsManager } from '../../core';
import { RpcService } from './rpc.service';
export declare class SettingsService extends SettingsManager {
    /**
     * Initializes a new instance of the SettingsService class.
     *
     * @param rpcService the gateway service.
     */
    constructor(rpcService: RpcService);
}
