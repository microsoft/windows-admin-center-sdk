import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppContextService } from '../../../angular';
import { RouteHelpers } from '../../utility/route-helpers';
var ConnectionsComponent = /** @class */ (function () {
    function ConnectionsComponent(appContext, route, router) {
        var _this = this;
        this.appContext = appContext;
        this.route = route;
        this.router = router;
        this.strings = MsftSme.resourcesStrings().MsftSmeShell.App;
        this.header = '';
        this.subscription = this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .subscribe(function (event) {
            _this.updateSolution();
        });
    }
    ConnectionsComponent.prototype.ngOnInit = function () {
        this.updateSolution();
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
    ConnectionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-connections',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-arrange-stack-v sme-arrange-overflow-hide-x sme-arrange-overflow-auto-y\">\n          <sme-tool-header class=\"sme-position-flex-none\">{{header}}</sme-tool-header>\n          <sme-connections-list class=\"sme-layout-relative sme-position-flex-auto\" [solution]=\"solution\"></sme-connections-list>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ConnectionsComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: ActivatedRoute, },
        { type: Router, },
    ]; };
    return ConnectionsComponent;
}());
export { ConnectionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Nvbm5lY3Rpb25zL2Nvbm5lY3Rpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFDN0QsT0FBTyxFQUFFLGNBQUEsRUFBd0MsYUFBQSxFQUF1QixNQUFBLEVBQU8sTUFBTyxpQkFBQSxDQUFrQjtBQUd4RyxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxrQkFBQSxDQUFtQjtBQUdyRCxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8sNkJBQUEsQ0FBOEI7QUFHM0Q7SUFRSSw4QkFDZ0IsVUFBNkIsRUFDN0IsS0FBcUIsRUFDckIsTUFBYztRQUg5QixpQkFTQztRQVJlLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBQzdCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFUdkIsWUFBTyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7UUFFL0QsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQVFmLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2FBQ2pDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssWUFBWSxhQUFhLEVBQTlCLENBQThCLENBQUM7YUFDL0MsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUNaLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFTSx1Q0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTSwwQ0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVPLDZDQUFjLEdBQXRCO1FBQ0ksSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBQ3JDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBUyxJQUFJLENBQUMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDdkUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNWLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3pHLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUNFLCtCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLHFZQUtUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxtQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7UUFDM0IsRUFBQyxJQUFJLEVBQUUsY0FBYyxHQUFHO1FBQ3hCLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztLQUNmLEVBSjZGLENBSTdGLENBQUM7SUFDRiwyQkFBQztDQXhERCxBQXdEQyxJQUFBO1NBeERZLG9CQUFvQiIsImZpbGUiOiJjb25uZWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9