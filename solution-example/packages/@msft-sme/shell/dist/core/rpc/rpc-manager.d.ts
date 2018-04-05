import { RpcInboundHandlers, RpcOutboundHandlers, RpcSeekMode, RpcSeekResult } from './rpc-base';
import { RpcChannel } from './rpc-channel';
import { RpcInbound } from './rpc-inbound';
import { RpcOutbound } from './rpc-outbound';
/**
 * The status of RPC remote that sent the message
 */
export declare enum RpcRemoteState {
    Active = 0,
    Inactive = 1,
}
/**
 * RpcManager class.
 */
export declare class RpcManager {
    private static serial;
    rpcChannel: RpcChannel;
    private rpcInboundHandlers;
    private rpcOutboundHandlers;
    private currentRpcInbound;
    private currentRpcOutbound;
    private parentRpcInbound;
    /**
     * Initializes a new instance of the RpcManager class.
     */
    constructor();
    /**
     * Gets last rpc to-shell.
     */
    readonly rpcInbound: RpcInbound;
    /**
     * Gets last rpc to-module.
     */
    readonly rpcOutbound: RpcOutbound;
    /**
     * Gets rpc inbound for report data.
     */
    readonly rpcReportDataInbound: RpcInbound;
    /**
     * Initialize the rpc communication channel based on manifest.
     *
     * @param inboundHandlers the set of rpc inbound handlers.
     * @param outboundHandlers the set of rpc outbound handlers.
     */
    init(inboundHandlers?: RpcInboundHandlers, outboundHandlers?: RpcOutboundHandlers): void;
    /**
     * Configure Rpc as parent frame.
     */
    initRpcInbound(): void;
    /**
     * Connect Rpc module.
     *
     * @param name the name of module.
     * @param path the entry point to open for this module.
     * @param iframe the iframe object.
     * @param primary the primary iframe to support report data response.
     * @return Promise<string> The promise with the sub name of outbound connection.
     */
    connectRpcOutbound(name: string, path: string, iFrame: Window, primary: boolean): Promise<string>;
    /**
     * Reconnect Rpc module.
     *
     * @param name the name of module.
     * @param subName the sub name.
     * @param primary the primary iframe to support report data response.
     * @return RpcOutbound the rpc outbound object.
     */
    reconnectRpcOutbound(name: string, subName: string, primary: boolean): RpcOutbound;
    /**
     * Disconnect Rpc module.
     */
    disconnectRpcOutbound(): void;
    /**
     * Remove RpcOutbound.
     *
     * @param module the environment module to remove.
     */
    removeRpcOutbound(name: string, subName: string): RpcOutbound;
    /**
     * Get current live outbound rpc.
     *  - these set could be changed if it's handled async.
     */
    getCurrentRpcOutbound(): RpcOutbound[];
    /**
     * Get the remote status of a given module name
     *
     * @param {string} name The name of the RPC remote endpoint to get the status from
     * @param {string} subName The sub name of the remote iframe instance.
     * @returns {RpcRemoteState} The state of the remote. Active if it's the current channel
     * for communication or Inactive if the channel is not the currently active channel in this
     * manager
     */
    getSourceStatus(name: string, subName: string): {
        status: RpcRemoteState;
        subName: string;
        entryPoint: string;
    };
    /**
     * Seek shell or parent frame.
     *
     * @param Promise<any> the promise object.
     */
    seekShell(mode: RpcSeekMode): Promise<RpcSeekResult>;
    /**
     * Create and add RpcOutbound object.
     *
     * @param name the name of module.
     * @param subName the sub name.
     * @param module the environment module to remove.
     */
    private createRpcOutbound(name, subName, iFrame);
}
