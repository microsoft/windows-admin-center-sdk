export declare class Cim {
    private static cimClassRelativeUri;
    private static cimQueryRelativeUri;
    private static cimInvokeRelativeUri;
    static namespace: {
        cimV2: string;
        cluster: string;
        standardCimV2: string;
        managementTools2: string;
        serverManager: string;
        windowsUpdate: string;
    };
    static cimClass: {
        clusterResource: string;
        clusterNode: string;
        win32NetworkAdapter: string;
        clusterUtilities: string;
        win32ComputerSystem: string;
        win32OperatingSystem: string;
        win32Processor: string;
        win32LogicaiDisks: string;
        win32PhysicalMemory: string;
        win32Service: string;
        Win32DependentService: string;
        win32PnpEntity: string;
        win32Sid: string;
        msftMTProcessorSummary: string;
        msftMTMemorySummary: string;
        msftMTDisk: string;
        msftMTNetworkAdapter: string;
        msftMTTaskManager: string;
        msftMTProcesses: string;
        msftMTEventProvider: string;
        msftMTEventChannel: string;
        msftMTRegistryKey: string;
        msftMTRegistryValue: string;
        msftMTRegistryTasks: string;
        msftMTRegistryString: string;
        msftMTRegistryBinary: string;
        msftMTRegistryDword: string;
        msftMTRegistryMultiString: string;
        msftMTRegistryQword: string;
        msftNetAdapter: string;
        msftNetIPInterface: string;
        msftNetIPAddress: string;
        msftNetRoute: string;
        msftDnsClientServerAddress: string;
        msftServerManagerTasks: string;
        msftWUOperationsSession: string;
        msftWUSettings: string;
        msftNetFirewallRule: string;
        msftNetAddressFilter: string;
        msftNetApplicationFilter: string;
        msftNetInterfaceFilter: string;
        msftNetInterfaceTypeFilter: string;
        msftNetProtocolPortFilter: string;
        msftNetNetworkLayerSecurityFilter: string;
        msftNetServiceFilter: string;
    };
    /**
     * WQL query to select by a single property value
     * @param className the class name to query for
     * @param propertyName The property Name to filter by
     * @param properties the collection of properties to retrieve. To get all properties specify and array
     * of one element: ["*"]
     * @returns the WQL query for the given parameters formatted to add the desired property value:
     * Select {properties} from {className} where {PropertyName}='{0}'
     */
    static wqlSelectBySingleProperty(className: string, propertyName: string, properties: string[]): string;
    /**
     * CIM URL builder for MultipleInstances
     *
     * @namespace the cim namespace.
     * @className the class name.
     */
    static cimUrlMultipleInstances(namespace: string, className: string): string;
    /**
     * CIM URL builder for SingleInstance
     *
     * @namespace the cim namespace.
     * @className the class name.
     * @keyProperties the key properties object.
     */
    static cimUrlSingleInstance(namespace: string, className: string, keyProperties: any): string;
    /**
     * CIM URL builder for InstanceMethod
     *
     * @namespace the cim namespace.
     * @className the class name.
     * @methodName the method name.
     * @keyProperties the key properties object.
     */
    static cimUrlInstanceMethod(namespace: string, className: string, methodName: string, keyProperties: any): string;
    /**
     * CIM URL builder for StaticMethod
     *
     * @namespace the cim namespace.
     * @className the class name.
     * @methodName the method name.
     */
    static cimUrlStaticMethod(namespace: string, className: string, methodName: string): string;
    /**
     * CIM URL builder for WqlQuery
     */
    static cimUrlWqlQuery(namespace: string): string;
    /**
     * Create Get URL of cim instances.
     *
     * @param namespaceName name of CIM namespace.
     * @param className name of CIM class.
     * @return relative URL of GET call.
     */
    private static instanceMultiple(namespaceName, className);
    /**
     * Create Get URL of cim single instance.
     *
     * @param namespaceName name of CIM namespace.
     * @param className name of CIM class.
     * @return relative URL of GET call.
     */
    private static instanceSingle(namespaceName, className);
    /**
     * Create POST URL of cim static method.
     *
     * @param namespaceName name of CIM namespace.
     * @param className name of CIM class.
     * @param methodName name of CIM method.
     * @return relative URL of POST call.
     */
    private static invokeStatic(namespaceName, className, methodName);
    /**
     * Create POST URL of cim instance method.
     *
     * @param namespaceName name of CIM namespace.
     * @param className name of CIM class.
     * @param methodName name of CIM method.
     * @return relative URL of POST call.
     */
    private static invokeInstance(namespaceName, className, methodName);
}
/**
 * CIM single instance.
 */
export interface CimSingle {
    name?: string;
    id?: string;
    properties: any;
}
/**
 * CIM multiple instances.
 */
export interface CimMultiple {
    value: CimSingle[];
}
/**
 * Cim result object including an error.
 */
export declare type CimResult = any;
/**
 * Cim key properties set with name value pair.
 */
export interface CimKeyProperties {
    [name: string]: string | number;
}
