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
var PowerShellProcessor = /** @class */ (function (_super) {
    __extends(PowerShellProcessor, _super);
    function PowerShellProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PowerShellProcessor;
}(WebsocketStreamProcessor));
/**
 * The PowerShell stream class.
 */
var PowerShellStream = /** @class */ (function () {
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
    PowerShellStream.prototype.run = function (nodeName, commandOrScript, options) {
        var command;
        if (typeof commandOrScript === 'string') {
            command = { script: commandOrScript };
        }
        else {
            command = commandOrScript;
        }
        return this.createRequest(nodeName, command, options);
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
    PowerShellStream.prototype.createRequest = function (nodeName, command, options) {
        var _this = this;
        // publish object is created two ways.
        // 1) socket is connected so submit the request immediately with simple observable.
        //   (if-block and this is the most of cases.)
        // 2) socket is not connected so wait for the socket to ready and submit request with
        //    complex observable. Initial connect and re-connection takes this observable.
        //   (else-block and this is a few cases.)
        var publish;
        if (this.websocketStream.socketStateRaw === WebsocketStreamConnectionState.Connected) {
            publish = this.createRequestSimple(nodeName, command, options);
        }
        else {
            publish = this.websocketStream.socketState
                .filter(function (state) { return state === WebsocketStreamConnectionState.Connected
                || state === WebsocketStreamConnectionState.Failed
                || state === WebsocketStreamConnectionState.NotConfigured; })
                .take(1)
                .flatMap(function (state) {
                if (state === WebsocketStreamConnectionState.Connected) {
                    return _this.createRequestSimple(nodeName, command, options);
                }
                return Observable.throw(new Error(_this.strings.ConnectionError.message));
            });
        }
        return publish
            .catch(function (error, caught) {
            // retry if reset connection of socket was observed.
            if (error && error.message === _this.strings.ResetError.message) {
                return _this.createRequest(nodeName, command, options);
            }
            return Observable.throw(error);
        });
    };
    PowerShellStream.prototype.createRequestSimple = function (nodeName, command, options) {
        var _this = this;
        return Observable.create(function (observer) {
            var target = _this.getTarget(nodeName);
            var requestState = WebsocketStreamDataRequestState.Normal;
            var id = _this.sendRequest(observer, target, requestState, command, options);
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
    PowerShellStream.prototype.sendRequest = function (observer, target, requestState, command, options) {
        var id = (options && options.queryId) || MsftSme.getUniqueId();
        var request = {
            id: id,
            target: target,
            requestState: requestState,
            module: command.module,
            script: command.script,
            command: command.command,
            parameters: command.parameters,
            options: options
        };
        var processor = new PowerShellProcessor(observer, target, options);
        var queue = this.queues.get(target.nodeName);
        this.processors.set(id, processor);
        // During a send request, if caller provides 'options.close' as true,
        // we shouldn't manage the request via a queue and on Gateway, we should create a 
        // new, one time use Runspace, which is disposed after use, instead of using one from the pool. 
        // As currently this is not handled on Gateway, just ignore the 'options.close' for now.
        /*
        if (options && options.close) {
            // disposing session.
            this.websocketStream.sendNext('SME-PowerShell', request);
            return id;
        }
        */
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
    PowerShellStream.maxRunPerNode = 5;
    return PowerShellStream;
}());
export { PowerShellStream };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9wb3dlcnNoZWxsLXN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUU1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBS2pELE9BQU8sRUFFSCw4QkFBOEIsRUFDOUIsK0JBQStCLEVBQy9CLHdCQUF3QixFQUl4Qix3QkFBd0IsRUFFM0IsTUFBTSxvQkFBb0IsQ0FBQztBQTBJNUI7O0dBRUc7QUFDSDtJQUFrQyx1Q0FBbUU7SUFBckc7O0lBS0EsQ0FBQztJQUFELDBCQUFDO0FBQUQsQ0FMQSxBQUtDLENBTGlDLHdCQUF3QixHQUt6RDtBQWlCRDs7R0FFRztBQUNIO0lBTUk7Ozs7O09BS0c7SUFDSCwwQkFBb0IsZUFBZ0MsRUFBVSxvQkFBMEM7UUFBcEYsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQVUseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQVZoRyxlQUFVLEdBQThDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDbEUsV0FBTSxHQUFzRCxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3RFLFlBQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztRQVNyRyxlQUFlLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSw4QkFBRyxHQUFWLFVBQ1EsUUFBZ0IsRUFDaEIsZUFBMkMsRUFDM0MsT0FBaUM7UUFDckMsSUFBSSxPQUEwQixDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sZUFBZSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdEMsT0FBTyxHQUFz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O1lBQ3RCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87WUFDeEIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVO1lBQzlCLE9BQU8sU0FBQTtTQUFFLENBQUM7UUFDZCxJQUFNLFNBQVMsR0FBRyxJQUFJLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDckUsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVuQyxxRUFBcUU7UUFDckUsa0ZBQWtGO1FBQ2xGLGdHQUFnRztRQUNoRyx3RkFBd0Y7UUFDeEY7Ozs7OztVQU1FO1FBRUYsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUM1RCxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNuQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRU8sb0NBQVMsR0FBakIsVUFBa0IsUUFBZ0I7UUFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBTSxLQUFLLEdBQTBCLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUNsRixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQWhTYyw4QkFBYSxHQUFHLENBQUMsQ0FBQztJQWlTckMsdUJBQUM7Q0FsU0QsQUFrU0MsSUFBQTtTQWxTWSxnQkFBZ0IiLCJmaWxlIjoicG93ZXJzaGVsbC1zdHJlYW0uanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9