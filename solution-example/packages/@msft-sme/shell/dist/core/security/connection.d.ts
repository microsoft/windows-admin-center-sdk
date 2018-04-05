import { EnvironmentConnectionTypeInfo, EnvironmentModuleEntryPoint } from '../manifest/environment-modules';
/**
 * The connection properties class.
 */
export interface ConnectionProperties extends MsftSme.StringMap<any> {
}
/**
 * The connection attributes class.
 */
export interface ConnectionAttribute {
    /**
     * The id string of this attribute
     */
    id: string;
    /**
     * The value of the attribute. used for attributes that can have variable values such as Operating System
     */
    value?: string | number;
}
/**
 * The connection class.
 */
export interface Connection {
    /**
     * The id of the connection, this is unique per connection
     */
    id: string;
    /**
     * The type of connection
     */
    type: string;
    /**
     * The name of the connection, this is unique per connection type
     */
    name: string;
    /**
     * The property bag of the connection
     */
    properties?: ConnectionProperties;
    /**
     * The ids of attributes identified for this connection
     */
    attributes?: ConnectionAttribute[];
    /**
     * The tags the user(s) have assigned to this connection
     */
    tags?: string[];
}
/**
 * Defines connection type strings known by core
 * Be careful that these strings match what is defined by the manifest of @msft-sme/server-manager
 */
export declare const connectionTypeConstants: {
    server: string;
    cluster: string;
    hyperConvergedCluster: string;
    windowsClient: string;
    clusterNodesProperty: string;
};
/**
 * Connection Utility class.
 */
export declare class ConnectionUtility {
    /**
     * Determines if one connection is referring to the same object as another connection
     *
     * @param a the first connection in the comparison
     * @param b the second connection in the comparison
     * @returns true if the connections are of the same type and have the same name
     */
    static areEqual(a: Connection, b: Connection): boolean;
    /**
     * Determines if the given connection is to a server
     *
     * @param connection the connection to check
     */
    static isServer(connection: Connection): boolean;
    /**
     * Determines if the given connection is to a cluster connection.
     * Currently we support: HCI and Failover Cluster.
     *
     * @param connection the connection to check
     */
    static isCluster(connection: Connection): boolean;
    /**
     * Determines if the given connection is to a FailOver cluster
     *
     * @param connection the connection to check
     */
    static isFailoverCluster(connection: Connection): boolean;
    /**
     * Determines if the given connection is to a HCI cluster
     *
     * @param connection the connection to check
     */
    static isHyperConvergedCluster(connection: Connection): boolean;
    /**
     * Determines if the given connection is to a windows client
     *
     * @param connection the connection to check
     */
    static isWindowsClient(connection: Connection): boolean;
    /**
     * Determines if the given connection is to a node
     *
     * @param connection the connection to check
     */
    static isNode(connection: Connection): boolean;
    /**
     * Gets the name of a node from a connection. This assumes the connection is to a single server or cluster.
     *
     * @param connection the connection object. (should be of type server or cluster)
     * @param throwError throw an error if not a server or cluster.
     */
    static getNodeName(connection: Connection, throwError?: boolean): string;
    /**
     * Gets nodes of a connection of type cluster
     *
     * @param connection the connection object. (should be of type cluster)
     * @param throwError throw an error if not a cluster.
     */
    static getClusterNodes(connection: Connection, throwError?: boolean): string[];
    /**
     * Gets the connection type info for a given connection
     *
     * @param connection the connection object.
     */
    static getConnectionTypeInfo(connection: Connection): EnvironmentConnectionTypeInfo;
    /**
     * creates a connection Identifier
     *
     * @param connectionType the connection type.
     * @param connectionName the connection name.
     */
    static createConnectionId(connectionType: string, connectionName: string): string;
    /**
     * Ensures tat important fields in a connection are lowercase
     * @param connection
     */
    static forceLowercase(connection: Connection): void;
    static getToolsList(connection: Connection, solution: EnvironmentModuleEntryPoint): EnvironmentModuleEntryPoint[];
    private static checkToolRequirements(connection, solution, tool);
}
