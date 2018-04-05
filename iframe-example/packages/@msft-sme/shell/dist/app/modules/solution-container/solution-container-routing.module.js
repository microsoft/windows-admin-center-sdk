import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SolutionContainerComponent } from './solution-container.component';
import { SolutionGuardService } from './solution-guard.service';
import { SolutionRootConnectionsGuardService, SolutionRootPathGuardService } from './solution-root-guard.service';
var routes = [
    {
        path: ':solutionId',
        canActivate: [SolutionGuardService],
        component: SolutionContainerComponent,
        children: [
            {
                path: 'connections',
                canActivate: [SolutionRootConnectionsGuardService],
                loadChildren: 'app/modules/connections/connections.module#ConnectionsModule'
            },
            {
                path: '',
                pathMatch: 'full',
                canActivate: [SolutionRootPathGuardService],
                loadChildren: 'app/modules/tools/tools.module#ToolsModule'
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    },
    {
        // everything else redirect to root
        path: '**',
        redirectTo: '/'
    }
];
var SolutionContainerRoutingModule = /** @class */ (function () {
    function SolutionContainerRoutingModule() {
    }
    SolutionContainerRoutingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule]
                },] },
    ];
    /** @nocollapse */
    SolutionContainerRoutingModule.ctorParameters = function () { return []; };
    return SolutionContainerRoutingModule;
}());
export { SolutionContainerRoutingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3NvbHV0aW9uLWNvbnRhaW5lci9zb2x1dGlvbi1jb250YWluZXItcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFFLFlBQUEsRUFBcUIsTUFBTyxpQkFBQSxDQUFrQjtBQUV2RCxPQUFPLEVBQUUsMEJBQUEsRUFBMkIsTUFBTyxnQ0FBQSxDQUFpQztBQUM1RSxPQUFPLEVBQUUsb0JBQUEsRUFBcUIsTUFBTywwQkFBQSxDQUEyQjtBQUNoRSxPQUFPLEVBQUUsbUNBQUEsRUFBcUMsNEJBQUEsRUFBNkIsTUFBTywrQkFBQSxDQUFnQztBQUVsSCxJQUFNLE1BQUEsR0FBaUI7SUFDbkI7UUFDSSxJQUFJLEVBQUUsYUFBQTtRQUNOLFdBQVcsRUFBRSxDQUFBLG9CQUFFLENBQW9CO1FBQ25DLFNBQVMsRUFBRSwwQkFBQTtRQUNYLFFBQVEsRUFBRTtZQUNOO2dCQUNJLElBQUksRUFBRSxhQUFBO2dCQUNOLFdBQVcsRUFBRSxDQUFBLG1DQUFFLENBQW1DO2dCQUNsRCxZQUFZLEVBQUUsOERBQUE7YUFDakI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsRUFBQTtnQkFDTixTQUFTLEVBQUUsTUFBQTtnQkFDWCxXQUFXLEVBQUUsQ0FBQSw0QkFBRSxDQUE0QjtnQkFDM0MsWUFBWSxFQUFFLDRDQUFBO2FBQ2pCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLElBQUE7Z0JBQ04sVUFBVSxFQUFFLEVBQUE7YUFDZjtTQUNKO0tBQ0o7SUFDRDtRQUNJLG1DQUFtQztRQUNuQyxJQUFJLEVBQUUsSUFBQTtRQUNOLFVBQVUsRUFBRSxHQUFBO0tBQ2Y7Q0FDSixDQUFDO0FBR0Y7SUFBQTtJQVNBLENBQUM7SUFUb0QseUNBQVUsR0FBMEI7UUFDekYsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUNyQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4QyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQzFCLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCw2Q0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLHFDQUFDO0NBVEQsQUFTQyxJQUFBO1NBVFksOEJBQThCIiwiZmlsZSI6InNvbHV0aW9uLWNvbnRhaW5lci1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=