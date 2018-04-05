import { Observable } from 'rxjs';
import { AuthorizationManager } from '../security/authorization-manager';
import { CimKeyProperties, CimMultiple, CimResult, CimSingle } from './cim';
import { NodeRequestOptions } from './node-connection';
import { WebsocketStream, WebsocketStreamDataRequestState, WebsocketStreamDataState, WebsocketStreamDataTarget, WebsocketStreamHandler } from './websocket-stream';
/**
 * Cim Stream options.
 */
export interface CimStreamOptions extends NodeRequestOptions {
    /**
     * Partial data response. By default, it responses back with completed data.
     */
    partial?: boolean;
    /**
     * Override Query ID so it can request cancel.
     */
    queryId?: string;
    /**
     * Buffering time period by milliseconds.
     */
    bufferTime?: number;
    /**
     * Buffering count.
     */
    bufferCount?: number;
}
/**
 * CIM Get instance multiple.
 */
export interface CimGetInstanceMultiple {
    name: 'CimGetInstanceMultiple';
    namespace: string;
    className: string;
}
/**
 * Cim Get instance single.
 */
export interface CimGetInstanceSingle {
    name: 'CimGetInstanceSingle';
    namespace: string;
    className: string;
    keyProperties: CimKeyProperties;
}
/**
 * Cim Invoke method instance.
 */
export interface CimInvokeMethodInstance {
    name: 'CimInvokeMethodInstance';
    namespace: string;
    className: string;
    methodName: string;
    keyProperties: CimKeyProperties;
    data?: any;
}
/**
 * Cim Invoke method static.
 */
export interface CimInvokeMethodStatic {
    name: 'CimInvokeMethodStatic';
    namespace: string;
    className: string;
    methodName: string;
    data?: any;
}
/**
 * Cim Set instance.
 */
export interface CimSetInstance {
    name: 'CimSetInstance';
    namespace: string;
    className: string;
    keyProperties: CimKeyProperties;
    data: any;
}
/**
 * Cim Modify instance.
 */
export interface CimModifyInstance {
    name: 'CimModifyInstance';
    namespace: string;
    className: string;
    keyProperties: CimKeyProperties;
    data: any;
}
/**
 * Cim Delete instance.
 */
export interface CimDeleteInstance {
    name: 'CimDeleteInstance';
    namespace: string;
    className: string;
    keyProperties: CimKeyProperties;
}
/**
 * Cim Get instance query.
 */
export interface CimGetInstanceQuery {
    name: 'CimGetInstanceQuery';
    namespace: string;
    query: string;
}
/**
 * The request packet of Cim Stream to the gateway.
 */
export interface CimStreamRequest {
    /**
     * The identification string (auto generated or supplied as queryId option.)
     */
    id: string;
    /**
     * The stream target.
     */
    target: WebsocketStreamDataTarget;
    /**
     * The date request state.
     */
    requestState: WebsocketStreamDataRequestState;
    /**
     * The request data.
     */
    request: CimGetInstanceMultiple | CimGetInstanceSingle | CimInvokeMethodInstance | CimInvokeMethodStatic | CimSetInstance | CimModifyInstance | CimDeleteInstance | CimGetInstanceQuery;
    /**
     * The Cim stream options.
     */
    options?: CimStreamOptions;
}
/**
 * Cim stream response.
 */
export interface CimStreamResponse {
    /**
     * Request ID from client.
     */
    id: string;
    /**
     * The state of response data.
     */
    state: WebsocketStreamDataState;
    /**
     * The index number of response data.
     */
    index: number;
    /**
     * The response data.
     */
    response: any;
}
/**
 * The CIM stream class.
 */
export declare class CimStream implements WebsocketStreamHandler {
    private websocketStream;
    private authorizationManager;
    private processors;
    private strings;
    /**
     * Initializes a new instance of the CimStream class.
     *
     * @param websocketStream the websocket stream object.
     * @param authorizationManager the authorization manager object.
     */
    constructor(websocketStream: WebsocketStream, authorizationManager: AuthorizationManager);
    /**
     * CIM Get MultipleInstances
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param options the options for this request.
     * @return Observable<CimResult> the query observable.
     */
    getInstanceMultiple(nodeName: string, namespace: string, className: string, options?: CimStreamOptions): Observable<CimMultiple>;
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
    getInstanceSingle(nodeName: string, namespace: string, className: string, keyProperties: CimKeyProperties, options?: CimStreamOptions): Observable<CimSingle>;
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
    invokeMethodInstance(nodeName: string, namespace: string, className: string, methodName: string, keyProperties: any, data?: any, options?: CimStreamOptions): Observable<CimResult>;
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
    invokeMethodStatic(nodeName: string, namespace: string, className: string, methodName: string, data?: any, options?: CimStreamOptions): Observable<CimResult>;
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
    setInstance(nodeName: string, namespace: string, className: string, keyProperties: any, data: any, options?: CimStreamOptions): Observable<CimSingle>;
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
    modifyInstance(nodeName: string, namespace: string, className: string, keyProperties: any, data: any, options?: CimStreamOptions): Observable<CimSingle>;
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
    deleteInstance(nodeName: string, namespace: string, className: string, keyProperties: any, options?: CimStreamOptions): Observable<CimSingle>;
    /**
     * CIM Submit WqlQuery
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param query the WQL string.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    getInstanceQuery(nodeName: string, namespace: string, query: string, options?: CimStreamOptions): Observable<CimResult>;
    /**
     * Cancel active CIM query.
     * Result response comes back to the original query to end.
     *
     * @param nodeName the node name.
     * @param id the id of original request specified as options.queryId.
     */
    cancel(nodeName: string, id: string): void;
    /**
     * Reset data for connection cleanup.
     */
    reset(): void;
    /**
     * Process the socket message.
     *
     * @param message the socket message.
     */
    process(message: CimStreamResponse): void;
    private operationNext(processor, response);
    private operationComplete(processor, response);
    private operationError(processor, error);
    private operationEnd(id);
    private createRequest<T>(nodeName, requestState, request, format, options?);
    private createRequestSimple<T>(nodeName, requestState, request, format, options?);
    private sendRequest(observer, target, requestState, request, format, options?);
}
