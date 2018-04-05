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
import { ActivatedRoute, Router } from '@angular/router';
import { CommonSettingsIsolatedExamplePanelBaseComponent } from './common-settings-isolated-example-panel-base.component';
var CommonSettingsIsolatedExamplePanel3Component = (function (_super) {
    __extends(CommonSettingsIsolatedExamplePanel3Component, _super);
    function CommonSettingsIsolatedExamplePanel3Component(router, activatedRoute, formbuilder, settingsFormService) {
        return _super.call(this, router, activatedRoute, formbuilder, settingsFormService, {
            name3: ''
        }, {
            name3: {
                required: 'this is a mandatory field'
            }
        }, {
            name3: 'setting 3 model value'
        }, 'settings three') || this;
    }
    CommonSettingsIsolatedExamplePanel3Component.prototype.ngOnInit = function () {
        this.sampleForm = this.formbuilder.group({
            name3: [this.modelData.name3, Validators.required]
        });
        _super.prototype.ngOnInit.call(this);
    };
    return CommonSettingsIsolatedExamplePanel3Component;
}(CommonSettingsIsolatedExamplePanelBaseComponent));
export { CommonSettingsIsolatedExamplePanel3Component };
CommonSettingsIsolatedExamplePanel3Component.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng3-controls-common-settings-isolated-example-panel3',
                template: "\n      <form [smeSettingsForm]=\"sampleForm\">\n        <sme-settings-content>\n          <fieldset [disabled]=\"saving\" [formGroup]=\"sampleForm\">\n            <div class=\"form-group\">\n              <div class=\"form-input\">\n                <label for=\"name2\">\n                    {{nameLabel}}\n                  </label>\n                <input id=\"name3\" type=\"text\" class=\"form-control\" formControlName=\"name3\" required autofocus/>\n                <div *ngIf=\"formErrors.name3\" class=\"alert alert-danger\">\n                  {{ formErrors.name3 }}\n                </div>\n              </div>\n            </div>\n          </fieldset>\n        </sme-settings-content>\n        <sme-settings-footer class=\"footer\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onSaveClick()\" [disabled]=\"!sampleForm.dirty || !sampleForm.valid || saving\">{{ saveButtonLabel }}</button>\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onDiscardClick()\" [disabled]=\"!sampleForm.dirty || saving\">{{ discardButtonLabel }}</button>\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCloseClick()\">{{ closeButtonLabel }}</button>\n        </sme-settings-footer>\n      </form>\n    "
            },] },
];
/** @nocollapse */
CommonSettingsIsolatedExamplePanel3Component.ctorParameters = function () { return [
    { type: Router, },
    { type: ActivatedRoute, },
    { type: FormBuilder, },
    null,
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jb21tb24tc2V0dGluZ3MtaXNvbGF0ZWQvY29tbW9uLXNldHRpbmdzLWlzb2xhdGVkLWV4YW1wbGUtcGFuZWwzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxXQUFBLEVBQXFDLFVBQUEsRUFBVyxNQUFPLGdCQUFBLENBQWlCO0FBQ2pGLE9BQU8sRUFBRSxjQUFBLEVBQWdCLE1BQUEsRUFBTyxNQUFPLGlCQUFBLENBQWtCO0FBTXpELE9BQU8sRUFBRSwrQ0FBQSxFQUFnRCxNQUFPLHlEQUFBLENBQTBEO0FBSzFIO0lBQ2UsZ0VBQXNFO0lBRWpGLHNEQUFZLE1BQWMsRUFBRSxjQUE4QixFQUFFLFdBQXdCLEVBQUUsbUJBQXdDO2VBQzFILGtCQUNJLE1BQU0sRUFDTixjQUFjLEVBQ2QsV0FBVyxFQUNYLG1CQUFtQixFQUNuQjtZQUNJLEtBQUssRUFBRSxFQUFFO1NBQ1osRUFDRDtZQUNJLEtBQUssRUFBRTtnQkFDSCxRQUFRLEVBQUUsMkJBQTJCO2FBQ3hDO1NBQ0osRUFDRDtZQUNJLEtBQUssRUFBRSx1QkFBdUI7U0FDakMsRUFDRCxnQkFBZ0IsQ0FBQztJQUN6QixDQUFDO0lBRU0sK0RBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDckMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUNyRCxDQUFDLENBQUM7UUFFSCxpQkFBTSxRQUFRLFdBQUUsQ0FBQztJQUNyQixDQUFDO0lBcUNMLG1EQUFDO0FBQUQsQ0FsRUEsQUFrRUMsQ0FqRWMsK0NBQStDOztBQTZCdkQsdURBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsMERBQTBEO2dCQUNwRSxRQUFRLEVBQUUsMHZDQXVCVDthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCwyREFBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO0lBQ2hCLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztJQUN4QixFQUFDLElBQUksRUFBRSxXQUFXLEdBQUc7SUFDckIsSUFBSTtDQUNILEVBTDZGLENBSzdGLENBQUMiLCJmaWxlIjoiY29tbW9uLXNldHRpbmdzLWlzb2xhdGVkLWV4YW1wbGUtcGFuZWwzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=