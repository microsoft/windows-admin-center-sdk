import { PlainVersionedObject } from '../base/versioned-object';
import { LogRecord } from '../diagnostics/log-record';
import { TelemetryRecord } from '../diagnostics/telemetry-record';
import { ClientNotification } from '../notification/client-notification';
import { WorkItemFind, WorkItemFindResult, WorkItemRequest, WorkItemResult } from '../notification/work-item-request';
import { RpcChannel } from './rpc-channel';
import { RpcDialogData, RpcDialogResult } from './rpc-dialogs';
import { RpcForwardReportData, RpcForwardResponse } from './rpc-forward-report-data';
/**
 * History:
 *  Version: 0.0.5
 *  Data: 12/11/2017
 *
 *    [Add] Added new RPC call for Settings
 *
 *  Version: 0.0.4
 *  Data: 10/25/2017
 *
 *    [Add] Added new RPC call.
 *
 *  Version: 0.0.3
 *  Date: 9/11/2017
 *
 *    [Updated] added assets and theme to RpcInitData
 *
 *  Version: 0.0.2
 *  Date: 9/11/2017
 *
 *    [Update] Add "reload" property to RpcShellNavigate
 *
 *  Version: 0.0.1
 *  Date: 8/23/2017
 *
 *    [Deleted] Deactivate
 *    [Updated] Open for RpcOpenResult
 *
 *  Version: 0.0.0
 *  Date: 8/14/2017
 *
 *    [Deleted] CanDeactivate
 *    [Deprecated] Deactivate
 *    [New Added] Deactivate2
 *
 */
/**
 * Version number of this RPC.
 */
export declare const rpcVersion = "0.0.5";
export declare const rpcCommandVersion = "0.0.0";
/**
 * Rpc servicing mode.
 */
export declare const enum RpcMode {
    Shell = 0,
    Module = 1,
}
/**
 * Rpc relationship type.
 */
export declare const enum RpcRelationshipType {
    Parent = 0,
    Child = 1,
}
/**
 * Rpc message packet type.
 */
export declare const enum RpcMessagePacketType {
    Request = 0,
    Response = 1,
    Error = 2,
}
/**
 * Rpc message event (original message).
 */
export interface RpcMessageEvent {
    data: RpcMessagePacket<any>;
    origin: string;
    source: Window;
}
/**
 * Rpc message data packet.
 */
export interface RpcMessagePacket<T> {
    srcName?: string;
    srcSubName?: string;
    srcDepth?: number;
    destName?: string;
    destSubName?: string;
    signature?: string;
    sequence?: number;
    type?: RpcMessagePacketType;
    command: string;
    version: string;
    data: T;
}
/**************************************************************************************************************************
 * Outbound commands set. (from shell to modules)
 **************************************************************************************************************************/
/**
 * Interface for messages that contain the remote RPC name that sent the message
 */
export interface RpcBaseData {
    sourceName?: string;
    sourceSubName?: string;
}
/**
 * Rpc init command data.
 */
export interface RpcInitData {
    locale: string;
    sessionId: string;
    modules: any[];
    theme: string;
    assets: MsftSme.MsftSmeAssets;
    accessibilityMode: boolean;
}
/**
 * Rpc init result data.
 */
export interface RpcInitResult {
    version: string;
}
/**
 * The interface for the inbound init data with some extra information like remote name and other information
 */
export interface RpcInitDataInboundInternal extends RpcInitData, RpcBaseData {
}
/**
 * Rpc open state.
 */
export declare enum RpcOpenState {
    /**
     * Opened.
     */
    Opened = 0,
    /**
     * Failed.
     */
    Failed = 1,
    /**
     * In progress.
     */
    InProgress = 2,
}
/**
 * Rpc open command data.
 */
export interface RpcOpenData {
    /**
     * The path to open inside of module.
     */
    path: string;
    /**
     * The option parameters to open inside of module.
     */
    parameters?: any;
}
/**
 * The interface for the inbound open data with some extra information like remote name and other information
 */
