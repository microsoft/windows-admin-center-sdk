import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConnectionGuardService } from './connection-guard.service';
import { ConnectionComponent } from './connection/connection.component';
import { ConnectionsNavigationComponent } from './connections-nav/connections-nav.component';
import { ConnectionsComponent } from './connections.component';
var routes = [
    {
        path: '',
        component: ConnectionsNavigationComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: ConnectionsComponent
            },
            {
                path: ':connectionType/:connectionName',
                canActivate: [ConnectionGuardService],
                component: ConnectionComponent,
                loadChildren: 'app/modules/tools/tools.module#ToolsModule'
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }
];
var ConnectionsRoutingModule = /** @class */ (function () {
    function ConnectionsRoutingModule() {
    }
    ConnectionsRoutingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule]
                },] },
    ];
    /** @nocollapse */
    ConnectionsRoutingModule.ctorParameters = function () { return []; };
    return ConnectionsRoutingModule;
}());
export { ConnectionsRoutingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Nvbm5lY3Rpb25zL2Nvbm5lY3Rpb25zLnJvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFFLFlBQUEsRUFBcUIsTUFBTyxpQkFBQSxDQUFrQjtBQUN2RCxPQUFPLEVBQUUsc0JBQUEsRUFBdUIsTUFBTyw0QkFBQSxDQUE2QjtBQUNwRSxPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTyxtQ0FBQSxDQUFvQztBQUN4RSxPQUFPLEVBQUUsOEJBQUEsRUFBK0IsTUFBTyw2Q0FBQSxDQUE4QztBQUM3RixPQUFPLEVBQUUsb0JBQUEsRUFBcUIsTUFBTyx5QkFBQSxDQUEwQjtBQUUvRCxJQUFNLE1BQUEsR0FBaUI7SUFDbkI7UUFDSSxJQUFJLEVBQUUsRUFBQTtRQUNOLFNBQVMsRUFBRSw4QkFBQTtRQUNYLFFBQVEsRUFBRTtZQUNOO2dCQUNJLElBQUksRUFBRSxFQUFBO2dCQUNOLFNBQVMsRUFBRSxNQUFBO2dCQUNYLFNBQVMsRUFBRSxvQkFBQTthQUNkO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLGlDQUFBO2dCQUNOLFdBQVcsRUFBRSxDQUFBLHNCQUFFLENBQXNCO2dCQUNyQyxTQUFTLEVBQUUsbUJBQUE7Z0JBQ1gsWUFBWSxFQUFFLDRDQUFBO2FBQ2pCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLElBQUE7Z0JBQ04sVUFBVSxFQUFFLEVBQUE7YUFDZjtTQUNKO0tBQ0o7Q0FDSixDQUFDO0FBR0Y7SUFBQTtJQVNBLENBQUM7SUFUOEMsbUNBQVUsR0FBMEI7UUFDbkYsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUNyQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4QyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQzFCLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCx1Q0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLCtCQUFDO0NBVEQsQUFTQyxJQUFBO1NBVFksd0JBQXdCIiwiZmlsZSI6ImNvbm5lY3Rpb25zLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9