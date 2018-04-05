import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { EnvironmentModule } from '../manifest/environment-modules';
import { Http } from './http';
import { headerConstants } from './http-constants';
import { Net } from './net';
/**
 * The Batch Connection class for creating requests and calling the Gateway's Http API
 */
var BatchConnection = (function () {
    /**
     * Initializes a new instance of the BatchConnection class.
     *
     * @param gateway the gateway Connection
     * @param authorizationManager the authorization manager.
     */
    function BatchConnection(gateway, authorizationManager) {
        this.gateway = gateway;
        this.authorizationManager = authorizationManager;
        this.moduleName = null;
    }
    /**
     * Makes a batch call to the gateway api, by using provided methods for each node.
     *
     * Auth handling: createBody() handles the Auth for individual calls in the batch. It gets the needed tokens
     *                for each node and adds to the batch body, along with rest of node call.
     *                See authorizationManager.addAuthorizationTokensToMultiPartBody() for details.
     * For the outer batch call, we use the auth token from the first node in list.
     * @param nodesList : list of nodes we will be running the batch against.
     * @param relativeUrlList : list of relative Urls of nodes after "/api/nodes/<nodeName>/"
     * @param bodyCommandList : list of body commands, that will be present in body of a typical Post call.
     *                          This is essentially a json request that we keep as a string to put it in the body.
     * Ex: {
     *      "properties": {
     *          "command": "##GetVirtualMachines##\n\nSet-StrictMode -Version 5.0\nget-vm | Select-Object name, id, CPUUsage"
     *          }
     *      }
     *
     * @param methodsList : list of Http methods, with each item corresponding to the node in nodeList and relativeUrl in relativeUrlList.
     * @param request : optional request Properties.
     */
    BatchConnection.prototype.mixed = function (nodesList, relativeUrlList, bodyCommandList, methodsList, request) {
        var _this = this;
        var batchCallRelativeUrl = Net.batch;
        var boundary = MsftSme.newGuid();
        var guidsList = this.generateGuidsList(nodesList.length);
        var guidsToRequestCtxMap = this.generateGuidToRequestContextMap(nodesList, guidsList);
        // populate request properties.
        request = this.createBatchRequest(request || {});
        // populate batch request headers.
        this.setRequestHeaders(request, boundary);
        // Create batch command body.
        var body = this.createBody(nodesList, relativeUrlList, guidsList, methodsList, boundary, bodyCommandList, request);
        return this.gateway.post(batchCallRelativeUrl, body, request).map(function (responseData) {
            var parsedResponse = _this.parseMultiPartResponse(responseData, guidsToRequestCtxMap);
            return parsedResponse;
        });
    };
    /**
     * Makes a batch POST calls to the gateway api
     *
     * Auth handling: createBody() handles the Auth for individual calls in the batch. It gets the needed tokens
     *                for each node and adds to the batch body, along with rest of node call.
     *                See authorizationManager.addAuthorizationTokensToMultiPartBody() for details.
     * For the outer batch call, we use the auth token from the first node in list.
     * @param nodesList : list of nodes we will be running the batch against.
     * @param relativeUrlList : list of relative urls after "/api/nodes/<nodeName>/",  for each node.
     * @param bodyCommandList : list of body commands, that will be present in body of a typical Post call.
     * @param request : optional request Properties.
     */
    BatchConnection.prototype.post = function (nodesList, relativeUrlList, bodyCommandList, request) {
        var _this = this;
        var batchCallRelativeUrl = Net.batch;
        var boundary = MsftSme.newGuid();
        var guidsList = this.generateGuidsList(nodesList.length);
        var guidsToRequestCtxMap = this.generateGuidToRequestContextMap(nodesList, guidsList);
        // populate request properties.
        request = this.createBatchRequest(request || {});
        // populate batch request headers.
        this.setRequestHeaders(request, boundary);
        // Create batch command body.
        var body = this.createBodySingleMethod(nodesList, relativeUrlList, guidsList, Http.methodPost, boundary, bodyCommandList, request);
        return this.gateway.post(batchCallRelativeUrl, body, request).map(function (responseData) {
            var parsedResponse = _this.parseMultiPartResponse(responseData, guidsToRequestCtxMap);
            return parsedResponse;
        });
    };
    /**
     * Makes a batch GET call to the gateway api
     *
     * @param nodeList: the list of names of the node to call the API for
     * @param relativeUrlList: the list of relative Url after "/api/nodes/<nodeName>/"
     * @param request: the batch request object.
     */
    BatchConnection.prototype.get = function (nodesList, relativeUrlList, request) {
        var _this = this;
        var batchCallRelativeUrl = Net.batch;
        var boundary = MsftSme.newGuid();
        var guidsList = this.generateGuidsList(nodesList.length);
        var guidsToRequestCtxMap = this.generateGuidToRequestContextMap(nodesList, guidsList);
        // populate request properties.
        request = this.createBatchRequest(request || {});
        // populate batch request headers.
        this.setRequestHeaders(request, boundary);
        // Create batch command body.
        var body = this.createBodySingleMethod(nodesList, relativeUrlList, guidsList, Http.methodGet, boundary, null, request);
        return this.gateway.post(batchCallRelativeUrl, body, request).map(function (responseData) {
            var parsedResponse = _this.parseMultiPartResponse(responseData, guidsToRequestCtxMap);
            return parsedResponse;
        });
    };
    /**
     * Makes a batch PUT call to the gateway api
     *
     * @param nodesList : list of nodes we will be running the batch against.
     * @param relativeUrlList : list of relative Urls of nodes after "/api/nodes/<nodeName>/"
     * @param bodyCommandList : list of body commands, that will be present in body of a typical Post call.
     *                          This is essentially a json request that we keep as a string to put it in the body.
     * Ex: {
     *      "properties": {
     *          "command": "##GetVirtualMachines##\n\nSet-StrictMode -Version 5.0\nget-vm | Select-Object name, id, CPUUsage"
     *          }
     *      }
     *
     * @param request : optional request Properties.
     */
    BatchConnection.prototype.put = function (nodesList, relativeUrlList, bodyCommandList, request) {
        var _this = this;
        var batchCallRelativeUrl = Net.batch;
        var boundary = MsftSme.newGuid();
        var guidsList = this.generateGuidsList(nodesList.length);
        var guidsToRequestCtxMap = this.generateGuidToRequestContextMap(nodesList, guidsList);
        // populate request properties.
        request = this.createBatchRequest(request || {});
        // populate batch request headers.
        this.setRequestHeaders(request, boundary);
        // Create batch command body.
        var body = this.createBodySingleMethod(nodesList, relativeUrlList, guidsList, Http.methodPut, boundary, bodyCommandList, request);
        return this.gateway.post(batchCallRelativeUrl, body, request).map(function (responseData) {
            var parsedResponse = _this.parseMultiPartResponse(responseData, guidsToRequestCtxMap);
            return parsedResponse;
        });
    };
    /**
     * Makes a batch DELETE call to the gateway api
     *
     * @param nodeList: the list of names of the nodes to call the API for
     * @param relativeUrlList: the list of relative Urls of nodes after "/api/nodes/<nodeName>/"
     * @param request: the batch request object.
     */
    BatchConnection.prototype.delete = function (nodesList, relativeUrlList, request) {
        var _this = this;
        var batchCallRelativeUrl = Net.batch;
        var boundary = MsftSme.newGuid();
        var guidsList = this.generateGuidsList(nodesList.length);
        var guidsToRequestCtxMap = this.generateGuidToRequestContextMap(nodesList, guidsList);
        // populate request properties.
        request = this.createBatchRequest(request || {});
        // populate batch request headers.
        this.setRequestHeaders(request, boundary);
        // Create batch command body.
        var body = this.createBodySingleMethod(nodesList, relativeUrlList, guidsList, Http.methodDelete, boundary, null, request);
        return this.gateway.post(batchCallRelativeUrl, body, request).map(function (responseData) {
            var parsedResponse = _this.parseMultiPartResponse(responseData, guidsToRequestCtxMap);
            return parsedResponse;
        });
    };
    /**
     * Adds default parameters to Batch Request. For the outside batch call, we just use the Auth for first node in batch request.
     * No need to append any tokens for hitting Gateway, as browser handles that. For the nodes being managed,
     * the tokens are already part of body.
     *
     * @param request The batch request object.
     */
    BatchConnection.prototype.createBatchRequest = function (request) {
        var _this = this;
        if (!request.noAuth) {
            // Add Node specific authorization handlers
            request.retryHandlers = (request.retryHandlers || []).concat([{
                    canHandle: function (code, error) { return _this.authorizationManager.canHandleAjaxFailure(code, error); },
                    handle: function (code, originalRequest, error) {
                        return _this.authorizationManager.handleAjaxFailure(code, originalRequest, error);
                    }
                }]);
        }
        return request;
    };
    /**
     * Set the request headers for the batch call.
     * @param request : batch request object.
     * @param boundary : boundary string used to separate multi part request.
     */
    BatchConnection.prototype.setRequestHeaders = function (request, boundary) {
        // Set Batch request headers.
        request.headers = request.headers || {};
        request.headers[headerConstants.ACCEPT] = 'multipart/mixed';
        request.headers[headerConstants.CONTENT_TYPE] = 'multipart/mixed; boundary={0}'.format(boundary);
        request.responseType = 'text';
    };
    /**
     * Creates http multi-part request body, with each individual request being different Http request type.
     *
     * @param nodesList The list of target nodes.
     * @param relativeUrlList The relative url corresponding to each node
     * @param requestIdsList The guids list to be used for batch request, corresponding to each node.
     * @param methodList The Http method list, corresponding to each relative url in relativeUrlList.
     * @param boundary The boundary string to be used in multipart call
     * @param commandList The list of command body for each node.
     * @param request : optional node request options.
     */
    BatchConnection.prototype.createBody = function (nodesList, relativeUrlList, requestIdsList, methodList, boundary, commandList, request) {
        var host = this.gateway.gatewayUrl.replace('http://', '').replace('https://', '');
        var body = [];
        for (var index = 0; index < nodesList.length; index++) {
            var nodeName = nodesList[index];
            var relativeUrl = relativeUrlList[index];
            var method = methodList[index];
            var requestId = requestIdsList[index];
            if (commandList && commandList.length === nodesList.length) {
                this.createAndAddSinglePart(nodeName, relativeUrl, body, host, method, boundary, requestId, commandList[index], request);
            }
            else {
                this.createAndAddSinglePart(nodeName, relativeUrl, body, host, method, boundary, requestId, null, request);
            }
        }
        body.push('--' + boundary + '--');
        return body.join('\r\n');
    };
    /**
     * Creates http multi-part request body using same Http method for all parts.
     *
     * @param nodesList The list of target nodes.
     * @param relativeUrlList The relative url corresponding to each node
     * @param requestIdsList The guids list to be used for batch request, corresponding to each node.
     * @param method The Http method to be used for the call.
     * @param boundary The boundary string to be used in multipart call.
     * @param commandList The list of command body for each node.
     * @param request : optional node request options.
     */
    BatchConnection.prototype.createBodySingleMethod = function (nodesList, relativeUrlList, requestIdsList, method, boundary, commandList, request) {
        var host = this.gateway.gatewayUrl.replace('http://', '').replace('https://', '');
        var body = [];
        for (var index = 0; index < nodesList.length; index++) {
            var nodeName = nodesList[index];
            var relativeUrl = relativeUrlList[index];
            var requestId = requestIdsList[index];
            if (commandList && commandList.length === nodesList.length) {
                this.createAndAddSinglePart(nodeName, relativeUrl, body, host, method, boundary, requestId, commandList[index], request);
            }
            else {
                this.createAndAddSinglePart(nodeName, relativeUrl, body, host, method, boundary, requestId, null, request);
            }
        }
        body.push('--' + boundary + '--');
        return body.join('\r\n');
    };
    /**
     * Create the part for a single request and add it to to the multi-Part body.
     *
     * @param nodeName : node being targeted with the request. Used for Auth headers.
     * @param relativeUrl : the relative url of node for Delete request.
     * @param body : the HTTP request body to populate.
     * @param host : Host to run request against.
     * @param method The Http method to be used for the part.
     * @param boundary The boundary string to be used in multipart call.
     * @param requestId The request Id to be used for the part call.
     * @param commandBody : the command body to use for this part/node.
     * @param request : optional node request options.
     */
    BatchConnection.prototype.createAndAddSinglePart = function (nodeName, relativeUrl, body, host, method, boundary, requestId, commandBody, request) {
        body.push('--' + boundary);
        body.push('Content-type: application/http; msgtype=request');
        body.push('Content-Transfer-Encoding: binary\r\n');
        if (method === Http.methodGet) {
            this.addGetCommand(nodeName, relativeUrl, body, host, requestId, request);
        }
        else if (method === Http.methodPut) {
            this.addPutCommand(nodeName, relativeUrl, body, host, requestId, commandBody, request);
        }
        else if (method === Http.methodPost) {
            this.addPostCommand(nodeName, relativeUrl, body, host, requestId, commandBody, request);
        }
        else if (method === Http.methodDelete) {
            this.addDeleteCommand(nodeName, relativeUrl, body, host, requestId, request);
        }
        else {
            throw new Error(MsftSme.resourcesStrings().MsftSmeShell.Core.Error.BatchUnSupportedInvocation.message.format(method));
        }
    };
    /**
     * Create a HTTP Delete request and add it to to the multi-Part body.
     *
     * @param nodeName : node being targeted with the request. Used for Auth headers.
     * @param relativeUrl : the relative url of node for Delete request.
     * @param body : the HTTP request body to populate with Delete command.
     * @param host : Host to run request against.
     * @param requestId The request Id to be used for the part call.
     * @param request : optional node request options.
     */
    BatchConnection.prototype.addDeleteCommand = function (nodeName, relativeUrl, body, host, requestId, request) {
        var multiPartItemUrl = this.getNodeUrl(relativeUrl, nodeName, Http.methodDelete);
        body.push(multiPartItemUrl);
        this.writeCommonSection(nodeName, body, host, requestId, request);
        body.push('\r\n');
    };
    /**
     * Create a HTTP Get request and add it to to the multi-Part body.
     *
     * @param nodeName : node being targeted with the request. Used for Auth headers.
     * @param relativeUrl : the relative url of node for Get request.
     * @param body : the HTTP request body to populate with Get command.
     * @param host : Host to run request against.
     * @param requestId The request Id to be used for the part call.
     * @param request : optional node request options.
     */
    BatchConnection.prototype.addGetCommand = function (nodeName, relativeUrl, body, host, requestId, request) {
        var multiPartItemUrl = this.getNodeUrl(relativeUrl, nodeName, Http.methodGet);
        body.push(multiPartItemUrl);
        this.writeCommonSection(nodeName, body, host, requestId, request);
        body.push('\r\n');
    };
    /**
     * Create a HTTP Post request and add it to to the multi-Part body.
     *
     * @param nodeName : node being targeted with the request. Used for Auth headers.
     * @param relativeUrl : the relative url of node for Post request.
     * @param body : the HTTP request body to populate with Post command.
     * @param host : Host to run request against.
     * @param requestId The request Id to be used for the part call.
     * @param data : optional data for the Post request.
     * @param request : optional node request options.
     */
    BatchConnection.prototype.addPostCommand = function (nodeName, relativeUrl, body, host, requestId, data, request) {
        var multiPartItemUrl = this.getNodeUrl(relativeUrl, nodeName, Http.methodPost);
        body.push(multiPartItemUrl);
        this.writeCommonSection(nodeName, body, host, requestId, request);
        body.push('Content-Type: application/json; charset=utf-8');
        body.push('Accept: application/json, text/plain, */*');
        body.push('\r\n');
        body.push(data);
    };
    /**
     * Create a HTTP Put request and add it to to the multi-Part body.
     *
     * @param nodeName : node being targeted with the request. Used for Auth headers.
     * @param relativeUrl : the relative url of node for Put request.
     * @param body : the HTTP request body to populate with PUT command.
     * @param host : Host to run request against.
     * @param requestId The request Id to be used for the part call.
     * @param data : optional data for the Put request.
     * @param request : optional node request options.
     */
    BatchConnection.prototype.addPutCommand = function (nodeName, relativeUrl, body, host, requestId, data, request) {
        var multiPartItemUrl = this.getNodeUrl(relativeUrl, nodeName, Http.methodPut);
        body.push(multiPartItemUrl);
        this.writeCommonSection(nodeName, body, host, requestId, request);
        if (!data) {
            body.push('\r\n');
        }
        else {
            body.push('Content-Type: application/json; charset=utf-8');
            body.push('Accept: application/json, text/plain, */*');
            body.push('\r\n');
            body.push(data);
        }
    };
    /**
     * Write commnon sestion to body for all HTTP request types.
     * @param nodeName : node being targeted with the request.
     * @param body : The body string of the multi-part request being formed.
     * @param host : The host node(gateway node) for the batch call.
     * @param requestId The request Id to be used for the part call.
     * @param request : optional. The node request options.
     */
    BatchConnection.prototype.writeCommonSection = function (nodeName, body, host, requestId, request) {
        body.push('Host: ' + host);
        body.push('request-id: ' + requestId);
        body.push(headerConstants.MODULE_NAME + ': ' + this.nameOfModule);
        if (request) {
            if (request.logAudit === true || request.logAudit === false) {
                body.push(headerConstants.LOG_AUDIT + (request.logAudit ? ': true' : ': false'));
            }
            if (request.logTelemetry === true || request.logTelemetry === false) {
                body.push(headerConstants.LOG_TELEMETRY + (request.logTelemetry ? ': true' : ': false'));
            }
        }
        this.authorizationManager.addAuthorizationTokensToMultiPartBody(body, nodeName, (request && request.authToken));
    };
    /**
     * Creates a full Node url for multiPart call
     *  Ex: PUT /api/nodes/<nodeName>/<relativeUrl> HTTP/1.1
     *
     * @param relativeUrl the relative Url after "/nodes"
     * @param nodeName the name of the node to make a call against
     * @param actionName the Http call type: Put/Post/Delete/Get.
     */
    BatchConnection.prototype.getNodeUrl = function (relativeUrl, nodeName, actionName) {
        if (!relativeUrl.startsWith('/')) {
            relativeUrl = "/" + relativeUrl;
        }
        var nodesUrl = "nodes/" + nodeName + relativeUrl;
        var fullRelativeUrl = Net.apiRoot.format(nodesUrl);
        return Net.multiPartCallBodyUrl.format(actionName, fullRelativeUrl);
    };
    /**
     * Creates a list of guids to be used as request-ids in batch request.
     *
     * @param count the count of guids to be produced
     * @return the array of generated guids
     */
    BatchConnection.prototype.generateGuidsList = function (count) {
        var guidsList = [];
        for (var index = 0; index < count; index++) {
            guidsList.push(MsftSme.newGuid());
        }
        return guidsList;
    };
    /**
     * Creates a map of guids to NodeNames and sequence number, to be used to parse responses.
     *
     * @param orderedNodesList the list of Nodes to run batch against.
     * @param guidsList the list of guids to be used for requests.
     * @return the map of generated guids to BatchRequestContext
     */
    BatchConnection.prototype.generateGuidToRequestContextMap = function (orderedNodesList, guidsList) {
        if (orderedNodesList.length !== guidsList.length) {
            throw new Error();
        }
        var guidToRequestCtxMap = {};
        for (var index = 0; index < orderedNodesList.length; index++) {
            var sequenceNumber = index + 1;
            var nodeName = orderedNodesList[index];
            guidToRequestCtxMap[guidsList[index]] = { sequenceNumber: sequenceNumber, nodeName: nodeName };
        }
        return guidToRequestCtxMap;
    };
    /**
     * Parses http response.
     * See http://stackoverflow.com/questions/21229418/how-to-process-parse-read-a-multipart-mixed-boundary-batch-response
     * for sample response.
     * @param responseData: multipart response as received from the Batch call.
     * @param guidToRequestCtxMap: the map of request-id guids to BatchRequestContext.
     */
    BatchConnection.prototype.parseMultiPartResponse = function (responseData, guidToRequestCtxMap) {
        // ToDo: Check if we can update Gateway connection to get handle of response header, so we can extract the boundary from there.
        // Try to get boundary string from the response.
        var indexBoundaryStart = responseData.indexOf('--');
        var indexBoundaryEnd = responseData.indexOf('\r\n');
        if (indexBoundaryStart < 0 || indexBoundaryEnd < 0 || indexBoundaryStart > indexBoundaryEnd) {
            Logging.log({
                source: 'Batch PowerShell',
                level: LogLevel.Error,
                message: MsftSme.resourcesStrings().MsftSmeShell.Core.Error.BatchResponseParsing.message
                    .format(indexBoundaryStart, indexBoundaryEnd)
            });
            return [];
        }
        var boundary = responseData.slice(indexBoundaryStart, indexBoundaryEnd);
        var items = responseData.split(boundary);
        var results = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item === '' || item === '--\r\n') {
                continue;
            }
            var rows = item.split('\r\n');
            var status_1 = void 0;
            var data = void 0;
            var requestId = void 0;
            for (var _a = 0, rows_1 = rows; _a < rows_1.length; _a++) {
                var row = rows_1[_a];
                if (row.startsWith('HTTP/')) {
                    var values = row.split(' ');
                    status_1 = +values[1];
                }
                else if (row.toLowerCase().startsWith('request-id')) {
                    var values = row.split(' ');
                    requestId = values[1];
                }
                else if (row.startsWith('{') && row.endsWith('}')) {
                    try {
                        // try parse only when we have a valid return code.
                        if (!!status_1 && status_1 < 400) {
                            data = JSON.parse(row);
                        }
                        else {
                            data = row.toString();
                        }
                    }
                    catch (exception) {
                        // Log Exception on JSON parse fail.
                        Logging.log({
                            source: 'Batch PowerShell',
                            level: LogLevel.Error,
                            message: exception.message
                        });
                        // re throw.
                        throw exception;
                    }
                }
            }
            var response = { status: status_1, response: data };
            var sequenceNumber = 0;
            var nodeName = void 0;
            if (!!status_1 && status_1 < 400) {
                nodeName = guidToRequestCtxMap[requestId].nodeName;
                sequenceNumber = guidToRequestCtxMap[requestId].sequenceNumber;
            }
            results.push({ response: response, nodeName: nodeName, sequenceNumber: sequenceNumber });
        }
        return results;
    };
    Object.defineProperty(BatchConnection.prototype, "nameOfModule", {
        /**
         * Gets the name of current shell or module.
         */
        get: function () {
            if (!this.moduleName) {
                this.moduleName = EnvironmentModule.getModuleName();
            }
            return this.moduleName;
        },
        enumerable: true,
        configurable: true
    });
    return BatchConnection;
}());
export { BatchConnection };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9iYXRjaC1jb25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFHcEUsT0FBTyxFQUFFLElBQUksRUFBOEMsTUFBTSxRQUFRLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxPQUFPLENBQUM7QUEyQzVCOztHQUVHO0FBQ0g7SUFJSTs7Ozs7T0FLRztJQUNILHlCQUFvQixPQUEwQixFQUFVLG9CQUEwQztRQUE5RSxZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUFVLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFSMUYsZUFBVSxHQUFHLElBQUksQ0FBQztJQVE0RSxDQUFDO0lBRXZHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUJHO0lBQ0ksK0JBQUssR0FBWixVQUFhLFNBQW1CLEVBQUUsZUFBeUIsRUFBRSxlQUEwQixFQUFFLFdBQXNCLEVBQUUsT0FBc0I7UUFBdkksaUJBc0JDO1FBbkJHLElBQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN2QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RCxJQUFJLG9CQUFvQixHQUFHLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFdEYsK0JBQStCO1FBQy9CLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRWpELGtDQUFrQztRQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTFDLDZCQUE2QjtRQUM3QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUN0QixTQUFTLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU1RixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFlBQWlCO1lBQ2hGLElBQUksY0FBYyxHQUFHLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUNyRixNQUFNLENBQUMsY0FBYyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0ksOEJBQUksR0FBWCxVQUFZLFNBQW1CLEVBQUUsZUFBeUIsRUFBRSxlQUF5QixFQUFFLE9BQXNCO1FBQTdHLGlCQXNCQztRQW5CRyxJQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDdkMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsSUFBSSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsK0JBQStCLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXRGLCtCQUErQjtRQUMvQixPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVqRCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUUxQyw2QkFBNkI7UUFDN0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUNsQyxTQUFTLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFaEcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxZQUFpQjtZQUNoRixJQUFJLGNBQWMsR0FBRyxLQUFJLENBQUMsc0JBQXNCLENBQUMsWUFBWSxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDckYsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSw2QkFBRyxHQUFWLFVBQVcsU0FBbUIsRUFBRSxlQUF5QixFQUFFLE9BQXNCO1FBQWpGLGlCQXFCQztRQW5CRyxJQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDdkMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsSUFBSSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsK0JBQStCLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXRGLCtCQUErQjtRQUMvQixPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVqRCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUUxQyw2QkFBNkI7UUFDN0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUNsQyxTQUFTLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFcEYsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxZQUE0QjtZQUMzRixJQUFJLGNBQWMsR0FBRyxLQUFJLENBQUMsc0JBQXNCLENBQUMsWUFBWSxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDckYsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNJLDZCQUFHLEdBQVYsVUFBVyxTQUFtQixFQUFFLGVBQXlCLEVBQUUsZUFBMEIsRUFBRSxPQUFzQjtRQUE3RyxpQkFzQkM7UUFuQkcsSUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELElBQUksb0JBQW9CLEdBQUcsSUFBSSxDQUFDLCtCQUErQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV0RiwrQkFBK0I7UUFDL0IsT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7UUFFakQsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFMUMsNkJBQTZCO1FBQzdCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FDbEMsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRS9GLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsWUFBaUI7WUFDaEYsSUFBSSxjQUFjLEdBQUcsS0FBSSxDQUFDLHNCQUFzQixDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3JGLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksZ0NBQU0sR0FBYixVQUFjLFNBQW1CLEVBQUUsZUFBeUIsRUFBRSxPQUFzQjtRQUFwRixpQkFxQkM7UUFuQkcsSUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELElBQUksb0JBQW9CLEdBQUcsSUFBSSxDQUFDLCtCQUErQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV0RiwrQkFBK0I7UUFDL0IsT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7UUFFakQsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFMUMsNkJBQTZCO1FBQzdCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FDbEMsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXZGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsWUFBaUI7WUFDaEYsSUFBSSxjQUFjLEdBQUcsS0FBSSxDQUFDLHNCQUFzQixDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3JGLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ssNENBQWtCLEdBQTFCLFVBQTJCLE9BQXFCO1FBQWhELGlCQVdDO1FBVkcsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQiwyQ0FBMkM7WUFDM0MsT0FBTyxDQUFDLGFBQWEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzFELFNBQVMsRUFBRSxVQUFDLElBQUksRUFBRSxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsb0JBQW9CLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUEzRCxDQUEyRDtvQkFDdkYsTUFBTSxFQUFFLFVBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLO3dCQUNqQyxPQUFBLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssQ0FBQztvQkFBekUsQ0FBeUU7aUJBQ2hGLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSywyQ0FBaUIsR0FBekIsVUFBMEIsT0FBcUIsRUFBRSxRQUFnQjtRQUM3RCw2QkFBNkI7UUFFN0IsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUN4QyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxpQkFBaUIsQ0FBQztRQUM1RCxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsR0FBRywrQkFBK0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFakcsT0FBTyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSyxvQ0FBVSxHQUFsQixVQUNJLFNBQW1CLEVBQ25CLGVBQXlCLEVBQ3pCLGNBQXdCLEVBQ3hCLFVBQW9CLEVBQ3BCLFFBQWdCLEVBQ2hCLFdBQXNCLEVBQ3RCLE9BQXNCO1FBRXRCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsRixJQUFJLElBQUksR0FBYSxFQUFFLENBQUM7UUFFeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDcEQsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLElBQUksV0FBVyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsSUFBSSxTQUFTLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXRDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM3SCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDL0csQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSyxnREFBc0IsR0FBOUIsVUFDSSxTQUFtQixFQUNuQixlQUF5QixFQUN6QixjQUF3QixFQUN4QixNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsV0FBc0IsRUFDdEIsT0FBc0I7UUFFdEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xGLElBQUksSUFBSSxHQUFhLEVBQUUsQ0FBQztRQUV4QixHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUNwRCxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsSUFBSSxXQUFXLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLElBQUksU0FBUyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV0QyxFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDekQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDN0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQy9HLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSyxnREFBc0IsR0FBOUIsVUFDSSxRQUFnQixFQUNoQixXQUFtQixFQUNuQixJQUFjLEVBQ2QsSUFBWSxFQUNaLE1BQWMsRUFDZCxRQUFnQixFQUNoQixTQUFpQixFQUNqQixXQUFvQixFQUNwQixPQUFzQjtRQUV0QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLGlEQUFpRCxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBRW5ELEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFOUUsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUzRixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTVGLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRWpGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ25JLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0ssMENBQWdCLEdBQXhCLFVBQ0ksUUFBZ0IsRUFBRSxXQUFtQixFQUFFLElBQWMsRUFBRSxJQUFZLEVBQUUsU0FBaUIsRUFBRSxPQUFzQjtRQUM5RyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFbEUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0ssdUNBQWEsR0FBckIsVUFDSSxRQUFnQixFQUFFLFdBQW1CLEVBQUUsSUFBYyxFQUFFLElBQVksRUFBRSxTQUFpQixFQUFFLE9BQXNCO1FBRTlHLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFNUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVsRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0ssd0NBQWMsR0FBdEIsVUFDSSxRQUFnQixFQUNoQixXQUFtQixFQUNuQixJQUFjLEVBQ2QsSUFBWSxFQUNaLFNBQWlCLEVBQ2pCLElBQVksRUFDWixPQUFzQjtRQUV0QixJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFbEUsSUFBSSxDQUFDLElBQUksQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsMkNBQTJDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSyx1Q0FBYSxHQUFyQixVQUNJLFFBQWdCLEVBQ2hCLFdBQW1CLEVBQ25CLElBQWMsRUFDZCxJQUFZLEVBQ1osU0FBaUIsRUFDakIsSUFBYSxFQUNiLE9BQXNCO1FBRXRCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFNUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVsRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsK0NBQStDLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNLLDRDQUFrQixHQUExQixVQUEyQixRQUFnQixFQUFFLElBQWMsRUFBRSxJQUFZLEVBQUUsU0FBaUIsRUFBRSxPQUFzQjtRQUVoSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3JGLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsWUFBWSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDN0YsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLENBQUMsb0JBQW9CLENBQUMscUNBQXFDLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNwSCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNLLG9DQUFVLEdBQWxCLFVBQW1CLFdBQW1CLEVBQUUsUUFBZ0IsRUFBRSxVQUFrQjtRQUV4RSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLFdBQVcsR0FBRyxNQUFJLFdBQWEsQ0FBQztRQUNwQyxDQUFDO1FBRUQsSUFBSSxRQUFRLEdBQUcsV0FBUyxRQUFRLEdBQUcsV0FBYSxDQUFDO1FBQ2pELElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSywyQ0FBaUIsR0FBekIsVUFBMEIsS0FBYTtRQUVuQyxJQUFJLFNBQVMsR0FBYSxFQUFFLENBQUM7UUFDN0IsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUN6QyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyx5REFBK0IsR0FBdkMsVUFBd0MsZ0JBQTBCLEVBQUUsU0FBbUI7UUFFbkYsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBRUQsSUFBSSxtQkFBbUIsR0FBMkMsRUFBRSxDQUFDO1FBRXJFLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7WUFFM0QsSUFBSSxjQUFjLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUMvQixJQUFJLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBd0IsRUFBRSxjQUFjLGdCQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsQ0FBQztRQUM5RixDQUFDO1FBRUQsTUFBTSxDQUFDLG1CQUFtQixDQUFDO0lBQy9CLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyxnREFBc0IsR0FBOUIsVUFBK0IsWUFBaUIsRUFBRSxtQkFBMkQ7UUFFekcsK0hBQStIO1FBRS9ILGdEQUFnRDtRQUNoRCxJQUFJLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsSUFBSSxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBELEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixHQUFHLENBQUMsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLElBQUksa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzFGLE9BQU8sQ0FBQyxHQUFHLENBQVk7Z0JBQ25CLE1BQU0sRUFBRSxrQkFBa0I7Z0JBQzFCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztnQkFDckIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLE9BQU87cUJBQzVGLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQzthQUNwRCxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVELElBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUV4RSxJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLElBQUksT0FBTyxHQUF3QixFQUFFLENBQUM7UUFFdEMsR0FBRyxDQUFDLENBQWEsVUFBSyxFQUFMLGVBQUssRUFBTCxtQkFBSyxFQUFMLElBQUs7WUFBakIsSUFBSSxJQUFJLGNBQUE7WUFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxRQUFRLENBQUM7WUFDYixDQUFDO1lBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU5QixJQUFJLFFBQU0sU0FBUSxDQUFDO1lBQ25CLElBQUksSUFBSSxTQUFLLENBQUM7WUFDZCxJQUFJLFNBQVMsU0FBUSxDQUFDO1lBRXRCLEdBQUcsQ0FBQyxDQUFZLFVBQUksRUFBSixhQUFJLEVBQUosa0JBQUksRUFBSixJQUFJO2dCQUFmLElBQUksR0FBRyxhQUFBO2dCQUNSLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1QixRQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXhCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1QixTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUxQixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxJQUFJLENBQUM7d0JBQ0QsbURBQW1EO3dCQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBTSxJQUFJLFFBQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUMzQixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFFM0IsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUMxQixDQUFDO29CQUNMLENBQUM7b0JBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsb0NBQW9DO3dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDOzRCQUNSLE1BQU0sRUFBRSxrQkFBa0I7NEJBQzFCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSzs0QkFDckIsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPO3lCQUM3QixDQUFDLENBQUM7d0JBRUgsWUFBWTt3QkFDWixNQUFNLFNBQVMsQ0FBQztvQkFDcEIsQ0FBQztnQkFDTCxDQUFDO2FBQ0o7WUFFRCxJQUFJLFFBQVEsR0FBaUIsRUFBRSxNQUFNLEVBQUUsUUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUNoRSxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7WUFDdkIsSUFBSSxRQUFRLFNBQVEsQ0FBQztZQUVyQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBTSxJQUFJLFFBQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixRQUFRLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUNuRCxjQUFjLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxDQUFDO1lBQ25FLENBQUM7WUFFRCxPQUFPLENBQUMsSUFBSSxDQUFvQixFQUFFLFFBQVEsVUFBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLGNBQWMsZ0JBQUEsRUFBRSxDQUFDLENBQUM7U0FDM0U7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFLRCxzQkFBWSx5Q0FBWTtRQUh4Qjs7V0FFRzthQUNIO1lBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN4RCxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFDTCxzQkFBQztBQUFELENBbm9CQSxBQW1vQkMsSUFBQSIsImZpbGUiOiJiYXRjaC1jb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==