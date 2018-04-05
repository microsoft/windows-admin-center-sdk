import { MediaConversion, MediaConversionBase } from '../../data/units';
/**
 * Windows Operating Systems
 */
export var WindowsOperatingSystem;
(function (WindowsOperatingSystem) {
    WindowsOperatingSystem[WindowsOperatingSystem["Windows10"] = 0] = "Windows10";
    WindowsOperatingSystem[WindowsOperatingSystem["WindowsServer2016"] = 1] = "WindowsServer2016";
    WindowsOperatingSystem[WindowsOperatingSystem["Windows8Point1"] = 2] = "Windows8Point1";
    WindowsOperatingSystem[WindowsOperatingSystem["WindowsServer2012R2"] = 3] = "WindowsServer2012R2";
    WindowsOperatingSystem[WindowsOperatingSystem["Windows8"] = 4] = "Windows8";
    WindowsOperatingSystem[WindowsOperatingSystem["WindowsServer2012"] = 5] = "WindowsServer2012";
    WindowsOperatingSystem[WindowsOperatingSystem["Windows7"] = 6] = "Windows7";
    WindowsOperatingSystem[WindowsOperatingSystem["WindowsServer2008R2"] = 7] = "WindowsServer2008R2";
    WindowsOperatingSystem[WindowsOperatingSystem["WindowsServer2008"] = 8] = "WindowsServer2008";
    WindowsOperatingSystem[WindowsOperatingSystem["WindowsVista"] = 9] = "WindowsVista";
    WindowsOperatingSystem[WindowsOperatingSystem["Legacy"] = 10] = "Legacy";
    WindowsOperatingSystem[WindowsOperatingSystem["Unknown"] = 11] = "Unknown";
})(WindowsOperatingSystem || (WindowsOperatingSystem = {}));
/**
 * Windows Product Types
 */
export var WindowsProductType;
(function (WindowsProductType) {
    WindowsProductType[WindowsProductType["Workstation"] = 1] = "Workstation";
    WindowsProductType[WindowsProductType["DomainController"] = 2] = "DomainController";
    WindowsProductType[WindowsProductType["Server"] = 3] = "Server";
})(WindowsProductType || (WindowsProductType = {}));
/**
 * Server Inventory class.
 */
