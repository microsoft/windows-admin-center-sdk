/**
 * The interface of resource query.
 */
export interface ResourceCacheFind<T> {
    /**
     * Find a resource by id.
     *
     * @param id the identification.
     * @return T the found object if any.
     */
    find: (id: string) => T;
}
/**
 * Resource service to find a resource data by type and id.
 */
export declare class ResourceCache {
    static svgType: string;
    static svgInlineType: string;
    static strings: string;
    private static collection;
    /**
     * Register resource service to a specific type.
     *
     * @param type the type name of resource.
     * @param resource the resource data with find() interface.
     */
    register(type: string, resource: ResourceCacheFind<any>): void;
    /**
     * Find a resource for the type and id.
     *
     * @param type the type name of resource.
     * @param id the identification.
     * @return T the found object id any.
     */
    find<T>(type: string, id: string): T;
    /**
     * Gets the localized strings initialized by localization manager. The LocalizationManager should have
     * been used to get the localized strings. This can also be achieved by calling SmeEnvironment.initEnvironment().
     * @returns an object containing all the localized strings, or null if noe localized strings have been fetched yet
     */
    getStrings<T>(): T;
}
