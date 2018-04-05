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
import { RouteHelpers } from '../../utility/route-helpers';
var SolutionRootGuardBaseService = (function () {
    /**
     * Initializes a new instance of the SolutionRootGuardBaseService class.
     * @param router the angular router
     */
    function SolutionRootGuardBaseService(router) {
        this.router = router;
    }
    /**
     * Guard against navigating to a root solution route that is not supported by the solution
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    SolutionRootGuardBaseService.prototype.canActivate = function (route, state) {
        var params = RouteHelpers.getFullShellRoutingParameters(route);
        if (params.solution) {
            return this.canActivateSolution(route, state, params.solution);
        }
        // if something really went wrong, go home
        RouteHelpers.navigateToHome(this.router);
        return false;
    };
    return SolutionRootGuardBaseService;
}());
export { SolutionRootGuardBaseService };
var SolutionRootConnectionsGuardService = (function (_super) {
    __extends(SolutionRootConnectionsGuardService, _super);
    /**
     * Initializes a new instance of the SolutionRootConnectionsGuardService class.
     * @param router the angular router
     */
    function SolutionRootConnectionsGuardService(router) {
        return _super.call(this, router) || this;
    }
    /**
     * Guard against navigating to solution route unless supported by the solution
     * @param route the current route snapshot
     * @param state the current router state snapshot
     * @param entryPoint the current solutions entryPoint
     */
    SolutionRootConnectionsGuardService.prototype.canActivateSolution = function (route, state, entryPoint) {
        if (entryPoint.rootNavigationBehavior !== 'connections') {
            if (entryPoint.rootNavigationBehavior === 'path') {
                // if path navigation behaviour is correct, then redirect to the solution root
                RouteHelpers.navigateToSolution(this.router, entryPoint);
            }
            else {
                // rootNavigationBahaviour is invalid, navigate to home
                RouteHelpers.navigateToHome(this.router);
            }
            return false;
        }
        return true;
    };
    return SolutionRootConnectionsGuardService;
}(SolutionRootGuardBaseService));
export { SolutionRootConnectionsGuardService };
SolutionRootConnectionsGuardService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SolutionRootConnectionsGuardService.ctorParameters = function () { return [
    { type: Router, },
]; };
var SolutionRootPathGuardService = (function (_super) {
    __extends(SolutionRootPathGuardService, _super);
    /**
     * Initializes a new instance of the SolutionRootPathGuardService class.
     * @param router the angular router
     */
    function SolutionRootPathGuardService(router) {
        return _super.call(this, router) || this;
    }
    /**
     * Guard against navigating to solution root route unless supported by the solution
     * @param route the current route snapshot
     * @param state the current router state snapshot
     * @param entryPoint the current solutions entryPoint
     */
    SolutionRootPathGuardService.prototype.canActivateSolution = function (route, state, entryPoint) {
        if (entryPoint.rootNavigationBehavior !== 'path') {
            if (entryPoint.rootNavigationBehavior === 'connections') {
                // if connections navigation behaviour is correct, then redirect to solution connections
                RouteHelpers.navigateToConnections(this.router, entryPoint);
            }
            else {
                // rootNavigationBahaviour is invalid, navigate to home
                RouteHelpers.navigateToSolution(this.router, entryPoint);
            }
            return false;
        }
        return true;
    };
    return SolutionRootPathGuardService;
}(SolutionRootGuardBaseService));
export { SolutionRootPathGuardService };
SolutionRootPathGuardService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SolutionRootPathGuardService.ctorParameters = function () { return [
    { type: Router, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3NvbHV0aW9uLWNvbnRhaW5lci9zb2x1dGlvbi1yb290LWd1YXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQzNDLE9BQU8sRUFBdUMsTUFBQSxFQUE0QixNQUFPLGlCQUFBLENBQWtCO0FBR25HLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyw2QkFBQSxDQUE4QjtBQUUzRDtJQUVJOzs7T0FHRztJQUNILHNDQUFzQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFJLENBQUM7SUFFekM7Ozs7T0FJRztJQUNJLGtEQUFXLEdBQWxCLFVBQW1CLEtBQTZCLEVBQUUsS0FBMEI7UUFDeEUsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRS9ELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUVELDBDQUEwQztRQUMxQyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFhTCxtQ0FBQztBQUFELENBcENBLEFBb0NDLElBQUE7O0FBR0Q7SUFBeUQsdURBQTRCO0lBRWpGOzs7T0FHRztJQUNILDZDQUFZLE1BQWM7ZUFBSSxrQkFBTSxNQUFNLENBQUM7SUFBRSxDQUFDO0lBRTlDOzs7OztPQUtHO0lBQ08saUVBQW1CLEdBQTdCLFVBQ0ksS0FBNkIsRUFDN0IsS0FBMEIsRUFDMUIsVUFBdUM7UUFFdkMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLHNCQUFzQixLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDdEQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLHNCQUFzQixLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLDhFQUE4RTtnQkFDOUUsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDN0QsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLHVEQUF1RDtnQkFDdkQsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQVFMLDBDQUFDO0FBQUQsQ0F0Q0EsQUFzQ0MsQ0F0Q3dELDRCQUE0Qjs7QUErQjlFLDhDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtDQUNuQixDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsa0RBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztDQUNmLEVBRjZGLENBRTdGLENBQUM7QUFJRjtJQUFrRCxnREFBNEI7SUFFMUU7OztPQUdHO0lBQ0gsc0NBQVksTUFBYztlQUFJLGtCQUFNLE1BQU0sQ0FBQztJQUFFLENBQUM7SUFFOUM7Ozs7O09BS0c7SUFDTywwREFBbUIsR0FBN0IsVUFDSSxLQUE2QixFQUM3QixLQUEwQixFQUMxQixVQUF1QztRQUV2QyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMvQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsd0ZBQXdGO2dCQUN4RixZQUFZLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNoRSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osdURBQXVEO2dCQUN2RCxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM3RCxDQUFDO1lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBUUwsbUNBQUM7QUFBRCxDQXRDQSxBQXNDQyxDQXRDaUQsNEJBQTRCOztBQStCdkUsdUNBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0NBQ25CLENBQUM7QUFDRixrQkFBa0I7QUFDWCwyQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO0NBQ2YsRUFGNkYsQ0FFN0YsQ0FBQyIsImZpbGUiOiJzb2x1dGlvbi1yb290LWd1YXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9