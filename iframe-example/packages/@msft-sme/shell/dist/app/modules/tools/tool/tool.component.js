import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppContextService } from '../../../../angular';
import { RouteHelpers } from '../../../utility/route-helpers';
import { AppBarService } from '../../app-bar/app-bar.service';
import { CachedFramesComponent } from '../../iframe/cached-frames/cached-frames.component';
import { IFrameService } from '../../iframe/iframe.service';
var ToolComponent = /** @class */ (function () {
    function ToolComponent(appContext, route, router, iFrameService) {
        var _this = this;
        this.appContext = appContext;
        this.route = route;
        this.router = router;
        this.iFrameService = iFrameService;
        this.subscription = this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .subscribe(function (event) {
            _this.updateTool();
        });
    }
    ToolComponent.navigationTitle = function (appContextService, snapshot) {
        var params = RouteHelpers.getFullShellRoutingParameters(snapshot);
        return params.tool ? params.tool.displayName : null;
    };
    ToolComponent.prototype.ngOnInit = function () {
        this.updateTool();
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
    ToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-tool-component',
                    template: "<div class=\"sme-layout-absolute sme-position-inset-none\">\n        <sme-cached-frames></sme-cached-frames>\n        <router-outlet></router-outlet>\n    </div>"
                },] },
    ];
    /** @nocollapse */
    ToolComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: ActivatedRoute, },
        { type: Router, },
        { type: IFrameService, },
    ]; };
    return ToolComponent;
}());
export { ToolComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3Rvb2xzL3Rvb2wvdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxjQUFBLEVBQXdDLGFBQUEsRUFBdUIsTUFBQSxFQUE0QixNQUFPLGlCQUFBLENBQWtCO0FBRTdILE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLHFCQUFBLENBQXNCO0FBRXhELE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxnQ0FBQSxDQUFpQztBQUM5RCxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8sK0JBQUEsQ0FBZ0M7QUFDOUQsT0FBTyxFQUFFLHFCQUFBLEVBQXNCLE1BQU8sb0RBQUEsQ0FBcUQ7QUFDM0YsT0FBTyxFQUFFLGFBQUEsRUFBYyxNQUFPLDZCQUFBLENBQThCO0FBSTVEO0lBV0ksdUJBQ2dCLFVBQTZCLEVBQzdCLEtBQXFCLEVBQ3JCLE1BQWMsRUFDZCxhQUE0QjtRQUo1QyxpQkFVQztRQVRlLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBQzdCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUN4QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTthQUNqQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLFlBQVksYUFBYSxFQUE5QixDQUE4QixDQUFDO2FBQy9DLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDWixLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBZmEsNkJBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLDZCQUE2QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3hELENBQUM7SUFjTSxnQ0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxtQ0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVNLHlDQUFpQixHQUF4QixVQUNJLFlBQW9DLEVBQ3BDLFlBQWlDLEVBQ2pDLFNBQStCO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUM5QyxxQkFBcUIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFFTyxrQ0FBVSxHQUFsQjtRQUNJLHdCQUF3QjtRQUN4QixJQUFJLFdBQVcsR0FBRyxZQUFZLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRixJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxlQUFlLEdBQUcsV0FBVyxDQUFDLG9CQUFvQixJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUM7WUFDakYsY0FBYyxHQUFNLGVBQWUsTUFBRyxDQUFDO1lBRXZDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxxQkFBcUIsR0FBRyxXQUFXLENBQUMsc0JBQXNCLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQztnQkFDN0YsY0FBYyxJQUFJLGlCQUFlLHFCQUFxQixTQUFJLFdBQVcsQ0FBQyxjQUFnQixDQUFDO1lBQzNGLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQzdCLGNBQWMsSUFBSSxRQUFRLENBQUM7WUFDL0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxDQUFDO1FBQ0wsQ0FBQztRQUNELGFBQWEsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQ2xELENBQUM7SUFDRSx3QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxtS0FHSDtpQkFDVixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsNEJBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO1FBQzNCLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztRQUN4QixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUsYUFBYSxHQUFHO0tBQ3RCLEVBTDZGLENBSzdGLENBQUM7SUFDRixvQkFBQztDQTlFRCxBQThFQyxJQUFBO1NBOUVZLGFBQWEiLCJmaWxlIjoidG9vbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9