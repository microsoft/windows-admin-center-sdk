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
import { Observable } from 'rxjs';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { WebsocketStreamConnectionState, WebsocketStreamDataRequestState, WebsocketStreamDataState, WebsocketStreamProcessor } from './websocket-stream';
/**
 * Cim result format.
 */
var CimResultFormat;
(function (CimResultFormat) {
    /**
     * Single instance result.
     */
    CimResultFormat[CimResultFormat["Single"] = 0] = "Single";
    /**
     * Multiple instances result.
     */
    CimResultFormat[CimResultFormat["Multiple"] = 1] = "Multiple";
    /**
     * Mixed data result.
     */
    CimResultFormat[CimResultFormat["Result"] = 2] = "Result";
})(CimResultFormat || (CimResultFormat = {}));
/**
 * Cim Processor interface. Each Cim query creates new observable.
 */
var CimProcessor = /** @class */ (function (_super) {
    __extends(CimProcessor, _super);
    /**
     * Initializes a new instance of the CimProcessor class.
     * @param observer Observer to send back result to caller.
     * @param target Stream Target object.
     * @param format CIM result format.
     * @param options Options for Cim stream query.
     */
    function CimProcessor(observer, target, format, options) {
        var _this = _super.call(this, observer, target, options) || this;
        _this.format = format;
        return _this;
    }
    return CimProcessor;
}(WebsocketStreamProcessor));
/**
 * The CIM stream class.
 */
