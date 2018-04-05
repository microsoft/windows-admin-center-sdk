import { Net } from './net';
var Cim = (function () {
    function Cim() {
    }
    /**
     * WQL query to select by a single property value
     * @param className the class name to query for
     * @param propertyName The property Name to filter by
     * @param properties the collection of properties to retrieve. To get all properties specify and array
     * of one element: ["*"]
     * @returns the WQL query for the given parameters formatted to add the desired property value:
     * Select {properties} from {className} where {PropertyName}='{0}'
     */
    Cim.wqlSelectBySingleProperty = function (className, propertyName, properties) {
        return 'Select {0} from {1} where {2}='.format(properties.join(','), className, propertyName) + "'{0}'";
    };
    /**
     * CIM URL builder for MultipleInstances
     *
     * @namespace the cim namespace.
     * @className the class name.
     */
    Cim.cimUrlMultipleInstances = function (namespace, className) {
        return Cim.instanceMultiple(namespace, className);
    };
    /**
     * CIM URL builder for SingleInstance
     *
     * @namespace the cim namespace.
     * @className the class name.
     * @keyProperties the key properties object.
     */
    Cim.cimUrlSingleInstance = function (namespace, className, keyProperties) {
        return Cim.instanceSingle(namespace, className).format(Net.cimCreateName(keyProperties));
    };
    /**
     * CIM URL builder for InstanceMethod
     *
     * @namespace the cim namespace.
     * @className the class name.
     * @methodName the method name.
     * @keyProperties the key properties object.
     */
    Cim.cimUrlInstanceMethod = function (namespace, className, methodName, keyProperties) {
        return Cim.invokeInstance(namespace, className, methodName).format(Net.cimCreateName(keyProperties));
    };
    /**
     * CIM URL builder for StaticMethod
     *
     * @namespace the cim namespace.
     * @className the class name.
     * @methodName the method name.
     */
    Cim.cimUrlStaticMethod = function (namespace, className, methodName) {
        return Cim.invokeStatic(namespace, className, methodName);
    };
    /**
     * CIM URL builder for WqlQuery
     */
    Cim.cimUrlWqlQuery = function (namespace) {
        return Cim.cimQueryRelativeUri.format(namespace);
    };
    /**
     * Create Get URL of cim instances.
     *
     * @param namespaceName name of CIM namespace.
     * @param className name of CIM class.
     * @return relative URL of GET call.
     */
    Cim.instanceMultiple = function (namespaceName, className) {
        return Cim.cimClassRelativeUri.format(namespaceName, className) + '/instances';
    };
    /**
     * Create Get URL of cim single instance.
     *
     * @param namespaceName name of CIM namespace.
     * @param className name of CIM class.
     * @return relative URL of GET call.
     */
    Cim.instanceSingle = function (namespaceName, className) {
        return Cim.cimClassRelativeUri.format(namespaceName, className) + '/instances/{0}';
    };
    /**
     * Create POST URL of cim static method.
     *
     * @param namespaceName name of CIM namespace.
     * @param className name of CIM class.
     * @param methodName name of CIM method.
     * @return relative URL of POST call.
     */
    Cim.invokeStatic = function (namespaceName, className, methodName) {
        return Cim.cimClassRelativeUri.format(namespaceName, className) + Cim.cimInvokeRelativeUri.format(methodName);
    };
    /**
     * Create POST URL of cim instance method.
     *
     * @param namespaceName name of CIM namespace.
     * @param className name of CIM class.
     * @param methodName name of CIM method.
     * @return relative URL of POST call.
     */
    Cim.invokeInstance = function (namespaceName, className, methodName) {
        return Cim.cimClassRelativeUri.format(namespaceName, className) + '/instances/{0}' + Cim.cimInvokeRelativeUri.format(methodName);
    };
    return Cim;
}());
export { Cim };
Cim.cimClassRelativeUri = 'features/cim/namespaces/{0}/classes/{1}';
Cim.cimQueryRelativeUri = 'features/cim/namespaces/{0}/query';
Cim.cimInvokeRelativeUri = '/methods/{0}/invoke';
Cim.namespace = {
    cimV2: 'root.cimv2',
    cluster: 'root.MSCluster',
    standardCimV2: 'root.standardCimv2',
    managementTools2: 'root.Microsoft.Windows.ManagementTools2',
    serverManager: 'root.Microsoft.Windows.ServerManager',
    windowsUpdate: 'root.Microsoft.Windows.WindowsUpdate'
};
Cim.cimClass = {
    clusterResource: 'MSCluster_Resource',
    clusterNode: 'MSCluster_Node',
    win32NetworkAdapter: 'Win32_NetworkAdapter',
    clusterUtilities: 'MSCluster_ClusterUtilities',
    win32ComputerSystem: 'Win32_ComputerSystem',
    win32OperatingSystem: 'Win32_OperatingSystem',
    win32Processor: 'Win32_Processor',
    win32LogicaiDisks: 'Win32_LogicalDisk',
    win32PhysicalMemory: 'Win32_PhysicalMemory',
    win32Service: 'Win32_Service',
    Win32DependentService: 'Win32_DependentService',
    win32PnpEntity: 'Win32_PnPEntity',
    win32Sid: 'Win32_SID',
    msftMTProcessorSummary: 'MSFT_MTProcessorSummary',
    msftMTMemorySummary: 'MSFT_MTMemorySummary',
    msftMTDisk: 'MSFT_MTDisk',
    msftMTNetworkAdapter: 'MSFT_MTNetworkAdapter',
    msftMTTaskManager: 'MSFT_MTTaskManager',
    msftMTProcesses: 'MSFT_MTProcess',
    msftMTEventProvider: 'MSFT_MTEventProvider',
    msftMTEventChannel: 'MSFT_MTEventChannel',
    msftMTRegistryKey: 'MSFT_MTRegistryKey',
    msftMTRegistryValue: 'MSFT_MTRegistryValue',
    msftMTRegistryTasks: 'MSFT_MTRegistryTasks',
    msftMTRegistryString: 'MSFT_MTregistryString',
    msftMTRegistryBinary: 'MSFT_MTregistryBinary',
    msftMTRegistryDword: 'MSFT_MTregistryDword',
    msftMTRegistryMultiString: 'MSFT_MTregistryMultiString',
    msftMTRegistryQword: 'MSFT_MTregistryQword',
    msftNetAdapter: 'MSFT_NetAdapter',
    msftNetIPInterface: 'MSFT_NetIPInterface',
    msftNetIPAddress: 'MSFT_NetIPAddress',
    msftNetRoute: 'MSFT_NetRoute',
    msftDnsClientServerAddress: 'MSFT_DNSClientServerAddress',
    msftServerManagerTasks: 'MSFT_ServerManagerTasks',
    msftWUOperationsSession: 'MSFT_WUOperationsSession',
    msftWUSettings: 'MSFT_WUSettings',
    msftNetFirewallRule: 'MSFT_NetFirewallRule',
    msftNetAddressFilter: 'MSFT_NetAddressFilter',
    msftNetApplicationFilter: 'MSFT_NetApplicationFilter',
    msftNetInterfaceFilter: 'MSFT_NetInterfaceFilter',
    msftNetInterfaceTypeFilter: 'MSFT_NetInterfaceTypeFilter',
    msftNetProtocolPortFilter: 'MSFT_NetProtocolPortFilter',
    msftNetNetworkLayerSecurityFilter: 'MSFT_NetNetworkLayerSecurityFilter',
    msftNetServiceFilter: 'MSFT_NetServiceFilter'
};
//# sourceMappingURL=data:application/json;base64,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QyxvQkFBb0IsRUFBRSx1QkFBdUI7SUFDN0Msb0JBQW9CLEVBQUUsdUJBQXVCO0lBQzdDLG1CQUFtQixFQUFFLHNCQUFzQjtJQUMzQyx5QkFBeUIsRUFBRSw0QkFBNEI7SUFDdkQsbUJBQW1CLEVBQUUsc0JBQXNCO0lBQzNDLGNBQWMsRUFBRSxpQkFBaUI7SUFDakMsa0JBQWtCLEVBQUUscUJBQXFCO0lBQ3pDLGdCQUFnQixFQUFFLG1CQUFtQjtJQUNyQyxZQUFZLEVBQUUsZUFBZTtJQUM3QiwwQkFBMEIsRUFBRSw2QkFBNkI7SUFDekQsc0JBQXNCLEVBQUUseUJBQXlCO0lBQ2pELHVCQUF1QixFQUFFLDBCQUEwQjtJQUNuRCxjQUFjLEVBQUUsaUJBQWlCO0lBQ2pDLG1CQUFtQixFQUFFLHNCQUFzQjtJQUMzQyxvQkFBb0IsRUFBRSx1QkFBdUI7SUFDN0Msd0JBQXdCLEVBQUUsMkJBQTJCO0lBQ3JELHNCQUFzQixFQUFFLHlCQUF5QjtJQUNqRCwwQkFBMEIsRUFBRSw2QkFBNkI7SUFDekQseUJBQXlCLEVBQUUsNEJBQTRCO0lBQ3ZELGlDQUFpQyxFQUFFLG9DQUFvQztJQUN2RSxvQkFBb0IsRUFBRSx1QkFBdUI7Q0FDaEQsQ0FBQyIsImZpbGUiOiJjaW0uanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9