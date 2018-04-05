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
import { FormBuilder, Validators } from '@angular/forms';
import { AppContextService, BaseDialogComponent, DialogService } from '../../../../../../angular';
import { NotificationState } from '../../../../../../core';
import { AccessService } from '../access.service';
var AddSecurityGroupDialogComponent = /** @class */ (function (_super) {
    __extends(AddSecurityGroupDialogComponent, _super);
    /**
     * Initializes a new instance of the ConfirmationDialogComponent class.
     */
    function AddSecurityGroupDialogComponent(dialogService, appContextService, formBuilder, accessService) {
        var _this = _super.call(this, dialogService) || this;
        _this.appContextService = appContextService;
        _this.formBuilder = formBuilder;
        _this.accessService = accessService;
        _this.strings = _this.appContextService.resourceCache.getStrings().MsftSmeShell;
        // TODO: Write logic to change this value.
        _this.hideNonStandard = false;
        return _this;
    }
    /**
     * Shows the dialog.
     */
    AddSecurityGroupDialogComponent.prototype.show = function (options) {
        if (!options) {
            throw new Error('ConfirmationDialogComponent.show: Options are required to show the dialog.');
        }
        this.form.reset();
        this.initializeForm();
        this.cancelButtonText = options.cancelButtonText;
        this.confirmButtonText = options.confirmButtonText;
        this.message = options.message;
        this.title = options.title;
        this.form.markAsPristine();
        return _super.prototype.show.call(this, options);
    };
    /**
     * The method run when the component is initialized.
     */
    AddSecurityGroupDialogComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.initializeForm();
    };
    /**
     * The method to call when the confirm button is clicked.
     */
    AddSecurityGroupDialogComponent.prototype.onConfirm = function () {
        var results = {
            confirmed: true,
            name: this.name.trim(),
            secGroupType: this.form.get('securityGroupType').value
        };
        this.hide(results);
    };
    AddSecurityGroupDialogComponent.prototype.closeRequested = function (reason) {
        this.onCancel();
    };
    /**
     * The method to call when the cancel button is clicked.
     */
    AddSecurityGroupDialogComponent.prototype.onCancel = function () {
        var results = {
            confirmed: false
        };
        this.hide(results);
    };
    /**
     * Initializes the form components;
     */
    AddSecurityGroupDialogComponent.prototype.initializeForm = function () {
        this.securityGroupTypeSelection = 'SecurityGroup';
        this.form = this.formBuilder.group({
            name: [
                this.name,
                [
                    Validators.required
                ]
            ],
            securityGroupType: [
                this.securityGroupTypeSelection,
                [
                    Validators.required
                ]
            ]
        });
    };
    AddSecurityGroupDialogComponent.prototype.showErrorAlert = function (message) {
        this.appContextService.notification.alert(this.appContextService.activeConnection.nodeName, NotificationState.Error, message);
    };
    AddSecurityGroupDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-access-add-secgroup-dialog',
                    template: "\n      <sme-dialog #dialog (keyup.enter)=\"onConfirm()\">\n          <sme-dialog-header>\n              <h3 id=\"sme-dialog-title\">{{strings.App.SettingsDialog.access.addSecurityGroupHeader}}</h3>\n          </sme-dialog-header>\n          <sme-dialog-content>\n              <form id=\"sme-add-securityGroupForm\" [formGroup]=\"form\" style=\"position:relative\">\n                  <div class=\"form-group\">\n                      <label for=\"sme-securityGroup-name\" class=\"required-input-label\">{{strings.App.SettingsDialog.access.securityGroupName}}</label>\n                      <input id=\"sme-securityGroup-name\" type=\"text\" class=\"form-control\" formControlName=\"name\" [(ngModel)]=\"name\" aria-required=\"true\" required autofocus>\n                      <label class=\"required-input-label\">{{strings.App.SettingsDialog.access.securityGroupType}}</label>\n                      <div class=\"radio\">\n                          <label for=\"sme-securityGroup-type\">\n                              <input id=\"sme-securityGroup-type\" type=\"radio\" aria-required=\"true\" formControlName=\"securityGroupType\" [(ngModel)]='securityGroupTypeSelection' value='SecurityGroup'/>\n                              <span>{{strings.App.SettingsDialog.access.securityGroup}}</span>\n                          </label>\n                      </div>\n                      <div class=\"radio\">\n                          <label for=\"sme-securityGroup-smartCardGroup\">\n                              <input id=\"sme-securityGroup-smartCardGroup\" type=\"radio\" formControlName=\"securityGroupType\" [(ngModel)]='securityGroupTypeSelection' value='SmartCardGroup'/>\n                              <span>{{strings.App.SettingsDialog.access.smartCardSecurityGroup}}</span>\n                          </label>\n                      </div>\n                      <!--Device group validation work will be reenabled after January release when we have clear info of what to check for.-->\n                      <!-- <div class=\"radio\">\n                          <label>\n                              <input type=\"radio\" name=\"securityGroupType\" formControlName=\"securityGroupType\" value='Machine' [(ngModel)]='securityGroupType' [attr.disabled] = 'hideNonStandard'/>\n                              <span>{{strings.App.SettingsDialog.access.machineSecurityGroup}}</span>\n                          </label>\n                      </div> -->\n                  </div>\n              </form>\n          </sme-dialog-content>\n          <sme-dialog-footer>\n              <div class=\"pull-right\">\n                  <button type=\"submit\" form=\"sme-add-securityGroupForm\" class=\"btn btn-primary\" [disabled]=\"!form.valid\" (click)=\"onConfirm()\">{{strings.App.SettingsDialog.access.save}}</button>\n                  <button type=\"button\" class=\"btn\" (click)=\"onCancel()\">{{strings.App.SettingsDialog.access.cancel}}</button>\n              </div>\n          </sme-dialog-footer>\n      </sme-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    AddSecurityGroupDialogComponent.ctorParameters = function () { return [
        { type: DialogService, },
        { type: AppContextService, },
        { type: FormBuilder, },
        { type: AccessService, },
    ]; };
    return AddSecurityGroupDialogComponent;
}(BaseDialogComponent));
export { AddSecurityGroupDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vcGFuZWxzL2FjY2Vzcy9kaWFsb2dzL2FkZC1zZWN1cml0eWdyb3VwLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQWtCLE1BQU8sZUFBQSxDQUFnQjtBQUNsRCxPQUFPLEVBQUUsV0FBQSxFQUF3QixVQUFBLEVBQVcsTUFBTyxnQkFBQSxDQUFpQjtBQUVwRSxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLG1CQUFtQixFQUduQixhQUFhLEVBQ2hCLE1BQU0sMkJBQUEsQ0FBNEI7QUFDbkMsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sd0JBQUEsQ0FBeUI7QUFFM0QsT0FBTyxFQUFFLGFBQUEsRUFBYyxNQUFPLG1CQUFBLENBQW9CO0FBMENsRDtJQUFxRCxtREFBc0U7SUFnQnZIOztPQUVHO0lBQ0gseUNBQ0ksYUFBNEIsRUFDcEIsaUJBQW9DLEVBQ3BDLFdBQXdCLEVBQ3hCLGFBQTRCO1FBSnhDLFlBTUksa0JBQU0sYUFBYSxDQUFDLFNBQ3ZCO1FBTFcsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxpQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixtQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXJCakMsYUFBTyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFXLENBQUMsWUFBWSxDQUFDO1FBV3pGLDBDQUEwQztRQUNuQyxxQkFBZSxHQUFHLEtBQUssQ0FBQzs7SUFZL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksOENBQUksR0FBWCxVQUFZLE9BQWlDO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsNEVBQTRFLENBQUMsQ0FBQztRQUNsRyxDQUFDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ25ELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsaUJBQU0sSUFBSSxZQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7T0FFRztJQUNJLGtEQUFRLEdBQWY7UUFDSSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksbURBQVMsR0FBaEI7UUFDSSxJQUFNLE9BQU8sR0FBNEI7WUFDckMsU0FBUyxFQUFFLElBQUk7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDdEIsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsS0FBSztTQUN6RCxDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRU0sd0RBQWMsR0FBckIsVUFBc0IsTUFBVztRQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksa0RBQVEsR0FBZjtRQUNJLElBQU0sT0FBTyxHQUE0QjtZQUNyQyxTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSyx3REFBYyxHQUF0QjtRQUNJLElBQUksQ0FBQywwQkFBMEIsR0FBRyxlQUFlLENBQUM7UUFDbEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUMvQixJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLElBQUk7Z0JBQ1Q7b0JBQ0ksVUFBVSxDQUFDLFFBQVE7aUJBQ3RCO2FBQ0o7WUFDRCxpQkFBaUIsRUFBRTtnQkFDZixJQUFJLENBQUMsMEJBQTBCO2dCQUMvQjtvQkFDSSxVQUFVLENBQUMsUUFBUTtpQkFDdEI7YUFDSjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyx3REFBYyxHQUF0QixVQUF1QixPQUFlO1FBQ2xDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xJLENBQUM7SUFDRSwwQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxnQ0FBZ0M7b0JBQzFDLFFBQVEsRUFBRSw0OUZBd0NUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCw4Q0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsYUFBYSxHQUFHO1FBQ3ZCLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO1FBQzNCLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztRQUNyQixFQUFDLElBQUksRUFBRSxhQUFhLEdBQUc7S0FDdEIsRUFMNkYsQ0FLN0YsQ0FBQztJQUNGLHNDQUFDO0NBL0pELEFBK0pDLENBL0pvRCxtQkFBbUIsR0ErSnZFO1NBL0pZLCtCQUErQiIsImZpbGUiOiJhZGQtc2VjdXJpdHlncm91cC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==