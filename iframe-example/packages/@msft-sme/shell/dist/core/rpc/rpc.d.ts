import { Observable } from 'rxjs/Observable';
import { NativeDeferred } from '../data/native-q';
import { RpcDeactivateResult, RpcInboundCommands, RpcInitResult, RpcLogRecord, RpcNotification, RpcOpenResult, RpcOutboundCommands, RpcReportData, RpcReportDataInboundInternal, RpcSeekMode, RpcSeekResult, RpcSettings, RpcSettingsResult, RpcShellNavigate, RpcShellNavigateResult, RpcShutdownResult, RpcTelemetryRecord, RpcUpdateData, RpcWorkItem, RpcWorkItemFind, RpcWorkItemFindResult, RpcWorkItemResult } from './rpc-base';
import { RpcDialogData, RpcDialogResult } from './rpc-dialogs';
import { RpcForwardReportData, RpcForwardResponse } from './rpc-forward-report-data';
import { RpcManager, RpcRemoteState } from './rpc-manager';
/**
 * Deferred data object.
 */
export interface DeferredData<TData, TResult> {
    deferred: NativeDeferred<TResult>;
    data: TData;
}
/**
 * Interface that indicates the status of the RPC remote endpoint
 */
export interface RpcRemoteStatusData {
    /**
     * The status of the remote RPC endpoint
     */
    status: RpcRemoteState;
    /**
     * The sub name of the opened iframe instance.
     */
    subName: string;
    /**
     * The entry point to load the iframe as src.
     */
    entryPoint: string;
}
/**
 * The RPC report Data object that includes the status of the remote RPC endpoint
 * that is the source of the message. This interface is used in the RPC endpoint that is receiving
 * the data. The PRC endpoint sending the data shouls use RpcReportData instead
 */
export interface RpcReportDataInbound extends RpcReportDataInboundInternal, RpcRemoteStatusData {
}
/**
 * The Rpc class.
 */
