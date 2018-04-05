import { NodeRequestOptions } from '../../data/node-connection';
import { EnvironmentModuleToolState } from '../../manifest/environment-modules';
/**
 * Tool Inventory query parameters.
 */
export interface ToolInventoryParams extends NodeRequestOptions {
    /**
     * The name of connection.
     */
    name: string;
    /**
     * The identification of the tool.
     */
    id: string;
    /**
     * The script of PowerShell query.
     */
    script: string;
}
export interface ToolInventoryProperty {
    /**
     * The name of data.
     */
    name: string;
    /**
     * The value of data.
     */
    value: string;
    /**
     * The type of data.
     */
    type: 'string' | 'number' | 'boolean';
}
/**
 * Tool Inventory data interface.
 */
export interface ToolInventoryData {
    /**
     * The name of connection.
     */
    name: string;
    /**
     * The identification of the tool.
     */
    id: string;
    /**
     * The state of supportable.
     */
    state: EnvironmentModuleToolState;
    /**
     * The message of state.
     */
    message: string;
    /**
     * The key value pairs of collected data.
     */
    properties: ToolInventoryProperty[];
}
/**
 * Tool Inventory class.
 */
export declare class ToolInventory implements ToolInventoryData {
    /**
     * The name of connection.
     */
    name: string;
    /**
     * The identification of the tool.
     */
    id: string;
    /**
     * The state of supportable.
     */
    state: EnvironmentModuleToolState;
    /**
     * The message of state.
     */
    message: string;
    /**
     * The key value pairs of collected data.
     */
    properties: ToolInventoryProperty[];
    /**
     * Initializes a new instance of the ServerInventory Class.
     *
     * @param name the connection name to query.
     * @param data the server inventory recovered data.
     */
    constructor(name: string, data?: ToolInventoryData);
}
