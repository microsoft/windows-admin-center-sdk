var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '@angular/core';
import { BaseDialogComponent } from '../base-dialog.component';
import { DialogService } from '../dialog.service';
var ConfirmationDialogComponent = (function (_super) {
    __extends(ConfirmationDialogComponent, _super);
    /**
     * Initializes a new instance of the ConfirmationDialogComponent class.
     */
    function ConfirmationDialogComponent(dialogService) {
        return _super.call(this, dialogService) || this;
    }
    /**
     * handler for when a close is requested
     * this override cancels the confirmation when requested to close
     * @param reason - reason for the close following DialogCloseReason
     */
    ConfirmationDialogComponent.prototype.closeRequested = function (reason) {
        this.onCancel();
    };
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    ConfirmationDialogComponent.prototype.show = function (options) {
        if (!options) {
            throw new Error('ConfirmationDialogComponent.show: Options are required to show the dialog.');
        }
        var result = _super.prototype.show.call(this, options);
        this.cancelButtonText = options.cancelButtonText;
        this.checkboxText = options.checkboxText;
        this.doubleCheckText = options.doubleCheckText;
        this.checked = false;
        this.doubleChecked = false;
        this.confirmButtonText = options.confirmButtonText;
        this.message = options.message;
        this.title = options.title;
        return result;
    };
    /**
     * The method to call when the confirm button is clicked.
     */
    ConfirmationDialogComponent.prototype.onConfirm = function () {
        this.hide({
            confirmed: true,
            checkboxResult: (this.checkboxText) ? this.checked : null
        });
    };
    /**
     * The method to call when the cancel button is clicked.
     */
    ConfirmationDialogComponent.prototype.onCancel = function () {
        this.hide({
            confirmed: false
        });
    };
    return ConfirmationDialogComponent;
}(BaseDialogComponent));
export { ConfirmationDialogComponent };
ConfirmationDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-confirmation-dialog',
                template: "\n      <sme-dialog #dialog dialogMode=\"centered\">\n        <sme-dialog-header>\n          <h4>{{ title }}</h4>\n        </sme-dialog-header>\n        <sme-dialog-content>\n          <p>{{ message }}</p>\n          <div class=\"checkbox\" *ngIf=\"checkboxText\">\n            <label>\n              <input type=\"checkbox\" [(ngModel)]=\"checked\"/>\n              <span>{{checkboxText}}</span>\n            </label>\n          </div>\n          <div class=\"checkbox\" *ngIf=\"doubleCheckText\">\n            <label>\n              <input type=\"checkbox\" [(ngModel)]=\"doubleChecked\"/>\n              <span>{{doubleCheckText}}</span>\n            </label>\n          </div>\n        </sme-dialog-content>\n        <sme-dialog-footer>\n          <div class=\"pull-right\">\n            <button type=\"button\" [disabled]=\"doubleCheckText && !doubleChecked\" class=\"btn btn-primary\" (click)=\"onConfirm()\">{{ confirmButtonText }}</button>\n            <button type=\"button\" class=\"btn\" (click)=\"onCancel()\">{{ cancelButtonText }}</button>\n          </div>\n        </sme-dialog-footer>\n      </sme-dialog>\n    ",
                styles: ["\n      .pane {\n          position: absolute;\n          top: 0;\n          bottom: 0;\n          right: 0;\n      }\n\n      .pane.full-screen .modal-content {\n          width: 100%;\n          border: 0px;\n      }\n\n      .pane .modal-content {\n        height: 100%;\n        width: 520px;\n        overflow-y: auto;\n        margin: 0px;\n        border-top-width: 0px;\n        border-bottom-width: 0px;\n        border-right-width: 0px;\n      }\n\n      .modal-content {\n        padding: 0;\n      }\n\n      .modal-dialog .modal-body {\n        max-height: 540px;\n        overflow-y: auto;\n        overflow-x: hidden;\n      }\n\n      .modal-body {\n        margin: 0px 0px 0px 36px;\n        padding: 0px 36px 0px 0px;\n      }\n\n      .modal-header {\n        padding: 24px 36px 0 36px;\n      }\n\n      .modal-footer {\n        padding: 0 36px 24px 36px;\n      }\n      :host >>> .modal-footer .btn {\n        width: auto;\n        margin: 4px 8px 0px 0px\n      }\n\n      :host >>> h1,\n      :host >>> h2,\n      :host >>> h3,\n      :host >>> h4,\n      :host >>> h5,\n      :host >>> h6 {\n        padding-top: 0;\n        padding-bottom: 36px;\n      }\n\n      :host >>> p {\n        padding-top: 0;\n        padding-bottom: 15px;\n      }\n\n      /*:host >>> .form-group .form-group-label,\n      :host >>> .form-group label {\n        font-size: 13px;\n      }*/\n\n      :host >>> .dialog-scrollable-content {\n        max-height: 30vh;\n        overflow-y: auto;\n        margin-bottom: 2px;\n      }\n\n      :host.no-footer .modal-content .modal-footer {\n        display: none;\n      }\n\n      :host >>> .list-dialog-header,\n      :host >>> .list-dialog-footer {\n        padding-bottom: 0;\n      }\n    "]
            },] },
];
/** @nocollapse */
ConfirmationDialogComponent.ctorParameters = function () { return [
    { type: DialogService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGlhbG9nL2NvbmZpcm1hdGlvbi1kaWFsb2cvY29uZmlybWF0aW9uLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQWlCLE1BQU8sZUFBQSxDQUFnQjtBQUVqRCxPQUFPLEVBQUUsbUJBQUEsRUFBaUQsTUFBTywwQkFBQSxDQUEyQjtBQUU1RixPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8sbUJBQUEsQ0FBb0I7QUFxRGxEO0lBQWlELCtDQUF3RTtJQWNySDs7T0FFRztJQUNILHFDQUFZLGFBQTRCO2VBQ3BDLGtCQUFNLGFBQWEsQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLG9EQUFjLEdBQXJCLFVBQXNCLE1BQXlCO1FBQzNDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSwwQ0FBSSxHQUFYLFVBQVksT0FBa0M7UUFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO1FBQ2xHLENBQUM7UUFFRCxJQUFJLE1BQU0sR0FBRyxpQkFBTSxJQUFJLFlBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDekMsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUUzQixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNJLCtDQUFTLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQztZQUNOLFNBQVMsRUFBRSxJQUFJO1lBQ2YsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSTtTQUM1RCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSSw4Q0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQztZQUNOLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztJQUNQLENBQUM7SUEySEwsa0NBQUM7QUFBRCxDQWxNQSxBQWtNQyxDQWxNZ0QsbUJBQW1COztBQXdFN0Qsc0NBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUUseW1DQTJCVDtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxtdERBb0ZSLENBQUM7YUFDTCxFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsMENBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLEVBQUMsSUFBSSxFQUFFLGFBQWEsR0FBRztDQUN0QixFQUY2RixDQUU3RixDQUFDIiwiZmlsZSI6ImNvbmZpcm1hdGlvbi1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==