export interface RpcOpenDataInboundInternal extends RpcOpenData, RpcBaseData {
}
/**
 * Rpc result data from open command.
 */
export interface RpcOpenResult {
    /**
     * The open result state.
     */
    state: RpcOpenState;
    /**
     * Waited and holding time.
     */
    waitedTime: number;
    /**
     * Error reason message if any.
     */
    error?: string;
}
/**
 * Rpc deactivate state.
 */
export declare enum RpcDeactivateState {
    /**
     * Deactivated.
     */
    Deactivated = 0,
    /**
     * Cancelled.
     */
    Cancelled = 1,
    /**
     * In progress.
     */
    InProgress = 2,
}
export interface RpcDeactivateResult {
    /**
     * Rpc deactivate state.
     */
    state: RpcDeactivateState;
    /**
     * Waited and holding time.
     */
    waitedTime: number;
}
/**
 * Rpc shutdown command data.
 */
export interface RpcShutdownData extends RpcBaseData {
    /**
     * Shutdown is forced.
     */
    force: boolean;
}
/**
 * Rpc shutdown result.
 */
export interface RpcShutdownResult {
    /**
     * Indicate if it can shutdown now.
     */
    canShutdown: boolean;
}
export interface RpcPingData {
    /**
     * The name of ping request.
     */
    name: string;
}
export interface RpcPingResult extends RpcPingData {
}
/**
 * Rpc commands that Shell initiates to communicate a module (tool).
 */
export declare enum RpcOutboundCommands {
    Init = 100,
    Open = 101,
    Activate = 102,
    Deactivate2 = 103,
    Shutdown = 104,
    Ping = 105,
    Forward = 106,
}
/**************************************************************************************************************************
 * Inbound commands set.
 **************************************************************************************************************************/
/**
 * Rpc report command data.
 */
export interface RpcReportData {
    /**
     * The relative path to report in the browser url
     */
    path?: string;
    /**
     * The relative path originally requested to open.
     */
    beforeRedirectedPath?: string;
    /**
     * The data to reports to the shell
     */
    selectablePath?: SelectablePath[];
}
/**
 * The interface for the inbound report data with some extra information like remote name and other information
 */
export interface RpcReportDataInboundInternal extends RpcBaseData, RpcReportData {
}
/**
 * Represents each of the items that could be used in a path selector to delve up
 */
export interface SelectablePath {
    /**
     * The string to display for each delve level bar
     */
    label: string;
    /**
     * The path to which this selectable path item will navigate to
     */
    path: string;
    /**
     * Any query parameters to add to the path
     */
    params: {
        [key: string]: any;
    };
}
/**
 * Rpc log record.
 */
export interface RpcLogRecord extends RpcBaseData, LogRecord {
    /**
     * The client session ID which is auto generated when user opened the site.
     * This should be auto inserted when logging submitted to the back-end.
     */
    sessionId: string;
    /**
     * The timestamp. Date.now() / the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
     */
    timestamp: number;
}
/**
 * Rpc telemetry record.
 */
export interface RpcTelemetryRecord extends RpcBaseData, TelemetryRecord {
    /**
     * The client session ID which is auto generated when user opened the site.
     * This should be auto inserted when logging submitted to the back-end.
     */
    sessionId: string;
    /**
     * The timestamp. Date.now() / the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
     */
    timestamp: number;
}
/**
 * Rpc notification record data.
 */
export interface RpcNotification extends RpcBaseData, ClientNotification {
    /**
     * node name.
     */
    nodeName: string;
    /**
     * The timestamp. Date.now() / the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
     */
    timestamp: number;
}
/**
 * Rpc work item data.
 */
export interface RpcWorkItem extends RpcBaseData, WorkItemRequest {
    /**
     * node name.
     */
    nodeName: any;
    /**
     * The timestamp. Date.now() / the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
     */
    timestamp: number;
}
/**
 * Rpc work item result data.
 */
export interface RpcWorkItemResult extends WorkItemResult {
}
/**
 * Rpc update data.
 */
