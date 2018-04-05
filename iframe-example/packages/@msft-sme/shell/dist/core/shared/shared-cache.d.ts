import { Observable } from 'rxjs';
export interface SharedCacheOptions {
    /**
     * The expiration time by milliseconds.
     */
    expiration?: number;
    /**
     * Flag to force the cache to refresh.
     */
    forceRefresh?: boolean;
}
export interface SharedCacheContainer<TClass> {
    /**
     * The last timestamp for the instance collected.
     */
    timestamp: number;
    /**
     * The instance of the data class.
     */
    instance: TClass;
}
/**
 * Abstract class of SharedCache by using session storage.
 *
 * TClass: the caching data class type.
 * TData: the caching data interface type.
 * TParams: the data query parameters type.
 */
export declare abstract class SharedCache<TClass, TData, TParams> {
    private uniqueId;
    private uniqueVersion;
    private instanceId;
    private serialize;
    private deserialize;
    private getDataQuery;
    private options;
    private cache;
    /**
     * Initializes a new instance of the SharedCache class.
     *
     * @param uniqueId the unique identity of the colleciton of data.
     * @param uniqueVersion the unique version of data. (Should increment any data format or query change)
     * @param instanceId the instance id generator.
     * @param serialize the data serializarion.
     * @param deserialize the data deserialization.
     * @param getDataQuery the query observable.
     * @param options the shared cache options.
     */
    constructor(uniqueId: string, uniqueVersion: number, instanceId: (params: TParams) => string, serialize: (instance: TClass) => string, deserialize: (serialized: string) => TClass, getDataQuery?: (params: TParams) => Observable<TClass>, options?: SharedCacheOptions);
    /**
     * Gets the id of the collection of data.
     */
    readonly id: string;
    /**
     * Gets the version of the cache for format and query.
     */
    readonly version: number;
    /**
     * Check if the Cache has unexpired data available for the instance id.
     * @param params the parameter to check for the data.
     */
    isAvailable(params: TParams): boolean;
    /**
     * Query to find the data.
     * @param params the parameter to query the data.
     */
    query(params: TParams): Observable<SharedCacheContainer<TClass>>;
    /**
     * Refresh the data.
     * @param params the parameter to query the data.
     */
    refresh(params: TParams): Observable<SharedCacheContainer<TClass>>;
    /**
     * Save an instance data to session storage.
     *
     * @param params the parameter to query the data.
     * @param data the data object to store.
     */
    save(params: TParams, data: TClass): void;
    /**
     * Clear the cache.
     *
     * @param params the parameter to query the data (optional to delete an instane)
     */
    clear(params?: TParams): void;
    private expired(data);
    private update(params);
    private sessionRestore();
    private sessionSave(params, data?);
    private readonly cacheKey;
}
