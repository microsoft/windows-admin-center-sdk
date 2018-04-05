import { NodeRequestOptions } from '../../data/node-connection';
/**
 * Server Inventory query parameters.
 */
export interface ServerInventoryParams extends NodeRequestOptions {
    /**
     * name of server node.
     */
    name: string;
}
/**
 * Windows Operating Systems
 */
export declare enum WindowsOperatingSystem {
    Unknown = 0,
    Legacy = 1,
    WindowsVista = 2,
    Windows7 = 3,
    WindowsServer2008 = 4,
    WindowsServer2008R2 = 5,
    Windows8 = 6,
    WindowsServer2012 = 7,
    Windows8Point1 = 8,
    WindowsServer2012R2 = 9,
    Windows10 = 10,
    WindowsServer2016 = 11,
}
/**
 * Windows Product Types
 */
export declare enum WindowsProductType {
    Workstation = 1,
    DomainController = 2,
    Server = 3,
}
/**
 * Server Inventory data interface.
 */
export interface ServerInventoryData {
    /**
     * The server name.
     */
    serverName: string;
    /**
     * The name of server. (CSName/OperatingSystem)
     */
    name: string;
    /**
     * The domain name of server. (Domain/ComputerSystem)
     */
    domainName: string;
    /**
     * The workgroup name of server if any. (Workgroup/ComputerSystem)
     */
    workgroupName: string;
    /**
     * The FQDN of server if any. (ComputerSystem)
     */
    fullyQualifiedDomainName: string;
    /**
     * The operating system name of server. (Caption/OperatingSystem)
     */
    operatingSystemName: string;
    /**
     * The operating system name of server. (SKU/OperatingSystem)
     */
    operatingSystemSKU: number;
    /**
     * The operating system version of server. (Version/OperatingSystem)
     */
    operatingSystemVersion: string;
    /**
     * The total size of physical memory.
     */
    totalPhysicalMemory: number;
    /**
     * The domain role.
     */
    domainRole: number;
    /**
     * The windows product type.
     */
    productType: WindowsProductType;
    /**
     * The computer manufacturer.
     */
    computerManufacturer: string;
    /**
     * The computer model.
     */
    computerModel: string;
    /**
     * The number of logical processors.
     */
    totalLogicalProcessors: number;
    /**
     * Indicating if current user is a member of administrators group.
     */
    isAdministrator: boolean;
}
/**
 * Server Inventory class.
 */
export declare class ServerInventory implements ServerInventoryData {
    serverName: string;
    private static nanoDisplayFormat;
    private static nanoServerSkus;
    /**
     * The name of server. (CSName/OperatingSystem)
     */
    name: string;
    /**
     * The domain name of server. (Domain/ComputerSystem)
     */
    domainName: string;
    /**
     * The workgroup name of server if any. (Workgroup/ComputerSystem)
     */
    workgroupName: string;
    /**
     * The FQDN of server if any. (ComputerSystem)
     */
    fullyQualifiedDomainName: string;
    /**
     * The operating system name of server. (Caption/OperatingSystem)
     */
    operatingSystemName: string;
    /**
     * The operating system name of server. (SKU/OperatingSystem)
     */
    operatingSystemSKU: number;
    /**
     * The operating system version of server. (Version/OperatingSystem)
     */
    operatingSystemVersion: string;
    /**
     * The total size of physical memory.
     */
    totalPhysicalMemory: number;
    /**
     * The domain role.
     */
    domainRole: number;
    /**
     * The windows product type.
     */
    productType: WindowsProductType;
    /**
     * The computer manufacturer.
     */
    computerManufacturer: string;
    /**
     * The computer model.
     */
    computerModel: string;
    /**
     * The number of logical processors.
     */
    totalLogicalProcessors: number;
    /**
     * Indicating if the server has ManagementTools namespace to support TaskManager provider.
     */
    isManagementToolsAvailable: boolean;
    /**
     * Indicating if the computer has ServerManager namespace to support ServerManager provider.
     */
    isServerManagerAvailable: boolean;
    /**
     * Whether or not Windows Management Framework v5.0 or higher is installed.
     */
    isWmfInstalled: boolean;
    /**
     * Indicating if the server node is a part of Microsoft Cluster.
     */
    isCluster: boolean;
    /**
     * The FQDN of Microsoft Cluster if it's a part of Microsoft Cluster.
     */
    clusterFqdn: string;
    /**
     * Indicating if current user is a member of administrators group.
     */
    isAdministrator: boolean;
    /**
     * Indicates if the node has the time series database enabled
     */
    isTsdbEnabled: boolean;
    /**
     * Indicates if the hyper-v role is installed
     */
    isHyperVRoleInstalled: boolean;
    /**
     * Indicates if the hyper-v powershell feature is installed
     */
    isHyperVPowershellInstalled: boolean;
    /**
     * Initializes a new instance of the ServerInventory Class.
     *
     * @param serverName the server name to query.
     * @param data the server inventory recovered data.
     */
    constructor(serverName: string, data?: ServerInventoryData);
    /**
     * Gets the sku number indicating whether the computer is Nano server.
     *
     * @return boolean true if nano
     */
    readonly isNano: boolean;
    /**
     * Gets a value indicating if this is a windows server
     *
     * @return boolean true if this is a server
     */
    readonly isServer: boolean;
    /**
     * Gets a value indicating if this is a windows client
     *
     * @return boolean true if this is a client
     */
    readonly isClient: boolean;
    /**
     * Indicates whether the computer is domain controller or not.
     *
     * @return boolean true if domain controller
     */
    readonly isDomainController: boolean;
    /**
     * Gets the display name of operating system.
     */
    readonly operatingSystemDisplayName: string;
    /**
     * Gets the display name of total physical memory.
     */
    readonly totalPhysicalMemoryDisplayName: string;
    /**
     * Gets the operating system enumb of the machine
     * see: https://msdn.microsoft.com/en-us/library/windows/desktop/ms724832(v=vs.85).aspx for operating system version mapping.
     */
    readonly operatingSystem: WindowsOperatingSystem;
}
