import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RouteHelpers } from '../../../utility/route-helpers';
var ConnectionComponent = (function () {
    function ConnectionComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    ConnectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Logging.trace(<TelemetryRecord>{
        //     view: 'sme-connections',
        //     instance: '',
        //     action: 'ngOnInit'
        // });
        this.subscription = this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .subscribe(function (event) {
            var shellParams = RouteHelpers.getFullShellRoutingParameters(_this.route.snapshot);
            _this.connectionName = shellParams.connectionName;
        });
    };
    ConnectionComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return ConnectionComponent;
}());
export { ConnectionComponent };
ConnectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-connection',
                template: "\n      <div class=\"stretch-absolute flex-layout vertical\">\n          <div class=\"fixed-flex-size\" role=\"banner\">\n              <h4 class=\"connection-header\">{{connectionName}}</h4>\n          </div>\n          <div class=\"auto-flex-size relative\">\n              <router-outlet></router-outlet>\n          </div>\n      </div>\n    ",
                styles: ["\n      /* modify h4 headers with this to get correct connection-header spacing */\n      .connection-header {\n          font-size: 24px;\n          font-weight: 600;\n          line-height: 1;\n          margin: 0px;\n          padding: 18px 15px;\n          text-transform: unset;\n          color: #333;\n      }\n    "]
            },] },
];
/** @nocollapse */
ConnectionComponent.ctorParameters = function () { return [
    { type: ActivatedRoute, },
    { type: Router, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Nvbm5lY3Rpb25zL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxjQUFBLEVBQXdDLGFBQUEsRUFBdUIsTUFBQSxFQUFPLE1BQU8saUJBQUEsQ0FBa0I7QUFLeEcsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGdDQUFBLENBQWlDO0FBRzlEO0lBTUksNkJBQ1ksS0FBcUIsRUFDckIsTUFBYztRQURkLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDdEIsQ0FBQztJQUVFLHNDQUFRLEdBQWY7UUFBQSxpQkFZQztRQVhHLG1DQUFtQztRQUNuQywrQkFBK0I7UUFDL0Isb0JBQW9CO1FBQ3BCLHlCQUF5QjtRQUN6QixNQUFNO1FBQ04sSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07YUFDakMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxZQUFZLGFBQWEsRUFBOUIsQ0FBOEIsQ0FBQzthQUMvQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ1osSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDLDZCQUE2QixDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEYsS0FBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLHlDQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBaUNMLDBCQUFDO0FBQUQsQ0E1REEsQUE0REM7O0FBaENNLDhCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLDJWQVNUO2dCQUNELE1BQU0sRUFBRSxDQUFDLG9VQVdSLENBQUM7YUFDTCxFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsa0NBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztJQUN4QixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7Q0FDZixFQUg2RixDQUc3RixDQUFDIiwiZmlsZSI6ImNvbm5lY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==