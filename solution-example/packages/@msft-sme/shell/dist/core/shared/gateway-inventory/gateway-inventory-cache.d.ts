import { AppContext } from '../../data/app-context';
import { SharedCache, SharedCacheOptions } from '../shared-cache';
import { GatewayInventory, GatewayInventoryData, GatewayInventoryParams } from './gateway-inventory';
/**
 * Gateway Inventory cache class.
 */
export declare class GatewayInventoryCache extends SharedCache<GatewayInventory, GatewayInventoryData, GatewayInventoryParams> {
    private appContext;
    private static uniqueId;
    private static uniqueVersion;
    /**
     * Initializes a new instance of the GatwewayInventoryCache class.
     *
     * @param appContext the app context.
     * @param options the option of shared cache.
     */
    constructor(appContext: AppContext, options?: SharedCacheOptions);
    /**
     * Defines how to collect the gateway inventory data.
     *
     * @param params the server inventory query params.
     * @return {string} the Observable of ServerInventory data.
     */
    private dataQuery(params);
    /**
     * Defines how to identify the cache entry by params.
     *
     * @param params the server inventory query params.
     * @return {sting} the id string.
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
