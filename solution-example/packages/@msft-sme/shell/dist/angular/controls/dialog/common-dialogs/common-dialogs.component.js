import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';
var CommonDialogsComponent = (function () {
    /**
     * Initializes a new instance of the CommonDialogsComponent class.
     */
    function CommonDialogsComponent(dialogService) {
        this.dialogService = dialogService;
    }
    return CommonDialogsComponent;
}());
export { CommonDialogsComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGlhbG9nL2NvbW1vbi1kaWFsb2dzL2NvbW1vbi1kaWFsb2dzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUUxQyxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8sbUJBQUEsQ0FBb0I7QUFHbEQ7SUFFSTs7T0FFRztJQUNILGdDQUFtQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUMvQyxDQUFDO0lBY0wsNkJBQUM7QUFBRCxDQXBCQSxBQW9CQzs7QUFiTSxpQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRSwyTUFHVDthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxxQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsYUFBYSxHQUFHO0NBQ3RCLEVBRjZGLENBRTdGLENBQUMiLCJmaWxlIjoiY29tbW9uLWRpYWxvZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==