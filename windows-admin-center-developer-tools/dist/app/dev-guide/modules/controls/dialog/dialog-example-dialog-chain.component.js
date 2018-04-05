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
import { BaseDialogComponent, DialogService } from '@msft-sme/shell/angular';
var DialogChainComponent = /** @class */ (function (_super) {
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
    DialogChainComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-dialog-example-dialog-chain',
                    template: "\n      <sme-confirmation-dialog id=\"confirmation-dialog-chain\"></sme-confirmation-dialog>\n      <sme-dialog-example-full-screen-dialog id=\"full-screen-dialog-chain\"></sme-dialog-example-full-screen-dialog>\n      <sme-dialog #dialog dialogMode=\"pane\">\n        <sme-dialog-header>\n          <h4 id=\"sme-dialog-title\">{{ title }}</h4>\n        </sme-dialog-header>\n        <sme-dialog-content>\n          <p id=\"sme-dialog-desc\">{{ label }}</p>\n          <button type=\"button\" class=\"btn\" (click)=\"onClickFullScreenDialog()\">{{ openButtonText }}</button>\n        </sme-dialog-content>\n        <sme-dialog-footer>\n          <div class=\"pull-right\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"onClose()\">{{ closeButtonText }}</button>\n            <button type=\"button\" class=\"btn\" (click)=\"onCancel()\">{{ cancelButtonText }}</button>\n          </div>\n        </sme-dialog-footer>\n      </sme-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    DialogChainComponent.ctorParameters = function () { return [
        { type: DialogService, },
    ]; };
    return DialogChainComponent;
}(BaseDialogComponent));
export { DialogChainComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9kaWFsb2cvZGlhbG9nLWV4YW1wbGUtZGlhbG9nLWNoYWluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBaUIsTUFBTyxlQUFBLENBQWdCO0FBTWpELE9BQU8sRUFDSCxtQkFBbUIsRUFNbkIsYUFBYSxFQUNoQixNQUFNLHlCQUFBLENBQTBCO0FBNEJqQztJQUEwQyx3Q0FBd0U7SUFXOUc7O09BRUc7SUFDSCw4QkFBWSxhQUE0QjtRQUF4QyxZQUNJLGtCQUFNLGFBQWEsQ0FBQyxTQUV2QjtRQVpNLG9CQUFjLEdBQUcscUJBQXFCLENBQUM7UUFFdkMscUJBQWUsR0FBRyxPQUFPLENBQUM7UUFFMUIsc0JBQWdCLEdBQUcsUUFBUSxDQUFDO1FBTy9CLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDOztJQUN6QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxtQ0FBSSxHQUFYLFVBQVksT0FBa0M7UUFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO1FBQ2xHLENBQUM7UUFFRCxJQUFJLE1BQU0sR0FBRyxpQkFBTSxJQUFJLFlBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUUzQixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNJLHNDQUFPLEdBQWQ7UUFBQSxpQkFlQztRQWRHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFzRCwyQkFBMkIsRUFBRTtZQUNwSCxnQkFBZ0IsRUFBRSxRQUFRO1lBQzFCLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsT0FBTyxFQUFFLDRDQUE0QztZQUNyRCxLQUFLLEVBQUUsa0JBQWtCO1NBQzVCLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixLQUFJLENBQUMsSUFBSSxDQUFDO29CQUNOLE1BQU0sRUFBRSxLQUFJLENBQUMsS0FBSztpQkFDckIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ0ksdUNBQVEsR0FBZjtRQUFBLGlCQWVDO1FBZEcsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQXNELDJCQUEyQixFQUFFO1lBQ3BILGdCQUFnQixFQUFFLFFBQVE7WUFDMUIsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixPQUFPLEVBQUUsMENBQTBDO1lBQ25ELEtBQUssRUFBRSxnQkFBZ0I7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQU07WUFDckIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ04sTUFBTSxFQUFFLGtCQUFrQjtpQkFDN0IsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ0ksc0RBQXVCLEdBQTlCO1FBQUEsaUJBVUM7UUFURyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBZ0UsMEJBQTBCLEVBQUU7WUFDN0gsS0FBSyxFQUFFLG1DQUFtQztZQUMxQyxLQUFLLEVBQUUsa0NBQWtDO1NBQzVDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFxQztZQUNwRCxnQkFBZ0I7WUFDaEIsS0FBSSxDQUFDLEtBQUssSUFBSSx1Q0FBdUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRSwrQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxpQ0FBaUM7b0JBQzNDLFFBQVEsRUFBRSwyOEJBa0JUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxtQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsYUFBYSxHQUFHO0tBQ3RCLEVBRjZGLENBRTdGLENBQUM7SUFDRiwyQkFBQztDQXZIRCxBQXVIQyxDQXZIeUMsbUJBQW1CLEdBdUg1RDtTQXZIWSxvQkFBb0IiLCJmaWxlIjoiZGlhbG9nLWV4YW1wbGUtZGlhbG9nLWNoYWluLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL1NvdXJjZS9iYXNlL21zZnQtc21lLWRldmVsb3Blci10b29scy9pbmxpbmVTcmMvIn0=