var ServerInventory = (function () {
    /**
     * Initializes a new instance of the ServerInventory Class.
     *
     * @param serverName the server name to query.
     * @param data the server inventory recovered data.
     */
    function ServerInventory(serverName, data) {
        this.serverName = serverName;
        if (data) {
            Object.assign(this, data);
        }
    }
    Object.defineProperty(ServerInventory.prototype, "isNano", {
        /**
         * Gets the sku number indicating whether the computer is Nano server.
         *
         * @return boolean true if nano
         */
        get: function () {
            // given sku number is in nanoServerSkus array?
            return ServerInventory.nanoServerSkus.indexOf(this.operatingSystemSKU) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerInventory.prototype, "isServer", {
        /**
         * Gets a value indicating if this is a windows server
         *
         * @return boolean true if this is a server
         */
        get: function () {
            return this.productType === WindowsProductType.Server;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerInventory.prototype, "isClient", {
        /**
         * Gets a value indicating if this is a windows client
         *
         * @return boolean true if this is a client
         */
        get: function () {
            return this.productType === WindowsProductType.Workstation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerInventory.prototype, "isDomainController", {
        /**
         * Indicates whether the computer is domain controller or not.
         *
         * @return boolean true if domain controller
         */
        get: function () {
            // As per https://msdn.microsoft.com/en-us/library/windows/desktop/aa394102(v=vs.85)
            // domainRole of 4 or 5 means it's a domain controller.
            return (this.domainRole === 4 || this.domainRole === 5);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerInventory.prototype, "operatingSystemDisplayName", {
        /**
         * Gets the display name of operating system.
         */
        get: function () {
            return this.isNano ? ServerInventory.nanoDisplayFormat.format(this.operatingSystemName) : this.operatingSystemName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerInventory.prototype, "totalPhysicalMemoryDisplayName", {
        /**
         * Gets the display name of total physical memory.
         */
        get: function () {
            return MediaConversion.getConvertedValue(this.totalPhysicalMemory, MediaConversionBase.Binary);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerInventory.prototype, "operatingSystem", {
        /**
         * Gets the operating system enumb of the machine
         * see: https://msdn.microsoft.com/en-us/library/windows/desktop/ms724832(v=vs.85).aspx for operating system version mapping.
         */
        get: function () {
            if (!this.operatingSystemVersion) {
                return WindowsOperatingSystem.Unknown;
            }
            // windows 10 and server 2016
            // report anything newer as one of these options.
            if (this.operatingSystemVersion.indexOf('.') > 1) {
                // since . is more than 2 digits from the start of the screen we are going to assume its '10.', '11.', etc...
                return this.isServer
                    ? WindowsOperatingSystem.WindowsServer2016
                    : WindowsOperatingSystem.Windows10;
            }
            // windows 8.1 and server 2012r2
            if (this.operatingSystemVersion.startsWith('6.3')) {
                return this.isServer
                    ? WindowsOperatingSystem.WindowsServer2012R2
                    : WindowsOperatingSystem.Windows8Point1;
            }
            // windows 8 and server 2012
            if (this.operatingSystemVersion.startsWith('6.2')) {
                return this.isServer
                    ? WindowsOperatingSystem.WindowsServer2012
                    : WindowsOperatingSystem.Windows8;
            }
            // windows 7 and server 2008 R2
            if (this.operatingSystemVersion.startsWith('6.1')) {
                return this.isServer
                    ? WindowsOperatingSystem.WindowsServer2008R2
                    : WindowsOperatingSystem.Windows7;
            }
            // windows vista and server 2008
            if (this.operatingSystemVersion.startsWith('6.0')) {
                return this.isServer
                    ? WindowsOperatingSystem.WindowsServer2008
                    : WindowsOperatingSystem.WindowsVista;
            }
            // assume a legacy os that somehow was able to run powershell.(unlikely)
            return WindowsOperatingSystem.Legacy;
        },
        enumerable: true,
        configurable: true
    });
    return ServerInventory;
}());
export { ServerInventory };
ServerInventory.nanoDisplayFormat = '{0} Nano';
/*
 * OperatingSystemSKU: from https://msdn.microsoft.com/en-us/library/aa394239(v=vs.85).aspx
 *    PRODUCT_DATACENTER_NANO_SERVER (143)
 *       Windows Server Datacenter Edition (Nano Server installation)
 *    PRODUCT_STANDARD_NANO_SERVER (144)
 *       Windows Server Standard Edition (Nano Server installation)
 */
ServerInventory.nanoServerSkus = [143, 144];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL3NlcnZlci1pbnZlbnRvcnkvc2VydmVyLWludmVudG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsZUFBZSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFZeEU7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxzQkFhWDtBQWJELFdBQVksc0JBQXNCO0lBQzlCLDZFQUFTLENBQUE7SUFDVCw2RkFBaUIsQ0FBQTtJQUNqQix1RkFBYyxDQUFBO0lBQ2QsaUdBQW1CLENBQUE7SUFDbkIsMkVBQVEsQ0FBQTtJQUNSLDZGQUFpQixDQUFBO0lBQ2pCLDJFQUFRLENBQUE7SUFDUixpR0FBbUIsQ0FBQTtJQUNuQiw2RkFBaUIsQ0FBQTtJQUNqQixtRkFBWSxDQUFBO0lBQ1osd0VBQU0sQ0FBQTtJQUNOLDBFQUFPLENBQUE7QUFDWCxDQUFDLEVBYlcsc0JBQXNCLEtBQXRCLHNCQUFzQixRQWFqQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksa0JBSVg7QUFKRCxXQUFZLGtCQUFrQjtJQUMxQix5RUFBZSxDQUFBO0lBQ2YsbUZBQW9CLENBQUE7SUFDcEIsK0RBQVUsQ0FBQTtBQUNkLENBQUMsRUFKVyxrQkFBa0IsS0FBbEIsa0JBQWtCLFFBSTdCO0FBa0ZEOztHQUVHO0FBQ0g7SUEwSEk7Ozs7O09BS0c7SUFDSCx5QkFBbUIsVUFBa0IsRUFBRSxJQUEwQjtRQUE5QyxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDO0lBQ0wsQ0FBQztJQU9ELHNCQUFXLG1DQUFNO1FBTGpCOzs7O1dBSUc7YUFDSDtZQUNJLCtDQUErQztZQUMvQyxNQUFNLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEYsQ0FBQzs7O09BQUE7SUFPRCxzQkFBVyxxQ0FBUTtRQUxuQjs7OztXQUlHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7UUFDMUQsQ0FBQzs7O09BQUE7SUFPRCxzQkFBVyxxQ0FBUTtRQUxuQjs7OztXQUlHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7UUFDL0QsQ0FBQzs7O09BQUE7SUFPRCxzQkFBVywrQ0FBa0I7UUFMN0I7Ozs7V0FJRzthQUNIO1lBQ0ksb0ZBQW9GO1lBQ3BGLHVEQUF1RDtZQUN2RCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFBO1FBQzNELENBQUM7OztPQUFBO0lBS0Qsc0JBQVcsdURBQTBCO1FBSHJDOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUN2SCxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLDJEQUE4QjtRQUh6Qzs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkcsQ0FBQzs7O09BQUE7SUFNRCxzQkFBVyw0Q0FBZTtRQUoxQjs7O1dBR0c7YUFDSDtZQUVJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQztZQUMxQyxDQUFDO1lBRUQsNkJBQTZCO1lBQzdCLGlEQUFpRDtZQUNqRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLDZHQUE2RztnQkFDN0csTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO3NCQUNkLHNCQUFzQixDQUFDLGlCQUFpQjtzQkFDeEMsc0JBQXNCLENBQUMsU0FBUyxDQUFBO1lBQzFDLENBQUM7WUFFRCxnQ0FBZ0M7WUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUTtzQkFDZCxzQkFBc0IsQ0FBQyxtQkFBbUI7c0JBQzFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQTtZQUMvQyxDQUFDO1lBRUQsNEJBQTRCO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVE7c0JBQ2Qsc0JBQXNCLENBQUMsaUJBQWlCO3NCQUN4QyxzQkFBc0IsQ0FBQyxRQUFRLENBQUE7WUFDekMsQ0FBQztZQUVELCtCQUErQjtZQUMvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO3NCQUNkLHNCQUFzQixDQUFDLG1CQUFtQjtzQkFDMUMsc0JBQXNCLENBQUMsUUFBUSxDQUFBO1lBQ3pDLENBQUM7WUFFRCxnQ0FBZ0M7WUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUTtzQkFDZCxzQkFBc0IsQ0FBQyxpQkFBaUI7c0JBQ3hDLHNCQUFzQixDQUFDLFlBQVksQ0FBQTtZQUM3QyxDQUFDO1lBRUQsd0VBQXdFO1lBQ3hFLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFDTCxzQkFBQztBQUFELENBN09BLEFBNk9DOztBQTVPa0IsaUNBQWlCLEdBQUcsVUFBVSxDQUFDO0FBRTlDOzs7Ozs7R0FNRztBQUNZLDhCQUFjLEdBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoic2VydmVyLWludmVudG9yeS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=