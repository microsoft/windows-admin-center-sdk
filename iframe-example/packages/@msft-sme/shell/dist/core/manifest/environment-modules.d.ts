export interface EnvironmentModuleDisplayable {
    /**
     * display name of module
     */
    displayName: string;
    /**
     * description of module
     */
    description: string;
    /**
     * icon url or smeIcon reference. Absolute or relative urls
     */
    icon: string;
    /**
     * keywords for module search
     */
    keywords: string[];
}
/**
 * The type of entry point.
 */
export declare type EnvironmentModuleEntryPointType = 'connectionProvider' | 'solution' | 'tool' | 'component' | 'service';
/**
 * The type of behavior to solution root navigation.
 */
export declare type SolutionRootNavigationBehaviorType = 'path' | 'connections';
/**
 * The interface of condition check of server inventory data.
 */
export interface EnvironmentModuleConditionStatement {
    /**
     * The operator of the condition.
     */
    operator: 'gt' | 'ge' | 'lt' | 'le' | 'eq' | 'ne' | 'is' | 'not' | 'contains' | 'notContains';
    /**
     * The data type of value.
     */
    type: 'version' | 'number' | 'string' | 'boolean';
    /**
     * The test value of the condition.
     */
    value: string | number | boolean;
}
/**
 * The mapped inventory conditions.
 */
export declare type EnvironmentModuleConditionInventory = MsftSme.StringMap<EnvironmentModuleConditionStatement>;
/**
 * The requirement of entry point to be activated on the view.
 */
export interface EnvironmentModuleEntryPointRequirement {
    /**
     * The id of solutions of the connection type that satisfies this requirement.
     */
    solutionIds?: string[];
    /**
     * The id of the connection type that satisfies this requirement
     */
    connectionTypes?: string[];
    /**
     * The conditions of tool status.
     */
    conditions?: {
        /**
         * Check if app/desktop localhost. Only tested if it sets "false".
         */
        localhost?: boolean;
        /**
         * Check if specific condition against ServerInventory data.
         */
        inventory?: EnvironmentModuleConditionInventory;
        /**
         * Check by using PowerShell script.
         *
         * must return the following format.
         * {
         *   state: 'Available', 'NotConfigured', 'NotSupported'
         *   message: string
         *   keyValuePairs: [ { name: string, value: string, type: string } ]
         * }
         */
        script?: string;
    }[];
}
export interface EnvironmentModulePowerShellStatusProviderOptions {
    /**
     * If defined, specifies which node to connect to for status
     */
    nodePropertyPath?: string;
    /**
     * The script to run.
     */
    script: string;
}
export interface EnvironmentModuleConnectionStatusProvider {
    /**
     * If defined, powershell will be used to query a connections status
     */
    powerShell?: EnvironmentModulePowerShellStatusProviderOptions;
    /**
     * If defined, the gateways REST api will be used to query a connections status
     */
    relativeGatewayUrl?: string;
    /**
     * If defined, will be used to look up display strings for the label and description of the status object
     */
    displayValueMap?: MsftSme.StringMap<string>;
}
export interface SolutionConnectionsViewConfiguration {
    /**
     * List of connections types to show in the view of the connections list
     * each entry should be a valid connection type string identifier from any modules entrypoints of type 'connectionProvider'
     */
    connectionTypes: string[];
    /**
     * The title of the connections list for this solution.
     * Optional. A default header will be provided if this field is left out
     */
    header?: string;
}
export interface SolutionToolsViewConfiguration {
    /**
     * Enables/Disable ths tools menu
     */
    enabled: boolean;
    /**
     * Indicates the default tool to open if no tool is provided. This value should be the name of an entrypoint in the same module
     */
    defaultTool: string;
}
/**
 * Defines a modules entry point
 */
export interface EnvironmentModuleEntryPoint extends EnvironmentModuleDisplayable {
    /**
     * The type of entry point.
     */
    entryPointType: EnvironmentModuleEntryPointType;
    /**
     * The name of entry point, unique to its parent module
     */
    name?: string;
    /**
     * The friendly url name to use to reference this entrypoint. This must be unique among all entrypoints
     */
    urlName?: string;
    /**
     * The path of entry point.
     */
    path: string;
    /**
     * 'connectionProvider' types only. The id of the connection type that this entry point provides
     */
    connectionType?: string;
    /**
     * 'connectionProvider' types only. The friendly url name to use to reference the connection type that this entry point provides.
     * This must be unique among all connection types
     */
    connectionTypeUrlName?: string;
    /**
     * 'connectionProvider' types only. The display name of the connection type that this entry point provides
     */
    connectionTypeName?: string;
    /**
     * 'connectionProvider' types only. The default solution to use when opening the connection type that this entry point provides
     */
    connectionTypeDefaultSolution?: string;
    /**
     * 'connectionProvider' types only. The status provider implementation for the connection type that this entry point provides
     */
    connectionStatusProvider?: EnvironmentModuleConnectionStatusProvider;
    /**
     * OBSOLETE 'connectionProvider' types only. The default tool to use when opening the connection type that this entry point provides
     */
    connectionTypeDefaultTool?: string;
    /**
     * 'tool' types only. A list of requirements, if any requirement is met then this tool is applicable to a given connection
     */
    requirements?: EnvironmentModuleEntryPointRequirement[];
    /**
     * Indicates that the module that this entry point belongs to is being sideLoaded
     */
    parentModule?: EnvironmentModule;
    /**
     * 'solution' types only.
     * Defines how navigating to the root of this solution will behave.
     * Setting this to 'path' will load this module to the 'path' property.
     * Setting this to 'connections' will navigate instead to the connections list, customized for this solution
     */
    rootNavigationBehavior?: SolutionRootNavigationBehaviorType;
    /**
     * 'solution' types only.
     * Only applicable when 'rootNavigationBehavior' us set to 'connections'.
     * Describes how to customize the view of the connections list.
     */
    connections?: SolutionConnectionsViewConfiguration;
    /**
     * 'solution' types only. If provided, Configures the tools menu for this solution.
     */
    tools?: SolutionToolsViewConfiguration;
}
/**
 * The state definition of Tool condition.
 */
