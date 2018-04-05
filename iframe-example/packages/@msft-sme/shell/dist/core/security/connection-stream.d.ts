import { Observable } from 'rxjs';
import { GatewayConnection } from '../data/gateway-connection';
import { PowerShellConnection } from '../data/powershell-connection';
import { Rpc } from '../rpc/rpc';
import { Connection } from './connection';
import { ConnectionManager } from './connection-manager';
/**
 * Live connection interface.
 */
export interface LiveConnection {
    /**
     * the connection object.
     */
    connection: Connection;
    /**
     * the loading state while query the connection status.
     */
    loading: boolean;
    /**
     * the date number (Date.now() value).
     */
    lastUpdated: number;
    /**
     * the status of connection.
     */
    status?: LiveConnectionStatus;
    /**
     * The extra properties on the connection.
     */
    properties?: MsftSme.StringMap<any>;
}
/**
 * The live connection status.
 */
export interface LiveConnectionStatus {
    /**
     * The display string of status.
     */
    label?: string;
    /**
     * The status type.
     */
    type: LiveConnectionStatusType;
    /**
     * The detail connection error message.
     */
    details?: string;
}
/**
 * The live connection status type.
 */
export declare enum LiveConnectionStatusType {
    /**
     * Online status.
     */
    Online = 0,
    /**
     * Warning status.
     */
    Warning = 1,
    /**
     * Unauthorized status.
     */
    Unauthorized = 2,
    /**
     * Error status.
     */
    Error = 3,
    /**
     * Fatal status.
     */
    Fatal = 4,
    /**
     * Unknown status (used for loading status).
     */
    Unknown = 5,
}
/**
 * The live connection change type.
 */
export declare enum LiveConnectionChangeType {
    /**
     * Add change.
     */
    Add = 0,
    /**
     * Remove change.
     */
    Remove = 1,
    /**
     * Update change.
     */
    Update = 2,
    /**
     * Error change (reserved)
     */
    Error = 3,
}
/**
 * The live connection change interface.
 */
export interface LiveConnectionChange {
    /**
     * The change type.
     */
    type: LiveConnectionChangeType;
    /**
     * The live connection instance.
     */
    liveConnection: LiveConnection;
}
/**
 * ConnectionStream class that enables to get all connections once and listen to the change.
 *
 * TODO:
 * 1. Support live connection status for a single connection in such a way that one could subscribe to it from ActiveConnection
 *    with that observable always being for the active connection.
 * 2. Support updating all connection status on an interval. (using existing expiration field in cache)
 * 3. Support preserving status across sessions during the interval time.
 *    currently we are using session storage, this may also require credentials to be preserved across sessions.
 */
export declare class ConnectionStream {
    private rpc;
    private connectionManager;
    private powershellConnection;
    private gatewayConnection;
    /**
     * The Cache key for the connection stream class
     */
    private static cacheKey;
    /**
     * The duration in milliseconds for the connection stream cache. Current is 10 minutes.
     */
    private static cacheDurationInMilliseconds;
    private refreshAllSubject;
    private refreshOneSubject;
    private collectionStream;
    private cache;
    private statusLabelMap;
    private connectionStrings;
    /**
     * Clears the connections stream cache
     */
    static clearCache(): void;
    /**
     * Initializes a new instance of the ConnectionStream class.
     * @param connectionManager the connection manager object.
     * @param powershellConnection the powerShell connection object.
     * @param gatewayConnection the gateway connection object.
     */
    constructor(rpc: Rpc, connectionManager: ConnectionManager, powershellConnection: PowerShellConnection, gatewayConnection: GatewayConnection);
    /**
     * Gets current live connection collection.
     * - Subscribe liveConnectionChanged observable afterward.
     *
     * @return LiveConnection[] current live connections data.
     */
    readonly liveConnectionCollection: Observable<LiveConnection[]>;
    /**
     * Gets the observable of live connection change.
     *
     * @return Observable<LiveConnectionChange> change of live connection data.
     */
    readonly liveConnectionChanged: Observable<LiveConnectionChange>;
    /**
     * Wraps a connection in a live connection object by retrieving its current status
     * @param connection
     */
    getLiveConnection(connection: Connection): Observable<LiveConnection>;
    /**
     * Get connection status and aliases from statusProvider, retry alaises when connection nodeName NotFound
     * @param statusProvider status provider from typeInfo manifest
     * @param connection original connection
     * @param nodeName retry nodeName, can be connection.name or alias
     */
    private getConnectionStatus(statusProvider, connection, nodeName);
    /**
     * Refreshes the connection stream. If a connection is provided, only that connections live information will be refreshed.
     *
     * @param connection the connection object (optional)
     */
    refresh(connection?: Connection): void;
    /**
     * Create change observable.
     */
    private createChangeObservable();
    /**
     * Returns an observable that emits an live connection object
     * for every additive connection event such as initialized, added, and updated
     */
    private getIncomingChange();
    private createChange(connection, type);
    /**
     * Retrieves a connections status from a powershell status provider
     * @param nodeName
     * @param options The powershell options
     */
    private getConnectionStatusFromPowershell(nodeName, options);
    /**
     * Retrieves a connections status from a gatewayUrl status provider
     * @param nodeName
     * @param relativeUrl the relative url from the relativeGatewayUrl provider
     */
    private getConnectionStatusFromGatewayUrl(nodeName, relativeUrl);
    /**
     * Saves the connections stream catch
     */
    private saveCache();
    /**
     * Restores the connections stream catch
     *
     * @return boolean indicate there is difference in cache.
     */
    private restoreCache();
    /**
     * Clears the connections stream catch
     */
    private clearCache();
}
