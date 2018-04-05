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
import { SettingsFormService } from '../../../../../../angular';
import { CommonSettingsIsolatedExamplePanelBaseComponent } from './common-settings-isolated-example-panel-base.component';
var CommonSettingsIsolatedExamplePanel2Component = /** @class */ (function (_super) {
    __extends(CommonSettingsIsolatedExamplePanel2Component, _super);
    function CommonSettingsIsolatedExamplePanel2Component(router, activatedRoute, formbuilder, settingsFormService) {
        return _super.call(this, router, activatedRoute, formbuilder, settingsFormService, {
            name2: ''
        }, {
            name2: {
                required: 'this is a mandatory field'
            }
        }, {
            name2: 'Setting2 name value'
        }, 'setting two') || this;
    }
    CommonSettingsIsolatedExamplePanel2Component.prototype.ngOnInit = function () {
        this.sampleForm = this.formbuilder.group({
            name2: [this.modelData.name2, Validators.required]
        });
        _super.prototype.ngOnInit.call(this);
    };
    CommonSettingsIsolatedExamplePanel2Component.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-common-settings-isolated-example-panel2',
                    template: "\n      <form [smeSettingsForm]=\"sampleForm\" aria-labelledby=\"sme-shell-setting-selectedTitle\">\n        <sme-settings-content>\n          <fieldset [disabled]=\"saving\" [formGroup]=\"sampleForm\">\n            <div class=\"form-group\">\n              <div class=\"form-input\">\n                <label for=\"name2\">\n                  {{nameLabel}}\n                </label>\n                <input id=\"name2\" type=\"text\" class=\"form-control\" formControlName=\"name2\" required autofocus/>\n                <div *ngIf=\"formErrors.name2\" class=\"alert alert-danger\">\n                  {{ formErrors.name2 }}\n                </div>\n              </div>\n            </div>\n          </fieldset>\n        </sme-settings-content>\n        <sme-settings-footer class=\"footer\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onSaveClick()\" [disabled]=\"!sampleForm.dirty || !sampleForm.valid || saving\">{{ saveButtonLabel }}</button>\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onDiscardClick()\" [disabled]=\"!sampleForm.dirty || saving\">{{ discardButtonLabel }}</button>\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCloseClick()\">{{ closeButtonLabel }}</button>\n        </sme-settings-footer>\n      </form>\n    "
                },] },
    ];
    /** @nocollapse */
    CommonSettingsIsolatedExamplePanel2Component.ctorParameters = function () { return [
        { type: Router, },
        { type: ActivatedRoute, },
        { type: FormBuilder, },
        { type: SettingsFormService, },
    ]; };
    return CommonSettingsIsolatedExamplePanel2Component;
}(CommonSettingsIsolatedExamplePanelBaseComponent));
export { CommonSettingsIsolatedExamplePanel2Component };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jb21tb24tc2V0dGluZ3MtaXNvbGF0ZWQvY29tbW9uLXNldHRpbmdzLWlzb2xhdGVkLWV4YW1wbGUtcGFuZWwyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxXQUFBLEVBQXFDLFVBQUEsRUFBVyxNQUFPLGdCQUFBLENBQWlCO0FBQ2pGLE9BQU8sRUFBRSxjQUFBLEVBQWdCLE1BQUEsRUFBTyxNQUFPLGlCQUFBLENBQWtCO0FBSXpELE9BQU8sRUFBRSxtQkFBQSxFQUFvQixNQUFPLDJCQUFBLENBQTRCO0FBRWhFLE9BQU8sRUFBRSwrQ0FBQSxFQUFnRCxNQUFPLHlEQUFBLENBQTBEO0FBSzFIO0lBQ2UsZ0VBQXNFO0lBRWpGLHNEQUFZLE1BQWMsRUFBRSxjQUE4QixFQUFFLFdBQXdCLEVBQUUsbUJBQXdDO2VBQzFILGtCQUNJLE1BQU0sRUFDTixjQUFjLEVBQ2QsV0FBVyxFQUNYLG1CQUFtQixFQUNuQjtZQUNJLEtBQUssRUFBRSxFQUFFO1NBQ1osRUFDRDtZQUNJLEtBQUssRUFBRTtnQkFDSCxRQUFRLEVBQUUsMkJBQTJCO2FBQ3hDO1NBQ0osRUFDRDtZQUNJLEtBQUssRUFBRSxxQkFBcUI7U0FDL0IsRUFDRCxhQUFhLENBQUM7SUFDdEIsQ0FBQztJQUVNLCtEQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ3JDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDckQsQ0FBQyxDQUFDO1FBRUgsaUJBQU0sUUFBUSxXQUFFLENBQUM7SUFDckIsQ0FBQztJQUNFLHVEQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLDBEQUEwRDtvQkFDcEUsUUFBUSxFQUFFLDB5Q0F1QlQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDJEQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUsY0FBYyxHQUFHO1FBQ3hCLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztRQUNyQixFQUFDLElBQUksRUFBRSxtQkFBbUIsR0FBRztLQUM1QixFQUw2RixDQUs3RixDQUFDO0lBQ0YsbURBQUM7Q0FsRUQsQUFrRUMsQ0FqRWMsK0NBQStDLEdBaUU3RDtTQWxFWSw0Q0FBNEMiLCJmaWxlIjoiY29tbW9uLXNldHRpbmdzLWlzb2xhdGVkLWV4YW1wbGUtcGFuZWwyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=