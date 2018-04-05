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
import { GatewayInventory, GatewayMode } from './gateway-inventory';
/**
 * Gateway Inventory cache class.
 */
var GatewayInventoryCache = /** @class */ (function (_super) {
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
                inventory.name = data.name.toLowerCase();
                inventory.isServiceMode = data.isServiceMode;
                inventory.isGatewayProcessElevated = data.isGatewayProcessElevated;
                inventory.mode = GatewayMode[data.gatewayMode] || GatewayMode.Desktop;
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
        // dont use the passed in name. Gateway cache is always to the same name
        return GatewayInventoryCache.gatewayName;
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
    GatewayInventoryCache.uniqueId = '@msft-sme/shell:gatewayInventory';
    GatewayInventoryCache.uniqueVersion = 2;
    GatewayInventoryCache.gatewayName = 'gateway';
    return GatewayInventoryCache;
}(SharedCache));
export { GatewayInventoryCache };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL2dhdGV3YXktaW52ZW50b3J5L2dhdGV3YXktaW52ZW50b3J5LWNhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQSxPQUFPLEVBQUUsV0FBVyxFQUFzQixNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBZ0QsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFbEg7O0dBRUc7QUFDSDtJQUEyQyx5Q0FBMkU7SUFLbEg7Ozs7O09BS0c7SUFDSCwrQkFBb0IsVUFBc0IsRUFBRSxPQUE0QjtRQUF4RSxZQUNJLGtCQUNJLHFCQUFxQixDQUFDLFFBQVEsRUFDOUIscUJBQXFCLENBQUMsYUFBYSxFQUNuQyxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQTNCLENBQTJCLEVBQ3ZDLFVBQUMsUUFBUSxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBNUIsQ0FBNEIsRUFDMUMsVUFBQyxVQUFVLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxFQUFoQyxDQUFnQyxFQUNoRCxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQXRCLENBQXNCLEVBQ2xDLE9BQU8sQ0FBQyxTQUNmO1FBVG1CLGdCQUFVLEdBQVYsVUFBVSxDQUFZOztJQVMxQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyx5Q0FBUyxHQUFqQixVQUFrQixNQUE4QjtRQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO2FBQy9DLEdBQUcsQ0FBQyxVQUFDLElBQVM7WUFDWCxJQUFNLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFFekMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUCxTQUFTLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDO2dCQUMzRCxTQUFTLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO2dCQUMvRCxTQUFTLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDO2dCQUN2RSxTQUFTLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDO2dCQUMzRSxTQUFTLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQy9DLFNBQVMsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFDL0MsU0FBUyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO2dCQUM3QyxTQUFTLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO2dCQUM3RCxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3pDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztnQkFDN0MsU0FBUyxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztnQkFDbkUsU0FBUyxDQUFDLElBQUksR0FBRyxXQUFXLENBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUM7WUFDbEYsQ0FBQztZQUVELE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyw4Q0FBYyxHQUF0QixVQUF1QixNQUE4QjtRQUNqRCx3RUFBd0U7UUFDeEUsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLCtDQUFlLEdBQXZCLFVBQXdCLFVBQWtCO1FBQ3RDLElBQU0sU0FBUyxHQUF5QixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssNkNBQWEsR0FBckIsVUFBc0IsUUFBMEI7UUFDNUMsaURBQWlEO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFoRmMsOEJBQVEsR0FBRyxrQ0FBa0MsQ0FBQztJQUM5QyxtQ0FBYSxHQUFHLENBQUMsQ0FBQztJQUNsQixpQ0FBVyxHQUFHLFNBQVMsQ0FBQztJQStFM0MsNEJBQUM7Q0FsRkQsQUFrRkMsQ0FsRjBDLFdBQVcsR0FrRnJEO1NBbEZZLHFCQUFxQiIsImZpbGUiOiJnYXRld2F5LWludmVudG9yeS1jYWNoZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=