import { Component, isDevMode } from '@angular/core';
import { AppContextService } from '../../../../angular';
import { ConnectionChangeType, EnvironmentModule } from '../../../../core';
// TODO: remove this hard coded Priority and 
var solutionModules = {
    serverManager: 'msft.sme.server-manager!servers',
    clientManager: 'msft.sme.server-manager!windowsClients',
    failoverCluster: 'msft.sme.failover-cluster!failover-cluster',
    softwareDefinedDataCenter: 'msft.sme.software-defined-data-center!SDDC'
};
var SolutionsListComponent = /** @class */ (function () {
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
    SolutionsListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-solutions-list',
                    template: "\n      <nav class=\"sme-arrange-stack-v\">\n          <div *ngIf=\"solutions && solutions.length > 0\" class=\"sme-position-flex-auto sme-padding-left-sm\">\n              <label>{{strings.installedSolutions}}</label>\n          </div>\n          <a *ngFor=\"let app of solutions\" class=\"sme-scheme-nav-menu-item sme-padding-squish-v-sm sme-arrange-stack-h sme-arrange-ws-nowrap\"\n              [routerLink]=\"app.link\" routerLinkActive=\"sme-active\" [class.sme-scheme-sideloaded]=\"app.entryPoint.parentModule.isSideLoaded\" role=\"button\">\n              <div *ngIf=\"app.fontIcon\" class=\"sme-position-flex-none sme-icon {{app.fontIcon}} sme-margin-right-xs\"></div>\n              <div *ngIf=\"!app.fontIcon\" class=\"sme-position-flex-none sme-margin-right-xs\" [style.background-image]=\"'url(' + app.entryPoint.icon + ')'\"></div>\n              <div class=\"sme-position-flex-auto\">\n                  <span>{{app.entryPoint.displayName}}</span>\n                  <span *ngIf=\"app.entryPoint.parentModule.isSideLoaded\">{{strings.sideLoadWarning}}</span>\n              </div>\n          </a>\n          <hr/>\n          <a *ngIf=\"showDevMode\" class=\"sme-scheme-nav-menu-item sme-padding-squish-v-sm sme-arrange-stack-h sme-arrange-ws-nowrap\"\n              routerLink=\"/dev\" routerLinkActive=\"sme-active\">\n              <div class=\"sme-position-flex-none sme-icon sme-icon-developerTools sme-margin-right-xs\"></div>\n              <div class=\"sme-position-flex-auto\">\n                  Dev Guide\n              </div>\n          </a>\n      </nav>\n    "
                },] },
    ];
    /** @nocollapse */
    SolutionsListComponent.ctorParameters = function () { return [
        { type: AppContextService, },
    ]; };
    return SolutionsListComponent;
}());
export { SolutionsListComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcC1iYXIvc29sdXRpb25zLWxpc3Qvc29sdXRpb25zLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVcsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFHeEUsT0FBTyxFQUFFLGlCQUFBLEVBQThCLE1BQU8scUJBQUEsQ0FBc0I7QUFDcEUsT0FBTyxFQUdILG9CQUFvQixFQUVwQixpQkFBaUIsRUFFcEIsTUFBTSxrQkFBQSxDQUFtQjtBQVUxQiw2Q0FBNkM7QUFDN0MsSUFBTSxlQUFBLEdBQWtCO0lBQ3BCLGFBQWEsRUFBRSxpQ0FBQTtJQUNmLGFBQWEsRUFBRSx3Q0FBQTtJQUNmLGVBQWUsRUFBRSw0Q0FBQTtJQUNqQix5QkFBeUIsRUFBRSw0Q0FBQTtDQUM5QixDQUFDO0FBR0Y7SUFVSTs7OztPQUlHO0lBQ0gsZ0NBQW9CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBZGpELFlBQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUM3RSxnQkFBVyxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQzFCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXZCLGNBQVMsR0FBdUIsRUFBRSxDQUFDO1FBQ25DLHVCQUFrQixHQUFxQixJQUFJLENBQUM7UUFFM0Msa0JBQWEsR0FBc0QsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQU9wRCxDQUFDO0lBRXRELHlDQUFRLEdBQWY7UUFBQSxpQkErQ0M7UUE5Q0csSUFBSSxDQUFDLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFELElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoRSxNQUFNLENBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxFQUE1QyxDQUE0QyxDQUFDO2FBQ2xFLEdBQUcsQ0FBQyxVQUFBLFVBQVU7WUFDWCxNQUFNLENBQUM7Z0JBQ0gsVUFBVSxFQUFFLFVBQVU7Z0JBQ3RCLFFBQVEsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQ3BGLElBQUksRUFBRSxLQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDO2dCQUMxQyxVQUFVLEVBQUUsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJO2FBQzNDLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUNQLElBQUksdUJBQXVCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssNEJBQTRCLEVBQWhFLENBQWdFLENBQUMsQ0FBQztRQUMvSCxFQUFFLENBQUMsQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hGLENBQUM7UUFFRCxxQ0FBcUM7UUFDckMsSUFBSSxVQUFVLEdBQUc7WUFDYixlQUFlLENBQUMsYUFBYTtZQUM3QixlQUFlLENBQUMsYUFBYTtZQUM3QixlQUFlLENBQUMsZUFBZTtZQUMvQixlQUFlLENBQUMseUJBQXlCO1NBQzVDLENBQUM7UUFFRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLO1lBQzVCLElBQUksZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BGLElBQUksaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3RGLEdBQUcsQ0FBQyxDQUFhLFVBQVUsRUFBVix5QkFBVSxFQUFWLHdCQUFVLEVBQVYsSUFBVTtnQkFBdEIsSUFBSSxJQUFJLG1CQUFBO2dCQUNULEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZCxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzdCLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQzthQUNKO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM1RSxJQUFJLENBQUMsbUNBQW1DLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLGtCQUFrQjthQUNqRyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxLQUFLLG9CQUFvQixDQUFDLFNBQVMsRUFBN0MsQ0FBNkMsQ0FBQzthQUM5RCxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ1osS0FBSSxDQUFDLFVBQVUsR0FBNEIsS0FBTSxDQUFDLFVBQVUsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFTSw0Q0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMzRCxDQUFDO0lBRU8sb0RBQW1CLEdBQTNCLFVBQTRCLFVBQXVDO1FBQy9ELElBQUksa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakYsSUFBSSxlQUFlLEdBQUcsaUJBQWlCLENBQUMsa0NBQWtDLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFILEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxNQUFJLGVBQWlCLENBQUM7UUFDakMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztZQUM3RCxNQUFNLENBQUMsTUFBSSxlQUFlLGlCQUFjLENBQUM7UUFDN0MsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNFLGlDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLHFqREF1QlQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHFDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztLQUMxQixFQUY2RixDQUU3RixDQUFDO0lBQ0YsNkJBQUM7Q0FqSEQsQUFpSEMsSUFBQTtTQWpIWSxzQkFBc0IiLCJmaWxlIjoic29sdXRpb25zLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==