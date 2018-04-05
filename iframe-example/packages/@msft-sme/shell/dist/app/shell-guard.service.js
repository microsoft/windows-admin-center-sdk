import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppContextService, Navigation } from '../angular';
import { ShellService } from './shell.service';
var ShellGuardService = /** @class */ (function () {
    /**
     * Initializes a new instance of the SmeAppReadyGuard class.
     * @param appContextService the application context service.
     * @param router the activated route.
     */
    function ShellGuardService(appContextService, router, shellService) {
        this.appContextService = appContextService;
        this.router = router;
        this.shellService = shellService;
    }
    /**
     * Guard against navigating until the app initialization is complete
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    ShellGuardService.prototype.canActivate = function (route, state) {
        var _this = this;
        // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0;
        // .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko"
        var agent = window.navigator.userAgent;
        if (agent.indexOf('Trident') > 0) {
            // directly set location to navigate. Angular router.navigate() doesn't work on IE11 environment.
            window.location.href = 'errors/unsupported-browser';
            return Observable.of(true);
        }
        // if already initialized, resolve when services are ready
        if (ShellGuardService.initialized) {
            return this.appContextService.servicesReady;
        }
        // get params and copy over them.
        var params = route.queryParams || {};
        var gatewayUrl = params[Navigation.gatewayUrl] || window.location.origin;
        return this.appContextService.servicesReady
            .take(1)
            .flatMap(function () {
            // configure gateway URL
            _this.appContextService.gateway.gatewayUrl = gatewayUrl;
            // get gateway status and connections list before returning
            return Observable.zip(_this.shellService.inventoryCaches.gatewayCache.createObservable({}), _this.appContextService.connectionManager.restoreConnections());
        })
            .map(function (_a) {
            var instance = _a[0], connections = _a[1];
            ShellGuardService.initialized = true;
            return true;
        }).catch(function (err) {
            // TODO: Reroute to appropriate error
            return Observable.of(false);
        });
    };
    ShellGuardService.initialized = false;
    ShellGuardService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ShellGuardService.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: Router, },
        { type: ShellService, },
    ]; };
    return ShellGuardService;
}());
export { ShellGuardService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGVsbC1ndWFyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQzNDLE9BQU8sRUFBdUMsTUFBQSxFQUE0QixNQUFPLGlCQUFBLENBQWtCO0FBQ25HLE9BQU8sRUFBRSxVQUFBLEVBQW9CLE1BQU8sTUFBQSxDQUFPO0FBQzNDLE9BQU8sRUFBRSxpQkFBQSxFQUFtQixVQUFBLEVBQVcsTUFBTyxZQUFBLENBQWE7QUFFM0QsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBSS9DO0lBR0k7Ozs7T0FJRztJQUNILDJCQUFvQixpQkFBb0MsRUFBVSxNQUFjLEVBQVUsWUFBMEI7UUFBaEcsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFJLENBQUM7SUFFekg7Ozs7T0FJRztJQUNJLHVDQUFXLEdBQWxCLFVBQW1CLEtBQTZCLEVBQUUsS0FBMEI7UUFBNUUsaUJBcUNDO1FBcENHLHFEQUFxRDtRQUNyRCx1R0FBdUc7UUFDdkcsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFDekMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLGlHQUFpRztZQUNqRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyw0QkFBNEIsQ0FBQztZQUNwRCxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRUQsMERBQTBEO1FBQzFELEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDaEQsQ0FBQztRQUVELGlDQUFpQztRQUNqQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxJQUFJLFVBQVUsR0FBVyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ2pGLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYTthQUV0QyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ1AsT0FBTyxDQUFDO1lBQ0wsd0JBQXdCO1lBQ3hCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUN2RCwyREFBMkQ7WUFDM0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ2pCLEtBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsRUFDbkUsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixFQUFFLENBQ2hFLENBQUM7UUFDTixDQUFDLENBQUM7YUFDRCxHQUFHLENBQUMsVUFBQyxFQUF1QjtnQkFBdEIsZ0JBQVEsRUFBRSxtQkFBVztZQUN4QixpQkFBaUIsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRztZQUNSLHFDQUFxQztZQUNyQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFuRGMsNkJBQVcsR0FBRyxLQUFLLENBQUM7SUFvRGhDLDRCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsZ0NBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO1FBQzNCLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztRQUNoQixFQUFDLElBQUksRUFBRSxZQUFZLEdBQUc7S0FDckIsRUFKNkYsQ0FJN0YsQ0FBQztJQUNGLHdCQUFDO0NBOURELEFBOERDLElBQUE7U0E5RFksaUJBQWlCIiwiZmlsZSI6InNoZWxsLWd1YXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9