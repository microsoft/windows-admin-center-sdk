import { MediaConversion, MediaConversionBase } from '../../data/units';
/**
 * Windows Operating Systems
 */
export var WindowsOperatingSystem;
(function (WindowsOperatingSystem) {
    WindowsOperatingSystem[WindowsOperatingSystem["Unknown"] = 0] = "Unknown";
    WindowsOperatingSystem[WindowsOperatingSystem["Legacy"] = 1] = "Legacy";
    WindowsOperatingSystem[WindowsOperatingSystem["WindowsVista"] = 2] = "WindowsVista";
    WindowsOperatingSystem[WindowsOperatingSystem["Windows7"] = 3] = "Windows7";
    WindowsOperatingSystem[WindowsOperatingSystem["WindowsServer2008"] = 4] = "WindowsServer2008";
    WindowsOperatingSystem[WindowsOperatingSystem["WindowsServer2008R2"] = 5] = "WindowsServer2008R2";
    WindowsOperatingSystem[WindowsOperatingSystem["Windows8"] = 6] = "Windows8";
    WindowsOperatingSystem[WindowsOperatingSystem["WindowsServer2012"] = 7] = "WindowsServer2012";
    WindowsOperatingSystem[WindowsOperatingSystem["Windows8Point1"] = 8] = "Windows8Point1";
    WindowsOperatingSystem[WindowsOperatingSystem["WindowsServer2012R2"] = 9] = "WindowsServer2012R2";
    WindowsOperatingSystem[WindowsOperatingSystem["Windows10"] = 10] = "Windows10";
    WindowsOperatingSystem[WindowsOperatingSystem["WindowsServer2016"] = 11] = "WindowsServer2016";
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
var ServerInventory = /** @class */ (function () {
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
    ServerInventory.nanoDisplayFormat = '{0} Nano';
    /*
     * OperatingSystemSKU: from https://msdn.microsoft.com/en-us/library/aa394239(v=vs.85).aspx
     *    PRODUCT_DATACENTER_NANO_SERVER (143)
     *       Windows Server Datacenter Edition (Nano Server installation)
     *    PRODUCT_STANDARD_NANO_SERVER (144)
     *       Windows Server Standard Edition (Nano Server installation)
     */
    ServerInventory.nanoServerSkus = [143, 144];
    return ServerInventory;
}());
export { ServerInventory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL3NlcnZlci1pbnZlbnRvcnkvc2VydmVyLWludmVudG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsZUFBZSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFZeEU7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxzQkFhWDtBQWJELFdBQVksc0JBQXNCO0lBQzlCLHlFQUFXLENBQUE7SUFDWCx1RUFBVSxDQUFBO0lBQ1YsbUZBQWdCLENBQUE7SUFDaEIsMkVBQVksQ0FBQTtJQUNaLDZGQUFxQixDQUFBO0lBQ3JCLGlHQUF1QixDQUFBO0lBQ3ZCLDJFQUFZLENBQUE7SUFDWiw2RkFBcUIsQ0FBQTtJQUNyQix1RkFBa0IsQ0FBQTtJQUNsQixpR0FBdUIsQ0FBQTtJQUN2Qiw4RUFBYyxDQUFBO0lBQ2QsOEZBQXNCLENBQUE7QUFDMUIsQ0FBQyxFQWJXLHNCQUFzQixLQUF0QixzQkFBc0IsUUFhakM7QUFFRDs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLGtCQUlYO0FBSkQsV0FBWSxrQkFBa0I7SUFDMUIseUVBQWUsQ0FBQTtJQUNmLG1GQUFvQixDQUFBO0lBQ3BCLCtEQUFVLENBQUE7QUFDZCxDQUFDLEVBSlcsa0JBQWtCLEtBQWxCLGtCQUFrQixRQUk3QjtBQWtGRDs7R0FFRztBQUNIO0lBMEhJOzs7OztPQUtHO0lBQ0gseUJBQW1CLFVBQWtCLEVBQUUsSUFBMEI7UUFBOUMsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUIsQ0FBQztJQUNMLENBQUM7SUFPRCxzQkFBVyxtQ0FBTTtRQUxqQjs7OztXQUlHO2FBQ0g7WUFDSSwrQ0FBK0M7WUFDL0MsTUFBTSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUks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RUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUTtvQkFDaEIsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQjtvQkFDMUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQTtZQUM3QyxDQUFDO1lBRUQsd0VBQXdFO1lBQ3hFLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUEzT2MsaUNBQWlCLEdBQUcsVUFBVSxDQUFDO0lBRTlDOzs7Ozs7T0FNRztJQUNZLDhCQUFjLEdBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFtT3pELHNCQUFDO0NBN09ELEFBNk9DLElBQUE7U0E3T1ksZUFBZSIsImZpbGUiOiJzZXJ2ZXItaW52ZW50b3J5LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==