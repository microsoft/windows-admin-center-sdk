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
import { ServerInventory } from '../server-inventory/server-inventory';
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
var ClusterNodeInventory = /** @class */ (function (_super) {
    __extends(ClusterNodeInventory, _super);
    function ClusterNodeInventory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ClusterNodeInventory;
}(ServerInventory));
export { ClusterNodeInventory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL2NsdXN0ZXItaW52ZW50b3J5L2NsdXN0ZXItbm9kZS1pbnZlbnRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RTs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLGdCQU1YO0FBTkQsV0FBWSxnQkFBZ0I7SUFDeEIsOERBQVksQ0FBQTtJQUNaLG1EQUFNLENBQUE7SUFDTix1REFBUSxDQUFBO0lBQ1IsMkRBQVUsQ0FBQTtJQUNWLDZEQUFXLENBQUE7QUFDZixDQUFDLEVBTlcsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQU0zQjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksc0JBTVg7QUFORCxXQUFZLHNCQUFzQjtJQUM5QiwwRUFBWSxDQUFBO0lBQ1osbUZBQWdCLENBQUE7SUFDaEIsK0VBQWMsQ0FBQTtJQUNkLDZFQUFhLENBQUE7SUFDYix1RUFBVSxDQUFBO0FBQ2QsQ0FBQyxFQU5XLHNCQUFzQixLQUF0QixzQkFBc0IsUUFNakM7QUFBQSxDQUFDO0FBRUY7SUFBMEMsd0NBQWU7SUFBekQ7O0lBeUJBLENBQUM7SUFBRCwyQkFBQztBQUFELENBekJBLEFBeUJDLENBekJ5QyxlQUFlLEdBeUJ4RCIsImZpbGUiOiJjbHVzdGVyLW5vZGUtaW52ZW50b3J5LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==