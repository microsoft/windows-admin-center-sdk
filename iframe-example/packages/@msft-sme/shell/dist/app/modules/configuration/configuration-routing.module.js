import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { AccessComponent } from './panels/access/access.component';
import { AdminsSecurityGroupsComponent } from './panels/access/securitygroups/admins-securitygroups.component';
import { UsersSecurityGroupsComponent } from './panels/access/securitygroups/users-securitygroups.component';
import { ConnectionComponent } from './panels/connection.component';
import { GeneralComponent } from './panels/general.component';
var routes = [
    {
        path: '',
        component: ConfigurationComponent,
        children: [{
                path: '',
                pathMatch: 'full',
                redirectTo: 'general'
            },
            {
                path: 'general',
                component: GeneralComponent
            },
            {
                path: 'connection',
                component: ConnectionComponent
            },
            {
                path: 'access',
                component: AccessComponent,
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'users'
                    },
                    {
                        path: 'users',
                        pathMatch: 'full',
                        component: UsersSecurityGroupsComponent
                    },
                    {
                        path: 'admins',
                        pathMatch: 'full',
                        component: AdminsSecurityGroupsComponent
                    },
                    {
                        path: '**',
                        redirectTo: 'users'
                    }
                ]
            }]
    }
];
var ConfigurationRoutingModule = /** @class */ (function () {
    function ConfigurationRoutingModule() {
    }
    ConfigurationRoutingModule.decorators = [
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
    ConfigurationRoutingModule.ctorParameters = function () { return []; };
    return ConfigurationRoutingModule;
}());
export { ConfigurationRoutingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi1yb3V0aW5nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUN6QyxPQUFPLEVBQUUsWUFBQSxFQUFxQixNQUFPLGlCQUFBLENBQWtCO0FBQ3ZELE9BQU8sRUFBRSxzQkFBQSxFQUF1QixNQUFPLDJCQUFBLENBQTRCO0FBQ25FLE9BQU8sRUFBRSxlQUFBLEVBQWdCLE1BQU8sa0NBQUEsQ0FBbUM7QUFDbkUsT0FBTyxFQUFFLDZCQUFBLEVBQThCLE1BQU8sZ0VBQUEsQ0FBaUU7QUFDL0csT0FBTyxFQUFFLDRCQUFBLEVBQTZCLE1BQU8sK0RBQUEsQ0FBZ0U7QUFDN0csT0FBTyxFQUFFLG1CQUFBLEVBQW9CLE1BQU8sK0JBQUEsQ0FBZ0M7QUFDcEUsT0FBTyxFQUFFLGdCQUFBLEVBQWlCLE1BQU8sNEJBQUEsQ0FBNkI7QUFFOUQsSUFBTSxNQUFBLEdBQWlCO0lBQ25CO1FBQ0ksSUFBSSxFQUFFLEVBQUE7UUFDTixTQUFTLEVBQUUsc0JBQUE7UUFDWCxRQUFRLEVBQUUsQ0FBQTtnQkFDTixJQUFJLEVBQUUsRUFBQTtnQkFDTixTQUFTLEVBQUUsTUFBQTtnQkFDWCxVQUFVLEVBQUUsU0FBQTthQUNmO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFNBQUE7Z0JBQ04sU0FBUyxFQUFFLGdCQUFBO2FBQ2Q7WUFDRDtnQkFDSSxJQUFJLEVBQUUsWUFBQTtnQkFDTixTQUFTLEVBQUUsbUJBQUE7YUFDZDtZQUNEO2dCQUNJLElBQUksRUFBRSxRQUFBO2dCQUNOLFNBQVMsRUFBRSxlQUFBO2dCQUNYLFFBQVEsRUFBRTtvQkFDTjt3QkFDSSxJQUFJLEVBQUUsRUFBQTt3QkFDTixTQUFTLEVBQUUsTUFBQTt3QkFDWCxVQUFVLEVBQUUsT0FBQTtxQkFDZjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsT0FBQTt3QkFDTixTQUFTLEVBQUUsTUFBQTt3QkFDWCxTQUFTLEVBQUUsNEJBQUE7cUJBQ2Q7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLFFBQUE7d0JBQ04sU0FBUyxFQUFFLE1BQUE7d0JBQ1gsU0FBUyxFQUFFLDZCQUFBO3FCQUNkO29CQUNEO3dCQUNJLElBQUksRUFBRSxJQUFBO3dCQUNOLFVBQVUsRUFBRSxPQUFBO3FCQUNmO2lCQUNKO2FBQ0osQ0FBQztLQUNMO0NBQUMsQ0FBQztBQUdQO0lBQUE7SUFhQSxDQUFDO0lBYmdELHFDQUFVLEdBQTBCO1FBQ3JGLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDckIsT0FBTyxFQUFFO3dCQUNMLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO3FCQUNoQztvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsWUFBWTtxQkFDZjtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gseUNBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRixpQ0FBQztDQWJELEFBYUMsSUFBQTtTQWJZLDBCQUEwQiIsImZpbGUiOiJjb25maWd1cmF0aW9uLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==