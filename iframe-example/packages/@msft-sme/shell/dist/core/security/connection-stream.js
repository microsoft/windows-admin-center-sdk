import { Observable, Subject } from 'rxjs';
import { HttpStatusCode } from '../data/http-constants';
import { Net } from '../data/net';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { EnvironmentModule } from '../manifest/environment-modules';
import { ConnectionUtility } from './connection';
import { ConnectionChangeType } from './connection-manager';
/**
 * The live connection status type.
 */
export var LiveConnectionStatusType;
(function (LiveConnectionStatusType) {
    /**
     * Online status.
     */
    LiveConnectionStatusType[LiveConnectionStatusType["Online"] = 0] = "Online";
    /**
     * Warning status.
     */
    LiveConnectionStatusType[LiveConnectionStatusType["Warning"] = 1] = "Warning";
    /**
     * Unauthorized status.
     */
    LiveConnectionStatusType[LiveConnectionStatusType["Unauthorized"] = 2] = "Unauthorized";
    /**
     * Error status.
     */
    LiveConnectionStatusType[LiveConnectionStatusType["Error"] = 3] = "Error";
    /**
     * Fatal status.
     */
    LiveConnectionStatusType[LiveConnectionStatusType["Fatal"] = 4] = "Fatal";
    /**
     * Unknown status (used for loading status).
     */
    LiveConnectionStatusType[LiveConnectionStatusType["Unknown"] = 5] = "Unknown";
})(LiveConnectionStatusType || (LiveConnectionStatusType = {}));
/**
 * The live connection change type.
 */
export var LiveConnectionChangeType;
(function (LiveConnectionChangeType) {
    /**
     * Add change.
     */
    LiveConnectionChangeType[LiveConnectionChangeType["Add"] = 0] = "Add";
    /**
     * Remove change.
     */
    LiveConnectionChangeType[LiveConnectionChangeType["Remove"] = 1] = "Remove";
    /**
     * Update change.
     */
    LiveConnectionChangeType[LiveConnectionChangeType["Update"] = 2] = "Update";
    /**
     * Error change (reserved)
     */
    LiveConnectionChangeType[LiveConnectionChangeType["Error"] = 3] = "Error";
})(LiveConnectionChangeType || (LiveConnectionChangeType = {}));
/**
 * ConnectionStream class that enables to get all connections once and listen to the change.
 *
 * TODO:
 * 1. Support live connection status for a single connection in such a way that one could subscribe to it from ActiveConnection
 *    with that observable always being for the active connection.
 * 2. Support updating all connection status on an interval. (using existing expiration field in cache)
 * 3. Support preserving status across sessions during the interval time.
 *    currently we are using session storage, this may also require credentials to be preserved across sessions.
 */
