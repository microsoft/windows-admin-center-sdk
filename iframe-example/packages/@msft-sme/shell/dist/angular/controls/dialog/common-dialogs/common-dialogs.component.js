import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';
var CommonDialogsComponent = /** @class */ (function () {
    /**
     * Initializes a new instance of the CommonDialogsComponent class.
     */
    function CommonDialogsComponent(dialogService) {
        this.dialogService = dialogService;
    }
    CommonDialogsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-common-dialogs',
                    template: "\n      <sme-message-dialog [id]=\"dialogService.commonIds.message\"></sme-message-dialog>\n      <sme-confirmation-dialog [id]=\"dialogService.commonIds.confirmation\"></sme-confirmation-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    CommonDialogsComponent.ctorParameters = function () { return [
        { type: DialogService, },
    ]; };
    return CommonDialogsComponent;
}());
export { CommonDialogsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGlhbG9nL2NvbW1vbi1kaWFsb2dzL2NvbW1vbi1kaWFsb2dzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUUxQyxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8sbUJBQUEsQ0FBb0I7QUFHbEQ7SUFFSTs7T0FFRztJQUNILGdDQUFtQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUMvQyxDQUFDO0lBQ0UsaUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsMk1BR1Q7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHFDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxhQUFhLEdBQUc7S0FDdEIsRUFGNkYsQ0FFN0YsQ0FBQztJQUNGLDZCQUFDO0NBcEJELEFBb0JDLElBQUE7U0FwQlksc0JBQXNCIiwiZmlsZSI6ImNvbW1vbi1kaWFsb2dzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=