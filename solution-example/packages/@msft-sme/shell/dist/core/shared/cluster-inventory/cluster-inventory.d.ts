import { NodeRequestOptions } from '../../data/node-connection';
import { ServerInventory } from '../server-inventory/server-inventory';
/**
 * Represents a failover cluster node
 */
export interface ClusterNode {
    name: string;
    fqdn: string;
    state: ClusterNodeState;
    drainStatus: ClusterNodeDrainStatus;
    dynamicWeight: number;
    nodeWeight: number;
    faultDomain: string;
    inventory?: ServerInventory;
}
/**
 * Represents the state of a failover cluster node.
 */
export declare enum ClusterNodeState {
    Unknown = -1,
    Up = 0,
    Down = 1,
    Paused = 2,
    Joining = 3,
}
/**
 * Represents the Drain Status of a failover cluster node.
 */
export declare enum ClusterNodeDrainStatus {
    Unknown = -1,
    NotInitiated = 0,
    InProgress = 1,
    Completed = 2,
    Failed = 3,
}
/**
 * Cluster Inventory query parameters.
 */
export interface ClusterInventoryParams extends NodeRequestOptions {
    /**
     * name of server node.
     */
    name: string;
}
/**
 * Cluster Inventory data interface.
 */
export interface ClusterInventoryData {
    /**
     * The name of cluster connection
     */
    clusterName: string;
    /**
     * The FQDN of cluster if any.
     */
    fullyQualifiedDomainName: string;
    /**
     * Indicates if the cluster cmdlet is installed on all nodes
     */
    isClusterCmdletAvailableForAllNodes: boolean;
    /**
     * The Node inventories of the cluster
     */
    nodeNames: string[];
    /**
     * The Nodes of the cluster
     */
    nodes: ClusterNode[];
    /**
     * The map of node fqdns to Node inventories
     */
    nodeMap: MsftSme.StringMap<ClusterNode>;
}
/**
 * Cluster Inventory class.
 */
export declare class ClusterInventory implements ClusterInventoryData {
    clusterName: string;
    /**
     * The FQDN of cluster if any
     */
    fullyQualifiedDomainName: string;
    /**
     * Indicates if the cluster cmdlet is installed on all nodes
     */
    isClusterCmdletAvailableForAllNodes: boolean;
    /**
     * The Node inventories of the cluster
     */
    nodeNames: string[];
    /**
     * The Nodes of the cluster
     */
    nodes: ClusterNode[];
    /**
     * The map of node names to ClusterNodes
     */
    nodeMap: MsftSme.StringMap<ClusterNode>;
    /**
     * Initializes a new instance of the ServerInventory Class.
     *
     * @param clusterName the server name to query.
     * @param data the server inventory recovered data.
     */
    constructor(clusterName: string, data?: ClusterInventoryData);
}