export declare enum EnvironmentModuleToolState {
    /**
     * Tool is available on the connection.
     */
    Available = 0,
    /**
     * Tool is not available because it's not configured properly.
     */
    NotConfigured = 1,
    /**
     * Tool it not supported on the connection.
     */
    NotSupported = 2,
}
/**
 * The result of Tool conditions.
 */
export interface EnvironmentModuleToolConditionResult {
    /**
     * Display the tool.
     */
    show: boolean;
    /**
     * The state of tool condition.
     */
    detail?: EnvironmentModuleToolState;
    /**
     * The message of condition.
     */
    message?: string;
}
/**
 * Tool's combined entry point and inventory result.
 */
export interface EnvironmentModuleEntryPointWithToolConditionResult extends EnvironmentModuleEntryPoint, EnvironmentModuleToolConditionResult {
}
/**
 * Environment module resource class.
 */
export interface EnvironmentModuleResource {
    /**
     * locale key string.
     */
    locale: string;
    /**
     * string map object.
     */
    strings: MsftSme.StringMap<string>;
}
/**
 * Environment Attribute generator
 */
export interface EnvironmentAttributeGenerationCondition {
    /**
     * The connection type. Should match the connectionType of a connection provider.
     */
    connectionType?: string;
    /**
     * Applies to servers and clusters only. This condition specifies the id of roles/features that must be installed
     */
    roles?: string[];
    /**
     * Applies to servers and clusters only. This condition specifies the id of services that must be running
     */
    services?: string[];
    /**
     * Applies to servers and clusters only. Specifies a powershell script function to run. See Documentation for more details.
     */
    powershell?: string;
}
/**
 * Environment Attribute generator
 */
export interface EnvironmentAttributeGenerator {
    /**
     * The id of the attribute. Other modules may use this in there 'requirements' section
     */
    attributeId: string;
    /**
     * The display name of the attribute.
     */
    attributeName: string;
    /**
     * The conditions under which to apply this attribute. If any condition is evaluated to true, the attribute should be applied
     */
    conditions: EnvironmentAttributeGenerationCondition[];
}
/**
 * Defines an object that provides information about a connection type.
 */
export interface EnvironmentConnectionTypeInfo {
    /**
     * The provider entry point.
     */
    provider: EnvironmentModuleEntryPoint;
    /**
     * The solution entry point.
     */
    solution: EnvironmentModuleEntryPoint;
    /**
     * The default tool entry point.
     */
    tool: EnvironmentModuleEntryPoint;
}
export interface EnvironmentModuleFriendlyUrlMap {
    to: MsftSme.StringMap<string>;
    from: MsftSme.StringMap<string>;
}
export interface EnvironmentModuleFriendlyUrlMaps {
    connectionTypes: EnvironmentModuleFriendlyUrlMap;
    solutions: EnvironmentModuleFriendlyUrlMap;
    tools: EnvironmentModuleFriendlyUrlMap;
}
/**
 * Environment module class.
 */
