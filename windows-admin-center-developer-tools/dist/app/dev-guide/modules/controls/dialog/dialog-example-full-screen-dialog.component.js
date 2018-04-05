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
var ConfirmationDialogComponent = /** @class */ (function (_super) {
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
    ConfirmationDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-dialog-example-full-screen-dialog',
                    template: "\n      <sme-dialog #dialog dialogMode=\"fullscreen\" fullScreenLeftDistance=\"20%\" >\n        <sme-dialog-header>\n          <h4 id=\"sme-dialog-title\">{{ title }}</h4>\n        </sme-dialog-header>\n        <sme-dialog-content>\n          <p id=\"sme-dialog-desc\">{{ label }}</p>\n        </sme-dialog-content>\n        <sme-dialog-footer>\n          <div class=\"pull-right\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"onClose()\">{{ closeButtonText }}</button>\n            <button type=\"button\" class=\"btn\" (click)=\"onCancel()\">{{ cancelButtonText }}</button>\n          </div>\n        </sme-dialog-footer>\n      </sme-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    ConfirmationDialogComponent.ctorParameters = function () { return [
        { type: DialogService, },
    ]; };
    return ConfirmationDialogComponent;
}(BaseDialogComponent));
export { ConfirmationDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9kaWFsb2cvZGlhbG9nLWV4YW1wbGUtZnVsbC1zY3JlZW4tZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBaUIsTUFBTyxlQUFBLENBQWdCO0FBSWpELE9BQU8sRUFBRSxtQkFBQSxFQUFrRCxhQUFBLEVBQWMsTUFBTyx5QkFBQSxDQUEwQjtBQTRCMUc7SUFBaUQsK0NBQWtGO0lBUy9IOztPQUVHO0lBQ0gscUNBQVksYUFBNEI7UUFBeEMsWUFDSSxrQkFBTSxhQUFhLENBQUMsU0FDdkI7UUFUTSxxQkFBZSxHQUFHLE9BQU8sQ0FBQztRQUUxQixzQkFBZ0IsR0FBRyxRQUFRLENBQUM7O0lBT25DLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLDBDQUFJLEdBQVgsVUFBWSxPQUF1QztRQUMvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLDRFQUE0RSxDQUFDLENBQUM7UUFDbEcsQ0FBQztRQUVELElBQUksTUFBTSxHQUFHLGlCQUFNLElBQUksWUFBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBRTNCLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksNkNBQU8sR0FBZDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDTixNQUFNLEVBQUUsd0JBQXdCO1NBQ25DLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNJLDhDQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ04sTUFBTSxFQUFFLDBCQUEwQjtTQUNyQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0Usc0NBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsdUNBQXVDO29CQUNqRCxRQUFRLEVBQUUseXFCQWVUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwwQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsYUFBYSxHQUFHO0tBQ3RCLEVBRjZGLENBRTdGLENBQUM7SUFDRixrQ0FBQztDQTVFRCxBQTRFQyxDQTVFZ0QsbUJBQW1CLEdBNEVuRTtTQTVFWSwyQkFBMkIiLCJmaWxlIjoiZGlhbG9nLWV4YW1wbGUtZnVsbC1zY3JlZW4tZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL1NvdXJjZS9iYXNlL21zZnQtc21lLWRldmVsb3Blci10b29scy9pbmxpbmVTcmMvIn0=