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
import { RpcDialogType } from './rpc-dialogs';
/**
 * RpcToShell class.
 * - Module (tool) uses the instance to communicate to Shell.
 */
var RpcInbound = /** @class */ (function (_super) {
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
        /**
         * Elements that open a dialog, used for resuming focus
         */
        _this.dialogOrigins = {};
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
        var _this = this;
        if (data.type === RpcDialogType.OpenMessageDialog || data.type === RpcDialogType.OpenConfirmationDialog
            || data.type === RpcDialogType.OpenConfirmationListDialog) {
            var origin = document.activeElement;
            if (origin) {
                this.dialogOrigins[data.dialogId] = origin;
            }
        }
        return this.rpcChannel.post(this, { command: RpcInboundCommands[RpcInboundCommands.Dialog], version: rpcCommandVersion, data: data }).then(function (result) {
            if (data.type === RpcDialogType.Close) {
                _this.resumeFocus(data.dialogId);
            }
            return result;
        });
    };
    /**
     * Performs user profile operations
     *
     * @param data the RpcSettings object.
     * @return Promise<RpcSettingsResult> the promise object.
     */
    RpcInbound.prototype.settings = function (data) {
        return this.rpcChannel.post(this, { command: RpcInboundCommands[RpcInboundCommands.Settings], version: rpcCommandVersion, data: data });
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
    /**
     * Resume focus back to the original element that shows the dialog.
     * @param id The id of dialog
     */
    RpcInbound.prototype.resumeFocus = function (id) {
        var _this = this;
        if (this.dialogOrigins[id]) {
            setTimeout(function () {
                _this.dialogOrigins[id].focus();
                delete _this.dialogOrigins[id];
            }, 0);
        }
    };
    return RpcInbound;
}(RpcBase));
export { RpcInbound };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcnBjL3JwYy1pbmJvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQWtCLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTNELE9BQU8sRUFDSCxPQUFPLEVBRVAsaUJBQWlCLEVBQ2pCLGtCQUFrQixFQUdsQixtQkFBbUIsRUFTbkIsT0FBTyxFQU9WLE1BQU0sWUFBWSxDQUFDO0FBRXBCLE9BQU8sRUFBa0MsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzlFOzs7R0FHRztBQUNIO0lBQWdDLDhCQUFPO0lBTW5DOzs7Ozs7T0FNRztJQUNILG9CQUFZLFVBQXNCLEVBQUUsSUFBWSxFQUFFLE1BQWM7UUFBaEUsWUFDSSxrQkFBTSxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBS25EO1FBbEJEOztXQUVHO1FBQ0ssbUJBQWEsR0FBcUMsRUFBRSxDQUFDO1FBV3pELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNoRCxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLO1lBQ25DLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQzs7SUFDUCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGdDQUFXLEdBQWxCLFVBQW1CLFFBQTZCO1FBQWhELGlCQU1DO1FBTEcsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1FBQ3JDLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNoRCxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLO1lBQ25DLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FB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TSxHQUFHLFFBQVEsQ0FBQyxhQUE0QixDQUFDO1lBQ3JELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBQy9DLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUN2QixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU07WUFDbEgsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsQ0FBQztZQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSw2QkFBUSxHQUFmLFVBQWdCLElBQWlCO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDdkIsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNwSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxpQ0FBWSxHQUFwQixVQUFxQixJQUFpQjtRQUNsQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBTSxjQUFjLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksZ0NBQVcsR0FBbEIsVUFBbUIsRUFBVTtRQUE3QixpQkFTQztRQVJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLFVBQVUsQ0FDTjtnQkFDQyxLQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUMvQixPQUFPLEtBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDL0IsQ0FBQyxFQUNELENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztJQUNMLENBQUM7SUFDTCxpQkFBQztBQUFELENBck5BLEFBcU5DLENBck4rQixPQUFPLEdBcU50QyIsImZpbGUiOiJycGMtaW5ib3VuZC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=