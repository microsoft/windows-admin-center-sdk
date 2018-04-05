import { MediaConversion, MediaConversionBase } from '../../data/units';
/**
 * Server Inventory Detail class.
 */
var ServerInventoryDetail = (function () {
    /**
     * Initializes a new instance of the ServerInventory Class.
     *
     * @param serverName the server name to query.
     * @param data the server inventory recovered data.
     */
    function ServerInventoryDetail(serverName, data) {
        this.serverName = serverName;
        /**
         * The list of processor names.
         */
        this.processors = [];
        /**
         * The total memory capacity.
         */
        this.totalMemory = 0;
        /**
         * The total disk capacity.
         */
        this.totalDisk = 0;
        /**
         * The number of physical NICs.
         */
        this.totalPhysicalNics = 0;
        /**
         * The free disk space.
         */
        this.totalFreeDiskSpace = 0;
        if (data) {
            Object.assign(this, data);
        }
    }
    Object.defineProperty(ServerInventoryDetail.prototype, "processorsDisplayName", {
        /**
         * Gets display name of processors.
         */
        get: function () {
            return this.processors.join('\n');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerInventoryDetail.prototype, "totalMemoryDisplayName", {
        /**
         * Gets the display name of total memory capacity.
         */
        get: function () {
            return MediaConversion.getConvertedValue(this.totalMemory, MediaConversionBase.Binary);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerInventoryDetail.prototype, "totalDiskDisplayName", {
        /**
         * Gets the display name of total disk capacity.
         */
        get: function () {
            return MediaConversion.getConvertedValue(this.totalDisk, MediaConversionBase.Binary);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerInventoryDetail.prototype, "freeDiskDisplayName", {
        /**
         * Gets the display name of free space on disk.
         */
        get: function () {
            return MediaConversion.getConvertedValue(this.totalFreeDiskSpace, MediaConversionBase.Binary);
        },
        enumerable: true,
        configurable: true
    });
    return ServerInventoryDetail;
}());
export { ServerInventoryDetail };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL3NlcnZlci1pbnZlbnRvcnkvc2VydmVyLWludmVudG9yeS1kZXRhaWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBK0N4RTs7R0FFRztBQUNIO0lBK0JJOzs7OztPQUtHO0lBQ0gsK0JBQW1CLFVBQWtCLEVBQUUsSUFBZ0M7UUFBcEQsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQXBDckM7O1dBRUc7UUFDSSxlQUFVLEdBQWEsRUFBRSxDQUFDO1FBRWpDOztXQUVHO1FBQ0ksZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFFdkI7O1dBRUc7UUFDSSxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBT3JCOztXQUVHO1FBQ0ksc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBRTdCOztXQUVHO1FBQ0ksdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBUzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDO0lBQ0wsQ0FBQztJQUtELHNCQUFXLHdEQUFxQjtRQUhoQzs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBS0Qsc0JBQVcseURBQXNCO1FBSGpDOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0YsQ0FBQzs7O09BQUE7SUFLRCxzQkFBVyx1REFBb0I7UUFIL0I7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBRSxlQUFlLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRixDQUFDOzs7T0FBQTtJQUtELHNCQUFXLHNEQUFtQjtRQUg5Qjs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFFLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkcsQ0FBQzs7O09BQUE7SUFDTCw0QkFBQztBQUFELENBdEVBLEFBc0VDLElBQUEiLCJmaWxlIjoic2VydmVyLWludmVudG9yeS1kZXRhaWwuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9