import { Observable } from 'rxjs';
import { AuthorizationManager, AuthorizationToken } from '../security/authorization-manager';
import { GatewayConnection, GatewayRequest } from './gateway-connection';
/**
 * Node Request options that we use to extend the GatewayRequest interface
 */
export interface NodeRequestOptions {
    /**
     * Indicates that no auth failure handling should take place, however, any auth headers for this node will still be added.
     */
    noAuth?: boolean;
    /**
     * Provides an alternative token to use for just this request
     */
    authToken?: AuthorizationToken;
    /**
     * Indicates that audit logging for this request should be made. Default is false.
     */
    logAudit?: boolean;
    /**
     * Indicates that telemetry logging for this request should be made. Default is false.
     */
    logTelemetry?: boolean;
    /**
     * The PowerShell command name on JEA PowerShell endpoint.
     */
    powerShellCommand?: string;
}
/**
 * Extension of GatewayRequest interface for calling the Gateway Node API
 */
export interface NodeRequest extends GatewayRequest, NodeRequestOptions {
}
/**
 * The Node Connection class for creating requests and calling the Gateway's Node API
 */
export declare class NodeConnection {
    private gateway;
    private authorizationManager;
    /**
     * Initializes a new instance of the GatewayService class.
     *
     * @param gateway the gateway Connection
     * @param authorizationManager the authorization manager.
     */
    constructor(gateway: GatewayConnection, authorizationManager: AuthorizationManager);
    /**
     * Makes a POST call to the gateway node api
     *
     * @param nodeName the name of the node to call the API for
     * @param relativeUrl the relative Url after "/api/nodes/<nodeName>"
     * @param body the body string JSON.stringfy'ed
     * @param request the node request object.
     */
    post(nodeName: string, relativeUrl: string, body?: any, request?: NodeRequest): Observable<any>;
    /**
     * Makes a GET call to the gateway node api
     *
     * @param nodeName the name of the node to call the API for
     * @param relativeUrl the relative Url after "/api/nodes/<nodeName>"
     * @param request the node request object.
     */
    get(nodeName: string, relativeUrl: string, request?: NodeRequest): Observable<any>;
    /**
     * Makes a PUT call to the gateway node api
     *
     * @param nodeName the name of the node to call the API for
     * @param relativeUrl the relative Url after "/api/nodes/<nodeName>"
     * @param body the body string JSON.stringfy'ed
     * @param request the node request object.
     */
    put(nodeName: string, relativeUrl: string, body?: string, request?: NodeRequest): Observable<any>;
    /**
     * Makes a PATCH call to the gateway node api
     *
     * @param nodeName the name of the node to call the API for
     * @param relativeUrl the relative Url after "/api/nodes/<nodeName>"
     * @param body the body string JSON.stringfy'ed
     * @param request the node request object.
     */
    patch(nodeName: string, relativeUrl: string, body?: string, request?: NodeRequest): Observable<any>;
    /**
     * Makes a DELETE call to the gateway node api
     *
     * @param nodeName the name of the node to call the API for
     * @param relativeUrl the relative Url after "/api/nodes/<nodeName>"
     * @param body the body string JSON.stringfy'ed
     * @param request the node request object.
     */
    delete(nodeName: string, relativeUrl: string, body?: string, request?: NodeRequest): Observable<any>;
    /**
     * Adds default parameters to a NodeRequest
     *
     * @param method the http method to use
     * @param relativeUrl the relative Url after "/api/"
     * @param body the body string JSON.stringfy'ed
     * @param request the node request object to extend.
     */
    private createNodeRequest(request, nodeName);
    /**
     * Creates a Node url
     *
     * @param nodeName the name of the node to make a call against
     * @param relativeUrl the relative Url after "/nodes/<nodeName>/"
     */
    getNodeUrl(nodeName: string, relativeUrl: string): string;
}
