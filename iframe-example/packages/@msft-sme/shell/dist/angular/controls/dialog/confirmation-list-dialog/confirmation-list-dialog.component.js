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
var ConfirmationListDialogComponent = /** @class */ (function (_super) {
    __extends(ConfirmationListDialogComponent, _super);
    function ConfirmationListDialogComponent(dialogService) {
        return _super.call(this, dialogService) || this;
    }
    ConfirmationListDialogComponent.prototype.closeRequested = function (reason) {
        this.onCancel();
    };
    ConfirmationListDialogComponent.prototype.show = function (options) {
        var _this = this;
        if (!options) {
            throw new Error('ConfirmationListDialogComponent.show: Options are required to show the dialog.');
        }
        var result = _super.prototype.show.call(this, options);
        this.cancelButtonText = options.cancelButtonText;
        this.checkboxText = options.checkboxText;
        this.checked = false;
        this.confirmButtonText = options.confirmButtonText;
        this.listFooterText = options.listFooterText;
        this.listData = [];
        this.listHeaderText = options.listHeaderText;
        this.title = options.title;
        this.loading = true;
        this.dataSourceSubscription = options.listDataSource.subscribe(function (strings) {
            _this.loading = false;
            _this.listData = strings;
        }, function (error) {
            _this.hide({
                confirmed: false,
                observableError: error
            });
        });
        return result;
    };
    ConfirmationListDialogComponent.prototype.hide = function (result) {
        this.dataSourceSubscription.unsubscribe();
        _super.prototype.hide.call(this, result);
    };
    ConfirmationListDialogComponent.prototype.onConfirm = function () {
        this.hide({
            confirmed: true,
            checkboxResult: (this.checkboxText) ? this.checked : null
        });
    };
    ConfirmationListDialogComponent.prototype.onCancel = function () {
        this.hide({
            confirmed: false
        });
    };
    ConfirmationListDialogComponent.decorators = [
        { type: Component, args: [{
                    template: "\n      <sme-dialog #dialog dialogMode=\"centered\" [clickBackdrop]='false'>\n        <sme-dialog-header>\n          <h2 id=\"sme-dialog-title\">{{ title }}</h2>\n        </sme-dialog-header>\n        <sme-dialog-content>\n          <sme-loading-wheel *ngIf=\"loading\" [size]=\"small\"></sme-loading-wheel>\n          <p>{{ listHeaderText }}</p>\n          <ul class=\"sme-list sme-position-flex-auto sme-margin-top-xxs\">\n            <li *ngFor=\"let item of listData\">{{ item }}</li>\n          </ul>\n          <div class=\"sme-checkbox sme-position-flex-none sme-margin-top-xxs\" *ngIf=\"checkboxText\">\n            <label class=\"sme-font-body\">\n              <input type=\"checkbox\" [(ngModel)]=\"checked\"/>\n              <span>{{checkboxText}}</span>\n            </label>\n          </div>\n        </sme-dialog-content>\n        <sme-dialog-footer>\n          <button type=\"button\" class=\"sme-button-primary\" [disabled]=\"loading\" (click)=\"onConfirm()\">{{ confirmButtonText }}</button>\n          <button type=\"button\" (click)=\"onCancel()\">{{ cancelButtonText }}</button>\n        </sme-dialog-footer>\n      </sme-dialog>\n    ",
                    selector: 'sme-confirmation-list-dialog'
                },] },
    ];
    /** @nocollapse */
    ConfirmationListDialogComponent.ctorParameters = function () { return [
        { type: DialogService, },
    ]; };
    return ConfirmationListDialogComponent;
}(BaseDialogComponent));
export { ConfirmationListDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGlhbG9nL2NvbmZpcm1hdGlvbi1saXN0LWRpYWxvZy9jb25maXJtYXRpb24tbGlzdC1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUcxQyxPQUFPLEVBQUUsbUJBQUEsRUFBaUQsTUFBTywwQkFBQSxDQUEyQjtBQUU1RixPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8sbUJBQUEsQ0FBb0I7QUFtRWxEO0lBQ1ksbURBQWdGO0lBYXhGLHlDQUFZLGFBQTRCO2VBQ3BDLGtCQUFNLGFBQWEsQ0FBQztJQUN4QixDQUFDO0lBRU0sd0RBQWMsR0FBckIsVUFBc0IsTUFBeUI7UUFDM0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTSw4Q0FBSSxHQUFYLFVBQVksT0FBc0M7UUFBbEQsaUJBNEJDO1FBM0JHLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0ZBQWdGLENBQUMsQ0FBQztRQUN0RyxDQUFDO1FBRUQsSUFBSSxNQUFNLEdBQUcsaUJBQU0sSUFBSSxZQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDakQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDbkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUMxRCxVQUFBLE9BQU87WUFDSCxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixLQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUM1QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsS0FBSSxDQUFDLElBQUksQ0FBQztnQkFDTixTQUFTLEVBQUUsS0FBSztnQkFDaEIsZUFBZSxFQUFFLEtBQUs7YUFDekIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFUCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFTSw4Q0FBSSxHQUFYLFVBQVksTUFBcUM7UUFDN0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLGlCQUFNLElBQUksWUFBQyxNQUFNLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRU0sbURBQVMsR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ04sU0FBUyxFQUFFLElBQUk7WUFDZixjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUk7U0FDNUQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLGtEQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ04sU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNFLDBDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLHVvQ0F1QlQ7b0JBQ0QsUUFBUSxFQUFFLDhCQUE4QjtpQkFDM0MsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDhDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxhQUFhLEdBQUc7S0FDdEIsRUFGNkYsQ0FFN0YsQ0FBQztJQUNGLHNDQUFDO0NBdEdELEFBc0dDLENBckdXLG1CQUFtQixHQXFHOUI7U0F0R1ksK0JBQStCIiwiZmlsZSI6ImNvbmZpcm1hdGlvbi1saXN0LWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9