import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppContextService } from '../../../angular';
import { connectionTypeConstants, EnvironmentModule, GatewayMode } from '../../../core';
import { ShellService } from '../../shell.service';
import { RouteHelpers } from '../../utility/route-helpers';
var SolutionGuardService = /** @class */ (function () {
    /**
     * Initializes a new instance of the SolutionGuardService class.
     * @param appContextService the application context service.
     */
    function SolutionGuardService(appContextService, router, shellService) {
        this.appContextService = appContextService;
        this.router = router;
        this.shellService = shellService;
        var typeInfo = EnvironmentModule.getConnectionTypeInfo(connectionTypeConstants.windowsClient);
        this.windowsClientSolutionId = EnvironmentModule.createFormattedEntrypoint(typeInfo.solution);
    }
    /**
     * Guard against navigating to solutions that dont exist
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    SolutionGuardService.prototype.canActivate = function (route, state) {
        var _this = this;
        var params = RouteHelpers.getFullShellRoutingParameters(route);
        if (params.solution) {
            return this.shellService.inventoryCaches.gatewayCache.createObservable({})
                .take(1)
                .map(function (gateway) {
                // handle app mode routing
                if (gateway.mode === GatewayMode.App) {
                    // dont allow non windows client solution and block the connections list.
                    if (params.solutionId !== _this.windowsClientSolutionId || !params.connectionName) {
                        RouteHelpers.navigateToAppHome(_this.router, gateway);
                        return false;
                    }
                }
                if (!params.solutionFriendlyName
                    && EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(params.solutionId, 'solution', false)) {
                    // reroute to friendly version of the route
                    RouteHelpers.navigateToTool(_this.router, params);
                    return false;
                }
                return true;
            });
        }
        // TODO: navigate to solution not found page, for now go back to the root
        RouteHelpers.navigateToHome(this.router);
        return false;
    };
    SolutionGuardService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SolutionGuardService.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: Router, },
        { type: ShellService, },
    ]; };
    return SolutionGuardService;
}());
export { SolutionGuardService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3NvbHV0aW9uLWNvbnRhaW5lci9zb2x1dGlvbi1ndWFyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQzNDLE9BQU8sRUFBdUMsTUFBQSxFQUE0QixNQUFPLGlCQUFBLENBQWtCO0FBRW5HLE9BQU8sRUFBRSxpQkFBQSxFQUE4QixNQUFPLGtCQUFBLENBQW1CO0FBQ2pFLE9BQU8sRUFBYyx1QkFBQSxFQUE0QyxpQkFBQSxFQUFtQixXQUFBLEVBQVksTUFBTyxlQUFBLENBQWdCO0FBQ3ZILE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxxQkFBQSxDQUFzQjtBQUNuRCxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8sNkJBQUEsQ0FBOEI7QUFHM0Q7SUFHSTs7O09BR0c7SUFDSCw4QkFBb0IsaUJBQW9DLEVBQVUsTUFBYyxFQUFVLFlBQTBCO1FBQWhHLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDaEgsSUFBSSxRQUFRLEdBQUcsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUYsSUFBSSxDQUFDLHVCQUF1QixHQUFHLGlCQUFpQixDQUFDLHlCQUF5QixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDBDQUFXLEdBQWxCLFVBQW1CLEtBQTZCLEVBQUUsS0FBMEI7UUFBNUUsaUJBNkJDO1FBNUJHLElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUvRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQztpQkFDckUsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDUCxHQUFHLENBQUMsVUFBQSxPQUFPO2dCQUNSLDBCQUEwQjtnQkFDMUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbkMseUVBQXlFO29CQUN6RSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLEtBQUksQ0FBQyx1QkFBdUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO3dCQUMvRSxZQUFZLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFDckQsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDakIsQ0FBQztnQkFDTCxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLG9CQUFvQjt1QkFDekIsaUJBQWlCLENBQUMsa0NBQWtDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRywyQ0FBMkM7b0JBQzNDLFlBQVksQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDakQsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDakIsQ0FBQztnQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUVELHlFQUF5RTtRQUN6RSxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDRSwrQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLG1DQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztRQUMzQixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUsWUFBWSxHQUFHO0tBQ3JCLEVBSjZGLENBSTdGLENBQUM7SUFDRiwyQkFBQztDQXhERCxBQXdEQyxJQUFBO1NBeERZLG9CQUFvQiIsImZpbGUiOiJzb2x1dGlvbi1ndWFyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==