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
import { ClusterNodeInventory } from './cluster-node-inventory';
/**
 * Cluster Inventory cache class.
 */
var ClusterInventoryCache = /** @class */ (function (_super) {
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
        var clusterPsSession = this.appContext.powerShell.createSession(params.name, null, params);
        var clusterNodePsSession = this.appContext.powerShell.createSession(params.name, null, params);
        return Observable.zip(this.appContext.powerShell.run(clusterPsSession, PowerShellScripts.Get_ClusterInventory), this.appContext.powerShell.run(clusterNodePsSession, PowerShellScripts.Get_ClusterNodes))
            .map(function (_a) {
            var cluster = _a[0], nodes = _a[1];
            var inventory = new ClusterInventory(params.name);
            if (!cluster || !cluster.results || cluster.results.length === 0) {
                return inventory;
            }
            if (!nodes || !nodes.results || nodes.results.length === 0) {
                return inventory;
            }
            var nodesResult = nodes.results[0];
            var clusterResult = cluster.results[0];
            inventory.isClusterCmdletAvailable = clusterResult.isClusterCmdletAvailable;
            inventory.fqdn = clusterResult.fqdn;
            inventory.currentClusterNode = clusterResult.currentClusterNode;
            inventory.nodeNames = [];
            for (var node in nodesResult) {
                if (node && nodesResult[node] && nodesResult[node].name) {
                    inventory.nodeNames.push(nodesResult[node].name);
                }
            }
            inventory.isS2dEnabled = clusterResult.isS2DEnabled;
            inventory.isBritannicaEnabled = clusterResult.isBritannicaEnabled;
            inventory.isClusterHealthCmdletAvailable = clusterResult.isClusterHealthCmdletAvailable;
            inventory.isHyperVPowershellInstalled = false;
            inventory.isHyperVRoleInstalled = false;
            inventory.isManagementToolsAvailable = false;
            inventory.isTsdbEnabled = false;
            inventory.nodeMap = {};
            inventory.nodeMap = nodesResult;
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
        if (!inventory.nodeNames || inventory.nodeNames.length === 0) {
            return Observable.of(inventory);
        }
        var observables = inventory.nodeNames.map(function (name) {
            return _this.serverInventoryCache.query({ name: inventory.nodeMap[name].fullyQualifiedDomainName });
        });
        return Observable
            .forkJoin(observables)
            .map(function (inventories) {
            inventories.forEach(function (serverInventory) {
                var serverName = serverInventory.instance.name.toLocaleLowerCase();
                if (serverName === inventory.currentClusterNode.toLocaleLowerCase()) {
                    inventory.isHyperVPowershellInstalled = serverInventory.instance.isHyperVPowershellInstalled;
                    inventory.isHyperVRoleInstalled = serverInventory.instance.isHyperVRoleInstalled;
                    inventory.isManagementToolsAvailable = serverInventory.instance.isManagementToolsAvailable;
                    inventory.isTsdbEnabled = serverInventory.instance.isTsdbEnabled;
                }
                // combine inventory node map and server inventory data
                var clusterNodeInventory = new ClusterNodeInventory(serverName);
                Object.assign(clusterNodeInventory, serverInventory.instance);
                var nodeMap = inventory.nodeMap[serverName];
                for (var key in nodeMap) {
                    if (key) {
                        clusterNodeInventory[key] = nodeMap[key];
                    }
                }
                inventory.nodeMap[serverName] = clusterNodeInventory;
            });
            return inventory;
        });
    };
    ClusterInventoryCache.uniqueId = '@msft-sme/shell:clusterInventory';
    ClusterInventoryCache.uniqueVersion = 1; // increment this if you make breaking changes
    return ClusterInventoryCache;
}(SharedCache));
export { ClusterInventoryCache };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL2NsdXN0ZXItaW52ZW50b3J5L2NsdXN0ZXItaW52ZW50b3J5LWNhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRzFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxXQUFXLEVBQXNCLE1BQU0saUJBQWlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFnRCxNQUFNLHFCQUFxQixDQUFDO0FBQ3JHLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhFOztHQUVHO0FBQ0g7SUFBMkMseUNBQTJFO0lBTWxIOzs7OztPQUtHO0lBQ0gsK0JBQW9CLFVBQXNCLEVBQUUsT0FBNEI7UUFBeEUsWUFDSSxrQkFDSSxxQkFBcUIsQ0FBQyxRQUFRLEVBQzlCLHFCQUFxQixDQUFDLGFBQWEsRUFDbkMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUEzQixDQUEyQixFQUN2QyxVQUFDLFFBQVEsSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQTVCLENBQTRCLEVBQzFDLFVBQUMsVUFBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBaEMsQ0FBZ0MsRUFDaEQsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUF0QixDQUFzQixFQUNsQyxPQUFPLENBQUMsU0FHZjtRQVhtQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTtRQVV0QyxLQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7SUFDckUs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QU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUM7UUFDdkcsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsVUFBVTthQUNaLFFBQVEsQ0FBQyxXQUFXLENBQUM7YUFDckIsR0FBRyxDQUFDLFVBQUEsV0FBVztZQUNaLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxlQUFlO2dCQUMvQixJQUFNLFVBQVUsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUNyRSxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNsRSxTQUFTLENBQUMsMkJBQTJCLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQztvQkFDN0YsU0FBUyxDQUFDLHFCQUFxQixHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUM7b0JBQ2pGLFNBQVMsQ0FBQywwQkFBMEIsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDO29CQUMzRixTQUFTLENBQUMsYUFBYSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO2dCQUNyRSxDQUFDO2dCQUVELHVEQUF1RDtnQkFDdkQsSUFBSSxvQkFBb0IsR0FBeUIsSUFBSSxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDdEYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzlELElBQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzlDLEdBQUcsQ0FBQyxDQUFDLElBQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ04sb0JBQW9CLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM3QyxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxvQkFBb0IsQ0FBQztZQUN6RCxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBcEpjLDhCQUFRLEdBQUcsa0NBQWtDLENBQUM7SUFDOUMsbUNBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyw4Q0FBOEM7SUFvSnBGLDRCQUFDO0NBdEpELEFBc0pDLENBdEowQyxXQUFXLEdBc0pyRDtTQXRKWSxxQkFBcUIiLCJmaWxlIjoiY2x1c3Rlci1pbnZlbnRvcnktY2FjaGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9