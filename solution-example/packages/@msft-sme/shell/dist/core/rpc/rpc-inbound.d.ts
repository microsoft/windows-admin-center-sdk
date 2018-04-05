import { RpcBase, RpcBaseData, RpcLogRecord, RpcNotification, RpcOutboundHandlers, RpcReportData, RpcSeekResult, RpcShellNavigate, RpcShellNavigateResult, RpcTelemetryRecord, RpcUpdateData, RpcWorkItem, RpcWorkItemFind, RpcWorkItemFindResult, RpcWorkItemResult } from './rpc-base';
import { RpcChannel } from './rpc-channel';
import { RpcDialogData, RpcDialogResult } from './rpc-dialogs';
import { RpcForwardReportData, RpcForwardResponse } from './rpc-forward-report-data';
/**
 * RpcToShell class.
 * - Module (tool) uses the instance to communicate to Shell.
 */
export declare class RpcInbound extends RpcBase {
    /**
     * Initiates a new instance of the RpcToShell class.
     *
     * @param rpcChannel the rpc channel.
     * @param name the public name of the module.
     * @param origin the origin url.
     */
    constructor(rpcChannel: RpcChannel, name: string, origin: string);
    /**
     * Registers all handlers at once.
     *
     * @param handlers the Shell handlers.
     */
    registerAll(handlers: RpcOutboundHandlers): void;
    /**
     * The ready command.
     *
     * @param data the RpcReportData object.
     * @return Promise<void> the promise object.
     */
    report(data: RpcReportData): Promise<void>;
    /**
     * The failed command.
     *
     * @param data the RpcBaseData object.
     * @return Promise<void> the promise object.
     */
    failed(data: RpcBaseData): Promise<void>;
    /**
     * The log command.
     *
     * @param data the RpcLogRecord object.
     * @return Promise<void> the promise object.
     */
    log(data: RpcLogRecord): Promise<void>;
    /**
     * The telemetry command.
     *
     * @param data the RpcTelemetryRecord object.
     * @return Promise<any> the promise object.
     */
    telemetry(data: RpcTelemetryRecord): Promise<void>;
    /**
     * The notification command.
     *
     * @param data the RpcNotification object.
     * @return Promise<any> the promise object.
     */
    notify(data: RpcNotification): Promise<void>;
    /**
     * The forward command.
     *
     * @param data the RpcForwardReportData object.
     * @return Promise<void> the promise object.
     */
    forward(data: RpcForwardReportData): Promise<RpcForwardResponse<any>>;
    /**
     * The submit or query work item command.
     *
     * @param data the RpcWorkItem object.
     * @return Promise<RpcWorkItemResult> the promise object.
     */
    submitOrQueryWorkItem(data: RpcWorkItem): Promise<RpcWorkItemResult>;
    /**
     * The update data command to shell or parent frame.
     *
     * @param data the RpcUpdateData object.
     * @return Promise<void> the promise object.
     */
    updateData(data: RpcUpdateData): Promise<void>;
    /**
     * The seek command to verify the shell or parent frame.
     *
     * @param data the RpcBaseData object.
     * @return Promise<RpcSeekResult> the promise object.
     */
    seek(data: RpcBaseData): Promise<RpcSeekResult>;
    /**
     * The find work item command to retrieve current work items by module/node/type.
     *
     * @param data the RpcWorkItemFind object.
     * @return Promise<RpcWorkItemFindResult> the promise object.
     */
    workItemFind(data: RpcWorkItemFind): Promise<RpcWorkItemFindResult>;
    /**
     * The navigate to a solution, a connection, a module and/or an entry point.
     *
     * @param data the RpcShellNavigate object.
     * @return Promise<RpcQueryNotificationResult> the promise object.
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
     * The empty handler to response always resolved.
     *
     * @param data the RpcBaseData context.
     * @return Promise<string> the promise.
     */
    private emptyHandler(data);
}
