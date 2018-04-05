/**
 * Gateway Inventory query parameters.
 */
export interface GatewayInventoryParams {
    /**
     * no control of auth handling if set true.
     */
    noAuth?: boolean;
}
/**
 * The mode that the gateway is running as.
 */
export declare enum GatewayMode {
    /**
     * Indicates the Gateway is running as a service
     */
    Service = 0,
    /**
     * Indicates the Gateway is running as a desktop application
     */
    Desktop = 1,
    /**
     * Indicates the Gateway is running as a UWP application
     */
    App = 2,
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
     * @deprecated Use {@link mode} property instead
     */
    isServiceMode: boolean;
    /**
     * The mode that the gateway is running as.
     */
    mode: GatewayMode;
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
     * @deprecated Use {@link mode} property instead
     */
    isServiceMode: boolean;
    /**
     * The mode that the gateway is running as.
     */
    mode: GatewayMode;
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
