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
/**
 * Node aliases visit list.
 *  This is created when retry connection to aliases while connection.name not reacheable;
 *  and is deleted when find the reacheable alias or end of the list
 */
export interface AliasesVisitList {
    /**
     * current visit index
     */
    currentIndex: number;
    /**
     * aliases list
     */
    aliases: string[];
}
export declare class ConnectionManager extends RpcServiceForwarder implements ConnectionManagerInitProperties {
    private gatewayConnection;
    private static activeConnectionPropertyName;
    private static connectionsPropertyName;
    private static saveConnectionMethodName;
    private static saveConnectionsMethodName;
    private static removeConnectionMethodName;
    private static gatewayConnectionApi;
    private allConnections;
    private activeConnectionIndex;
    /**
     * The map of active nodes aliases list, this will be build on demand and clear up whenever any connection aliases changed
     * key: nodeName, this is unique, that means same nodeName with different connection type treat as one entry
     * value: A aliases list for this nodeName (say cluster name),
     *  this may contains child aliases (say IP address) of any alias (say server node).
     */
    private connectionAliasesMap;
    /**
     * nodeAliasesVisit map, the key is connection nodeName
     */
    private nodeAliasesVisitMap;
    /**
     * Subject that Fires once and remembers when connections have been initialized
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
     * Add or update connection.
     */
    addOrUpdateConnection(connection: Connection, save?: boolean): number;
    /**
     * Remove connection.
     */
    removeConnection(connection: Connection): Observable<any>;
    updateConnectionLastCheckedTime(connection: Connection): Observable<any>;
    saveConnection(connection: Connection): Observable<any>;
    /**
     * Bulk operation for saving multiple connections
     * @param connection
     */
    saveConnections(connections: Connection[]): Observable<any>;
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
    /**
     * Get aliases data and save the change with connection
     * @param aliases
     * @param connection
     * @param nodeName
     */
    saveAliasesData(aliases: string[], connection: Connection, nodeName: string): void;
    /**
     * Get active alias from nodeAliasesVisit map with given nodeName
     *  return the node in aliases list in order,
     *  return null if no alias or end of list
     * @param nodeName key in nodeAliasesVisitMap
     */
    getActiveAlias(nodeName: string): string;
    /**
     * Delete aliasesVistList entry with given nodeName from nodeAliasesVisitMap
     * @param nodeName
     */
    private deleteAliasesVisitList(nodeName);
    private isArraySame(array1, array2);
    /**
     * Get nodeAliasesList from map; if not exists create it
     * @param nodeName name of the node, this is unique regardless connection type
     */
    private getNodeAliasesList(nodeName);
    /**
     * Build nodeAliasesList entry with given nodeName, then add it into the map,
     *  return the list of aliases
     * @param nodeName name of the node
     */
    private buildNodeAliasesList(nodeName);
    /**
     * Finds the first connection with aliases info given a name, assume the connections already initialized
     * @param name the name of the connection to find
     */
    private findConnectionWithAliases(name);
}
