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
var ServerInventoryCache = /** @class */ (function (_super) {
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
                inventory.name = operatingSystem.csName ? operatingSystem.csName.toString().toLowerCase() : null;
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
                inventory.isManagementToolsAvailable = result.isManagementToolsAvailable;
                inventory.isServerManagerAvailable = result.isServerManagerAvailable;
                inventory.isTsdbEnabled = result.isTsdbEnabled;
                inventory.isHyperVRoleInstalled = result.isHyperVRoleInstalled;
                inventory.isHyperVPowershellInstalled = result.isHyperVPowershellInstalled;
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
    ServerInventoryCache.uniqueId = '@msft-sme/shell:serverInventory';
    ServerInventoryCache.uniqueVersion = 11;
    return ServerInventoryCache;
}(SharedCache));
export { ServerInventoryCache };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL3NlcnZlci1pbnZlbnRvcnkvc2VydmVyLWludmVudG9yeS1jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFHMUUsT0FBTyxFQUFFLFdBQVcsRUFBc0IsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUE4QyxNQUFNLG9CQUFvQixDQUFDO0FBRWpHOztHQUVHO0FBQ0g7SUFBMEMsd0NBQXdFO0lBSTlHOzs7OztPQUtHO0lBQ0gsOEJBQW9CLFVBQXNCLEVBQUUsT0FBNEI7UUFBeEUsWUFDSSxrQkFDSSxvQkFBb0IsQ0FBQyxRQUFRLEVBQzdCLG9CQUFvQixDQUFDLGFBQWEsRUFDbEMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUEzQixDQUEyQixFQUN2QyxVQUFDLFFBQVEsSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQTVCLENBQTRCLEVBQzFDLFVBQUMsVUFBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBaEMsQ0FBZ0MsRUFDaEQsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUF0QixDQUFzQixFQUNsQyxPQUFPLENBQUMsU0FDZjtRQVRtQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7SUFTMUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssd0NBQVMsR0FBakIsVUFBa0IsTUFBNkI7UUFDM0MsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUs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QWUsR0FBdkIsVUFBd0IsVUFBa0I7UUFDdEMsSUFBTSxTQUFTLEdBQXdCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUQsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyw0Q0FBYSxHQUFyQixVQUFzQixRQUF5QjtRQUMzQyxpREFBaUQ7UUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQWhHYyw2QkFBUSxHQUFHLGlDQUFpQyxDQUFDO0lBQzdDLGtDQUFhLEdBQUcsRUFBRSxDQUFDO0lBZ0d0QywyQkFBQztDQWxHRCxBQWtHQyxDQWxHeUMsV0FBVyxHQWtHcEQ7U0FsR1ksb0JBQW9CIiwiZmlsZSI6InNlcnZlci1pbnZlbnRvcnktY2FjaGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9