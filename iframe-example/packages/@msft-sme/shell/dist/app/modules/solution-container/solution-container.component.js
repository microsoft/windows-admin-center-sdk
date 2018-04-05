import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteHelpers } from '../../utility/route-helpers';
var SolutionContainerComponent = /** @class */ (function () {
    function SolutionContainerComponent(route) {
        this.route = route;
    }
    SolutionContainerComponent.navigationTitle = function (appContextService, snapshot) {
        var params = RouteHelpers.getFullShellRoutingParameters(snapshot);
        return params.solution ? params.solution.displayName : '';
    };
    SolutionContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-solution-container',
                    template: "<div class=\"sme-layout-absolute sme-position-inset-none\"><router-outlet></router-outlet></div>"
                },] },
    ];
    /** @nocollapse */
    SolutionContainerComponent.ctorParameters = function () { return [
        { type: ActivatedRoute, },
    ]; };
    return SolutionContainerComponent;
}());
export { SolutionContainerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3NvbHV0aW9uLWNvbnRhaW5lci9zb2x1dGlvbi1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQTZCLE1BQU8sZUFBQSxDQUFnQjtBQUM3RCxPQUFPLEVBQUUsY0FBQSxFQUF1RCxNQUFPLGlCQUFBLENBQWtCO0FBSXpGLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyw2QkFBQSxDQUE4QjtBQUczRDtJQU9JLG9DQUFvQixLQUFxQjtRQUFyQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUFHLENBQUM7SUFML0IsMENBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLDZCQUE2QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlELENBQUM7SUFHRSxxQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFFBQVEsRUFBRSxrR0FBZ0c7aUJBQzdHLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCx5Q0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsY0FBYyxHQUFHO0tBQ3ZCLEVBRjZGLENBRTdGLENBQUM7SUFDRixpQ0FBQztDQWxCRCxBQWtCQyxJQUFBO1NBbEJZLDBCQUEwQiIsImZpbGUiOiJzb2x1dGlvbi1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==