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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { NativeDeferred } from '../data/native-q';
import { Net } from '../data/net';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { EnvironmentModule } from '../manifest/environment-modules';
import { RpcBase, RpcInboundCommands, RpcOutboundCommands, RpcSeekMode, RpcType } from './rpc-base';
import { RpcOutbound } from './rpc-outbound';
/**
 * RpcChannel class.
 * - Both Shell and Module creates one instance to present itself.
 */
var RpcChannel = /** @class */ (function (_super) {
    __extends(RpcChannel, _super);
    /**
     * Initiates a new instance of the RpcChannel class.
     *
     * @param name the public name of itself.
     * @param origin the origin url of itself.
     * @param signature the signature of the gateway running instance.
     */
    function RpcChannel(name, origin, signature) {
        var _this = _super.call(this, null, name, origin, RpcType.Channel) || this;
        // RpcShell/RpcModule collection.
        _this.rpcCollection = new Map();
        _this.sequence = 0;
        _this.deferredQueue = new Map();
        _this.global = window;
        _this.signature = signature;
        _this.rpcMode = name === EnvironmentModule.nameOfShell ? 0 /* Shell */ : 1 /* Module */;
        if (_this.rpcMode === 0 /* Shell */) {
            _this.depth = 0;
        }
        else {
            _this.depth = null;
        }
        return _this;
    }
    Object.defineProperty(RpcChannel.prototype, "rpcInboundHandlers", {
        /**
         * Sets the rpc inbound handlers to use when creating for seek command.
         */
        set: function (handlers) {
            this.inboundHandlers = handlers;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Register Inbound/Outbound.
     *
     * @param rpcObject the RpcInbound/RpcOutbound class instance.
     * @param type the type of rpc object.
     */
    RpcChannel.prototype.registerRpc = function (rpcObject, type) {
        if (rpcObject.type !== type) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcTypeNoMatch.message;
            throw new Error(message.format('registerRpc'));
        }
        this.addToCollection(rpcObject);
    };
    /**
     * Unregister module with subNams
     *
     * @param name the name of module.
     * @param subName the subName.
     * @return RpcBase the rpc object.
     */
    RpcChannel.prototype.unregisterRpc = function (name, subName, type) {
        // unregister it by both origin and name.
        var rpcObject = this.getFromCollection(name, subName, true);
        if (rpcObject.type !== type) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcTypeNoMatch.message;
            throw new Error(message.format('unregisterRpc'));
        }
        if (rpcObject) {
            this.removeFromCollection(rpcObject);
            return rpcObject;
        }
        else {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcNotFoundModule.message;
            throw new Error(message.format(name, subName));
        }
    };
    /**
     * Get Rpc object by module with subName for Inbound.
     *
     * @param name the name of module.
     * @param subName the subName.
     * @param type the type of rpc object.
     * @return RpcBase the rpc object.
     */
    RpcChannel.prototype.getRpc = function (name, subName, type) {
        var rpcObject = this.getFromCollection(name, subName, true);
        if (rpcObject && rpcObject.type !== type) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcTypeNoMatch.message;
            throw new Error(message.format('getRpc'));
        }
        // return null if it cannot find.
        return rpcObject;
    };
    /**
     * Get all Rpc objects for the specified type.
     */
    RpcChannel.prototype.getAllRpc = function (type) {
        var results = [];
        this.rpcCollection.forEach(function (subCollection, key, map) {
            subCollection.forEach(function (rpc, index, array) {
                if (rpc.type === type) {
                    results.push(rpc);
                }
            });
        });
        return results;
    };
    /**
     * Get RpcInbound/RpcOutbound object for module name and module sub name.
     * If it doesn't configure subName yet, it returns it so the channel set it up.
     *
     * @param name the module name.
     * @param subName the sub name of the iframe object.
     * @return RpcBase the matched Rpc object.
     */
    RpcChannel.prototype.getFromCollection = function (name, subName, exact) {
        var subCollection = this.rpcCollection.get(name);
        if (subCollection == null) {
            return null;
        }
        return subCollection.find(function (value) { return (!exact && value.subName == null) || value.subName === subName; });
    };
    RpcChannel.prototype.removeFromCollection = function (rpcObject) {
        var subCollection = this.rpcCollection.get(rpcObject.name);
        if (subCollection == null) {
            return null;
        }
        var results = MsftSme.remove(subCollection, rpcObject);
        if (subCollection.length === 0) {
            // remove the entry if it's empty.
            this.rpcCollection.delete(rpcObject.name);
        }
        if (results && results.length === 1) {
            return results[0];
        }
        return null;
    };
    RpcChannel.prototype.addToCollection = function (rpcObject) {
        var subCollection = this.rpcCollection.get(rpcObject.name);
        if (subCollection == null) {
            subCollection = [rpcObject];
            this.rpcCollection.set(rpcObject.name, subCollection);
        }
        else {
            subCollection.push(rpcObject);
        }
    };
    /**
     * Start the message listener.
     */
    RpcChannel.prototype.start = function () {
        var _this = this;
        this.listnerFunction = function (ev) { return _this.listener(ev); };
        this.global.addEventListener('message', this.listnerFunction);
    };
    /**
     * Stop the message listener.
     */
    RpcChannel.prototype.stop = function () {
        this.global.removeEventListener('message', this.listnerFunction);
    };
    /**
     * Post the message with retry delay.
     *
     * @param target the RpcToModule or RpcToShell object.
     * @param message the message packet.
     * @param count the retry count.
     * @param delay the interval milliseconds.
     * @return Promise<T> the promise object.
     */
    RpcChannel.prototype.retryPost = function (target, message, count, delay) {
        var _this = this;
        if (target == null || target.window == null) {
            var message2 = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcTargetWindowNotConfigured.message;
            throw new Error(message2);
        }
        var deferred = new NativeDeferred();
        var lastSequence = this.sequence;
        this.deferredQueue[this.sequence] = deferred;
        message.srcName = this.name;
        message.srcSubName = this.subName;
        message.srcDepth = this.depth;
        message.destName = target.name;
        message.destSubName = target.subName;
        message.signature = this.signature;
        message.sequence = this.sequence;
        message.type = 0 /* Request */; // post
        this.sequence++;
        this.debugLog('rpc/retry {0} {1}'.format(this.name, JSON.stringify(message)));
        target.window.postMessage(message, target.origin);
        var timer = setInterval(function () {
            if (deferred.isPending) {
                if (--count < 0) {
                    var message2 = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcExpiredRetry.message;
                    clearInterval(timer);
                    deferred.reject(message2.format(message.command));
                    if (_this.deferredQueue[lastSequence]) {
                        delete _this.deferredQueue[lastSequence];
                    }
                    return;
                }
                target.window.postMessage(message, target.origin);
                return;
            }
            clearInterval(timer);
        }, delay);
        return deferred.promise;
    };
    /**
     * Post the request message.
     *
     * @param target the RpcToModule or RpcToShell object.
     * @param message the message packet.
     * @param timeout the timeout. (10 seconds at default)
     * @return Promise<TResult> the promise object.
     */
    RpcChannel.prototype.post = function (target, message, timeout) {
        var _this = this;
        var ignoreTimeout = false;
        if (timeout === -1) {
            ignoreTimeout = true;
            timeout = null;
        }
        timeout = timeout || 10 * 1000; // 10 seconds
        if (target == null || target.window == null) {
            var message2 = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcTargetWindowNotConfigured.message;
            throw new Error(message2);
        }
        var deferred = new NativeDeferred();
        var lastSequence = this.sequence;
        this.deferredQueue[this.sequence] = deferred;
        message.srcName = this.name;
        message.srcSubName = this.subName;
        message.srcDepth = this.depth;
        message.destName = target.name;
        message.destSubName = target.subName;
        message.signature = this.signature;
        message.sequence = this.sequence;
        message.type = 0 /* Request */; // post
        this.sequence++;
        this.debugLog('rpc/send {0} {1}'.format(this.name, JSON.stringify(message.command === RpcOutboundCommands[RpcOutboundCommands.Init] ? __assign({}, message, { data: '(hide...)' }) : message)));
        target.window.postMessage(message, target.origin);
        setTimeout(function () {
            if (deferred.isPending) {
                if (ignoreTimeout) {
                    deferred.resolve();
                }
                else {
                    var message2 = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcExpired.message;
                    deferred.reject(message2.format(_this.name, _this.subName, target.name, target.subName, message.command, message.type));
                }
            }
            if (_this.deferredQueue[lastSequence]) {
                delete _this.deferredQueue[lastSequence];
            }
        }, timeout);
        return deferred.promise;
    };
    /**
     * Validate the target window if exist by sending null packet.
     *
     * @param target the target Rpc object.
     * @return boolean if false, it remove the target from the list.
     */
    RpcChannel.prototype.validate = function (target) {
        try {
            target.window.postMessage({ validate: 'validate' }, target.origin);
            return true;
        }
        catch (error) {
            this.removeFromCollection(target);
            return false;
        }
    };
    /**
     * Log the debug message.
     *
     * @param message the message string.
     */
    RpcChannel.prototype.debugLog = function (message) {
        Logging.log({ source: 'rpc', message: message, level: LogLevel.Debug });
    };
    /**
     * The listen handler.
     *
     * @param messageEvent the Rpc message event.
     */
    RpcChannel.prototype.listener = function (messageEvent) {
        var _this = this;
        if (!messageEvent.data || !messageEvent.data.command) {
            // ignore null event.
            this.debugLog('listener: {0}'.format(JSON.stringify(messageEvent)));
            return;
        }
        var message = messageEvent.data;
        this.debugLog('rpc/received {0} {1}'.format(this.name, JSON.stringify(message.command === RpcOutboundCommands[RpcOutboundCommands.Init] ? __assign({}, message, { data: '(hide...)' }) : message)));
        if (message.signature !== this.signature) {
            var message2 = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcSignatureError.message;
            throw new Error(message2);
        }
        // accept shell seek query
        if (message.destName !== this.name) {
            var message2 = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcUnexpectedDestination.message;
            throw new Error(message2.format(message.destName));
        }
        var target = this.getFromCollection(message.srcName, message.srcSubName, false);
        if (!target) {
            // unknown request was received.
            if (message.type === 0 /* Request */
                && message.command === RpcOutboundCommands[RpcOutboundCommands.Ping]) {
                target = this.getFromCollection('*', '*', true);
                if (target) {
                    // keep remote window object to respond.
                    // current channel is child, and target is parent.
                    // target could be shell or a parent module.
                    // remove the rpcInbound object once and re-register back again with new name.
                    this.removeFromCollection(target);
                    target.name = message.srcName;
                    target.subName = message.srcSubName;
                    target.window = messageEvent.source;
                    target.origin = messageEvent.origin;
                    target.depth = message.srcDepth;
                    this.subName = message.destSubName;
                    this.depth = message.srcDepth + 1;
                    this.registerRpc(target, RpcType.Inbound);
                }
            }
        }
        // Seek to create or delete RpcInbound on the shell to access a child call.
        if (message.command === RpcInboundCommands[RpcInboundCommands.Seek]
            && this.name === EnvironmentModule.nameOfShell
            && message.type === 0 /* Request */) {
            var seekData = message.data;
            if (seekData.mode === RpcSeekMode.Create) {
                if (target) {
                    // update window object.
                    target.subName = message.srcSubName;
                    target.window = messageEvent.source;
                    target.depth = message.srcDepth;
                }
                else {
                    target = new RpcOutbound(this, message.srcName, messageEvent.origin);
                    target.subName = message.srcSubName;
                    target.window = messageEvent.source;
                    target.depth = message.srcDepth;
                    target.registerAll(this.inboundHandlers);
                    this.registerRpc(target, RpcType.Outbound);
                }
            }
            else if (seekData.mode === RpcSeekMode.Delete && target) {
                this.removeFromCollection(target);
            }
        }
        if (!target) {
            // ignore older/unknown response packet. current channel no longer watching it for response, but treat new request as an error.
            if (message.type === 0 /* Request */) {
                var message2 = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcUnexpectedEvent.message;
                throw new Error(message2.format(message.srcName, message.srcSubName));
            }
            return;
        }
        var deferred;
        switch (message.type) {
            case 0 /* Request */:// post: processing response/error.
                target.handle(message.command, message.srcName, message.srcSubName, message.data).then(function (data) {
                    message.data = data;
                    return _this.response(target, message);
                }, function (error) {
                    var logMessage = '';
                    var logStack = '';
                    if (typeof error === 'string') {
                        message.data = error;
                        logMessage = error;
                    }
                    else {
                        message.data = {};
                        if (error && error.xhr) {
                            var netError = Net.getErrorMessage(error);
                            message.data.message = netError;
                            logMessage = netError;
                        }
                        else if (error.message) {
                            message.data.message = error.message;
                            logMessage = error.message;
                        }
                        if (error.stack) {
                            message.data.stack = error.stack;
                            logStack = error.stack;
                        }
                    }
                    Logging.log({
                        source: 'RpcChannel',
                        level: LogLevel.Error,
                        message: logMessage,
                        stack: logStack
                    });
                    // telemetry with predefined view/action name.
                    Logging.trace({
                        view: 'sme-generic-error',
                        instance: 'rpc-channel',
                        action: 'exceptionLog',
                        data: { stack: logStack || logMessage }
                    });
                    return _this.error(target, message);
                });
                break;
            case 1 /* Response */:// response: received result with success.
                deferred = this.deferredQueue[message.sequence];
                if (!deferred) {
                    if (message.command === RpcOutboundCommands[RpcOutboundCommands.Ping]) {
                        // ping can be sent multiple times and deferred could be settled already.
                        break;
                    }
                    var message2 = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcUnexpectedSequence.message;
                    throw new Error(message2);
                }
                delete this.deferredQueue[message.sequence];
                deferred.resolve(message.data);
                break;
            case 2 /* Error */:// error: received result with error.
                deferred = this.deferredQueue[message.sequence];
                if (!deferred) {
                    var message2 = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcUnexpectedErrorSequence.message;
                    throw new Error(message2);
                }
                delete this.deferredQueue[message.sequence];
                deferred.reject(message.data);
                break;
        }
    };
    /**
     * Sending response message.
     *
     * @param target the RpcToModule or RpcToShell object.
     * @param message the Rpc message packet.
     */
    RpcChannel.prototype.response = function (target, message) {
        if (target == null || target.window == null) {
            var message2 = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcTargetWindowNotConfigured.message;
            throw new Error(message2);
        }
        message.srcName = this.name;
        message.srcSubName = this.subName;
        message.srcDepth = this.depth;
        message.destName = target.name;
        message.destSubName = target.subName;
        message.signature = this.signature;
        message.type = 1 /* Response */; // response
        target.window.postMessage(message, target.origin);
    };
    /**
     * Sending error message.
     *
     * @param target the RpcToModule or RpcToShell object.
     * @param message the Rpc message packet.
     */
    RpcChannel.prototype.error = function (target, message) {
        if (target == null || target.window == null) {
            var message2 = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcTargetWindowNotConfigured.message;
            throw new Error(message2);
        }
        message.srcName = this.name;
        message.srcSubName = this.subName;
        message.srcDepth = this.depth;
        message.destName = target.name;
        message.destSubName = target.subName;
        message.signature = this.signature;
        message.type = 2 /* Error */; // error
        target.window.postMessage(message, target.origin);
    };
    return RpcChannel;
}(RpcBase));
export { RpcChannel };
//# sourceMappingURL=data:application/json;base64,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