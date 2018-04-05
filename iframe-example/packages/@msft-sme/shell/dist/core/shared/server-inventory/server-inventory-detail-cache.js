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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Observable } from 'rxjs';
import { PowerShellScripts } from '../../../generated/powershell-scripts';
import { Cim } from '../../data/cim';
import { SharedCache } from '../shared-cache';
import { ServerInventoryDetail } from './server-inventory-detail';
/**
 * Server Inventory cache class.
 */
var ServerInventoryDetailCache = /** @class */ (function (_super) {
    __extends(ServerInventoryDetailCache, _super);
    /**
     * Initializes a new instance of the ServerInventoryCache class.
     *
     * @param appContext the app context.
     * @param options the option of shared cache.
     */
    function ServerInventoryDetailCache(appContext, options) {
        var _this = _super.call(this, ServerInventoryDetailCache.uniqueId, ServerInventoryDetailCache.uniqueVersion, function (params) { return _this.dataInstanceId(params); }, function (instance) { return _this.dataSerialize(instance); }, function (serialized) { return _this.dataDeserialize(serialized); }, function (params) { return _this.dataQuery(params); }, options) || this;
        _this.appContext = appContext;
        return _this;
    }
    /**
     * Defines how to collect the server inventory data.
     *
     * @param params the server inventory detail query params.
     * @return {string} the Observable of ServerInventoryDetail data.
     */
    ServerInventoryDetailCache.prototype.dataQuery = function (params) {
        // query parallel...
        return Observable.zip(this.appContext.cim.getInstanceMultiple(params.name, Cim.namespace.cimV2, Cim.cimClass.win32Processor, __assign({}, params, { powerShellCommand: PowerShellScripts.Get_CimWin32Processor.command })), this.appContext.cim.getInstanceMultiple(params.name, Cim.namespace.cimV2, Cim.cimClass.win32PhysicalMemory, __assign({}, params, { powerShellCommand: PowerShellScripts.Get_CimWin32PhysicalMemory.command })), this.appContext.cim.getInstanceMultiple(params.name, Cim.namespace.cimV2, Cim.cimClass.win32LogicalDisks, __assign({}, params, { powerShellCommand: PowerShellScripts.Get_CimWin32LogicalDisk.command })), this.appContext.cim.getInstanceMultiple(params.name, Cim.namespace.cimV2, Cim.cimClass.win32NetworkAdapter, __assign({}, params, { powerShellCommand: PowerShellScripts.Get_CimWin32NetworkAdapter.command })))
            .map(function (_a) {
            var processors = _a[0], memory = _a[1], disks = _a[2], adapters = _a[3];
            var inventory = new ServerInventoryDetail(params.name);
            // Processors
            if (processors && processors.value) {
                for (var _i = 0, _b = processors.value; _i < _b.length; _i++) {
                    var item = _b[_i];
                    inventory.processors.push(item.properties.name);
                }
            }
            // Memory
            if (memory && memory.value) {
                for (var _c = 0, _d = memory.value; _c < _d.length; _c++) {
                    var item = _d[_c];
                    inventory.totalMemory += item.properties.capacity;
                }
            }
            // DiskSpace
            if (disks && disks.value) {
                for (var _e = 0, _f = disks.value; _e < _f.length; _e++) {
                    var item = _f[_e];
                    inventory.totalDisk += item.properties.size;
                    inventory.totalFreeDiskSpace += item.properties.freeSpace;
                }
            }
            // Network adapters
            if (adapters && adapters.value) {
                var count = 0;
                for (var _g = 0, _h = adapters.value; _g < _h.length; _g++) {
                    var item = _h[_g];
                    if (item.properties.physicalAdapter === true) {
                        count++;
                    }
                }
                inventory.totalPhysicalNics = count;
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
    ServerInventoryDetailCache.prototype.dataInstanceId = function (params) {
        return params.name;
    };
    /**
     * Defines how to deserialize the class object from seralized data.
     *
     * @param serialized the serialized string;
     */
    ServerInventoryDetailCache.prototype.dataDeserialize = function (serialized) {
        var inventory = JSON.parse(serialized);
        return new ServerInventoryDetail(inventory.serverName, inventory);
    };
    /**
     * Defines how to serialize the class object to seralized data.
     *
     * @param instance the class instance.
     */
    ServerInventoryDetailCache.prototype.dataSerialize = function (instance) {
        // automatically stripped out class related data.
        return JSON.stringify(instance);
    };
    ServerInventoryDetailCache.uniqueId = '@msft-sme/shell:serverInventoryDetail';
    ServerInventoryDetailCache.uniqueVersion = 1;
    return ServerInventoryDetailCache;
}(SharedCache));
export { ServerInventoryDetailCache };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL3NlcnZlci1pbnZlbnRvcnkvc2VydmVyLWludmVudG9yeS1kZXRhaWwtY2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUUxRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLFdBQVcsRUFBc0IsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQTBELE1BQU0sMkJBQTJCLENBQUM7QUFFMUg7O0dBRUc7QUFDSDtJQUFnRCw4Q0FBMEY7SUFJdEk7Ozs7O09BS0c7SUFDSCxvQ0FBb0IsVUFBc0IsRUFBRSxPQUE0QjtRQUF4RSxZQUNJLGtCQUNJLDBCQUEwQixDQUFDLFFBQVEsRUFDbkMsMEJBQTBCLENBQUMsYUFBYSxFQUN4QyxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQTNCLENBQTJCLEVBQ3ZDLFVBQUMsUUFBUSxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBNUIsQ0FBNEIsRUFDMUMsVUFBQyxVQUFVLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxFQUFoQyxDQUFnQyxFQUNoRCxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQXRCLENBQXNCLEVBQ2xDLE9BQU8sQ0FBQyxTQUNmO1FBVG1CLGdCQUFVLEdBQVYsVUFBVSxDQUFZOztJQVMxQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyw4Q0FBUyxHQUFqQixVQUFrQixNQUFtQztRQUNqRCxvQkFBb0I7UUFDcEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENB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