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
var ToolsGuardBaseService = (function () {
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
var ToolGuardService = (function (_super) {
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
    return ToolGuardService;
}(ToolsGuardBaseService));
export { ToolGuardService };
ToolGuardService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ToolGuardService.ctorParameters = function () { return [
    { type: Router, },
]; };
var MultiToolGuardService = (function (_super) {
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
    return MultiToolGuardService;
}(ToolsGuardBaseService));
export { MultiToolGuardService };
MultiToolGuardService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MultiToolGuardService.ctorParameters = function () { return [
    { type: Router, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3Rvb2xzL3Rvb2xzLWd1YXJkLWJhc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFPLGVBQUEsQ0FBZ0I7QUFDM0MsT0FBTyxFQUFzRCxNQUFBLEVBQTRCLE1BQU8saUJBQUEsQ0FBa0I7QUFFbEgsT0FBTyxFQUFpQyxpQkFBQSxFQUErQyxNQUFPLGVBQUEsQ0FBZ0I7QUFDOUcsT0FBTyxFQUFFLFlBQUEsRUFBcUMsTUFBTyw2QkFBQSxDQUE4QjtBQWNuRjtJQUVJOzs7T0FHRztJQUNILCtCQUFzQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFJLENBQUM7SUFFekM7Ozs7T0FJRztJQUNJLDJDQUFXLEdBQWxCLFVBQW1CLEtBQTZCLEVBQUUsS0FBMEI7UUFDeEUsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRS9ELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNO21CQUNWLENBQUMsTUFBTSxDQUFDLGdCQUFnQjttQkFDeEIsaUJBQWlCLENBQUMsa0NBQWtDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUN4RixDQUFDLENBQUMsQ0FBQztnQkFDQywyQ0FBMkM7Z0JBQzNDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDakQsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFRCwwQ0FBMEM7UUFDMUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLDZDQUFhLEdBQXBCLFVBQ0ksU0FBWSxFQUNaLFlBQW9DLEVBQ3BDLFlBQWlDLEVBQ2pDLFNBQStCO1FBQy9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ25ILENBQUM7SUFhTCw0QkFBQztBQUFELENBNURBLEFBNERDLElBQUE7O0FBR0Q7SUFBc0Msb0NBQW9DO0lBRXRFOzs7T0FHRztJQUNILDBCQUFZLE1BQWM7ZUFBSSxrQkFBTSxNQUFNLENBQUM7SUFBRSxDQUFDO0lBRTlDOzs7OztPQUtHO0lBQ08saURBQXNCLEdBQWhDLFVBQ0ksS0FBNkIsRUFDN0IsS0FBMEIsRUFDMUIsTUFBOEI7UUFFOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN6RCwrRkFBK0Y7WUFDL0YsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN2RCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFRTCx1QkFBQztBQUFELENBakNBLEFBaUNDLENBakNxQyxxQkFBcUI7O0FBMEJwRCwyQkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Q0FDbkIsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLCtCQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7Q0FDZixFQUY2RixDQUU3RixDQUFDO0FBSUY7SUFBMkMseUNBQXlDO0lBRWhGOzs7T0FHRztJQUNILCtCQUFZLE1BQWM7ZUFBSSxrQkFBTSxNQUFNLENBQUM7SUFBRSxDQUFDO0lBRTlDOzs7OztPQUtHO0lBQ08sc0RBQXNCLEdBQWhDLFVBQ0ksS0FBNkIsRUFDN0IsS0FBMEIsRUFDMUIsTUFBOEI7UUFFOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0Qsd0ZBQXdGO1lBQ3hGLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBUUwsNEJBQUM7QUFBRCxDQWpDQSxBQWlDQyxDQWpDMEMscUJBQXFCOztBQTBCekQsZ0NBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0NBQ25CLENBQUM7QUFDRixrQkFBa0I7QUFDWCxvQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO0NBQ2YsRUFGNkYsQ0FFN0YsQ0FBQyIsImZpbGUiOiJ0b29scy1ndWFyZC1iYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9