/// <reference types="signalr" />
/// <reference types="jquery" />
import 'jquery/dist/jquery.min.js';
import 'signalr/jquery.signalR.min.js';
/**
 * Socket message flags. These can be combined.
 */
export declare enum SocketMessageFlags {
    None = 0,
    Data = 1,
    Progress = 2,
    Completed = 4,
    Error = 8,
    ConnectionError = 16,
    Exception = 32,
}
/**
 * Socket message.
 */
export interface SocketMessage<T> {
    type: SocketMessageFlags;
    connectionError?: SignalR.ConnectionError;
    message: T;
}
/**
 * SignalR based socket class.
 */
export declare abstract class SocketSignalR<T> {
    private gatewayUrl;
    private connectionUrl;
    private proxyName;
    private connection;
    private proxy;
    private started;
    private lastError;
    private processHandler;
    /**
     * Gets signalR connection URL.
     */
    private readonly url;
    /**
     * Instantiates a new instance of the SocketSignalR class.
     */
    constructor(gatewayUrl: string, connectionUrl: string, proxyName: string);
    /**
     * Subscribe to the proxy with method name and handler.
     *
     * @param name the name of subscription for a method.
     * @return SignalR.Hub.Proxy the proxy.
     */
    subscribe(name: string): SignalR.Hub.Proxy;
    /**
     * Unsubscribe to the subscribed method call.
     *
     * @param name the name of subscription for a method.
     */
    unsubscribe(name: string): void;
    /**
     * Start request connection.
     */
    start(): JQueryPromise<any>;
    /**
     * Stop request connection.
     */
    stop(): SignalR.Connection;
    /**
     * Invoke a method with parameters.
     *
     * @param name the method name to execute.
     * @param args the parameters to pass.
     * @return Promise the promise object.
     */
    invoke(name: string, ...args: any[]): JQueryPromise<any>;
    /**
     * The client handler.
     */
    protected abstract clientHandler(messages: SocketMessage<T>): void;
    /**
     * Process the message.
     *
     * @param messages the messages.
     */
    protected abstract processMessage(message: string): void;
    /**
     * Initiate the connection to gateway and create a proxy.
     *
     * @param proxyName the proxy name.
     */
    private init(proxyName);
    /**
     * Error message from signalr connection.
     *
     * @param error the error produced on the connection.
     */
    private errorMessage(error);
}
