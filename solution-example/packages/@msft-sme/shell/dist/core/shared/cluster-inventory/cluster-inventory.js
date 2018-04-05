/**
 * Represents the state of a failover cluster node.
 */
export var ClusterNodeState;
(function (ClusterNodeState) {
    ClusterNodeState[ClusterNodeState["Unknown"] = -1] = "Unknown";
    ClusterNodeState[ClusterNodeState["Up"] = 0] = "Up";
    ClusterNodeState[ClusterNodeState["Down"] = 1] = "Down";
    ClusterNodeState[ClusterNodeState["Paused"] = 2] = "Paused";
    ClusterNodeState[ClusterNodeState["Joining"] = 3] = "Joining";
})(ClusterNodeState || (ClusterNodeState = {}));
/**
 * Represents the Drain Status of a failover cluster node.
 */
export var ClusterNodeDrainStatus;
(function (ClusterNodeDrainStatus) {
    ClusterNodeDrainStatus[ClusterNodeDrainStatus["Unknown"] = -1] = "Unknown";
    ClusterNodeDrainStatus[ClusterNodeDrainStatus["NotInitiated"] = 0] = "NotInitiated";
    ClusterNodeDrainStatus[ClusterNodeDrainStatus["InProgress"] = 1] = "InProgress";
    ClusterNodeDrainStatus[ClusterNodeDrainStatus["Completed"] = 2] = "Completed";
    ClusterNodeDrainStatus[ClusterNodeDrainStatus["Failed"] = 3] = "Failed";
})(ClusterNodeDrainStatus || (ClusterNodeDrainStatus = {}));
;
/**
 * Cluster Inventory class.
 */
var ClusterInventory = (function () {
    /**
     * Initializes a new instance of the ServerInventory Class.
     *
     * @param clusterName the server name to query.
     * @param data the server inventory recovered data.
     */
    function ClusterInventory(clusterName, data) {
        this.clusterName = clusterName;
        if (data) {
            Object.assign(this, data);
        }
    }
    return ClusterInventory;
}());
export { ClusterInventory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL2NsdXN0ZXItaW52ZW50b3J5L2NsdXN0ZXItaW52ZW50b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlCQTs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLGdCQU1YO0FBTkQsV0FBWSxnQkFBZ0I7SUFDeEIsOERBQVksQ0FBQTtJQUNaLG1EQUFNLENBQUE7SUFDTix1REFBUSxDQUFBO0lBQ1IsMkRBQVUsQ0FBQTtJQUNWLDZEQUFXLENBQUE7QUFDZixDQUFDLEVBTlcsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQU0zQjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksc0JBTVg7QUFORCxXQUFZLHNCQUFzQjtJQUM5QiwwRUFBWSxDQUFBO0lBQ1osbUZBQWdCLENBQUE7SUFDaEIsK0VBQWMsQ0FBQTtJQUNkLDZFQUFhLENBQUE7SUFDYix1RUFBVSxDQUFBO0FBQ2QsQ0FBQyxFQU5XLHNCQUFzQixLQUF0QixzQkFBc0IsUUFNakM7QUFBQSxDQUFDO0FBK0NGOztHQUVHO0FBQ0g7SUEwQkk7Ozs7O09BS0c7SUFDSCwwQkFBbUIsV0FBbUIsRUFBRSxJQUEyQjtRQUFoRCxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNsQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO0lBQzVDLENBQUM7SUFDTCx1QkFBQztBQUFELENBbkNBLEFBbUNDLElBQUEiLCJmaWxlIjoiY2x1c3Rlci1pbnZlbnRvcnkuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9