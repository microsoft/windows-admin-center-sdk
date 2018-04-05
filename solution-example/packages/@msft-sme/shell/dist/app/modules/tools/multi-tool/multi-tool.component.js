import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SplitViewComponent } from '../../../../angular';
import { EnvironmentModule } from '../../../../core';
import { RouteHelpers } from '../../../utility/route-helpers';
var MultiToolComponent = (function () {
    function MultiToolComponent(appContext, route, router) {
        this.appContext = appContext;
        this.route = route;
        this.router = router;
        this.strings = MsftSme.resourcesStrings().MsftSmeShell.App.Sidebar;
        this.filter = '';
        this.keywordMatches = {};
        this.tools = [];
        this.diffFilter = '';
    }
    MultiToolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initializeToolsList();
        this.paramsChangedSubscription = this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .subscribe(function (event) { _this.initializeToolsList(); });
    };
    MultiToolComponent.prototype.ngOnDestroy = function () {
        this.paramsChangedSubscription.unsubscribe();
    };
    MultiToolComponent.prototype.ngDoCheck = function () {
        if (this.filter !== this.diffFilter) {
            this.diffFilter = this.filter;
            this.filteredTools = this.filterTools();
        }
    };
    MultiToolComponent.prototype.canDeactivateTool = function (currentRoute, currentState, nextState) {
        return Observable.of(true);
    };
    MultiToolComponent.prototype.expandToolsByClickSearchBox = function () {
        var _this = this;
        if (!this.splitView.isExpanded) {
            this.splitView.togglePane();
            setTimeout(function () {
                _this.searchTextBox.nativeElement.focus();
            });
        }
    };
    MultiToolComponent.prototype.initializeToolsList = function () {
        var _this = this;
        var shellParams = RouteHelpers.getFullShellRoutingParameters(this.route.snapshot);
        if (this.routingParams
            && this.routingParams.solutionId === shellParams.solutionId
            && this.routingParams.connectionType === shellParams.connectionType
            && this.routingParams.connectionName === shellParams.connectionName) {
            // if there is nothing to update, then just stop here
            return;
        }
        this.routingParams = shellParams;
        var defaultTool = RouteHelpers.getDefaultToolForSolution(this.appContext, this.routingParams);
        var defaultToolId = defaultTool ? EnvironmentModule.createFormattedEntrypoint(defaultTool) : null;
        var baseUrl = RouteHelpers.getBaseToolsRoute(this.routingParams).join('/').substr(1); // remove first /
        this.tools = RouteHelpers.getToolsListFromShellParameters(this.appContext, this.routingParams).map(function (entryPoint) {
            return {
                id: EnvironmentModule.createFormattedEntrypoint(entryPoint),
                entryPoint: entryPoint,
                fontIcon: entryPoint.icon.startsWith('sme-icon:') ? entryPoint.icon.substr(9) : null,
                link: _this.getToolRoute(entryPoint, baseUrl)
            };
        }).sort(function (left, right) {
            if (left.id === defaultToolId) {
                return -1;
            }
            if (right.id === defaultToolId) {
                return 1;
            }
            return left.entryPoint.displayName.localeCompareIgnoreCase(right.entryPoint.displayName);
        });
        this.filteredTools = this.filterTools();
    };
    MultiToolComponent.prototype.filterTools = function () {
        this.keywordMatches = {};
        if (!this.tools || this.tools.length === 0) {
            return this.tools;
        }
        var tools = this.tools;
        if (!this.filter) {
            return tools;
        }
        var filter = this.filter.toLocaleLowerCase();
        return tools.filter(function (tool) {
            if (tool.entryPoint.displayName.toLocaleLowerCase().indexOf(filter) > -1) {
                return true;
            }
            // Uncomment the following to enable keyword searching
            // let matches = tool.keywords.filter(keyword => keyword.toLocaleLowerCase().indexOf(filter) > -1);
            // if (matches.length > 0) {
            //     this.keywordMatches[tool.name] = matches.join(', ');
            //     return true;
            // }
            return false;
        });
    };
    MultiToolComponent.prototype.getToolRoute = function (entryPoint, baseUrl) {
        var id = EnvironmentModule.createFormattedEntrypoint(entryPoint);
        var segment = EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(id, entryPoint.entryPointType);
        return baseUrl + "/" + segment;
    };
    return MultiToolComponent;
}());
export { MultiToolComponent };
MultiToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-multi-tool-component',
                template: "\n      <div class=\"stretch-absolute flex-layout\">\n          <sme-split-view orientation=\"left\" [isExpanded]=\"true\">\n              <sme-split-view-pane>\n                  <div class=\"tools-nav fixed-flex-size flex-layout vertical\" [ngClass]=\"{ collapsed: !splitView.isExpanded }\">\n                      <div class=\"tools-nav-title fixed-flex-size flex-layout\">\n                          <span class=\"auto-flex-size text\">{{strings.toolsTitle}}</span>\n                          <!-- TODO: support aria-expanded related accessiblity feature -->\n                          <button class=\"split-view-toggle fixed-flex-size\" (click)=\"splitView.togglePane()\" [title]=\"splitView.isExpanded?strings.collapse:strings.expand\">\n                              <span class=\"sme-icon\" [ngClass]=\"{ 'sme-icon-chevronLeft': splitView.isExpanded, 'sme-icon-chevronRight': !splitView.isExpanded }\"></span>\n                          </button>\n                      </div>\n                      <!-- TODO: considering support expanding the side bar when search box is focused, not only just when search box is clicked. -->\n                      <div class=\"searchbox searchbox-action-bar fixed-flex-size\" role=\"search\" [title]=\"strings.searchPlaceholder\" (click)=\"expandToolsByClickSearchBox()\">\n                          <div class=\"tool flex-layout search-button\" >\n                              <div class=\"tool-icon sme-icon sme-icon-search\"></div>\n                          </div>\n                          <input #searchTextBox type=\"search\" [(ngModel)]=\"filter\" [attr.placeholder]=\"splitView.isExpanded?strings.searchPlaceholder:''\"\n                              autofocus>\n                      </div>\n                      <nav class=\"auto-flex-size vertical-scroll-only sme-padding-bottom-sm\" role=\"navigation\" aria-labelledby=\"Left Navigation\">\n                          <a *ngFor=\"let tool of filteredTools\" [routerLink]=\"tool.link\" class=\"tool flex-layout\" [class.active]=\"router.isActive(tool.link)\"\n                          [attr.title]=\"!splitView.isExpanded?tool.entryPoint.displayName:''\"\n                              [class.sideloaded]=\"tool.entryPoint.parentModule && tool.entryPoint.parentModule.isSideLoaded\">\n                              <div *ngIf=\"tool.fontIcon\" class=\"tool-icon sme-icon {{tool.fontIcon}}\"></div>\n                              <div *ngIf=\"!tool.fontIcon\" class=\"tool-icon\" [style.background-image]=\"'url(' + tool.entryPoint.icon + ')'\"></div>\n                              <div class=\"tool-label\">\n                                  <div class=\"tool-title\">\n                                      <span [innerHtml]=\"tool.entryPoint.displayName | smeHighlight : filter\"></span>\n                                      <span *ngIf=\"tool.entryPoint.parentModule && tool.entryPoint.parentModule.isSideLoaded\">{{ strings.sideLoadWarning }}</span>\n                                  </div>\n                                  <!-- Uncomment the following to enable keyword searching -->\n                                  <!--<div class=\"keywords\" *ngIf=\"keywordMatches[tool.name]\" [innerHtml]=\"keywordMatches[tool.name] | smeHighlight : filter\"></div>-->\n                              </div>\n                          </a>\n                      </nav>\n                  </div>\n              </sme-split-view-pane>\n              <sme-split-view-content>\n                  <router-outlet></router-outlet>\n              </sme-split-view-content>\n          </sme-split-view>\n      </div>\n    ",
                styles: ["\n      .tools-nav {\n          background: white;\n          color: #262626; \n          min-width: 150px;\n          max-width: 350px;\n          height:100%;\n      }\n\n      .tools-nav.collapsed {\n          width: 55px;\n          min-width: initial;    \n          overflow:hidden;    \n      }\n\n      .tools-nav-title {\n          font-size: 20px;\n          font-weight: 600;\n          padding-left: 15px;  \n          overflow:hidden;  \n          height:44px;\n          color: #333;\n      }\n\n      .tools-nav.collapsed .tools-nav-title{\n          padding-left:0px;\n      }\n\n      .tools-nav-title .text {\n          line-height:44px;\n      }\n      .tools-nav.collapsed .tools-nav-title .text{\n          display:none;\n      }\n\n      .tool.search-button {\n          height:42px;\n          display:none;\n          cursor: pointer;\n      }\n\n      .tools-nav.collapsed .tool.search-button{\n          display:block;    \n      }\n\n      .searchbox {\n          margin: 6px 15px;    \n          position:relative;\n      }\n\n      .searchbox .tool-icon {\n          line-height:44px;\n      }\n\n      .tools-nav.collapsed .searchbox{\n          border:none;\n          margin-left:0;\n          padding-left:0; \n      }\n\n      .tools-nav.collapsed .searchbox input{\n          background:transparent;\n          height:36px;\n          cursor: pointer;    \n      }\n\n      .split-view-toggle {\n          background: transparent;\n          border: none;\n          width:44px;\n          height:44px;\n          font-size:19px;\n          padding: 8px;\n      }\n\n      .tools-nav.collapsed .split-view-toggle{\n          margin:0;\n          padding:0;\n          width:100%;\n      }\n\n      .tools-nav.collapsed nav{\n          margin-right:-50px;\n      }\n\n      .tool {\n          align-content: center;\n          align-items: center;\n          height: 36px;\n          width: 100%;\n          cursor: pointer;\n          white-space: nowrap;\n          font-size: 12px;\n          user-select: none;\n          padding: 0 15px 0 5px;\n          color: #262626;\n          border-left-width: 5px;\n          border-left-style: solid;\n          border-left-color: transparent;\n      }\n\n      .tool:hover, .tool:focus, .tool.active {\n          background: #F2FBFE;\n          color: black;\n      }\n\n      .tool:hover, .tool:focus {\n          text-decoration: underline;\n      }\n\n      .tool:focus{\n          outline: black dashed 1px;\n          outline-offset: -1px;    \n      }\n\n      .tool.active {\n          background: #E6F7FE;\n          border-left-color: #327cd4;    \n      }\n\n      .tool.sideloaded {\n          color: #f60;\n          font-weight: bold;\n      }\n\n      .tool.sideloaded.active {\n          border-left-color: #f60;\n          color: #f60;\n      }\n\n      .tool-label {\n          display: inline-block;\n          font-size: 13px;\n          margin-right: 15px;\n      }\n      .tools-nav.collapsed .tool-label {\n          display:none;    \n      }\n\n      .tool-title{\n          width: 227px;\n          overflow: hidden;\n          text-overflow: ellipsis;\n      }\n\n      .tool-icon {\n          height: 36px;\n          width: 36px;\n          min-width:36px;\n          box-sizing: content-box;\n          background-size: 18px;\n          background-position: center;\n          background-repeat: no-repeat;\n          display: inline-block;\n          font-size: 14px;\n          text-align: center;\n          line-height: 36px;\n          vertical-align: middle;\n      }\n\n      .keywords{\n          font-size: 10px;\n          font-style: italic;\n          font-weight: 300;\n      }\n    "]
            },] },
];
/** @nocollapse */
MultiToolComponent.ctorParameters = function () { return [
    null,
    { type: ActivatedRoute, },
    { type: Router, },
]; };
MultiToolComponent.propDecorators = {
    'splitView': [{ type: ViewChild, args: [SplitViewComponent,] },],
    'searchTextBox': [{ type: ViewChild, args: ['searchTextBox',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3Rvb2xzL211bHRpLXRvb2wvbXVsdGktdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBMEQsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUNwRyxPQUFPLEVBQUUsY0FBQSxFQUF3QyxhQUFBLEVBQWUsTUFBQSxFQUE0QixNQUFPLGlCQUFBLENBQWtCO0FBQ3JILE9BQU8sRUFBRSxVQUFBLEVBQXlCLE1BQU8sTUFBQSxDQUFPO0FBQ2hELE9BQU8sRUFBaUMsa0JBQUEsRUFBbUIsTUFBTyxxQkFBQSxDQUFzQjtBQUN4RixPQUFPLEVBS0gsaUJBQWlCLEVBR3BCLE1BQU0sa0JBQUEsQ0FBbUI7QUFFMUIsT0FBTyxFQUFFLFlBQUEsRUFBcUMsTUFBTyxnQ0FBQSxDQUFpQztBQVV0RjtJQWlCSSw0QkFDWSxVQUE2QixFQUM3QixLQUFxQixFQUN0QixNQUFjO1FBRmIsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFDN0IsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDdEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQW5CbEIsWUFBTyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ3ZFLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixtQkFBYyxHQUE4QixFQUFFLENBQUM7UUFTOUMsVUFBSyxHQUFtQixFQUFFLENBQUM7UUFFM0IsZUFBVSxHQUFHLEVBQUUsQ0FBQztJQU1LLENBQUM7SUFFdkIscUNBQVEsR0FBZjtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTthQUM5QyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLFlBQVksYUFBYSxFQUE5QixDQUE4QixDQUFDO2FBQy9D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