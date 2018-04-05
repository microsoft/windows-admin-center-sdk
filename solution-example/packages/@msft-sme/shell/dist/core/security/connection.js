import { EnvironmentModule } from '../manifest/environment-modules';
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
var ConnectionUtility = (function () {
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
                // if there are no attribute requirements. Then we have come far enough.
                if (!req.attributes) {
                    return true;
                }
                // TODO: process attribute requirements
            }
        }
        return false;
    };
    return ConnectionUtility;
}());
export { ConnectionUtility };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2VjdXJpdHkvY29ubmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQWlDLGlCQUFpQixFQUErQixNQUFNLGlDQUFpQyxDQUFDO0FBNERoSTs7O0dBR0c7QUFDSCxNQUFNLENBQUMsSUFBTSx1QkFBdUIsR0FBRztJQUNuQyxNQUFNLEVBQUUsaUNBQWlDO0lBQ3pDLE9BQU8sRUFBRSxrQ0FBa0M7SUFDM0MscUJBQXFCLEVBQUUsa0RBQWtEO0lBQ3pFLGFBQWEsRUFBRSx5Q0FBeUM7SUFDeEQsb0JBQW9CLEVBQUUsT0FBTztDQUNoQyxDQUFDO0FBRUY7O0dBRUc7QUFDSDtJQUFBO0lBcUxBLENBQUM7SUFuTEc7Ozs7OztPQU1HO0lBQ1csMEJBQVEsR0FBdEIsVUFBdUIsQ0FBYSxFQUFFLENBQWE7UUFDL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDVywwQkFBUSxHQUF0QixVQUF1QixVQUFzQjtRQUN6QyxNQUFN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QUFDO1lBQ2hELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVc7bUJBQ1osR0FBRyxDQUFDLGVBQWU7bUJBQ25CLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLFVBQVUsRUFBaEIsQ0FBZ0IsQ0FBQzttQkFDM0MsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssVUFBVSxDQUFDLElBQUksRUFBckIsQ0FBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsd0VBQXdFO2dCQUN4RSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELHVDQUF1QztZQUMzQyxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FyTEEsQUFxTEMsSUFBQSIsImZpbGUiOiJjb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==