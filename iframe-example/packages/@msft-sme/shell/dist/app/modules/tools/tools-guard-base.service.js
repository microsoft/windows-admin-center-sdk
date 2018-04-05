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
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EnvironmentModule } from '../../../core';
import { RouteHelpers } from '../../utility/route-helpers';
var ToolsGuardBaseService = /** @class */ (function () {
    /**
     * Initializes a new instance of the ToolsGuardBaseService class.
     * @param router the angular router
     */
    function ToolsGuardBaseService(router) {
        this.router = router;
    }
    /**
     * Guard against navigating to a tool route that is not supported by the current solution
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    ToolsGuardBaseService.prototype.canActivate = function (route, state) {
        var params = RouteHelpers.getFullShellRoutingParameters(route);
        if (params.solution) {
            if (params.toolId
                && !params.toolFriendlyName
                && EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(params.toolId, 'tool', false)) {
                // reroute to friendly version of the route
                RouteHelpers.navigateToTool(this.router, params);
                return false;
            }
            return this.canActivateForSolution(route, state, params);
        }
        // if something really went wrong, go home
        RouteHelpers.navigateToHome(this.router);
        return false;
    };
    /**
     * Guard against going away from current tool.
     *
     * @param component The component object.
     * @param currentRoute The current route object.
     * @param currentState The current state.
     * @param nextState The next state.
     */
    ToolsGuardBaseService.prototype.canDeactivate = function (component, currentRoute, currentState, nextState) {
        return component.canDeactivateTool ? component.canDeactivateTool(currentRoute, currentState, nextState) : true;
    };
    return ToolsGuardBaseService;
}());
export { ToolsGuardBaseService };
var ToolGuardService = /** @class */ (function (_super) {
    __extends(ToolGuardService, _super);
    /**
     * Initializes a new instance of the ToolGuardService class.
     * @param router the angular router
     */
    function ToolGuardService(router) {
        return _super.call(this, router) || this;
    }
    /**
     * Guard against navigating to a single tool page unless supported by the solution
     * @param route the current route snapshot
     * @param state the current router state snapshot
     * @param entryPoint the current solutions entryPoint
     */
    ToolGuardService.prototype.canActivateForSolution = function (route, state, params) {
        if (params.solution.tools && params.solution.tools.enabled) {
            // if the solution specifies a multitool interface, then return false after navigating to tools
            RouteHelpers.navigateToTool(this.router, params, true);
            return false;
        }
        return true;
    };
    ToolGuardService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ToolGuardService.ctorParameters = function () { return [
        { type: Router, },
    ]; };
    return ToolGuardService;
}(ToolsGuardBaseService));
export { ToolGuardService };
var MultiToolGuardService = /** @class */ (function (_super) {
    __extends(MultiToolGuardService, _super);
    /**
     * Initializes a new instance of the MultiToolGuardService class.
     * @param router the angular router
     */
    function MultiToolGuardService(router) {
        return _super.call(this, router) || this;
    }
    /**
     * Guard against navigating to a multi tool page unless supported by the solution
     * @param route the current route snapshot
     * @param state the current router state snapshot
     * @param entryPoint the current solutions entryPoint
     */
    MultiToolGuardService.prototype.canActivateForSolution = function (route, state, params) {
        if (!params.solution.tools || !params.solution.tools.enabled) {
            // if the solution specifies a single tool interface, then return false after navigating
            RouteHelpers.navigateToTool(this.router, params, false);
            return false;
        }
        return true;
    };
    MultiToolGuardService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MultiToolGuardService.ctorParameters = function () { return [
        { type: Router, },
    ]; };
    return MultiToolGuardService;
}(ToolsGuardBaseService));
export { MultiToolGuardService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3Rvb2xzL3Rvb2xzLWd1YXJkLWJhc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFPLGVBQUEsQ0FBZ0I7QUFDM0MsT0FBTyxFQUFzRCxNQUFBLEVBQTRCLE1BQU8saUJBQUEsQ0FBa0I7QUFFbEgsT0FBTyxFQUFpQyxpQkFBQSxFQUErQyxNQUFPLGVBQUEsQ0FBZ0I7QUFDOUcsT0FBTyxFQUFFLFlBQUEsRUFBcUMsTUFBTyw2QkFBQSxDQUE4QjtBQWNuRjtJQUVJOzs7T0FHRztJQUNILCtCQUFzQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFJLENBQUM7SUFFekM7Ozs7T0FJRztJQUNJLDJDQUFXLEdBQWxCLFVBQW1CLEtBQTZCLEVBQUUsS0FBMEI7UUFDeEUsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRS9ELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNO21CQUNWLENBQUMsTUFBTSxDQUFDLGdCQUFnQjttQkFDeEIsaUJBQWlCLENBQUMsa0NBQWtDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUN4RixDQUFDLENBQUMsQ0FBQztnQkFDQywyQ0FBMkM7Z0JBQzNDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDakQsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFRCwwQ0FBMEM7UUFDMUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLDZDQUFhLEdBQXBCLFVBQ0ksU0FBWSxFQUNaLFlBQW9DLEVBQ3BDLFlBQWlDLEVBQ2pDLFNBQStCO1FBQy9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbkgsQ0FBQztJQWFMLDRCQUFDO0FBQUQsQ0E1REEsQUE0REMsSUFBQTs7QUFHRDtJQUFzQyxvQ0FBb0M7SUFFdEU7OztPQUdHO0lBQ0gsMEJBQVksTUFBYztlQUFJLGtCQUFNLE1BQU0sQ0FBQztJQUFFLENBQUM7SUFFOUM7Ozs7O09BS0c7SUFDTyxpREFBc0IsR0FBaEMsVUFDSSxLQUE2QixFQUM3QixLQUEwQixFQUMxQixNQUE4QjtRQUU5QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3pELCtGQUErRjtZQUMvRixZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNFLDJCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsK0JBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztLQUNmLEVBRjZGLENBRTdGLENBQUM7SUFDRix1QkFBQztDQWpDRCxBQWlDQyxDQWpDcUMscUJBQXFCLEdBaUMxRDtTQWpDWSxnQkFBZ0I7QUFvQzdCO0lBQTJDLHlDQUF5QztJQUVoRjs7O09BR0c7SUFDSCwrQkFBWSxNQUFjO2VBQUksa0JBQU0sTUFBTSxDQUFDO0lBQUUsQ0FBQztJQUU5Qzs7Ozs7T0FLRztJQUNPLHNEQUFzQixHQUFoQyxVQUNJLEtBQTZCLEVBQzdCLEtBQTBCLEVBQzFCLE1BQThCO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNELHdGQUF3RjtZQUN4RixZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNFLGdDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsb0NBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztLQUNmLEVBRjZGLENBRTdGLENBQUM7SUFDRiw0QkFBQztDQWpDRCxBQWlDQyxDQWpDMEMscUJBQXFCLEdBaUMvRDtTQWpDWSxxQkFBcUIiLCJmaWxlIjoidG9vbHMtZ3VhcmQtYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==