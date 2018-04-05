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
var ConnectionStream = (function () {
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
     * Wraps a connection in a live connection object by retrieving its current status
     * @param connection
     */
    ConnectionStream.prototype.getLiveConnection = function (connection) {
        var _this = this;
        // get the connection types status provider
        var typeInfo = ConnectionUtility.getConnectionTypeInfo(connection);
        if (typeInfo && typeInfo.provider && typeInfo.provider.connectionStatusProvider) {
            var statusProvider_1 = typeInfo.provider.connectionStatusProvider;
            var statusAwaiter = void 0;
            // collect the status data from the status provider
            if (statusProvider_1.powerShell) {
                statusAwaiter = this.getConnectionStatusFromPowershell(connection, statusProvider_1.powerShell);
            }
            else if (statusProvider_1.relativeGatewayUrl) {
                statusAwaiter = this.getConnectionStatusFromGatewayUrl(connection, statusProvider_1.relativeGatewayUrl);
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
                if (statusProvider_1.displayValueMap) {
                    var label = statusProvider_1.displayValueMap[liveConnection.status.label];
                    var details = statusProvider_1.displayValueMap[liveConnection.status.details];
                    liveConnection.status.label = label || liveConnection.status.label;
                    liveConnection.status.details = details || liveConnection.status.details;
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
                    var label = MsftSme.resourcesStrings().MsftSmeShell.Core.Connection.NoConnection.label;
                    var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Connection.NoConnection.message;
                    liveConnection.status = {
                        label: label,
                        type: LiveConnectionStatusType.Unknown,
                        details: message
                    };
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
     * Retrieves a connections status from a powershell status provider
     * @param connection
     * @param options The powershell options
     */
    ConnectionStream.prototype.getConnectionStatusFromPowershell = function (connection, options) {
        var nodePath = options.nodePropertyPath || 'name';
        var nodeName = MsftSme.getValue(connection, nodePath);
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
        return psSession.powerShell
            .run(options.script)
            .map(function (response) {
            // we expect the script to return an object as the first result. 
            // The object should have some property called 'status' but we will check this later.
            return response.results[0];
        });
    };
    /**
     * Retrieves a connections status from a gatewayUrl status provider
     * @param connection
     * @param relativeUrl the relative url from the relativeGatewayUrl provider
     */
    ConnectionStream.prototype.getConnectionStatusFromGatewayUrl = function (connection, relativeUrl) {
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
        relativeUrl = relativeUrl.replace('$connectionName', connection.name);
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
    return ConnectionStream;
}());
export { ConnectionStream };
/**
 * The Cache key for the connection stream class
 */
ConnectionStream.cacheKey = '@msft-sme/shell:connection-stream.cache';
/**
 * The duration in milliseconds for the connection stream cache. Current is 10 minutes.
 */
ConnectionStream.cacheDurationInMilliseconds = 10 * 60 * 1000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2VjdXJpdHkvY29ubmVjdGlvbi1zdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUE4QixVQUFVLEVBQWlCLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd0RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUdsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBb0QsTUFBTSxpQ0FBaUMsQ0FBQztBQUt0SCxPQUFPLEVBQXVDLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RGLE9BQU8sRUFBMEIsb0JBQW9CLEVBQXFCLE1BQU0sc0JBQXNCLENBQUM7QUFvRHZHOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksd0JBOEJYO0FBOUJELFdBQVksd0JBQXdCO0lBQ2hDOztPQUVHO0lBQ0gsMkVBQVUsQ0FBQTtJQUVWOztPQUVHO0lBQ0gsNkVBQVcsQ0FBQTtJQUVYOztPQUVHO0lBQ0gsdUZBQWdCLENBQUE7SUFFaEI7O09BRUc7SUFDSCx5RUFBUyxDQUFBO0lBRVQ7O09BRUc7SUFDSCx5RUFBUyxDQUFBO0lBRVQ7O09BRUc7SUFDSCw2RUFBVyxDQUFBO0FBQ2YsQ0FBQyxFQTlCVyx3QkFBd0IsS0FBeEIsd0JBQXdCLFFBOEJuQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksd0JBb0JYO0FBcEJELFdBQVksd0JBQXdCO0lBQ2hDOztPQUVHO0lBQ0gscUVBQUcsQ0FBQTtJQUVIOztPQUVHO0lBQ0gsMkVBQU0sQ0FBQTtJQUVOOztPQUVHO0lBQ0gsMkVBQU0sQ0FBQTtJQUVOOztPQUVHO0lBQ0gseUVBQUssQ0FBQTtBQUNULENBQUMsRUFwQlcsd0JBQXdCLEtB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QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7Z0NBRVEsR0FBRztZQUNSLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBSyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQVosQ0FBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUV2RCxLQUFLO1lBQ2hCLENBQUM7UUFDTCxDQUFDOztRQUxELEdBQUcsQ0FBQyxDQUFZLFVBQUksRUFBSixhQUFJLEVBQUosa0JBQUksRUFBSixJQUFJO1lBQWYsSUFBSSxHQUFHLGFBQUE7a0NBQUgsR0FBRzs7O1NBS1g7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxxQ0FBVSxHQUFsQjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNsRCxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQXpZQSxBQXlZQzs7QUF4WUc7O0dBRUc7QUFDWSx5QkFBUSxHQUFHLHlDQUF5QyxDQUFDO0FBRXBFOztHQUVHO0FBQ1ksNENBQTJCLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMiLCJmaWxlIjoiY29ubmVjdGlvbi1zdHJlYW0uanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9