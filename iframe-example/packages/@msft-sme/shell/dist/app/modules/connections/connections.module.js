import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionsModule, DataTableModule, LoadingWheelModule, MasterViewModule, PipesModule, ToolHeaderModule } from '../../../angular';
import { ConnectionGuardService } from './connection-guard.service';
import { ConnectionComponent } from './connection/connection.component';
import { ConnectionsListComponent } from './connections-list/connections-list.component';
import { ConnectionsNavigationComponent } from './connections-nav/connections-nav.component';
import { ConnectionsComponent } from './connections.component';
import { ConnectionsRoutingModule } from './connections.routing';
var ConnectionsModule = /** @class */ (function () {
    function ConnectionsModule() {
    }
    ConnectionsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ConnectionsComponent,
                        ConnectionComponent,
                        ConnectionsListComponent,
                        ConnectionsNavigationComponent
                    ],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        LoadingWheelModule,
                        FormsModule,
                        ToolHeaderModule,
                        ConnectionsRoutingModule,
                        ActionsModule,
                        DataTableModule,
                        PipesModule,
                        MasterViewModule
                    ],
                    providers: [
                        ConnectionGuardService
                    ],
                    exports: [ConnectionsComponent, ConnectionsListComponent]
                },] },
    ];
    /** @nocollapse */
    ConnectionsModule.ctorParameters = function () { return []; };
    return ConnectionsModule;
}());
export { ConnectionsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Nvbm5lY3Rpb25zL2Nvbm5lY3Rpb25zLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFFLFdBQUEsRUFBYSxtQkFBQSxFQUFvQixNQUFPLGdCQUFBLENBQWlCO0FBRWxFLE9BQU8sRUFBRSxhQUFBLEVBQStCLGVBQUEsRUFBaUIsa0JBQUEsRUFDckQsZ0JBQWdCLEVBQUUsV0FBQSxFQUFhLGdCQUFBLEVBQWlCLE1BQU8sa0JBQUEsQ0FBbUI7QUFFOUUsT0FBTyxFQUFFLHNCQUFBLEVBQXVCLE1BQU8sNEJBQUEsQ0FBNkI7QUFDcEUsT0FBTyxFQUFFLG1CQUFBLEVBQW9CLE1BQU8sbUNBQUEsQ0FBb0M7QUFDeEUsT0FBTyxFQUFFLHdCQUFBLEVBQXlCLE1BQU8sK0NBQUEsQ0FBZ0Q7QUFDekYsT0FBTyxFQUFFLDhCQUFBLEVBQStCLE1BQU8sNkNBQUEsQ0FBOEM7QUFDN0YsT0FBTyxFQUFFLG9CQUFBLEVBQXFCLE1BQU8seUJBQUEsQ0FBMEI7QUFDL0QsT0FBTyxFQUFFLHdCQUFBLEVBQXlCLE1BQU8sdUJBQUEsQ0FBd0I7QUFHakU7SUFBQTtJQTZCQSxDQUFDO0lBN0J1Qyw0QkFBVSxHQUEwQjtRQUM1RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3JCLFlBQVksRUFBRTt3QkFDVixvQkFBb0I7d0JBQ3BCLG1CQUFtQjt3QkFDbkIsd0JBQXdCO3dCQUN4Qiw4QkFBOEI7cUJBQ2pDO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixXQUFXO3dCQUNYLGdCQUFnQjt3QkFDaEIsd0JBQXdCO3dCQUN4QixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsV0FBVzt3QkFDWCxnQkFBZ0I7cUJBQ25CO29CQUNELFNBQVMsRUFBRTt3QkFDUCxzQkFBc0I7cUJBQ3pCO29CQUNELE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLHdCQUF3QixDQUFDO2lCQUM1RCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsZ0NBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRix3QkFBQztDQTdCRCxBQTZCQyxJQUFBO1NBN0JZLGlCQUFpQiIsImZpbGUiOiJjb25uZWN0aW9ucy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9