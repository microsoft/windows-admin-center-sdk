import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Navigation } from '../angular';
var ShellGuardService = (function () {
    /**
     * Initializes a new instance of the SmeAppReadyGuard class.
     * @param appContextService the application context service.
     * @param router the activated route.
     */
    function ShellGuardService(appContextService, router) {
        this.appContextService = appContextService;
        this.router = router;
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
            this.router.navigate(['errors/unsupported-browser']);
            return this.appContextService.servicesReady;
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
            // ensure connections are loaded before returning
            return _this.appContextService.connectionManager.restoreConnections();
        })
            .map(function (connections) {
            ShellGuardService.initialized = true;
            return true;
        });
    };
    return ShellGuardService;
}());
export { ShellGuardService };
ShellGuardService.initialized = false;
ShellGuardService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ShellGuardService.ctorParameters = function () { return [
    null,
    { type: Router, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGVsbC1ndWFyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQzNDLE9BQU8sRUFBdUMsTUFBQSxFQUE0QixNQUFPLGlCQUFBLENBQWtCO0FBRW5HLE9BQU8sRUFBcUIsVUFBQSxFQUFXLE1BQU8sWUFBQSxDQUFhO0FBSTNEO0lBR0k7Ozs7T0FJRztJQUNILDJCQUFvQixpQkFBb0MsRUFBVSxNQUFjO1FBQTVELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztJQUVwRjs7OztPQUlHO0lBQ0ksdUNBQVcsR0FBbEIsVUFBbUIsS0FBNkIsRUFBRSxLQUEwQjtRQUE1RSxpQkE4QkM7UUE3QkcscURBQXFEO1FBQ3JELHVHQUF1RztRQUN2RyxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUN6QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDaEQsQ0FBQztRQUVELDBEQUEwRDtRQUMxRCxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ2hELENBQUM7UUFFRCxpQ0FBaUM7UUFDakMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFDckMsSUFBSSxVQUFVLEdBQVcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUNqRixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWE7YUFFbEMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNQLE9BQU8sQ0FBQztZQUNMLHdCQUF3QjtZQUN4QixLQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDdkQsaURBQWlEO1lBQ2pELE1BQU0sQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUN6RSxDQUFDLENBQUM7YUFDRCxHQUFHLENBQUMsVUFBQSxXQUFXO1lBQ1osaUJBQWlCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQVNMLHdCQUFDO0FBQUQsQ0F0REEsQUFzREM7O0FBckRrQiw2QkFBVyxHQUFHLEtBQUssQ0FBQztBQTZDaEMsNEJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0NBQ25CLENBQUM7QUFDRixrQkFBa0I7QUFDWCxnQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsSUFBSTtJQUNKLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztDQUNmLEVBSDZGLENBRzdGLENBQUMiLCJmaWxlIjoic2hlbGwtZ3VhcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=