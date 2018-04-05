import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RouteHelpers } from '../../utility/route-helpers';
var ConnectionsComponent = (function () {
    function ConnectionsComponent(appContext, route, router) {
        this.appContext = appContext;
        this.route = route;
        this.router = router;
        this.strings = MsftSme.resourcesStrings().MsftSmeShell.App;
        this.header = '';
    }
    ConnectionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.updateSolution();
        this.subscription = this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .subscribe(function (event) {
            _this.updateSolution();
        });
    };
    ConnectionsComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ConnectionsComponent.prototype.updateSolution = function () {
        var shellParams = RouteHelpers.getFullShellRoutingParameters(this.route.snapshot);
        this.solution = shellParams.solution;
        var header = '';
        if (this.solution) {
            header = MsftSme.getValue(this.solution, 'connections.header');
            if (!header) {
                header = this.strings.SolutionConnections.connections.title.format.format(this.solution.displayName);
            }
        }
        this.header = header;
    };
    return ConnectionsComponent;
}());
export { ConnectionsComponent };
ConnectionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-connections',
                template: "\n      <div class=\"stretch-absolute flex-layout vertical vertical-scroll-only\">\n        <sme-tool-header class=\"fixed-flex-size\">{{header}}</sme-tool-header>\n        <sme-connections-list class=\"auto-flex-size relative\" [solution]=\"solution\"></sme-connections-list>\n      </div>\n    ",
                styles: ["\n      h4 {\n        padding: 0 0 22px 0;\n      }\n    "]
            },] },
];
/** @nocollapse */
ConnectionsComponent.ctorParameters = function () { return [
    null,
    { type: ActivatedRoute, },
    { type: Router, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Nvbm5lY3Rpb25zL2Nvbm5lY3Rpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFDN0QsT0FBTyxFQUFFLGNBQUEsRUFBd0MsYUFBQSxFQUF1QixNQUFBLEVBQU8sTUFBTyxpQkFBQSxDQUFrQjtBQU14RyxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8sNkJBQUEsQ0FBOEI7QUFHM0Q7SUFRSSw4QkFDWSxVQUE2QixFQUM3QixLQUFxQixFQUNyQixNQUFjO1FBRmQsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFDN0IsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVRuQixZQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUUvRCxXQUFNLEdBQUcsRUFBRSxDQUFDO0lBUWYsQ0FBQztJQUVFLHVDQUFRLEdBQWY7UUFBQSxpQkFPQztRQU5HLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTthQUNqQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLFlBQVksYUFBYSxFQUE5QixDQUE4QixDQUFDO2FBQy9DLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDWixLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sMENBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFTyw2Q0FBYyxHQUF0QjtRQUNJLElBQUksV0FBVyxHQUFHLFlBQVksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUNyQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQVMsSUFBSSxDQUFDLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3ZFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDVixNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6RyxDQUFDO1FBQ0wsQ0FBQztRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUF1QkwsMkJBQUM7QUFBRCxDQTdEQSxBQTZEQzs7QUF0Qk0sK0JBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUUsMFNBS1Q7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsMkRBSVIsQ0FBQzthQUNMLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxtQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsSUFBSTtJQUNKLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztJQUN4QixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7Q0FDZixFQUo2RixDQUk3RixDQUFDIiwiZmlsZSI6ImNvbm5lY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=