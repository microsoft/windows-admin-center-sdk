import { AjaxResponse, Observable } from 'rxjs';
import { AuthorizationManager } from '../security/authorization-manager';
import { GatewayConnection, GatewayRequest } from './gateway-connection';
import { NodeRequestOptions } from './node-connection';
export interface BatchResponseItem {
    /**
     * The node name.
     */
    nodeName: string;
    /**
     * The sequence number of request in batch.
     */
    sequenceNumber: number;
    /**
     * The Ajax response.
     */
    response: AjaxResponse;
}
/**
 * Extension of GatewayRequest interface for calling the Gateway Http API
 */
export interface BatchRequest extends GatewayRequest, NodeRequestOptions {
}
/**
 * The Batch Connection class for creating requests and calling the Gateway's Http API
 */
export declare class BatchConnection {
    private gateway;
    private authorizationManager;
    private moduleName;
    /**
     * Initializes a new instance of the BatchConnection class.
     *
     * @param gateway the gateway Connection
     * @param authorizationManager the authorization manager.
     */
    constructor(gateway: GatewayConnection, authorizationManager: AuthorizationManager);
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
    mixed(nodesList: string[], relativeUrlList: string[], bodyCommandList?: string[], methodsList?: string[], request?: BatchRequest): Observable<BatchResponseItem[]>;
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
    post(nodesList: string[], relativeUrlList: string[], bodyCommandList: string[], request?: BatchRequest): Observable<BatchResponseItem[]>;
    /**
     * Makes a batch GET call to the gateway api
     *
     * @param nodeList: the list of names of the node to call the API for
     * @param relativeUrlList: the list of relative Url after "/api/nodes/<nodeName>/"
     * @param request: the batch request object.
     */
    get(nodesList: string[], relativeUrlList: string[], request?: BatchRequest): Observable<BatchResponseItem[]>;
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
    put(nodesList: string[], relativeUrlList: string[], bodyCommandList?: string[], request?: BatchRequest): Observable<BatchResponseItem[]>;
    /**
     * Makes a batch DELETE call to the gateway api
     *
     * @param nodeList: the list of names of the nodes to call the API for
     * @param relativeUrlList: the list of relative Urls of nodes after "/api/nodes/<nodeName>/"
     * @param request: the batch request object.
     */
    delete(nodesList: string[], relativeUrlList: string[], request?: BatchRequest): Observable<BatchResponseItem[]>;
    /**
     * Adds default parameters to Batch Request. For the outside batch call, we just use the Auth for first node in batch request.
     * No need to append any tokens for hitting Gateway, as browser handles that. For the nodes being managed,
     * the tokens are already part of body.
     *
     * @param request The batch request object.
     */
    private createBatchRequest(request);
    /**
     * Set the request headers for the batch call.
     * @param request : batch request object.
     * @param boundary : boundary string used to separate multi part request.
     */
    private setRequestHeaders(request, boundary);
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
    private createBody(nodesList, relativeUrlList, requestIdsList, methodList, boundary, commandList?, request?);
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
    private createBodySingleMethod(nodesList, relativeUrlList, requestIdsList, method, boundary, commandList?, request?);
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
    private createAndAddSinglePart(nodeName, relativeUrl, body, host, method, boundary, requestId, commandBody?, request?);
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
    private addDeleteCommand(nodeName, relativeUrl, body, host, requestId, request?);
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
    private addGetCommand(nodeName, relativeUrl, body, host, requestId, request?);
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
    private addPostCommand(nodeName, relativeUrl, body, host, requestId, data, request?);
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
    private addPutCommand(nodeName, relativeUrl, body, host, requestId, data?, request?);
    /**
     * Write commnon sestion to body for all HTTP request types.
     * @param nodeName : node being targeted with the request.
     * @param body : The body string of the multi-part request being formed.
     * @param host : The host node(gateway node) for the batch call.
     * @param requestId The request Id to be used for the part call.
     * @param request : optional. The node request options.
     */
    private writeCommonSection(nodeName, body, host, requestId, request?);
    /**
     * Creates a full Node url for multiPart call
     *  Ex: PUT /api/nodes/<nodeName>/<relativeUrl> HTTP/1.1
     *
     * @param relativeUrl the relative Url after "/nodes"
     * @param nodeName the name of the node to make a call against
     * @param actionName the Http call type: Put/Post/Delete/Get.
     */
    private getNodeUrl(relativeUrl, nodeName, actionName);
    /**
     * Creates a list of guids to be used as request-ids in batch request.
     *
     * @param count the count of guids to be produced
     * @return the array of generated guids
     */
    private generateGuidsList(count);
    /**
     * Creates a map of guids to NodeNames and sequence number, to be used to parse responses.
     *
     * @param orderedNodesList the list of Nodes to run batch against.
     * @param guidsList the list of guids to be used for requests.
     * @return the map of generated guids to BatchRequestContext
     */
    private generateGuidToRequestContextMap(orderedNodesList, guidsList);
    /**
     * Parses http response.
     * See http://stackoverflow.com/questions/21229418/how-to-process-parse-read-a-multipart-mixed-boundary-batch-response
     * for sample response.
     * @param responseData: multipart response as received from the Batch call.
     * @param guidToRequestCtxMap: the map of request-id guids to BatchRequestContext.
     */
    private parseMultiPartResponse(responseData, guidToRequestCtxMap);
    /**
     * Gets the name of current shell or module.
     */
    private readonly nameOfModule;
}
