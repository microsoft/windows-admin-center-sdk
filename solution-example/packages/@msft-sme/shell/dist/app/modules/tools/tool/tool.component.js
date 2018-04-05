import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RouteHelpers } from '../../../utility/route-helpers';
import { AppBarService } from '../../app-bar/app-bar.service';
import { CachedFramesComponent } from '../../iframe/cached-frames/cached-frames.component';
import { IFrameService } from '../../iframe/iframe.service';
var ToolComponent = (function () {
    function ToolComponent(appContext, route, router, iFrameService) {
        this.appContext = appContext;
        this.route = route;
        this.router = router;
        this.iFrameService = iFrameService;
    }
    ToolComponent.navigationTitle = function (appContextService, snapshot) {
        var params = RouteHelpers.getFullShellRoutingParameters(snapshot);
        return params.tool ? params.tool.displayName : null;
    };
    ToolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.updateTool();
        this.subscription = this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .subscribe(function (event) {
            _this.updateTool();
        });
    };
    ToolComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ToolComponent.prototype.canDeactivateTool = function (currentRoute, currentState, nextState) {
        return this.iFrameService.canDeactivateToolOnFrame(CachedFramesComponent.cachedFrameId, this.appContext, currentRoute, currentState, nextState);
    };
    ToolComponent.prototype.updateTool = function () {
        // update toolsUrlPrefix
        var shellParams = RouteHelpers.getFullShellRoutingParameters(this.route.snapshot);
        var toolsUrlPrefix = '';
        this.tool = null;
        if (shellParams.solution) {
            var solutionSegment = shellParams.solutionFriendlyName || shellParams.solutionId;
            toolsUrlPrefix = solutionSegment + "/";
            if (shellParams.solution.rootNavigationBehavior === 'connections') {
                var connectionTypeSegment = shellParams.connectionFriendlyType || shellParams.connectionType;
                toolsUrlPrefix += "connections/" + connectionTypeSegment + "/" + shellParams.connectionName;
            }
            if (shellParams.solution.tools && shellParams.solution.tools.enabled) {
                this.tool = shellParams.tool;
                toolsUrlPrefix += '/tools';
            }
            else {
                this.tool = shellParams.solution;
            }
        }
        AppBarService.toolsUrlPrefix = toolsUrlPrefix;
    };
    return ToolComponent;
}());
export { ToolComponent };
ToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-tool-component',
                template: "<div class=\"stretch-absolute\"><sme-cached-frames></sme-cached-frames><router-outlet></router-outlet></div>"
            },] },
];
/** @nocollapse */
ToolComponent.ctorParameters = function () { return [
    null,
    { type: ActivatedRoute, },
    { type: Router, },
    { type: IFrameService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3Rvb2xzL3Rvb2wvdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxjQUFBLEVBQXdDLGFBQUEsRUFBdUIsTUFBQSxFQUE0QixNQUFPLGlCQUFBLENBQWtCO0FBSTdILE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxnQ0FBQSxDQUFpQztBQUM5RCxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8sK0JBQUEsQ0FBZ0M7QUFDOUQsT0FBTyxFQUFFLHFCQUFBLEVBQXNCLE1BQU8sb0RBQUEsQ0FBcUQ7QUFDM0YsT0FBTyxFQUFFLGFBQUEsRUFBYyxNQUFPLDZCQUFBLENBQThCO0FBSTVEO0lBV0ksdUJBQ1ksVUFBNkIsRUFDN0IsS0FBcUIsRUFDckIsTUFBYyxFQUNkLGFBQTRCO1FBSDVCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBQzdCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNwQyxDQUFDO0lBVlMsNkJBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLDZCQUE2QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUN4RCxDQUFDO0lBU00sZ0NBQVEsR0FBZjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2FBQ2pDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssWUFBWSxhQUFhLEVBQTlCLENBQThCLENBQUM7YUFDL0MsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUNaLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFTSxtQ0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVNLHlDQUFpQixHQUF4QixVQUNJLFlBQW9DLEVBQ3BDLFlBQWlDLEVBQ2pDLFNBQStCO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUM5QyxxQkFBcUIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFFTyxrQ0FBVSxHQUFsQjtRQUNJLHdCQUF3QjtRQUN4QixJQUFJLFdBQVcsR0FBRyxZQUFZLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRixJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxlQUFlLEdBQUcsV0FBVyxDQUFDLG9CQUFvQixJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUM7WUFDakYsY0FBYyxHQUFNLGVBQWUsTUFBRyxDQUFDO1lBRXZDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxxQkFBcUIsR0FBRyxXQUFXLENBQUMsc0JBQXNCLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQztnQkFDN0YsY0FBYyxJQUFJLGlCQUFlLHFCQUFxQixTQUFJLFdBQVcsQ0FBQyxjQUFnQixDQUFDO1lBQzNGLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQzdCLGNBQWMsSUFBSSxRQUFRLENBQUM7WUFDL0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxDQUFDO1FBQ0wsQ0FBQztRQUNELGFBQWEsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQ2xELENBQUM7SUFjTCxvQkFBQztBQUFELENBM0VBLEFBMkVDOztBQWJNLHdCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFLDhHQUE0RzthQUN6SCxFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsNEJBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLElBQUk7SUFDSixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7SUFDeEIsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO0lBQ2hCLEVBQUMsSUFBSSxFQUFFLGFBQWEsR0FBRztDQUN0QixFQUw2RixDQUs3RixDQUFDIiwiZmlsZSI6InRvb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==