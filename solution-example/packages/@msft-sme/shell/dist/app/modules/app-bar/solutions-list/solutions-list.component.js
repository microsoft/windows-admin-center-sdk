import { Component, isDevMode } from '@angular/core';
import { ConnectionChangeType, EnvironmentModule } from '../../../../core';
// TODO: remove this hard coded Priority and 
var solutionModules = {
    serverManager: 'msft.sme.server-manager!servers',
    clientManager: 'msft.sme.server-manager!windowsClients',
    failoverCluster: 'msft.sme.failover-cluster!failover-cluster',
    softwareDefinedDataCenter: 'msft.sme.software-defined-data-center!SDDC'
};
var SolutionsListComponent = (function () {
    /**
     * Initializes a new instance of the NavigationComponent class.
     *
     * @param appContextService the application context service.
     */
    function SolutionsListComponent(appContextService) {
        this.appContextService = appContextService;
        this.strings = MsftSme.resourcesStrings().MsftSmeShell.App.SolutionsList;
        this.showDevMode = isDevMode();
        this.isMenuExpanded = false;
        this.solutions = [];
        this.extensionsSolution = null;
        this.connectionMap = EnvironmentModule.getConnectionMap();
    }
    SolutionsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.connectionMap = EnvironmentModule.getConnectionMap();
        this.solutions = EnvironmentModule.getEntryPointsByType(['solution'])
            .filter(function (entryPoint) { return _this.getSolutionRootPath(entryPoint) != null; })
            .map(function (entryPoint) {
            return {
                entryPoint: entryPoint,
                fontIcon: entryPoint.icon.startsWith('sme-icon:') ? entryPoint.icon.substr(9) : null,
                link: _this.getSolutionRootPath(entryPoint),
                moduleName: entryPoint.parentModule.name
            };
        });
        var extensionsSolutionIndex = this.solutions.findIndex(function (ep) { return ep.entryPoint.parentModule.name === 'msft.sme.extension-manager'; });
        if (extensionsSolutionIndex > -1) {
            this.extensionsSolution = this.solutions.splice(extensionsSolutionIndex, 1).first();
        }
        // sort solutions based on priorities
        var priorities = [
            solutionModules.serverManager,
            solutionModules.clientManager,
            solutionModules.failoverCluster,
            solutionModules.softwareDefinedDataCenter
        ];
        this.solutions.sort(function (left, right) {
            var leftEntryPointId = EnvironmentModule.createFormattedEntrypoint(left.entryPoint);
            var rightEntryPointId = EnvironmentModule.createFormattedEntrypoint(right.entryPoint);
            for (var _i = 0, priorities_1 = priorities; _i < priorities_1.length; _i++) {
                var item = priorities_1[_i];
                if (leftEntryPointId === item) {
                    return -1;
                }
                if (rightEntryPointId === item) {
                    return 1;
                }
            }
            return left.entryPoint.displayName.localeCompareIgnoreCase(right.entryPoint.displayName);
        });
        this.connection = this.appContextService.connectionManager.activeConnection;
        this.activeConnectionChangedSubscription = this.appContextService.connectionManager.connectionsChanged
            .filter(function (event) { return event.type === ConnectionChangeType.Activated; })
            .subscribe(function (event) {
            _this.connection = event.connection;
        });
    };
    SolutionsListComponent.prototype.ngOnDestroy = function () {
        this.activeConnectionChangedSubscription.unsubscribe();
    };
    SolutionsListComponent.prototype.getSolutionRootPath = function (entryPoint) {
        var moduleEntrySegment = EnvironmentModule.createFormattedEntrypoint(entryPoint);
        var friendlySegment = EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(moduleEntrySegment, entryPoint.entryPointType);
        if (entryPoint.rootNavigationBehavior === 'path') {
            return "/" + friendlySegment;
        }
        else if (entryPoint.rootNavigationBehavior === 'connections') {
            return "/" + friendlySegment + "/connections";
        }
        return null;
    };
    return SolutionsListComponent;
}());
export { SolutionsListComponent };
SolutionsListComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-solutions-list',
                template: "\n      <div class=\"flex-layout vertical solutions-list-container\">\n          <div *ngIf=\"solutions && solutions.length > 0\" class=\"fixed-flex-size solutions-list-title\">{{strings.installedSolutions}}</div>\n          <nav class=\"auto-flex-size solutions-list\">\n              <a *ngFor=\"let app of solutions\" class=\"solution flex-layout\" [routerLink]=\"app.link\" routerLinkActive=\"active\"\n                  [class.sideloaded]=\"app.entryPoint.parentModule.isSideLoaded\">\n                  <div *ngIf=\"app.fontIcon\" class=\"solution-icon fixed-flex-size sme-icon {{app.fontIcon}}\" title=\"{{app.entryPoint.displayName}}\"></div>\n                  <div *ngIf=\"!app.fontIcon\" class=\"solution-icon fixed-flex-size\" [style.background-image]=\"'url(' + app.entryPoint.icon + ')'\"></div>\n                  <div class=\"solution-label auto-flex-size\">\n                      <span>{{app.entryPoint.displayName}}</span>\n                      <span *ngIf=\"app.entryPoint.parentModule.isSideLoaded\">{{strings.sideLoadWarning}}</span>\n                  </div>\n              </a>\n              <!-- <a *ngIf=\"extensionsSolution\" class=\"solution flex-layout extensions-solution\" [routerLink]=\"extensionsSolution.link\" routerLinkActive=\"active\"\n                  [class.sideloaded]=\"extensionsSolution.entryPoint.parentModule.isSideLoaded\">\n                  <div *ngIf=\"extensionsSolution.fontIcon\" class=\"solution-icon fixed-flex-size sme-icon {{extensionsSolution.fontIcon}}\" [title]=\"strings.getMore\"></div>\n                  <div *ngIf=\"!extensionsSolution.fontIcon\" class=\"solution-icon fixed-flex-size\" [style.background-image]=\"'url(' + extensionsSolution.entryPoint.icon + ')'\"></div>\n                  <div class=\"solution-label auto-flex-size\">\n                      <span>{{strings.getMore}}</span>\n                      <span *ngIf=\"extensionsSolution.entryPoint.parentModule.isSideLoaded\">{{strings.sideLoadWarning}}</span>\n                  </div>\n              </a> -->\n\n              <a *ngIf=\"showDevMode\" class=\"solution flex-layout dev-mode\" routerLink=\"/dev\" routerLinkActive=\"active\">\n                  <div class=\"solution-icon fixed-flex-size sme-icon sme-icon-developerTools\"></div>\n                  <div class=\"solution-label auto-flex-size\">\n                      Dev Guide\n                  </div>\n              </a>\n\n          </nav>\n      </div>\n    ",
                styles: ["\n\n      .solutions-list-container {\n          max-height: calc(100vh - 50px);\n      }\n\n      .solutions-list-title {\n          color: #878787;\n          line-height: 36px;\n          margin: 0 12px;\n          font-size: 12px;\n      }\n\n      .solutions-list{\n          overflow-y: auto;\n          overflow-x: hidden;\n          padding-bottom: 5px;\n      }\n\n      .solution {\n          height: 48px;\n          width: 100%;\n          cursor: pointer;\n          white-space: nowrap;\n          color:white;\n          font-size: 12px;\n          user-select: none;\n      }\n\n      .solution:hover, .solution:focus, .solution.active {\n          background: #565656;\n          color:white;\n          text-decoration: none;\n      }\n\n      .solution.sideloaded{\n          color: #f60;\n          font-weight: bold;\n      }\n\n      .solution-icon {\n          width: 48px;\n          background-size: 18px;\n          background-position: center;\n          background-repeat: no-repeat;\n          display: inline-block;\n          text-align: center;\n          line-height: 48px;\n          vertical-align: middle;\n      }\n\n      .solution-label{\n          font-size: 13px;\n          margin-right: 15px;\n      }\n\n      .solution.extensions-solution,\n      .solution.dev-mode {\n          border-top: 1px solid #878787;\n      }\n    "]
            },] },
];
/** @nocollapse */
SolutionsListComponent.ctorParameters = function () { return [
    null,
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcC1iYXIvc29sdXRpb25zLWxpc3Qvc29sdXRpb25zLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVcsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFJeEUsT0FBTyxFQUdILG9CQUFvQixFQUVwQixpQkFBaUIsRUFFcEIsTUFBTSxrQkFBQSxDQUFtQjtBQVUxQiw2Q0FBNkM7QUFDN0MsSUFBTSxlQUFBLEdBQWtCO0lBQ3BCLGFBQWEsRUFBRSxpQ0FBQTtJQUNmLGFBQWEsRUFBRSx3Q0FBQTtJQUNmLGVBQWUsRUFBRSw0Q0FBQTtJQUNqQix5QkFBeUIsRUFBRSw0Q0FBQTtDQUM5QixDQUFDO0FBR0Y7SUFVSTs7OztPQUlHO0lBQ0gsZ0NBQW9CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBZGpELFlBQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUM3RSxnQkFBVyxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQzFCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXZCLGNBQVMsR0FBdUIsRUFBRSxDQUFDO1FBQ25DLHVCQUFrQixHQUFxQixJQUFJLENBQUM7UUFFM0Msa0JBQWEsR0FBc0QsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQU9wRCxDQUFDO0lBRXRELHlDQUFRLEdBQWY7UUFBQSxpQkErQ0M7UUE5Q0csSUFBSSxDQUFDLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFELElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoRSxNQUFNLENBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxFQUE1QyxDQUE0QyxDQUFDO2FBQ2xFLEdBQUcsQ0FBQyxVQUFBLFVBQVU7WUFDWCxNQUFNLENBQUM7Z0JBQ0gsVUFBVSxFQUFFLFVBQVU7Z0JBQ3RCLFFBQVEsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJO2dCQUNwRixJQUFJLEVBQUUsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQztnQkFDMUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSTthQUMzQyxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFDUCxJQUFJLHVCQUF1QixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxLQUFLLDRCQUE0QixFQUFoRSxDQUFnRSxDQUFDLENBQUM7UUFDL0gsRUFBRSxDQUFDLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4RixDQUFDO1FBRUQscUNBQXFDO1FBQ3JDLElBQUksVUFBVSxHQUFHO1lBQ2IsZUFBZSxDQUFDLGFBQWE7WUFDN0IsZUFBZSxDQUFDLGFBQWE7WUFDN0IsZUFBZSxDQUFDLGVBQWU7WUFDL0IsZUFBZSxDQUFDLHlCQUF5QjtTQUM1QyxDQUFDO1FBRUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSztZQUM1QixJQUFJLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwRixJQUFJLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0RixHQUFHLENBQUMsQ0FBYSxVQUFVLEVBQVYseUJBQVUsRUFBVix3QkFBVSxFQUFWLElBQVU7Z0JBQXRCLElBQUksSUFBSSxtQkFBQTtnQkFDVCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUM1QixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRCxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUM3QixNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNiLENBQUM7YUFDSjtZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdGLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUM7UUFDNUUsSUFBSSxDQUFDLG1DQUFtQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0I7YUFDakcsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLElBQUksS0FBSyxvQkFBb0IsQ0FBQyxTQUFTLEVBQTdDLENBQTZDLENBQUM7YUFDOUQsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUNaLEtBQUksQ0FBQyxVQUFVLEdBQTRCLEtBQU0sQ0FBQyxVQUFVLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sNENBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsbUNBQW1DLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0QsQ0FBQztJQUVPLG9EQUFtQixHQUEzQixVQUE0QixVQUF1QztRQUMvRCxJQUFJLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pGLElBQUksZUFBZSxHQUFHLGlCQUFpQixDQUFDLGtDQUFrQyxDQUFDLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxSCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUMsTUFBSSxlQUFpQixDQUFDO1FBQ2pDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLHNCQUFzQixLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDN0QsTUFBTSxDQUFDLE1BQUksZUFBZSxpQkFBYyxDQUFDO1FBQzdDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUF3R0wsNkJBQUM7QUFBRCxDQXZMQSxBQXVMQzs7QUF2R00saUNBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUUsODVFQWdDVDtnQkFDRCxNQUFNLEVBQUUsQ0FBQywyMUNBNERSLENBQUM7YUFDTCxFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gscUNBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLElBQUk7Q0FDSCxFQUY2RixDQUU3RixDQUFDIiwiZmlsZSI6InNvbHV0aW9ucy1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=