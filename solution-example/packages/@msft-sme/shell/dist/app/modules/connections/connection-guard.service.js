import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionUtility, EnvironmentModule } from '../../../core';
import { RouteHelpers } from '../../utility/route-helpers';
var ConnectionGuardService = (function () {
    /**
     * Initializes a new instance of the ConnectionGuardService class.
     * @param appContextService the application context service.
     * @param router the angular router.
     */
    function ConnectionGuardService(appContextService, router) {
        this.appContextService = appContextService;
        this.router = router;
    }
    /**
     * Gaurd against navigating until the app initialization is complete
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    ConnectionGuardService.prototype.canActivate = function (route, state) {
        var _this = this;
        var params = RouteHelpers.getFullShellRoutingParameters(route);
        if (!params.connectionType || !params.connectionName) {
            this.redirectRoute(route);
            return false;
        }
        if (!params.connectionFriendlyType && EnvironmentModule.getFriendlyUrlSegmentForConnectionType(params.connectionType, false)) {
            // reroute to friendly version of the route
            RouteHelpers.navigateToTool(this.router, params);
            return false;
        }
        // if parameters are acceptable, then search for the connection
        return this.appContextService.connectionManager
            .findConnection(params.connectionName, params.connectionType)
            .take(1)
            .map(function (connection) {
            if (!connection) {
                // if the type passed in the route does not have a provider, then redirect back to solution
                var validConnectionType = EnvironmentModule.getEntryPointsByType(['connectionProvider'])
                    .some(function (cp) { return cp.connectionType === params.connectionType; });
                if (!validConnectionType) {
                    _this.redirectRoute(route);
                    return false;
                }
                // otherwise, create a default connection
                connection = {
                    id: ConnectionUtility.createConnectionId(params.connectionType, params.connectionName),
                    name: params.connectionName,
                    type: params.connectionType
                };
            }
            _this.appContextService.activeConnection.value = connection;
            return true;
        });
    };
    /**
     * Determines and activates the best redirect route
     * @param route the current route snapshot
     */
    ConnectionGuardService.prototype.redirectRoute = function (route) {
        // TODO: navigate to connection 404, for now go to the solutions connections pages
        var params = RouteHelpers.getFullShellRoutingParameters(route);
        if (params.solution) {
            RouteHelpers.navigateToConnections(this.router, params.solution);
        }
        else {
            // if something really went wrong, navigate to home
            RouteHelpers.navigateToHome(this.router);
        }
    };
    return ConnectionGuardService;
}());
export { ConnectionGuardService };
ConnectionGuardService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ConnectionGuardService.ctorParameters = function () { return [
    null,
    { type: Router, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Nvbm5lY3Rpb25zL2Nvbm5lY3Rpb24tZ3VhcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQXVDLE1BQUEsRUFBNEIsTUFBTyxpQkFBQSxDQUFrQjtBQUduRyxPQUFPLEVBQWMsaUJBQUEsRUFBbUIsaUJBQUEsRUFBa0IsTUFBTyxlQUFBLENBQWdCO0FBQ2pGLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyw2QkFBQSxDQUE4QjtBQUczRDtJQUVJOzs7O09BSUc7SUFDSCxnQ0FBb0IsaUJBQW9DLEVBQVUsTUFBYztRQUE1RCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFJLENBQUM7SUFFckY7Ozs7T0FJRztJQUNJLDRDQUFXLEdBQWxCLFVBQW1CLEtBQTZCLEVBQUUsS0FBMEI7UUFBNUUsaUJBcUNDO1FBcENHLElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHNCQUFzQixJQUFJLGlCQUFpQixDQUFDLHNDQUFzQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNILDJDQUEyQztZQUMzQyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDakQsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQsK0RBQStEO1FBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCO2FBQzFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUM7YUFFNUQsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNQLEdBQUcsQ0FBQyxVQUFBLFVBQVU7WUFDWCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsMkZBQTJGO2dCQUMzRixJQUFJLG1CQUFtQixHQUFHLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQztxQkFDbkYsSUFBSSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLGNBQWMsS0FBSyxNQUFNLENBQUMsY0FBYyxFQUEzQyxDQUEyQyxDQUFDLENBQUM7Z0JBQzdELEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO29CQUN2QixLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNqQixDQUFDO2dCQUNELHlDQUF5QztnQkFDekMsVUFBVSxHQUFHO29CQUNULEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUM7b0JBQ3RGLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYztvQkFDM0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjO2lCQUM5QixDQUFDO1lBQ04sQ0FBQztZQUNELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1lBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssOENBQWEsR0FBckIsVUFBc0IsS0FBNkI7UUFDL0Msa0ZBQWtGO1FBQ2xGLElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixZQUFZLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osbURBQW1EO1lBQ25ELFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDTCxDQUFDO0lBU0wsNkJBQUM7QUFBRCxDQTNFQSxBQTJFQzs7QUFSTSxpQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Q0FDbkIsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHFDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixJQUFJO0lBQ0osRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO0NBQ2YsRUFINkYsQ0FHN0YsQ0FBQyIsImZpbGUiOiJjb25uZWN0aW9uLWd1YXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9