export interface RpcUpdateData extends RpcBaseData {
    /**
     * Results data.
     */
    results: any;
}
export declare enum RpcSeekMode {
    /**
     * Create new inbound rpc on the shell.
     */
    Create = 0,
    /**
     * Delete existing inbound rpc on the shell.
     */
    Delete = 1,
}
export interface RpcSeek extends RpcBaseData {
    /**
     * Type of seek request.
     */
    mode: RpcSeekMode;
}
/**
 * Rpc Seek result.
 */
export interface RpcSeekResult {
    /**
     * name of module.
     */
    name: string;
    /**
     * sub name of frame instance.
     */
    subName: string;
}
/**
 * Rpc Find work item result data.
 */
export interface RpcWorkItemFind extends WorkItemFind, RpcBaseData {
}
/**
 * Rpc Find work item result.
 */
export interface RpcWorkItemFindResult extends WorkItemFindResult {
}
/**
 * Rpc Shell navigate data.
 */
export interface RpcShellNavigate extends RpcBaseData {
    /**
     * the solution definition.
     */
    solution?: {
        /**
         * the solution module name.
         */
        moduleName: string;
        /**
         * the entry point name of the solution module.
         * (if not specified, take the default entry point.)
         */
        entryPointName?: string;
    };
    /**
     * the tool definition.
     */
    tool?: {
        /**
         * the tool module name.
         */
        moduleName: string;
        /**
         * the entry point name of the tool module.
         * (if not specified, take the default entry point.)
         */
        entryPointName?: string;
    };
    /**
     * the connection definition.
     * (if not specified, take the current connection.)
     */
    connection?: {
        /**
         * the connection name.
         */
        name: string;
        /**
         * the connection type.
         */
        type: string;
    };
    /**
     * the nested tool's url within the toolModule/toolName.
     * this include optional parameters.
     */
    toolNestedUrlAndOptions?: string;
    /**
     * the navigate next call.
     */
    navigateNext?: string;
    /**
     * the flag indicating to force reloading browser after navigate.
     */
    reload?: boolean;
}
/**
 * Rpc Shell navigate result.
 */
export interface RpcShellNavigateResult {
    /**
     * result status of navigation.
     */
    status: boolean;
}
/**
 * Identifies the scope that these settings have
 */
export declare enum RpcSettingsScope {
    /**
     * User Settings Scope
     */
    User = 0,
    /**
     * Application Settings Scope (All Users)
     */
    Application = 1,
}
/**
 * Identifies the type of provider that owns these settings
 */
export declare enum RpcSettingsProviderType {
    /**
     * Common provider type, indicates that these settings are owned by the common provider (shell)
     */
    Common = 0,
    /**
     * Extension access type, indicates that these settings are owned by the current extension
     */
    Extension = 1,
}
/**
 * Identifies the user profile operation type to preform
 */
export declare enum RpcSettingsOperationType {
    /**
     * Get Operation Type
     */
    Get = 0,
    /**
     * Set Operation Type
     */
    Set = 1,
}
/**
 * Rpc Settings data.
 */
export interface RpcSettings extends RpcBaseData {
    /**
     * Type of user profile operation to perform
     */
    operation: RpcSettingsOperationType;
    /**
     * The scope of this operation
     */
    scope: RpcSettingsScope;
    /**
     * Type of access that this operation will have
     */
    provider: RpcSettingsProviderType;
    /**
     * The value for set opeerations
     */
    value?: PlainVersionedObject;
}
/**
 * Rpc Settings operation result.
 */
export interface RpcSettingsResult {
    /**
     * Data response of the operation if data was requested
     */
    data?: PlainVersionedObject;
}
/**
 * Rpc commands that a Module (tool) initiates to communicate Shell.
 */
export declare enum RpcInboundCommands {
    Report = 200,
    Failed = 201,
    Log = 202,
    Telemetry = 203,
    Notification = 204,
    Forward = 205,
    WorkItem = 206,
    UpdateData = 207,
    Seek = 208,
    WorkItemFind = 209,
    ShellNavigate = 210,
    Dialog = 211,
    Settings = 212,
}
/**************************************************************************************************************************
 * Handlers for each rpc request.
 **************************************************************************************************************************/
