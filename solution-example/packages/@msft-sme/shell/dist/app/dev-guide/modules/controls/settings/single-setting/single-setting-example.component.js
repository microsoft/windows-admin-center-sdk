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
import { SingleSettingComponentBase } from '../../../../../../angular';
var SingleSettingComponent = (function (_super) {
    __extends(SingleSettingComponent, _super);
    function SingleSettingComponent(formBuilder) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        _this.saveButtonLabel = 'Save';
        _this.discardButtonLabel = 'Discard';
        _this.nameLabel = 'Name:';
        _this.saving = false;
        _this.backRoute = { commands: ['../'] };
        _this.modelData = {
            name: 'SingleSetting default name value'
        };
        _this.formErrors = {
            name: ''
        };
        _this.validationMessages = {
            name: {
                required: 'this is a mandatory field'
            }
        };
        return _this;
    }
    SingleSettingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sampleForm = this.formBuilder.group({
            name: [this.modelData.name, Validators.required]
        });
        this.sampleForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    SingleSettingComponent.prototype.onSaveClick = function () {
        var _this = this;
        this.saving = true;
        // remote action started
        setTimeout(function () {
            // remote action finished
            alert('submit: \r\nOriginal: ' + JSON.stringify(_this.modelData) + '\r\nUpdated: ' + JSON.stringify(_this.sampleForm.value));
            _this.modelData = _this.sampleForm.value;
            _this.sampleForm.reset(_this.modelData);
            _this.sampleForm.markAsUntouched();
            _this.saving = false;
        }, 300);
    };
    SingleSettingComponent.prototype.onDiscardClick = function () {
        // revert data
        this.sampleForm.reset(this.modelData);
        this.sampleForm.markAsPristine();
    };
    SingleSettingComponent.prototype.confirmContinueEditingDialogOptions = function (dirtyForm, allForms) {
        return {
            cancelButtonText: 'Discard changes',
            confirmButtonText: 'Continue editing',
            message: "Do you want to to continue editing or discard your changes?: \r\n unsaved changes: " + JSON.stringify(dirtyForm.value),
            title: 'You have unsaved changes'
        };
    };
    SingleSettingComponent.prototype.onValueChanged = function (data) {
        if (!this.sampleForm) {
            return;
        }
        var form = this.sampleForm;
        for (var field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                var control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    var messages = this.validationMessages[field];
                    for (var key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    };
    return SingleSettingComponent;
}(SingleSettingComponentBase));
export { SingleSettingComponent };
SingleSettingComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-single-setting-example',
                template: "\n      <form [smeSettingsForm]=\"sampleForm\" class=\"tool-container\">\n        <sme-single-setting settingsTitle=\"Single Setting\" [backRoute]=\"backRoute\">\n          <sme-settings-content>\n            <fieldset [disabled]=\"saving\" [formGroup]=\"sampleForm\">\n              <div class=\"form-group\">\n                <div class=\"form-input\">\n                  <label for=\"name\">\n                    {{nameLabel}}\n                  </label>\n                  <input id=\"name\" type=\"text\" class=\"form-control\" formControlName=\"name\" required autofocus/>\n                  <div *ngIf=\"formErrors.name\" class=\"alert alert-danger\">\n                    {{ formErrors.name }}\n                  </div>\n                </div>\n              </div>\n            </fieldset>\n          </sme-settings-content>\n          <sme-settings-footer class=\"footer\">\n            <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onSaveClick()\" [disabled]=\"!sampleForm.dirty || !sampleForm.valid\">{{ saveButtonLabel }}</button>\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onDiscardClick()\" [disabled]=\"!sampleForm.dirty\">{{ discardButtonLabel }}</button>\n          </sme-settings-footer>\n        </sme-single-setting>\n      </form>\n    "
            },] },
];
/** @nocollapse */
SingleSettingComponent.ctorParameters = function () { return [
    { type: FormBuilder, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9zaW5nbGUtc2V0dGluZy9zaW5nbGUtc2V0dGluZy1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBa0IsTUFBTyxlQUFBLENBQWdCO0FBQ2xELE9BQU8sRUFBRSxXQUFBLEVBQXdCLFVBQUEsRUFBVyxNQUFPLGdCQUFBLENBQWlCO0FBR3BFLE9BQU8sRUFHSCwwQkFBMEIsRUFDN0IsTUFBTSwyQkFBQSxDQUE0QjtBQUtuQztJQUE0QywwQ0FBMEI7SUFlbEUsZ0NBQW9CLFdBQXdCO1FBQTVDLFlBQ0ksaUJBQU8sU0FlVjtRQWhCbUIsaUJBQVcsR0FBWCxXQUFXLENBQWE7UUFkckMscUJBQWUsR0FBRyxNQUFNLENBQUM7UUFDekIsd0JBQWtCLEdBQUcsU0FBUyxDQUFDO1FBQy9CLGVBQVMsR0FBRyxPQUFPLENBQUM7UUFRcEIsWUFBTSxHQUFHLEtBQUssQ0FBQztRQU1sQixLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUN2QyxLQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2IsSUFBSSxFQUFFLGtDQUFrQztTQUMzQyxDQUFDO1FBRUYsS0FBSSxDQUFDLFVBQVUsR0FBRztZQUNkLElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztRQUVGLEtBQUksQ0FBQyxrQkFBa0IsR0FBRztZQUN0QixJQUFJLEVBQUU7Z0JBQ0YsUUFBUSxFQUFFLDJCQUEyQjthQUN4QztTQUNKLENBQUM7O0lBQ04sQ0FBQztJQUVNLHlDQUFRLEdBQWY7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDckMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUNuRCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7UUFFMUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTSw0Q0FBVyxHQUFsQjtRQUFBLGlCQWFDO1FBWkcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsd0JBQXdCO1FBQ3hCLFVBQVUsQ0FDTjtZQUNJLHlCQUF5QjtZQUN6QixLQUFLLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNILEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDdkMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDbEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxFQUNELEdBQUcsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVNLCtDQUFjLEdBQXJCO1FBQ0ksY0FBYztRQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxvRUFBbUMsR0FBMUMsVUFDSSxTQUFvQixFQUNwQixRQUFxQjtRQUNyQixNQUFNLENBQUM7WUFDSCxnQkFBZ0IsRUFBRSxpQkFBaUI7WUFDbkMsaUJBQWlCLEVBQUUsa0JBQWtCO1lBQ3JDLE9BQU8sRUFDUCx3RkFBc0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFHO1lBQ3ZILEtBQUssRUFBRSwwQkFBMEI7U0FDcEMsQ0FBQztJQUNOLENBQUM7SUFFTywrQ0FBYyxHQUF0QixVQUF1QixJQUFVO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFFN0IsR0FBRyxDQUFDLENBQUMsSUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4Qyx3Q0FBd0M7Z0JBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUM1QixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVoQyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2hELEdBQUcsQ0FBQyxDQUFDLElBQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQzt3QkFDbEQsQ0FBQztvQkFDTCxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFtQ0wsNkJBQUM7QUFBRCxDQXRJQSxBQXNJQyxDQXRJMkMsMEJBQTBCOztBQW9HL0QsaUNBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUseUNBQXlDO2dCQUNuRCxRQUFRLEVBQUUsMHhDQXdCVDthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxxQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsV0FBVyxHQUFHO0NBQ3BCLEVBRjZGLENBRTdGLENBQUMiLCJmaWxlIjoic2luZ2xlLXNldHRpbmctZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9