import { AppContext } from '../../data/app-context';
import { SharedCache, SharedCacheOptions } from '../shared-cache';
import { ServerInventoryDetail, ServerInventoryDetailData, ServerInventoryDetailParams } from './server-inventory-detail';
/**
 * Server Inventory cache class.
 */
export declare class ServerInventoryDetailCache extends SharedCache<ServerInventoryDetail, ServerInventoryDetailData, ServerInventoryDetailParams> {
    private appContext;
    private static uniqueId;
    private static uniqueVersion;
    /**
     * Initializes a new instance of the ServerInventoryCache class.
     *
     * @param appContext the app context.
     * @param options the option of shared cache.
     */
    constructor(appContext: AppContext, options?: SharedCacheOptions);
    /**
     * Defines how to collect the server inventory data.
     *
     * @param params the server inventory detail query params.
     * @return {string} the Observable of ServerInventoryDetail data.
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
