import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppContextService } from '../../../angular';
import { ConnectionUtility, EnvironmentModule, GatewayMode, LiveConnectionStatusType } from '../../../core';
import { ShellService } from '../../shell.service';
import { RouteHelpers } from '../../utility/route-helpers';
var ConnectionGuardService = /** @class */ (function () {
    /**
     * Initializes a new instance of the ConnectionGuardService class.
     * @param appContextService the application context service.
     * @param router the angular router.
     */
    function ConnectionGuardService(appContextService, router, shellService) {
        this.appContextService = appContextService;
        this.router = router;
        this.shellService = shellService;
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
        if (!params.connectionFriendlyType
            && EnvironmentModule.getFriendlyUrlSegmentForConnectionType(params.connectionType, false)) {
            // reroute to friendly version of the route
            RouteHelpers.navigateToTool(this.router, params);
            return false;
        }
        // if parameters are acceptable, then search for the connection
        return this.appContextService.connectionManager
            .findConnection(params.connectionName, params.connectionType)
            .flatMap(function (connection) {
            if (!connection) {
                // if the type passed in the route does not have a provider, then redirect back to solution
                var validConnectionType = EnvironmentModule.getEntryPointsByType(['connectionProvider'])
                    .some(function (cp) { return cp.connectionType === params.connectionType; });
                if (!validConnectionType) {
                    _this.redirectRoute(route);
                    return Observable.of(false);
                }
                // otherwise, create a default connection
                connection = {
                    id: ConnectionUtility.createConnectionId(params.connectionType, params.connectionName),
                    name: params.connectionName,
                    type: params.connectionType
                };
            }
            _this.appContextService.activeConnection.value = connection;
            return _this.shellService.inventoryCaches.gatewayCache.createObservable()
                .take(1)
                .map(function (gateway) {
                // handle app mode routing
                if (gateway.mode === GatewayMode.App) {
                    // dont allow non localhost connections.
                    if (!params.connectionName || params.connectionName !== RouteHelpers.appModeConnectionName) {
                        RouteHelpers.navigateToAppHome(_this.router, gateway);
                        return false;
                    }
                }
                // NOTE: this should not subscribe, 
                // it should instead return an observable that resolves to true or false and redirect if false
                _this.appContextService.connectionStream.getLiveConnection(connection).subscribe(function (result) {
                    // TODO: need to handle more case here like error states and unauthorized state.
                    if (_this.appContextService.activeConnection.value
                        && result.connection.id === _this.appContextService.activeConnection.value.id
                        && !result.loading) {
                        if (result.status.type <= LiveConnectionStatusType.Warning) {
                            _this.appContextService.connectionManager.updateConnectionLastCheckedTime(result.connection).subscribe();
                        }
                    }
                });
                return true;
            });
        })
            .take(1);
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
    ConnectionGuardService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ConnectionGuardService.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: Router, },
        { type: ShellService, },
    ]; };
    return ConnectionGuardService;
}());
export { ConnectionGuardService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Nvbm5lY3Rpb25zL2Nvbm5lY3Rpb24tZ3VhcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQXVDLE1BQUEsRUFBNEIsTUFBTyxpQkFBQSxDQUFrQjtBQUNuRyxPQUFPLEVBQUUsVUFBQSxFQUFvQixNQUFPLE1BQUEsQ0FBTztBQUMzQyxPQUFPLEVBQUUsaUJBQUEsRUFBOEIsTUFBTyxrQkFBQSxDQUFtQjtBQUNqRSxPQUFPLEVBQWMsaUJBQUEsRUFBbUIsaUJBQUEsRUFBbUIsV0FBQSxFQUFhLHdCQUFBLEVBQXlCLE1BQU8sZUFBQSxDQUFnQjtBQUN4SCxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8scUJBQUEsQ0FBc0I7QUFDbkQsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLDZCQUFBLENBQThCO0FBRzNEO0lBRUk7Ozs7T0FJRztJQUNILGdDQUFvQixpQkFBb0MsRUFBVSxNQUFjLEVBQVUsWUFBMEI7UUFBaEcsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFJLENBQUM7SUFFekg7Ozs7T0FJRztJQUNJLDRDQUFXLEdBQWxCLFVBQW1CLEtBQTZCLEVBQUUsS0FBMEI7UUFBNUUsaUJBZ0VDO1FBL0RHLElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMs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