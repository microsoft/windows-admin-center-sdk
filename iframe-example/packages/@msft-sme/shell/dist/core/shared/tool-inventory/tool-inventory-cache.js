var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { EnvironmentModuleToolState } from '../../manifest/environment-modules';
import { SharedCache } from '../shared-cache';
import { ToolInventory } from './tool-inventory';
/**
 * Tool Inventory cache class.
 */
var ToolInventoryCache = /** @class */ (function (_super) {
    __extends(ToolInventoryCache, _super);
    /**
     * Initializes a new instance of the ToolInventoryCache class.
     *
     * @param appContext the app context.
     * @param options the option of shared cache.
     */
    function ToolInventoryCache(appContext, options) {
        var _this = _super.call(this, ToolInventoryCache.uniqueId, ToolInventoryCache.uniqueVersion, function (params) { return _this.dataInstanceId(params); }, function (instance) { return _this.dataSerialize(instance); }, function (serialized) { return _this.dataDeserialize(serialized); }, function (params) { return _this.dataQuery(params); }, options) || this;
        _this.appContext = appContext;
        return _this;
    }
    /**
     * Defines how to collect the tool inventory data.
     *
     * @param params the server inventory query params.
     * @return {string} the Observable of ServerInventory data.
     */
    ToolInventoryCache.prototype.dataQuery = function (params) {
        var psSession = this.appContext.powerShell.createSession(params.name, null, params);
        return this.appContext.powerShell.run(psSession, params.script)
            .map(function (data) {
            var inventory = new ToolInventory(params.name);
            if (data && data.results && data.results.length > 0) {
                var result = data.results[0];
                inventory.name = params.name;
                inventory.id = params.id;
                switch (result.state) {
                    case EnvironmentModuleToolState[EnvironmentModuleToolState.Available]:
                        inventory.state = EnvironmentModuleToolState.Available;
                        break;
                    case EnvironmentModuleToolState[EnvironmentModuleToolState.NotConfigured]:
                        inventory.state = EnvironmentModuleToolState.NotConfigured;
                        break;
                    case EnvironmentModuleToolState[EnvironmentModuleToolState.NotSupported]:
                    default:
                        inventory.state = EnvironmentModuleToolState.NotSupported;
                        break;
                }
                inventory.message = result.message;
                inventory.properties = [];
                var properties = result.properties;
                for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                    var pair = properties_1[_i];
                    inventory.properties.push(pair);
                }
            }
            return inventory;
        });
    };
    /**
     * Defines how to identify the cache entry by params.
     *
     * @param params the tool inventory query params.
     * @return {sting} the id string.
     */
    ToolInventoryCache.prototype.dataInstanceId = function (params) {
        return params.name + ":" + params.id;
    };
    /**
     * Defines how to deserialize the class object from seralized data.
     *
     * @param serialized the serialized string;
     */
    ToolInventoryCache.prototype.dataDeserialize = function (serialized) {
        var inventory = JSON.parse(serialized);
        return new ToolInventory(inventory.name, inventory);
    };
    /**
     * Defines how to serialize the class object to seralized data.
     *
     * @param instance the class instance.
     */
    ToolInventoryCache.prototype.dataSerialize = function (instance) {
        // automatically stripped out class related data.
        return JSON.stringify(instance);
    };
    ToolInventoryCache.uniqueId = '@msft-sme/shell:toolInventory';
    ToolInventoryCache.uniqueVersion = 0;
    return ToolInventoryCache;
}(SharedCache));
export { ToolInventoryCache };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL3Rvb2wtaW52ZW50b3J5L3Rvb2wtaW52ZW50b3J5LWNhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsV0FBVyxFQUFzQixNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQWlFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEg7O0dBRUc7QUFDSDtJQUF3QyxzQ0FBa0U7SUFJdEc7Ozs7O09BS0c7SUFDSCw0QkFBb0IsVUFBc0IsRUFBRSxPQUE0QjtRQUF4RSxZQUNJLGtCQUNJLGtCQUFrQixDQUFDLFFBQVEsRUFDM0Isa0JBQWtCLENBQUMsYUFBYSxFQUNoQyxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQTNCLENBQTJCLEVBQ3ZDLFVBQUMsUUFBUSxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBNUIsQ0FBNEIsRUFDMUMsVUFBQyxVQUFVLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxFQUFoQyxDQUFnQyxFQUNoRCxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQXRCLENBQXNCLEVBQ2xDLE9BQU8sQ0FBQyxTQUNmO1FBVG1CLGdCQUFVLEdBQVYsVUFBVSxDQUFZOztJQVMxQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxzQ0FBUyxHQUFqQixVQUFrQixNQUEyQjtRQUN6QyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEYsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUMxRCxHQUFHLENBQUMsVUFBQyxJQUFTO1lBQ1gsSUFBTSxTQUFTLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLFNBQVMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDN0IsU0FBUyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUN6QixNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsS0FBSywwQkFBMEIsQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLENBQUM7d0JBQ2pFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsMEJBQTBCLENBQUMsU0FBUyxDQUFDO3dCQUN2RCxLQUFLLENBQUM7b0JBQ1YsS0FBSywwQkFBMEIsQ0FBQywwQkFBMEIsQ0FBQyxhQUFhLENBQUM7d0JBQ3JFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsMEJBQTBCLENBQUMsYUFBYSxDQUFDO3dCQUMzRCxLQUFLLENBQUM7b0JBQ1YsS0FBSywwQkFBMEIsQ0FBQywwQkFBMEIsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDekU7d0JBQ0ksU0FBUyxDQUFDLEtBQUssR0FBRywwQkFBMEIsQ0FBQyxZQUFZLENBQUM7d0JBQzFELEtBQUssQ0FBQztnQkFDZCxDQUFDO2dCQUVELFNBQVMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDbkMsU0FBUyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7Z0JBQzFCLElBQU0sVUFBVSxHQUE0QixNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUM5RCxHQUFHLENBQUMsQ0FBYSxVQUFVLEVBQVYseUJBQVUsRUFBVix3QkFBVSxFQUFWLElBQVU7b0JBQXRCLElBQUksSUFBSSxtQkFBQTtvQkFDVCxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkM7WUFDTCxDQUFDO1lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLDJDQUFjLEdBQXRCLFVBQXVCLE1BQTJCO1FBQzlDLE1BQU0sQ0FBSSxNQUFNLENBQUMsSUFBSSxTQUFJLE1BQU0sQ0FBQyxFQUFJLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyw0Q0FBZSxHQUF2QixVQUF3QixVQUFrQjtRQUN0QyxJQUFNLFNBQVMsR0FBc0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1RCxNQUFNLENBQUMsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLDBDQUFhLEdBQXJCLFVBQXNCLFFBQXVCO1FBQ3pDLGlEQUFpRDtRQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBeEZjLDJCQUFRLEdBQUcsK0JBQStCLENBQUM7SUFDM0MsZ0NBQWEsR0FBRyxDQUFDLENBQUM7SUF3RnJDLHlCQUFDO0NBMUZELEFBMEZDLENBMUZ1QyxXQUFXLEdBMEZsRDtTQTFGWSxrQkFBa0IiLCJmaWxlIjoidG9vbC1pbnZlbnRvcnktY2FjaGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9