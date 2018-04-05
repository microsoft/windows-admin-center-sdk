import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DevGuideComponent } from './dev-guide.component';
import { LandingComponent } from './landing/landing.component';
var routes = [
    {
        path: '',
        component: DevGuideComponent,
        children: [
            {
                path: 'landing',
                component: LandingComponent
            },
            {
                path: 'controls',
                loadChildren: './modules/controls/controls.module#ControlsModule'
            },
            {
                path: 'pipes',
                loadChildren: './modules/pipes/pipes.module#PipesModule'
            },
            {
                path: 'styles',
                loadChildren: './modules/styles/styles.module#StylesModule'
            },
            {
                path: '**',
                redirectTo: 'landing'
            }
        ]
    }
];
var DevGuideRoutingModule = /** @class */ (function () {
    function DevGuideRoutingModule() {
    }
    DevGuideRoutingModule.decorators = [
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
    DevGuideRoutingModule.ctorParameters = function () { return []; };
    return DevGuideRoutingModule;
}());
export { DevGuideRoutingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvZGV2LWd1aWRlLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxZQUFBLEVBQXFCLE1BQU8saUJBQUEsQ0FBa0I7QUFDdkQsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sdUJBQUEsQ0FBd0I7QUFDMUQsT0FBTyxFQUFFLGdCQUFBLEVBQWlCLE1BQU8sNkJBQUEsQ0FBOEI7QUFFL0QsSUFBTSxNQUFBLEdBQWlCO0lBQ25CO1FBQ0ksSUFBSSxFQUFFLEVBQUE7UUFDTixTQUFTLEVBQUUsaUJBQUE7UUFDWCxRQUFRLEVBQUU7WUFDTjtnQkFDSSxJQUFJLEVBQUUsU0FBQTtnQkFDTixTQUFTLEVBQUUsZ0JBQUE7YUFDZDtZQUNEO2dCQUNJLElBQUksRUFBRSxVQUFBO2dCQUNOLFlBQVksRUFBRSxtREFBQTthQUNqQjtZQUNEO2dCQUNJLElBQUksRUFBRSxPQUFBO2dCQUNOLFlBQVksRUFBRSwwQ0FBQTthQUNqQjtZQUNEO2dCQUNJLElBQUksRUFBRSxRQUFBO2dCQUNOLFlBQVksRUFBRSw2Q0FBQTthQUNqQjtZQUNEO2dCQUNJLElBQUksRUFBRSxJQUFBO2dCQUNOLFVBQVUsRUFBRSxTQUFBO2FBQ2Y7U0FBQztLQUNUO0NBQUMsQ0FBQztBQUdQO0lBQUE7SUFhQSxDQUFDO0lBYjJDLGdDQUFVLEdBQTBCO1FBQ2hGLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDckIsT0FBTyxFQUFFO3dCQUNMLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO3FCQUNoQztvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsWUFBWTtxQkFDZjtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsb0NBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRiw0QkFBQztDQWJELEFBYUMsSUFBQTtTQWJZLHFCQUFxQiIsImZpbGUiOiJkZXYtZ3VpZGUtcm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9