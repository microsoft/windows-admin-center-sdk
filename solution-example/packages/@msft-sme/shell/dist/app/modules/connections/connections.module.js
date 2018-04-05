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
var ConnectionsModule = (function () {
    function ConnectionsModule() {
    }
    return ConnectionsModule;
}());
export { ConnectionsModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Nvbm5lY3Rpb25zL2Nvbm5lY3Rpb25zLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFFLFdBQUEsRUFBYSxtQkFBQSxFQUFvQixNQUFPLGdCQUFBLENBQWlCO0FBRWxFLE9BQU8sRUFBRSxhQUFBLEVBQStCLGVBQUEsRUFBaUIsa0JBQUEsRUFDckQsZ0JBQWdCLEVBQUUsV0FBQSxFQUFhLGdCQUFBLEVBQWlCLE1BQU8sa0JBQUEsQ0FBbUI7QUFFOUUsT0FBTyxFQUFFLHNCQUFBLEVBQXVCLE1BQU8sNEJBQUEsQ0FBNkI7QUFDcEUsT0FBTyxFQUFFLG1CQUFBLEVBQW9CLE1BQU8sbUNBQUEsQ0FBb0M7QUFDeEUsT0FBTyxFQUFFLHdCQUFBLEVBQXlCLE1BQU8sK0NBQUEsQ0FBZ0Q7QUFDekYsT0FBTyxFQUFFLDhCQUFBLEVBQStCLE1BQU8sNkNBQUEsQ0FBOEM7QUFDN0YsT0FBTyxFQUFFLG9CQUFBLEVBQXFCLE1BQU8seUJBQUEsQ0FBMEI7QUFDL0QsT0FBTyxFQUFFLHdCQUFBLEVBQXlCLE1BQU8sdUJBQUEsQ0FBd0I7QUFHakU7SUFBQTtJQTZCQSxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQTdCQSxBQTZCQzs7QUE3QnVDLDRCQUFVLEdBQTBCO0lBQzVFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDckIsWUFBWSxFQUFFO29CQUNWLG9CQUFvQjtvQkFDcEIsbUJBQW1CO29CQUNuQix3QkFBd0I7b0JBQ3hCLDhCQUE4QjtpQkFDakM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osbUJBQW1CO29CQUNuQixrQkFBa0I7b0JBQ2xCLFdBQVc7b0JBQ1gsZ0JBQWdCO29CQUNoQix3QkFBd0I7b0JBQ3hCLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixXQUFXO29CQUNYLGdCQUFnQjtpQkFDbkI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLHNCQUFzQjtpQkFDekI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsd0JBQXdCLENBQUM7YUFDNUQsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLGdDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDIiwiZmlsZSI6ImNvbm5lY3Rpb25zLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=