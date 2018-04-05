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
import { PowerShellScripts } from '../../../generated/powershell-scripts';
import { SharedCache } from '../shared-cache';
import { ServerInventory } from './server-inventory';
/**
 * Server Inventory cache class.
 */
var ServerInventoryCache = (function (_super) {
    __extends(ServerInventoryCache, _super);
    /**
     * Initializes a new instance of the ServerInventoryCache class.
     *
     * @param appContext the app context.
     * @param options the option of shared cache.
     */
    function ServerInventoryCache(appContext, options) {
        var _this = _super.call(this, ServerInventoryCache.uniqueId, ServerInventoryCache.uniqueVersion, function (params) { return _this.dataInstanceId(params); }, function (instance) { return _this.dataSerialize(instance); }, function (serialized) { return _this.dataDeserialize(serialized); }, function (params) { return _this.dataQuery(params); }, options) || this;
        _this.appContext = appContext;
        return _this;
    }
    /**
     * Defines how to collect the server inventory data.
     *
     * @param params the server inventory query params.
     * @return {string} the Observable of ServerInventory data.
     */
    ServerInventoryCache.prototype.dataQuery = function (params) {
        var psSession = this.appContext.powerShell.createSession(params.name, null, params);
        return this.appContext.powerShell.run(psSession, PowerShellScripts.Get_ServerInventory)
            .map(function (data) {
            var inventory = new ServerInventory(params.name);
            if (data && data.results && data.results.length > 0) {
                var result = data.results[0];
                var operatingSystem = result.operatingSystem;
                var computerSystem = result.computerSystem;
                inventory.isAdministrator = result.isAdministrator;
                inventory.isWmfInstalled = result.isWmfInstalled;
                inventory.name = operatingSystem.csName;
                inventory.operatingSystemName = operatingSystem.caption;
                inventory.operatingSystemSKU = operatingSystem.operatingSystemSKU;
                inventory.operatingSystemVersion = operatingSystem.version;
                inventory.productType = operatingSystem.productType;
                inventory.totalPhysicalMemory = computerSystem.totalPhysicalMemory;
                inventory.domainRole = computerSystem.domainRole;
                inventory.computerManufacturer = computerSystem.manufacturer;
                inventory.computerModel = computerSystem.model;
                inventory.totalLogicalProcessors = computerSystem.numberOfLogicalProcessors;
                if (computerSystem.partOfDomain) {
                    inventory.domainName = computerSystem.domain;
                }
                else {
                    inventory.workgroupName = computerSystem.workgroup;
                }
                inventory.fullyQualifiedDomainName = result.fqdn;
                inventory.clusterFqdn = result.clusterFqdn;
                inventory.isCluster = result.isCluster;
                inventory.isClusterCmdletAvailable = result.isClusterCmdletAvailable;
                inventory.isClusterHealthCmdletAvailable = result.isClusterHealthCmdletAvailable;
                inventory.isManagementToolsAvailable = result.isManagementToolsAvailable;
                inventory.isServerManagerAvailable = result.isServerManagerAvailable;
                inventory.clusterNodesMap = result.clusterNodesMap;
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
    ServerInventoryCache.prototype.dataInstanceId = function (params) {
        return params.name;
    };
    /**
     * Defines how to deserialize the class object from seralized data.
     *
     * @param serialized the serialized string;
     */
    ServerInventoryCache.prototype.dataDeserialize = function (serialized) {
        var inventory = JSON.parse(serialized);
        return new ServerInventory(inventory.serverName, inventory);
    };
    /**
     * Defines how to serialize the class object to seralized data.
     *
     * @param instance the class instance.
     */
    ServerInventoryCache.prototype.dataSerialize = function (instance) {
        // automatically stripped out class related data.
        return JSON.stringify(instance);
    };
    return ServerInventoryCache;
}(SharedCache));
export { ServerInventoryCache };
ServerInventoryCache.uniqueId = '@msft-sme/shell:serverInventory';
ServerInventoryCache.uniqueVersion = 10;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL3NlcnZlci1pbnZlbnRvcnkvc2VydmVyLWludmVudG9yeS1jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFHMUUsT0FBTyxFQUFFLFdBQVcsRUFBc0IsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUE4QyxNQUFNLG9CQUFvQixDQUFDO0FBRWpHOztHQUVHO0FBQ0g7SUFBMEMsd0NBQXdFO0lBSTlHOzs7OztPQUtHO0lBQ0gsOEJBQW9CLFVBQXNCLEVBQUUsT0FBNEI7UUFBeEUsWUFDSSxrQkFDSSxvQkFBb0IsQ0FBQyxRQUFRLEVBQzdCLG9CQUFvQixDQUFDLGFBQWEsRUFDbEMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUEzQixDQUEyQixFQUN2QyxVQUFDLFFBQVEsSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQTVCLENBQTRCLEVBQzFDLFVBQUMsVUFBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBaEMsQ0FBZ0MsRUFDaEQsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUF0QixDQUFzQixFQUNsQyxPQUFPLENBQUMsU0FDZjtRQVRtQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7SUFTMUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssd0NBQVMsR0FBakIsVUFBa0IsTUFBNkI7UUFDM0MsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDO2FBQ2xGLEdBQUcsQ0FBQyxVQUFDLElBQVM7WUFDWCxJQUFNLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQztnQkFDL0MsSUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQztnQkFDN0MsU0FBUyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO2dCQUNuRCxTQUFTLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7Z0JBQ2pELFNBQVMsQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQztnQkFDeEMsU0FBUyxDQUFDLG1CQUFtQixHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUM7Z0JBQ3hELFNBQVMsQ0FBQyxrQkFBa0IsR0FBRyxlQUFlLENBQUMsa0JBQWtCLENBQUM7Z0JBQ2xFLFNBQVMsQ0FBQyxzQkFBc0IsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDO2dCQUMzRCxTQUFTLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQyxXQUFXLENBQUM7Z0JBRXBELFNBQVMsQ0FBQyxtQkFBbUIsR0FBRyxjQUFjLENBQUMsbUJBQW1CLENBQUM7Z0JBQ25FLFNBQVMsQ0FBQyxVQUFVLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQztnQkFDakQsU0FBUyxDQUFDLG9CQUFvQixHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7Z0JBQzdELFNBQVMsQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztnQkFDL0MsU0FBUyxDQUFDLHNCQUFzQixHQUFHLGNBQWMsQ0FBQyx5QkFBeUIsQ0FBQztnQkFDNUUsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQzlCLFNBQVMsQ0FBQyxVQUFVLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztnQkFDakQsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixTQUFTLENBQUMsYUFBYSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3ZELENBQUM7Z0JBRUQsU0FBUyxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2pELFNBQVMsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDM0MsU0FBUyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUN2QyxTQUFTLENBQUMsd0JBQXdCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDO2dCQUNyRSxTQUFTLENBQUMsOEJBQThCLEdBQUcsTUFBTSxDQUFDLDhCQUE4QixDQUFDO2dCQUNqRixTQUFTLENBQUMsMEJBQTBCLEdBQUcsTUFBTSxDQUFDLDBCQUEwQixDQUFDO2dCQUN6RSxTQUFTLENBQUMsd0JBQXdCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDO2dCQUNyRSxTQUFTLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7WUFDdkQsQ0FBQztZQUVELE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyw2Q0FBYyxHQUF0QixVQUF1QixNQUE2QjtRQUNoRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLDhDQUFlLEdBQXZCLFVBQXdCLFVBQWtCO1FBQ3RDLElBQU0sU0FBUyxHQUF3QixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssNENBQWEsR0FBckIsVUFBc0IsUUFBeUI7UUFDM0MsaURBQWlEO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDTCwyQkFBQztBQUFELENBbEdBLEFBa0dDLENBbEd5QyxXQUFXOztBQUNsQyw2QkFBUSxHQUFHLGlDQUFpQyxDQUFDO0FBQzdDLGtDQUFhLEdBQUcsRUFBRSxDQUFDIiwiZmlsZSI6InNlcnZlci1pbnZlbnRvcnktY2FjaGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9