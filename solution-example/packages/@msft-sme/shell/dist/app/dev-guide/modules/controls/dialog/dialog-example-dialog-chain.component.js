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
import { BaseDialogComponent } from '../../../../../angular';
var DialogChainComponent = (function (_super) {
    __extends(DialogChainComponent, _super);
    /**
     * Initializes a new instance of the ConfirmationDialogComponent class.
     */
    function DialogChainComponent(dialogService) {
        var _this = _super.call(this, dialogService) || this;
        _this.openButtonText = 'Open another dialog';
        _this.closeButtonText = 'Close';
        _this.cancelButtonText = 'Cancel';
        _this.keepOpen = true;
        return _this;
    }
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    DialogChainComponent.prototype.show = function (options) {
        if (!options) {
            throw new Error('ConfirmationDialogComponent.show: Options are required to show the dialog.');
        }
        var result = _super.prototype.show.call(this, options);
        this.title = options.title;
        this.label = options.label;
        return result;
    };
    /**
     * The method to call when the confirm button is clicked.
     */
    DialogChainComponent.prototype.onClose = function () {
        var _this = this;
        var subject = this.dialogService.show('confirmation-dialog-chain', {
            cancelButtonText: 'Cancel',
            confirmButtonText: 'OK',
            message: 'Are you sure you want complete the dialog?',
            title: 'Complete dialog?'
        });
        subject.subscribe(function (result) {
            if (result.confirmed) {
                _this.hide({
                    result: _this.label
                });
            }
        });
    };
    /**
     * The method to call when the cancel button is clicked.
     */
    DialogChainComponent.prototype.onCancel = function () {
        var _this = this;
        var subject = this.dialogService.show('confirmation-dialog-chain', {
            cancelButtonText: 'Cancel',
            confirmButtonText: 'OK',
            message: 'Are you sure you want cancel the dialog?',
            title: 'Cancel dialog?'
        });
        subject.subscribe(function (result) {
            if (result.confirmed) {
                _this.hide({
                    result: 'dialog Cancelled'
                });
            }
        });
    };
    /**
     * The method to run when the full screen dialog button is clicked.
     */
    DialogChainComponent.prototype.onClickFullScreenDialog = function () {
        var _this = this;
        var subject = this.dialogService.show('full-screen-dialog-chain', {
            title: 'Full screen dialog from a dialog!',
            label: 'Very sad label in a huge dialog.'
        });
        subject.subscribe(function (result) {
            // handle result
            _this.label += ' Child dialog opened and then closed.';
        });
    };
    return DialogChainComponent;
}(BaseDialogComponent));
export { DialogChainComponent };
DialogChainComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-dialog-example-dialog-chain',
                template: "\n      <sme-confirmation-dialog id=\"confirmation-dialog-chain\"></sme-confirmation-dialog>\n      <sme-dialog-example-full-screen-dialog id=\"full-screen-dialog-chain\"></sme-dialog-example-full-screen-dialog>\n      <sme-dialog #dialog dialogMode=\"pane\">\n        <sme-dialog-header>\n          <h4>{{ title }}</h4>\n        </sme-dialog-header>\n        <sme-dialog-content>\n          <p>{{ label }}</p>\n          <button type=\"button\" class=\"btn\" (click)=\"onClickFullScreenDialog()\">{{ openButtonText }}</button>\n        </sme-dialog-content>\n        <sme-dialog-footer>\n          <div class=\"pull-right\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"onClose()\">{{ closeButtonText }}</button>\n            <button type=\"button\" class=\"btn\" (click)=\"onCancel()\">{{ cancelButtonText }}</button>\n          </div>\n        </sme-dialog-footer>\n      </sme-dialog>\n    "
            },] },
];
/** @nocollapse */
DialogChainComponent.ctorParameters = function () { return [
    null,
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9kaWFsb2cvZGlhbG9nLWV4YW1wbGUtZGlhbG9nLWNoYWluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBaUIsTUFBTyxlQUFBLENBQWdCO0FBTWpELE9BQU8sRUFDSCxtQkFBbUIsRUFPdEIsTUFBTSx3QkFBQSxDQUF5QjtBQTRCaEM7SUFBMEMsd0NBQXdFO0lBVzlHOztPQUVHO0lBQ0gsOEJBQVksYUFBNEI7UUFBeEMsWUFDSSxrQkFBTSxhQUFhLENBQUMsU0FFdkI7UUFaTSxvQkFBYyxHQUFHLHFCQUFxQixDQUFDO1FBRXZDLHFCQUFlLEdBQUcsT0FBTyxDQUFDO1FBRTFCLHNCQUFnQixHQUFHLFFBQVEsQ0FBQztRQU8vQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzs7SUFDekIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksbUNBQUksR0FBWCxVQUFZLE9BQWtDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsNEVBQTRFLENBQUMsQ0FBQztRQUNsRyxDQUFDO1FBRUQsSUFBSSxNQUFNLEdBQUcsaUJBQU0sSUFBSSxZQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFFM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxzQ0FBTyxHQUFkO1FBQUEsaUJBZUM7UUFkRyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBc0QsMkJBQTJCLEVBQUU7WUFDcEgsZ0JBQWdCLEVBQUUsUUFBUTtZQUMxQixpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLE9BQU8sRUFBRSw0Q0FBNEM7WUFDckQsS0FBSyxFQUFFLGtCQUFrQjtTQUM1QixDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNyQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLElBQUksQ0FBQztvQkFDTixNQUFNLEVBQUUsS0FBSSxDQUFDLEtBQUs7aUJBQ3JCLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNJLHVDQUFRLEdBQWY7UUFBQSxpQkFlQztRQWRHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFzRCwyQkFBMkIsRUFBRTtZQUNwSCxnQkFBZ0IsRUFBRSxRQUFRO1lBQzFCLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsT0FBTyxFQUFFLDBDQUEwQztZQUNuRCxLQUFLLEVBQUUsZ0JBQWdCO1NBQzFCLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixLQUFJLENBQUMsSUFBSSxDQUFDO29CQUNOLE1BQU0sRUFBRSxrQkFBa0I7aUJBQzdCLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNJLHNEQUF1QixHQUE5QjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQWdFLDBCQUEwQixFQUFFO1lBQzdILEtBQUssRUFBRSxtQ0FBbUM7WUFDMUMsS0FBSyxFQUFFLGtDQUFrQztTQUM1QyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBcUM7WUFDcEQsZ0JBQWdCO1lBQ2hCLEtBQUksQ0FBQyxLQUFLLElBQUksdUNBQXVDLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBNkJMLDJCQUFDO0FBQUQsQ0F2SEEsQUF1SEMsQ0F2SHlDLG1CQUFtQjs7QUEyRnRELCtCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLGlDQUFpQztnQkFDM0MsUUFBUSxFQUFFLDQ1QkFrQlQ7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsbUNBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLElBQUk7Q0FDSCxFQUY2RixDQUU3RixDQUFDIiwiZmlsZSI6ImRpYWxvZy1leGFtcGxlLWRpYWxvZy1jaGFpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9