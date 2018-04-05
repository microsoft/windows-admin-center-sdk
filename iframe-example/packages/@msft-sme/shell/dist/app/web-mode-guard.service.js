import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppContextService } from '../angular';
import { GatewayMode } from '../core';
import { ShellService } from './shell.service';
import { RouteHelpers } from './utility/route-helpers';
var WebModeGuardService = /** @class */ (function () {
    /**
     * Initializes a new instance of the WebModeGuardService class.
     * @param appContextService the application context service.
     * @param router the activated route.
     */
    function WebModeGuardService(appContextService, router, shellService) {
        this.appContextService = appContextService;
        this.router = router;
        this.shellService = shellService;
    }
    /**
     * Guard against navigating to web only components in app mode
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    WebModeGuardService.prototype.canActivate = function (route, state) {
        var _this = this;
        return this.shellService.inventoryCaches.gatewayCache.createObservable({})
            .take(1)
            .map(function (gateway) {
            if (gateway.mode === GatewayMode.App) {
                RouteHelpers.navigateToAppHome(_this.router, gateway);
                return false;
            }
            return true;
        });
    };
    WebModeGuardService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WebModeGuardService.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: Router, },
        { type: ShellService, },
    ]; };
    return WebModeGuardService;
}());
export { WebModeGuardService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC93ZWItbW9kZS1ndWFyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQzNDLE9BQU8sRUFBdUMsTUFBQSxFQUE0QixNQUFPLGlCQUFBLENBQWtCO0FBRW5HLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLFlBQUEsQ0FBYTtBQUMvQyxPQUFPLEVBQUUsV0FBQSxFQUFZLE1BQU8sU0FBQSxDQUFVO0FBQ3RDLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8seUJBQUEsQ0FBMEI7QUFHdkQ7SUFFSTs7OztPQUlHO0lBQ0gsNkJBQW9CLGlCQUFvQyxFQUFVLE1BQWMsRUFBVSxZQUEwQjtRQUFoRyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQUksQ0FBQztJQUV6SDs7OztPQUlHO0lBQ0kseUNBQVcsR0FBbEIsVUFBbUIsS0FBNkIsRUFBRSxLQUEwQjtRQUE1RSxpQkFXQztRQVZHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO2FBQ3JFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDUCxHQUFHLENBQUMsVUFBQSxPQUFPO1lBQ1IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLEtBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3JELE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ0UsOEJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCxrQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7UUFDM0IsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO1FBQ2hCLEVBQUMsSUFBSSxFQUFFLFlBQVksR0FBRztLQUNyQixFQUo2RixDQUk3RixDQUFDO0lBQ0YsMEJBQUM7Q0FuQ0QsQUFtQ0MsSUFBQTtTQW5DWSxtQkFBbUIiLCJmaWxlIjoid2ViLW1vZGUtZ3VhcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=