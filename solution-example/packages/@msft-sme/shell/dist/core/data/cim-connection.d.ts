import { Observable } from 'rxjs/Observable';
import { BatchConnection, BatchResponseItem } from './batch-connection';
import { CimMultiple, CimResult, CimSingle } from './cim';
import { NodeConnection, NodeRequestOptions } from './node-connection';
/**
 * The CIM service class.
 */
export declare class CimConnection {
    private nodeConnection;
    private batchConnection;
    /**
     * Initializes a new instance of the CimService class.
     *
     * @param nodeConnection the NodeConnection class instance injected.
     * @param batchConnection the BatchConnection class instance injected.
     */
    constructor(nodeConnection: NodeConnection, batchConnection: BatchConnection);
    /**
     * CIM GET MultipleInstances
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    getInstanceMultiple(nodeName: string, namespace: string, className: string, options?: NodeRequestOptions): Observable<CimMultiple>;
    /**
     * CIM GET SingleInstance
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param keyProperties the key properties object.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    getInstanceSingle(nodeName: string, namespace: string, className: string, keyProperties: any, options?: NodeRequestOptions): Observable<CimSingle>;
    /**
     * CIM POST InstanceMethod
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
    invokeMethodInstance(nodeName: string, namespace: string, className: string, methodName: string, keyProperties: any, data?: any, options?: NodeRequestOptions): Observable<CimResult>;
    /**
     * CIM POST StaticMethod
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param methodName the method name.
     * @param data the method input data.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    invokeMethodStatic(nodeName: string, namespace: string, className: string, methodName: string, data?: any, options?: NodeRequestOptions): Observable<CimResult>;
    /**
     * CIM PUT SingleInstance
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param keyProperties the key properties object.
     * @param data the method input data.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    setInstance(nodeName: string, namespace: string, className: string, keyProperties: any, data: any, options?: NodeRequestOptions): Observable<CimSingle>;
    /**
     * CIM PATCH SingleInstance
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param keyProperties the key properties object.
     * @param data the method input data.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    modifyInstance(nodeName: string, namespace: string, className: string, keyProperties: any, data: any, options?: NodeRequestOptions): Observable<CimSingle>;
    /**
     * CIM DELETE SingleInstance
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param keyProperties the key properties object.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    deleteInstance(nodeName: string, namespace: string, className: string, keyProperties: any, options?: NodeRequestOptions): Observable<CimSingle>;
    /**
     * CIM POST WqlQuery
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param query the WQL string.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    getInstanceQuery(nodeName: string, namespace: string, query: string, options?: NodeRequestOptions): Observable<CimMultiple>;
    /**********************************
     * Cim Batch Section
     **********************************/
    /**
     * CIM GET MultipleInstances for list of nodes
     *
     * @param nodeNamesList the Nodes to use for this request.
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param options the options for this request.
     * @return Observable<BatchResponseItem[]> the query observable.
     */
    getBatchInstanceMultiple(nodeNamesList: string[], namespace: string, className: string, options?: NodeRequestOptions): Observable<BatchResponseItem[]>;
    /**
     * CIM GET SingleInstance for list of nodes
     *
     * @param nodeNamesList the Nodes to use for this request.
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param keyProperties the key properties object.
     * @param options the options for this request.
     * @return Observable<BatchResponseItem[]> the query observable.
     */
    getBatchInstanceSingle(nodeNamesList: string[], namespace: string, className: string, keyProperties: any, options?: NodeRequestOptions): Observable<BatchResponseItem[]>;
    /**
     * CIM POST InstanceMethod for list of nodes
     *
     * @param nodeNamesList the Nodes to use for this request.
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param methodName the method name.
     * @param keyProperties the key properties object.
     * @param data the method input data.
     * @param options the options for this request.
     * @return Observable<BatchResponseItem[]> the query observable.
     */
    invokeBatchMethodInstance(nodeNamesList: string[], namespace: string, className: string, methodName: string, keyProperties: any, data?: any, options?: NodeRequestOptions): Observable<BatchResponseItem[]>;
    /**
     * CIM POST StaticMethod for list of nodes
     *
     * @param nodeNamesList the Nodes to use for this request.
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param methodName the method name.
     * @param data the method input data.
     * @param options the options for this request.
     * @return Observable<BatchResponseItem[]> the query observable.
     */
    invokeBatchMethodStatic(nodeNamesList: string[], namespace: string, className: string, methodName: string, data?: any, options?: NodeRequestOptions): Observable<BatchResponseItem[]>;
    /**
     * CIM PUT SingleInstance for list of nodes
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param keyProperties the key properties object.
     * @param data the method input data.
     * @param options the options for this request.
     * @return Observable<BatchResponseItem[]> the query observable.
     */
    setBatchInstance(nodeNamesList: string[], namespace: string, className: string, keyProperties: any, data: any, options?: NodeRequestOptions): Observable<BatchResponseItem[]>;
    /**
     * CIM DELETE SingleInstance for list of nodes
     *
     * @param nodeNamesList the Nodes to use for this request.
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param keyProperties the key properties object.
     * @param options the options for this request.
     * @return Observable<BatchResponseItem[]> the query observable.
     */
    deleteBatchInstance(nodeNamesList: string[], namespace: string, className: string, keyProperties: any, options?: NodeRequestOptions): Observable<BatchResponseItem[]>;
    /**
     * CIM POST WqlQuery for list of nodes
     *
     * @param nodeNamesList the Nodes to use for this request.
     * @param namespace the cim namespace.
     * @param query the WQL string.
     * @param options the options for this request.
     * @return Observable<BatchResponseItem[]> the query observable.
     */
    getBatchInstanceQuery(nodeNamesList: string[], namespace: string, query: string, options?: NodeRequestOptions): Observable<BatchResponseItem[]>;
    /**
     * Cim batch post helper
     *
     * @param nodeNamesList The list of Nodes to run the call against
     * @param cimUrl The CIM end point to call
     * @param jsonBody The body of Post in json format.
     * @param options the request options.
     */
    private cimBatchPost(nodeNamesList, cimUrl, jsonBody, options?);
}
