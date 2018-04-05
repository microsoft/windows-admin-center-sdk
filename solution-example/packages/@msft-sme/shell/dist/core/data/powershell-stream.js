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
import { Observable } from 'rxjs';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { WebsocketStreamConnectionState, WebsocketStreamDataRequestState, WebsocketStreamDataState, WebsocketStreamProcessor } from './websocket-stream';
/**
 * PowerShell Processor interface.
 */
var PowerShellProcessor = (function (_super) {
    __extends(PowerShellProcessor, _super);
    function PowerShellProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PowerShellProcessor;
}(WebsocketStreamProcessor));
/**
 * The PowerShell stream class.
 */
var PowerShellStream = (function () {
    /**
     * Initializes a new instance of the PowerShellStream class.
     *
     * @param websocketStream the websocket stream object.
     * @param authorizationManager the authorization manager object.
     */
    function PowerShellStream(websocketStream, authorizationManager) {
        this.websocketStream = websocketStream;
        this.authorizationManager = authorizationManager;
        this.processors = new Map();
        this.queues = new Map();
        this.strings = MsftSme.resourcesStrings().MsftSmeShell.Core.WebsocketStream.PowerShellStream;
        websocketStream.registerProcessor('SME-PowerShell', this);
    }
    /**
     * PowerShell script run.
     *
     * @param nodeName the node name.
     * @param script the script to run.
     * @param options the options for this request.
     * @return Observable<PowerShellResult> the query observable.
     */
    PowerShellStream.prototype.run = function (nodeName, script, options) {
        return this.createRequest(nodeName, script, options);
    };
    /**
     * Cancel active powershell script.
     * Result response comes back to the original query to end.
     *
     * @param nodeName the node name.
     * @param id the id of original request specified as options.queryId.
     */
    PowerShellStream.prototype.cancel = function (nodeName, id) {
        var target = this.getTarget(nodeName);
        var requestState = WebsocketStreamDataRequestState.Cancel;
        var request = { id: id, target: target, requestState: requestState, script: null };
        // remove from queue if not submitted yet.
        var queue = this.queues.get(target.nodeName);
        if (queue) {
            var pendingRequest = queue.pendingRequests.find(function (entry) { return entry.id === id; });
            if (pendingRequest) {
                queue.pendingRequests.remove(pendingRequest);
                queue.outstandingCount--;
                var processor = this.processors.get(id);
                this.processors.delete(id);
                processor.complete();
                return;
            }
        }
        this.websocketStream.sendNext('SME-PowerShell', request);
    };
    /**
     * Reset data for connection cleanup.
     */
    PowerShellStream.prototype.reset = function () {
        var _this = this;
        Logging.log({ level: LogLevel.Warning, message: this.strings.ResetError.message, source: 'PowerShellStream' });
        var processors = [];
        this.processors.forEach(function (value, key, map) { return processors.push(value); });
        this.processors.clear();
        processors.forEach(function (processor, key, map) {
            processor.error(new Error(_this.strings.ResetError.message));
        });
    };
    /**
     * Process the socket message.
     *
     * @param message the socket message.
     */
    PowerShellStream.prototype.process = function (message) {
        if (!message) {
            throw new Error(this.strings.NoContentError.message);
        }
        var processor = this.processors.get(message.id);
        if (!processor) {
            Logging.log({ level: LogLevel.Warning, message: this.strings.UnexpectedReceivedError.message, source: 'PowerShellStream' });
            return;
        }
        switch (message.state) {
            case WebsocketStreamDataState.Data:
                this.operationNext(processor, message.response);
                break;
            case WebsocketStreamDataState.Completed:
                this.operationComplete(processor, message.response);
                this.operationEnd(message.id);
                break;
            case WebsocketStreamDataState.Error:
                this.operationError(processor, { xhr: message });
                this.operationEnd(message.id);
                break;
            case WebsocketStreamDataState.Noop:
                break;
        }
    };
    PowerShellStream.prototype.operationNext = function (processor, response) {
        var partial = processor.options && processor.options.partial;
        // buffering result.
        if (!partial) {
            if (!processor.response) {
                processor.response = response;
            }
            else {
                if (response.errors) {
                    if (!processor.response.errors) {
                        processor.response.errors = response.errors;
                    }
                    else {
                        response.errors.forEach(function (value) { return processor.response.errors.push(value); });
                    }
                }
                if (response.progress) {
                    if (!processor.response.progress) {
                        processor.response.progress = response.progress;
                    }
                    else {
                        response.progress.forEach(function (value) { return processor.response.progress.push(value); });
                    }
                }
                if (response.results) {
                    if (!processor.response.results) {
                        processor.response.results = response.results;
                    }
                    else {
                        response.results.forEach(function (value) { return processor.response.results.push(value); });
                    }
                }
            }
        }
        else {
            processor.next(response);
        }
        return !partial;
    };
    PowerShellStream.prototype.operationComplete = function (processor, response) {
        if (this.operationNext(processor, response)) {
            processor.next(processor.response);
        }
        processor.complete();
    };
    PowerShellStream.prototype.operationError = function (processor, error) {
        processor.error(error);
    };
    PowerShellStream.prototype.operationEnd = function (id) {
        var processor = this.processors.get(id);
        this.processors.delete(id);
        var queue = this.queues.get(processor.target.nodeName);
        if (--queue.outstandingCount === 0) {
            this.queues.delete(processor.target.nodeName);
        }
        if (queue.pendingRequests.length > 0) {
            // if there is queued item, then send request.
            var request = queue.pendingRequests.shift();
            this.websocketStream.sendNext('SME-PowerShell', request);
        }
    };
    PowerShellStream.prototype.createRequest = function (nodeName, script, options) {
        var _this = this;
        // publish object is created two ways.
        // 1) socket is connected so submit the request immediately with simple observable.
        //   (if-block and this is the most of cases.)
        // 2) socket is not connected so wait for the socket to ready and submit request with
        //    complex observable. Initial connect and re-connection takes this observable.
        //   (else-block and this is a few cases.)
        var publish;
        if (this.websocketStream.socketStateRaw === WebsocketStreamConnectionState.Connected) {
            publish = this.createRequestSimple(nodeName, script, options);
        }
        else {
            publish = this.websocketStream.socketState
                .filter(function (state) { return state === WebsocketStreamConnectionState.Connected
                || state === WebsocketStreamConnectionState.Failed
                || state === WebsocketStreamConnectionState.NotConfigured; })
                .take(1)
                .flatMap(function (state) {
                if (state === WebsocketStreamConnectionState.Connected) {
                    return _this.createRequestSimple(nodeName, script, options);
                }
                return Observable.throw(new Error(_this.strings.ConnectionError.message));
            });
        }
        return publish
            .catch(function (error, caught) {
            // retry if reset connection of socket was observed.
            if (error && error.message === _this.strings.ResetError.message) {
                return _this.createRequest(nodeName, script, options);
            }
            return Observable.throw(error);
        });
    };
    PowerShellStream.prototype.createRequestSimple = function (nodeName, script, options) {
        var _this = this;
        return Observable.create(function (observer) {
            var target = _this.getTarget(nodeName);
            var requestState = WebsocketStreamDataRequestState.Normal;
            var id = _this.sendRequest(observer, target, requestState, script, options);
            return function () {
                var processor = _this.processors.get(id);
                if (processor) {
                    processor.end = true;
                    if (!processor.closed && !processor.closing) {
                        _this.cancel(processor.target.nodeName, id);
                    }
                }
            };
        });
    };
    PowerShellStream.prototype.sendRequest = function (observer, target, requestState, script, options) {
        var id = (options && options.queryId) || MsftSme.getUniqueId();
        var request = { id: id, target: target, requestState: requestState, script: script, options: options };
        var processor = new PowerShellProcessor(observer, target, options);
        var queue = this.queues.get(target.nodeName);
        this.processors.set(id, processor);
        if (options && options.close) {
            // disposing session.
            this.websocketStream.sendNext('SME-PowerShell', request);
            return id;
        }
        if (++queue.outstandingCount > PowerShellStream.maxRunPerNode) {
            queue.pendingRequests.push(request);
            return id;
        }
        this.websocketStream.sendNext('SME-PowerShell', request);
        return id;
    };
    PowerShellStream.prototype.getTarget = function (nodeName) {
        if (!this.queues.has(nodeName)) {
            var queue = { outstandingCount: 0, pendingRequests: [] };
            this.queues.set(nodeName, queue);
        }
        return this.websocketStream.getTarget(this.authorizationManager, nodeName);
    };
    return PowerShellStream;
}());
export { PowerShellStream };
PowerShellStream.maxRunPerNode = 5;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9wb3dlcnNoZWxsLXN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUU1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBS2pELE9BQU8sRUFFSCw4QkFBOEIsRUFDOUIsK0JBQStCLEVBQy9CLHdCQUF3QixFQUl4Qix3QkFBd0IsRUFFM0IsTUFBTSxvQkFBb0IsQ0FBQztBQTJINUI7O0dBRUc7QUFDSDtJQUFrQyx1Q0FBbUU7SUFBckc7O0lBS0EsQ0FBQztJQUFELDBCQUFDO0FBQUQsQ0FMQSxBQUtDLENBTGlDLHdCQUF3QixHQUt6RDtBQWlCRDs7R0FFRztBQUNIO0lBTUk7Ozs7O09BS0c7SUFDSCwwQkFBb0IsZUFBZ0MsRUFBVSxvQkFBMEM7UUFBcEYsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQVUseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQVZoRyxlQUFVLEdBQThDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDbEUsV0FBTSxHQUFzRCxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3RFLFlBQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztRQVNyRyxlQUFlLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSw4QkFBRyxHQUFWLFVBQ0ksUUFBZ0IsRUFDaEIsTUFBYyxFQUNkLE9BQWlDO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7Ozs7T0FN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