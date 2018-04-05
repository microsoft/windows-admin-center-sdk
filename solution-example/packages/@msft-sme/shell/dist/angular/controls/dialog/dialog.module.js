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
var DialogModule = (function () {
    function DialogModule() {
    }
    return DialogModule;
}());
export { DialogModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGlhbG9nL2RpYWxvZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxnQkFBQSxDQUFpQjtBQUU3QyxPQUFPLEVBQUUsY0FBQSxFQUFlLE1BQU8sNkJBQUEsQ0FBOEI7QUFDN0QsT0FBTyxFQUFFLHNCQUFBLEVBQXVCLE1BQU8sMkNBQUEsQ0FBNEM7QUFDbkYsT0FBTyxFQUFFLDJCQUFBLEVBQTRCLE1BQU8scURBQUEsQ0FBc0Q7QUFDbEcsT0FBTyxFQUFFLCtCQUFBLEVBQWdDLE1BQU8sK0RBQUEsQ0FBZ0U7QUFDaEgsT0FBTyxFQUNILGVBQWUsRUFDZixzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUN4QixNQUFNLG9CQUFBLENBQXFCO0FBRTVCLE9BQU8sRUFBRSxhQUFBLEVBQWMsTUFBTyxrQkFBQSxDQUFtQjtBQUNqRCxPQUFPLEVBQUUsc0JBQUEsRUFBdUIsTUFBTywyQ0FBQSxDQUE0QztBQUVuRixPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyx1Q0FBQSxDQUF3QztBQUczRTtJQUFBO0lBb0NBLENBQUM7SUFBRCxtQkFBQztBQUFELENBcENBLEFBb0NDOztBQXBDa0MsdUJBQVUsR0FBMEI7SUFDdkUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNyQixZQUFZLEVBQUU7b0JBQ1Ysc0JBQXNCO29CQUN0QiwyQkFBMkI7b0JBQzNCLCtCQUErQjtvQkFDL0IsZUFBZTtvQkFDZixzQkFBc0I7b0JBQ3RCLHFCQUFxQjtvQkFDckIscUJBQXFCO29CQUNyQixzQkFBc0I7aUJBQ3pCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxzQkFBc0I7b0JBQ3RCLDJCQUEyQjtvQkFDM0IsK0JBQStCO29CQUMvQixlQUFlO29CQUNmLHNCQUFzQjtvQkFDdEIscUJBQXFCO29CQUNyQixxQkFBcUI7b0JBQ3JCLHNCQUFzQjtpQkFDekI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGNBQWM7b0JBQ2QsWUFBWTtvQkFDWixXQUFXO29CQUNYLGtCQUFrQjtpQkFDckI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLGFBQWE7aUJBQ2hCO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDJCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDIiwiZmlsZSI6ImRpYWxvZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9