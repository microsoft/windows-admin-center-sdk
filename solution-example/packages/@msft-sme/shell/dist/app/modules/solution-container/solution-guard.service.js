import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EnvironmentModule } from '../../../core';
import { RouteHelpers } from '../../utility/route-helpers';
var SolutionGuardService = (function () {
    /**
     * Initializes a new instance of the SolutionGuardService class.
     * @param appContextService the application context service.
     */
    function SolutionGuardService(appContextService, router) {
        this.appContextService = appContextService;
        this.router = router;
    }
    /**
     * Guard against navigating to solutions that dont exist
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    SolutionGuardService.prototype.canActivate = function (route, state) {
        var params = RouteHelpers.getFullShellRoutingParameters(route);
        if (params.solution) {
            if (!params.solutionFriendlyName
                && EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(params.solutionId, 'solution', false)) {
                // reroute to friendly version of the route
                RouteHelpers.navigateToTool(this.router, params);
                return false;
            }
            return true;
        }
        // TODO: navigate to solution not found page, for now go back to the root
        RouteHelpers.navigateToHome(this.router);
        return false;
    };
    return SolutionGuardService;
}());
export { SolutionGuardService };
SolutionGuardService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SolutionGuardService.ctorParameters = function () { return [
    null,
    { type: Router, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3NvbHV0aW9uLWNvbnRhaW5lci9zb2x1dGlvbi1ndWFyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQzNDLE9BQU8sRUFBdUMsTUFBQSxFQUE0QixNQUFPLGlCQUFBLENBQWtCO0FBR25HLE9BQU8sRUFBaUMsaUJBQUEsRUFBa0IsTUFBTyxlQUFBLENBQWdCO0FBQ2pGLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyw2QkFBQSxDQUE4QjtBQUczRDtJQUVJOzs7T0FHRztJQUNILDhCQUFvQixpQkFBb0MsRUFBVSxNQUFjO1FBQTVELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUksQ0FBQztJQUVyRjs7OztPQUlHO0lBQ0ksMENBQVcsR0FBbEIsVUFBbUIsS0FBNkIsRUFBRSxLQUEwQjtRQUN4RSxJQUFJLE1BQU0sR0FBRyxZQUFZLENBQUMsNkJBQTZCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFL0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CO21CQUN6QixpQkFBaUIsQ0FBQyxrQ0FBa0MsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hHLDJDQUEyQztnQkFDM0MsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRCxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRCx5RUFBeUU7UUFDekUsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBU0wsMkJBQUM7QUFBRCxDQXRDQSxBQXNDQzs7QUFSTSwrQkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Q0FDbkIsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLG1DQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixJQUFJO0lBQ0osRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO0NBQ2YsRUFINkYsQ0FHN0YsQ0FBQyIsImZpbGUiOiJzb2x1dGlvbi1ndWFyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==