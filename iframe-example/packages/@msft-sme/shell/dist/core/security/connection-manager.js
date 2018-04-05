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
var ConnectionManager = /** @class */ (function (_super) {
    __extends(ConnectionManager, _super);
    function ConnectionManager(rpc, gatewayConnection) {
        var _this = _super.call(this, 'connection-manager', rpc) || this;
        _this.gatewayConnection = gatewayConnection;
        _this.allConnections = [];
        _this.activeConnectionIndex = -1;
        /**
         * The map of active nodes aliases list, this will be build on demand and clear up whenever any connection aliases changed
         * key: nodeName, this is unique, that means same nodeName with different connection type treat as one entry
         * value: A aliases list for this nodeName (say cluster name),
         *  this may contains child aliases (say IP address) of any alias (say server node).
         */
        _this.connectionAliasesMap = {};
        /**
         * nodeAliasesVisit map, the key is connection nodeName
         */
        _this.nodeAliasesVisitMap = {};
        /**
         * Subject that Fires once and remembers when connections have been initialized
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
     * Add or update connection.
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
     * Remove connection.
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
    ConnectionManager.prototype.updateConnectionLastCheckedTime = function (connection) {
        connection.properties = connection.properties || {};
        connection.properties['lastUpdatedTime'] = Date.now();
        return this.saveConnection(connection);
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
     * Bulk operation for saving multiple connections
     * @param connection
     */
    ConnectionManager.prototype.saveConnections = function (connections) {
        var _this = this;
        connections.forEach(function (connection) {
            ConnectionUtility.forceLowercase(connection);
            if (!connection.type || !connection.name) {
                var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ServerListFailedSave.message;
                return Observable.throw(message);
            }
            if (!connection.id) {
                connection.id = ConnectionUtility.createConnectionId(connection.type, connection.name);
            }
        });
        var forward = this.forwardExecute(0 /* Parent */, ConnectionManager.saveConnectionsMethodName, [connections]);
        if (forward) {
            return forward;
        }
        return this.gatewayConnection.put("" + ConnectionManager.gatewayConnectionApi, JSON.stringify(connections))
            .do(function (data) {
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
            if (name === ConnectionManager.saveConnectionsMethodName) {
                return this.saveConnections.apply(this, args);
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
            this.connectionsChanged.next({
                type: ConnectionChangeType.Initialized,
                connections: this.allConnections
            });
            this.connectionsInitialized.next(this.allConnections);
            return Observable.of(null);
        }
        if (name === ConnectionManager.activeConnectionPropertyName) {
            this.activeConnection = value;
            return Observable.of(null);
        }
        return this.nameNotFound(name);
    };
    /**
     * Get aliases data and save the change with connection
     * @param aliases
     * @param connection
     * @param nodeName
     */
    ConnectionManager.prototype.saveAliasesData = function (aliases, connection, nodeName) {
        var save = false;
        // save the connection if aliase info changed
        if (!this.isArraySame(aliases, connection.aliases)) {
            connection.aliases = aliases;
            // remove the activeAlias if it's not in aliases any more
            if (connection.aliases.indexOf(connection.activeAlias) === -1) {
                connection.activeAlias = null;
            }
            save = true;
        }
        // if current nodeName is not connection name save it as activeAlias
        if (connection.name !== nodeName && connection.activeAlias !== nodeName) {
            connection.activeAlias = nodeName;
            save = true;
        }
        else {
            // current nodeName is connection name, remove connection activeAlias
            if (connection.name === nodeName && !!connection.activeAlias) {
                connection.activeAlias = null;
                save = true;
            }
        }
        if (save) {
            this.saveConnection(connection);
        }
        // delete visit map entry when succeed
        this.deleteAliasesVisitList(connection.name);
    };
    /**
     * Get active alias from nodeAliasesVisit map with given nodeName
     *  return the node in aliases list in order,
     *  return null if no alias or end of list
     * @param nodeName key in nodeAliasesVisitMap
     */
    ConnectionManager.prototype.getActiveAlias = function (nodeName) {
        // aliases visit list already exists
        if (nodeName in this.nodeAliasesVisitMap) {
            var vlist = this.nodeAliasesVisitMap[nodeName];
            // move currentIndex to next
            if (++vlist.currentIndex < vlist.aliases.length) {
                return vlist.aliases[vlist.currentIndex];
            }
            else {
                // end of the list
                this.deleteAliasesVisitList(nodeName);
                return null;
            }
        }
        else {
            var aliases = this.getNodeAliasesList(nodeName);
            if (aliases) {
                var vlist = {
                    currentIndex: 0,
                    aliases: aliases
                };
                this.nodeAliasesVisitMap[nodeName] = vlist;
                // return first item, aliases[vlist.currentIndex]
                return aliases[0];
            }
            else {
                // no aliases, return null
                return null;
            }
        }
    };
    /**
     * Delete aliasesVistList entry with given nodeName from nodeAliasesVisitMap
     * @param nodeName
     */
    ConnectionManager.prototype.deleteAliasesVisitList = function (nodeName) {
        if (nodeName in this.nodeAliasesVisitMap) {
            delete this.nodeAliasesVisitMap[nodeName];
        }
    };
    ConnectionManager.prototype.isArraySame = function (array1, array2) {
        // both are not null, compare every element
        if (array1 && array2) {
            return (array1.length === array2.length) && array1.every(function (element, index) {
                return element === array2[index];
            });
        }
        else {
            // both are null
            if (!array1 && !array2) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    /**
     * Get nodeAliasesList from map; if not exists create it
     * @param nodeName name of the node, this is unique regardless connection type
     */
    ConnectionManager.prototype.getNodeAliasesList = function (nodeName) {
        if (nodeName in this.connectionAliasesMap) {
            return this.connectionAliasesMap[nodeName];
        }
        else {
            return this.buildNodeAliasesList(nodeName);
        }
    };
    /**
     * Build nodeAliasesList entry with given nodeName, then add it into the map,
     *  return the list of aliases
     * @param nodeName name of the node
     */
    ConnectionManager.prototype.buildNodeAliasesList = function (nodeName) {
        var connection = this.findConnectionWithAliases(nodeName);
        if (!connection) {
            return null;
        }
        // assume activeAlias is in aliases[]
        var aliases = [];
        if (connection.activeAlias) {
            // put activeAlias at the first of the list
            aliases.push(connection.activeAlias);
            aliases = aliases.concat(connection.aliases.filter(function (item) { return item !== connection.activeAlias; }));
        }
        else {
            aliases = connection.aliases;
        }
        for (var i = 0; i < aliases.length; i++) {
            var childList = this.buildNodeAliasesList(aliases[i]);
            // insert the childList to list, the list.length will increase
            if (childList) {
                // remove remaining items after current item
                var remainList = aliases.splice(i + 1, aliases.length - i);
                aliases = aliases.concat(childList, remainList);
                // next iteration move to node in childList
            }
        }
        this.connectionAliasesMap[nodeName] = aliases;
        return aliases;
    };
    /**
     * Finds the first connection with aliases info given a name, assume the connections already initialized
     * @param name the name of the connection to find
     */
    ConnectionManager.prototype.findConnectionWithAliases = function (name) {
        if (!name) {
            return null;
        }
        if (this.activeConnection && this.activeConnection.name === name && !!this.activeConnection.aliases) {
            return this.activeConnection;
        }
        return this.connections.find(function (c) { return c.name === name && !!(c.aliases); });
    };
    ConnectionManager.activeConnectionPropertyName = 'activeConnection';
    ConnectionManager.connectionsPropertyName = 'connections';
    ConnectionManager.saveConnectionMethodName = 'saveConnection';
    ConnectionManager.saveConnectionsMethodName = 'saveConnections';
    ConnectionManager.removeConnectionMethodName = 'removeConnection';
    ConnectionManager.gatewayConnectionApi = 'connections';
    return ConnectionManager;
}(RpcServiceForwarder));
export { ConnectionManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2VjdXJpdHkvY29ubmVjdGlvbi1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHMUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSWpELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFBYyx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQU90RixNQUFNLENBQU4sSUFBWSxvQkFLWDtBQUxELFdBQVksb0JBQW9CO0lBQzVCLDZFQUFlLENBQUE7SUFDZix5RUFBYSxDQUFBO0lBQ2IsaUVBQVMsQ0FBQTtJQUNULHFFQUFXLENBQUE7QUFDZixDQUFDLEVBTFcsb0JBQW9CLEtBQXBCLG9CQUFvQixRQUsvQjtBQTZCRDtJQUF1QyxxQ0FBbUI7SUFvQ3RELDJCQUFZLEdBQVEsRUFBVSxpQkFBb0M7UUFBbEUsWUFDSSxrQkFBTSxvQkFBb0IsRUFBRSxHQUFHLENBQUMsU0FDbkM7UUFGNkIsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQTNCMUQsb0JBQWMsR0FBaUIsRUFBRSxDQUFDO1FBQ2xDLDJCQUFxQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRW5DOzs7OztXQUtHO1FBQ0ssMEJBQW9CLEdBQWdDLEVBQUUsQ0FBQztRQUUvRDs7V0FFRztRQUNLLHlCQUFtQixHQUF3QyxFQUFFLENBQUM7UUFFdEU7O1dBRUc7UUFDSSw0QkFBc0IsR0FBRyxJQUFJLGFBQWEsQ0FBZSxDQUFDLENBQUMsQ0FBQztRQUVuRTs7O1dBR0c7UUFDSSx3QkFBa0IsR0FBRyxJQUFJLE9B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UUFDakMsQ0FBQztRQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3RDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCw4REFBOEQ7WUFDOUQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDWiw0Q0FBNEM7Z0JBQzVDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ2hELDJDQUEyQztZQUMvQyxDQUFDO1FBQ0wsQ0FBQztRQUNELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDOUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0sscURBQXlCLEdBQWpDLFVBQWtDLElBQVk7UUFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNsRyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pDLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBOWVjLDhDQUE0QixHQUFHLGtCQUFrQixDQUFDO0lBQ2xELHlDQUF1QixHQUFHLGFBQWEsQ0FBQztJQUN4QywwQ0FBd0IsR0FBRyxnQkFBZ0IsQ0FBQztJQUM1QywyQ0FBeUIsR0FBRyxpQkFBaUIsQ0FBQztJQUM5Qyw0Q0FBMEIsR0FBRyxrQkFBa0IsQ0FBQztJQUVoRCxzQ0FBb0IsR0FBRyxhQUFhLENBQUM7SUF5ZXhELHdCQUFDO0NBaGZELEFBZ2ZDLENBaGZzQyxtQkFBbUIsR0FnZnpEO1NBaGZZLGlCQUFpQiIsImZpbGUiOiJjb25uZWN0aW9uLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9