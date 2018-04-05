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
export var rpcVersion = '0.0.5';
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
 * Identifies the scope that these settings have
 */
export var RpcSettingsScope;
(function (RpcSettingsScope) {
    /**
     * User Settings Scope
     */
    RpcSettingsScope[RpcSettingsScope["User"] = 0] = "User";
    /**
     * Application Settings Scope (All Users)
     */
    RpcSettingsScope[RpcSettingsScope["Application"] = 1] = "Application";
})(RpcSettingsScope || (RpcSettingsScope = {}));
/**
 * Identifies the type of provider that owns these settings
 */
export var RpcSettingsProviderType;
(function (RpcSettingsProviderType) {
    /**
     * Common provider type, indicates that these settings are owned by the common provider (shell)
     */
    RpcSettingsProviderType[RpcSettingsProviderType["Common"] = 0] = "Common";
    /**
     * Extension access type, indicates that these settings are owned by the current extension
     */
    RpcSettingsProviderType[RpcSettingsProviderType["Extension"] = 1] = "Extension";
})(RpcSettingsProviderType || (RpcSettingsProviderType = {}));
/**
 * Identifies the user profile operation type to preform
 */
export var RpcSettingsOperationType;
(function (RpcSettingsOperationType) {
    /**
     * Get Operation Type
     */
    RpcSettingsOperationType[RpcSettingsOperationType["Get"] = 0] = "Get";
    /**
     * Set Operation Type
     */
    RpcSettingsOperationType[RpcSettingsOperationType["Set"] = 1] = "Set";
})(RpcSettingsOperationType || (RpcSettingsOperationType = {}));
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
    RpcInboundCommands[RpcInboundCommands["Settings"] = 212] = "Settings";
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
var RpcBase = /** @class */ (function () {
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
            map[RpcInboundCommands.Settings] = 'settingsHandler';
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
    return RpcBase;
}());
export { RpcBase };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcnBjL3JwYy1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUVIOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQztBQUNsQyxNQUFNLENBQUMsSUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUM7QUE2SHpDOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksWUFlWDtBQWZELFdBQVksWUFBWTtJQUNwQjs7T0FFRztJQUNILG1EQUFNLENBQUE7SUFFTjs7T0FFRztJQUNILG1EQUFNLENBQUE7SUFFTjs7T0FFRztJQUNILDJEQUFVLENBQUE7QUFDZCxDQUFDLEVBZlcsWUFBWSxLQUFaLFlBQVksUUFldkI7QUF5Q0Q7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxrQkFlWDtBQWZELFdBQVksa0JBQWtCO0lBQzFCOztPQUVHO0lBQ0gseUVBQVcsQ0FBQTtJQUVYOztPQUVHO0lBQ0gscUVBQVMsQ0FBQTtJQUVUOztPQUVHO0lBQ0gsdUVBQVUsQ0FBQTtBQUNkLENBQUMsRUFmVyxrQkFBa0IsS0FBbEIsa0JBQWtCLFFBZTdCO0FBNENEOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksbUJBUVg7QUFSRCxXQUFZLG1CQUFtQjtJQUMzQiwrREFBVSxDQUFBO0lBQ1YsK0RBQUksQ0FBQTtJQUNKLHVFQUFRLENBQUE7SUFDUiw2RUFBVyxDQUFBO0lBQ1gsdUVBQVEsQ0FBQTtJQUNSLCtEQUFJLENBQUE7SUFDSixxRUFBTyxDQUFBO0FBQ1gsQ0FBQyxFQVJXLG1CQUFtQixLQUFuQixtQkFBbUIsUUFROUI7QUFBQSxDQUFDO0FBK0hGLE1BQU0sQ0FBTixJQUFZLFdBVVg7QUFWRCxXQUFZLFdBQVc7SUFDbkI7O09BRUc7SUFDSCxpREFBTSxDQUFBO0lBRU47O09BRUc7SUFDSCxpREFBTSxDQUFBO0FBQ1YsQ0FBQyxFQVZXLFdBQVcsS0FBWCxX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YSxDQUFDLEdBQUcsd0JBQXdCLENBQUM7WUFDakUsR0FBRyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLGVBQWUsQ0FBQztZQUNqRCxHQUFHLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsaUJBQWlCLENBQUM7WUFDckQsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUM7OztPQUFBO0lBS0Qsc0JBQWtCLDZCQUFrQjtRQUhwQzs7V0FFRzthQUNIO1lBQ0ksSUFBSSxHQUFHLEdBQWdDLEVBQUUsQ0FBQztZQUMxQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUM7WUFDOUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxHQUFHLGlCQUFpQixDQUFDO1lBQ3RELEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsR0FBRyxvQkFBb0IsQ0FBQztZQUM1RCxHQUFHLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLEdBQUcsaUJBQWlCLENBQUM7WUFDdEQsR0FBRyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQztZQUM5QyxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7WUFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUM7OztPQUFBO0lBV0Q7Ozs7Ozs7O09BUUc7SUFDSSx3QkFBTSxHQUFiLFVBQWMsT0FBZSxFQUFFLFVBQWtCLEVBQUUsYUFBcUIsRUFBRSxJQUFTO1FBQy9FLElBQUksT0FBTyxHQUF3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDO1lBQzFHLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFlO1lBQzdCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLGFBQWEsRUFBRSxhQUFhO1NBQy9CLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksMEJBQVEsR0FBZixVQUFnQixPQUFlLEVBQUUsT0FBNEI7UUFDekQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUM5QyxDQUFDO0lBQ0wsY0FBQztBQUFELENBcEdBLEFBb0dDLElBQUEiLCJmaWxlIjoicnBjLWJhc2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9