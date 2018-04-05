import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackdropModule } from '../backdrop/backdrop.module';
import { CommonDialogsComponent } from './common-dialogs/common-dialogs.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationListDialogComponent } from './confirmation-list-dialog/confirmation-list-dialog.component';
import { DialogComponent, DialogContentComponent, DialogFooterComponent, DialogHeaderComponent } from './dialog.component';
import { DialogService } from './dialog.service';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { LoadingWheelModule } from '../loading-wheel/loading-wheel.module';
var DialogModule = /** @class */ (function () {
    function DialogModule() {
    }
    DialogModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        CommonDialogsComponent,
                        ConfirmationDialogComponent,
                        ConfirmationListDialogComponent,
                        DialogComponent,
                        DialogContentComponent,
                        DialogFooterComponent,
                        DialogHeaderComponent,
                        MessageDialogComponent
                    ],
                    exports: [
                        CommonDialogsComponent,
                        ConfirmationDialogComponent,
                        ConfirmationListDialogComponent,
                        DialogComponent,
                        DialogContentComponent,
                        DialogFooterComponent,
                        DialogHeaderComponent,
                        MessageDialogComponent
                    ],
                    imports: [
                        BackdropModule,
                        CommonModule,
                        FormsModule,
                        LoadingWheelModule
                    ],
                    providers: [
                        DialogService
                    ]
                },] },
    ];
    /** @nocollapse */
    DialogModule.ctorParameters = function () { return []; };
    return DialogModule;
}());
export { DialogModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGlhbG9nL2RpYWxvZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxnQkFBQSxDQUFpQjtBQUU3QyxPQUFPLEVBQUUsY0FBQSxFQUFlLE1BQU8sNkJBQUEsQ0FBOEI7QUFDN0QsT0FBTyxFQUFFLHNCQUFBLEVBQXVCLE1BQU8sMkNBQUEsQ0FBNEM7QUFDbkYsT0FBTyxFQUFFLDJCQUFBLEVBQTRCLE1BQU8scURBQUEsQ0FBc0Q7QUFDbEcsT0FBTyxFQUFFLCtCQUFBLEVBQWdDLE1BQU8sK0RBQUEsQ0FBZ0U7QUFDaEgsT0FBTyxFQUNILGVBQWUsRUFDZixzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUN4QixNQUFNLG9CQUFBLENBQXFCO0FBRTVCLE9BQU8sRUFBRSxhQUFBLEVBQWMsTUFBTyxrQkFBQSxDQUFtQjtBQUNqRCxPQUFPLEVBQUUsc0JBQUEsRUFBdUIsTUFBTywyQ0FBQSxDQUE0QztBQUVuRixPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyx1Q0FBQSxDQUF3QztBQUczRTtJQUFBO0lBb0NBLENBQUM7SUFwQ2tDLHVCQUFVLEdBQTBCO1FBQ3ZFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDckIsWUFBWSxFQUFFO3dCQUNWLHNCQUFzQjt3QkFDdEIsMkJBQTJCO3dCQUMzQiwrQkFBK0I7d0JBQy9CLGVBQWU7d0JBQ2Ysc0JBQXNCO3dCQUN0QixxQkFBcUI7d0JBQ3JCLHFCQUFxQjt3QkFDckIsc0JBQXNCO3FCQUN6QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsc0JBQXNCO3dCQUN0QiwyQkFBMkI7d0JBQzNCLCtCQUErQjt3QkFDL0IsZUFBZTt3QkFDZixzQkFBc0I7d0JBQ3RCLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQixzQkFBc0I7cUJBQ3pCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxjQUFjO3dCQUNkLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxrQkFBa0I7cUJBQ3JCO29CQUNELFNBQVMsRUFBRTt3QkFDUCxhQUFhO3FCQUNoQjtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsMkJBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRixtQkFBQztDQXBDRCxBQW9DQyxJQUFBO1NBcENZLFlBQVkiLCJmaWxlIjoiZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=