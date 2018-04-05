import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
/**
 * History:
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
export var rpcVersion = '0.0.4';
export var rpcCommandVersion = '0.0.0';
/**
 * Rpc open state.
 */
export var RpcOpenState;
(function (RpcOpenState) {
    /**
     * Opened.
     */
    RpcOpenState[RpcOpenState["Opened"] = 0] = "Opened";
    /**
     * Failed.
     */
    RpcOpenState[RpcOpenState["Failed"] = 1] = "Failed";
    /**
     * In progress.
     */
    RpcOpenState[RpcOpenState["InProgress"] = 2] = "InProgress";
})(RpcOpenState || (RpcOpenState = {}));
/**
 * Rpc deactivate state.
 */
export var RpcDeactivateState;
(function (RpcDeactivateState) {
    /**
     * Deactivated.
     */
    RpcDeactivateState[RpcDeactivateState["Deactivated"] = 0] = "Deactivated";
    /**
     * Cancelled.
     */
    RpcDeactivateState[RpcDeactivateState["Cancelled"] = 1] = "Cancelled";
    /**
     * In progress.
     */
    RpcDeactivateState[RpcDeactivateState["InProgress"] = 2] = "InProgress";
})(RpcDeactivateState || (RpcDeactivateState = {}));
/**
 * Rpc commands that Shell initiates to communicate a module (tool).
 */
export var RpcOutboundCommands;
(function (RpcOutboundCommands) {
    RpcOutboundCommands[RpcOutboundCommands["Init"] = 100] = "Init";
    RpcOutboundCommands[RpcOutboundCommands["Open"] = 101] = "Open";
    RpcOutboundCommands[RpcOutboundCommands["Activate"] = 102] = "Activate";
    RpcOutboundCommands[RpcOutboundCommands["Deactivate2"] = 103] = "Deactivate2";
    RpcOutboundCommands[RpcOutboundCommands["Shutdown"] = 104] = "Shutdown";
    RpcOutboundCommands[RpcOutboundCommands["Ping"] = 105] = "Ping";
    RpcOutboundCommands[RpcOutboundCommands["Forward"] = 106] = "Forward";
})(RpcOutboundCommands || (RpcOutboundCommands = {}));
;
export var RpcSeekMode;
(function (RpcSeekMode) {
    /**
     * Create new inbound rpc on the shell.
     */
    RpcSeekMode[RpcSeekMode["Create"] = 0] = "Create";
    /**
     * Delete existing inbound rpc on the shell.
     */
    RpcSeekMode[RpcSeekMode["Delete"] = 1] = "Delete";
})(RpcSeekMode || (RpcSeekMode = {}));
/**
 * Rpc commands that a Module (tool) initiates to communicate Shell.
 */
export var RpcInboundCommands;
(function (RpcInboundCommands) {
    RpcInboundCommands[RpcInboundCommands["Report"] = 200] = "Report";
    RpcInboundCommands[RpcInboundCommands["Failed"] = 201] = "Failed";
    RpcInboundCommands[RpcInboundCommands["Log"] = 202] = "Log";
    RpcInboundCommands[RpcInboundCommands["Telemetry"] = 203] = "Telemetry";
    RpcInboundCommands[RpcInboundCommands["Notification"] = 204] = "Notification";
    RpcInboundCommands[RpcInboundCommands["Forward"] = 205] = "Forward";
    RpcInboundCommands[RpcInboundCommands["WorkItem"] = 206] = "WorkItem";
    RpcInboundCommands[RpcInboundCommands["UpdateData"] = 207] = "UpdateData";
    RpcInboundCommands[RpcInboundCommands["Seek"] = 208] = "Seek";
    RpcInboundCommands[RpcInboundCommands["WorkItemFind"] = 209] = "WorkItemFind";
    RpcInboundCommands[RpcInboundCommands["ShellNavigate"] = 210] = "ShellNavigate";
    RpcInboundCommands[RpcInboundCommands["Dialog"] = 211] = "Dialog";
})(RpcInboundCommands || (RpcInboundCommands = {}));
;
/**
 * The type of RpcBase object.
 */
export var RpcType;
(function (RpcType) {
    RpcType[RpcType["Channel"] = 0] = "Channel";
    RpcType[RpcType["Inbound"] = 1] = "Inbound";
    RpcType[RpcType["Outbound"] = 2] = "Outbound";
})(RpcType || (RpcType = {}));
/**
 * Rpc base class.
 */
