import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppContextService } from '../../../angular';
import { EnvironmentModule } from '../../../core';
import { RouteHelpers } from '../../utility/route-helpers';
var DefaultToolGuardService = /** @class */ (function () {
    /**
     * Initializes a new instance of the DefaultToolGuardService class.
     * @param appContextService the application context service.
     * @param router the angular router.
     */
    function DefaultToolGuardService(appContextService, router) {
        this.appContextService = appContextService;
        this.router = router;
    }
    /**
     * Guard against navigating to the tools page without a tool specified. Always redirects to the default or first tool
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    DefaultToolGuardService.prototype.canActivate = function (route, state) {
        var _this = this;
        var params = RouteHelpers.getFullShellRoutingParameters(route);
        if (!params.solution) {
            // something is seriously wrong
            RouteHelpers.navigateToHome(this.router);
            return false;
        }
        return this.appContextService.connectionManager.connectionsInitialized
            .take(1)
            .map(function () {
            var tools = RouteHelpers.getToolsListFromShellParametersSimple(_this.appContextService, params);
            var startedWithNoTool = !params.toolId;
            if (params.tool) {
                // we resolved a tool, but is it acceptable in the current context?
                var toolIsValid = tools.some(function (tool) { return EnvironmentModule.createFormattedEntrypoint(tool) === params.toolId; });
                if (toolIsValid) {
                    // everything is fine, return true
                    return true;
                }
                // we are not fine, so clear the tool info from parameters and process below
                params.tool = null;
                params.toolId = null;
            }
            if (params.solution.tools.defaultTool) {
                params.toolId = params.solution.parentModule.name + "!" + params.solution.tools.defaultTool;
            }
            else {
                // there is no default tool, so redirect to the first tool
                var tool = tools.first();
                if (tool) {
                    // we have at least one tool, use it for navigation
                    params.toolId = EnvironmentModule.createFormattedEntrypoint(tool);
                }
            }
            // if we started with no tool, and still have no tool. just show blank screen. TODO: What else can we do here?
            if (startedWithNoTool && !params.toolId) {
                // log message about no tools
                return true;
            }
            // navigate to the new tool and cancel previous navigation
            RouteHelpers.navigateToTool(_this.router, params, true);
            return false;
        });
    };
    DefaultToolGuardService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DefaultToolGuardService.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: Router, },
    ]; };
    return DefaultToolGuardService;
}());
export { DefaultToolGuardService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3Rvb2xzL2RlZmF1bHQtdG9vbC1ndWFyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQzNDLE9BQU8sRUFBdUMsTUFBQSxFQUE0QixNQUFPLGlCQUFBLENBQWtCO0FBR25HLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLGtCQUFBLENBQW1CO0FBQ3JELE9BQU8sRUFBRSxpQkFBQSxFQUErQyxNQUFPLGVBQUEsQ0FBZ0I7QUFDL0UsT0FBTyxFQUFFLFlBQUEsRUFBcUMsTUFBTyw2QkFBQSxDQUE4QjtBQUduRjtJQUVJOzs7O09BSUc7SUFDSCxpQ0FBb0IsaUJBQW9DLEVBQVUsTUFBYztRQUE1RCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFJLENBQUM7SUFFckY7Ozs7T0FJRztJQUNJLDZDQUFXLEdBQWxCLFVBQW1CLEtBQTZCLEVBQUUsS0FBMEI7UUFBNUUsaUJBZ0RDO1FBL0NHLElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ25CLCtCQUErQjtZQUMvQixZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLHNCQUFzQjthQUNqRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ1AsR0FBRyxDQUFDO1lBQ0QsSUFBSSxLQUFLLEdBQUcsWUFBWSxDQUFDLHFDQUFxQyxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMvRixJQUFJLGlCQUFpQixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUV2QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZCxtRUFBbUU7Z0JBQ25FLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxpQkFBaUIsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxNQUFNLENBQUMsTUFBTSxFQUFuRSxDQUFtRSxDQUFDLENBQUM7Z0JBQzFHLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ2Qsa0NBQWtDO29CQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELDRFQUE0RTtnQkFDNUUsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLENBQUMsTUFBTSxHQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksU0FBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFhLENBQUM7WUFDaEcsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLDBEQUEwRDtnQkFDMUQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNQLG1EQUFtRDtvQkFDbkQsTUFBTSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEUsQ0FBQztZQUNMLENBQUM7WUFFRCw4R0FBOEc7WUFDOUcsRUFBRSxDQUFDLENBQUMsaUJBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsNkJBQTZCO2dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFFRCwwREFBMEQ7WUFDMUQsWUFBWSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN2RCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNFLGtDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsc0NBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO1FBQzNCLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztLQUNmLEVBSDZGLENBRzdGLENBQUM7SUFDRiw4QkFBQztDQXZFRCxBQXVFQyxJQUFBO1NBdkVZLHVCQUF1QiIsImZpbGUiOiJkZWZhdWx0LXRvb2wtZ3VhcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=