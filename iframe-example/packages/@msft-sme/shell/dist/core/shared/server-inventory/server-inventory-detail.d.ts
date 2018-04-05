import { NodeRequestOptions } from '../../data/node-connection';
/**
 * Server Inventory detail query parameters.
 */
export interface ServerInventoryDetailParams extends NodeRequestOptions {
    /**
     * name of server node.
     */
    name: string;
}
/**
 * Server Inventory detail data interface.
 */
export interface ServerInventoryDetailData {
    /**
     * The server name.
     */
    serverName: string;
    /**
     * The list of processor names.
     */
    processors: string[];
    /**
     * The total memory capacity. (bytes)
     */
    totalMemory: number;
    /**
     * The total disk capacity. (bytes)
     */
    totalDisk: number;
    /**
     * The number of physical NICs.
     */
    totalPhysicalNics: number;
    /**
     * The free disk space. (bytes)
     */
    totalFreeDiskSpace: number;
}
/**
 * Server Inventory Detail class.
 */
export declare class ServerInventoryDetail implements ServerInventoryDetailData {
    serverName: string;
    /**
     * The list of processor names.
     */
    processors: string[];
    /**
     * The total memory capacity.
     */
    totalMemory: number;
    /**
     * The total disk capacity.
     */
    totalDisk: number;
    /**
     * The number of sockets.
     */
    sockets: string[];
    /**
     * The number of physical NICs.
     */
    totalPhysicalNics: number;
    /**
     * The free disk space.
     */
    totalFreeDiskSpace: number;
    /**
     * Initializes a new instance of the ServerInventory Class.
     *
     * @param serverName the server name to query.
     * @param data the server inventory recovered data.
     */
    constructor(serverName: string, data?: ServerInventoryDetailData);
    /**
     * Gets display name of processors.
     */
    readonly processorsDisplayName: string;
    /**
     * Gets the display name of total memory capacity.
     */
    readonly totalMemoryDisplayName: string;
    /**
     * Gets the display name of total disk capacity.
     */
    readonly totalDiskDisplayName: string;
    /**
     * Gets the display name of free space on disk.
     */
    readonly freeDiskDisplayName: string;
}