export declare class Rpc {
    private static rpcTimeout;
    /**
     * This subject is updated whenever there's new reported data
     */
    private rpcSubjects;
    /**
     * Deferred response collection.
     */
    private deferredCollection;
    /**
     * Active status of rpc by Observable.
     */
    private stateChangedInternal;
    /**
     * Active status of rpc.
     */
    private stateActiveInternal;
    /**
     * Inbound module handlers to process when rpc is called.
     *  - called from Module to Shell.
     */
    private rpcInboundHandlers;
    /**
     * Outbound shell handlers to process when rpc is called.
     *  - called from Shell to Module.
     *  - if code reached a handler, module is not ready yet.
     *    set timeout for RPC call.
     */
    private rpcOutboundHandlers;
    /**
     * Rpc manager object.
     */
    rpcManager: RpcManager;
    /**
     * Initializes a new instance of the Rpc class.
     *
     * @param http the Http class instance injected.
     */
    constructor();
    /**
     * Gets observable to watch the state change.
     */
    readonly stateChanged: Observable<boolean>;
    /**
     * Gets the state of rpc.
     */
    readonly stateActive: boolean;
    /**
     * Gets whether rpc is running on the shell.
     */
    readonly isShell: boolean;
    /**
     * Initializes Rpc configuration
     */
    init(): void;
    /***************************************************************
     * Section for Shell usage.
     ***************************************************************/
    /**
     * This updates its value every time there's a reported data from the rpc channel
     */
    moduleSubjects<T>(commandType: RpcInboundCommands): Observable<DeferredData<T, any>>;
    /**
     * Connect a module with name and iframe.
     * - start pinging to iframe to wait for response.
     *
     * @param name the name of the module.
     * @param path the path to open the module the module name.
     * @param iframe the iframe window object.
     * @param primary the primary window to affect router url.
     * @return Promise<string> the promise with subName created for the window.
     */
    moduleConnect(name: string, path: string, iframe: Window, primary: boolean): Promise<string>;
    /**
     * Init the module.
     *
     * @param name the name of module.
     * @param subName the sub name of rpc channel.
     * @return Promise<void> the promise object of init result.
     */
    moduleInit(name: string, subName: string): Promise<RpcInitResult>;
    /**
     * Open the module by specifying the path and parameters.
     *
     * @param name the name of module.
     * @param subName the sub name of rpc channel.
     * @param path the open path.
     * @param parameters the parameters if any.
     * @return Promise<RpcOpenResult> the promise object of RpcOpenResult.
     */
    moduleOpen(name: string, subName: string, path: string, parameters?: any): Promise<RpcOpenResult>;
    /**
     * Activate the module to start receiving data.
     *
     * @param name the module name.
     * @param subName the sub name of rpc channel.
     * @param primary the primary window to affect router url.
     * @return Promise<void> the promise of activation result.
     */
    moduleActivate(name: string, subName: string, primary: boolean): Promise<void>;
    /**
     * Deactivate 2 the module to stop receiving data.
     *
     * @param name the module name.
     * @param subName the sub name of rpc channel.
     * @param primary the primary window to affect router url.
     * @return Promise<void> the promise of deactivation result.
     */
    moduleDeactivate2(name: string, subName: string, primary: boolean): Promise<RpcDeactivateResult>;
    /**
     * Request to shutdown the module.
     *
     * @param name the module name.
     * @param subName the sub name of rpc channel.
     * @param primary the primary window to affect router url.
     * @param force the forcible state.
     * @return Promise<RpcShutdownResult> the promise object of result.
     */
    moduleShutdown(name: string, subName: string, primary: boolean, force: boolean): Promise<RpcShutdownResult>;
    /**
     * Remove the module from the rpc channel.
     *
     * @param name the module name.
     * @param subName the sub name of rpc channel.
     */
    moduleRemove(name: string, subName: string): void;
    /**
     * Get module version string.
     *
     * @param name the name of module.
     * @param subName the sub name of rpc channel.
     * @return string the RPC version of module.
     */
    moduleVersion(name: string, subName: string): string;
    /***************************************************************
     * Section for Either usage.
     ***************************************************************/
    /**
     * report a forward update from the shell or module
     */
    forward(data: RpcForwardReportData): Promise<RpcForwardResponse<any>>;
    /***************************************************************
     * Section for Module usage.
     ***************************************************************/
    /**
     * Accept delay register in case of loading/initialization took a time for module.
     *
     * @param command the RPC Shell command.
     * @param handler the handler to handle Shell request.
     */
    register(command: RpcOutboundCommands, handler: (data: any) => Promise<any>): void;
    /**
     * Module report the path update information to shell.
     */
    report(data: RpcReportData): Promise<void>;
    /**
     * Module report a failure.
     */
    failed(data: any): Promise<void>;
    /**
     * Module report a logging data.
     */
    log(data: RpcLogRecord): Promise<void>;
    /**
     * Module report a telemetry information.
     */
    telemetry(data: RpcTelemetryRecord): Promise<void>;
    /**
     * Module report a notification update.
     *
     * @param data the rpc notification request.
     */
    notify(data: RpcNotification): Promise<void>;
    /**
     * Module submit or query a work item.
     *
     * @param data the rpc work item request.
     */
    submitOrQueryWorkItem(data: RpcWorkItem): Promise<RpcWorkItemResult>;
    /**
     * Module update any data results.
     *
     * @param data the rcp completed results data.
     */
    updateData(name: string, subName: string, data: RpcUpdateData): Promise<void>;
    /**
     * Seek shell frame.
     *
     * @param Promise<any> the promise object.
     */
    seekShell(mode: RpcSeekMode): Promise<RpcSeekResult>;
    /**
     * Find work items.
     *
     * @param data the query notification data.
     * @return Promise<RpcWorkItemFindResult> the promise of RpcWorkItemFindResult.
     */
    workItemFind(data: RpcWorkItemFind): Promise<RpcWorkItemFindResult>;
    /**
     * Shell navigation.
     *
     * @param data the navigation data to the shell.
     * @return Promise<RpcShellNavigateResult> the promise of RpcShellNavigateResult.
     */
    shellNavigate(data: RpcShellNavigate): Promise<RpcShellNavigateResult>;
    /**
     * The dialog request to shell.
     *
     * @param data the RpcDialogData object.
     * @return Promise<RpcDialogResult> the promise object.
     */
    dialog(data: RpcDialogData): Promise<RpcDialogResult>;
    /**
     * User Profile
     *
     * @param data the user profile operation data
     * @return Promise<RpcSettingsResult> the promise of RpcSettingsResult.
     */
    settings(data: RpcSettings): Promise<RpcSettingsResult>;
    /**
     * Validate existing outbound connection and remove if it doesn't live anymore.
     *
     * @return number the count of removed outbound.
     */
    validate(): number;
    /**
     * Change the active status of rpc.
     */
    changeActiveState(state: boolean): void;
    /**
     * Create auto-failed timered promise.
     *
     * @param command the outbound commmand type.
     * @param timeoutMs the timeout milliseconds.
     * @param data the data context.
     * @return Promise<any> the promise.
     */
    private createTimerPromise<TData, TResult>(command, timeoutMs, data);
    /**
     * Create promise that does not timeout.
     *
     * @param command the outbound type.
     * @param data the data context.
     * @return Promise<any> the promise.
     */
    private createPromise<TData, TResult>(command, data);
    /**
     * Process data pushing into next call of subject with defered data type.
     *
     * @param command the inbound command type.
     * @param data the rpc data came from a module/iframe.
     * @return Promise the promise which receiver must settle within fixed waiting time (10 seconds)
     */
    private processNextForSubject<TData, TResult>(command, data);
}
