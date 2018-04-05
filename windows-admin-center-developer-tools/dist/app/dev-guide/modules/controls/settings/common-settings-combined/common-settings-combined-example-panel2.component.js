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
var CommonSettingsCombinedExamplePanel2Component = /** @class */ (function (_super) {
    __extends(CommonSettingsCombinedExamplePanel2Component, _super);
    function CommonSettingsCombinedExamplePanel2Component(router, activatedRoute, formbuilder) {
        var _this = _super.call(this, router, activatedRoute, formbuilder) || this;
        _this.init({
            name2: ''
        }, {
            name2: {
                required: 'this is a mandatory field'
            }
        }, {
            name2: 'setting 2 name value'
        }, 'setting 2');
        return _this;
    }
    CommonSettingsCombinedExamplePanel2Component.prototype.ngOnInit = function () {
        this.sampleForm = this.formbuilder.group({
            name2: [this.modelData.name2, Validators.required]
        });
        _super.prototype.ngOnInit.call(this);
    };
    CommonSettingsCombinedExamplePanel2Component.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-common-settings-combined-example-panel2',
                    template: "\n      <div [smeSettingsForm]=\"sampleForm\" [formGroup]=\"sampleForm\">\n        <div class=\"form-group\">\n          <div class=\"form-input\">\n            <label for=\"name2\">\n              {{nameLabel}}\n            </label>\n            <input id=\"name2\" type=\"text\" class=\"form-control\" formControlName=\"name2\" required autofocus/>\n            <div *ngIf=\"formErrors.name2\" class=\"alert alert-danger\">\n              {{ formErrors.name2 }}\n            </div>\n          </div>\n        </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    CommonSettingsCombinedExamplePanel2Component.ctorParameters = function () { return [
        { type: Router, },
        { type: ActivatedRoute, },
        { type: FormBuilder, },
    ]; };
    return CommonSettingsCombinedExamplePanel2Component;
}(CommonSettingsCombinedExamplePanelBaseComponent));
export { CommonSettingsCombinedExamplePanel2Component };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jb21tb24tc2V0dGluZ3MtY29tYmluZWQvY29tbW9uLXNldHRpbmdzLWNvbWJpbmVkLWV4YW1wbGUtcGFuZWwyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxXQUFBLEVBQXFDLFVBQUEsRUFBVyxNQUFPLGdCQUFBLENBQWlCO0FBQ2pGLE9BQU8sRUFBRSxjQUFBLEVBQWdCLE1BQUEsRUFBTyxNQUFPLGlCQUFBLENBQWtCO0FBSXpELE9BQU8sRUFBRSwrQ0FBQSxFQUFnRCxNQUFPLHlEQUFBLENBQTBEO0FBSzFIO0lBQ1ksZ0VBQXNFO0lBRTlFLHNEQUFZLE1BQWMsRUFBRSxjQUE4QixFQUFFLFdBQXdCO1FBQXBGLFlBQ0ksa0JBQ0ksTUFBTSxFQUNOLGNBQWMsRUFDZCxXQUFXLENBQUMsU0FlbkI7UUFiRyxLQUFJLENBQUMsSUFBSSxDQUNMO1lBQ0ksS0FBSyxFQUFFLEVBQUU7U0FDWixFQUNEO1lBQ0ksS0FBSyxFQUFFO2dCQUNILFFBQVEsRUFBRSwyQkFBMkI7YUFDeEM7U0FDSixFQUNEO1lBQ0ksS0FBSyxFQUFFLHNCQUFzQjtTQUNoQyxFQUNELFdBQVcsQ0FBQyxDQUFDOztJQUNyQixDQUFDO0lBRU0sK0RBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDckMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUNyRCxDQUFDLENBQUM7UUFFSCxpQkFBTSxRQUFRLFdBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0UsdURBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsMERBQTBEO29CQUNwRSxRQUFRLEVBQUUsMmhCQWNUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwyREFBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO1FBQ2hCLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztRQUN4QixFQUFDLElBQUksRUFBRSxXQUFXLEdBQUc7S0FDcEIsRUFKNkYsQ0FJN0YsQ0FBQztJQUNGLG1EQUFDO0NBekRELEFBeURDLENBeERXLCtDQUErQyxHQXdEMUQ7U0F6RFksNENBQTRDIiwiZmlsZSI6ImNvbW1vbi1zZXR0aW5ncy1jb21iaW5lZC1leGFtcGxlLXBhbmVsMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbWF0d2lscy9Tb3VyY2UvYmFzZS9tc2Z0LXNtZS1kZXZlbG9wZXItdG9vbHMvaW5saW5lU3JjLyJ9