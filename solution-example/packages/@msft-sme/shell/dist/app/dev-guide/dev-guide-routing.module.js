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
var DevGuideRoutingModule = (function () {
    function DevGuideRoutingModule() {
    }
    return DevGuideRoutingModule;
}());
export { DevGuideRoutingModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvZGV2LWd1aWRlLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxZQUFBLEVBQXFCLE1BQU8saUJBQUEsQ0FBa0I7QUFDdkQsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sdUJBQUEsQ0FBd0I7QUFDMUQsT0FBTyxFQUFFLGdCQUFBLEVBQWlCLE1BQU8sNkJBQUEsQ0FBOEI7QUFFL0QsSUFBTSxNQUFBLEdBQWlCO0lBQ25CO1FBQ0ksSUFBSSxFQUFFLEVBQUE7UUFDTixTQUFTLEVBQUUsaUJBQUE7UUFDWCxRQUFRLEVBQUU7WUFDTjtnQkFDSSxJQUFJLEVBQUUsU0FBQTtnQkFDTixTQUFTLEVBQUUsZ0JBQUE7YUFDZDtZQUNEO2dCQUNJLElBQUksRUFBRSxVQUFBO2dCQUNOLFlBQVksRUFBRSxtREFBQTthQUNqQjtZQUNEO2dCQUNJLElBQUksRUFBRSxPQUFBO2dCQUNOLFlBQVksRUFBRSwwQ0FBQTthQUNqQjtZQUNEO2dCQUNJLElBQUksRUFBRSxRQUFBO2dCQUNOLFlBQVksRUFBRSw2Q0FBQTthQUNqQjtZQUNEO2dCQUNJLElBQUksRUFBRSxJQUFBO2dCQUNOLFVBQVUsRUFBRSxTQUFBO2FBQ2Y7U0FBQztLQUNUO0NBQUMsQ0FBQztBQUdQO0lBQUE7SUFhQSxDQUFDO0lBQUQsNEJBQUM7QUFBRCxDQWJBLEFBYUM7O0FBYjJDLGdDQUFVLEdBQTBCO0lBQ2hGLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxFQUFFO29CQUNMLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUNoQztnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsWUFBWTtpQkFDZjthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxvQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJkZXYtZ3VpZGUtcm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9