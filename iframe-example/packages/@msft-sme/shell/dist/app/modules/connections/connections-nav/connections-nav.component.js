import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EnvironmentModule, GatewayMode } from '../../../../core';
import { ShellService } from '../../../shell.service';
import { RouteHelpers } from '../../../utility/route-helpers';
var ConnectionsNavigationComponent = /** @class */ (function () {
    /**
     * Initializes a new instance of the ConnectionsNavigationComponent class.
     *
     * @param route the activated route service.
     * @param router the router service.
     */
    function ConnectionsNavigationComponent(route, router, shellService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.shellService = shellService;
        this.strings = MsftSme.resourcesStrings().MsftSmeShell.App.SolutionConnections;
        this.isMenuExpanded = false;
        this.allConnectionsRoute = '';
        this.solutionName = '';
        this.gatewayMode = GatewayMode;
        this.subscription = this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .subscribe(function (event) {
            _this.updateRouteParams();
        });
    }
    ConnectionsNavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.updateRouteParams();
        this.gatewaySubscription = this.shellService.inventoryCaches.gatewayCache.createObservable({})
            .subscribe(function (gateway) { return _this.gateway = gateway; });
    };
    ConnectionsNavigationComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.gatewaySubscription.unsubscribe();
    };
    ConnectionsNavigationComponent.prototype.updateRouteParams = function () {
        var shellParams = RouteHelpers.getFullShellRoutingParameters(this.route.snapshot);
        if (shellParams.solution) {
            this.solutionName = shellParams.solution.displayName;
            var moduleEntrySegment = EnvironmentModule.createFormattedEntrypoint(shellParams.solution);
            this.allConnectionsRoute = "/" + moduleEntrySegment + "/connections";
        }
        else {
            this.allConnectionsRoute = '';
            this.solutionName = '';
        }
    };
    ConnectionsNavigationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-connections-navigation',
                    template: "\n      <section class=\"sme-layout-absolute sme-position-inset-none sme-arrange-stack-h\">\n          <section class=\"sidebar\" *ngIf=\"gateway && gateway.mode !== gatewayMode.App\" role=\"navigation\" [attr.aria-label]=\"strings.connections.sidebar.landmark.aria.label\">\n              <nav class=\"sidebar-menu\" [class.expanded]=\"isMenuExpanded\">\n                  <a tabindex=\"0\" class=\"sidebar-button\" (click)=\"isMenuExpanded = !isMenuExpanded\">\n                      <div class=\"sidebar-button-icon sme-icon sme-icon-globalNavButton\"> </div>\n                  </a>\n                  <a class=\"sidebar-button\" [routerLink]=\"allConnectionsRoute\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">\n                      <div class=\"sidebar-button-icon sme-icon sme-icon-home\" title=\"{{strings.connections.title.format | smeFormat:solutionName}}\"></div>\n                      <div class=\"sidebar-button-label\">{{strings.connections.title.format | smeFormat:solutionName}}</div>\n                  </a>\n              </nav>\n          </section>\n          <section class=\"sme-layout-relative sme-position-flex-auto\" role=\"main\">\n              <router-outlet></router-outlet>\n          </section>\n      </section>\n    ",
                    styles: ["\n      .sidebar {\n          height: 100%;\n          color:white;\n          background-color: #ebeced;\n          overflow: hidden;\n          display: flex;\n          flex-direction: row;\n          flex-wrap: nowrap;\n          align-content: stretch;\n          align-items: stretch;\n          justify-content: flex-start;\n      }\n\n      .sidebar-menu {\n          flex: 0 0 auto;\n          display: flex;\n          flex-wrap: nowrap;\n          flex-direction: column;\n          align-content: flex-start;\n          align-items: flex-start;\n          justify-content: flex-start;\n      }\n\n      .sidebar-menu.expanded .sidebar-button .sidebar-button-label {\n          display: inline-block\n      }\n\n      .sidebar-button {\n          height: 36px;\n          width: 100%;\n          cursor: pointer;\n          display: inline-block;\n          white-space: nowrap;\n          display: flex;\n          flex-wrap: nowrap;\n          flex-direction: row;\n          align-content: center;\n          align-items: center;\n          justify-content: flex-start;\n          color:#333;\n          font-size: 12px;\n          user-select: none;\n      }\n\n      .sidebar-button:hover, .sidebar-button:focus, .sidebar-button.active {\n          background: #caccce;\n          text-decoration: none;\n      }\n\n      .sidebar-button:hover {\n          background: #dfe1e2;\n      }\n\n      .sidebar-button:hover, .sidebar-button:focus {\n          text-decoration: underline;\n      }\n\n      .sidebar-button.sideloaded{\n          color: #f60;\n          font-weight: bold;\n      }\n\n      .sidebar-button-label{\n          display: none;\n          flex: 1 1 auto;\n          font-size: 13px;\n          margin-right: 15px;\n      }\n\n      .sidebar-button-icon {\n          flex: 0 0 auto;\n          height: 36px;\n          width: 36px;\n          background-size: 18px;\n          background-position: center;\n          background-repeat: no-repeat;\n          display: inline-block;\n          font-size: 14px;\n          text-align: center;\n          line-height: 36px;\n          vertical-align: middle;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    ConnectionsNavigationComponent.ctorParameters = function () { return [
        { type: ActivatedRoute, },
        { type: Router, },
        { type: ShellService, },
    ]; };
    return ConnectionsNavigationComponent;
}());
export { ConnectionsNavigationComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Nvbm5lY3Rpb25zL2Nvbm5lY3Rpb25zLW5hdi9jb25uZWN0aW9ucy1uYXYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQTZCLE1BQU8sZUFBQSxDQUFnQjtBQUM3RCxPQUFPLEVBQUUsY0FBQSxFQUFnQixhQUFBLEVBQWUsTUFBQSxFQUFPLE1BQU8saUJBQUEsQ0FBa0I7QUFFeEUsT0FBTyxFQUFFLGlCQUFBLEVBQWtFLFdBQUEsRUFBWSxNQUFPLGtCQUFBLENBQW1CO0FBRWpILE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyx3QkFBQSxDQUF5QjtBQUN0RCxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8sZ0NBQUEsQ0FBaUM7QUFHOUQ7SUFVSTs7Ozs7T0FLRztJQUNILHdDQUNnQixLQUFxQixFQUNyQixNQUFjLEVBQ2QsWUFBMEI7UUFIMUMsaUJBU0U7UUFSYyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsaUJBQVksR0FBWixZQUFZLENBQWM7UUFsQm5DLFlBQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO1FBQ25GLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLHdCQUFtQixHQUFHLEVBQUUsQ0FBQztRQUN6QixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUVsQixnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQWM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTthQUNqQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLFlBQVksYUFBYSxFQUE5QixDQUE4QixDQUFDO2FBQy9DLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDWixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNWLENBQUM7SUFFSyxpREFBUSxHQUFmO1FBQUEsaUJBSUM7UUFIRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQzthQUN6RixTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxvREFBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFTywwREFBaUIsR0FBekI7UUFDSSxJQUFJLFdBQVcsR0FBRyxZQUFZLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ3JELElBQUksa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNGLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxNQUFJLGtCQUFrQixpQkFBYyxDQUFDO1FBQ3BFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDM0IsQ0FBQztJQUNMLENBQUM7SUFDRSx5Q0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLFFBQVEsRUFBRSxpd0NBaUJUO29CQUNELE1BQU0sRUFBRSxDQUFDLDZtRUFtRlIsQ0FBQztpQkFDTCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsNkNBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztRQUN4QixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUsWUFBWSxHQUFHO0tBQ3JCLEVBSjZGLENBSTdGLENBQUM7SUFDRixxQ0FBQztDQWxLRCxBQWtLQyxJQUFBO1NBbEtZLDhCQUE4QiIsImZpbGUiOiJjb25uZWN0aW9ucy1uYXYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==