export declare class EnvironmentModule {
    /**
     * Static mapping for connection information.
     */
    private static connectionMap;
    /**
     * Static mapping for friendly url strings to entrypoint ids
     */
    private static friendlyUrlMap;
    /**
     * The name of shell.
     */
    static nameOfShell: string;
    /**
     * The default signature if missing manifest.
     */
    static defaultSignature: string;
    /**
     * All entry points from all modules
     */
    static allEntryPoints: EnvironmentModuleEntryPoint[];
    /**
     * All entry points by type
     */
    static entryPointsByType: MsftSme.StringMap<EnvironmentModuleEntryPoint[]>;
    /**
     * schema file information.
     */
    $schema: string;
    /**
     * name of set of tools. This will be used as hide key.
     */
    name: string;
    /**
     * display name of module.
     */
    displayName: string;
    /**
     * description of set of tools.
     */
    description: string;
    /**
     * keywords of the module.
     */
    keywords: string[];
    /**
     * origin absolute url.
     */
    origin: string;
    /**
     * target url to open the iframe.
     */
    target: string;
    /**
     * signature.
     */
    signature: string;
    /**
     * The version of this module
     */
    version: string;
    /**
     * icon url, absolute or relative to Shell url.
     */
    icon: string;
    /**
     * entry points to launch the tool.
     */
    entryPoints: EnvironmentModuleEntryPoint[];
    /**
     * localized resources of strings.
     */
    resources: EnvironmentModuleResource[];
    /**
     * list of all other available modules
     */
    modules?: EnvironmentModule[];
    /**
     * Attribute Generation metadata for this module
     */
    attributeGenerator?: EnvironmentAttributeGenerator;
    /**
     * Indicates that this module is being sideLoaded
     */
    isSideLoaded: boolean;
    /**
     * Find resource string for the key.
     *
     * @param resources The resource.
     * @param locale The locale.
     * @param key The key string.
     */
    static findResource(resources: EnvironmentModuleResource[], locale: string, key: string): string;
    /**
     * Recursively processes manifest resources
     *
     * @param module the manifest object.
     * @param locale the locale string such as 'en'.
     * @param the current object, defaults to the module itself
     */
    private static processModuleResources(module, locale, obj?);
    /**
     * Create environment object from the manifest.
     *
     * @param manifest the manifest object.
     * @param locale the locale string such as 'en'.
     */
    static createEnvironment(manifest: any, locale: string): any;
    /**
     * Gets the environment module.
     *
     * @param name the name of module.
     * @return EnvironmentModule the environment module.
     */
    static getEnvironmentModule(name: string): EnvironmentModule;
    /**
     * Process Entry points for quick and easy access later
     * @param module the modules to process
     */
    static processEntryPoints(module: EnvironmentModule): void;
    /**
     * Evaluates all of the modules in the environment and returns a flat list of all of their entry points.
     * optionally filtered by the 'filter' function
     *
     * @param filter the filter to apply to the entry points.
     * @return a flat list of all module entry points
     */
    static getEntryPoints(filter?: (entryPoint: EnvironmentModuleEntryPoint) => boolean): EnvironmentModuleEntryPoint[];
    /**
     * Gets the available entry points from all of the modules in the environment, filtered by type.
     *
     * @param name the name of module.
     * @return EnvironmentModule the environment module.
     */
    static getEntryPointsByType(entryPointTypes: EnvironmentModuleEntryPointType[]): EnvironmentModuleEntryPoint[];
    /**
     * Gets the connection type mapping data.
     *
     * @return { [name: string]: EnvironmentConnectionTypeInfo } the mapping object.
     */
    static getConnectionMap(): {
        [name: string]: EnvironmentConnectionTypeInfo;
    };
    /**
     * Gets a friendly url segment from a connection type
     * @param connectionType the connection type to map.
     * @return string friendly url for the connection type or the connection type if no friendly name exists.
     */
    static getFriendlyUrlSegmentForConnectionType(connectionType: string, fallbackToUnfriendlySegment?: boolean): string;
    /**
     * Gets a connection type from a friendly url segment
     * @param urlSegment the url segment to map
     * @return string connection type found using the friendly url segment
     */
    static getConnectionTypeFromFriendlyUrlSegment(urlSegment: string): string;
    /**
     * Gets a friendly url segment from an entry point id
     * @param urlSegment the url segment.
     * @param entryPointType the type of entry point to look for.
     * @return string friendly url for the entry point id
     */
    static getFriendlyUrlSegmentForEntryPoint(entryPoint: string, entryPointType: EnvironmentModuleEntryPointType, fallbackToUnfriendlySegment?: boolean): string;
    /**
     * Gets a friendly url segment for an entry point
     * @param urlSegment the url segment.
     * @param entryPointType the type of entry point to look for.
     * @return string friendly url for the entry point
     */
    static getEntryPointFromFriendlyUrlSegment(urlSegment: string, entryPointType: EnvironmentModuleEntryPointType): string;
    /**
     * Gets the connection type information.
     *
     * @param typeName the type name.
     * @return EnvironmentConnectionTypeInfo the connection type information.
     */
    static getConnectionTypeInfo(typeName: string): EnvironmentConnectionTypeInfo;
    private static createConnectionMap();
    /**
     * splits an entrypoint identifier string into its respective module and entrypoint names
     * @param format the formatted entrypoint identifier string
     */
    static splitFormattedEntrypoint(format: string): {
        moduleName: string;
        entrypointName: string;
    };
    /**
     * creates a formatted entrypoint identifier string from an entrypoint
     * @param entryPoint the entrypoint to create the string from
     */
    static createFormattedEntrypoint(entryPoint: EnvironmentModuleEntryPoint): string;
    /**
     * resolves an entrypoint from a formatted entrypoint identifier string
     * @param formattedEntrypointIdentifier the formatted entrypoint identifier string
     */
    static resolveEntrypoint(formattedEntrypointIdentifier: string): EnvironmentModuleEntryPoint;
    /**
     * Gets the name of current shell or module.
     */
    static getModuleName(): string;
    /**
     * Gets the version of current shell or module.
     */
    static getModuleVersion(): string;
}
