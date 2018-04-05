import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EnvironmentModule } from '../../../../core';
import { RouteHelpers } from '../../../utility/route-helpers';
var ConnectionsNavigationComponent = (function () {
    /**
     * Initializes a new instance of the ConnectionsNavigationComponent class.
     *
     * @param route the activated route service.
     * @param router the router service.
     */
    function ConnectionsNavigationComponent(route, router) {
        this.route = route;
        this.router = router;
        this.strings = MsftSme.resourcesStrings().MsftSmeShell.App.SolutionConnections;
        this.isMenuExpanded = false;
        this.allConnectionsRoute = '';
        this.solutionName = '';
    }
    ConnectionsNavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.updateRouteParams();
        this.subscription = this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .subscribe(function (event) {
            _this.updateRouteParams();
        });
    };
    ConnectionsNavigationComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
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
    return ConnectionsNavigationComponent;
}());
export { ConnectionsNavigationComponent };
ConnectionsNavigationComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-connections-navigation',
                template: "\n      <section class=\"stretch-absolute flex-layout\">\n          <section class=\"sidebar\">\n              <nav class=\"sidebar-menu\" [class.expanded]=\"isMenuExpanded\">\n                  <a class=\"sidebar-button\" (click)=\"isMenuExpanded = !isMenuExpanded\">\n                      <div class=\"sidebar-button-icon sme-icon sme-icon-globalNavButton\"> </div>\n                  </a>\n                  <a class=\"sidebar-button\" [routerLink]=\"allConnectionsRoute\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">\n                      <div class=\"sidebar-button-icon sme-icon sme-icon-home\" title=\"{{strings.connections.title.format | smeFormat:solutionName}}\"></div>\n                      <div class=\"sidebar-button-label\">{{strings.connections.title.format | smeFormat:solutionName}}</div>\n                  </a>\n              </nav>\n          </section>\n          <section class=\"auto-flex-size relative\">\n              <router-outlet></router-outlet>\n          </section>\n      </section>\n    ",
                styles: ["\n      .sidebar {\n          height: 100%;\n          color:white;\n          background-color: #ebeced;\n          overflow: hidden;\n          display: flex;\n          flex-direction: row;\n          flex-wrap: nowrap;\n          align-content: stretch;\n          align-items: stretch;\n          justify-content: flex-start;\n      }\n\n      .sidebar-menu {\n          flex: 0 0 auto;\n          display: flex;\n          flex-wrap: nowrap;\n          flex-direction: column;\n          align-content: flex-start;\n          align-items: flex-start;\n          justify-content: flex-start;\n      }\n\n      .sidebar-menu.expanded .sidebar-button .sidebar-button-label {\n          display: inline-block\n      }\n\n      .sidebar-button {\n          height: 36px;\n          width: 100%;\n          cursor: pointer;\n          display: inline-block;\n          white-space: nowrap;\n          display: flex;\n          flex-wrap: nowrap;\n          flex-direction: row;\n          align-content: center;\n          align-items: center;\n          justify-content: flex-start;\n          color:#333;\n          font-size: 12px;\n          user-select: none;\n      }\n\n      .sidebar-button:hover, .sidebar-button:focus, .sidebar-button.active {\n          background: #caccce;\n          text-decoration: none;\n      }\n\n      .sidebar-button:hover {\n          background: #dfe1e2;\n      }\n\n      .sidebar-button:hover, .sidebar-button:focus {\n          text-decoration: underline;\n      }\n\n      .sidebar-button.sideloaded{\n          color: #f60;\n          font-weight: bold;\n      }\n\n      .sidebar-button-label{\n          display: none;\n          flex: 1 1 auto;\n          font-size: 13px;\n          margin-right: 15px;\n      }\n\n      .sidebar-button-icon {\n          flex: 0 0 auto;\n          height: 36px;\n          width: 36px;\n          background-size: 18px;\n          background-position: center;\n          background-repeat: no-repeat;\n          display: inline-block;\n          font-size: 14px;\n          text-align: center;\n          line-height: 36px;\n          vertical-align: middle;\n      }\n    "]
            },] },
];
/** @nocollapse */
ConnectionsNavigationComponent.ctorParameters = function () { return [
    { type: ActivatedRoute, },
    { type: Router, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Nvbm5lY3Rpb25zL2Nvbm5lY3Rpb25zLW5hdi9jb25uZWN0aW9ucy1uYXYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQTZCLE1BQU8sZUFBQSxDQUFnQjtBQUM3RCxPQUFPLEVBQUUsY0FBQSxFQUFnQixhQUFBLEVBQWUsTUFBQSxFQUFPLE1BQU8saUJBQUEsQ0FBa0I7QUFFeEUsT0FBTyxFQUFFLGlCQUFBLEVBQStDLE1BQU8sa0JBQUEsQ0FBbUI7QUFFbEYsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGdDQUFBLENBQWlDO0FBRzlEO0lBT0k7Ozs7O09BS0c7SUFDSCx3Q0FDWSxLQUFxQixFQUNyQixNQUFjO1FBRGQsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQWRuQixZQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztRQUNuRixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2Qix3QkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDekIsaUJBQVksR0FBRyxFQUFFLENBQUM7SUFZckIsQ0FBQztJQUVFLGlEQUFRLEdBQWY7UUFBQSxpQkFPQztRQU5HLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2FBQ2pDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssWUFBWSxhQUFhLEVBQTlCLENBQThCLENBQUM7YUFDL0MsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUNaLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLG9EQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU8sMERBQWlCLEdBQXpCO1FBQ0ksSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEYsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNyRCxJQUFJLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzRixJQUFJLENBQUMsbUJBQW1CLEdBQUcsTUFBSSxrQkFBa0IsaUJBQWMsQ0FBQztRQUNwRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQzNCLENBQUM7SUFDTCxDQUFDO0lBaUhMLHFDQUFDO0FBQUQsQ0ExSkEsQUEwSkM7O0FBaEhNLHlDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsUUFBUSxFQUFFLDhoQ0FpQlQ7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsNm1FQW1GUixDQUFDO2FBQ0wsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDZDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7SUFDeEIsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO0NBQ2YsRUFINkYsQ0FHN0YsQ0FBQyIsImZpbGUiOiJjb25uZWN0aW9ucy1uYXYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==