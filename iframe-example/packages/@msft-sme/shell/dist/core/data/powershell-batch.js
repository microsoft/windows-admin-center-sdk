import { Observable } from 'rxjs';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { Disposer } from './disposable';
import { Http } from './http';
import { Net } from './net';
/**
 * PowerShell runspace session state.
 */
var RunspaceSessionState;
(function (RunspaceSessionState) {
    /**
     * Runspace still active.
     */
    RunspaceSessionState[RunspaceSessionState["Active"] = 0] = "Active";
    /**
     * Runspace already expired.
     */
    RunspaceSessionState[RunspaceSessionState["Expired"] = 1] = "Expired";
    /**
     * No runsapce available for the give node.
     * Either this is the first call, or the previous call errored out
     * or previous runspace was deleted due to expiry.
     */
    RunspaceSessionState[RunspaceSessionState["Unavailable"] = 2] = "Unavailable";
})(RunspaceSessionState || (RunspaceSessionState = {}));
/**
 * The PowerShellBatchSession class.
 */
var PowerShellBatchSession = /** @class */ (function () {
    function PowerShellBatchSession(powerShellBatch, lifetime) {
        this.powerShellBatch = powerShellBatch;
        this.lifetime = lifetime;
    }
    /**
     * Dispose the session object.
     */
    PowerShellBatchSession.prototype.dispose = function () {
        if (this.lifetime) {
            this.lifetime.dispose();
        }
    };
    return PowerShellBatchSession;
}());
export { PowerShellBatchSession };
/**
 * Class containing methods related to PowerShell runspaces creation/deletion/command using PowerShell Raw API plugin during batch run.
 *  - It's auto holding the runspace as long as it's used within last 3 minutes.
 */
