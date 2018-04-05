import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverviewComponent } from './overview.component';
var routes = [{
        path: '',
        component: OverviewComponent
    }];
var OverviewRoutingModule = (function () {
    function OverviewRoutingModule() {
    }
    return OverviewRoutingModule;
}());
export { OverviewRoutingModule };
OverviewRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            },] },
];
/** @nocollapse */
OverviewRoutingModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL292ZXJ2aWV3L292ZXJ2aWV3LnJvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFFLFlBQUEsRUFBcUIsTUFBTyxpQkFBQSxDQUFrQjtBQUN2RCxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxzQkFBQSxDQUF1QjtBQUV6RCxJQUFNLE1BQUEsR0FBaUIsQ0FBQTtRQUNuQixJQUFJLEVBQUUsRUFBQTtRQUNOLFNBQVMsRUFBRSxpQkFBQTtLQUNkLENBQUMsQ0FBQztBQUdIO0lBQUE7SUFTQSxDQUFDO0lBQUQsNEJBQUM7QUFBRCxDQVRBLEFBU0M7O0FBVDJDLGdDQUFVLEdBQTBCO0lBQ2hGLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDeEMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQzFCLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxvQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJvdmVydmlldy5yb3V0aW5nLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==