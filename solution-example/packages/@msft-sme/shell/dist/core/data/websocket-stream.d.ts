import { Observer, ReplaySubject } from 'rxjs';
import { AuthorizationManager } from '../security/authorization-manager';
import { GatewayConnection } from './gateway-connection';
/**
 * The state of Websocket connection.
 */
export declare enum WebsocketStreamConnectionState {
    /**
     * Initializing.
     */
    Initializing = 1,
    /**
     * Connected.
     */
    Connected = 2,
    /**
     * Disconnected.
     */
    Disconnected = 3,
    /**
     * Failed.
     */
    Failed = 4,
    /**
     * Not configured.
     */
    NotConfigured = 5,
}
/**
 * The state of Websocket stream packet.
 */
export declare enum WebsocketStreamState {
    /**
     * Empty packet.
     */
    Noop = 1,
    /**
     * Data packet.
     */
    Data = 2,
    /**
     * Error packet. (reserved for socket level error communication if any)
     */
    Error = 3,
}
/**
 * The request state of data such as CIM and PowerShell stream.
 */
export declare enum WebsocketStreamDataRequestState {
    /**
     * empty packet.
     */
    Noop = 1,
    /**
     * Data packet.
     */
    Normal = 2,
    /**
     * Cancel
     */
    Cancel = 3,
}
/**
 * The response state of data such as CIM and PowerShell stream.
 */
export declare enum WebsocketStreamDataState {
    /**
     * empty packet.
     */
    Noop = 1,
    /**
     * Completed packet.
     */
    Completed = 2,
    /**
     * Data packet.
     */
    Data = 3,
    /**
     * Error
     */
    Error = 4,
    /**
     * Cancelled
     */
    Cancelled = 5,
}
/**
 * Websocket Stream data target object.
 */
export interface WebsocketStreamDataTarget {
    /**
     * The node name.
     */
    nodeName: string;
    /**
     * The headers equivalent to REST API.
     */
    headers: MsftSme.StringMap<string>;
}
/**
 * The request/response packet of Websocket Stream to the gateway.
 */
export interface WebsocketStreamPacket {
    /**
     * The identification string of protocol.
     *
     */
    streamName: 'SME-CIM' | 'SME-PowerShell' | 'System';
    /**
     * The state of packet.
     */
    state: WebsocketStreamState;
    /**
     * The request/response/error data.
     */
    data: any;
    /**
     * The options (reserved)
     */
    options?: any;
}
/**
 * Websocket stream handler.
 */
export interface WebsocketStreamHandler {
    /**
     * Call reset() when connection was lost to reset context.
     */
    reset(): void;
    /**
     * Call process() when message was received for the data type.
     */
    process(message: any): void;
}
/**
 * Websocket Stream Processor class.
 */
export declare class WebsocketStreamProcessor<TData, TOptions> {
    observer: Observer<TData>;
    target: WebsocketStreamDataTarget;
    options: TOptions;
    /**
     * Holding result if waitCompleted option is specified for multiple instances.
     */
    response?: any;
    /**
     * Track closing state.
     */
    closing?: boolean;
    /**
     * Track closed state.
     */
    closed?: boolean;
    /**
     * Track observer end call by unsubscribe or observer completion.
     */
    end?: boolean;
    /**
     * Sent once.
     */
    sendOnce?: boolean;
    /**
     * Initializes a new instance of the CimProcessor class.
     * @param observer Observer to send back result to caller.
     * @param target Stream Target object.
     * @param options Options for Cim stream query.
     */
    constructor(observer: Observer<TData>, target: WebsocketStreamDataTarget, options: TOptions);
    /**
     * Push the result to the observer.
     * @param result the result of TData.
     */
    next(result: TData): void;
    /**
     * Complete the observer.
     */
    complete(): void;
    /**
     * Error the observer.
     */
    error(error: any): void;
}
/**
 * The Websocket stream class.
 */
export declare class WebsocketStream {
    gateway: GatewayConnection;
    private static maxConnectionRetries;
    private static reconnectWaitTime;
    socketStateRaw: WebsocketStreamConnectionState;
    socketState: ReplaySubject<WebsocketStreamConnectionState>;
    private socket;
    private connectionRetries;
    private handlers;
    private strings;
    /**
     * Initializes a new instance of the WebsocketStream class.
     *
     * @param gateway the gateway connection object.
     */
    constructor(gateway: GatewayConnection);
    /**
     * Register the processor for the stream name.
     * @param name the name of stream.
     * @param handler the handler to process packet.
     */
    registerProcessor(name: string, handler: WebsocketStreamHandler): void;
    /**
     * Send next stream data to websocket.
     *
     * @param streamName the stream name.
     * @param data the data to send.
     * @param options the options.
     */
    sendNext(streamName: 'SME-CIM' | 'SME-PowerShell' | 'System', data: any, options?: any): void;
    /**
     * Send error stream data to websocket.
     *
     * @param streamName the stream name.
     * @param error the error to send.
     * @param options the options.
     */
    sendError(streamName: 'SME-CIM' | 'SME-PowerShell' | 'System', error: string, options?: any): void;
    /**
     * Get target data.
     * @param authorizationManager the authorization manager.
     * @param nodeName the node Name
     * @return  WebsocketStreamDataTarget target data.
     */
    getTarget(authorizationManager: AuthorizationManager, nodeName: string): WebsocketStreamDataTarget;
    private initialize(firstTime);
    private dispose();
    private reconnect(error);
    private debugLog(message, object?);
}