/**
 * Rpc command handlers that a module (tool) handles.
 */
export interface RpcOutboundHandlers {
    initHandler: (data: RpcInitDataInboundInternal) => Promise<RpcInitResult>;
    openHandler: (data: RpcOpenDataInboundInternal) => Promise<RpcOpenResult>;
    activateHandler: (data: RpcBaseData) => Promise<void>;
    deactivate2Handler: (data: RpcBaseData) => Promise<RpcDeactivateResult>;
    shutdownHandler: (data: RpcShutdownData) => Promise<RpcShutdownResult>;
    pingHandler: (data: RpcPingData) => Promise<RpcPingResult>;
    forwardHandler: (data: RpcForwardReportData) => Promise<RpcForwardResponse<any>>;
}
/**
 * Rpc command handlers that Shell handles.
 */
export interface RpcInboundHandlers {
    reportHandler: (data: RpcReportDataInboundInternal) => Promise<void>;
    failedHandler: (data: RpcBaseData) => Promise<void>;
    logHandler: (data: RpcLogRecord) => Promise<void>;
    telemetryHandler: (data: RpcTelemetryRecord) => Promise<void>;
    notificationHandler: (data: RpcNotification) => Promise<void>;
    forwardHandler: (data: RpcForwardReportData) => Promise<RpcForwardResponse<any>>;
    workItemHandler: (data: RpcWorkItem) => Promise<RpcWorkItemResult>;
    updateDataHandler: (data: RpcUpdateData) => Promise<void>;
    seekHandler: (data: RpcSeek) => Promise<RpcSeekResult>;
    workItemFindHandler: (data: RpcWorkItemFind) => Promise<RpcWorkItemFindResult>;
    shellNavigationHandler: (data: RpcShellNavigate) => Promise<RpcShellNavigateResult>;
    dialogHandler: (data: RpcDialogData) => Promise<RpcDialogResult>;
    settingsHandler: (data: RpcSettings) => Promise<RpcSettingsResult>;
}
/**
 * Type of the callback that handles messages with extra information
 * as defined by RpcBaseData
 */
export interface CommandCallBackType {
    (data: RpcBaseData): Promise<any>;
}
/**
 * The type of RpcBase object.
 */
export declare enum RpcType {
    Channel = 0,
    Inbound = 1,
    Outbound = 2,
}
/**
 * Rpc base class.
 */
export declare abstract class RpcBase {
    rpcChannel: RpcChannel;
    name: string;
    origin: string;
    type: RpcType;
    window: Window;
    commandCollection: Map<string, CommandCallBackType>;
    /**
     * The sub name created dynamically when Outbound/Inbound communication is established.
     */
    subName: string;
    /**
     * The depth of frame.
     */
    depth: number;
    /**
     * The version of remote module.
     */
    version?: string;
    /**
     * Gets the inbound handler map.
     */
    static readonly inboundHandlerMap: {
        [index: number]: string;
    };
    /**
     * Gets the outbound handler map.
     */
    static readonly outboundHandlerMap: {
        [index: number]: string;
    };
    /**
     * Initializes a new instance of the RpcBase class.
     *
     * @param rpcChannel the rpc channel object..
     * @param name the public name of Shell or Module (tool).
     * @param origin the origin url to start Shell or Module (tool).
     */
    constructor(rpcChannel: RpcChannel, name: string, origin: string, type: RpcType);
    /**
     * Handle the command with data object.
     *
     * @param command the command name.
     * @param sourceName the name of the remote rpc that sent the request.
     * @param sourceSubName the sub name of the remote rpc that sent the request.
     * @param data the data object.
     * @return Promise<any> the promise object.
     */
    handle(command: string, sourceName: string, sourceSubName: string, data: any): Promise<any>;
    /**
     * Register the handler to the command.
     *
     * @param command the command name.
     * @param handler the handler function.
     */
    register(command: string, handler: CommandCallBackType): void;
}
