import { Observable } from 'rxjs';
import { EnvironmentModule } from '../manifest/environment-modules';
import { ToolConditionValidator } from './tool-condition-validator';
/**
 * Defines connection type strings known by core
 * Be careful that these strings match what is defined by the manifest of @msft-sme/server-manager
 */
export var connectionTypeConstants = {
    server: 'msft.sme.connection-type.server',
    cluster: 'msft.sme.connection-type.cluster',
    hyperConvergedCluster: 'msft.sme.connection-type.hyper-converged-cluster',
    windowsClient: 'msft.sme.connection-type.windows-client',
    clusterNodesProperty: 'nodes'
};
/**
 * Connection Utility class.
 */
var ConnectionUtility = /** @class */ (function () {
    function ConnectionUtility() {
    }
    /**
     * Determines if one connection is referring to the same object as another connection
     *
     * @param a the first connection in the comparison
     * @param b the second connection in the comparison
     * @returns true if the connections are of the same type and have the same name
     */
    ConnectionUtility.areEqual = function (a, b) {
        if (!a || !b) {
            return a === b;
        }
        if (a.type !== b.type) {
            return false;
        }
        if (a.name !== b.name) {
            return false;
        }
        if (a.id !== b.id) {
            return false;
        }
        return true;
    };
    /**
     * Determines if the given connection is to a server
     *
     * @param connection the connection to check
     */
    ConnectionUtility.isServer = function (connection) {
        return connection.type === connectionTypeConstants.server;
    };
    /**
     * Determines if the given connection is to a cluster connection.
     * Currently we support: HCI and Failover Cluster.
     *
     * @param connection the connection to check
     */
    ConnectionUtility.isCluster = function (connection) {
        return connection.type === connectionTypeConstants.cluster ||
            connection.type === connectionTypeConstants.hyperConvergedCluster;
    };
    /**
     * Determines if the given connection is to a FailOver cluster
     *
     * @param connection the connection to check
     */
    ConnectionUtility.isFailoverCluster = function (connection) {
        return connection.type === connectionTypeConstants.cluster;
    };
    /**
     * Determines if the given connection is to a HCI cluster
     *
     * @param connection the connection to check
     */
    ConnectionUtility.isHyperConvergedCluster = function (connection) {
        return connection.type === connectionTypeConstants.hyperConvergedCluster;
    };
    /**
     * Determines if the given connection is to a windows client
     *
     * @param connection the connection to check
     */
    ConnectionUtility.isWindowsClient = function (connection) {
        return connection.type === connectionTypeConstants.windowsClient;
    };
    /**
     * Determines if the given connection is to a node
     *
     * @param connection the connection to check
     */
    ConnectionUtility.isNode = function (connection) {
        return this.isServer(connection) || this.isCluster(connection) || this.isWindowsClient(connection);
    };
    /**
     * Gets the name of a node from a connection. This assumes the connection is to a single server or cluster.
     *
     * @param connection the connection object. (should be of type server or cluster)
     * @param throwError throw an error if not a server or cluster.
     */
    ConnectionUtility.getNodeName = function (connection, throwError) {
        if (throwError === void 0) { throwError = false; }
        if (!this.isNode(connection)) {
            if (throwError) {
                var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ExpectedSingleNode.message;
                throw new Error(message);
            }
            return null;
        }
        return connection.name;
    };
    /**
     * Gets the name of a valid node from a connection. This assumes the connection is to a single server or cluster.
     *   if activeAlias is used return it, otherwise return connection.name
     *
     * @param connection the connection object. (should be of type server or cluster)
     * @param throwError throw an error if not a server or cluster.
     */
    ConnectionUtility.getValidNodeName = function (connection, throwError) {
        if (throwError === void 0) { throwError = false; }
        if (!this.isNode(connection)) {
            if (throwError) {
                var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ExpectedSingleNode.message;
                throw new Error(message);
            }
            return null;
        }
        if (connection.activeAlias) {
            return connection.activeAlias;
        }
        else {
            return connection.name;
        }
    };
    /**
     * Gets nodes of a connection of type cluster
     *
     * @param connection the connection object. (should be of type cluster)
     * @param throwError throw an error if not a cluster.
     */
    ConnectionUtility.getClusterNodes = function (connection, throwError) {
        if (throwError === void 0) { throwError = false; }
        if (!this.isCluster(connection)) {
            if (throwError) {
                var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ExpectedClusterNode.message;
                throw new Error(message);
            }
            return [];
        }
        return connection.properties[connectionTypeConstants.clusterNodesProperty];
    };
    /**
     * Gets the connection type info for a given connection
     *
     * @param connection the connection object.
     */
    ConnectionUtility.getConnectionTypeInfo = function (connection) {
        return EnvironmentModule.getConnectionTypeInfo(connection.type);
    };
    /**
     * creates a connection Identifier
     *
     * @param connectionType the connection type.
     * @param connectionName the connection name.
     */
    ConnectionUtility.createConnectionId = function (connectionType, connectionName) {
        return connectionType.toLocaleLowerCase() + "!" + connectionName.toLocaleLowerCase();
    };
    /**
     * Ensures tat important fields in a connection are lowercase
     * @param connection
     */
    ConnectionUtility.forceLowercase = function (connection) {
        connection.id = connection.id.toLocaleLowerCase();
        connection.name = connection.name.toLocaleLowerCase();
        connection.type = connection.type.toLocaleLowerCase();
    };
    /**
     * Ensures tat important fields in a connection are lowercase
     * @param connection
     */
    ConnectionUtility.hasTags = function (connection) {
        return connection.tags && connection.tags.length > 0;
    };
    /**
     * Create an observable to determine the collection of tools to be applicable to the connection.
     *
     * @param caches the share inventory query caches.
     * @param connection the connection object.
     * @param solution the entry point object of the solution.
     */
    ConnectionUtility.queryToolsList = function (caches, connection, solution) {
        var observables = [];
        var tools = [];
        EnvironmentModule.getEntryPointsByType(['tool'])
            .map(function (tool) {
            var item = ToolConditionValidator.current(caches).scanToolCondition(connection, solution, tool);
            if (item instanceof Observable) {
                observables.push(item);
            }
            else {
                tools.push(item);
            }
        });
        var observable = Observable.create(function (observer) {
            // respond tools that have no conditional observable.
            observer.next(tools);
            // process observable sequentially by using concat.
            var subscription = Observable.concat.apply(Observable, observables).subscribe(function (data) { return tools.push(data); }, function (error) { return observer.error(error); }, function () {
                observer.next(tools);
                observer.complete();
            });
            return function () { return subscription.unsubscribe(); };
        });
        return observable;
    };
    ConnectionUtility.getToolsList = function (connection, solution) {
        var tools = EnvironmentModule.getEntryPointsByType(['tool'])
            .filter(function (tool) { return ConnectionUtility.checkToolRequirements(connection, solution, tool); });
        // TODO, explore if we should cache this list
        return tools;
    };
    ConnectionUtility.checkToolRequirements = function (connection, solution, tool) {
        if (!tool.requirements) {
            // tool is missing requirements, never show.
            return false;
        }
        var solutionId = EnvironmentModule.createFormattedEntrypoint(solution);
        // process each tool requirement.
        for (var i = 0; i < tool.requirements.length; i++) {
            var req = tool.requirements[i];
            if (req.solutionIds
                && req.connectionTypes
                && req.solutionIds.some(function (s) { return s === solutionId; })
                && req.connectionTypes.some(function (c) { return c === connection.type; })) {
                return true;
            }
        }
        return false;
    };
    return ConnectionUtility;
}());
export { ConnectionUtility };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2VjdXJpdHkvY29ubmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBRzVDLE9BQU8sRUFFSCxpQkFBaUIsRUFHcEIsTUFBTSxpQ0FBaUMsQ0FBQztBQUV6QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQXNFcEU7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sdUJBQXVCLEdBQUc7SUFDbkMsTUFBTSxFQUFFLGlDQUFpQztJQUN6QyxPQUFPLEVBQUUsa0NBQWtDO0lBQzNDLHFCQUFxQixFQUFFLGtEQUFrRDtJQUN6RSxhQUFhLEVBQUUseUNBQXlDO0lBQ3hELG9CQUFvQixFQUFFLE9BQU87Q0FDaEMsQ0FBQztBQUVGOztHQUVHO0FBQ0g7SUFBQTtJQTBQQSxDQUFDO0lBeFBHOzs7Ozs7T0FNRztJQUNXLDBCQUFRLEdBQXRCLFVBQXVCLENBQWEsRUFBRSxDQUFhO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFF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Q0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNoRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXO21CQUNaLEdBQUcsQ0FBQyxlQUFlO21CQUNuQixHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxVQUFVLEVBQWhCLENBQWdCLENBQUM7bUJBQzNDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxJQUFJLEVBQXJCLENBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTCx3QkFBQztBQUFELENBMVBBLEFBMFBDLElBQUEiLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=