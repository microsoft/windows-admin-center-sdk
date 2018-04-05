import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteHelpers } from '../../utility/route-helpers';
var SolutionContainerComponent = (function () {
    function SolutionContainerComponent(route) {
        this.route = route;
    }
    SolutionContainerComponent.navigationTitle = function (appContextService, snapshot) {
        var params = RouteHelpers.getFullShellRoutingParameters(snapshot);
        return params.solution ? params.solution.displayName : '';
    };
    return SolutionContainerComponent;
}());
export { SolutionContainerComponent };
SolutionContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-solution-container',
                template: "<div class=\"stretch-absolute\"><router-outlet></router-outlet></div>"
            },] },
];
/** @nocollapse */
SolutionContainerComponent.ctorParameters = function () { return [
    { type: ActivatedRoute, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3NvbHV0aW9uLWNvbnRhaW5lci9zb2x1dGlvbi1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQTZCLE1BQU8sZUFBQSxDQUFnQjtBQUM3RCxPQUFPLEVBQUUsY0FBQSxFQUF1RCxNQUFPLGlCQUFBLENBQWtCO0FBSXpGLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyw2QkFBQSxDQUE4QjtBQUczRDtJQU9JLG9DQUFvQixLQUFxQjtRQUFyQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUFHLENBQUM7SUFML0IsMENBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLDZCQUE2QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUM5RCxDQUFDO0lBYUwsaUNBQUM7QUFBRCxDQWxCQSxBQWtCQzs7QUFWTSxxQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFFBQVEsRUFBRSx1RUFBcUU7YUFDbEYsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHlDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7Q0FDdkIsRUFGNkYsQ0FFN0YsQ0FBQyIsImZpbGUiOiJzb2x1dGlvbi1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==