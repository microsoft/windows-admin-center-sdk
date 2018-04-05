import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActionsModule, DataTableModule, DialogModule, LoadingWheelModule, SettingsModule, SmeStylesModule, ToolHeaderModule } from '../../../../../angular';
import { AccessComponent } from './access.component';
import { AccessService } from './access.service';
import { AddSecurityGroupDialogComponent } from './dialogs/add-securitygroup-dialog.component';
import { AdminsSecurityGroupsComponent } from './securitygroups/admins-securitygroups.component';
import { SecurityGroupsBaseComponent } from './securitygroups/securitygroups-base.component';
import { UsersSecurityGroupsComponent } from './securitygroups/users-securitygroups.component';
var AccessModule = /** @class */ (function () {
    function AccessModule() {
    }
    AccessModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AccessComponent,
                        SecurityGroupsBaseComponent,
                        AddSecurityGroupDialogComponent,
                        UsersSecurityGroupsComponent,
                        AdminsSecurityGroupsComponent
                    ],
                    imports: [
                        CommonModule,
                        DialogModule,
                        SettingsModule,
                        ActionsModule,
                        DataTableModule,
                        LoadingWheelModule,
                        ToolHeaderModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RouterModule,
                        SmeStylesModule
                    ],
                    providers: [
                        AccessService
                    ],
                    exports: []
                },] },
    ];
    /** @nocollapse */
    AccessModule.ctorParameters = function () { return []; };
    return AccessModule;
}());
export { AccessModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vcGFuZWxzL2FjY2Vzcy9hY2Nlc3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUN6QyxPQUFPLEVBQUUsV0FBQSxFQUFhLG1CQUFBLEVBQW9CLE1BQU8sZ0JBQUEsQ0FBaUI7QUFDbEUsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFDSCxhQUFhLEVBQUUsZUFBQSxFQUFpQixZQUFBLEVBQWMsa0JBQUEsRUFBb0IsY0FBQSxFQUFnQixlQUFBLEVBQWlCLGdCQUFBLEVBQ3RHLE1BQU0sd0JBQUEsQ0FBeUI7QUFDaEMsT0FBTyxFQUFFLGVBQUEsRUFBZ0IsTUFBTyxvQkFBQSxDQUFxQjtBQUNyRCxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8sa0JBQUEsQ0FBbUI7QUFDakQsT0FBTyxFQUFFLCtCQUFBLEVBQWdDLE1BQU8sOENBQUEsQ0FBK0M7QUFDL0YsT0FBTyxFQUFFLDZCQUFBLEVBQThCLE1BQU8sa0RBQUEsQ0FBbUQ7QUFDakcsT0FBTyxFQUFFLDJCQUFBLEVBQTRCLE1BQU8sZ0RBQUEsQ0FBaUQ7QUFDN0YsT0FBTyxFQUFFLDRCQUFBLEVBQTZCLE1BQU8saURBQUEsQ0FBa0Q7QUFHL0Y7SUFBQTtJQWdDQSxDQUFDO0lBaENrQyx1QkFBVSxHQUEwQjtRQUN2RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3JCLFlBQVksRUFBRTt3QkFDVixlQUFlO3dCQUNmLDJCQUEyQjt3QkFDM0IsK0JBQStCO3dCQUMvQiw0QkFBNEI7d0JBQzVCLDZCQUE2QjtxQkFDaEM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixrQkFBa0I7d0JBQ2xCLGdCQUFnQjt3QkFDaEIsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osZUFBZTtxQkFDbEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNQLGFBQWE7cUJBQ2hCO29CQUNELE9BQU8sRUFBRSxFQUNSO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwyQkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLG1CQUFDO0NBaENELEFBZ0NDLElBQUE7U0FoQ1ksWUFBWSIsImZpbGUiOiJhY2Nlc3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==