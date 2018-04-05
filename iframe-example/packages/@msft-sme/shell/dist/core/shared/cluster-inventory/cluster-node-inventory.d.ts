import { ServerInventory } from '../server-inventory/server-inventory';
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
export declare class ClusterNodeInventory extends ServerInventory {
    /**
     * Indicates the state if the server is a cluster node
     */
    state: ClusterNodeState;
    /**
     * Indicates the drain status if the server is a cluster node
     */
    drainStatus: ClusterNodeDrainStatus;
    /**
     * Indicates the dynamic weight if the server is a cluster node
     */
    dynamicWeight: number;
    /**
     * Indicates the node weight if the server is a cluster node
     */
    nodeWeight: number;
    /**
     * Indicates the fault domain if the server is a cluster node
     */
    faultDomain: string;
}