var RpcBase = (function () {
    /**
     * Initializes a new instance of the RpcBase class.
     *
     * @param rpcChannel the rpc channel object..
     * @param name the public name of Shell or Module (tool).
     * @param origin the origin url to start Shell or Module (tool).
     */
    function RpcBase(rpcChannel, name, origin, type) {
        this.rpcChannel = rpcChannel;
        this.name = name;
        this.origin = origin;
        this.type = type;
        // command collection to handle.
        this.commandCollection = new Map();
    }
    Object.defineProperty(RpcBase, "inboundHandlerMap", {
        /**
         * Gets the inbound handler map.
         */
        get: function () {
            var map = {};
            map[RpcInboundCommands.Report] = 'reportHandler';
            map[RpcInboundCommands.Failed] = 'failedHandler';
            map[RpcInboundCommands.Log] = 'logHandler';
            map[RpcInboundCommands.Telemetry] = 'telemetryHandler';
            map[RpcInboundCommands.Notification] = 'notificationHandler';
            map[RpcInboundCommands.Forward] = 'forwardHandler';
            map[RpcInboundCommands.WorkItem] = 'workItemHandler';
            map[RpcInboundCommands.UpdateData] = 'updateDataHandler';
            map[RpcInboundCommands.Seek] = 'seekHandler';
            map[RpcInboundCommands.WorkItemFind] = 'workItemFindHandler';
            map[RpcInboundCommands.ShellNavigate] = 'shellNavigationHandler';
            map[RpcInboundCommands.Dialog] = 'dialogHandler';
            return map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RpcBase, "outboundHandlerMap", {
        /**
         * Gets the outbound handler map.
         */
        get: function () {
            var map = {};
            map[RpcOutboundCommands.Init] = 'initHandler';
            map[RpcOutboundCommands.Open] = 'openHandler';
            map[RpcOutboundCommands.Activate] = 'activateHandler';
            map[RpcOutboundCommands.Deactivate2] = 'deactivate2Handler';
            map[RpcOutboundCommands.Shutdown] = 'shutdownHandler';
            map[RpcOutboundCommands.Ping] = 'pingHandler';
            map[RpcOutboundCommands.Forward] = 'forwardHandler';
            return map;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handle the command with data object.
     *
     * @param command the command name.
     * @param sourceName the name of the remote rpc that sent the request.
     * @param sourceSubName the sub name of the remote rpc that sent the request.
     * @param data the data object.
     * @return Promise<any> the promise object.
     */
    RpcBase.prototype.handle = function (command, sourceName, sourceSubName, data) {
        var handler = this.commandCollection[command];
        if (!handler) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcNotRegisteredHandler.message;
            throw new Error(message);
        }
        Object.assign(data, {
            sourceName: sourceName,
            sourceSubName: sourceSubName
        });
        return handler(data);
    };
    /**
     * Register the handler to the command.
     *
     * @param command the command name.
     * @param handler the handler function.
     */
    RpcBase.prototype.register = function (command, handler) {
        this.commandCollection[command] = handler;
    };
    /**
     * Log the debug message.
     *
     * @param message the message string.
     */
    RpcBase.prototype.debugLog = function (message) {
        Logging.log({ source: 'rpc', message: message, level: LogLevel.Debug });
    };
    return RpcBase;
}());
export { RpcBase };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcnBjL3JwYy1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUVIOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQztBQUNsQyxNQUFNLENBQUMsSUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUM7QUE0SHpDOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksWUFlWDtBQWZELFdBQVksWUFBWTtJQUNwQjs7T0FFRztJQUNILG1EQUFNLENBQUE7SUFFTjs7T0FFRztJQUNILG1EQUFNLENBQUE7SUFFTjs7T0FFRztJQUNILDJEQUFVLENBQUE7QUFDZCxDQUFDLEVBZlcsWUFBWSxLQUFaLFlBQVksUUFldkI7QUF5Q0Q7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxrQkFlWDtBQWZELFdBQVksa0JBQWtCO0lBQzFCOztPQUVHO0lBQ0gseUVBQVcsQ0FBQTtJQUVYOztPQUVHO0lBQ0gscUVBQVMsQ0FBQTtJQUVUOztPQUVHO0lBQ0gsdUVBQVUsQ0FBQTtBQUNkLENBQUMsRUFmVyxrQkFBa0IsS0FBbEIsa0JBQWtCLFFBZTdCO0FBNENEOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksbUJBUVg7QUFSRCxXQUFZLG1CQUFtQjtJQUMzQiwrREFBVSxDQUFBO0lBQ1YsK0RBQUksQ0FBQTtJQUNKLHVFQUFRLENBQUE7SUFDUiw2RUFBVyxDQUFBO0lBQ1gsdUVBQVEsQ0FBQTtJQUNSLCtEQUFJLENBQUE7SUFDSixxRUFBTyxDQUFBO0FBQ1gsQ0FBQyxFQVJXLG1CQUFtQixLQUFuQixtQkFBbUIsUUFROUI7QUFBQSxDQUFDO0FBK0hGLE1BQU0sQ0FBTixJQUFZLFdBVVg7QUFWRCxXQUFZLFdBQVc7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R0FBRyxvQkFBb0IsQ0FBQztZQUM1RCxHQUFHLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLEdBQUcsaUJBQWlCLENBQUM7WUFDdEQsR0FBRyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQztZQUM5QyxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7WUFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUM7OztPQUFBO0lBV0Q7Ozs7Ozs7O09BUUc7SUFDSSx3QkFBTSxHQUFiLFVBQWMsT0FBZSxFQUFFLFVBQWtCLEVBQUUsYUFBcUIsRUFBRSxJQUFTO1FBQy9FLElBQUksT0FBTyxHQUF3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDO1lBQzFHLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFlO1lBQzdCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLGFBQWEsRUFBRSxhQUFhO1NBQy9CLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksMEJBQVEsR0FBZixVQUFnQixPQUFlLEVBQUUsT0FBNEI7UUFDekQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLDBCQUFRLEdBQWxCLFVBQW1CLE9BQWU7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQTVHQSxBQTRHQyxJQUFBIiwiZmlsZSI6InJwYy1iYXNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==