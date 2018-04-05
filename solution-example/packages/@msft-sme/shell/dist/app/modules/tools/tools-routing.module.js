import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IFrameComponent } from '../iframe/iframe.component';
import { DefaultToolGuardService } from './default-tool-guard.service';
import { MultiToolComponent } from './multi-tool/multi-tool.component';
import { ToolComponent } from './tool/tool.component';
import { MultiToolGuardService, ToolGuardService } from './tools-guard-base.service';
var toolChildRoutes = [
    {
        // Wildcard for all possible subpaths within the tool
        path: '**',
        component: IFrameComponent
    }
];
var routes = [
    {
        path: 'tools',
        canActivate: [MultiToolGuardService],
        component: MultiToolComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                canActivate: [DefaultToolGuardService]
            },
            {
                path: ':toolId',
                canActivate: [DefaultToolGuardService],
                canDeactivate: [ToolGuardService],
                component: ToolComponent,
                children: toolChildRoutes
            }
        ]
    },
    {
        path: '',
        pathMatch: 'full',
        canActivate: [ToolGuardService],
        canDeactivate: [ToolGuardService],
        component: ToolComponent,
        children: toolChildRoutes
    }
];
var ToolsRoutingModule = (function () {
    function ToolsRoutingModule() {
    }
    return ToolsRoutingModule;
}());
export { ToolsRoutingModule };
ToolsRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            },] },
];
/** @nocollapse */
ToolsRoutingModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3Rvb2xzL3Rvb2xzLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxZQUFBLEVBQXFCLE1BQU8saUJBQUEsQ0FBa0I7QUFFdkQsT0FBTyxFQUFFLGVBQUEsRUFBZ0IsTUFBUSw0QkFBQSxDQUE2QjtBQUU5RCxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw4QkFBQSxDQUErQjtBQUN2RSxPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBUSxtQ0FBQSxDQUFvQztBQUN4RSxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQVEsdUJBQUEsQ0FBd0I7QUFDdkQsT0FBTyxFQUFFLHFCQUFBLEVBQXVCLGdCQUFBLEVBQWlCLE1BQU8sNEJBQUEsQ0FBNkI7QUFFckYsSUFBTSxlQUFBLEdBQWtCO0lBQ3BCO1FBQ0kscURBQXFEO1FBQ3JELElBQUksRUFBRSxJQUFBO1FBQ04sU0FBUyxFQUFFLGVBQUE7S0FDZDtDQUNKLENBQUM7QUFFRixJQUFNLE1BQUEsR0FBaUI7SUFDbkI7UUFDSSxJQUFJLEVBQUUsT0FBQTtRQUNOLFdBQVcsRUFBRSxDQUFBLHFCQUFFLENBQXFCO1FBQ3BDLFNBQVMsRUFBRSxrQkFBQTtRQUNYLFFBQVEsRUFBRTtZQUNOO2dCQUNJLElBQUksRUFBRSxFQUFBO2dCQUNOLFNBQVMsRUFBRSxNQUFBO2dCQUNYLFdBQVcsRUFBRSxDQUFBLHVCQUFFLENBQXVCO2FBQ3pDO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFNBQUE7Z0JBQ04sV0FBVyxFQUFFLENBQUEsdUJBQUUsQ0FBdUI7Z0JBQ3RDLGFBQWEsRUFBRSxDQUFBLGdCQUFFLENBQWdCO2dCQUNqQyxTQUFTLEVBQUUsYUFBQTtnQkFDWCxRQUFRLEVBQUUsZUFBQTthQUNiO1NBQ0o7S0FDSjtJQUNEO1FBQ0ksSUFBSSxFQUFFLEVBQUE7UUFDTixTQUFTLEVBQUUsTUFBQTtRQUNYLFdBQVcsRUFBRSxDQUFBLGdCQUFFLENBQWdCO1FBQy9CLGFBQWEsRUFBRSxDQUFBLGdCQUFFLENBQWdCO1FBQ2pDLFNBQVMsRUFBRSxhQUFBO1FBQ1gsUUFBUSxFQUFFLGVBQUE7S0FDYjtDQUNKLENBQUM7QUFHRjtJQUFBO0lBU0EsQ0FBQztJQUFELHlCQUFDO0FBQUQsQ0FUQSxBQVNDOztBQVR3Qyw2QkFBVSxHQUEwQjtJQUM3RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hDLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQzthQUMxQixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsaUNBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoidG9vbHMtcm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9