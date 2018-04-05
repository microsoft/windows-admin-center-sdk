import { RpcBase, RpcInboundHandlers, RpcMessagePacket, RpcMode, RpcType } from './rpc-base';
/**
 * RpcChannel class.
 * - Both Shell and Module creates one instance to present itself.
 */
export declare class RpcChannel extends RpcBase {
    rpcMode: RpcMode;
    signature: string;
    private rpcCollection;
    private sequence;
    private deferredQueue;
    private global;
    private inboundHandlers;
    private listnerFunction;
    /**
     * Initiates a new instance of the RpcChannel class.
     *
     * @param name the public name of itself.
     * @param origin the origin url of itself.
     * @param signature the signature of the gateway running instance.
     */
    constructor(name: string, origin: string, signature: string);
    /**
     * Sets the rpc inbound handlers to use when creating for seek command.
     */
    rpcInboundHandlers: RpcInboundHandlers;
    /**
     * Register Inbound/Outbound.
     *
     * @param rpcObject the RpcInbound/RpcOutbound class instance.
     * @param type the type of rpc object.
     */
    registerRpc(rpcObject: RpcBase, type: RpcType): void;
    /**
     * Unregister module with subNams
     *
     * @param name the name of module.
     * @param subName the subName.
     * @return RpcBase the rpc object.
     */
    unregisterRpc<T extends RpcBase>(name: string, subName: string, type: RpcType): T;
    /**
     * Get Rpc object by module with subName for Inbound.
     *
     * @param name the name of module.
     * @param subName the subName.
     * @param type the type of rpc object.
     * @return RpcBase the rpc object.
     */
    getRpc<T extends RpcBase>(name: string, subName: string, type: RpcType): T;
    /**
     * Get all Rpc objects for the specified type.
     */
    getAllRpc<T extends RpcBase>(type: RpcType): T[];
    /**
     * Get RpcInbound/RpcOutbound object for module name and module sub name.
     * If it doesn't configure subName yet, it returns it so the channel set it up.
     *
     * @param name the module name.
     * @param subName the sub name of the iframe object.
     * @return RpcBase the matched Rpc object.
     */
    private getFromCollection(name, subName, exact);
    private removeFromCollection(rpcObject);
    private addToCollection(rpcObject);
    /**
     * Start the message listener.
     */
    start(): void;
    /**
     * Stop the message listener.
     */
    stop(): void;
    /**
     * Post the message with retry delay.
     *
     * @param target the RpcToModule or RpcToShell object.
     * @param message the message packet.
     * @param count the retry count.
     * @param delay the interval milliseconds.
     * @return Promise<T> the promise object.
     */
    retryPost<T>(target: RpcBase, message: RpcMessagePacket<T>, count: number, delay: number): Promise<T>;
    /**
     * Post the request message.
     *
     * @param target the RpcToModule or RpcToShell object.
     * @param message the message packet.
     * @param timeout the timeout. (10 seconds at default)
     * @return Promise<TResult> the promise object.
     */
    post<TMessage, TResult>(target: RpcBase, message: RpcMessagePacket<TMessage>, timeout?: number): Promise<TResult>;
    /**
     * Validate the target window if exist by sending null packet.
     *
     * @param target the target Rpc object.
     * @return boolean if false, it remove the target from the list.
     */
    validate(target: RpcBase): boolean;
    /**
     * Log the debug message.
     *
     * @param message the message string.
     */
    protected debugLog(message: string): void;
    /**
     * The listen handler.
     *
     * @param messageEvent the Rpc message event.
     */
    private listener(messageEvent);
    /**
     * Sending response message.
     *
     * @param target the RpcToModule or RpcToShell object.
     * @param message the Rpc message packet.
     */
    private response<T>(target, message);
    /**
     * Sending error message.
     *
     * @param target the RpcToModule or RpcToShell object.
     * @param message the Rpc message packet.
     */
    private error<T>(target, message);
}