var ConnectionStream = /** @class */ (function () {
    /**
     * Initializes a new instance of the ConnectionStream class.
     * @param connectionManager the connection manager object.
     * @param powershellConnection the powerShell connection object.
     * @param gatewayConnection the gateway connection object.
     */
    function ConnectionStream(rpc, connectionManager, powershellConnection, gatewayConnection) {
        var _this = this;
        this.rpc = rpc;
        this.connectionManager = connectionManager;
        this.powershellConnection = powershellConnection;
        this.gatewayConnection = gatewayConnection;
        this.refreshAllSubject = new Subject();
        this.refreshOneSubject = new Subject();
        this.statusLabelMap = {};
        this.connectionStrings = MsftSme.resourcesStrings().MsftSmeShell.Core.Connection;
        this.statusLabelMap[LiveConnectionStatusType.Error] = this.connectionStrings.ErrorState.label;
        this.statusLabelMap[LiveConnectionStatusType.Fatal] = this.connectionStrings.FatalState.label;
        this.statusLabelMap[LiveConnectionStatusType.Online] = this.connectionStrings.OnlineState.label;
        this.statusLabelMap[LiveConnectionStatusType.Unauthorized] = this.connectionStrings.NeedsAuthorizationState.label;
        this.statusLabelMap[LiveConnectionStatusType.Unknown] = this.connectionStrings.UnknownState.label;
        this.statusLabelMap[LiveConnectionStatusType.Warning] = this.connectionStrings.WarningState.label;
        // TODO: when persistent local storage is used, we may not need to clear the cache anymore. 
        // we clear it now because page refresh is technically in the same session, but may persist         
        // inaccurate status as credentials for connections are not persisted.
        var global = window;
        if (global.MsftSme.Init.moduleName === EnvironmentModule.nameOfShell) {
            Observable.fromEvent(window, 'beforeunload').subscribe(function (e) {
                // in the future we want to make sure the catch is always saved when the window exits. As well as after refresh intervals.
                // we should check performance on saving the cache on every change to the stream.
                // don't clear other than shell.
                _this.clearCache();
            });
        }
    }
    /**
     * Clears the connections stream cache
     */
    ConnectionStream.clearCache = function () {
        sessionStorage.removeItem(ConnectionStream.cacheKey);
    };
    Object.defineProperty(ConnectionStream.prototype, "liveConnectionCollection", {
        /**
         * Gets current live connection collection.
         * - Subscribe liveConnectionChanged observable afterward.
         *
         * @return LiveConnection[] current live connections data.
         */
        get: function () {
            var _this = this;
            return this.connectionManager.connectionsInitialized.map(function () {
                // restore stream cache.
                var changed = _this.restoreCache();
                // refresh data if it has no expiration or expired.
                if (changed || !_this.cache.timestamp || (Date.now() - _this.cache.timestamp) > ConnectionStream.cacheDurationInMilliseconds) {
                    _this.clearCache();
                    _this.refresh();
                }
                else {
                    Object.keys(_this.cache.connections).map(function (key) { return _this.cache.connections[key]; }).forEach(function (live) {
                        if (!live.status || live.status.type === LiveConnectionStatusType.Unknown) {
                            _this.refresh(live.connection);
                        }
                    });
                }
                return Object.keys(_this.cache.connections).map(function (key) { return _this.cache.connections[key]; });
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionStream.prototype, "liveConnectionChanged", {
        /**
         * Gets the observable of live connection change.
         *
         * @return Observable<LiveConnectionChange> change of live connection data.
         */
        get: function () {
            return this.createChangeObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Wraps a connection in a live connection object by retrieving its current status
     * @param connection
     */
    ConnectionStream.prototype.getLiveConnection = function (connection) {
        // get the connection types status provider
        var typeInfo = ConnectionUtility.getConnectionTypeInfo(connection);
        if (typeInfo && typeInfo.provider && typeInfo.provider.connectionStatusProvider) {
            var statusProvider = typeInfo.provider.connectionStatusProvider;
            return this.getConnectionStatus(statusProvider, connection, connection.name);
        }
        // this should not happen, it means we have a malformed manifest.
        var logMessage = MsftSme.resourcesStrings()
            .MsftSmeShell.Core.Connection.NoStatusProvider.message
            .format(connection.type);
        // log warning about this condition
        Logging.log({
            source: 'ConnectionStream',
            level: LogLevel.Warning,
            message: logMessage
        });
        // we dont need to fail, we can set this items status to unknown and continue
        var statusLabel = MsftSme.resourcesStrings().MsftSmeShell.Core.Connection.NoStatusProvider.label;
        return Observable.of({
            connection: connection,
            loading: false,
            status: {
                label: statusLabel,
                type: LiveConnectionStatusType.Unknown,
                details: logMessage
            }
        });
    };
    /**
     * Get connection status and aliases from statusProvider, retry alaises when connection nodeName NotFound
     * @param statusProvider status provider from typeInfo manifest
     * @param connection original connection
     * @param nodeName retry nodeName, can be connection.name or alias
     */
    ConnectionStream.prototype.getConnectionStatus = function (statusProvider, connection, nodeName) {
        var _this = this;
        var statusAwaiter;
        // collect the status data from the status provider
        if (statusProvider.powerShell) {
            statusAwaiter = this.getConnectionStatusFromPowershell(nodeName, statusProvider.powerShell);
        }
        else if (statusProvider.relativeGatewayUrl) {
            statusAwaiter = this.getConnectionStatusFromGatewayUrl(nodeName, statusProvider.relativeGatewayUrl);
        }
        return statusAwaiter
            .map(function (statusData) {
            // create connection object to return
            var liveConnection = {
                connection: connection,
                loading: false
            };
            // extract the status field from the data
            if (statusData['status']) {
                liveConnection.status = statusData['status'];
                delete statusData['status'];
            }
            else {
                // if there is no status field, assume everything is good since we got this far.
                liveConnection.status = {
                    type: LiveConnectionStatusType.Online
                };
            }
            // load localized values for label and details
            if (statusProvider.displayValueMap) {
                var label = statusProvider.displayValueMap[liveConnection.status.label];
                var details = statusProvider.displayValueMap[liveConnection.status.details];
                liveConnection.status.label = label || liveConnection.status.label;
                liveConnection.status.details = details || liveConnection.status.details;
            }
            // extract the aliases field from the data
            if (statusData['aliases']) {
                var save = false;
                var aliases = statusData['aliases'];
                delete statusData['aliases'];
                _this.connectionManager.saveAliasesData(aliases, connection, nodeName);
            }
            // any other properties returned by status call live in property bag.
            liveConnection.properties = statusData;
            // return the new live connection
            return liveConnection;
        })
            .catch(function (error) {
            var liveConnection = {
                connection: connection,
                loading: false
            };
            if (error.status === HttpStatusCode.Unauthorized
                || error.status === HttpStatusCode.Forbidden
                || Net.isEncapsulatedAuthorizationError(error)) {
                liveConnection.status = {
                    type: LiveConnectionStatusType.Unauthorized
                };
            }
            else if (error.status === HttpStatusCode.NotFound) {
                var alias = _this.connectionManager.getActiveAlias(connection.name);
                // found alias, retry
                if (alias) {
                    return _this.getConnectionStatus(statusProvider, connection, alias);
                }
                else {
                    var label = MsftSme.resourcesStrings().MsftSmeShell.Core.Connection.NoConnection.label;
                    var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Connection.NoConnection.message;
                    liveConnection.status = {
                        label: label,
                        type: LiveConnectionStatusType.Unknown,
                        details: message
                    };
                }
            }
            else {
                liveConnection.status = {
                    type: LiveConnectionStatusType.Fatal,
                    details: Net.getErrorMessage(error)
                };
            }
            return Observable.of(liveConnection);
        })
            .do(function (liveConnection) {
            if (!liveConnection.status.label) {
                liveConnection.status.label = _this.statusLabelMap[liveConnection.status.type]
                    || _this.statusLabelMap[LiveConnectionStatusType.Unknown];
            }
        });
    };
    /**
     * Refreshes the connection stream. If a connection is provided, only that connections live information will be refreshed.
     *
     * @param connection the connection object (optional)
     */
    ConnectionStream.prototype.refresh = function (connection) {
        if (connection) {
            this.refreshOneSubject.next(connection);
        }
        else {
            this.refreshAllSubject.next();
        }
    };
    /**
     * Create change observable.
     */
    ConnectionStream.prototype.createChangeObservable = function () {
        var _this = this;
        // when connections are incoming, add them to the cache
        return this.getIncomingChange().map(function (change) {
            change.liveConnection.lastUpdated = Date.now();
            _this.cache.connections[change.liveConnection.connection.id] = change.liveConnection;
            _this.saveCache();
            return change;
        })
            .catch(function (error, caught) {
            // catch any errors and log them, but continue with  whatever was in the cache previously
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ConnectionStream.message;
            Logging.log({
                source: 'ConnectionStream',
                level: LogLevel.Error,
                message: message.format(Net.getErrorMessage(error))
            });
            return Observable.of({ liveConnection: null, type: LiveConnectionChangeType.Error });
        });
    };
    /**
     * Returns an observable that emits an live connection object
     * for every additive connection event such as initialized, added, and updated
     */
    ConnectionStream.prototype.getIncomingChange = function () {
        var _this = this;
        return Observable.merge(
        // refresh all case.
        this.refreshAllSubject.switchMap(function () { return Observable.from(_this.connectionManager.connections); })
            .map(function (connection) { return _this.createChange(connection, LiveConnectionChangeType.Update); }), 
        // refresh one case.
        this.refreshOneSubject
            .map(function (connection) { return _this.createChange(connection, LiveConnectionChangeType.Update); }), 
        // connection change case.
        this.connectionManager.connectionsChanged
            .filter(function (event) { return event.type === ConnectionChangeType.Added || event.type === ConnectionChangeType.Removed; })
            .map(function (event) { return _this.createChange(event.connection, event.type === ConnectionChangeType.Added ? LiveConnectionChangeType.Add : LiveConnectionChangeType.Remove); }))
            .flatMap(function (change) {
            // prepare an initial value to emit right away that shows this connection as loading
            if (change.type === LiveConnectionChangeType.Remove) {
                var liveConnection = _this.cache.connections[change.liveConnection.connection.id];
                if (liveConnection) {
                    delete _this.cache.connections[change.liveConnection.connection.id];
                }
                // sending remove change.
                return Observable.of(change);
            }
            var changeUpdate = _this.getLiveConnection(change.liveConnection.connection)
                .map(function (update) {
                var updateChange = {
                    type: LiveConnectionChangeType.Update,
                    liveConnection: update
                };
                updateChange.liveConnection.loading = false;
                return updateChange;
            });
            // sending update with loading state, and later send updated status.
            return Observable.merge(Observable.of(change), changeUpdate);
        });
    };
    ConnectionStream.prototype.createChange = function (connection, type) {
        return {
            liveConnection: {
                connection: connection,
                loading: true
            },
            type: type
        };
    };
    /**
     * Retrieves a connections status from a powershell status provider
     * @param nodeName
     * @param options The powershell options
     */
    ConnectionStream.prototype.getConnectionStatusFromPowershell = function (nodeName, options) {
        if (!nodeName) {
            // log warning about this condition
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Connection.ErrorNodeName.message;
            Logging.log({
                source: 'ConnectionStream',
                level: LogLevel.Error,
                message: message.format(nodeName)
            });
            return Observable.throw(new Error(message));
        }
        var psSession = this.powershellConnection.createSession(nodeName, null, { noAuth: true });
        return this.powershellConnection
            .run(psSession, options.script)
            .map(function (response) {
            // we expect the script to return an object as the first result. 
            // The object should have some property called 'status' but we will check this later.
            return response.results[0];
        });
    };
    /**
     * Retrieves a connections status from a gatewayUrl status provider
     * @param nodeName
     * @param relativeUrl the relative url from the relativeGatewayUrl provider
     */
    ConnectionStream.prototype.getConnectionStatusFromGatewayUrl = function (nodeName, relativeUrl) {
        if (!relativeUrl) {
            // log warning about this condition
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Connection.ErrorGatewayUrl.message;
            Logging.log({
                source: 'ConnectionStream',
                level: LogLevel.Error,
                message: message
            });
            return Observable.throw(new Error(message));
        }
        relativeUrl = relativeUrl.replace('$connectionName', nodeName);
        return this.gatewayConnection.get(relativeUrl);
    };
    /**
     * Saves the connections stream catch
     */
    ConnectionStream.prototype.saveCache = function () {
        this.cache.timestamp = Date.now();
        var savedCache = JSON.stringify(this.cache);
        sessionStorage.setItem(ConnectionStream.cacheKey, savedCache);
    };
    /**
     * Restores the connections stream catch
     *
     * @return boolean indicate there is difference in cache.
     */
    ConnectionStream.prototype.restoreCache = function () {
        var savedCache = sessionStorage.getItem(ConnectionStream.cacheKey);
        this.cache = savedCache ? JSON.parse(savedCache) : { connections: {} };
        var keys = Object.keys(this.cache.connections);
        if (keys.length !== this.connectionManager.connections.length) {
            // length doesn't match.
            return true;
        }
        var _loop_1 = function (key) {
            if (!this_1.connectionManager.connections.find(function (x) { return x.id === key; })) {
                return { value: false };
            }
        };
        var this_1 = this;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var state_1 = _loop_1(key);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    /**
     * Clears the connections stream catch
     */
    ConnectionStream.prototype.clearCache = function () {
        this.cache = { connections: {}, timestamp: null };
        ConnectionStream.clearCache();
    };
    /**
     * The Cache key for the connection stream class
     */
    ConnectionStream.cacheKey = '@msft-sme/shell:connection-stream.cache';
    /**
     * The duration in milliseconds for the connection stream cache. Current is 10 minutes.
     */
    ConnectionStream.cacheDurationInMilliseconds = 10 * 60 * 1000;
    return ConnectionStream;
}());
export { ConnectionStream };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2VjdXJpdHkvY29ubmVjdGlvbi1zdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUE4QixVQUFVLEVBQWlCLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd0RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUdsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sRUFDSCxpQkFBaUIsRUFHcEIsTUFBTSxpQ0FBaUMsQ0FBQztBQUt6QyxPQUFPLEVBQXVDLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RGLE9BQU8sRUFBMEIsb0JBQW9CLEVBQXFCLE1BQU0sc0JBQXNCLENBQUM7QUFvRHZHOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksd0JBOEJYO0FBOUJELFdBQVksd0JBQXdCO0lBQ2hDOztPQUVHO0lBQ0gsMkVBQVUsQ0FBQTtJQUVWOztPQUVHO0lBQ0gsNkVBQVcsQ0FBQTtJQUVYOztPQUVHO0lBQ0gsdUZBQWdCLENBQUE7SUFFaEI7O09BRUc7SUFDSCx5RUFBUyxDQUFBO0lBRVQ7O09BRUc7SUFDSCx5RUFBUyxDQUFBO0lBRVQ7O09BRUc7SUFDSCw2RUFBVyxDQUFBO0FBQ2YsQ0FBQyxFQTlCVyx3QkFBd0IsS0FBeEIsd0JBQXdCLFFBOEJuQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksd0JBb0JYO0FBcEJELFdBQVksd0JBQXdCO0lBQ2hDOztPQUVHO0lBQ0gscUVBQUcsQ0FBQTtJQUVIOztPQUVHO0lBQ0gsMkVBQU0sQ0FBQTtJQUVOOztPQUVHO0lBQ0gsMkVBQU0sQ0FBQTtJQUVOOztPQUVHO0lBQ0gseUVBQUssQ0FBQTtBQUNULENBQUMsRUFwQlcsd0JBQXdCLEtBQXhCLHdCQUF3QixRQW9CbkM7QUFnQ0Q7Ozs7Ozs7OztHQVNHO0FBQ0g7SUF5Qkk7Ozs7O09BS0c7SUFDSCwwQkFDWSxHQUFRLEVBQ1IsaUJBQW9DLEVBQ3BDLG9CQUEwQyxFQUMxQyxpQkFBb0M7UUFKaEQsaUJBd0JDO1FBdkJXLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFDUixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQXhCeEMsc0JBQWlCLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7UUFDdkQsc0JBQWlCLEdBQXdCLElBQUksT0FBTyxFQUFjLENBQUM7UUFHbkUsbUJBQWMsR0FBZ0MsRUFBRSxDQUFDO1FBQ2pELHNCQUFpQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBb0J6RixJQUFJLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQzlGLElBQUksQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDOUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztRQUNoRyxJQUFJLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUM7UUFDbEgsSUFBSSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNsRyxJQUFJLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBRWxHLDRGQUE0RjtRQUM1RixvR0FBb0c7UUFDcEcsc0VBQXNFO1FBQ3RFLElBQUksTUFBTSxHQUEyQixNQUFNLENBQUM7UUFDNUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBTTtnQkFDMUQsMEhBQTBIO2dCQUMxSCxpRkFBaUY7Z0JBQ2pGLGdDQUFnQztnQkFDaEMsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFyQ0Q7O09BRUc7SUFDVywyQkFBVSxHQUF4QjtRQUNJLGNBQWMsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQXdDRCxzQkFBVyxzREFBd0I7UUFObkM7Ozs7O1dBS0c7YUFDSDtZQUFBLGlCQW1CQztZQWxCRyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQztnQkFDckQsd0JBQXdCO2dCQUN4QixJQUFJLE9BQU8sR0FBRyxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBRWxDLG1EQUFtRDtnQkFDbkQsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUM7b0JBQ3pILEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuQixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7d0JBQ3BGLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzRCQUN4RSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDbEMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQztZQUN2RixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7OztPQUFBO0lBT0Qsc0JBQVcsbURBQXFCO1FBTGhDOzs7O1dBSUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQUVEOzs7T0FHRztJQUNJLDRDQUFpQixHQUF4QixVQUF5QixVQUFzQjtRQUMzQywyQ0FBMkM7UUFDM0MsSUFBSSxRQUFRLEdBQUcsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkUsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7WUFDOUUsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQztZQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pGLENBQUM7UUFFRCxpRUFBaUU7UUFDakUsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXO2FBQy9DLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU87YUFDckQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixtQ0FBbUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNSLE1BQU0sRUFBRSxrQkFBa0I7WUFDMUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxPQUFPO1lBQ3ZCLE9BQU8sRUFBRSxVQUFVO1NBQ3RCLENBQUMsQ0FBQztRQUVILDZFQUE2RTtRQUM3RSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7UUFDMUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQWlCO1lBQ2pDLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsTUFBTSxFQUFFO2dCQUNKLEtBQUssRUFBRSxXQUFXO2dCQUNsQixJQUFJLEVBQUUsd0JBQXdCLENBQUMsT0FBTztnQkFDdEMsT0FBTyxFQUFFLFVBQVU7YUFDdEI7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyw4Q0FBbUIsR0FBM0IsVUFDSSxjQUF5RCxFQUN6RCxVQUFzQixFQUN0QixRQUFnQjtRQUhwQixpQkF1RkM7UUFuRkcsSUFBSSxhQUFpRCxDQUFDO1FBRXRELG1EQUFtRDtRQUNuRCxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM1QixhQUFhLEdBQUcsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEcsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzNDLGFBQWEsR0FBRyxJQUFJLENBQUMsaUNBQWlDLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hHLENBQUM7UUFDRCxNQUFNLENBQUMsYUFBYTthQUNmLEdBQUcsQ0FBQyxVQUFBLFVBQVU7WUFDWCxxQ0FBcUM7WUFDckMsSUFBSSxjQUFjLEdBQW1CO2dCQUNqQyxVQUFVLEVBQUUsVUFBVTtnQkFDdEIsT0FBTyxFQUFFLEtBQUs7YUFDakIsQ0FBQztZQUNGLHlDQUF5QztZQUN6QyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixjQUFjLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDN0MsT0FBTyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLGdGQUFnRjtnQkFDaEYsY0FBYyxDQUFDLE1BQU0sR0FBRztvQkFDcEIsSUFBSSxFQUFFLHdCQUF3QixDQUFDLE1BQU07aUJBQ3hDLENBQUM7WUFDTixDQUFDO1lBQ0QsOENBQThDO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hFLElBQUksT0FBTyxHQUFHLGNBQWMsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNuRSxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDN0UsQ0FBQztZQUNELDBDQUEwQztZQUMxQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ2pCLElBQUksT0FBTyxHQUFhLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUMsT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzdCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMxRSxDQUFDO1lBQ0QscUVBQXFFO1lBQ3JFLGNBQWMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQ3ZDLGlDQUFpQztZQUNqQyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQzFCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLEtBQWdCO1lBQ3BCLElBQUksY0FBYyxHQUFtQjtnQkFDakMsVUFBVSxFQUFFLFVBQVU7Z0JBQ3RCLE9BQU8sRUFBRSxLQUFLO2FBQ2pCLENBQUM7WUFDRixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLGNBQWMsQ0FBQyxZQUFZO21CQUN6QyxLQUFLLENBQUMsTUFBTSxLQUFLLGNBQWMsQ0FBQyxTQUFTO21CQUN6QyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxjQUFjLENBQUMsTUFBTSxHQUFHO29CQUNwQixJQUFJLEVBQUUsd0JBQXdCLENBQUMsWUFBWTtpQkFDOUMsQ0FBQztZQUNOLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25FLHFCQUFxQjtnQkFDckIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZFLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztvQkFDaEcsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztvQkFDcEcsY0FBYyxDQUFDLE1BQU0sR0FBRzt3QkFDcEIsS0FBSyxFQUFFLEtBQUs7d0JBQ1osSUFBSSxFQUFFLHdCQUF3QixDQUFDLE9BQU87d0JBQ3RDLE9BQU8sRUFBRSxPQUFPO3FCQUNuQixDQUFDO2dCQUNOLENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osY0FBYyxDQUFDLE1BQU0sR0FBRztvQkFDcEIsSUFBSSxFQUFFLHdCQUF3QixDQUFDLEtBQUs7b0JBQ3BDLE9BQU8sRUFBRSxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztpQkFDdEMsQ0FBQztZQUNOLENBQUM7WUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUM7YUFDRCxFQUFFLENBQUMsVUFBQSxjQUFjO1lBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7dUJBQ3RFLEtBQUksQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakUsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxrQ0FBTyxHQUFkLFVBQWUsVUFBdUI7UUFDbEMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxpREFBc0IsR0FBOUI7UUFBQSxpQkFrQkM7UUFqQkcsdURBQXVEO1FBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNO1lBQ3RDLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMvQyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1lBQ3BGLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUMsQ0FBQzthQUNHLEtBQUssQ0FBQyxVQUFDLEtBQUssRUFBRSxNQUFNO1lBQ2pCLHlGQUF5RjtZQUN6RixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7WUFDbkcsT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDUixNQUFNLEVBQUUsa0JBQWtCO2dCQUMxQixLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7Z0JBQ3JCLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEQsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQXVCLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsd0JBQXdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMvRyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRDs7O09BR0c7SUFDSyw0Q0FBaUIsR0FBekI7UUFBQSxpQkE4Q0M7UUE3Q0csTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLO1FBQ25CLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsRUFBbkQsQ0FBbUQsQ0FBQzthQUN0RixHQUFHLENBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsRUFBOUQsQ0FBOEQsQ0FBQztRQUV0RixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLGlCQUFpQjthQUNqQixHQUFHLENBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsRUFBOUQsQ0FBOEQsQ0FBQztRQUV0RiwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQjthQUNwQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxLQUFLLG9CQUFvQixDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLG9CQUFvQixDQUFDLE9BQU8sRUFBeEYsQ0FBd0YsQ0FBQzthQUN6RyxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUNGLEtBQU0sQ0FBQyxVQUFVLEVBQzFDLEtBQUssQ0FBQyxJQUFJLEtBQUssb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxFQUZqRyxDQUVpRyxDQUFDLENBQ3ZIO2FBSUksT0FBTyxDQUFDLFVBQUMsTUFBNEI7WUFDbEMsb0ZBQW9GO1lBQ3BGLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssd0JBQXdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxjQUFjLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pGLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLE9BQU8sS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZFLENBQUM7Z0JBRUQseUJBQXlCO2dCQUN6QixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQyxDQUFDO1lBRUQsSUFBSSxZQUFZLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDO2lCQUN0RSxHQUFHLENBQUMsVUFBQSxNQUFNO2dCQUNQLElBQUksWUFBWSxHQUF5QjtvQkFDckMsSUFBSSxFQUFFLHdCQUF3QixDQUFDLE1BQU07b0JBQ3JDLGNBQWMsRUFBRSxNQUFNO2lCQUN6QixDQUFDO2dCQUVGLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDNUMsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztZQUVQLG9FQUFvRTtZQUNwRSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVPLHVDQUFZLEdBQXBCLFVBQXFCLFVBQXNCLEVBQUUsSUFBOEI7UUFDdkUsTUFBTSxDQUF1QjtZQUN6QixjQUFjLEVBQUU7Z0JBQ1osVUFBVSxFQUFFLFVBQVU7Z0JBQ3RCLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7O09BSUc7SUFDSyw0REFBaUMsR0FBekMsVUFDSSxRQUFnQixFQUNoQixPQUF5RDtRQUN6RCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDWixtQ0FBbUM7WUFDbkMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUNyRyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNSLE1BQU0sRUFBRSxrQkFBa0I7Z0JBQzFCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztnQkFDckIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO2FBQ3BDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzFGLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CO2FBQzNCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQzthQUM5QixHQUFHLENBQUMsVUFBQSxRQUFRO1lBQ1QsaUVBQWlFO1lBQ2pFLHFGQUFxRjtZQUNyRixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssNERBQWlDLEdBQXpDLFVBQTBDLFFBQWdCLEVBQUUsV0FBbUI7UUFDM0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2YsbUNBQW1DO1lBQ25DLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7WUFDdkcsT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDUixNQUFNLEVBQUUsa0JBQWtCO2dCQUMxQixLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7Z0JBQ3JCLE9BQU8sRUFBRSxPQUFPO2FBQ25CLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVELFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7T0FFRztJQUNLLG9DQUFTLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLGNBQWMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssdUNBQVksR0FBcEI7UUFDSSxJQUFJLFVBQVUsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUN2RSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUQsd0JBQXdCO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztnQ0FFUSxHQUFHO1lBQ1IsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFLLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsRUFBWixDQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBRXZELEtBQUs7WUFDaEIsQ0FBQztRQUNMLENBQUM7O1FBTEQsR0FBRyxDQUFDLENBQVksVUFBSSxFQUFKLGFBQUksRUFBSixrQkFBSSxFQUFKLElBQUk7WUFBZixJQUFJLEdBQUcsYUFBQTtrQ0FBSCxHQUFHOzs7U0FLWDtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNLLHFDQUFVLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ2xELGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUF4WkQ7O09BRUc7SUFDWSx5QkFBUSxHQUFHLHlDQUF5QyxDQUFDO0lBRXBFOztPQUVHO0lBQ1ksNENBQTJCLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFpWmhFLHVCQUFDO0NBMVpELEFBMFpDLElBQUE7U0ExWlksZ0JBQWdCIiwiZmlsZSI6ImNvbm5lY3Rpb24tc3RyZWFtLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==