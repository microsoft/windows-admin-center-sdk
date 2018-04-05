import { Observable, ReplaySubject } from 'rxjs';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { Net } from './net';
/**
 * The state of Websocket connection.
 */
export var WebsocketStreamConnectionState;
(function (WebsocketStreamConnectionState) {
    /**
     * Initializing.
     */
    WebsocketStreamConnectionState[WebsocketStreamConnectionState["Initializing"] = 1] = "Initializing";
    /**
     * Connected.
     */
    WebsocketStreamConnectionState[WebsocketStreamConnectionState["Connected"] = 2] = "Connected";
    /**
     * Disconnected.
     */
    WebsocketStreamConnectionState[WebsocketStreamConnectionState["Disconnected"] = 3] = "Disconnected";
    /**
     * Failed.
     */
    WebsocketStreamConnectionState[WebsocketStreamConnectionState["Failed"] = 4] = "Failed";
    /**
     * Not configured.
     */
    WebsocketStreamConnectionState[WebsocketStreamConnectionState["NotConfigured"] = 5] = "NotConfigured";
})(WebsocketStreamConnectionState || (WebsocketStreamConnectionState = {}));
/**
 * The state of Websocket stream packet.
 */
export var WebsocketStreamState;
(function (WebsocketStreamState) {
    /**
     * Empty packet.
     */
    WebsocketStreamState[WebsocketStreamState["Noop"] = 1] = "Noop";
    /**
     * Data packet.
     */
    WebsocketStreamState[WebsocketStreamState["Data"] = 2] = "Data";
    /**
     * Error packet. (reserved for socket level error communication if any)
     */
    WebsocketStreamState[WebsocketStreamState["Error"] = 3] = "Error";
})(WebsocketStreamState || (WebsocketStreamState = {}));
/**
 * The request state of data such as CIM and PowerShell stream.
 */
export var WebsocketStreamDataRequestState;
(function (WebsocketStreamDataRequestState) {
    /**
     * empty packet.
     */
    WebsocketStreamDataRequestState[WebsocketStreamDataRequestState["Noop"] = 1] = "Noop";
    /**
     * Data packet.
     */
    WebsocketStreamDataRequestState[WebsocketStreamDataRequestState["Normal"] = 2] = "Normal";
    /**
     * Cancel
     */
    WebsocketStreamDataRequestState[WebsocketStreamDataRequestState["Cancel"] = 3] = "Cancel";
})(WebsocketStreamDataRequestState || (WebsocketStreamDataRequestState = {}));
/**
 * The response state of data such as CIM and PowerShell stream.
 */
export var WebsocketStreamDataState;
(function (WebsocketStreamDataState) {
    /**
     * empty packet.
     */
    WebsocketStreamDataState[WebsocketStreamDataState["Noop"] = 1] = "Noop";
    /**
     * Completed packet.
     */
    WebsocketStreamDataState[WebsocketStreamDataState["Completed"] = 2] = "Completed";
    /**
     * Data packet.
     */
    WebsocketStreamDataState[WebsocketStreamDataState["Data"] = 3] = "Data";
    /**
     * Error
     */
    WebsocketStreamDataState[WebsocketStreamDataState["Error"] = 4] = "Error";
    /**
     * Cancelled
     */
    WebsocketStreamDataState[WebsocketStreamDataState["Cancelled"] = 5] = "Cancelled";
})(WebsocketStreamDataState || (WebsocketStreamDataState = {}));
/**
 * Websocket Stream Processor class.
 */
var WebsocketStreamProcessor = (function () {
    /**
     * Initializes a new instance of the CimProcessor class.
     * @param observer Observer to send back result to caller.
     * @param target Stream Target object.
     * @param options Options for Cim stream query.
     */
    function WebsocketStreamProcessor(observer, target, options) {
        this.observer = observer;
        this.target = target;
        this.options = options;
    }
    /**
     * Push the result to the observer.
     * @param result the result of TData.
     */
    WebsocketStreamProcessor.prototype.next = function (result) {
        if (this.observer && !this.observer.closed) {
            this.observer.next(result);
        }
        this.sendOnce = true;
    };
    /**
     * Complete the observer.
     */
    WebsocketStreamProcessor.prototype.complete = function () {
        this.closing = true;
        if (this.observer && !this.observer.closed) {
            this.observer.complete();
        }
        this.closed = true;
    };
    /**
     * Error the observer.
     */
    WebsocketStreamProcessor.prototype.error = function (error) {
        this.closing = true;
        if (this.observer && !this.observer.closed) {
            this.observer.error(error);
        }
        this.closed = true;
    };
    return WebsocketStreamProcessor;
}());
export { WebsocketStreamProcessor };
/**
 * The Websocket stream class.
 */
