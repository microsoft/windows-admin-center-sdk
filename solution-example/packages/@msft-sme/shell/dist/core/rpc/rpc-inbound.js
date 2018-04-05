var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { NativeQ } from '../data/native-q';
import { RpcBase, rpcCommandVersion, RpcInboundCommands, RpcOutboundCommands, RpcType } from './rpc-base';
/**
 * RpcToShell class.
 * - Module (tool) uses the instance to communicate to Shell.
 */
var RpcInbound = (function (_super) {
    __extends(RpcInbound, _super);
    /**
     * Initiates a new instance of the RpcToShell class.
     *
     * @param rpcChannel the rpc channel.
     * @param name the public name of the module.
     * @param origin the origin url.
     */
    function RpcInbound(rpcChannel, name, origin) {
        var _this = _super.call(this, rpcChannel, name, origin, RpcType.Inbound) || this;
        var commands = Object.keys(RpcOutboundCommands);
        commands.forEach(function (command, index, array) {
            _this.register(command, _this.emptyHandler);
        });
        return _this;
    }
    /**
     * Registers all handlers at once.
     *
     * @param handlers the Shell handlers.
     */
    RpcInbound.prototype.registerAll = function (handlers) {
        var _this = this;
        var map = RpcBase.outboundHandlerMap;
        var commands = Object.keys(RpcOutboundCommands);
        commands.forEach(function (command, index, array) {
            _this.register(command, handlers[map[RpcOutboundCommands[command]]]);
        });
    };
    /**
     * The ready command.
     *
     * @param data the RpcReportData object.
     * @return Promise<void> the promise object.
     */
    RpcInbound.prototype.report = function (data) {
        return this.rpcChannel.post(this, { command: RpcInboundCommands[RpcInboundCommands.Report], version: rpcCommandVersion, data: data });
    };
    /**
     * The failed command.
     *
     * @param data the RpcBaseData object.
     * @return Promise<void> the promise object.
     */
    RpcInbound.prototype.failed = function (data) {
        return this.rpcChannel.post(this, { command: RpcInboundCommands[RpcInboundCommands.Failed], version: rpcCommandVersion, data: data });
    };
    /**
     * The log command.
     *
     * @param data the RpcLogRecord object.
     * @return Promise<void> the promise object.
     */
    RpcInbound.prototype.log = function (data) {
        return this.rpcChannel.post(this, { command: RpcInboundCommands[RpcInboundCommands.Log], version: rpcCommandVersion, data: data });
    };
    /**
     * The telemetry command.
     *
     * @param data the RpcTelemetryRecord object.
     * @return Promise<any> the promise object.
     */
    RpcInbound.prototype.telemetry = function (data) {
        return this.rpcChannel.post(this, { command: RpcInboundCommands[RpcInboundCommands.Telemetry], version: rpcCommandVersion, data: data });
    };
    /**
     * The notification command.
     *
     * @param data the RpcNotification object.
     * @return Promise<any> the promise object.
     */
    RpcInbound.prototype.notify = function (data) {
        return this.rpcChannel.post(this, { command: RpcInboundCommands[RpcInboundCommands.Notification], version: rpcCommandVersion, data: data });
    };
    /**
     * The forward command.
     *
     * @param data the RpcForwardReportData object.
     * @return Promise<void> the promise object.
     */
    RpcInbound.prototype.forward = function (data) {
        return this.rpcChannel.post(this, { command: RpcInboundCommands[RpcInboundCommands.Forward], version: rpcCommandVersion, data: data });
    };
    /**
     * The submit or query work item command.
     *
     * @param data the RpcWorkItem object.
     * @return Promise<RpcWorkItemResult> the promise object.
     */
    RpcInbound.prototype.submitOrQueryWorkItem = function (data) {
        return this.rpcChannel.post(this, { command: RpcInboundCommands[RpcInboundCommands.WorkItem], version: rpcCommandVersion, data: data });
    };
    /**
     * The update data command to shell or parent frame.
     *
     * @param data the RpcUpdateData object.
     * @return Promise<void> the promise object.
     */
    RpcInbound.prototype.updateData = function (data) {
        return this.rpcChannel.post(this, { command: RpcInboundCommands[RpcInboundCommands.UpdateData], version: rpcCommandVersion, data: data });
    };
    /**
     * The seek command to verify the shell or parent frame.
     *
     * @param data the RpcBaseData object.
     * @return Promise<RpcSeekResult> the promise object.
     */
    RpcInbound.prototype.seek = function (data) {
        return this.rpcChannel.post(this, { command: RpcInboundCommands[RpcInboundCommands.Seek], version: rpcCommandVersion, data: data });
    };
    /**
     * The find work item command to retrieve current work items by module/node/type.
     *
     * @param data the RpcWorkItemFind object.
     * @return Promise<RpcWorkItemFindResult> the promise object.
     */
    RpcInbound.prototype.workItemFind = function (data) {
        return this.rpcChannel.post(this, { command: RpcInboundCommands[RpcInboundCommands.WorkItemFind], version: rpcCommandVersion, data: data });
    };
    /**
     * The navigate to a solution, a connection, a module and/or an entry point.
     *
     * @param data the RpcShellNavigate object.
     * @return Promise<RpcQueryNotificationResult> the promise object.
     */
    RpcInbound.prototype.shellNavigate = function (data) {
        return this.rpcChannel.post(this, { command: RpcInboundCommands[RpcInboundCommands.ShellNavigate], version: rpcCommandVersion, data: data });
    };
    /**
     * The dialog request to shell.
     *
     * @param data the RpcDialogData object.
     * @return Promise<RpcDialogResult> the promise object.
     */
    RpcInbound.prototype.dialog = function (data) {
        return this.rpcChannel.post(this, { command: RpcInboundCommands[RpcInboundCommands.Dialog], version: rpcCommandVersion, data: data });
    };
    /**
     * The empty handler to response always resolved.
     *
     * @param data the RpcBaseData context.
     * @return Promise<string> the promise.
     */
    RpcInbound.prototype.emptyHandler = function (data) {
        return NativeQ.resolved('emptyHandler');
    };
    return RpcInbound;
}(RpcBase));
export { RpcInbound };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcnBjL3JwYy1pbmJvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQWtCLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTNELE9BQU8sRUFDSCxPQUFPLEVBRVAsaUJBQWlCLEVBQ2pCLGtCQUFrQixFQUdsQixtQkFBbUIsRUFPbkIsT0FBTyxFQU9WLE1BQU0sWUFBWSxDQUFDO0FBS3BCOzs7R0FHRztBQUNIO0lBQWdDLDhCQUFPO0lBQ25DOzs7Ozs7T0FNRztJQUNILG9CQUFZLFVBQXNCLEVBQUUsSUFBWSxFQUFFLE1BQWM7UUFBaEUsWUFDSSxrQkFBTSxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBS25EO1FBSkcsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2hELFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUs7WUFDbkMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDOztJQUNQLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksZ0NBQVcsR0FBbEIsVUFBbUIsUUFBNkI7UUFBaEQsaUJBTUM7UUFMRyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUM7UUFDckMsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2hELFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUs7WUFDbkMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RSxDQUFDLENB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