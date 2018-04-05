import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IFrameComponent } from './iframe.component';
var routes = [
    {
        path: '',
        component: IFrameComponent,
        // if the component has child components that need to be routed to, include them in the children array.
        children: [
            {
                path: '',
                redirectTo: 'base',
                pathMatch: 'full'
            }
        ]
    }
];
var Routing = /** @class */ (function () {
    function Routing() {
    }
    Routing.decorators = [
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
    Routing.ctorParameters = function () { return []; };
    return Routing;
}());
export { Routing };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9pZnJhbWUvaWZyYW1lLnJvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFFLFlBQUEsRUFBcUIsTUFBTyxpQkFBQSxDQUFrQjtBQUN2RCxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLG9CQUFBLENBQXFCO0FBRXJELElBQU0sTUFBQSxHQUFpQjtJQUNuQjtRQUNJLElBQUksRUFBRSxFQUFBO1FBQ04sU0FBUyxFQUFFLGVBQUE7UUFDWCx1R0FBdUc7UUFDdkcsUUFBUSxFQUFFO1lBQ047Z0JBQ0ksSUFBSSxFQUFFLEVBQUE7Z0JBQ04sVUFBVSxFQUFFLE1BQUE7Z0JBQ1osU0FBUyxFQUFFLE1BQUE7YUFDZDtTQUNKO0tBQ1I7Q0FBQyxDQUFDO0FBR0g7SUFBQTtJQWFBLENBQUM7SUFiNkIsa0JBQVUsR0FBMEI7UUFDbEUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUNyQixPQUFPLEVBQUU7d0JBQ0wsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7cUJBQ2hDO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3FCQUNmO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxzQkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLGNBQUM7Q0FiRCxBQWFDLElBQUE7U0FiWSxPQUFPIiwiZmlsZSI6ImlmcmFtZS5yb3V0aW5nLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL21hdHdpbHMvc291cmNlL21zZnQtc21lLWlmcmFtZS1leHRlbnNpb24vaW5saW5lU3JjLyJ9