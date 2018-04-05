import { Net } from './net';
var Cim = /** @class */ (function () {
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
        win32LogicalDisks: 'Win32_LogicalDisk',
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
    return Cim;
}());
export { Cim };
//# sourceMappingURL=data:application/json;base64,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QUFvQixFQUFFLHVCQUF1QjtRQUM3QyxtQkFBbUIsRUFBRSxzQkFBc0I7UUFDM0MseUJBQXlCLEVBQUUsNEJBQTRCO1FBQ3ZELG1CQUFtQixFQUFFLHNCQUFzQjtRQUMzQyxjQUFjLEVBQUUsaUJBQWlCO1FBQ2pDLGtCQUFrQixFQUFFLHFCQUFxQjtRQUN6QyxnQkFBZ0IsRUFBRSxtQkFBbUI7UUFDckMsWUFBWSxFQUFFLGVBQWU7UUFDN0IsMEJBQTBCLEVBQUUsNkJBQTZCO1FBQ3pELHNCQUFzQixFQUFFLHlCQUF5QjtRQUNqRCx1QkFBdUIsRUFBRSwwQkFBMEI7UUFDbkQsY0FBYyxFQUFFLGlCQUFpQjtRQUNqQyxtQkFBbUIsRUFBRSxzQkFBc0I7UUFDM0Msb0JBQW9CLEVBQUUsdUJBQXVCO1FBQzdDLHdCQUF3QixFQUFFLDJCQUEyQjtRQUNyRCxzQkFBc0IsRUFBRSx5QkFBeUI7UUFDakQsMEJBQTBCLEVBQUUsNkJBQTZCO1FBQ3pELHlCQUF5QixFQUFFLDRCQUE0QjtRQUN2RCxpQ0FBaUMsRUFBRSxvQ0FBb0M7UUFDdkUsb0JBQW9CLEVBQUUsdUJBQXVCO0tBQ2hELENBQUM7SUErR04sVUFBQztDQTNLRCxBQTJLQyxJQUFBO1NBM0tZLEdBQUciLCJmaWxlIjoiY2ltLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==