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
import { Observable } from 'rxjs';
import { PowerShellScripts } from '../../../generated/powershell-scripts';
import { ServerInventoryCache } from '../server-inventory/server-inventory-cache';
import { SharedCache } from '../shared-cache';
import { ClusterInventory } from './cluster-inventory';
/**
 * Cluster Inventory cache class.
 */
var ClusterInventoryCache = (function (_super) {
    __extends(ClusterInventoryCache, _super);
    /**
     * Initializes a new instance of the ClusterInventoryCache class.
     *
     * @param appContext the app context.
     * @param options the option of shared cache.
     */
    function ClusterInventoryCache(appContext, options) {
        var _this = _super.call(this, ClusterInventoryCache.uniqueId, ClusterInventoryCache.uniqueVersion, function (params) { return _this.dataInstanceId(params); }, function (instance) { return _this.dataSerialize(instance); }, function (serialized) { return _this.dataDeserialize(serialized); }, function (params) { return _this.dataQuery(params); }, options) || this;
        _this.appContext = appContext;
        _this.serverInventoryCache = new ServerInventoryCache(appContext);
        return _this;
    }
    /**
     * Defines how to identify the cache entry by params.
     *
     * @param params the server inventory query params.
     * @return {sting} the id string.
     */
    ClusterInventoryCache.prototype.dataInstanceId = function (params) {
        return params.name;
    };
    /**
     * Defines how to deserialize the class object from seralized data.
     *
     * @param serialized the serialized string;
     */
    ClusterInventoryCache.prototype.dataDeserialize = function (serialized) {
        var inventory = JSON.parse(serialized);
        return new ClusterInventory(inventory.clusterName, inventory);
    };
    /**
     * Defines how to serialize the class object to seralized data.
     *
     * @param instance the class instance.
     */
    ClusterInventoryCache.prototype.dataSerialize = function (instance) {
        // automatically stripped out class related data.
        return JSON.stringify(instance);
    };
    /**
     * Defines how to collect the cluster inventory data.
     *
     * @param params the server inventory query params.
     * @return {string} the Observable of ClusterInventory data.
     */
    ClusterInventoryCache.prototype.dataQuery = function (params) {
        var _this = this;
        var psSession = this.appContext.powerShell.createSession(params.name, null, params);
        return this.appContext.powerShell.run(psSession, PowerShellScripts.Get_ClusterInventory)
            .map(function (data) {
            var inventory = new ClusterInventory(params.name);
            if (!data || !data.results || data.results.length === 0) {
                return inventory;
            }
            var result = data.results[0];
            if (result.ErrorCode === 'MissingClusterCmdlets') {
                inventory.isClusterCmdletAvailableForAllNodes = false;
                return inventory;
            }
            inventory.fullyQualifiedDomainName = result.fqdn;
            if (!result.nodeMap) {
                return inventory;
            }
            inventory.nodeMap = result.nodeMap;
            inventory.nodeNames = Object.keys(inventory.nodeMap);
            inventory.nodes = inventory.nodeNames.map(function (name) { return inventory.nodeMap[name]; });
            return inventory;
        })
            .flatMap(function (inventory) { return _this.queryClusterNodeInventories(inventory, params); });
    };
    /**
     * Defines how to collect the cluster node-server inventory data.
     * @param inventory  the initial cluster inventory query params.
     * @param params the server inventory query params.
     * @return {string} the Observable of ClusterInventory data.
     */
    ClusterInventoryCache.prototype.queryClusterNodeInventories = function (inventory, params) {
        var _this = this;
        if (!inventory.nodes || inventory.nodes.length === 0) {
            return Observable.of(inventory);
        }
        var observables = inventory.nodes.map(function (node) {
            var queryParams = Object.assign({}, params, { name: node.fqdn });
            return _this.serverInventoryCache.query(queryParams);
        });
        return Observable
            .forkJoin(observables)
            .map(function (inventories) {
            inventories.forEach(function (serverInventory) {
                if (!inventory.nodeMap[serverInventory.instance.name]) {
                    // Something is horribly wrong. Log telemetry and skip
                    return;
                }
                inventory.nodeMap[serverInventory.instance.name].inventory = serverInventory.instance;
            });
            return inventory;
        });
    };
    return ClusterInventoryCache;
}(SharedCache));
export { ClusterInventoryCache };
ClusterInventoryCache.uniqueId = '@msft-sme/shell:clusterInventory';
ClusterInventoryCache.uniqueVersion = 0; // invrement this if you make breaking changes
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL2NsdXN0ZXItaW52ZW50b3J5L2NsdXN0ZXItaW52ZW50b3J5LWNhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRzFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxXQUFXLEVBQXNCLE1BQU0saUJBQWlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFnRCxNQUFNLHFCQUFxQixDQUFDO0FBRXJHOztHQUVHO0FBQ0g7SUFBMkMseUNBQTJFO0lBTWxIOzs7OztPQUtHO0lBQ0gsK0JBQW9CLFVBQXNCLEVBQUUsT0FBNEI7UUFBeEUsWUFDSSxrQkFDSSxxQkFBcUIsQ0FBQyxRQUFRLEVBQzlCLHFCQUFxQixDQUFDLGFBQWEsRUFDbkMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUEzQixDQUEyQixFQUN2QyxVQUFDLFFBQVEsSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQTVCLENBQTRCLEVBQzFDLFVBQUMsVUFBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBaEMsQ0FBZ0MsRUFDaEQsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUF0QixDQUFzQixFQUNsQyxPQUFPLENBQUMsU0FHZjtRQVhtQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTtRQVV0QyxLQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7SUFDckUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssOENBQWMsR0FBdEIsVUFBdUIsTUFB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SSxXQUFXLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ3RDLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNqRSxNQUFNLENBQUMsS0FBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxVQUFVO2FBQ1osUUFBUSxDQUFDLFdBQVcsQ0FBQzthQUNyQixHQUFHLENBQUMsVUFBQSxXQUFXO1lBQ1osV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLGVBQWU7Z0JBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsc0RBQXNEO29CQUN0RCxNQUFNLENBQUM7Z0JBQ1gsQ0FBQztnQkFDRCxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUM7WUFDMUYsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNMLDRCQUFDO0FBQUQsQ0F6SEEsQUF5SEMsQ0F6SDBDLFdBQVc7O0FBQ25DLDhCQUFRLEdBQUcsa0NBQWtDLENBQUM7QUFDOUMsbUNBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyw4Q0FBOEMiLCJmaWxlIjoiY2x1c3Rlci1pbnZlbnRvcnktY2FjaGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9