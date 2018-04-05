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
import { SharedCache } from '../shared-cache';
import { GatewayInventory } from './gateway-inventory';
/**
 * Gateway Inventory cache class.
 */
var GatewayInventoryCache = (function (_super) {
    __extends(GatewayInventoryCache, _super);
    /**
     * Initializes a new instance of the GatwewayInventoryCache class.
     *
     * @param appContext the app context.
     * @param options the option of shared cache.
     */
    function GatewayInventoryCache(appContext, options) {
        var _this = _super.call(this, GatewayInventoryCache.uniqueId, GatewayInventoryCache.uniqueVersion, function (params) { return _this.dataInstanceId(params); }, function (instance) { return _this.dataSerialize(instance); }, function (serialized) { return _this.dataDeserialize(serialized); }, function (params) { return _this.dataQuery(params); }, options) || this;
        _this.appContext = appContext;
        return _this;
    }
    /**
     * Defines how to collect the gateway inventory data.
     *
     * @param params the server inventory query params.
     * @return {string} the Observable of ServerInventory data.
     */
    GatewayInventoryCache.prototype.dataQuery = function (params) {
        return this.appContext.gateway.get('gateway/status')
            .map(function (data) {
            var inventory = new GatewayInventory();
            if (data) {
                inventory.availableMemoryMByte = data.availableMemoryMByte;
                inventory.gatewayWorkingSetMByte = data.gatewayWorkingSetMByte;
                inventory.totalCpuUtilizationPercent = data.totalCpuUtilizationPercent;
                inventory.gatewayCpuUtilizationPercent = data.gatewayCpuUtilizationPercent;
                inventory.gatewayVersion = data.gatewayVersion;
                inventory.friendlyOsName = data.friendlyOsName;
                inventory.installedDate = data.installedDate;
                inventory.logicalProcessorCount = data.logicalProcessorCount;
                inventory.name = data.name;
                inventory.isServiceMode = data.isServiceMode;
                inventory.isGatewayProcessElevated = data.isGatewayProcessElevated;
            }
            return inventory;
        });
    };
    /**
     * Defines how to identify the cache entry by params.
     *
     * @param params the server inventory query params.
     * @return {sting} the id string.
     */
    GatewayInventoryCache.prototype.dataInstanceId = function (params) {
        return params.name;
    };
    /**
     * Defines how to deserialize the class object from seralized data.
     *
     * @param serialized the serialized string;
     */
    GatewayInventoryCache.prototype.dataDeserialize = function (serialized) {
        var inventory = JSON.parse(serialized);
        return new GatewayInventory(inventory);
    };
    /**
     * Defines how to serialize the class object to seralized data.
     *
     * @param instance the class instance.
     */
    GatewayInventoryCache.prototype.dataSerialize = function (instance) {
        // automatically stripped out class related data.
        return JSON.stringify(instance);
    };
    return GatewayInventoryCache;
}(SharedCache));
export { GatewayInventoryCache };
GatewayInventoryCache.uniqueId = '@msft-sme/shell:gatewayInventory';
GatewayInventoryCache.uniqueVersion = 2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL2dhdGV3YXktaW52ZW50b3J5L2dhdGV3YXktaW52ZW50b3J5LWNhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQSxPQUFPLEVBQUUsV0FBVyxFQUFzQixNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBZ0QsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRzs7R0FFRztBQUNIO0lBQTJDLHlDQUEyRTtJQUlsSDs7Ozs7T0FLRztJQUNILCtCQUFvQixVQUFzQixFQUFFLE9BQTRCO1FBQXhFLFlBQ0ksa0JBQ0kscUJBQXFCLENBQUMsUUFBUSxFQUM5QixxQkFBcUIsQ0FBQyxhQUFhLEVBQ25DLFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBM0IsQ0FBMkIsRUFDdkMsVUFBQyxRQUFRLElBQUssT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUE1QixDQUE0QixFQUMxQyxVQUFDLFVBQVUsSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQWhDLENBQWdDLEVBQ2hELFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBdEIsQ0FBc0IsRUFDbEMsT0FBTyxDQUFDLFNBQ2Y7UUFUbUIsZ0JBQVUsR0FBVixVQUFVLENBQVk7O0lBUzFDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLHlDQUFTLEdBQWpCLFVBQWtCLE1BQThCO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7YUFDL0MsR0FBRyxDQUFDLFVBQUMsSUFBUztZQUNYLElBQU0sU0FBUyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUV6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNQLFNBQVMsQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7Z0JBQzNELFNBQVMsQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUM7Z0JBQy9ELFNBQVMsQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUM7Z0JBQ3ZFLFNBQVMsQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUM7Z0JBQzNFLFNBQVMsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFDL0MsU0FBUyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUMvQyxTQUFTLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7Z0JBQzdDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7Z0JBQzdELFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDM0IsU0FBUyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO2dCQUM3QyxTQUFTLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDO1lBQ3ZFLENBQUM7WUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssOENBQWMsR0FBdEIsVUFBdUIsTUFBOEI7UUFDakQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSywrQ0FBZSxHQUF2QixVQUF3QixVQUFrQjtRQUN0QyxJQUFNLFNBQVMsR0FBeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLDZDQUFhLEdBQXJCLFVBQXNCLFFBQTBCO1FBQzVDLGlEQUFpRDtRQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQS9FQSxBQStFQyxDQS9FMEMsV0FBVzs7QUFDbkMsOEJBQVEsR0FBRyxrQ0FBa0MsQ0FBQztBQUM5QyxtQ0FBYSxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJnYXRld2F5LWludmVudG9yeS1jYWNoZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=