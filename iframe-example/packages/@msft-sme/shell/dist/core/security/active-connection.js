import { EnvironmentModule } from '../manifest/environment-modules';
import { ConnectionUtility } from './connection';
/**
 * Provides a shortcut to accessing common information about the active connection.
 */
var ActiveConnection = /** @class */ (function () {
    /**
     * Constructor for the active connection class
     */
    function ActiveConnection(connectionManager, cimConnection, powerShellConnection, fileTransfer) {
        this.connectionManager = connectionManager;
        this.cimConnection = cimConnection;
        this.powerShellConnection = powerShellConnection;
        this.fileTransfer = fileTransfer;
        /**
         * map data of connection type information.
         */
        this.map = null;
    }
    Object.defineProperty(ActiveConnection.prototype, "value", {
        /**
         * Gets the active connection
         */
        get: function () {
            return this.connectionManager.activeConnection;
        },
        /**
         * Sets the active connection
         */
        set: function (value) {
            this.connectionManager.activeConnection = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActiveConnection.prototype, "isServer", {
        /**
         * Indicates if the active connection is to a server
         */
        get: function () {
            return ConnectionUtility.isServer(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActiveConnection.prototype, "isCluster", {
        /**
         * Indicates if the active connection is to a cluster
         */
        get: function () {
            return ConnectionUtility.isCluster(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActiveConnection.prototype, "isNode", {
        /**
         * Indicates if the active connection is to a node (cluster or server)
         */
        get: function () {
            return ConnectionUtility.isNode(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActiveConnection.prototype, "isFailoverCluster", {
        /**
         * Indicates if the active connection is to a failover cluster
         */
        get: function () {
            return ConnectionUtility.isFailoverCluster(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActiveConnection.prototype, "isHyperConvergedCluster", {
        /**
         * Indicates if the active connection is to a hyper converged cluster
         */
        get: function () {
            return ConnectionUtility.isHyperConvergedCluster(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActiveConnection.prototype, "isWindowsClient", {
        /**
         * Indicates if the active connection is to a windows client
         */
        get: function () {
            return ConnectionUtility.isWindowsClient(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActiveConnection.prototype, "clusterNodes", {
        /**
         * If the active connection is a cluster, the cluster node names. Otherwise, an empty array
         */
        get: function () {
            return ConnectionUtility.getClusterNodes(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActiveConnection.prototype, "nodeName", {
        /**
         * If the active connection is a node (cluster or server), the node name. Otherwise, null.
         */
        get: function () {
            return ConnectionUtility.getNodeName(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActiveConnection.prototype, "validNodeName", {
        /**
         * If the active connection is a node (cluster or server), the valid node name (may be alias). Otherwise, null.
         */
        get: function () {
            return ConnectionUtility.getValidNodeName(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActiveConnection.prototype, "connectionTypeInfo", {
        /**
         * Gets the connection type info for the active connection
         */
        get: function () {
            if (!this.map) {
                // create once.
                this.map = EnvironmentModule.getConnectionMap();
            }
            return this.value ? this.map[this.value.type] : null;
        },
        enumerable: true,
        configurable: true
    });
    return ActiveConnection;
}());
export { ActiveConnection };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2VjdXJpdHkvYWN0aXZlLWNvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQyxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25HLE9BQU8sRUFBYyxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQU83RDs7R0FFRztBQUNIO0lBK0ZJOztPQUVHO0lBQ0gsMEJBQ1ksaUJBQW9DLEVBQ3BDLGFBQTRCLEVBQzVCLG9CQUEwQyxFQUMxQyxZQUEwQjtRQUgxQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFyR3RDOztXQUVHO1FBQ0ssUUFBRyxHQUFzRCxJQUFJLENBQUM7SUFvR3RFLENBQUM7SUEvRkQsc0JBQVcsbUNBQUs7UUFIaEI7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7UUFDbkQsQ0FBQztRQUVEOztXQUVHO2FBQ0gsVUFBaUIsS0FBaUI7WUFDOUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUNwRCxDQUFDOzs7T0FQQTtJQVlELHNCQUFXLHNDQUFRO1FBSG5COztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLHVDQUFTO1FBSHBCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRCxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLG9DQUFNO1FBSGpCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLCtDQUFpQjtRQUg1Qjs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRCxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLHFEQUF1QjtRQUhsQzs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLDZDQUFlO1FBSDFCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RCxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLDBDQUFZO1FBSHZCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RCxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLHNDQUFRO1FBSG5COztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLDJDQUFhO1FBSHhCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELENBQUM7OztPQUFBO0lBS0Qsc0JBQVcsZ0RBQWtCO1FBSDdCOztXQUVHO2FBQ0g7WUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNaLGVBQWU7Z0JBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3BELENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDekQsQ0FBQzs7O09BQUE7SUFZTCx1QkFBQztBQUFELENBekdBLEFBeUdDLElBQUEiLCJmaWxlIjoiYWN0aXZlLWNvbm5lY3Rpb24uanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9