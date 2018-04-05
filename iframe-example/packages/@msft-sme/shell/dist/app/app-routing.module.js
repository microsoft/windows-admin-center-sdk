import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DevGuardService } from './dev-guard.service';
import { ShellGuardService } from './shell-guard.service';
import { ShellComponent } from './shell.component';
import { WebModeGuardService } from './web-mode-guard.service';
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
                // root route goes to overview, except in app mode, where it will redirect to the app mode overview
                path: '',
                pathMatch: 'full',
                canActivate: [WebModeGuardService],
                loadChildren: 'app/modules/overview/overview.module#OverviewModule'
            },
            {
                path: 'dev',
                canActivate: [DevGuardService],
                loadChildren: 'app/dev-guide/dev-guide.module#DevGuideModule'
            },
            {
                path: 'settings',
                loadChildren: 'app/modules/configuration/configuration.module#ConfigurationModule'
            },
            {
                // assume everything else is a solution             
                path: '',
                loadChildren: 'app/modules/solution-container/solution-container.module#SolutionContainerModule'
            }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
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
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFFLFlBQUEsRUFBcUIsTUFBTyxpQkFBQSxDQUFrQjtBQUN2RCxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLHFCQUFBLENBQXNCO0FBQ3RELE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLHVCQUFBLENBQXdCO0FBQzFELE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyxtQkFBQSxDQUFvQjtBQUNuRCxPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTywwQkFBQSxDQUEyQjtBQUUvRCxJQUFNLFNBQUEsR0FBb0I7SUFDdEI7UUFDSSxJQUFJLEVBQUUsNEJBQUE7UUFDTixTQUFTLEVBQUUsTUFBQTtRQUNYLFlBQVksRUFBRSx3RUFBQTtLQUNqQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLEVBQUE7UUFDTixTQUFTLEVBQUUsY0FBQTtRQUNYLFdBQVcsRUFBRSxDQUFBLGlCQUFFLENBQWlCO1FBQ2hDLFFBQVEsRUFBRTtZQUNOO2dCQUNJLG1HQUFtRztnQkFDbkcsSUFBSSxFQUFFLEVBQUE7Z0JBQ04sU0FBUyxFQUFFLE1BQUE7Z0JBQ1gsV0FBVyxFQUFFLENBQUEsbUJBQUUsQ0FBbUI7Z0JBQ2xDLFlBQVksRUFBRSxxREFBQTthQUNqQjtZQUNEO2dCQUNJLElBQUksRUFBRSxLQUFBO2dCQUNOLFdBQVcsRUFBRSxDQUFBLGVBQUUsQ0FBZTtnQkFDOUIsWUFBWSxFQUFFLCtDQUFBO2FBQ2pCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFVBQUE7Z0JBQ04sWUFBWSxFQUFFLG9FQUFBO2FBQ2pCO1lBQ0Q7Z0JBQ0ksb0RBQW9EO2dCQUNwRCxJQUFJLEVBQUUsRUFBQTtnQkFDTixZQUFZLEVBQUUsa0ZBQUE7YUFDakI7U0FDSjtLQUNKO0NBQ0osQ0FBQztBQUdGO0lBQUE7SUFxQkEsQ0FBQztJQXJCc0MsMkJBQVUsR0FBMEI7UUFDM0UsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUNyQixPQUFPLEVBQUU7d0JBQ0wsWUFBWSxDQUFDLE9BQU8sQ0FDaEIsU0FBUyxFQUNUOzRCQUNJLDBDQUEwQzs0QkFDMUMsdUJBQXVCOzRCQUV2Qix5QkFBeUI7NEJBQ3pCLGlCQUFpQixFQUFFLElBQUk7eUJBQzFCLENBQUM7cUJBQ1Q7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLFlBQVk7cUJBQ2Y7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLCtCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsdUJBQUM7Q0FyQkQsQUFxQkMsSUFBQTtTQXJCWSxnQkFBZ0IiLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==