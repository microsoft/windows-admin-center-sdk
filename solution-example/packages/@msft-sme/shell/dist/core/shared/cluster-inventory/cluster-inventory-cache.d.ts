import { AppContext } from '../../data/app-context';
import { SharedCache, SharedCacheOptions } from '../shared-cache';
import { ClusterInventory, ClusterInventoryData, ClusterInventoryParams } from './cluster-inventory';
/**
 * Cluster Inventory cache class.
 */
export declare class ClusterInventoryCache extends SharedCache<ClusterInventory, ClusterInventoryData, ClusterInventoryParams> {
    private appContext;
    private static uniqueId;
    private static uniqueVersion;
    private serverInventoryCache;
    /**
     * Initializes a new instance of the ClusterInventoryCache class.
     *
     * @param appContext the app context.
     * @param options the option of shared cache.
     */
    constructor(appContext: AppContext, options?: SharedCacheOptions);
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
    /**
     * Defines how to collect the cluster inventory data.
     *
     * @param params the server inventory query params.
     * @return {string} the Observable of ClusterInventory data.
     */
    private dataQuery(params);
    /**
     * Defines how to collect the cluster node-server inventory data.
     * @param inventory  the initial cluster inventory query params.
     * @param params the server inventory query params.
     * @return {string} the Observable of ClusterInventory data.
     */
    private queryClusterNodeInventories(inventory, params);
}
