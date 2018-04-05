import { EnvironmentModule } from '../manifest/environment-modules';
import { RpcBase, RpcInboundCommands, RpcOutboundCommands, RpcType } from './rpc-base';
import { RpcChannel } from './rpc-channel';
import { RpcInbound } from './rpc-inbound';
import { RpcOutbound } from './rpc-outbound';
/**
 * The status of RPC remote that sent the message
 */
export var RpcRemoteState;
(function (RpcRemoteState) {
    RpcRemoteState[RpcRemoteState["Active"] = 0] = "Active";
    RpcRemoteState[RpcRemoteState["Inactive"] = 1] = "Inactive";
})(RpcRemoteState || (RpcRemoteState = {}));
/**
 * RpcManager class.
 */
var RpcManager = /** @class */ (function () {
    /**
     * Initializes a new instance of the RpcManager class.
     */
    function RpcManager() {
        var inboundHandlers = {};
        var outboundHandlers = {};
        var inboundMap = RpcBase.inboundHandlerMap;
        var outboundMap = RpcBase.outboundHandlerMap;
        var inboundCommands = Object.keys(RpcInboundCommands);
        var outboundCommands = Object.keys(RpcOutboundCommands);
        inboundCommands.forEach(function (command, index, array) {
            inboundHandlers[inboundMap[RpcInboundCommands[command]]] = function (data) { return Promise.resolve(); };
        });
        outboundCommands.forEach(function (command, index, array) {
            outboundHandlers[outboundMap[RpcOutboundCommands[command]]] = function (data) { return Promise.resolve(); };
        });
        this.rpcInboundHandlers = inboundHandlers;
        this.rpcOutboundHandlers = outboundHandlers;
    }
    Object.defineProperty(RpcManager.prototype, "rpcInbound", {
        /**
         * Gets last rpc to-shell.
         */
        get: function () {
            return this.currentRpcInbound;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RpcManager.prototype, "rpcOutbound", {
        /**
         * Gets last rpc to-module.
         */
        get: function () {
            return this.currentRpcOutbound;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RpcManager.prototype, "rpcReportDataInbound", {
        /**
         * Gets rpc inbound for report data.
         */
        get: function () {
            return this.parentRpcInbound || this.currentRpcInbound;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize the rpc communication channel based on manifest.
     *
     * @param inboundHandlers the set of rpc inbound handlers.
     * @param outboundHandlers the set of rpc outbound handlers.
     */
    RpcManager.prototype.init = function (inboundHandlers, outboundHandlers) {
        // extend module and shell handlers
        if (inboundHandlers) {
            this.rpcInboundHandlers = Object.assign(this.rpcInboundHandlers, inboundHandlers);
        }
        if (outboundHandlers) {
            this.rpcOutboundHandlers = Object.assign(this.rpcOutboundHandlers, outboundHandlers);
        }
        // read environment and create rpc self instance.
        var global = window;
        var _a = global.MsftSme.Environment, name = _a.name, origin = _a.origin, signature = _a.signature;
        this.rpcChannel = new RpcChannel(name, origin, signature);
        this.rpcChannel.subName = '##';
        this.rpcChannel.rpcInboundHandlers = this.rpcInboundHandlers;
        // for module configure shell access.
        this.initRpcInbound();
        // start rpc response.
        this.rpcChannel.start();
    };
    /**
     * Configure Rpc as parent frame.
     */
    RpcManager.prototype.initRpcInbound = function () {
        // accept initial ping query for any parent.
        var rpcInbound = new RpcInbound(this.rpcChannel, '*', '*');
        rpcInbound.subName = '*';
        this.rpcChannel.registerRpc(rpcInbound, RpcType.Inbound);
        this.currentRpcInbound = rpcInbound;
        rpcInbound.registerAll(this.rpcOutboundHandlers);
    };
    /**
     * Connect Rpc module.
     *
     * @param name the name of module.
     * @param path the entry point to open for this module.
     * @param iframe the iframe object.
     * @param primary the primary iframe to support report data response.
     * @return Promise<string> The promise with the sub name of outbound connection.
     */
    RpcManager.prototype.connectRpcOutbound = function (name, path, iFrame, primary) {
        // making all instance to be unique at any order of connection.
        var subName = '{0}#{1}+{2}'.format(path, Date.now(), RpcManager.serial++);
        var rpcOutbound = this.createRpcOutbound(name, subName, iFrame);
        rpcOutbound.registerAll(this.rpcInboundHandlers);
        if (primary) {
            this.currentRpcOutbound = rpcOutbound;
        }
        // pinging to establish connection to the module.
        return rpcOutbound.ping({ name: 'ping' }).then(function (x) { return subName; });
    };
    /**
     * Reconnect Rpc module.
     *
     * @param name the name of module.
     * @param subName the sub name.
     * @param primary the primary iframe to support report data response.
     * @return RpcOutbound the rpc outbound object.
     */
    RpcManager.prototype.reconnectRpcOutbound = function (name, subName, primary) {
        var rpcOutbound = this.rpcChannel.getRpc(name, subName, RpcType.Outbound);
        if (primary) {
            this.currentRpcOutbound = rpcOutbound;
        }
        return rpcOutbound;
    };
    /**
     * Disconnect Rpc module.
     */
    RpcManager.prototype.disconnectRpcOutbound = function () {
        this.currentRpcOutbound = null;
    };
    /**
     * Remove RpcOutbound.
     *
     * @param module the environment module to remove.
     */
    RpcManager.prototype.removeRpcOutbound = function (name, subName) {
        var rpcOutbound = this.rpcChannel.unregisterRpc(name, subName, RpcType.Outbound);
        if (this.currentRpcOutbound === rpcOutbound) {
            this.disconnectRpcOutbound();
        }
        return rpcOutbound;
    };
    /**
     * Get current live outbound rpc.
     *  - these set could be changed if it's handled async.
     */
    RpcManager.prototype.getCurrentRpcOutbound = function () {
        return this.rpcChannel.getAllRpc(RpcType.Outbound);
    };
    /**
     * Get the remote status of a given module name
     *
     * @param {string} name The name of the RPC remote endpoint to get the status from
     * @param {string} subName The sub name of the remote iframe instance.
     * @returns {RpcRemoteState} The state of the remote. Active if it's the current channel
     * for communication or Inactive if the channel is not the currently active channel in this
     * manager
     */
    RpcManager.prototype.getSourceStatus = function (name, subName) {
        if (!this.currentRpcOutbound
            || this.currentRpcOutbound.name !== name
            || this.currentRpcOutbound.subName !== subName) {
            return {
                status: RpcRemoteState.Inactive,
                subName: subName,
                entryPoint: null
            };
        }
        var segments = subName.split('#');
        return {
            status: RpcRemoteState.Active,
            subName: subName,
            entryPoint: segments && segments.length > 0 ? segments[0] : ''
        };
    };
    /**
     * Seek shell or parent frame.
     *
     * @param Promise<any> the promise object.
     */
    RpcManager.prototype.seekShell = function (mode) {
        var _this = this;
        if (this.currentRpcInbound.name === EnvironmentModule.nameOfShell) {
            return Promise.resolve({ name: this.currentRpcInbound.name, subName: this.currentRpcInbound.subName });
        }
        var depth = this.rpcChannel.depth;
        var current = window.self;
        while (--depth >= 0 && current !== current.parent) {
            current = current.parent;
        }
        var rpcInbound = new RpcInbound(this.rpcChannel, EnvironmentModule.nameOfShell, '*');
        rpcInbound.window = current;
        rpcInbound.subName = '##';
        rpcInbound.depth = 0;
        this.rpcChannel.registerRpc(rpcInbound, RpcType.Inbound);
        rpcInbound.registerAll(this.rpcOutboundHandlers);
        this.currentRpcInbound = rpcInbound;
        return rpcInbound.seek({ mode: mode }).then(function (result) {
            _this.parentRpcInbound = _this.currentRpcInbound;
            _this.currentRpcInbound = rpcInbound;
            return result;
        }, function (error) {
            _this.rpcChannel.unregisterRpc(rpcInbound.name, rpcInbound.subName, RpcType.Inbound);
            return error;
        });
    };
    /**
     * Create and add RpcOutbound object.
     *
     * @param name the name of module.
     * @param subName the sub name.
     * @param module the environment module to remove.
     */
    RpcManager.prototype.createRpcOutbound = function (name, subName, iFrame) {
        var global = window;
        var modules = global.MsftSme.Environment.modules;
        var module = modules.find(function (value, index, array) { return value.name === name; });
        if (!module) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcFailedFindModuleManifest.message;
            throw new Error(message.format(name));
        }
        var rpc = new RpcOutbound(this.rpcChannel, module.name, module.origin);
        rpc.subName = subName;
        rpc.window = iFrame;
        this.rpcChannel.registerRpc(rpc, RpcType.Outbound);
        return rpc;
    };
    RpcManager.serial = 0;
    return RpcManager;
}());
export { RpcManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcnBjL3JwYy1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFDSCxPQUFPLEVBRVAsa0JBQWtCLEVBTWxCLG1CQUFtQixFQU1uQixPQUFPLEVBR1YsTUFBTSxZQUFZLENBQUM7QUFDcEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3Qzs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLGNBR1g7QUFIRCxXQUFZLGNBQWM7SUFDdEIsdURBQU0sQ0FBQTtJQUNOLDJEQUFRLENBQUE7QUFDWixDQUFDLEVBSFcsY0FBYyxLQUFkLGNBQWMsUUFHekI7QUFFRDs7R0FFRztBQUNIO0lBVUk7O09BRUc7SUFDSDtRQUNJLElBQUksZUFBZSxHQUFRLEVBQUUsQ0FBQztRQUM5QixJQUFJLGdCQUFnQixHQUFRLEVBQUUsQ0FBQztRQUMvQixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1FBQzdDLElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN0RCxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN4RCxlQUFlLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLO1lBQzFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQUEsSUFBSSxJQUFJLE9BQUEsT0FBTyxDQUFDLE9BQU8sRUFBRSxF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QUFJLENBQ2hELFVBQUEsTUFBTTtZQUNGLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDL0MsS0FBSSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQztZQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDRCxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BGLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ssc0NBQWlCLEdBQXpCLFVBQTBCLElBQVksRUFBRSxPQUFlLEVBQUUsTUFBYztRQUNuRSxJQUFJLE1BQU0sR0FBMkIsTUFBTSxDQUFDO1FBQ3RDLElBQUEsNENBQU8sQ0FBZ0M7UUFDN0MsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxJQUFLLE9BQUEsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQW5CLENBQW1CLENBQUMsQ0FBQztRQUN4RSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUM7WUFDOUcsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUVELElBQUksR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkUsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdEIsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQXRQYyxpQkFBTSxHQUFHLENBQUMsQ0FBQztJQXVQOUIsaUJBQUM7Q0F4UEQsQUF3UEMsSUFBQTtTQXhQWSxVQUFVIiwiZmlsZSI6InJwYy1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==