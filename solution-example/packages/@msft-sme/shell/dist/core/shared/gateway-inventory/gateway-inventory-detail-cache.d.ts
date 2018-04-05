import { AppContext } from '../../data/app-context';
import { SharedCache, SharedCacheOptions } from '../shared-cache';
import { GatewayInventoryDetail, GatewayInventoryDetailData, GatewayInventoryDetailParams } from './gateway-inventory-detail';
/**
 * Gateway Inventory Detail cache class.
 */
export declare class GatewayInventoryDetailCache extends SharedCache<GatewayInventoryDetail, GatewayInventoryDetailData, GatewayInventoryDetailParams> {
    private appContext;
    private static uniqueId;
    private static uniqueVersion;
    /**
     * Initializes a new instance of the GatewayInventoryCache class.
     *
     * @param appContext the app context.
     * @param options the option of shared cache.
     */
    constructor(appContext: AppContext, options?: SharedCacheOptions);
    /**
     * Defines how to collect the gateway inventory detail data.
     *
     * @param params the gateway inventory detail query params.
     * @return {string} the Observable of GatewayInventoryDetail data.
     */
    private dataQuery(params);
    /**
     * Defines how to identify the cache entry by params.
     *
     * @param params the gateway inventory detail query params.
     * @return {string} the id string.
     */
    private dataInstanceId(params);
    /**
     * Defines how to deserialize the class object from seralized data.
     *
     * @param serialized the serialized string;
     */
    private dataDeserialize(serialized);
    /**
     * Defines how to serialize the class object to seralized data.
     *
     * @param instance the class instance.
     */
    private dataSerialize(instance);
}
