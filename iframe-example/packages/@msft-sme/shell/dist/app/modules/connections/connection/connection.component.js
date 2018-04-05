import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GatewayMode } from '../../../../core';
import { ShellService } from '../../../shell.service';
import { RouteHelpers } from '../../../utility/route-helpers';
var ConnectionComponent = /** @class */ (function () {
    function ConnectionComponent(route, router, shellService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.shellService = shellService;
        this.gatewayMode = GatewayMode;
        this.subscription = this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .subscribe(function (event) {
            var shellParams = RouteHelpers.getFullShellRoutingParameters(_this.route.snapshot);
            _this.connectionName = shellParams.connectionName;
        });
    }
    ConnectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Logging.trace(<TelemetryRecord>{
        //     view: 'sme-connections',
        //     instance: '',
        //     action: 'ngOnInit'
        // });
        this.gatewaySubscription = this.shellService.inventoryCaches.gatewayCache.createObservable({})
            .subscribe(function (gateway) { return _this.gateway = gateway; });
    };
    ConnectionComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.gatewaySubscription.unsubscribe();
    };
    ConnectionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-connection',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-arrange-stack-v\">\n          <h2 *ngIf=\"gateway && gateway.mode !== gatewayMode.App\" class=\"sme-position-flex-none sme-padding-inset-sm\" role=\"banner\">{{connectionName}}</h2>\n          <div class=\"sme-layout-relative sme-position-flex-auto\">\n              <router-outlet></router-outlet>\n          </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ConnectionComponent.ctorParameters = function () { return [
        { type: ActivatedRoute, },
        { type: Router, },
        { type: ShellService, },
    ]; };
    return ConnectionComponent;
}());
export { ConnectionComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Nvbm5lY3Rpb25zL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxjQUFBLEVBQXdDLGFBQUEsRUFBdUIsTUFBQSxFQUFPLE1BQU8saUJBQUEsQ0FBa0I7QUFJeEcsT0FBTyxFQUFpRCxXQUFBLEVBQVksTUFBTyxrQkFBQSxDQUFtQjtBQUM5RixPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8sd0JBQUEsQ0FBeUI7QUFDdEQsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGdDQUFBLENBQWlDO0FBRzlEO0lBU0ksNkJBQ2dCLEtBQXFCLEVBQ3JCLE1BQWMsRUFDZCxZQUEwQjtRQUgxQyxpQkFVQztRQVRlLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQVJuQyxnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQVM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTthQUNqQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLFlBQVksYUFBYSxFQUE5QixDQUE4QixDQUFDO2FBQy9DLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDWixJQUFJLFdBQVcsR0FBRyxZQUFZLENBQUMsNkJBQTZCLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRixLQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sc0NBQVEsR0FBZjtRQUFBLGlCQVFDO1FBUEcsbUNBQW1DO1FBQ25DLCtCQUErQjtRQUMvQixvQkFBb0I7UUFDcEIseUJBQXlCO1FBQ3pCLE1BQU07UUFDTixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQzthQUN6RixTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSx5Q0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFDRSw4QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSx1WkFPVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsa0NBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztRQUN4QixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUsWUFBWSxHQUFHO0tBQ3JCLEVBSjZGLENBSTdGLENBQUM7SUFDRiwwQkFBQztDQXRERCxBQXNEQyxJQUFBO1NBdERZLG1CQUFtQiIsImZpbGUiOiJjb25uZWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=