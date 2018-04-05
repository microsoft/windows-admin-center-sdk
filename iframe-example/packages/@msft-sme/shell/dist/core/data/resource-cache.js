import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
/**
 * Resource service to find a resource data by type and id.
 */
var ResourceCache = /** @class */ (function () {
    function ResourceCache() {
    }
    /**
     * Register resource service to a specific type.
     *
     * @param type the type name of resource.
     * @param resource the resource data with find() interface.
     */
    ResourceCache.prototype.register = function (type, resource) {
        var existingResource = ResourceCache.collection[type];
        if (existingResource) {
            var mergedResource = MsftSme.deepAssign(existingResource, resource);
            ResourceCache.collection[type] = mergedResource;
        }
        else {
            ResourceCache.collection[type] = resource;
        }
    };
    /**
     * Find a resource for the type and id.
     *
     * @param type the type name of resource.
     * @param id the identification.
     * @return T the found object id any.
     */
    ResourceCache.prototype.find = function (type, id) {
        var resource = ResourceCache.collection[type];
        if (!resource) {
            Logging.log({
                source: 'ResourceCache',
                level: LogLevel.Warning,
                message: MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ResourceCacheUnableFind.message.format(type)
            });
            return null;
        }
        return resource.find(id);
    };
    /**
     * Gets the localized strings initialized by localization manager. The LocalizationManager should have
     * been used to get the localized strings. This can also be achieved by calling SmeEnvironment.initEnvironment().
     * @returns an object containing all the localized strings, or null if noe localized strings have been fetched yet
     */
    ResourceCache.prototype.getStrings = function () {
        var global = window;
        return global.MsftSme.Resources && global.MsftSme.Resources.strings;
    };
    ResourceCache.svgType = 'svg';
    ResourceCache.svgInlineType = 'svgInline';
    ResourceCache.strings = 'strings';
    ResourceCache.collection = {};
    return ResourceCache;
}());
export { ResourceCache };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9yZXNvdXJjZS1jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBZWpEOztHQUVHO0FBQ0g7SUFBQTtJQXFEQSxDQUFDO0lBOUNHOzs7OztPQUtHO0lBQ0ksZ0NBQVEsR0FBZixVQUFnQixJQUFZLEVBQUUsUUFBZ0M7UUFDMUQsSUFBSSxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3BFLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDO1FBQ3BELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQzlDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksNEJBQUksR0FBWCxVQUFlLElBQVksRUFBRSxFQUFVO1FBQ25DLElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBWTtnQkFDbkIsTUFBTSxFQUFFLGVBQWU7Z0JBQ3ZCLEtBQUssRUFBRSxRQUFRLENBQUMsT0FBTztnQkFDdkIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3BILENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELE1BQU0sQ0FBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksa0NBQVUsR0FBakI7UUFDSSxJQUFJLE1BQU0sR0FBMkIsTUFBTSxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7SUFDM0UsQ0FBQztJQW5EYSxxQkFBTyxHQUFHLEtBQUssQ0FBQztJQUNoQiwyQkFBYSxHQUFHLFdBQVcsQ0FBQztJQUM1QixxQkFBTyxHQUFHLFNBQVMsQ0FBQztJQUVuQix3QkFBVSxHQUErQyxFQUFFLENBQUM7SUFnRC9FLG9CQUFDO0NBckRELEFBcURDLElBQUE7U0FyRFksYUFBYSIsImZpbGUiOiJyZXNvdXJjZS1jYWNoZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=