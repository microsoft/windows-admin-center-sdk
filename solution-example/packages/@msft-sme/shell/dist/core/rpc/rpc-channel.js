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
var RpcChannel = (function (_super) {
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
        this.global.addEventListener('message', function (ev) { return _this.listener(ev); });
    };
    /**
     * Stop the message listener.
     */
    RpcChannel.prototype.stop = function () {
        this.global.removeEventListener('message');
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
            case 0 /* Request */:
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
            case 1 /* Response */:
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
            case 2 /* Error */:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcnBjL3JwYy1jaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBRSxjQUFjLEVBQVcsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUNILE9BQU8sRUFDUCxrQkFBa0IsRUFNbEIsbUJBQW1CLEVBR25CLFdBQVcsRUFDWCxPQUFPLEVBQ1YsTUFBTSxZQUFZLENBQUM7QUFFcEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDOzs7R0FHRztBQUNIO0lBQWdDLDhCQUFPO0lBZW5DOzs7Ozs7T0FNRztJQUNILG9CQUFZLElBQVksRUFBRSxNQUFjLEVBQUUsU0FBaUI7UUFBM0QsWUFDSSxrQkFBTSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBUTdDO1FBeEJELGlDQUFpQztRQUN6QixtQkFBYSxHQUFHLElBQUksR0FBRyxFQUFxQixDQUFDO1FBRTdDLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixtQkFBYSxHQUFHLElBQUksR0FBRyxFQUErQixDQUFDO1FBQ3ZELFlBQU0sR0FBVyxNQUFNLENBQUM7UUFZNUIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEtBQUssaUJBQWlCLENBQUMsV0FBVyxpQ0FBaUMsQ0FBQztRQUN2RixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDakMsS0FB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VyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLE9BQU8sQ0FBQztZQUNoSCxNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRCxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDNUIsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM5QixPQUFPLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDL0IsT0FBTyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxPQUFPLENBQUMsSUFBSSxnQkFBNkIsQ0FBQyxDQUFDLFFBQVE7UUFDbkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQXpmQSxBQXlmQyxDQXpmK0IsT0FBTyxHQXlmdEMiLCJmaWxlIjoicnBjLWNoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9