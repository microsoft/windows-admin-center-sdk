import { Observable, ReplaySubject, Subject } from 'rxjs';
import { GatewayConnection } from '../data/gateway-connection';
import { Rpc } from '../rpc/rpc';
import { RpcRelationshipType } from '../rpc/rpc-base';
import { RpcForwardResponse } from '../rpc/rpc-forward-report-data';
import { RpcServiceForwarder } from '../rpc/rpc-forwarder';
import { Connection } from './connection';
export interface ConnectionManagerInitProperties {
    connections: Connection[];
    activeConnection: Connection;
}
export declare enum ConnectionChangeType {
    Initialized = 0,
    Activated = 1,
    Added = 2,
    Removed = 3,
}
export interface ConnectionsChangedEvent {
    type: ConnectionChangeType;
}
export interface ConnectionChangedEvent extends ConnectionsChangedEvent {
    connection: Connection;
}
export interface ConnectionsInitializedEvent extends ConnectionsChangedEvent {
    connections: Connection[];
}
export declare class ConnectionManager extends RpcServiceForwarder implements ConnectionManagerInitProperties {
    private gatewayConnection;
    private static activeConnectionPropertyName;
    private static connectionsPropertyName;
    private static saveConnectionMethodName;
    private static removeConnectionMethodName;
    private static gatewayConnectionApi;
    private allConnections;
    private activeConnectionIndex;
    /**
     * Subject that Fires once and remembers when when connections have been initialized
     */
    connectionsInitialized: ReplaySubject<Connection[]>;
    /**
     * Event subject that signals that the connection(s) have changed.
     * Filter on changeType to determine what type of change has occurred
     */
    connectionsChanged: Subject<ConnectionsChangedEvent>;
    constructor(rpc: Rpc, gatewayConnection: GatewayConnection);
    restoreConnections(): Observable<Connection[]>;
    /**
     * Gets all connections
     */
    readonly connections: Connection[];
    /**
     * Gets active connection.
     */
    /**
     * Sets active connection.
     */
    activeConnection: Connection;
    /**
     * Sets active connection.
     */
    addOrUpdateConnection(connection: Connection, save?: boolean): number;
    /**
     * Sets active connection.
     */
    removeConnection(connection: Connection): Observable<any>;
    saveConnection(connection: Connection): Observable<any>;
    /**
     * Finds a connection given a name and type
     * @param name the name of the connection to find
     * @param type the type of the connection to find, defaults to server type
     */
    findConnection(name: string, type?: string): Observable<Connection>;
    /**
     * Called on a child service instance when onForwardInit returns from the parent
     * @param data The response from the forwardInit call
     */
    protected onForwardInitResponse(data: RpcForwardResponse<ConnectionManagerInitProperties>): void;
    /**
     * Called when a new instance of the service in another window is initialized and needs to synchronize with its parent
     * @param from The RpcRelationshipType that this request is from
     * @returns an observable for the all the values needed to initialize the service
     */
    protected onForwardInit(): Observable<ConnectionManagerInitProperties>;
    /**
     * Called when the forwarded services counterpart wants to get data from the parent
     * @param from The RpcRelationshipType that this request is from
     * @param name The name of the method to forward to
     * @param args The arguments of the method
     * @returns an observable for the result of the method call
     */
    protected onForwardExecute(from: RpcRelationshipType, name: string, args: any[]): Observable<any>;
    /**
     * Called when the forwarded services counterpart sends a notify message
     * @param from The RpcRelationshipType that this request is from
     * @param name The name of the property to change
     * @param value The new value of the property
     * @returns an observable that completes when the property has been changed.
     */
    protected onForwardNotify(from: RpcRelationshipType, name: string, value: any): Observable<void>;
}
