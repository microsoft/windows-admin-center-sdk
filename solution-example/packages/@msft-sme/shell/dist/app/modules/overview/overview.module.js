import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingWheelModule, PipesModule, ToolHeaderModule } from '../../../angular';
import { ConnectionsModule } from '../connections/connections.module';
import { OverviewComponent } from './overview.component';
import { OverviewRoutingModule } from './overview.routing';
var OverviewModule = (function () {
    function OverviewModule() {
    }
    return OverviewModule;
}());
export { OverviewModule };
OverviewModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    OverviewComponent
                ],
                imports: [
                    OverviewRoutingModule,
                    ToolHeaderModule,
                    CommonModule,
                    PipesModule,
                    ConnectionsModule,
                    LoadingWheelModule
                ]
            },] },
];
/** @nocollapse */
OverviewModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL292ZXJ2aWV3L292ZXJ2aWV3Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFFekMsT0FBTyxFQUFFLGtCQUFBLEVBQW9CLFdBQUEsRUFBYSxnQkFBQSxFQUFpQixNQUFPLGtCQUFBLENBQW1CO0FBRXJGLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLG1DQUFBLENBQW9DO0FBRXRFLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLHNCQUFBLENBQXVCO0FBQ3pELE9BQU8sRUFBRSxxQkFBQSxFQUFzQixNQUFPLG9CQUFBLENBQXFCO0FBRzNEO0lBQUE7SUFrQkEsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FsQkEsQUFrQkM7O0FBbEJvQyx5QkFBVSxHQUEwQjtJQUN6RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLFlBQVksRUFBRTtvQkFDVixpQkFBaUI7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxxQkFBcUI7b0JBQ3JCLGdCQUFnQjtvQkFDaEIsWUFBWTtvQkFDWixXQUFXO29CQUNYLGlCQUFpQjtvQkFDakIsa0JBQWtCO2lCQUNyQjthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCw2QkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJvdmVydmlldy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9