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
var ConfirmationDialogComponent = /** @class */ (function (_super) {
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
    ConfirmationDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-confirmation-dialog',
                    template: "\n      <sme-dialog #dialog dialogMode=\"centered\" [clickBackdrop]='false'>\n          <sme-dialog-header>\n              <h2 id=\"sme-dialog-title\">{{ title }}</h2>\n          </sme-dialog-header>\n          <sme-dialog-content>\n              <p id=\"sme-dialog-desc\">{{ message }}</p>\n              <div class=\"sme-checkbox sme-margin-top-sm\" *ngIf=\"checkboxText\">\n                  <label class=\"sme-font-body\">\n              <input type=\"checkbox\" [(ngModel)]=\"checked\"/>\n              <span>{{checkboxText}}</span>\n            </label>\n              </div>\n              <div class=\"sme-checkbox sme-margin-top-xs\" *ngIf=\"doubleCheckText\">\n                  <label class=\"sme-font-body\">\n              <input type=\"checkbox\" [(ngModel)]=\"doubleChecked\"/>\n              <span>{{doubleCheckText}}</span>\n            </label>\n              </div>\n          </sme-dialog-content>\n          <sme-dialog-footer>\n              <button type=\"button\" class=\"sme-button-primary\" [disabled]=\"doubleCheckText && !doubleChecked\" (click)=\"onConfirm()\">{{ confirmButtonText }}</button>\n              <button type=\"button\" (click)=\"onCancel()\">{{ cancelButtonText }}</button>\n          </sme-dialog-footer>\n      </sme-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    ConfirmationDialogComponent.ctorParameters = function () { return [
        { type: DialogService, },
    ]; };
    return ConfirmationDialogComponent;
}(BaseDialogComponent));
export { ConfirmationDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGlhbG9nL2NvbmZpcm1hdGlvbi1kaWFsb2cvY29uZmlybWF0aW9uLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQWlCLE1BQU8sZUFBQSxDQUFnQjtBQUVqRCxPQUFPLEVBQUUsbUJBQUEsRUFBaUQsTUFBTywwQkFBQSxDQUEyQjtBQUU1RixPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8sbUJBQUEsQ0FBb0I7QUF5RGxEO0lBQWlELCtDQUF3RTtJQWNySDs7T0FFRztJQUNILHFDQUFZLGFBQTRCO2VBQ3BDLGtCQUFNLGFBQWEsQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLG9EQUFjLEdBQXJCLFVBQXNCLE1BQXlCO1FBQzNDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSwwQ0FBSSxHQUFYLFVBQVksT0FBa0M7UUFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO1FBQ2xHLENBQUM7UUFFRCxJQUFJLE1BQU0sR0FBRyxpQkFBTSxJQUFJLFlBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDekMsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUUzQixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNJLCtDQUFTLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQztZQUNOLFNBQVMsRUFBRSxJQUFJO1lBQ2YsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQzVELENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNJLDhDQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ04sU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNFLHNDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFLDZ2Q0F5QlQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDBDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxhQUFhLEdBQUc7S0FDdEIsRUFGNkYsQ0FFN0YsQ0FBQztJQUNGLGtDQUFDO0NBM0dELEFBMkdDLENBM0dnRCxtQkFBbUIsR0EyR25FO1NBM0dZLDJCQUEyQiIsImZpbGUiOiJjb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=