var PowerShellBatchRaw = /** @class */ (function () {
    /**
     * Initializes a new instance of the PowerShellBatchRaw class.
     *
     * @param batchConnection The batch connection service.
     * @param context The PowerShell batch session Context.
     */
    function PowerShellBatchRaw(batchConnection, context) {
        this.batchConnection = batchConnection;
        this.context = context;
        this.nodesToSessionIdsMap = {};
        this.timestampInMs = 0;
        this.markDelete = false;
        this.internalActive = false;
    }
    Object.defineProperty(PowerShellBatchRaw.prototype, "active", {
        /**
         * Gets active status of PowerShell execution.
         */
        get: function () {
            return this.internalActive;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose the runspace.
     */
    PowerShellBatchRaw.prototype.dispose = function () {
        if (!this.active) {
            // only close sessions that have been created.
            // If a result was cached a component may not
            // execute a command and still dispose the session
            // when the component is destroyed.
            if (Object.keys(this.nodesToSessionIdsMap).length > 0) {
                this.close().subscribe();
            }
        }
        else {
            this.markDelete = true;
        }
    };
    /**
     * Runs the given batch command, and try followup Get calls if all nodes don't complete during the initial batch call.
     *
     * @param nodesList The nodes list to run batch against.
     * @param commandList The list of command body, corresponding to nodesList.
     */
    PowerShellBatchRaw.prototype.runCommand = function (nodesList, commandList) {
        var _this = this;
        // take the timestamp only success/healthy case.
        // error session would be auto-deleted after expiration time.
        this.internalActive = true;
        var requestedNodesList = nodesList;
        return this.command(nodesList, commandList)
            .catch(function (error, caught) {
            _this.internalActive = false;
            return Observable.throw(error);
        }).expand(function (response, index) {
            _this.timestampInMs = Date.now();
            var psBatchResponse = _this.convertBatchResponseToPowerShellBatchResponse(response);
            var incompleteNodes = _this.getIncompleteNodes(psBatchResponse);
            if (incompleteNodes.length === 0) {
                _this.internalActive = false;
                return Observable.empty();
            }
            // create list of Get URLs for incomplete nodes.                
            var incompleteNodesUrlList = _this.createRelativeUrlListSingleMethod(incompleteNodes, Http.methodGet);
            // update requested Nodes list, so we can parse the response correctly.
            requestedNodesList = incompleteNodesUrlList;
            return _this.batchConnection.get(incompleteNodes, incompleteNodesUrlList, _this.context.requestOptions);
        }).map(function (response) {
            var psBatchResponse = _this.convertBatchResponseToPowerShellBatchResponse(response);
            return psBatchResponse;
        });
    };
    /**
     * Close/Delete the session / runspace map.
     */
    PowerShellBatchRaw.prototype.close = function () {
        var _this = this;
        if (Object.keys(this.nodesToSessionIdsMap).length > 0) {
            var nodeList = [];
            for (var node in this.nodesToSessionIdsMap) {
                if (this.nodesToSessionIdsMap.hasOwnProperty(node)) {
                    nodeList.push(node);
                }
            }
            var nodeUrls = this.createRelativeUrlListSingleMethod(nodeList, Http.methodDelete);
            return this.batchConnection.delete(nodeList, nodeUrls, this.context.requestOptions)
                .map(function (responseData) {
                _this.nodesToSessionIdsMap = {};
                var psBatchResponse = _this.convertBatchResponseToPowerShellBatchResponse(responseData);
                return psBatchResponse;
            });
        }
        Logging.log({
            level: LogLevel.Warning,
            source: 'PowerShellBatch/close',
            message: MsftSme.resourcesStrings().MsftSmeShell.Core.Error.PowerShellUnableSessionClose.message
        });
        return Observable.of(null);
    };
    /**
     * Cancel the command.
     */
    PowerShellBatchRaw.prototype.cancelCommand = function () {
        var _this = this;
        if (Object.keys(this.nodesToSessionIdsMap).length > 0) {
            var nodeList = [];
            for (var node in this.nodesToSessionIdsMap) {
                if (this.nodesToSessionIdsMap.hasOwnProperty(node)) {
                    nodeList.push(node);
                }
            }
            var nodeUrls = this.createRelativeUrlListSingleMethod(nodeList, 'CANCEL');
            return this.batchConnection.put(nodeList, nodeUrls).map(function (responseData) {
                _this.nodesToSessionIdsMap = {};
                var psBatchResponse = _this.convertBatchResponseToPowerShellBatchResponse(responseData);
                return psBatchResponse;
            });
        }
        Logging.log({
            level: LogLevel.Warning,
            source: 'PowerShell',
            message: MsftSme.resourcesStrings().MsftSmeShell.Core.Error.PowerShellUnableCancelCommand.message
        });
        return Observable.of(null);
    };
    /**
     * Parse the response array for multi-part response and convert to PowerShellBatchResponse list.
     *
     * @param responseList The BatchResponse array received for the powershell batch call.
     */
    PowerShellBatchRaw.prototype.convertBatchResponseToPowerShellBatchResponse = function (responseList) {
        var powershellBatchResponse = [];
        for (var itemId = 0; itemId < responseList.length; itemId++) {
            var responseItem = responseList[itemId].response;
            var nodeName = responseList[itemId].nodeName;
            var sequenceNumber = responseList[itemId].sequenceNumber;
            var jsonResponse = responseItem.response;
            var status_1 = responseItem.status;
            var properties = Net.getItemProperties(jsonResponse);
            if (status_1 < 400) {
                powershellBatchResponse.push({ sequenceNumber: sequenceNumber, status: status_1, nodeName: nodeName, properties: properties });
            }
            else {
                var responseData = responseItem.response;
                if (responseData.error) {
                    var error = responseData.error;
                    powershellBatchResponse.push({ sequenceNumber: sequenceNumber, status: status_1, nodeName: nodeName, properties: properties, error: error });
                    Logging.log({
                        source: 'Batch PowerShell',
                        level: LogLevel.Error,
                        message: MsftSme.resourcesStrings().MsftSmeShell.Core.Error.BatchConnection.message
                            .format(status_1, error.code, Net.getPowerShellErrorMessage(responseItem.response))
                    });
                }
                else if (responseData.errors) {
                    var errors = responseData.errors;
                    powershellBatchResponse.push({ sequenceNumber: sequenceNumber, status: status_1, nodeName: nodeName, properties: properties, errors: errors });
                    Logging.log({
                        source: 'Batch PowerShell',
                        level: LogLevel.Error,
                        message: Net.getPowerShellErrorMessage(responseItem.response)
                    });
                }
            }
        }
        return powershellBatchResponse;
    };
    /**
     * Initiate command execution. It auto recycles old sessions.
     *
     * @param nodesList The list of nodes to run commands against
     * @param commandList The command body list corresponding to nodesList.
     */
    PowerShellBatchRaw.prototype.command = function (nodesList, commandList) {
        var nodesSessionStateMap = this.getSessionsStateForNodesList(nodesList);
        var methodsList = [];
        for (var index = 0; index < nodesList.length; index++) {
            var nodeName = nodesList[index];
            if (nodesSessionStateMap[nodeName] === RunspaceSessionState.Expired) {
                // Delete item from map.
                delete this.nodesToSessionIdsMap[nodeName];
            }
            if (nodesSessionStateMap[nodeName] === RunspaceSessionState.Active) {
                // Post method
                methodsList.push(Http.methodPost);
            }
            else {
                // Put method
                methodsList.push(Http.methodPut);
            }
        }
        var nodeUrls = this.createRelativeUrlList(nodesList, methodsList);
        return this.batchConnection.mixed(nodesList, nodeUrls, commandList, methodsList, this.context.requestOptions);
    };
    /**
     * Check if a valid/non-expired sesison exists for each node in the list.
     *
     * @param nodesList The nodes list to check valid existing sesion for.
     */
    PowerShellBatchRaw.prototype.getSessionsStateForNodesList = function (nodesList) {
        var runspaceSessionsState = {};
        for (var index = 0; index < nodesList.length; index++) {
            var savedSession = this.nodesToSessionIdsMap[nodesList[index]];
            if (!savedSession) {
                runspaceSessionsState[nodesList[index]] = RunspaceSessionState.Unavailable;
            }
            else if (this.isSessionEntryExpired(savedSession)) {
                runspaceSessionsState[nodesList[index]] = RunspaceSessionState.Expired;
            }
            else {
                runspaceSessionsState[nodesList[index]] = RunspaceSessionState.Active;
            }
        }
        return runspaceSessionsState;
    };
    /**
     * Create a relative url list for PowerShell Post batch call, based on nodes and methods list.
     *
     * @param nodesList The list of nodes to generate urls for
     * @param methodList The http method types map corresponding to nodesList.
     */
    PowerShellBatchRaw.prototype.createRelativeUrlList = function (nodesList, methodList) {
        var responseUrlList = [];
        for (var index = 0; index < nodesList.length; index++) {
            var nodeName = nodesList[index];
            var method = methodList[index];
            // try to get session ids for given Node from the stored map.
            var savedSession = this.nodesToSessionIdsMap[nodeName];
            var sessionId = (savedSession && !this.isSessionEntryExpired(savedSession)) ? savedSession.sessionId : MsftSme.newGuid();
            responseUrlList.push(this.createRelativeUrl(method, sessionId));
        }
        return responseUrlList;
    };
    /**
     * Create a relative url list for PowerShell batch call, based on provided method.
     *
     * @param nodesList The list of nodes to generate urls for
     * @param method The http method type
     */
    PowerShellBatchRaw.prototype.createRelativeUrlListSingleMethod = function (nodesList, method) {
        var responseUrlList = [];
        for (var index = 0; index < nodesList.length; index++) {
            var nodeName = nodesList[index];
            // try to get session ids for given Node from the stored map.
            var savedSession = this.nodesToSessionIdsMap[nodeName];
            var sessionId = (savedSession && !this.isSessionEntryExpired(savedSession)) ? savedSession.sessionId : MsftSme.newGuid();
            responseUrlList.push(this.createRelativeUrl(method, sessionId));
        }
        return responseUrlList;
    };
    /**
     * Create a relative url for the given method and session Id.
     *
     * @param method The Http method to use for call.
     * @param sessionId The PS runspace session Id.
     */
    PowerShellBatchRaw.prototype.createRelativeUrl = function (method, sessionId) {
        var relativeUrl = '';
        if (method === Http.methodDelete) {
            relativeUrl = Net.powerShellApiSessions.format(sessionId);
        }
        else if (method === Http.methodPut) {
            relativeUrl = Net.powerShellApiSessions.format(sessionId);
        }
        else if (method === Http.methodPost) {
            relativeUrl = Net.powerShellApiExecuteCommand.format(sessionId);
        }
        else if (method === Http.methodGet) {
            relativeUrl = Net.powerShellApiRetrieveOutput.format(sessionId);
        }
        else if (method === 'CANCEL') {
            relativeUrl = Net.powerShellApiCancelCommand.format(sessionId);
        }
        return relativeUrl;
    };
    /**
     * Check if all indivudual nodes have returned 'completed' result and return the list of nodes which returned 'completed=false'
     *
     * @param responseArray The response from a PowerShell batch call.
     * @return incompleteNodes The incompleteNodes array populated with nodes not completed yet.
     */
    PowerShellBatchRaw.prototype.getIncompleteNodes = function (responseArray) {
        var incompleteNodes = [];
        for (var _i = 0, responseArray_1 = responseArray; _i < responseArray_1.length; _i++) {
            var responseItem = responseArray_1[_i];
            var properties = responseItem.properties;
            // skip the error cases.
            if (!properties) {
                continue;
            }
            var sessionId = properties.sessionId;
            var creationTimestamp = Date.now();
            if (sessionId) {
                // keep the PS session GUID
                this.nodesToSessionIdsMap[responseItem.nodeName] = { sessionId: sessionId, creationTimestamp: creationTimestamp };
            }
            if (properties.completed && properties.completed.toLowerCase() !== 'true') {
                incompleteNodes.push(responseItem.nodeName);
            }
        }
        return incompleteNodes;
    };
    /**
     * Checks if a stored runSpace session for a sepcific node is expired.
     *
     * @param rsSessionContext
     */
    PowerShellBatchRaw.prototype.isSessionEntryExpired = function (rsSessionContext) {
        var now = Date.now();
        return rsSessionContext.creationTimestamp !== 0 && (now - rsSessionContext.creationTimestamp) > PowerShellBatchRaw.maxDeltaTimeInMs;
    };
    // 3 minutes session holding time.
    PowerShellBatchRaw.maxDeltaTimeInMs = 3 * 60 * 1000;
    return PowerShellBatchRaw;
}());
/**
 * The PowerShellbatch class.
 *
 * - Single instance of PowerShell batch class manages a single single nodes-runspaces map, with a runspace corresponding to each node.
 * - It queues coming requests and process one at a time sequentially.
 * - If a command is slow and causing with multiple responses, it aggregates response into single Q result.
 * - A PowerShellbatch instance should be created through create() function, and it's statically stored/managed into _map collection.
 * - Once all lifetime references are gone, it deletes the runspaces map.
 * - To dispose the PowerShellbatch instance, it can use lifetime.dispose().
 */
var PowerShellBatch = /** @class */ (function () {
    /**
     * Initializes a new instance of the PowerShellBatch class.
     * (private constructor which shouldn't be called directly.)
     *
     * @param nodeList The nodes list targeted by this PowerShellBatch object.
     * @param batchConnection The batch connection service.
     * @param key The shared key to queue the requests to use the single runspace map.
     * @param lifetime The lifetime container.
     */
    function PowerShellBatch(nodeList, batchConnection, key, lifetime, options) {
        var _this = this;
        /**
         * The queue of PowerShell command requests.
         */
        this.queue = [];
        /**
         * Current data to return to caller.
         */
        this.currentData = [];
        /**
         * Current data map to aggregate partial data parts from multiple data responses.
         */
        this.currentDataMap = {};
        this.context = {
            key: key,
            nodesList: nodeList,
            lifetimes: [],
            requestOptions: options
        };
        this.timestamp = 0;
        this.raw = new PowerShellBatchRaw(batchConnection, this.context);
        if (key && lifetime) {
            lifetime.registerForDispose(new Disposer(function () { return _this.lifetimeDisposer(lifetime); }));
            this.context.lifetimes.push(lifetime);
        }
    }
    PowerShellBatch.create = function (nodesList, batchConnection, key, lifetime, requestOptions) {
        var ps;
        if (key && lifetime) {
            ps = PowerShellBatch.map[PowerShellBatch.indexName(nodesList, key)];
            if (ps) {
                ps.addLifetime(lifetime);
                return ps;
            }
        }
        ps = new PowerShellBatch(nodesList, batchConnection, key, lifetime, requestOptions);
        if (key && lifetime) {
            PowerShellBatch.map[PowerShellBatch.indexName(nodesList, key)] = ps;
        }
        return ps;
    };
    /**
     * Find existing PowerShellBatch object. Create call must be called before to create the PowerShellBatch instance.
     *
     * @param nodeName The node name.
     * @param key The shared key to queue the requests to use the single runspace.
     */
    PowerShellBatch.find = function (nodesList, key) {
        return PowerShellBatch.map[PowerShellBatch.indexName(nodesList, key)];
    };
    /**
     * Create the index name in map collection.
     *
     * @param nodesList The nodes list targeted by this PowerShellBatch object.
     * @param key The shared key to queue the requests to use the single runspace.
     */
    PowerShellBatch.indexName = function (nodesList, key) {
        return nodesList.join(':') + ':' + key;
    };
    /**
     * Run PowerShellBatch command.
     *
     * @param command The command to run against all nodes in nodesList.
     * @param options The options.
     * @return observable The result of PowerShell batch command.
     */
    PowerShellBatch.prototype.runSingleCommand = function (command, options) {
        var commandsList = [];
        for (var i = 0; i < this.context.nodesList.length; i++) {
            commandsList.push(command);
        }
        return this.run(commandsList, options);
    };
    /**
     * Run PowerShellBatch command list.
     *
     * @param commandsList The commands to run against given nodesList.
     * @param options The options.
     * @return observable The result of PowerShell batch command.
     */
    PowerShellBatch.prototype.run = function (commandsList, options) {
        if (commandsList.length !== this.context.nodesList.length) {
            return Observable.empty();
        }
        var commandBodyList = [];
        // wrap command in properties.
        for (var _i = 0, commandsList_1 = commandsList; _i < commandsList_1.length; _i++) {
            var command = commandsList_1[_i];
            if (command.command) {
                commandBodyList.push(Net.createPropertiesJSONString(command));
            }
            else {
                commandBodyList.push(Net.createPropertiesJSONString({ command: command.script }));
            }
        }
        if (this.context.lifetimes.length === 0) {
            // no disposer is assigned, force to close the session after every query.
            var timeoutMs = options && options.timeoutMs;
            if (options) {
                options.timeoutMs = timeoutMs;
                options.close = true;
            }
            else {
                options = { timeoutMs: timeoutMs, close: true };
            }
        }
        // queue the request.
        var observable = this.enqueue(this.context.nodesList, commandBodyList, options);
        return observable;
    };
    /**
     * Cancel PowerShellBatch command.
     */
    PowerShellBatch.prototype.cancel = function () {
        return this.raw.cancelCommand();
    };
    /**
     * Enqueue a command request.
     *
     * @param nodesList: the node list.
     * @param commandBodyList The command.
     * @param options The options.
     */
    PowerShellBatch.prototype.enqueue = function (nodesList, commandBodyList, options) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.queue.push({ nodesList: nodesList, commandList: commandBodyList, observer: observer, options: options });
            _this.dequeue();
        });
    };
    /**
     * Dequeue a command request.
     */
    PowerShellBatch.prototype.dequeue = function () {
        var _this = this;
        if (this.raw.active) {
            return false;
        }
        var item = this.queue.shift();
        if (item) {
            this.currentData = [];
            this.currentDataMap = {};
            this.timestamp = Date.now();
            this.raw.runCommand(item.nodesList, item.commandList).subscribe(function (data) {
                _this.collect(data, item.options && item.options.timeoutMs, item.options && item.options.partial ? item.observer : null);
            }, function (error) {
                if (item.options && item.options.close) {
                    _this.raw.close().subscribe();
                }
                item.observer.error(error);
                _this.timestamp = 0;
                _this.dequeue();
            }, function () {
                if (item.options && item.options.close) {
                    _this.raw.close().subscribe();
                }
                if (!item.options || !item.options.partial) {
                    item.observer.next(_this.currentData);
                }
                item.observer.complete();
                _this.timestamp = 0;
                _this.dequeue();
            });
            return true;
        }
        return false;
    };
    /**
     * Collect response results for batch call and aggregate into single object.
     *
     * @param properties The properties of response object.
     * @param timeoutMs The timeout to cancel command.
     * @param observer The observer of powershell results.
     */
    PowerShellBatch.prototype.collect = function (psResponseList, timeoutMs, observer) {
        if (timeoutMs && this.timestamp && (Date.now() - this.timestamp > timeoutMs)) {
            // force to cancel the command because of unexpected longer execution.
            this.raw.cancelCommand();
            this.timestamp = 0;
            return;
        }
        if (observer) {
            // return partial data if observer is not null.
            observer.next(psResponseList);
            this.currentData = psResponseList;
            return;
        }
        var _loop_1 = function (item) {
            // Check if we have saved record from previous call to add to.
            if (this_1.currentDataMap[item.nodeName]) {
                // Aggregate Results: If the newly received has results, aggregate them with saved data.
                if (item.properties.results) {
                    var array_1;
                    // if any previously received results, use them in aggregation.
                    if (this_1.currentDataMap[item.nodeName].properties && this_1.currentDataMap[item.nodeName].properties.results) {
                        if (MsftSme.getTypeOf(this_1.currentDataMap[item.nodeName].properties.results) === 'array') {
                            array_1 = this_1.currentDataMap[item.nodeName].properties.results;
                        }
                        else {
                            array_1 = [this_1.currentDataMap[item.nodeName].properties.results];
                        }
                    }
                    else {
                        array_1 = [];
                    }
                    // Add results from currently received data.
                    if (MsftSme.getTypeOf(item.properties.results) === 'array') {
                        item.properties.results.forEach(function (x) {
                            array_1.push(x);
                        });
                    }
                    else {
                        array_1.push(item.properties.results);
                    }
                    // Update saved map with the new aggregated data
                    this_1.currentDataMap[item.nodeName].properties.results = array_1;
                }
                // Aggregate Errors: If the newly received response has errors field, aggregate them with saved data.
                if (item.errors) {
                    var errorsArray_1;
                    // if any previously received errors, use them in aggregation.
                    if (this_1.currentDataMap[item.nodeName].errors) {
                        errorsArray_1 = this_1.currentDataMap[item.nodeName].errors;
                    }
                    else {
                        errorsArray_1 = [];
                    }
                    // Add results from currently received data.
                    item.errors.forEach(function (x) { errorsArray_1.push(x); });
                    // Update saved map with the new aggregated data
                    this_1.currentDataMap[item.nodeName].errors = errorsArray_1;
                }
            }
            else {
                // first response/ no saved response. Simply add to map.
                this_1.currentDataMap[item.nodeName] = item;
            }
        };
        var this_1 = this;
        // Merge responses from calls which didn't complete in one go.
        for (var _i = 0, psResponseList_1 = psResponseList; _i < psResponseList_1.length; _i++) {
            var item = psResponseList_1[_i];
            _loop_1(item);
        }
        this.currentData = this.convertResponseMapDataToList(this.currentDataMap);
    };
    /**
     * Helper method to convert a map data to list
     *
     * @param map The map of nodenames to PowerShellBatchResponseItem. Used to track different calls in a batch.
     * @return The response data for the calls in a list.
     */
    PowerShellBatch.prototype.convertResponseMapDataToList = function (map) {
        var responseList = [];
        for (var key in map) {
            if (map.hasOwnProperty(key)) {
                responseList.push(map[key]);
            }
        }
        return responseList;
    };
    /**
     * Attach lifetime object to disposer when disposing.
     *
     * @param lifetime The lifetime object.
     */
    PowerShellBatch.prototype.addLifetime = function (lifetime) {
        var _this = this;
        var found = MsftSme.find(this.context.lifetimes, function (value) { return value === lifetime; });
        if (!found) {
            this.context.lifetimes.push(lifetime);
            lifetime.registerForDispose(new Disposer(function () { return _this.lifetimeDisposer(lifetime); }));
        }
    };
    /**
     * Callback when disposing the container of view model.
     * If none, reference the PowerShell object. Dispose it. (Delete runspace)
     *
     * @param lifetime The lifetime object.
     */
    PowerShellBatch.prototype.lifetimeDisposer = function (lifetime) {
        var found = MsftSme.find(this.context.lifetimes, function (value) { return value === lifetime; });
        if (found) {
            MsftSme.remove(this.context.lifetimes, lifetime);
            if (this.context.lifetimes.length === 0) {
                // cancel queue command requests.
                this.queue.forEach(function (value, index, array) {
                    value.observer.next(null);
                    value.observer.complete();
                });
                // delete from the map collection and delete the runspace/session.
                delete PowerShellBatch.map[PowerShellBatch.indexName(this.context.nodesList, this.context.key)];
                this.raw.dispose();
            }
        }
    };
    /**
     * Static collection of PowerShellbatch objects.
     */
    PowerShellBatch.map = {};
    return PowerShellBatch;
}());
export { PowerShellBatch };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9wb3dlcnNoZWxsLWJhdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IsVUFBVSxFQUFtQyxNQUFNLE1BQU0sQ0FBQztBQUVqRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRWpELE9BQU8sRUFBeUMsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFOUIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQWlGNUI7O0dBRUc7QUFDSCxJQUFLLG9CQWlCSjtBQWpCRCxXQUFLLG9CQUFvQjtJQUNyQjs7T0FFRztJQUNILG1FQUFNLENBQUE7SUFFTjs7T0FFRztJQUNILHFFQUFPLENBQUE7SUFFUDs7OztPQUlHO0lBQ0gsNkVBQVcsQ0FBQTtBQUNmLENBQUMsRUFqQkksb0JBQW9CLEtBQXBCLG9CQUFvQixRQWlCeEI7QUEwQkQ7O0dBRUc7QUFDSDtJQVNJLGdDQUEwQixlQUFnQyxFQUFVLFFBQW9DO1FBQTlFLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQTRCO0lBQ3hHLENBQUM7SUFFRDs7T0FFRztJQUNJLHdDQUFPLEdBQWQ7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVCLENBQUM7SUFDTCxDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQXBCQSxBQW9CQyxJQUFBOztBQUVEOzs7R0FHRztBQUNIO0lBUUk7Ozs7O09BS0c7SUFDSCw0QkFBb0IsZUFBZ0MsRUFBVSxPQUErQjtRQUF6RSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxZQUFPLEdBQVAsT0FBTyxD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