import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ControlExampleComponent } from './control-example/control-example.component';
import { HelloComponent } from './hello.component';
import { NotificationsExampleComponent } from './notifications-example/notifications-example.component';
var routes = [
    {
        path: '',
        component: HelloComponent,
        children: [
            {
                path: '',
                redirectTo: 'controls',
                pathMatch: 'full'
            },
            {
                path: 'controls',
                component: ControlExampleComponent
            },
            {
                path: 'notifications',
                component: NotificationsExampleComponent
            },
            {
                // do lazy loading when: large single compnents, lots of little, or rarely used
                path: 'style',
                loadChildren: 'app/hello/style-guide/style-guide.module#StyleGuideModule' // add module and setup lazy load
            }
        ]
    }
];
var HelloRouting = /** @class */ (function () {
    function HelloRouting() {
    }
    HelloRouting.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        RouterModule.forChild(routes)
                    ],
                    exports: [
                        RouterModule
                    ]
                },] },
    ];
    /** @nocollapse */
    HelloRouting.ctorParameters = function () { return []; };
    return HelloRouting;
}());
export { HelloRouting };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9oZWxsby9oZWxsby5yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxZQUFBLEVBQXFCLE1BQU8saUJBQUEsQ0FBa0I7QUFHdkQsT0FBTyxFQUFFLHVCQUFBLEVBQXdCLE1BQU8sNkNBQUEsQ0FBOEM7QUFFdEYsT0FBTyxFQUFFLGNBQUEsRUFBZSxNQUFPLG1CQUFBLENBQW9CO0FBQ25ELE9BQU8sRUFBRSw2QkFBQSxFQUE4QixNQUFPLHlEQUFBLENBQTBEO0FBR3hHLElBQU0sTUFBQSxHQUFpQjtJQUNuQjtRQUNJLElBQUksRUFBRSxFQUFBO1FBQ04sU0FBUyxFQUFFLGNBQUE7UUFDWCxRQUFRLEVBQUU7WUFDTjtnQkFDSSxJQUFJLEVBQUUsRUFBQTtnQkFDTixVQUFVLEVBQUUsVUFBQTtnQkFDWixTQUFTLEVBQUUsTUFBQTthQUNkO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFVBQUE7Z0JBQ04sU0FBUyxFQUFFLHVCQUFBO2FBQ2Q7WUFDRDtnQkFDSSxJQUFJLEVBQUUsZUFBQTtnQkFDTixTQUFTLEVBQUUsNkJBQUE7YUFDZDtZQUNEO2dCQUNJLCtFQUErRTtnQkFDL0UsSUFBSSxFQUFFLE9BQUE7Z0JBQ04sWUFBWSxFQUFFLDJEQUFBLENBQTRELGlDQUFBO2FBQzdFO1NBQ0o7S0FDSjtDQUNKLENBQUM7QUFHRjtJQUFBO0lBYUEsQ0FBQztJQWJpQyx1QkFBVSxHQUEwQjtRQUN0RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3JCLE9BQU8sRUFBRTt3QkFDTCxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztxQkFDaEM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLFlBQVk7cUJBQ2Y7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDJCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsbUJBQUM7Q0FiRCxBQWFDLElBQUE7U0FiWSxZQUFZIiwiZmlsZSI6ImhlbGxvLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbWF0d2lscy9Tb3VyY2UvYmFzZS9tc2Z0LXNtZS1kZXZlbG9wZXItdG9vbHMvaW5saW5lU3JjLyJ9