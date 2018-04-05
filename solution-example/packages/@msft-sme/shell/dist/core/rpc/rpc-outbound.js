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
 * RpcToModule class.
 * - Shell uses the instance to communicate to the Module (tool).
 */
var RpcOutbound = (function (_super) {
    __extends(RpcOutbound, _super);
    /**
     * Initiates a new instance of the RpcToModule class.
     *
     * @param rpcChannel the rpc channel.
     * @param name the public name of the module.
     * @param origin the origin url.
     */
    function RpcOutbound(rpcChannel, name, origin) {
        var _this = _super.call(this, rpcChannel, name, origin, RpcType.Outbound) || this;
        var commands = Object.keys(RpcInboundCommands);
        commands.forEach(function (command, index, array) {
            _this.register(command, _this.emptyHandler);
        });
        return _this;
    }
    /**
     * Registers all handlers at once.
     *
     * @param handlers the module handlers.
     */
    RpcOutbound.prototype.registerAll = function (handlers) {
        var _this = this;
        var map = RpcBase.inboundHandlerMap;
        var commands = Object.keys(RpcInboundCommands);
        commands.forEach(function (command, index, array) {
            _this.register(command, handlers[map[RpcInboundCommands[command]]]);
        });
    };
    /**
     * The init command.
     *
     * @param data the RpcInitData data.
     * @return Promise<void> the promise object.
     */
    RpcOutbound.prototype.init = function (data) {
        return this.rpcChannel.post(this, { command: RpcOutboundCommands[RpcOutboundCommands.Init], version: rpcCommandVersion, data: data });
    };
    /**
     * The open command. (30 seconds waiting time)
     *
     * @param data the RpcOpenData object.
     * @return Promise<RpcOpenResult> the promise object of RpcOpenResult.
     */
    RpcOutbound.prototype.open = function (data) {
        return this.rpcChannel.post(this, { command: RpcOutboundCommands[RpcOutboundCommands.Open], version: rpcCommandVersion, data: data }, 30 * 1000);
    };
    /**
     * The activate command.
     *
     * @param data the void object.
     * @return Promise<void> the promise object.
     */
    RpcOutbound.prototype.activate = function (data) {
        return this.rpcChannel.post(this, { command: RpcOutboundCommands[RpcOutboundCommands.Activate], version: rpcCommandVersion, data: data });
    };
    /**
     * The deactivate 2 command used with polling deactivation.
     *
     * @param data the void object.
     * @return Promise<RpcDeactivateResult> the promise object.
     */
    RpcOutbound.prototype.deactivate2 = function (data) {
        // ignore if it gets timed out because the frame could be gone already.
        return this.rpcChannel.post(this, { command: RpcOutboundCommands[RpcOutboundCommands.Deactivate2], version: rpcCommandVersion, data: data }, -1);
    };
    /**
     * The shutdown command.
     *
     * @param data the RpcShutdownData object.
     * @return Promise<RpcShutdownResult> the promise object.
     */
    RpcOutbound.prototype.shutdown = function (data) {
        return this.rpcChannel.post(this, { command: RpcOutboundCommands[RpcOutboundCommands.Shutdown], version: rpcCommandVersion, data: data });
    };
    /**
     * The ping command.
     *
     * @param data the RpcPingData object.
     * @return Promise<RpcPingResult> the promise object.
     */
    RpcOutbound.prototype.ping = function (data) {
        return this.rpcChannel.retryPost(this, { command: RpcOutboundCommands[RpcOutboundCommands.Ping], version: rpcCommandVersion, data: data }, 10, 300);
    };
    /**
     * The forward command.
     *
     * @param data the RpcForwardReportData object.
     * @return Promise<RpcForwardResponse<any>> the promise object.
     */
    RpcOutbound.prototype.forward = function (data) {
        return this.rpcChannel.post(this, { command: RpcOutboundCommands[RpcOutboundCommands.Forward], version: rpcCommandVersion, data: data });
    };
    /**
     * The empty handler to response always resolved.
     *
     * @param data the node context.
     * @return Promise<any> the promise.
     */
    RpcOutbound.prototype.emptyHandler = function (data) {
        return NativeQ.resolved('emptyHandler');
    };
    return RpcOutbound;
}(RpcBase));
export { RpcOutbound };
//# sourceMappingURL=data:application/json;base64,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