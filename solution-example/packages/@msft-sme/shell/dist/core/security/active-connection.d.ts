import { EnvironmentConnectionTypeInfo } from '../manifest/environment-modules';
import { Connection } from './connection';
import { ConnectionManager } from './connection-manager';
import { CimConnection } from '../data/cim-connection';
import { FileTransfer } from '../data/file-transfer';
import { PowerShellConnection } from '../data/powershell-connection';
/**
 * Provides a shortcut to accessing common information about the active connection.
 */
export declare class ActiveConnection {
    private connectionManager;
    private cimConnection;
    private powerShellConnection;
    private fileTransfer;
    /**
     * map data of connection type information.
     */
    private map;
    /**
     * Gets the active connection
     */
    /**
     * Sets the active connection
     */
    value: Connection;
    /**
     * Indicates if the active connection is to a server
     */
    readonly isServer: boolean;
    /**
     * Indicates if the active connection is to a cluster
     */
    readonly isCluster: boolean;
    /**
     * Indicates if the active connection is to a node (cluster or server)
     */
    readonly isNode: boolean;
    /**
     * Indicates if the active connection is to a failover cluster
     */
    readonly isFailoverCluster: boolean;
    /**
     * Indicates if the active connection is to a hyper converged cluster
     */
    readonly isHyperConvergedCluster: boolean;
    /**
     * Indicates if the active connection is to a windows client
     */
    readonly isWindowsClient: boolean;
    /**
     * If the active connection is a cluster, the cluster node names. Otherwise, an empty array
     */
    readonly clusterNodes: string[];
    /**
     * If the active connection is a node (cluster or server), the node name. Otherwise, null.
     */
    readonly nodeName: string;
    /**
     * Gets the connection type info for the active connection
     */
    readonly connectionTypeInfo: EnvironmentConnectionTypeInfo;
    /**
     * Constructor for the active connection class
     */
    constructor(connectionManager: ConnectionManager, cimConnection: CimConnection, powerShellConnection: PowerShellConnection, fileTransfer: FileTransfer);
}
