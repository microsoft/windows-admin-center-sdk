import { NodeRequestOptions } from '../../data/node-connection';
import { ServerInventory } from '../server-inventory/server-inventory';
import { ClusterNodeInventory } from './cluster-node-inventory';
/**
 * Cluster Inventory query parameters.
 */
export interface ClusterInventoryParams extends NodeRequestOptions {
    /**
     * name of cluster node.
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
    fqdn: string;
    /**
     * Indicates if the cluster is S2d
     */
    isS2dEnabled: boolean;
    /**
     * Indicates if the cluster has Britannica (sddc management resources)
     */
    isBritannicaEnabled: boolean;
    /**
     * Indicating if the PowerShell cmdlet of Microsoft Cluster Health is available.
     */
    isClusterHealthCmdletAvailable: boolean;
    /**
     * Indicates if the cluster cmdlet is installed
     */
    isClusterCmdletAvailable: boolean;
    /**
     * The Node inventories of the cluster
     */
    nodeNames: string[];
    /**
     * The Nodes of the cluster
     */
    nodes: ServerInventory[];
    /**
     * The map of node fqdns to Node inventories
     */
    nodeMap: MsftSme.StringMap<ClusterNodeInventory>;
}
/**
 * Cluster Inventory class.
 */
export declare class ClusterInventory implements ClusterInventoryData {
    clusterName: string;
    /**
     * Indicates if the cluster is S2d
     */
    isS2dEnabled: boolean;
    /**
     * Indicates if the cluster has Britannica (sddc management resources)
     */
    isBritannicaEnabled: boolean;
    /**
     * Indicating if the PowerShell cmdlet of Microsoft Cluster Health is available.
     */
    isClusterHealthCmdletAvailable: boolean;
    /**
     * Indicates if the cluster has the time series database enabled on all nodes
     */
    isTsdbEnabled: boolean;
    /**
     * Indicating if the server has ManagementTools namespacee on all nodes in cluster
     */
    isManagementToolsAvailable: boolean;
    /**
     * Indicates if the hyper-v role is installed on all nodes in cluster
     */
    isHyperVRoleInstalled: boolean;
    /**
     * Indicates if the hyper-v powershell feature is installed on all nodes in the cluster
     */
    isHyperVPowershellInstalled: boolean;
    /**
     * The FQDN of cluster if any
     */
    fqdn: string;
    /**
     * Indicates if the cluster cmdlet is installed on all nodes
     */
    isClusterCmdletAvailable: boolean;
    /**
     * The Node inventories of the cluster
     */
    nodeNames: string[];
    /**
     * The Nodes of the cluster
     */
    nodes: ServerInventory[];
    /**
     * The map of node names to ClusterNodes
     */
    nodeMap: MsftSme.StringMap<ClusterNodeInventory>;
    /**
     * the name of the node the cluster is running on
     */
    currentClusterNode: string;
    /**
     * Initializes a new instance of the ServerInventory Class.
     *
     * @param clusterName the server name to query.
     * @param data the server inventory recovered data.
     */
    constructor(clusterName: string, data?: ClusterInventoryData);
}
