import { RpcBase, RpcDeactivateResult, RpcInboundHandlers, RpcInitData, RpcInitResult, RpcOpenData, RpcOpenResult, RpcPingData, RpcPingResult, RpcShutdownData, RpcShutdownResult } from './rpc-base';
import { RpcChannel } from './rpc-channel';
import { RpcForwardReportData, RpcForwardResponse } from './rpc-forward-report-data';
/**
 * RpcToModule class.
 * - Shell uses the instance to communicate to the Module (tool).
 */
export declare class RpcOutbound extends RpcBase {
    /**
     * Initiates a new instance of the RpcToModule class.
     *
     * @param rpcChannel the rpc channel.
     * @param name the public name of the module.
     * @param origin the origin url.
     */
    constructor(rpcChannel: RpcChannel, name: string, origin: string);
    /**
     * Registers all handlers at once.
     *
     * @param handlers the module handlers.
     */
    registerAll(handlers: RpcInboundHandlers): void;
    /**
     * The init command.
     *
     * @param data the RpcInitData data.
     * @return Promise<void> the promise object.
     */
    init(data: RpcInitData): Promise<RpcInitResult>;
    /**
     * The open command. (30 seconds waiting time)
     *
     * @param data the RpcOpenData object.
     * @return Promise<RpcOpenResult> the promise object of RpcOpenResult.
     */
    open(data: RpcOpenData): Promise<RpcOpenResult>;
    /**
     * The activate command.
     *
     * @param data the void object.
     * @return Promise<void> the promise object.
     */
    activate(data: any): Promise<void>;
    /**
     * The deactivate 2 command used with polling deactivation.
     *
     * @param data the void object.
     * @return Promise<RpcDeactivateResult> the promise object.
     */
    deactivate2(data: any): Promise<RpcDeactivateResult>;
    /**
     * The shutdown command.
     *
     * @param data the RpcShutdownData object.
     * @return Promise<RpcShutdownResult> the promise object.
     */
    shutdown(data: RpcShutdownData): Promise<RpcShutdownResult>;
    /**
     * The ping command.
     *
     * @param data the RpcPingData object.
     * @return Promise<RpcPingResult> the promise object.
     */
    ping(data: RpcPingData): Promise<RpcPingResult>;
    /**
     * The forward command.
     *
     * @param data the RpcForwardReportData object.
     * @return Promise<RpcForwardResponse<any>> the promise object.
     */
    forward(data: RpcForwardReportData): Promise<RpcForwardResponse<any>>;
    /**
     * The empty handler to response always resolved.
     *
     * @param data the node context.
     * @return Promise<any> the promise.
     */
    private emptyHandler(data);
}
