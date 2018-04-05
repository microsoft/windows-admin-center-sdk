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
var CommonSettingsIsolatedExamplePanel1Component = (function (_super) {
    __extends(CommonSettingsIsolatedExamplePanel1Component, _super);
    function CommonSettingsIsolatedExamplePanel1Component(router, activatedRoute, formbuilder, settingsFormService) {
        return _super.call(this, router, activatedRoute, formbuilder, settingsFormService, {
            name: ''
        }, {
            name: {
                required: 'this is a mandatory field'
            }
        }, {
            name: 'setting 1 name value'
        }, 'setting 1') || this;
    }
    CommonSettingsIsolatedExamplePanel1Component.prototype.ngOnInit = function () {
        this.sampleForm = this.formbuilder.group({
            name: [this.modelData.name, Validators.required]
        });
        _super.prototype.ngOnInit.call(this);
    };
    return CommonSettingsIsolatedExamplePanel1Component;
}(CommonSettingsIsolatedExamplePanelBaseComponent));
export { CommonSettingsIsolatedExamplePanel1Component };
CommonSettingsIsolatedExamplePanel1Component.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-common-settings-isolated-example-panel1',
                template: "\n      <form [smeSettingsForm]=\"sampleForm\">\n        <sme-settings-content>\n          <fieldset [disabled]=\"saving\" [formGroup]=\"sampleForm\">\n            <div class=\"form-group\">\n              <div class=\"form-input\">\n                <label for=\"name\">\n                  {{nameLabel}}\n                </label>\n                <input id=\"name\" type=\"text\" class=\"form-control\" formControlName=\"name\" required autofocus/>\n                <div *ngIf=\"formErrors.name\" class=\"alert alert-danger\">\n                  {{ formErrors.name }}\n                </div>\n              </div>\n            </div>\n          </fieldset>\n        </sme-settings-content>\n        <sme-settings-footer class=\"footer\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onSaveClick()\" [disabled]=\"!sampleForm.dirty || !sampleForm.valid || saving\">{{ saveButtonLabel }}</button>\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onDiscardClick()\" [disabled]=\"!sampleForm.dirty || saving\">{{ discardButtonLabel }}</button>\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCloseClick()\">{{ closeButtonLabel }}</button>\n        </sme-settings-footer>\n      </form>\n    "
            },] },
];
/** @nocollapse */
CommonSettingsIsolatedExamplePanel1Component.ctorParameters = function () { return [
    { type: Router, },
    { type: ActivatedRoute, },
    { type: FormBuilder, },
    null,
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jb21tb24tc2V0dGluZ3MtaXNvbGF0ZWQvY29tbW9uLXNldHRpbmdzLWlzb2xhdGVkLWV4YW1wbGUtcGFuZWwxLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxXQUFBLEVBQXFDLFVBQUEsRUFBVyxNQUFPLGdCQUFBLENBQWlCO0FBQ2pGLE9BQU8sRUFBRSxjQUFBLEVBQWdCLE1BQUEsRUFBTyxNQUFPLGlCQUFBLENBQWtCO0FBTXpELE9BQU8sRUFBRSwrQ0FBQSxFQUFnRCxNQUFPLHlEQUFBLENBQTBEO0FBSzFIO0lBQ1ksZ0VBQXNFO0lBRTlFLHNEQUFZLE1BQWMsRUFBRSxjQUE4QixFQUFFLFdBQXdCLEVBQUUsbUJBQXdDO2VBQzFILGtCQUNJLE1BQU0sRUFDTixjQUFjLEVBQ2QsV0FBVyxFQUNYLG1CQUFtQixFQUNuQjtZQUNJLElBQUksRUFBRSxFQUFFO1NBQ1gsRUFDRDtZQUNJLElBQUksRUFBRTtnQkFDRixRQUFRLEVBQUUsMkJBQTJCO2FBQ3hDO1NBQ0osRUFDRDtZQUNJLElBQUksRUFBRSxzQkFBc0I7U0FDL0IsRUFDRCxXQUFXLENBQUM7SUFDcEIsQ0FBQztJQUVNLCtEQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ3JDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDbkQsQ0FBQyxDQUFDO1FBRUgsaUJBQU0sUUFBUSxXQUFFLENBQUM7SUFDckIsQ0FBQztJQXFDTCxtREFBQztBQUFELENBbEVBLEFBa0VDLENBakVXLCtDQUErQzs7QUE2QnBELHVEQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLDBEQUEwRDtnQkFDcEUsUUFBUSxFQUFFLGl2Q0F1QlQ7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsMkRBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztJQUNoQixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7SUFDeEIsRUFBQyxJQUFJLEVBQUUsV0FBVyxHQUFHO0lBQ3JCLElBQUk7Q0FDSCxFQUw2RixDQUs3RixDQUFDIiwiZmlsZSI6ImNvbW1vbi1zZXR0aW5ncy1pc29sYXRlZC1leGFtcGxlLXBhbmVsMS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9