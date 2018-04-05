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
import { CommonSettingsCombinedExamplePanelBaseComponent } from './common-settings-combined-example-panel-base.component';
var CommonSettingsCombinedExamplePanel3Component = (function (_super) {
    __extends(CommonSettingsCombinedExamplePanel3Component, _super);
    function CommonSettingsCombinedExamplePanel3Component(router, activatedRoute, formbuilder) {
        var _this = _super.call(this, router, activatedRoute, formbuilder) || this;
        _this.init({
            name3: ''
        }, {
            name3: {
                required: 'this is a mandatory field'
            }
        }, {
            name3: 'setting 3 name value'
        }, 'setting 3');
        return _this;
    }
    CommonSettingsCombinedExamplePanel3Component.prototype.ngOnInit = function () {
        this.sampleForm = this.formbuilder.group({
            name3: [this.modelData.name3, Validators.required]
        });
        _super.prototype.ngOnInit.call(this);
    };
    return CommonSettingsCombinedExamplePanel3Component;
}(CommonSettingsCombinedExamplePanelBaseComponent));
export { CommonSettingsCombinedExamplePanel3Component };
CommonSettingsCombinedExamplePanel3Component.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng3-controls-common-settings-combined-example-panel3',
                template: "\n      <div [smeSettingsForm]=\"sampleForm\" [formGroup]=\"sampleForm\">\n        <div class=\"form-group\">\n          <div class=\"form-input\">\n            <label for=\"name3\">\n              {{nameLabel}}\n            </label>\n            <input id=\"name3\" type=\"text\" class=\"form-control\" formControlName=\"name3\" required autofocus/>\n            <div *ngIf=\"formErrors.name3\" class=\"alert alert-danger\">\n              {{ formErrors.name3 }}\n            </div>\n          </div>\n        </div>\n      </div>\n    "
            },] },
];
/** @nocollapse */
CommonSettingsCombinedExamplePanel3Component.ctorParameters = function () { return [
    { type: Router, },
    { type: ActivatedRoute, },
    { type: FormBuilder, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jb21tb24tc2V0dGluZ3MtY29tYmluZWQvY29tbW9uLXNldHRpbmdzLWNvbWJpbmVkLWV4YW1wbGUtcGFuZWwzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxXQUFBLEVBQXFDLFVBQUEsRUFBVyxNQUFPLGdCQUFBLENBQWlCO0FBQ2pGLE9BQU8sRUFBRSxjQUFBLEVBQWdCLE1BQUEsRUFBTyxNQUFPLGlCQUFBLENBQWtCO0FBSXpELE9BQU8sRUFBRSwrQ0FBQSxFQUFnRCxNQUFPLHlEQUFBLENBQTBEO0FBSzFIO0lBQ1ksZ0VBQXNFO0lBRTlFLHNEQUFZLE1BQWMsRUFBRSxjQUE4QixFQUFFLFdBQXdCO1FBQXBGLFlBQ0ksa0JBQ0ksTUFBTSxFQUNOLGNBQWMsRUFDZCxXQUFXLENBQUMsU0FlbkI7UUFiRyxLQUFJLENBQUMsSUFBSSxDQUNMO1lBQ0ksS0FBSyxFQUFFLEVBQUU7U0FDWixFQUNEO1lBQ0ksS0FBSyxFQUFFO2dCQUNILFFBQVEsRUFBRSwyQkFBMkI7YUFDeEM7U0FDSixFQUNEO1lBQ0ksS0FBSyxFQUFFLHNCQUFzQjtTQUNoQyxFQUNELFdBQVcsQ0FBQyxDQUFDOztJQUNyQixDQUFDO0lBRU0sK0RBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDckMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUNyRCxDQUFDLENBQUM7UUFFSCxpQkFBTSxRQUFRLFdBQUUsQ0FBQztJQUNyQixDQUFDO0lBMkJMLG1EQUFDO0FBQUQsQ0F6REEsQUF5REMsQ0F4RFcsK0NBQStDOztBQThCcEQsdURBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsMERBQTBEO2dCQUNwRSxRQUFRLEVBQUUsMmhCQWNUO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDJEQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7SUFDaEIsRUFBQyxJQUFJLEVBQUUsY0FBYyxHQUFHO0lBQ3hCLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztDQUNwQixFQUo2RixDQUk3RixDQUFDIiwiZmlsZSI6ImNvbW1vbi1zZXR0aW5ncy1jb21iaW5lZC1leGFtcGxlLXBhbmVsMy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9