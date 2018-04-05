/**
 * Gateway Inventory Detail query parameters.
 */
export interface GatewayInventoryDetailParams {
    /**
     * name of gateway.
     */
    name: string;
}
/**
 * Gateway Inventory Detail data interface.
 */
export interface GatewayInventoryDetailData {
    /**
     * The latest version of gateway available for download.
     */
    latestVersion: string;
}
/**
 * Gateway Inventory Detail class.
 */
export declare class GatewayInventoryDetail implements GatewayInventoryDetailData {
    /**
     * The latest version of gateway available for download.
     */
    latestVersion: string;
    /**
     * Initializes a new instance of the GatewayInventoryDetailData Class.
     *
     * @param data the server inventory recovered data.
     */
    constructor(data?: GatewayInventoryDetailData);
}
