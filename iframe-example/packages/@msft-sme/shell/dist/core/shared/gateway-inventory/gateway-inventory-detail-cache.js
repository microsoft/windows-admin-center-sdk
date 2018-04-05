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
import { GatewayInventoryDetail } from './gateway-inventory-detail';
/**
 * Gateway Inventory Detail cache class.
 */
var GatewayInventoryDetailCache = /** @class */ (function (_super) {
    __extends(GatewayInventoryDetailCache, _super);
    /**
     * Initializes a new instance of the GatewayInventoryCache class.
     *
     * @param appContext the app context.
     * @param options the option of shared cache.
     */
    function GatewayInventoryDetailCache(appContext, options) {
        var _this = _super.call(this, GatewayInventoryDetailCache.uniqueId, GatewayInventoryDetailCache.uniqueVersion, function (params) { return _this.dataInstanceId(params); }, function (instance) { return _this.dataSerialize(instance); }, function (serialized) { return _this.dataDeserialize(serialized); }, function (params) { return _this.dataQuery(params); }, options) || this;
        _this.appContext = appContext;
        return _this;
    }
    /**
     * Defines how to collect the gateway inventory detail data.
     *
     * @param params the gateway inventory detail query params.
     * @return {string} the Observable of GatewayInventoryDetail data.
     */
    GatewayInventoryDetailCache.prototype.dataQuery = function (params) {
        return this.appContext.gateway.get('gateway/latestversion')
            .map(function (versionDetail) {
            var inventoryDetail = new GatewayInventoryDetail();
            if (versionDetail) {
                inventoryDetail.latestVersion =
                    versionDetail.destinationUrl.substring(versionDetail.destinationUrl.lastIndexOf('/') + 1);
            }
            else {
                inventoryDetail.latestVersion = null;
            }
            return inventoryDetail;
        });
    };
    /**
     * Defines how to identify the cache entry by params.
     *
     * @param params the gateway inventory detail query params.
     * @return {string} the id string.
     */
    GatewayInventoryDetailCache.prototype.dataInstanceId = function (params) {
        return GatewayInventoryDetailCache.gatewayName;
    };
    /**
     * Defines how to deserialize the class object from seralized data.
     *
     * @param serialized the serialized string;
     */
    GatewayInventoryDetailCache.prototype.dataDeserialize = function (serialized) {
        var inventory = JSON.parse(serialized);
        return new GatewayInventoryDetail(inventory);
    };
    /**
     * Defines how to serialize the class object to seralized data.
     *
     * @param instance the class instance.
     */
    GatewayInventoryDetailCache.prototype.dataSerialize = function (instance) {
        // automatically strip out class related data.
        return JSON.stringify(instance);
    };
    GatewayInventoryDetailCache.uniqueId = '@msft-sme/shell:gatewayInventoryDetail';
    GatewayInventoryDetailCache.uniqueVersion = 1;
    GatewayInventoryDetailCache.gatewayName = 'gateway';
    return GatewayInventoryDetailCache;
}(SharedCache));
export { GatewayInventoryDetailCache };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL2dhdGV3YXktaW52ZW50b3J5L2dhdGV3YXktaW52ZW50b3J5LWRldGFpbC1jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUEsT0FBTyxFQUFFLFdBQVcsRUFBc0IsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQTRELE1BQU0sNEJBQTRCLENBQUM7QUFFOUg7O0dBRUc7QUFDSDtJQUNJLCtDQUE2RjtJQUs3Rjs7Ozs7T0FLRztJQUNILHFDQUFvQixVQUFzQixFQUFFLE9BQTRCO1FBQXhFLFlBQ0ksa0JBQ0ksMkJBQTJCLENBQUMsUUFBUSxFQUNwQywyQkFBMkIsQ0FBQyxhQUFhLEVBQ3pDLFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBM0IsQ0FBMkIsRUFDdkMsVUFBQyxRQUFRLElBQUssT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUE1QixDQUE0QixFQUMxQyxVQUFDLFVBQVUsSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQWhDLENBQWdDLEVBQ2hELFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBdEIsQ0FBc0IsRUFDbEMsT0FBTyxDQUFDLFNBQ2Y7UUFUbUIsZ0JBQVUsR0FBVixVQUFVLENBQVk7O0lBUzFDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLCtDQUFTLEdBQWpCLFVBQWtCLE1BQW9DO1FBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDdEQsR0FBRyxDQUFDLFVBQUMsYUFBa0I7WUFDcEIsSUFBSSxlQUFlLEdBQUcsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1lBRW5ELEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLGVBQWUsQ0FBQyxhQUFhO29CQUN6QixhQUFhLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsRyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osZUFBZSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDekMsQ0FBQztZQUVELE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxvREFBYyxHQUF0QixVQUF1QixNQUFvQztRQUN2RCxNQUFNLENBQUMsMkJBQTJCLENBQUMsV0FBVyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7OztPQUlHO0lBQ0sscURBQWUsR0FBdkIsVUFBd0IsVUFBa0I7UUFDdEMsSUFBSSxTQUFTLEdBQStCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkUsTUFBTSxDQUFDLElBQUksc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxtREFBYSxHQUFyQixVQUFzQixRQUFnQztRQUNsRCw4Q0FBOEM7UUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQXZFYyxvQ0FBUSxHQUFHLHdDQUF3QyxDQUFDO0lBQ3BELHlDQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLHVDQUFXLEdBQUcsU0FBUyxDQUFDO0lBc0UzQyxrQ0FBQztDQTFFRCxBQTBFQyxDQXpFRyxXQUFXLEdBeUVkO1NBMUVZLDJCQUEyQiIsImZpbGUiOiJnYXRld2F5LWludmVudG9yeS1kZXRhaWwtY2FjaGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9