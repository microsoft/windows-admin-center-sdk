var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Net } from '../data/net';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { RpcServiceForwarder } from '../rpc/rpc-forwarder';
import { connectionTypeConstants, ConnectionUtility } from './connection';
export var ConnectionChangeType;
(function (ConnectionChangeType) {
    ConnectionChangeType[ConnectionChangeType["Initialized"] = 0] = "Initialized";
    ConnectionChangeType[ConnectionChangeType["Activated"] = 1] = "Activated";
    ConnectionChangeType[ConnectionChangeType["Added"] = 2] = "Added";
    ConnectionChangeType[ConnectionChangeType["Removed"] = 3] = "Removed";
})(ConnectionChangeType || (ConnectionChangeType = {}));
var ConnectionManager = (function (_super) {
    __extends(ConnectionManager, _super);
    function ConnectionManager(rpc, gatewayConnection) {
        var _this = _super.call(this, 'connection-manager', rpc) || this;
        _this.gatewayConnection = gatewayConnection;
        _this.allConnections = [];
        _this.activeConnectionIndex = -1;
        /**
         * Subject that Fires once and remembers when when connections have been initialized
         */
        _this.connectionsInitialized = new ReplaySubject(1);
        /**
         * Event subject that signals that the connection(s) have changed.
         * Filter on changeType to determine what type of change has occurred
         */
        _this.connectionsChanged = new Subject();
        return _this;
    }
    ConnectionManager.prototype.restoreConnections = function () {
        var _this = this;
        if (!this.canForward(0 /* Parent */)) {
            this.gatewayConnection.get(ConnectionManager.gatewayConnectionApi)
                .map(function (data) {
                if (data.value) {
                    (Array.isArray(data.value) ? data.value : [data.value])
                        .forEach(function (connection) {
                        // for some reason the node api returns properties in a nested format. Unpack it into the correct format
                        if (connection.properties) {
                            connection = connection.properties;
                        }
                        // ensure bare minimum properties exist, ignore otherwise
                        if (connection && connection.name && connection.type && connection.id) {
                            _this.addOrUpdateConnection(connection, false);
                            return;
                        }
                    });
                }
                return _this.allConnections;
            })
                .catch(function (error) {
                var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ServerListRetrieve.message;
                Logging.log({
                    source: 'ConnectionManager',
                    level: LogLevel.Error,
                    message: message.format(Net.getErrorMessage(error))
                });
                _this.connectionsInitialized.error(error);
                return Observable.of(_this.allConnections);
            })
                .subscribe(function (data) {
                _this.forwardNotify(1 /* Child */, ConnectionManager.connectionsPropertyName, _this.allConnections);
                _this.connectionsChanged.next({
                    type: ConnectionChangeType.Initialized,
                    connections: _this.allConnections
                });
                _this.connectionsInitialized.next(_this.allConnections);
            });
        }
        return this.connectionsInitialized;
    };
    Object.defineProperty(ConnectionManager.prototype, "connections", {
        /**
         * Gets all connections
         */
        get: function () {
            return this.allConnections;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionManager.prototype, "activeConnection", {
        /**
         * Gets active connection.
         */
        get: function () {
            return this.allConnections[this.activeConnectionIndex];
        },
        /**
         * Sets active connection.
         */
        set: function (connection) {
            // only change active connection if it has really changed
            if (!ConnectionUtility.areEqual(this.activeConnection, connection)) {
                if (!connection) {
                    this.activeConnectionIndex = -1;
                }
                else {
                    this.activeConnectionIndex = this.addOrUpdateConnection(connection, false);
                }
                this.connectionsChanged.next({ type: ConnectionChangeType.Activated, connection: connection });
                this.forwardNotify(1 /* Child */, ConnectionManager.activeConnectionPropertyName, this.activeConnection);
                this.forwardNotify(0 /* Parent */, ConnectionManager.activeConnectionPropertyName, this.activeConnection);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets active connection.
     */
    ConnectionManager.prototype.addOrUpdateConnection = function (connection, save) {
        if (save === void 0) { save = true; }
        ConnectionUtility.forceLowercase(connection);
        var index = this.allConnections.findIndex(function (c) { return ConnectionUtility.areEqual(c, connection); });
        if (index >= 0) {
            this.allConnections[index] = connection;
        }
        else {
            this.allConnections.push(connection);
            this.connectionsChanged.next({ type: ConnectionChangeType.Added, connection: connection });
            index = this.allConnections.length - 1;
            // notify parent and child of collection changed.
            this.forwardNotify(0 /* Parent */, ConnectionManager.connectionsPropertyName, this.allConnections);
            this.forwardNotify(1 /* Child */, ConnectionManager.connectionsPropertyName, this.allConnections);
        }
        if (save) {
            this.saveConnection(connection).subscribe();
        }
        return index;
    };
    /**
     * Sets active connection.
     */
    ConnectionManager.prototype.removeConnection = function (connection) {
        var _this = this;
        var forward = this.forwardExecute(0 /* Parent */, ConnectionManager.removeConnectionMethodName, [connection]);
        if (forward) {
            return forward;
        }
        return this.gatewayConnection.delete(ConnectionManager.gatewayConnectionApi + "/" + connection.id)
            .map(function (response) {
            var index = _this.allConnections.findIndex(function (c) { return ConnectionUtility.areEqual(c, connection); });
            if (index >= 0) {
                // if this connection is active, set active connection to null
                if (_this.activeConnectionIndex === index) {
                    _this.activeConnection = null;
                }
                // remove the connection from all connections
                _this.allConnections.splice(index, 1);
            }
            _this.connectionsChanged.next({ type: ConnectionChangeType.Removed, connection: connection });
            // notify our children that connections have changed
            _this.forwardNotify(1 /* Child */, ConnectionManager.connectionsPropertyName, _this.allConnections);
            return response;
        });
    };
    ConnectionManager.prototype.saveConnection = function (connection) {
        var _this = this;
        ConnectionUtility.forceLowercase(connection);
        var forward = this.forwardExecute(0 /* Parent */, ConnectionManager.saveConnectionMethodName, [connection]);
        if (forward) {
            return forward;
        }
        if (!connection.type || !connection.name) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ServerListFailedSave.message;
            return Observable.throw(message);
        }
        if (!connection.id) {
            connection.id = ConnectionUtility.createConnectionId(connection.type, connection.name);
        }
        return this.gatewayConnection.put(ConnectionManager.gatewayConnectionApi + "/" + connection.id, JSON.stringify(connection))
            .do(function (data) {
            if (data.properties.displayName) {
                connection.properties.displayName = data.properties.displayName;
            }
            _this.forwardNotify(1 /* Child */, ConnectionManager.connectionsPropertyName, _this.allConnections);
        });
    };
    /**
     * Finds a connection given a name and type
     * @param name the name of the connection to find
     * @param type the type of the connection to find, defaults to server type
     */
    ConnectionManager.prototype.findConnection = function (name, type) {
        var _this = this;
        if (!name) {
            return Observable.of(null);
        }
        type = type || connectionTypeConstants.server;
        if (this.activeConnection && this.activeConnection.name === name && this.activeConnection.type === type) {
            return Observable.of(this.activeConnection);
        }
        return this.connectionsInitialized.map(function (connections) {
            return _this.connections.find(function (c) { return c.name === name && c.type === type; });
        });
    };
    /**
     * Called on a child service instance when onForwardInit returns from the parent
     * @param data The response from the forwardInit call
     */
    ConnectionManager.prototype.onForwardInitResponse = function (data) {
        if (data.error) {
            // if there is an error, we cannot continue, so throw its
            throw data.error;
        }
        this.allConnections = data.result.connections;
        this.activeConnection = data.result.activeConnection;
        this.connectionsChanged.next({
            type: ConnectionChangeType.Initialized,
            connections: this.allConnections
        });
        this.connectionsInitialized.next(this.allConnections);
    };
    /**
     * Called when a new instance of the service in another window is initialized and needs to synchronize with its parent
     * @param from The RpcRelationshipType that this request is from
     * @returns an observable for the all the values needed to initialize the service
     */
    ConnectionManager.prototype.onForwardInit = function () {
        return Observable.of({
            connections: this.connections,
            activeConnection: this.activeConnection
        });
    };
    /**
     * Called when the forwarded services counterpart wants to get data from the parent
     * @param from The RpcRelationshipType that this request is from
     * @param name The name of the method to forward to
     * @param args The arguments of the method
     * @returns an observable for the result of the method call
     */
    ConnectionManager.prototype.onForwardExecute = function (from, name, args) {
        if (from === 1 /* Child */) {
            if (name === ConnectionManager.saveConnectionMethodName) {
                // we dont actually have anything to return here.
                return this.saveConnection.apply(this, args).map(function () { return null; });
            }
            if (name === ConnectionManager.removeConnectionMethodName) {
                // we dont actually have anything to return here.
                return this.removeConnection.apply(this, args).map(function () { return null; });
            }
        }
        // ConnectionManager does not allow any method calls at this time
        return this.nameNotFound(name);
    };
    /**
     * Called when the forwarded services counterpart sends a notify message
     * @param from The RpcRelationshipType that this request is from
     * @param name The name of the property to change
     * @param value The new value of the property
     * @returns an observable that completes when the property has been changed.
     */
    ConnectionManager.prototype.onForwardNotify = function (from, name, value) {
        if (name === ConnectionManager.connectionsPropertyName) {
            this.allConnections = value;
            return Observable.of(null);
        }
        if (name === ConnectionManager.activeConnectionPropertyName) {
            this.activeConnection = value;
            return Observable.of(null);
        }
        return this.nameNotFound(name);
    };
    return ConnectionManager;
}(RpcServiceForwarder));
export { ConnectionManager };
ConnectionManager.activeConnectionPropertyName = 'activeConnection';
ConnectionManager.connectionsPropertyName = 'connections';
ConnectionManager.saveConnectionMethodName = 'saveConnection';
ConnectionManager.removeConnectionMethodName = 'removeConnection';
ConnectionManager.gatewayConnectionApi = 'nodes';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2VjdXJpdHkvY29ubmVjdGlvbi1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHMUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSWpELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFBYyx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQU90RixNQUFNLENBQU4sSUFBWSxvQkFLWDtBQUxELFdBQVksb0JBQW9CO0lBQzVCLDZFQUFlLENBQUE7SUFDZix5RUFBYSxDQUFBO0lBQ2IsaUVBQVMsQ0FBQTtJQUNULHFFQUFXLENBQUE7QUFDZixDQUFDLEVBTFcsb0JBQW9CLEtBQXBCLG9CQUFvQixRQUsvQjtBQWFEO0lBQXVDLHFDQUFtQjtJQXNCdEQsMkJBQVksR0FBUSxFQUFVLGlCQUFvQztRQUFsRSxZQUNJLGtCQUFNLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxTQUNuQztRQUY2Qix1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBZDFELG9CQUFjLEdBQWlCLEVBQUUsQ0FBQztRQUNsQywyQkFBcUIsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVuQzs7V0FFRztRQUNJLDRCQUFzQixHQUFHLElBQUksYUFBYSxDQUFlLENBQUMsQ0FBQyxDQUFDO1FBRW5FOzs7V0FHRztRQUNJLHdCQUFrQixHQUFHLElBQUksT0FBTyxFQUEyQixDQUFDOztJQUluRSxDQUFDO0lBRU0sOENBQWtCLEdBQXpCO1FBQUEsaUJBOENDO1FBN0NHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFB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QUFlLEdBQXpCLFVBQTBCLElBQXlCLEVBQUUsSUFBWSxFQUFFLEtBQVU7UUFDekUsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM1QixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQXZSQSxBQXVSQyxDQXZSc0MsbUJBQW1COztBQUN2Qyw4Q0FBNEIsR0FBRyxrQkFBa0IsQ0FBQztBQUNsRCx5Q0FBdUIsR0FBRyxhQUFhLENBQUM7QUFDeEMsMENBQXdCLEdBQUcsZ0JBQWdCLENBQUM7QUFDNUMsNENBQTBCLEdBQUcsa0JBQWtCLENBQUM7QUFFaEQsc0NBQW9CLEdBQUcsT0FBTyxDQUFDIiwiZmlsZSI6ImNvbm5lY3Rpb24tbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=