import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdleComponent } from '@msft-sme/shell/angular';
// These are the basic routes that are required in order to load an extension and make service calls.
var appRoutes = [
    // The idle component route is used for 'long running' processes that take any amount of time (async).
    // This is a required path and component.
    {
        path: 'idle',
        component: IdleComponent
    },
    {
        path: 'home',
        loadChildren: 'app/hello/hello.module#HelloModule'
    },
    {
        path: 'overview',
        loadChildren: 'app/overview/overview.module#OverviewModule'
    },
    {
        path: 'dev',
        loadChildren: 'app/dev-guide/dev-guide.module#DevGuideModule'
    },
    // this child route is used to route back to the home path when an invalid URL is provided to the browser.
    {
        path: '**',
        redirectTo: 'home' // double check navigation
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
                            // don't navigate at initially.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFFLFlBQUEsRUFBcUIsTUFBTyxpQkFBQSxDQUFrQjtBQUN2RCxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8seUJBQUEsQ0FBMEI7QUFFeEQscUdBQXFHO0FBQ3JHLElBQU0sU0FBQSxHQUFvQjtJQUN0QixzR0FBc0c7SUFDdEcseUNBQXlDO0lBQ3pDO1FBQ0ksSUFBSSxFQUFFLE1BQUE7UUFDTixTQUFTLEVBQUUsYUFBQTtLQUNkO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsTUFBQTtRQUNOLFlBQVksRUFBRSxvQ0FBQTtLQUNqQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQUE7UUFDTixZQUFZLEVBQUUsNkNBQUE7S0FDakI7SUFDRDtRQUNJLElBQUksRUFBRSxLQUFBO1FBQ04sWUFBWSxFQUFFLCtDQUFBO0tBQ2pCO0lBQ0QsMEdBQTBHO0lBQzFHO1FBQ0ksSUFBSSxFQUFFLElBQUE7UUFDTixVQUFVLEVBQUUsTUFBQSxDQUFPLDBCQUFBO0tBQ3RCO0NBQ0osQ0FBQztBQUdGO0lBQUE7SUFxQkEsQ0FBQztJQXJCcUMsMkJBQVUsR0FBMEI7UUFDMUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUNyQixPQUFPLEVBQUU7d0JBQ0wsWUFBWSxDQUFDLE9BQU8sQ0FDaEIsU0FBUyxFQUNUOzRCQUNJLDBDQUEwQzs0QkFDMUMsdUJBQXVCOzRCQUV2QiwrQkFBK0I7NEJBQy9CLGlCQUFpQixFQUFFLElBQUk7eUJBQzFCLENBQUM7cUJBQ1Q7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLFlBQVk7cUJBQ2Y7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLCtCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsdUJBQUM7Q0FyQkQsQUFxQkMsSUFBQTtTQXJCWSxnQkFBZ0IiLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL21hdHdpbHMvU291cmNlL2Jhc2UvbXNmdC1zbWUtZGV2ZWxvcGVyLXRvb2xzL2lubGluZVNyYy8ifQ==