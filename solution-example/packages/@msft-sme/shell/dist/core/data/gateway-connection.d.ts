import { AjaxRequest, Observable } from 'rxjs';
import { Rpc } from '../rpc/rpc';
import { RpcRelationshipType } from '../rpc/rpc-base';
import { RpcForwardResponse } from '../rpc/rpc-forward-report-data';
import { RpcServiceForwarder } from '../rpc/rpc-forwarder';
import { Http, HttpResponseRetryHandler } from './http';
/**
 * Gateway Request options that we use to extend the AjaxRequest interface
 */
export interface GatewayRequestOptions {
    /**
     * Retry handler implementation for a request.
     * These handlers are used to invoke specific functionality for non-200 status codes in the http response.
     */
    retryHandlers?: HttpResponseRetryHandler[];
    /**
     * Determines the maximum number of times that any of the retry handlers will be tried
     * before giving up and surfacing the error to the original caller
     */
    maxRetryCount?: number;
    /**
     * Observable handler to insert asynchronous logic before the actual http response is sent.
     * For Example: Waiting for pending authentication to complete before adding an authentication header
     */
    beforeCall?: (request: GatewayRequest) => Observable<void>;
}
/**
 * Extension of AjaxRequest interface for calling the Gateway API
 */
export interface GatewayRequest extends AjaxRequest, GatewayRequestOptions {
}
/**
 * Initialization object data for the Gateway's base class.
 */
export interface GatewayRPCForwardedProperties {
    gatewayName: string;
}
/**
 * The Gateway Connection class for creating requests and calling the Gateway's REST API
 */
export declare class GatewayConnection extends RpcServiceForwarder {
    http: Http;
    private moduleName;
    /**
     * The gateway to connect to. By default this is the same as the window origin.
     */
    gatewayUrl: string;
    /**
     * Initializes a new instance of the Gateway class.
     *
     * @param http the Http object.
     * @param rpc the Rpc class.
     */
    constructor(http: Http, rpc: Rpc);
    /**
     * Gets the gateway node name to make a CIM/PowerShell query to the gateway node.
     */
    readonly gatewayName: string;
    /**
     * Makes a POST call to the gateway
     *
     * @param relativeUrl the relative Url after "/api"
     * @param body the body string JSON.stringfy'ed
     * @param request the gateway request object.
     */
    post(relativeUrl: string, body?: any, request?: GatewayRequest): Observable<any>;
    /**
     * Makes a GET call to the gateway
     *
     * @param relativeUrl the relative Url after "/api"
     * @param request the gateway request object.
     */
    get(relativeUrl: string, request?: GatewayRequest): Observable<any>;
    /**
     * Makes a PUT call to the gateway
     *
     * @param relativeUrl the relative Url after "/api"
     * @param body the body string JSON.stringfy'ed
     * @param request the gateway request object.
     */
    put(relativeUrl: string, body?: string, request?: GatewayRequest): Observable<any>;
    /**
     * Makes a PATCH call to the gateway
     *
     * @param relativeUrl the relative Url after "/api"
     * @param body the body string JSON.stringfy'ed
     * @param request the gateway request object.
     */
    patch(relativeUrl: string, body?: string, request?: GatewayRequest): Observable<any>;
    /**
     * Makes a DELETE call to the gateway
     *
     * @param relativeUrl the relative Url after "/api"
     * @param body the body string JSON.stringfy'ed
     * @param request the gateway request object.
     */
    delete(relativeUrl: string, body?: string, request?: GatewayRequest): Observable<any>;
    /**
     * Creates a GatewayRequest.
     *
     * @param method the http method to use
     * @param relativeUrl the relative Url after "/api/"
     * @param body the body string JSON.stringfy'ed
     * @param request the gateway request object to extend.
     */
    createRequest(method: string, relativeUrl: string, body?: any, request?: GatewayRequest): GatewayRequest;
    /**
     * Make a request.
     *
     * @param request the request to execute against the gateway.
     * @return Observable<any> the query result observable.
     */
    call(request: GatewayRequest): Observable<any>;
    /**
     * Called on a child service instance when onForwardInit returns from the parent
     * @param data The response from the forwardInit call
     */
    protected onForwardInitResponse(data: RpcForwardResponse<GatewayRPCForwardedProperties>): void;
    /**
     * Called when a new instance of the service in another window is initialized and needs to synchronize with its parent
     * @param from The RpcRelationshipType that this request is from
     * @returns an observable for the all the values needed to initialize the service
     */
    protected onForwardInit(): Observable<GatewayRPCForwardedProperties>;
    /**
     * Called when the forwarded services counterpart wants to get data from the parent
     * @param from The RpcRelationshipType that this request is from
     * @param name The name of the method to forward to
     * @param args The arguments of the method
     * @returns an observable for the result of the method call
     */
    protected onForwardExecute(from: RpcRelationshipType, name: string, args: any[]): Observable<any>;
    /**
     * Called when the forwarded services counterpart sends a notify message
     * @param from The RpcRelationshipType that this request is from
     * @param name The name of the property to change
     * @param value The new value of the property
     * @returns an observable that completes when the property has been changed.
     */
    protected onForwardNotify(from: RpcRelationshipType, name: string, value: any): Observable<void>;
    /**
     * Gets the name of current shell or module.
     */
    private readonly nameOfModule;
}
