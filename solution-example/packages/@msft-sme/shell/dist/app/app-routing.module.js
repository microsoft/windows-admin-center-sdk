import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DevGuardService } from './dev-guard.service';
import { ShellGuardService } from './shell-guard.service';
import { ShellComponent } from './shell.component';
var appRoutes = [
    {
        path: 'errors/unsupported-browser',
        pathMatch: 'full',
        loadChildren: 'app/modules/errors/unsupported-browser.module#UnsupportedBrowserModule'
    },
    {
        path: '',
        component: ShellComponent,
        canActivate: [ShellGuardService],
        children: [
            {
                // root route goes to overview
                path: '',
                pathMatch: 'full',
                loadChildren: 'app/modules/overview/overview.module#OverviewModule'
            },
            {
                path: 'dev',
                canActivate: [DevGuardService],
                loadChildren: 'app/dev-guide/dev-guide.module#DevGuideModule'
            },
            {
                // assume everything else is a solution             
                path: '',
                loadChildren: 'app/modules/solution-container/solution-container.module#SolutionContainerModule'
            }
        ]
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
export { AppRoutingModule };
AppRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    RouterModule.forRoot(appRoutes, {
                        // un-comment to enable debug log messages
                        // enableTracing: true,
                        // navigate at initially.
                        initialNavigation: true
                    })
                ],
                exports: [
                    RouterModule
                ]
            },] },
];
/** @nocollapse */
AppRoutingModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFFLFlBQUEsRUFBcUIsTUFBTyxpQkFBQSxDQUFrQjtBQUN2RCxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLHFCQUFBLENBQXNCO0FBQ3RELE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLHVCQUFBLENBQXdCO0FBQzFELE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyxtQkFBQSxDQUFvQjtBQUVuRCxJQUFNLFNBQUEsR0FBb0I7SUFDdEI7UUFDSSxJQUFJLEVBQUUsNEJBQUE7UUFDTixTQUFTLEVBQUUsTUFBQTtRQUNYLFlBQVksRUFBRSx3RUFBQTtLQUNqQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLEVBQUE7UUFDTixTQUFTLEVBQUUsY0FBQTtRQUNYLFdBQVcsRUFBRSxDQUFBLGlCQUFFLENBQWlCO1FBQ2hDLFFBQVEsRUFBRTtZQUNOO2dCQUNJLDhCQUE4QjtnQkFDOUIsSUFBSSxFQUFFLEVBQUE7Z0JBQ04sU0FBUyxFQUFFLE1BQUE7Z0JBQ1gsWUFBWSxFQUFFLHFEQUFBO2FBQ2pCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLEtBQUE7Z0JBQ04sV0FBVyxFQUFFLENBQUEsZUFBRSxDQUFlO2dCQUM5QixZQUFZLEVBQUUsK0NBQUE7YUFDakI7WUFDRDtnQkFDSSxvREFBb0Q7Z0JBQ3BELElBQUksRUFBRSxFQUFBO2dCQUNOLFlBQVksRUFBRSxrRkFBQTthQUNqQjtTQUNKO0tBQ0o7Q0FDSixDQUFDO0FBR0Y7SUFBQTtJQXFCQSxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQXJCQSxBQXFCQzs7QUFyQnFDLDJCQUFVLEdBQTBCO0lBQzFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxFQUFFO29CQUNMLFlBQVksQ0FBQyxPQUFPLENBQ2hCLFNBQVMsRUFDVDt3QkFDSSwwQ0FBMEM7d0JBQzFDLHVCQUF1Qjt3QkFFdkIseUJBQXlCO3dCQUN6QixpQkFBaUIsRUFBRSxJQUFJO3FCQUMxQixDQUFDO2lCQUNUO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO2lCQUNmO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLCtCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDIiwiZmlsZSI6ImFwcC1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=