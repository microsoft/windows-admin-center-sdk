import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppContextService, SplitViewComponent } from '../../../../angular';
import { EnvironmentModule, EnvironmentModuleToolState } from '../../../../core';
import { ShellService } from '../../../shell.service';
import { RouteHelpers } from '../../../utility/route-helpers';
var MultiToolComponent = /** @class */ (function () {
    function MultiToolComponent(appContext, shellService, route, router) {
        var _this = this;
        this.appContext = appContext;
        this.shellService = shellService;
        this.route = route;
        this.router = router;
        this.strings = MsftSme.resourcesStrings().MsftSmeShell.App.Sidebar;
        this.filter = '';
        this.keywordMatches = {};
        this.filteredTools = [];
        this.shouldCollapseWhenSearchBoxBlured = false;
        this.tools = [];
        this.diffFilter = '';
        this.paramsChangedSubscription = this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .concatMap(function (event) { return _this.initializeToolsList(); })
            .subscribe();
    }
    MultiToolComponent.prototype.ngOnInit = function () {
        // this.initializeToolsList().subscribe();
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
            setTimeout(function () { return _this.searchTextBox.nativeElement.focus(); });
        }
    };
    MultiToolComponent.prototype.onSearchBoxFocused = function () {
        if (!this.splitView.isExpanded) {
            this.splitView.togglePane();
            this.shouldCollapseWhenSearchBoxBlured = true;
        }
    };
    MultiToolComponent.prototype.onSearchBoxBlured = function () {
        var _this = this;
        if (this.shouldCollapseWhenSearchBoxBlured) {
            this.shouldCollapseWhenSearchBoxBlured = false;
            this.splitView.togglePane();
            setTimeout(function () { return _this.navigationContainer.nativeElement.scrollLeft = 0; });
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
            return Observable.of(null);
        }
        this.routingParams = shellParams;
        var defaultTool = RouteHelpers.getDefaultToolForSolution(this.appContext, this.routingParams);
        var defaultToolId = defaultTool ? EnvironmentModule.createFormattedEntrypoint(defaultTool) : null;
        var baseUrl = RouteHelpers.getBaseToolsRoute(this.routingParams).join('/').substr(1); // remove first /
        return RouteHelpers.queryToolsListFromShellParameters(this.appContext, this.shellService.inventoryCaches, this.routingParams)
            .map(function (tools) {
            _this.tools = tools
                .filter(function (item) { return item.show; })
                .map(function (item) {
                return {
                    id: EnvironmentModule.createFormattedEntrypoint(item),
                    entryPoint: item,
                    fontIcon: item.icon.startsWith('sme-icon:') ? item.icon.substr(9) : null,
                    link: _this.getToolRoute(item, baseUrl),
                    disabled: item.detail === EnvironmentModuleToolState.NotConfigured,
                    message: item.message
                };
            })
                .sort(function (left, right) {
                if (left.id === defaultToolId) {
                    return -1;
                }
                if (right.id === defaultToolId) {
                    return 1;
                }
                return left.entryPoint.displayName.localeCompareIgnoreCase(right.entryPoint.displayName);
            });
            _this.filteredTools = _this.filterTools();
            return null;
        });
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
    MultiToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-multi-tool-component',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-arrange-stack-h\">\n          <sme-split-view orientation=\"left\" [isExpanded]=\"true\">\n              <sme-split-view-pane>\n                  <div #navigationContainer class=\"tools-nav sme-position-flex-none sme-arrange-stack-v sme-focus-zone\" [ngClass]=\"{ collapsed: !splitView.isExpanded }\">\n                      <div class=\"tools-nav-title sme-position-flex-none sme-arrange-stack-h\">\n                          <span class=\"sme-position-flex-auto text\">{{strings.toolsTitle}}</span>\n                          <!-- TODO: support aria-expanded related accessiblity feature -->\n                          <button class=\"split-view-toggle sme-button-trigger sme-button-auto-width sme-position-flex-none\" (click)=\"splitView.togglePane()\"\n                              [title]=\"splitView.isExpanded?strings.collapse:strings.expand\">\n                              <span class=\"sme-icon\" [ngClass]=\"{ 'sme-icon-chevronLeft': splitView.isExpanded, 'sme-icon-chevronRight': !splitView.isExpanded }\"></span>\n                          </button>\n                      </div>\n                      <!-- TODO: considering support expanding the side bar when search box is focused, not only just when search box is clicked. -->\n                      <div class=\"searchbox searchbox-action-bar sme-position-flex-none\" role=\"search\" [title]=\"strings.searchPlaceholder\" (click)=\"expandToolsByClickSearchBox()\">\n                          <div class=\"tool sme-arrange-stack-h search-button\">\n                              <div class=\"tool-icon sme-icon sme-icon-search\"></div>\n                          </div>\n                          <input #searchTextBox type=\"search\" [(ngModel)]=\"filter\" [attr.placeholder]=\"splitView.isExpanded?strings.searchPlaceholder:''\"\n                              autofocus (focus)=\"onSearchBoxFocused()\" (blur)=\"onSearchBoxBlured()\">\n                      </div>\n                      <nav class=\"sme-position-flex-auto sme-arrange-overflow-hide-x sme-arrange-overflow-auto-y sme-padding-bottom-sm\" role=\"navigation\"\n                          [attr.aria-label]=\"strings.Nav.Landmark.Secondary.aria.label\">\n                          <a tabindex=0 *ngFor=\"let tool of filteredTools\" [routerLink]=\"tool.link\" class=\"tool sme-arrange-stack-h\" [class.active]=\"router.isActive(tool.link)\"\n                              [attr.title]=\"!splitView.isExpanded?tool.entryPoint.displayName:''\" [class.sideloaded]=\"tool.entryPoint.parentModule && tool.entryPoint.parentModule.isSideLoaded\">\n                              <div *ngIf=\"tool.fontIcon\" class=\"tool-icon sme-icon {{tool.fontIcon}}\"></div>\n                              <div *ngIf=\"!tool.fontIcon\" class=\"tool-icon\" [style.background-image]=\"'url(' + tool.entryPoint.icon + ')'\"></div>\n                              <div class=\"tool-label\">\n                                  <div class=\"tool-title\">\n                                      <span [innerHtml]=\"tool.entryPoint.displayName | smeHighlight : filter\"></span>\n                                      <span *ngIf=\"tool.entryPoint.parentModule && tool.entryPoint.parentModule.isSideLoaded\">{{ strings.sideLoadWarning }}</span>\n                                  </div>\n                                  <!-- Uncomment the following to enable keyword searching -->\n                                  <!--<div class=\"keywords\" *ngIf=\"keywordMatches[tool.name]\" [innerHtml]=\"keywordMatches[tool.name] | smeHighlight : filter\"></div>-->\n                              </div>\n                          </a>\n                          <br/>\n                      </nav>\n                  </div>\n              </sme-split-view-pane>\n              <sme-split-view-content>\n                  <router-outlet></router-outlet>\n              </sme-split-view-content>\n          </sme-split-view>\n      </div>\n    ",
                    styles: ["\n      .tools-nav {\n          background: white;\n          color: #262626;\n          min-width: 150px;\n          max-width: 350px;\n          height: 100%;\n      }\n\n      .tools-nav.collapsed {\n          width: 55px;\n          min-width: initial;\n          overflow: hidden;\n      }\n\n      .tools-nav-title {\n          font-size: 20px;\n          font-weight: 600;\n          padding-left: 15px;\n          overflow: hidden;\n          height: 44px;\n          color: #333;\n      }\n\n      .tools-nav.collapsed .tools-nav-title {\n          padding-left: 0px;\n      }\n\n      .tools-nav-title .text {\n          line-height: 44px;\n      }\n\n      .tools-nav.collapsed .tools-nav-title .text {\n          display: none;\n      }\n\n      .tool.search-button {\n          height: 42px;\n          display: none;\n          cursor: pointer;\n      }\n\n      .tools-nav.collapsed .tool.search-button {\n          display: block;\n      }\n\n      .searchbox {\n          margin: 6px 15px;\n          position: relative;\n      }\n\n      .searchbox .tool-icon {\n          line-height: 44px;\n      }\n\n      .tools-nav.collapsed .searchbox {\n          border: none;\n          margin-left: 0;\n          padding-left: 0;\n      }\n\n      .tools-nav.collapsed .searchbox input {\n          background: transparent;\n          height: 36px;\n          cursor: pointer;\n      }\n\n      .split-view-toggle {\n          background: transparent;\n          border: none;\n          width: 44px;\n          height: 44px;\n          font-size: 19px;\n          padding: 8px;\n      }\n\n      .tools-nav.collapsed .split-view-toggle {\n          margin: 0;\n          padding: 0;\n          width: 100%;\n      }\n\n      .tools-nav.collapsed nav {\n          margin-right: -50px;\n      }\n\n      .tool {\n          align-content: center;\n          align-items: center;\n          height: 36px;\n          width: 100%;\n          cursor: pointer;\n          white-space: nowrap;\n          font-size: 12px;\n          user-select: none;\n          padding: 0 15px 0 5px;\n          color: #262626;\n          border-left-width: 5px;\n          border-left-style: solid;\n          border-left-color: transparent;\n      }\n\n      .tool:hover,\n      .tool:focus,\n      .tool.active {\n          background: #F2FBFE;\n          color: black;\n      }\n\n      .tool:hover,\n      .tool:focus {\n          text-decoration: underline;\n      }\n\n      .tool:focus {\n          outline: black dashed 1px;\n          outline-offset: -1px;\n      }\n\n      .tool.active {\n          background: #E6F7FE;\n          border-left-color: #327cd4;\n      }\n\n      .tool.sideloaded {\n          color: #f60;\n          font-weight: bold;\n      }\n\n      .tool.sideloaded.active {\n          border-left-color: #f60;\n          color: #f60;\n      }\n\n      .tool-label {\n          display: inline-block;\n          font-size: 13px;\n          margin-right: 15px;\n      }\n\n      .tools-nav.collapsed .tool-label {\n          display: none;\n      }\n\n      .tool-title {\n          width: 227px;\n          overflow: hidden;\n          text-overflow: ellipsis;\n      }\n\n      .tool-icon {\n          height: 36px;\n          width: 36px;\n          min-width: 36px;\n          box-sizing: content-box;\n          background-size: 18px;\n          background-position: center;\n          background-repeat: no-repeat;\n          display: inline-block;\n          font-size: 14px;\n          text-align: center;\n          line-height: 36px;\n          vertical-align: middle;\n      }\n\n      .keywords {\n          font-size: 10px;\n          font-style: italic;\n          font-weight: 300;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    MultiToolComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: ShellService, },
        { type: ActivatedRoute, },
        { type: Router, },
    ]; };
    MultiToolComponent.propDecorators = {
        'navigationContainer': [{ type: ViewChild, args: ['navigationContainer',] },],
        'splitView': [{ type: ViewChild, args: [SplitViewComponent,] },],
        'searchTextBox': [{ type: ViewChild, args: ['searchTextBox',] },],
    };
    return MultiToolComponent;
}());
export { MultiToolComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3Rvb2xzL211bHRpLXRvb2wvbXVsdGktdG9vbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBMEQsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUNwRyxPQUFPLEVBQUUsY0FBQSxFQUF3QyxhQUFBLEVBQWUsTUFBQSxFQUE0QixNQUFPLGlCQUFBLENBQWtCO0FBQ3JILE9BQU8sRUFBRSxVQUFBLEVBQXlCLE1BQU8sTUFBQSxDQUFPO0FBQ2hELE9BQU8sRUFBRSxpQkFBQSxFQUErQixrQkFBQSxFQUFtQixNQUFPLHFCQUFBLENBQXNCO0FBQ3hGLE9BQU8sRUFLSCxpQkFBaUIsRUFFakIsMEJBQTBCLEVBRTdCLE1BQU0sa0JBQUEsQ0FBbUI7QUFFMUIsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLHdCQUFBLENBQXlCO0FBQ3RELE9BQU8sRUFBRSxZQUFBLEVBQXFDLE1BQU8sZ0NBQUEsQ0FBaUM7QUFVdEY7SUFxQkksNEJBQ2dCLFVBQTZCLEVBQzdCLFlBQTBCLEVBQzFCLEtBQXFCLEVBQ3RCLE1BQWM7UUFKN0IsaUJBU0M7UUFSZSxlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUM3QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBeEJ0QixZQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDdkUsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLG1CQUFjLEdBQThCLEVBQUUsQ0FBQztRQUMvQyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFXbEMsc0NBQWlDLEdBQUcsS0FBSyxDQUFDO1FBQzFDLFVBQUssR0FBbUIsRUFBRSxDQUFDO1FBRTNCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFRcEIsSUFBSSxDQUFDLHlCQUF5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Q0FBQyxVQUFBLElBQUk7WUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFFRCxzREFBc0Q7WUFDdEQsbUdBQW1HO1lBRW5HLDRCQUE0QjtZQUM1QiwyREFBMkQ7WUFDM0QsbUJBQW1CO1lBQ25CLElBQUk7WUFFSixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHlDQUFZLEdBQW5CLFVBQW9CLFVBQXVDLEVBQUUsT0FBZTtRQUN4RSxJQUFJLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRSxJQUFJLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxrQ0FBa0MsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xHLE1BQU0sQ0FBSSxPQUFPLFNBQUksT0FBUyxDQUFDO0lBQ25DLENBQUM7SUFDRSw2QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFFBQVEsRUFBRSx1NkhBNkNUO29CQUNELE1BQU0sRUFBRSxDQUFDLG9wSEEwS1IsQ0FBQztpQkFDTCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsaUNBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO1FBQzNCLEVBQUMsSUFBSSxFQUFFLFlBQVksR0FBRztRQUN0QixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7UUFDeEIsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO0tBQ2YsRUFMNkYsQ0FLN0YsQ0FBQztJQUNLLGlDQUFjLEdBQTJDO1FBQ2hFLHFCQUFxQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLHFCQUFxQixFQUFHLEVBQUUsRUFBRTtRQUM5RSxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsa0JBQWtCLEVBQUcsRUFBRSxFQUFFO1FBQ2pFLGVBQWUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUcsRUFBRSxFQUFFO0tBQ2pFLENBQUM7SUFDRix5QkFBQztDQXhZRCxBQXdZQyxJQUFBO1NBeFlZLGtCQUFrQiIsImZpbGUiOiJtdWx0aS10b29sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=