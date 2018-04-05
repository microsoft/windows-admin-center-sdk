/**
 * Gateway Inventory query parameters.
 */
export interface GatewayInventoryParams {
    /**
     * name of gateway.
     */
    name: string;
    /**
     * no control of auth handling if set true.
     */
    noAuth?: boolean;
}
/**
 * Gateway Inventory data interface.
 */
export interface GatewayInventoryData {
    /**
     * The available memory in MBytes.
     */
    availableMemoryMByte: number;
    /**
     * The working set of gateway process.
     */
    gatewayWorkingSetMByte: number;
    /**
     * The total cpu utilization.
     */
    totalCpuUtilizationPercent: number;
    /**
     * The gateway cpu utilization.
     */
    gatewayCpuUtilizationPercent: number;
    /**
     * The gateway version.
     */
    gatewayVersion: string;
    /**
     * The friendly OS name.
     */
    friendlyOsName: string;
    /**
     * The msi installed date.
     */
    installedDate: string;
    /**
     * The logical processor count.
     */
    logicalProcessorCount: number;
    /**
     * The gateway name.
     */
    name: string;
    /**
     * The service mode or desktop mode of gateway.
     */
    isServiceMode: boolean;
    /**
     * The status of gateway process - if it is running elevated or not.
     */
    isGatewayProcessElevated: boolean;
}
/**
 * Gateway Inventory class.
 */
export declare class GatewayInventory implements GatewayInventoryData {
    /**
     * The available memory in MBytes.
     */
    availableMemoryMByte: number;
    /**
     * The working set of gateway process.
     */
    gatewayWorkingSetMByte: number;
    /**
     * The total cpu utilization.
     */
    totalCpuUtilizationPercent: number;
    /**
     * The gateway cpu utilization.
     */
    gatewayCpuUtilizationPercent: number;
    /**
     * The gateway version.
     */
    gatewayVersion: string;
    /**
     * The friendly OS name.
     */
    friendlyOsName: string;
    /**
     * The msi installed date.
     */
    installedDate: string;
    /**
     * The logical processor count.
     */
    logicalProcessorCount: number;
    /**
     * The gateway name.
     */
    name: string;
    /**
     * The service mode or desktop mode of gateway.
     */
    isServiceMode: boolean;
    /**
     * The status of gateway process - if it is running elevated or not.
     */
    isGatewayProcessElevated: boolean;
    /**
     * Initializes a new instance of the GatewayInventory Class.
     *
     * @param data the server inventory recovered data.
     */
    constructor(data?: GatewayInventoryData);
}
