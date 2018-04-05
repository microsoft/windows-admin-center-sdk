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
var ConfirmationDialogComponent = (function (_super) {
    __extends(ConfirmationDialogComponent, _super);
    /**
     * Initializes a new instance of the ConfirmationDialogComponent class.
     */
    function ConfirmationDialogComponent(dialogService) {
        var _this = _super.call(this, dialogService) || this;
        _this.closeButtonText = 'Close';
        _this.cancelButtonText = 'Cancel';
        return _this;
    }
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
        this.title = options.title;
        this.label = options.label;
        return result;
    };
    /**
     * The method to call when the confirm button is clicked.
     */
    ConfirmationDialogComponent.prototype.onClose = function () {
        this.hide({
            result: 'you closed the dialog!'
        });
    };
    /**
     * The method to call when the cancel button is clicked.
     */
    ConfirmationDialogComponent.prototype.onCancel = function () {
        this.hide({
            result: 'you canceled the dialog!'
        });
    };
    return ConfirmationDialogComponent;
}(BaseDialogComponent));
export { ConfirmationDialogComponent };
ConfirmationDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-dialog-example-full-screen-dialog',
                template: "\n      <sme-dialog #dialog dialogMode=\"fullscreen\" fullScreenLeftDistance=\"20%\" >\n        <sme-dialog-header>\n          <h4>{{ title }}</h4>\n        </sme-dialog-header>\n        <sme-dialog-content>\n          <p>{{ label }}</p>\n        </sme-dialog-content>\n        <sme-dialog-footer>\n          <div class=\"pull-right\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"onClose()\">{{ closeButtonText }}</button>\n            <button type=\"button\" class=\"btn\" (click)=\"onCancel()\">{{ cancelButtonText }}</button>\n          </div>\n        </sme-dialog-footer>\n      </sme-dialog>\n    "
            },] },
];
/** @nocollapse */
ConfirmationDialogComponent.ctorParameters = function () { return [
    null,
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9kaWFsb2cvZGlhbG9nLWV4YW1wbGUtZnVsbC1zY3JlZW4tZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBaUIsTUFBTyxlQUFBLENBQWdCO0FBSWpELE9BQU8sRUFBRSxtQkFBQSxFQUFnRSxNQUFPLHdCQUFBLENBQXlCO0FBNEJ6RztJQUFpRCwrQ0FBa0Y7SUFTL0g7O09BRUc7SUFDSCxxQ0FBWSxhQUE0QjtRQUF4QyxZQUNJLGtCQUFNLGFBQWEsQ0FBQyxTQUN2QjtRQVRNLHFCQUFlLEdBQUcsT0FBTyxDQUFDO1FBRTFCLHNCQUFnQixHQUFHLFFBQVEsQ0FBQzs7SUFPbkMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksMENBQUksR0FBWCxVQUFZLE9BQXVDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsNEVBQTRFLENBQUMsQ0FBQztRQUNsRyxDQUFDO1FBRUQsSUFBSSxNQUFNLEdBQUcsaUJBQU0sSUFBSSxZQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFFM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7O09BRUc7SUFDSSw2Q0FBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQztZQUNOLE1BQU0sRUFBRSx3QkFBd0I7U0FDbkMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ0ksOENBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDTixNQUFNLEVBQUUsMEJBQTBCO1NBQ3JDLENBQUMsQ0FBQztJQUNQLENBQUM7SUEwQkwsa0NBQUM7QUFBRCxDQTVFQSxBQTRFQyxDQTVFZ0QsbUJBQW1COztBQW1EN0Qsc0NBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsdUNBQXVDO2dCQUNqRCxRQUFRLEVBQUUsMG5CQWVUO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDBDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixJQUFJO0NBQ0gsRUFGNkYsQ0FFN0YsQ0FBQyIsImZpbGUiOiJkaWFsb2ctZXhhbXBsZS1mdWxsLXNjcmVlbi1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==