var WebsocketStream = (function () {
    /**
     * Initializes a new instance of the WebsocketStream class.
     *
     * @param gateway the gateway connection object.
     */
    function WebsocketStream(gateway) {
        var _this = this;
        this.gateway = gateway;
        this.socketStateRaw = WebsocketStreamConnectionState.Disconnected;
        this.socketState = new ReplaySubject();
        this.connectionRetries = WebsocketStream.maxConnectionRetries;
        this.handlers = new Map();
        this.strings = MsftSme.resourcesStrings().MsftSmeShell.Core.WebsocketStream;
        // initialize only after gateway data was populated via RPC.
        this.gateway.initialize().subscribe(function () {
            // enable websocket stream only when the module added the options at initialization.
            var global = window;
            if (global.MsftSme.Init.websocket) {
                _this.initialize(true);
            }
            else {
                _this.socketState.next(WebsocketStreamConnectionState.NotConfigured);
                _this.socketStateRaw = WebsocketStreamConnectionState.NotConfigured;
            }
        });
    }
    /**
     * Register the processor for the stream name.
     * @param name the name of stream.
     * @param handler the handler to process packet.
     */
    WebsocketStream.prototype.registerProcessor = function (name, handler) {
        this.handlers.set(name, handler);
    };
    /**
     * Send next stream data to websocket.
     *
     * @param streamName the stream name.
     * @param data the data to send.
     * @param options the options.
     */
    WebsocketStream.prototype.sendNext = function (streamName, data, options) {
        if (!this.socket) {
            throw new Error('WebsocketStream: socket is not ready.');
        }
        var packet = { streamName: streamName, state: WebsocketStreamState.Data, data: data, options: options };
        this.debugLog('Socket sending data.', packet);
        this.socket.next(JSON.stringify(packet));
    };
    /**
     * Send error stream data to websocket.
     *
     * @param streamName the stream name.
     * @param error the error to send.
     * @param options the options.
     */
    WebsocketStream.prototype.sendError = function (streamName, error, options) {
        if (!this.socket) {
            throw new Error('WebsocketStream: socket is not ready.');
        }
        var packet = { streamName: streamName, state: WebsocketStreamState.Error, data: error, options: options };
        this.debugLog('Socket sending error.', packet);
        this.socket.next(JSON.stringify(packet));
    };
    /**
     * Get target data.
     * @param authorizationManager the authorization manager.
     * @param nodeName the node Name
     * @return  WebsocketStreamDataTarget target data.
     */
    WebsocketStream.prototype.getTarget = function (authorizationManager, nodeName) {
        var headers = authorizationManager.createTokenHeaders(nodeName);
        var target = { nodeName: nodeName, headers: headers };
        return target;
    };
    WebsocketStream.prototype.initialize = function (firstTime) {
        var _this = this;
        // get gateway socket url.
        var gatewaySocketUrl = this.gateway.gatewayUrl.replace('http', 'ws');
        var moduleName = window.MsftSme.Init.moduleName;
        var url = Net.streamSocket.format(gatewaySocketUrl, moduleName);
        this.debugLog('Socket initializing...: {0}'.format(url));
        if (!firstTime) {
            this.handlers.forEach(function (value) { return value.reset(); });
        }
        // create stream socket.
        this.socketState.next(WebsocketStreamConnectionState.Initializing);
        this.socket = Observable.webSocket({
            url: url,
            openObserver: {
                next: function (openEvent) {
                    _this.debugLog('Socket opened: {0}'.format(url));
                    _this.socketState.next(WebsocketStreamConnectionState.Connected);
                    _this.socketStateRaw = WebsocketStreamConnectionState.Connected;
                    _this.connectionRetries = WebsocketStream.maxConnectionRetries;
                }
            },
            closeObserver: {
                next: function (closeEvent) {
                    _this.debugLog('Socket closed: {0}'.format(url));
                    _this.socketState.next(WebsocketStreamConnectionState.Disconnected);
                    _this.socketStateRaw = WebsocketStreamConnectionState.Disconnected;
                    _this.reconnect(new Error(_this.strings.Common.ConnectionRetiesError.message));
                }
            }
        });
        this.socket.subscribe(function (received) {
            var message = received;
            _this.debugLog('Socket received data.', message);
            if (message.state === WebsocketStreamState.Data) {
                var handler = _this.handlers.get(message.streamName);
                if (handler) {
                    handler.process(message.data);
                }
                else {
                    throw new Error(_this.strings.Common.HandlerRegistrationError.message.format(message.streamName));
                }
            }
            else if (message.state === WebsocketStreamState.Error) {
                var errorMessage = _this.strings.Common.CommunicationError.message;
                if (message.data && message.data.error && message.data.error.message) {
                    errorMessage = _this.strings.Common.CommunicationErrorDetail.message.format(message.data.error.message);
                }
                Logging.log({ level: LogLevel.Error, source: 'WebsocketStream', message: errorMessage });
                _this.reconnect(new Error(errorMessage));
            }
        }, function (error) { return _this.reconnect(error); });
    };
    WebsocketStream.prototype.dispose = function () {
        if (this.socket) {
            this.socket.unsubscribe();
            this.socket = null;
        }
    };
    WebsocketStream.prototype.reconnect = function (error) {
        var _this = this;
        if (this.connectionRetries-- > 0) {
            this.dispose();
            setTimeout(function () { return _this.initialize(false); }, WebsocketStream.reconnectWaitTime);
        }
        else {
            this.socketState.next(WebsocketStreamConnectionState.Failed);
            throw error;
        }
    };
    WebsocketStream.prototype.debugLog = function (message, object) {
        Logging.log({ level: LogLevel.Debug, source: 'WebsocketStream', message: message });
        if (object) {
            Logging.debug(object);
        }
    };
    return WebsocketStream;
}());
export { WebsocketStream };
WebsocketStream.maxConnectionRetries = 10;
WebsocketStream.reconnectWaitTime = 500;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS93ZWJzb2NrZXQtc3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVksYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFJakQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLDhCQXlCWDtBQXpCRCxXQUFZLDhCQUE4QjtJQUN0Qzs7T0FFRztJQUNILG1HQUFnQixDQUFBO0lBRWhCOztPQUVHO0lBQ0gsNkZBQVMsQ0FBQTtJQUVUOztPQUVHO0lBQ0gsbUdBQVksQ0FBQTtJQUVaOztPQUVHO0lBQ0gsdUZBQU0sQ0FBQTtJQUVOOztPQUVHO0lBQ0gscUdBQWEsQ0FBQTtBQUNqQixDQUFDLEVBekJXLDhCQUE4QixLQUE5Qiw4QkFBOEIsUUF5QnpDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxvQkFlWDtBQWZELFdBQVksb0JBQW9CO0lBQzVCOztPQUVHO0lBQ0gsK0RBQVEsQ0FBQTtJQUVSOztPQUVHO0lBQ0gsK0RBQUksQ0FBQTtJQUVKOztPQUVHO0lBQ0gsaUVBQUssQ0FBQTtBQUNULENBQUMsRUFmVyxvQkFBb0IsS0FBcEIsb0JBQW9CLFFBZS9CO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSwrQkFlWDtBQWZELFdBQVksK0JBQStCO0lBQ3ZDOztPQUVHO0lBQ0gscUZBQVEsQ0FBQTtJQUVSOztPQUVHO0lBQ0gseUZBQU0sQ0FBQTtJQUVOOztPQUVHO0lBQ0gseUZBQU0sQ0FBQTtBQUNWLENBQUMsRUFmVywrQkFBK0IsS0FBL0IsK0JBQStCLFFBZTFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSx3QkF5Qlg7QUF6QkQsV0FBWSx3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Q3pGLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUM1QyxDQUFDO1FBQ0wsQ0FBQyxFQUNELFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTyxpQ0FBTyxHQUFmO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7SUFDTCxDQUFDO0lBRU8sbUNBQVMsR0FBakIsVUFBa0IsS0FBVTtRQUE1QixpQkFRQztRQVBHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2YsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUF0QixDQUFzQixFQUFFLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdELE1BQU0sS0FBSyxDQUFDO1FBQ2hCLENBQUM7SUFDTCxDQUFDO0lBRU8sa0NBQVEsR0FBaEIsVUFBaUIsT0FBZSxFQUFFLE1BQVk7UUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNwRixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixDQUFDO0lBQ0wsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FsS0EsQUFrS0M7O0FBaktrQixvQ0FBb0IsR0FBRyxFQUFFLENBQUM7QUFDMUIsaUNBQWlCLEdBQUcsR0FBRyxDQUFDIiwiZmlsZSI6IndlYnNvY2tldC1zdHJlYW0uanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9