var CimStream = /** @class */ (function () {
    /**
     * Initializes a new instance of the CimStream class.
     *
     * @param websocketStream the websocket stream object.
     * @param authorizationManager the authorization manager object.
     */
    function CimStream(websocketStream, authorizationManager) {
        this.websocketStream = websocketStream;
        this.authorizationManager = authorizationManager;
        this.processors = new Map();
        this.strings = MsftSme.resourcesStrings().MsftSmeShell.Core.WebsocketStream.CimStream;
        websocketStream.registerProcessor('SME-CIM', this);
    }
    /**
     * CIM Get MultipleInstances
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param options the options for this request.
     * @return Observable<CimResult> the query observable.
     */
    CimStream.prototype.getInstanceMultiple = function (nodeName, namespace, className, options) {
        var name = 'CimGetInstanceMultiple';
        var request = { name: name, namespace: namespace, className: className };
        var requestState = WebsocketStreamDataRequestState.Normal;
        return this.createRequest(nodeName, requestState, request, CimResultFormat.Multiple, options);
    };
    /**
     * CIM Get SingleInstance
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param keyProperties the key properties object.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    CimStream.prototype.getInstanceSingle = function (nodeName, namespace, className, keyProperties, options) {
        var name = 'CimGetInstanceSingle';
        var request = { name: name, namespace: namespace, className: className, keyProperties: keyProperties };
        var requestState = WebsocketStreamDataRequestState.Normal;
        return this.createRequest(nodeName, requestState, request, CimResultFormat.Single, options);
    };
    /**
     * CIM Invoke InstanceMethod
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param methodName the method name.
     * @param keyProperties the key properties object.
     * @param data the method input data.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    CimStream.prototype.invokeMethodInstance = function (nodeName, namespace, className, methodName, keyProperties, data, options) {
        var name = 'CimInvokeMethodInstance';
        var request = { name: name, namespace: namespace, className: className, methodName: methodName, keyProperties: keyProperties, data: data };
        var requestState = WebsocketStreamDataRequestState.Normal;
        return this.createRequest(nodeName, requestState, request, CimResultFormat.Result, options);
    };
    /**
     * CIM Invoke StaticMethod
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param methodName the method name.
     * @param data the method input data.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    CimStream.prototype.invokeMethodStatic = function (nodeName, namespace, className, methodName, data, options) {
        var name = 'CimInvokeMethodStatic';
        var request = { name: name, namespace: namespace, className: className, methodName: methodName, data: data };
        var requestState = WebsocketStreamDataRequestState.Normal;
        return this.createRequest(nodeName, requestState, request, CimResultFormat.Result, options);
    };
    /**
     * CIM Set SingleInstance
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param keyProperties the key properties object.
     * @param data the method input data.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    CimStream.prototype.setInstance = function (nodeName, namespace, className, keyProperties, data, options) {
        var name = 'CimSetInstance';
        var request = { name: name, namespace: namespace, className: className, keyProperties: keyProperties, data: data };
        var requestState = WebsocketStreamDataRequestState.Normal;
        return this.createRequest(nodeName, requestState, request, CimResultFormat.Single, options);
    };
    /**
     * CIM Modify SingleInstance
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param keyProperties the key properties object.
     * @param data the method input data.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    CimStream.prototype.modifyInstance = function (nodeName, namespace, className, keyProperties, data, options) {
        var name = 'CimModifyInstance';
        var request = { name: name, namespace: namespace, className: className, keyProperties: keyProperties, data: data };
        var requestState = WebsocketStreamDataRequestState.Normal;
        return this.createRequest(nodeName, requestState, request, CimResultFormat.Single, options);
    };
    /**
     * CIM Delete SingleInstance
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param keyProperties the key properties object.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    CimStream.prototype.deleteInstance = function (nodeName, namespace, className, keyProperties, options) {
        var name = 'CimDeleteInstance';
        var request = { name: name, namespace: namespace, className: className, keyProperties: keyProperties };
        var requestState = WebsocketStreamDataRequestState.Normal;
        return this.createRequest(nodeName, requestState, request, CimResultFormat.Single, options);
    };
    /**
     * CIM Submit WqlQuery
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param query the WQL string.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    CimStream.prototype.getInstanceQuery = function (nodeName, namespace, query, options) {
        var name = 'CimGetInstanceQuery';
        var request = { name: name, namespace: namespace, query: query };
        var requestState = WebsocketStreamDataRequestState.Normal;
        return this.createRequest(nodeName, requestState, request, CimResultFormat.Multiple, options);
    };
    /**
     * Cancel active CIM query.
     * Result response comes back to the original query to end.
     *
     * @param nodeName the node name.
     * @param id the id of original request specified as options.queryId.
     */
    CimStream.prototype.cancel = function (nodeName, id) {
        var target = this.websocketStream.getTarget(this.authorizationManager, nodeName);
        var requestState = WebsocketStreamDataRequestState.Cancel;
        var request = { id: id, target: target, requestState: requestState, request: null };
        this.websocketStream.sendNext('SME-CIM', request);
    };
    /**
     * Reset data for connection cleanup.
     */
    CimStream.prototype.reset = function () {
        var _this = this;
        Logging.log({ level: LogLevel.Warning, message: this.strings.ResetError.message, source: 'CimStream' });
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
    CimStream.prototype.process = function (message) {
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
    CimStream.prototype.operationNext = function (processor, response) {
        var partial = processor.options && processor.options.partial;
        if (!response) {
            return !partial;
        }
        // buffering result.
        if (!partial) {
            if (processor.format === CimResultFormat.Single) {
                // expecting - { response: any }
                processor.response = response;
            }
            else if (processor.format === CimResultFormat.Multiple) {
                // expecting - { response: { value: any[]; } } format.
                if (!response || !response.value) {
                    Logging.log({ level: LogLevel.Error, message: this.strings.UnexpectedMultipleError.message, source: 'CimStream' });
                }
                else {
                    if (!processor.response) {
                        processor.response = response;
                    }
                    else {
                        response.value.forEach(function (value) { return processor.response.value.push(value); });
                    }
                }
            }
            else if (processor.format === CimResultFormat.Result) {
                // expecting - { response: { results: any[] }, <name1>: <value1>, <name2>: <value2> } format.
                if (!processor.response) {
                    processor.response = response;
                }
                else {
                    if (response.results) {
                        if (processor.response.results) {
                            response.results.forEach(function (value) { return processor.response.results.push(value); });
                            response.results = undefined;
                        }
                    }
                    // merge other properties.
                    processor.response = __assign({}, processor.response, response);
                }
            }
        }
        else {
            processor.next(response);
        }
        return !partial;
    };
    CimStream.prototype.operationComplete = function (processor, response) {
        if (this.operationNext(processor, response)) {
            // complete mode to send all result once.
            processor.next(processor.response);
        }
        if (!processor.sendOnce) {
            // send null if no result was produced but success.
            processor.next(null);
        }
        processor.complete();
    };
    CimStream.prototype.operationError = function (processor, error) {
        processor.error(error);
    };
    CimStream.prototype.operationEnd = function (id) {
        this.processors.delete(id);
    };
    CimStream.prototype.createRequest = function (nodeName, requestState, request, format, options) {
        var _this = this;
        // publish object is created two ways.
        // 1) socket is connected so submit the request immediately with simple observable.
        //   (if-block and this is the most of cases.)
        // 2) socket is not connected so wait for the socket to ready and submit request with
        //    complex observable. Initial connect and re-connection takes this observable.
        //   (else-block and this is a few cases.)
        var publish;
        if (this.websocketStream.socketStateRaw === WebsocketStreamConnectionState.Connected) {
            publish = this.createRequestSimple(nodeName, requestState, request, format, options);
        }
        else {
            publish = this.websocketStream.socketState
                .filter(function (state) { return state === WebsocketStreamConnectionState.Connected
                || state === WebsocketStreamConnectionState.Failed
                || state === WebsocketStreamConnectionState.NotConfigured; })
                .take(1)
                .flatMap(function (state) {
                if (state === WebsocketStreamConnectionState.Connected) {
                    return _this.createRequestSimple(nodeName, requestState, request, format, options);
                }
                return Observable.throw(new Error(_this.strings.ConnectionError.message));
            });
        }
        return publish
            .catch(function (error, caught) {
            // retry if reset connection of socket was observed.
            if (error && error.message === _this.strings.ResetError.message) {
                return _this.createRequest(nodeName, requestState, request, format, options);
            }
            return Observable.throw(error);
        });
    };
    CimStream.prototype.createRequestSimple = function (nodeName, requestState, request, format, options) {
        var _this = this;
        return Observable.create(function (observer) {
            var target = _this.websocketStream.getTarget(_this.authorizationManager, nodeName);
            var id = _this.sendRequest(observer, target, requestState, request, format, options);
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
    CimStream.prototype.sendRequest = function (observer, target, requestState, request, format, options) {
        var id = (options && options.queryId) || MsftSme.getUniqueId();
        var processor = new CimProcessor(observer, target, format, options);
        this.processors.set(id, processor);
        this.websocketStream.sendNext('SME-CIM', { id: id, target: target, requestState: requestState, request: request, options: options });
        return id;
    };
    return CimStream;
}());
export { CimStream };
//# sourceMappingURL=data:application/json;base64,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