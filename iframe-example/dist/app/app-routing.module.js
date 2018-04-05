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
        path: '',
        loadChildren: 'app/iframe/iframe.module#IFrameModule'
    },
    // this child route is used to route back to the home path when an invalid URL is provided to the browser.
    {
        path: '**',
        redirectTo: '' // double check navigation
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFFLFlBQUEsRUFBcUIsTUFBTyxpQkFBQSxDQUFrQjtBQUN2RCxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8seUJBQUEsQ0FBMEI7QUFFeEQscUdBQXFHO0FBQ3JHLElBQU0sU0FBQSxHQUFvQjtJQUN0QixzR0FBc0c7SUFDdEcseUNBQXlDO0lBQ3pDO1FBQ0ksSUFBSSxFQUFFLE1BQUE7UUFDTixTQUFTLEVBQUUsYUFBQTtLQUNkO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsRUFBQTtRQUNOLFlBQVksRUFBRSx1Q0FBQTtLQUNqQjtJQUNELDBHQUEwRztJQUMxRztRQUNJLElBQUksRUFBRSxJQUFBO1FBQ04sVUFBVSxFQUFFLEVBQUEsQ0FBRywwQkFBQTtLQUNsQjtDQUNKLENBQUM7QUFHRjtJQUFBO0lBcUJBLENBQUM7SUFyQnFDLDJCQUFVLEdBQTBCO1FBQzFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDckIsT0FBTyxFQUFFO3dCQUNMLFlBQVksQ0FBQyxPQUFPLENBQ2hCLFNBQVMsRUFDVDs0QkFDSSwwQ0FBMEM7NEJBQzFDLHVCQUF1Qjs0QkFFdkIsK0JBQStCOzRCQUMvQixpQkFBaUIsRUFBRSxJQUFJO3lCQUMxQixDQUFDO3FCQUNUO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3FCQUNmO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwrQkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLHVCQUFDO0NBckJELEFBcUJDLElBQUE7U0FyQlksZ0JBQWdCIiwiZmlsZSI6ImFwcC1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL3NvdXJjZS9tc2Z0LXNtZS1pZnJhbWUtZXh0ZW5zaW9uL2lubGluZVNyYy8ifQ==