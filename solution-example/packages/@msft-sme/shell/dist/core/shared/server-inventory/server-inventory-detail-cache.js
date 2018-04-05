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
import { Cim } from '../../data/cim';
import { SharedCache } from '../shared-cache';
import { ServerInventoryDetail } from './server-inventory-detail';
/**
 * Server Inventory cache class.
 */
var ServerInventoryDetailCache = (function (_super) {
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
        return Observable.zip(this.appContext.cim.getInstanceMultiple(params.name, Cim.namespace.cimV2, Cim.cimClass.win32Processor, params), this.appContext.cim.getInstanceMultiple(params.name, Cim.namespace.cimV2, Cim.cimClass.win32PhysicalMemory, params), this.appContext.cim.getInstanceMultiple(params.name, Cim.namespace.cimV2, Cim.cimClass.win32LogicaiDisks, params), this.appContext.cim.getInstanceMultiple(params.name, Cim.namespace.cimV2, Cim.cimClass.win32NetworkAdapter, params))
            .map(function (_a) {
            var processors = _a[0], memory = _a[1], disks = _a[2], adapters = _a[3];
            var inventory = new ServerInventoryDetail(params.name);
            // Processors
            if (processors.value) {
                for (var _i = 0, _b = processors.value; _i < _b.length; _i++) {
                    var item = _b[_i];
                    inventory.processors.push(item.properties.name);
                }
            }
            // Memory
            if (memory.value) {
                for (var _c = 0, _d = memory.value; _c < _d.length; _c++) {
                    var item = _d[_c];
                    inventory.totalMemory += item.properties.capacity;
                }
            }
            // DiskSpace
            if (disks.value) {
                for (var _e = 0, _f = disks.value; _e < _f.length; _e++) {
                    var item = _f[_e];
                    inventory.totalDisk += item.properties.size;
                    inventory.totalFreeDiskSpace += item.properties.freeSpace;
                }
            }
            // Network adapters
            if (adapters.value) {
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
    return ServerInventoryDetailCache;
}(SharedCache));
export { ServerInventoryDetailCache };
ServerInventoryDetailCache.uniqueId = '@msft-sme/shell:serverInventoryDetail';
ServerInventoryDetailCache.uniqueVersion = 1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL3NlcnZlci1pbnZlbnRvcnkvc2VydmVyLWludmVudG9yeS1kZXRhaWwtY2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxXQUFXLEVBQXNCLE1BQU0saUJBQWlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUEwRCxNQUFNLDJCQUEyQixDQUFDO0FBRTFIOztHQUVHO0FBQ0g7SUFBZ0QsOENBQTBGO0lBSXRJOzs7OztPQUtHO0lBQ0gsb0NBQW9CLFVBQXNCLEVBQUUsT0FBNEI7UUFBeEUsWUFDSSxrQkFDSSwwQkFBMEIsQ0FBQyxRQUFRLEVBQ25DLDBCQUEwQixDQUFDLGFBQWEsRUFDeEMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUEzQixDQUEyQixFQUN2QyxVQUFDLFFBQVEsSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQTVCLENBQTRCLEVBQzFDLFVBQUMsVUFBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBaEMsQ0FBZ0MsRUFDaEQsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUF0QixDQUFzQixFQUNsQyxPQUFPLENBQUMsU0FDZjtRQVRtQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7SUFTMUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssOENBQVMsR0FBakIsVUFBa0IsTUFBbUM7UUFDakQsb0JBQW9CO1FBQ3BCLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENB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Q0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssbURBQWMsR0FBdEIsVUFBdUIsTUFBbUM7UUFDdEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxvREFBZSxHQUF2QixVQUF3QixVQUFrQjtRQUN0QyxJQUFJLFNBQVMsR0FBOEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRSxNQUFNLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssa0RBQWEsR0FBckIsVUFBc0IsUUFBK0I7UUFDakQsaURBQWlEO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDTCxpQ0FBQztBQUFELENBeEdBLEFBd0dDLENBeEcrQyxXQUFXOztBQUN4QyxtQ0FBUSxHQUFHLHVDQUF1QyxDQUFDO0FBQ25ELHdDQUFhLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6InNlcnZlci1pbnZlbnRvcnktZGV0YWlsLWNhY2hlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==