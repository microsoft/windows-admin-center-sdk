import { Cim } from './cim';
/**
 * The CIM service class.
 */
var CimConnection = /** @class */ (function () {
    /**
     * Initializes a new instance of the CimService class.
     *
     * @param nodeConnection the NodeConnection class instance injected.
     * @param batchConnection the BatchConnection class instance injected.
     */
    function CimConnection(nodeConnection, batchConnection) {
        this.nodeConnection = nodeConnection;
        this.batchConnection = batchConnection;
    }
    /**
     * CIM GET MultipleInstances
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param className the class name.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    CimConnection.prototype.getInstanceMultiple = function (nodeName, namespace, className, options) {
        var cimUrl = Cim.cimUrlMultipleInstances(namespace, className);
        return this.nodeConnection.get(nodeName, cimUrl, options);
    };
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
    CimConnection.prototype.getInstanceSingle = function (nodeName, namespace, className, keyProperties, options) {
        var cimUrl = Cim.cimUrlSingleInstance(namespace, className, keyProperties);
        return this.nodeConnection.get(nodeName, cimUrl, options);
    };
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
    CimConnection.prototype.invokeMethodInstance = function (nodeName, namespace, className, methodName, keyProperties, data, options) {
        var cimUrl = Cim.cimUrlInstanceMethod(namespace, className, methodName, keyProperties);
        return this.nodeConnection.post(nodeName, cimUrl, data, options);
    };
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
    CimConnection.prototype.invokeMethodStatic = function (nodeName, namespace, className, methodName, data, options) {
        var cimUrl = Cim.cimUrlStaticMethod(namespace, className, methodName);
        return this.nodeConnection.post(nodeName, cimUrl, data, options);
    };
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
    CimConnection.prototype.setInstance = function (nodeName, namespace, className, keyProperties, data, options) {
        var cimUrl = Cim.cimUrlSingleInstance(namespace, className, keyProperties);
        return this.nodeConnection.put(nodeName, cimUrl, data, options);
    };
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
    CimConnection.prototype.modifyInstance = function (nodeName, namespace, className, keyProperties, data, options) {
        var cimUrl = Cim.cimUrlSingleInstance(namespace, className, keyProperties);
        return this.nodeConnection.patch(nodeName, cimUrl, data, options);
    };
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
    CimConnection.prototype.deleteInstance = function (nodeName, namespace, className, keyProperties, options) {
        var cimUrl = Cim.cimUrlSingleInstance(namespace, className, keyProperties);
        return this.nodeConnection.delete(nodeName, cimUrl, null, options);
    };
    /**
     * CIM POST WqlQuery
     *
     * @param nodeName the name of the node to use for this request
     * @param namespace the cim namespace.
     * @param query the WQL string.
     * @param options the options for this request.
     * @return Observable<any> the query observable.
     */
    CimConnection.prototype.getInstanceQuery = function (nodeName, namespace, query, options) {
        var cimUrl = Cim.cimUrlWqlQuery(namespace);
        return this.nodeConnection.post(nodeName, cimUrl, JSON.stringify({ query: query }), options);
    };
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
    CimConnection.prototype.getBatchInstanceMultiple = function (nodeNamesList, namespace, className, options) {
        var cimUrl = Cim.cimUrlMultipleInstances(namespace, className);
        var urlList = [];
        for (var index = 0; index < nodeNamesList.length; index++) {
            urlList.push(cimUrl);
        }
        return this.batchConnection.get(nodeNamesList, urlList, options);
    };
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
    CimConnection.prototype.getBatchInstanceSingle = function (nodeNamesList, namespace, className, keyProperties, options) {
        var cimUrl = Cim.cimUrlSingleInstance(namespace, className, keyProperties);
        var urlList = [];
        for (var index = 0; index < nodeNamesList.length; index++) {
            urlList.push(cimUrl);
        }
        return this.batchConnection.get(nodeNamesList, urlList, options);
    };
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
    CimConnection.prototype.invokeBatchMethodInstance = function (nodeNamesList, namespace, className, methodName, keyProperties, data, options) {
        var cimUrl = Cim.cimUrlInstanceMethod(namespace, className, methodName, keyProperties);
        var body = data ? JSON.stringify(data) : null;
        return this.cimBatchPost(nodeNamesList, cimUrl, body, options);
    };
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
    CimConnection.prototype.invokeBatchMethodStatic = function (nodeNamesList, namespace, className, methodName, data, options) {
        var cimUrl = Cim.cimUrlStaticMethod(namespace, className, methodName);
        var body = data ? JSON.stringify(data) : null;
        return this.cimBatchPost(nodeNamesList, cimUrl, body, options);
    };
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
    CimConnection.prototype.setBatchInstance = function (nodeNamesList, namespace, className, keyProperties, data, options) {
        var cimUrl = Cim.cimUrlSingleInstance(namespace, className, keyProperties);
        var urlList = [];
        var dataList = [];
        for (var index = 0; index < nodeNamesList.length; index++) {
            urlList.push(cimUrl);
            dataList.push(JSON.stringify(data));
        }
        return this.batchConnection.put(nodeNamesList, urlList, dataList, options);
    };
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
    CimConnection.prototype.deleteBatchInstance = function (nodeNamesList, namespace, className, keyProperties, options) {
        var cimUrl = Cim.cimUrlSingleInstance(namespace, className, keyProperties);
        var urlList = [];
        for (var index = 0; index < nodeNamesList.length; index++) {
            urlList.push(cimUrl);
        }
        return this.batchConnection.delete(nodeNamesList, urlList, options);
    };
    /**
     * CIM POST WqlQuery for list of nodes
     *
     * @param nodeNamesList the Nodes to use for this request.
     * @param namespace the cim namespace.
     * @param query the WQL string.
     * @param options the options for this request.
     * @return Observable<BatchResponseItem[]> the query observable.
     */
    CimConnection.prototype.getBatchInstanceQuery = function (nodeNamesList, namespace, query, options) {
        var cimUrl = Cim.cimUrlWqlQuery(namespace);
        var body = JSON.stringify({ query: query });
        return this.cimBatchPost(nodeNamesList, cimUrl, body, options);
    };
    /**
     * Cim batch post helper
     *
     * @param nodeNamesList The list of Nodes to run the call against
     * @param cimUrl The CIM end point to call
     * @param jsonBody The body of Post in json format.
     * @param options the request options.
     */
    CimConnection.prototype.cimBatchPost = function (nodeNamesList, cimUrl, jsonBody, options) {
        var urlList = [];
        var bodyList = [];
        for (var index = 0; index < nodeNamesList.length; index++) {
            urlList.push(cimUrl);
            if (jsonBody) {
                bodyList.push(jsonBody);
            }
        }
        return this.batchConnection.post(nodeNamesList, urlList, bodyList, options);
    };
    return CimConnection;
}());
export { CimConnection };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9jaW0tY29ubmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsR0FBRyxFQUF1RCxNQUFNLE9BQU8sQ0FBQztBQUdqRjs7R0FFRztBQUNIO0lBQ0k7Ozs7O09BS0c7SUFDSCx1QkFBb0IsY0FBOEIsRUFBVSxlQUFnQztRQUF4RSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFBSSxDQUFDO0lBRWpHOzs7Ozs7OztPQVFHO0lBQ0ksMkNBQW1CLEdBQTFCLFVBQ0ksUUFBZ0IsRUFDaEIsU0FBaUIsRUFDakIsU0FBaUIsRUFDakIsT0FBNEI7UUFDNUIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLHVCQUF1QixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0kseUNBQWlCLEdBQXhCLFVBQ0ksUUFBZ0IsRUFDaEIsU0FBaUIsRUFDakIsU0FBaUIsRUFDakIsYUFBa0IsRUFDbEIsT0FBNEI7UUFDNUIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDM0UsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0ksNENBQW9CLEdBQTNCLFVBQ0ksUUFBZ0IsRUFDaEIsU0FBaUIsRUFDakIsU0FBaUIsRUFDakIsVUFBa0IsRUFDbEIsYUFBa0IsRUFDbEIsSUFBVSxFQUNWLE9BQTRCO1FBQzVCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FB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QUFPLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNLLG9DQUFZLEdBQXBCLFVBQXFCLGFBQXVCLEVBQUUsTUFBYyxFQUFFLFFBQWdCLEVBQUUsT0FBNEI7UUFFeEcsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO1FBQzNCLElBQUksUUFBUSxHQUFhLEVBQUUsQ0FBQztRQUU1QixHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUN4RCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QixDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQXJYQSxBQXFYQyxJQUFBIiwiZmlsZSI6ImNpbS1jb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==