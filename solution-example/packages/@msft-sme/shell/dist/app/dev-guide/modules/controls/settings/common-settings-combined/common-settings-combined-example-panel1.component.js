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
var CommonSettingsCombinedExamplePanel1Component = (function (_super) {
    __extends(CommonSettingsCombinedExamplePanel1Component, _super);
    function CommonSettingsCombinedExamplePanel1Component(router, activatedRoute, formbuilder) {
        var _this = _super.call(this, router, activatedRoute, formbuilder) || this;
        _this.init({
            name: ''
        }, {
            name: {
                required: 'this is a mandatory field'
            }
        }, {
            name: 'setting 1 name value'
        }, 'setting 1');
        return _this;
    }
    CommonSettingsCombinedExamplePanel1Component.prototype.ngOnInit = function () {
        this.sampleForm = this.formbuilder.group({
            name: [this.modelData.name, Validators.required]
        });
        _super.prototype.ngOnInit.call(this);
    };
    return CommonSettingsCombinedExamplePanel1Component;
}(CommonSettingsCombinedExamplePanelBaseComponent));
export { CommonSettingsCombinedExamplePanel1Component };
CommonSettingsCombinedExamplePanel1Component.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-common-settings-combined-example-panel1',
                template: "\n      <div [smeSettingsForm]=\"sampleForm\" [formGroup]=\"sampleForm\">\n        <div class=\"form-group\">\n          <div class=\"form-input\">\n            <label for=\"name\">\n              {{nameLabel}}\n            </label>\n            <input id=\"name\" type=\"text\" class=\"form-control\" formControlName=\"name\" required autofocus/>\n            <div *ngIf=\"formErrors.name\" class=\"alert alert-danger\">\n              {{ formErrors.name }}\n            </div>\n          </div>\n        </div>\n      </div>\n    "
            },] },
];
/** @nocollapse */
CommonSettingsCombinedExamplePanel1Component.ctorParameters = function () { return [
    { type: Router, },
    { type: ActivatedRoute, },
    { type: FormBuilder, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jb21tb24tc2V0dGluZ3MtY29tYmluZWQvY29tbW9uLXNldHRpbmdzLWNvbWJpbmVkLWV4YW1wbGUtcGFuZWwxLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxXQUFBLEVBQXFDLFVBQUEsRUFBVyxNQUFPLGdCQUFBLENBQWlCO0FBQ2pGLE9BQU8sRUFBRSxjQUFBLEVBQWdCLE1BQUEsRUFBTyxNQUFPLGlCQUFBLENBQWtCO0FBSXpELE9BQU8sRUFBRSwrQ0FBQSxFQUFnRCxNQUFPLHlEQUFBLENBQTBEO0FBSzFIO0lBQ1ksZ0VBQXNFO0lBRTlFLHNEQUFZLE1BQWMsRUFBRSxjQUE4QixFQUFFLFdBQXdCO1FBQXBGLFlBQ0ksa0JBQ0ksTUFBTSxFQUNOLGNBQWMsRUFDZCxXQUFXLENBQUMsU0FlbkI7UUFiRyxLQUFJLENBQUMsSUFBSSxDQUNMO1lBQ0ksSUFBSSxFQUFFLEVBQUU7U0FDWCxFQUNEO1lBQ0ksSUFBSSxFQUFFO2dCQUNGLFFBQVEsRUFBRSwyQkFBMkI7YUFDeEM7U0FDSixFQUNEO1lBQ0ksSUFBSSxFQUFFLHNCQUFzQjtTQUMvQixFQUNELFdBQVcsQ0FBQyxDQUFDOztJQUNyQixDQUFDO0lBRU0sK0RBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDckMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUNuRCxDQUFDLENBQUM7UUFFSCxpQkFBTSxRQUFRLFdBQUUsQ0FBQztJQUNyQixDQUFDO0lBMkJMLG1EQUFDO0FBQUQsQ0F6REEsQUF5REMsQ0F4RFcsK0NBQStDOztBQThCcEQsdURBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsMERBQTBEO2dCQUNwRSxRQUFRLEVBQUUsc2hCQWNUO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDJEQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7SUFDaEIsRUFBQyxJQUFJLEVBQUUsY0FBYyxHQUFHO0lBQ3hCLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztDQUNwQixFQUo2RixDQUk3RixDQUFDIiwiZmlsZSI6ImNvbW1vbi1zZXR0aW5ncy1jb21iaW5lZC1leGFtcGxlLXBhbmVsMS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9