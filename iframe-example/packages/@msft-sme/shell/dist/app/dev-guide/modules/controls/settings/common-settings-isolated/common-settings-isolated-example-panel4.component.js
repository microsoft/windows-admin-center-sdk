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
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BasePropertiesForm, SettingsFormService } from '../../../../../../angular';
import { IsolatedSetting4FormData } from './model/isolated-setting4-model';
var CommonSettingsIsolatedExamplePanel4Component = /** @class */ (function (_super) {
    __extends(CommonSettingsIsolatedExamplePanel4Component, _super);
    function CommonSettingsIsolatedExamplePanel4Component(formBuilder, settingsFormService, router) {
        var _this = _super.call(this, 'common-settings-isolate-example-panel4.component.ts') || this;
        _this.formBuilder = formBuilder;
        _this.settingsFormService = settingsFormService;
        _this.router = router;
        /**
         * Note: It's important that the names of controls are identical with the control names that you place in the form.
         * If these don't line up properly, the form won't be able to access the correct errors.
         */
        _this.formErrorsField = {
            addresses: [],
            name: '',
            salary: ''
        };
        /**
         * Note: It's important that the names of controls are identical with the control names that you place in the form.
         * If these don't line up properly, the form won't be able to access the correct errors.
         */
        _this.validationMessagesField = {
            controls: {
                addresses: {
                    controls: {
                        city: {
                            required: 'Required'
                        },
                        street: {
                            required: 'Required'
                        },
                        state: {
                            required: 'Required'
                        },
                        zipCode: {
                            required: 'Required'
                        }
                    }
                },
                name: {
                    required: 'A name is required'
                },
                salary: {
                    required: 'A salary is required'
                }
            }
        };
        _this.init(); // This line is important! If you don't do this, the form won't be pre-populated!
        return _this;
    }
    Object.defineProperty(CommonSettingsIsolatedExamplePanel4Component.prototype, "formErrors", {
        get: function () {
            return this.formErrorsField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonSettingsIsolatedExamplePanel4Component.prototype, "validationMessages", {
        get: function () {
            return this.validationMessagesField;
        },
        enumerable: true,
        configurable: true
    });
    CommonSettingsIsolatedExamplePanel4Component.prototype.fetchData = function () {
        var subject = new Subject();
        setTimeout(function () {
            subject.next({
                addresses: [
                    {
                        city: 'Redmond',
                        state: 'Washington',
                        street: '1 Micrsoft Way',
                        zipCode: 98052
                    },
                    {
                        city: 'New York',
                        state: 'New York',
                        street: '1 Micrsoft Way',
                        zipCode: 12345
                    },
                    {
                        city: 'Bellevue',
                        state: 'Washington',
                        street: '1 Micrsoft Way',
                        zipCode: 14567
                    }
                ],
                name: 'Bill Gates',
                salary: 1000000000000
            });
            subject.complete();
        }, 5000);
        return subject;
    };
    CommonSettingsIsolatedExamplePanel4Component.prototype.createForm = function () {
        var _this = this;
        var addressesGroups = this.formData.addresses.map(function (address) {
            _this.formErrors.addresses.push({
                city: '',
                state: '',
                street: '',
                zipCode: ''
            });
            var group = _this.formBuilder.group({
                city: [
                    address.city,
                    [
                        Validators.required
                    ]
                ],
                state: [
                    address.state,
                    [
                        Validators.required
                    ]
                ],
                street: [
                    address.street,
                    [
                        Validators.required
                    ]
                ],
                zipCode: [
                    address.zipCode,
                    [
                        Validators.required
                    ]
                ]
            });
            return group;
        });
        var form = this.formBuilder.group({
            addresses: this.formBuilder.array(addressesGroups),
            name: [
                this.formData.name,
                [
                    Validators.required
                ]
            ],
            salary: [
                this.formData.salary,
                [
                    Validators.required
                ]
            ]
        });
        return form;
    };
    CommonSettingsIsolatedExamplePanel4Component.prototype.createFormDataFromDataModel = function () {
        return new IsolatedSetting4FormData(this.dataModel);
    };
    CommonSettingsIsolatedExamplePanel4Component.prototype.onFetchError = function (error) {
        // Raise an alert or create logs
    };
    CommonSettingsIsolatedExamplePanel4Component.prototype.onSaveError = function (error) {
        // Raise an alert or create logs
    };
    CommonSettingsIsolatedExamplePanel4Component.prototype.onSaveSuccess = function () {
        // Raise an alert or create logs
    };
    CommonSettingsIsolatedExamplePanel4Component.prototype.onCloseClick = function () {
        this.router.navigateByUrl(this.settingsFormService.getBackRoute());
    };
    CommonSettingsIsolatedExamplePanel4Component.prototype.saveForm = function (newDataModel) {
        return Observable.of(newDataModel);
    };
    CommonSettingsIsolatedExamplePanel4Component.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-common-settings-isolated-example-panel4',
                    template: "\n      <form [smeSettingsForm]=\"form\" aria-labelledby=\"sme-shell-setting-selectedTitle\">\n        <sme-settings-content>\n          <fieldset *ngIf=\"!loading\" [disabled]=\"saving\" [formGroup]=\"form\">\n            <span>This is the generic settings message!</span>\n            <h6>Identity Information</h6>\n              <div class=\"form-group\">\n              <div class=\"form-input\">\n                <label class=\"control-label\" for=\"name\">Name Label</label>\n                <div class=\"required-clue\">Required Clue *</div>\n                <div>\n                  <input id=\"name\" [title]=\"formErrors.name\" class=\"form-control\" type=\"text\" formControlName=\"name\" required autofocus/>\n                </div>\n                <div *ngIf=\"formErrors.name\" class=\"alert alert-danger\">\n                  {{ formErrors.name }}\n                </div>\n              </div>\n            </div>\n            <h6>Financial Information</h6>\n            <div class=\"form-group\">\n              <div class=\"form-input\">\n                <label class=\"control-label\" for=\"salary\">Salary Label</label>\n                <div class=\"required-clue\">Required Clue *</div>\n                <div>\n                  <input id=\"salary\" [title]=\"formErrors.salary\" class=\"form-control\" type=\"text\" formControlName=\"salary\" required />\n                </div>\n                <div *ngIf=\"formErrors.salary\" class=\"alert alert-danger\">\n                  {{ formErrors.salary }}\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div formArrayName=\"addresses\">\n                <div *ngFor=\"let address of form.controls.addresses.controls; let i = index;\" [formGroupName]=\"i\">\n                  <h6>Address {{ i + 1 }}</h6>\n                  <div class=\"form-group\">\n                    <div class=\"form-input\">\n                      <label class=\"control-label\" for=\"city\">City Label</label>\n                      <div class=\"required-clue\">Required Clue *</div>\n                      <div>\n                        <input id=\"city\" [title]=\"formErrors.addresses[i].city\" class=\"form-control\" type=\"text\" formControlName=\"city\" required\n                        />\n                      </div>\n                      <div *ngIf=\"formErrors.addresses[i].city\" class=\"alert alert-danger\">\n                        {{ formErrors.addresses[i].city }}\n                      </div>\n                    </div>\n\n                    <div class=\"form-input\">\n                      <label class=\"control-label\" for=\"state\">State Label</label>\n                      <div class=\"required-clue\">Required Clue *</div>\n                      <div>\n                        <input id=\"state\" [title]=\"formErrors.addresses[i].state\" class=\"form-control\" type=\"text\" formControlName=\"state\" required\n                        />\n                      </div>\n                      <div *ngIf=\"formErrors.addresses[i].state\" class=\"alert alert-danger\">\n                        {{ formErrors.addresses[i].state }}\n                      </div>\n                    </div>\n\n                    <div class=\"form-input\">\n                      <label class=\"control-label\" for=\"street\">Street Label</label>\n                      <div class=\"required-clue\">Required Clue *</div>\n                      <div>\n                        <input id=\"street\" [title]=\"formErrors.addresses[i].street\" class=\"form-control\" type=\"text\" formControlName=\"street\" required\n                        />\n                      </div>\n                      <div *ngIf=\"formErrors.addresses[i].street\" class=\"alert alert-danger\">\n                        {{ formErrors.addresses[i].street }}\n                      </div>\n                    </div>\n\n                    <div class=\"form-input\">\n                      <label class=\"control-label\" for=\"zipCode\">Zip Label</label>\n                      <div class=\"required-clue\">Required Clue *</div>\n                      <div>\n                        <input id=\"zipCode\" [title]=\"formErrors.addresses[i].zipCode\" class=\"form-control\" type=\"number\" formControlName=\"zipCode\"\n                          min=\"0\" required />\n                      </div>\n                      <div *ngIf=\"formErrors.addresses[i].zipCode\" class=\"alert alert-danger\">\n                        {{ formErrors.addresses[i].zipCode }}\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </fieldset>\n          <sme-loading-wheel *ngIf=\"loading\"></sme-loading-wheel>\n        </sme-settings-content>\n        <sme-settings-footer class=\"footer\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onSave()\" [disabled]=\"!form || !form.dirty || !form.valid || saving\">Save</button>\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onDiscard()\" [disabled]=\"!form || !form.dirty || saving\">Discard</button>\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCloseClick()\">Close</button>\n        </sme-settings-footer>\n      </form>\n    ",
                    styles: ["\n      input[type=number]::-webkit-inner-spin-button,\n      input[type=number]::-webkit-outer-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n      }\n\n      h4 {\n        padding-top: 0;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    CommonSettingsIsolatedExamplePanel4Component.ctorParameters = function () { return [
        { type: FormBuilder, },
        { type: SettingsFormService, },
        { type: Router, },
    ]; };
    return CommonSettingsIsolatedExamplePanel4Component;
}(BasePropertiesForm));
export { CommonSettingsIsolatedExamplePanel4Component };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jb21tb24tc2V0dGluZ3MtaXNvbGF0ZWQvY29tbW9uLXNldHRpbmdzLWlzb2xhdGVkLWV4YW1wbGUtcGFuZWw0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxXQUFBLEVBQXdCLFVBQUEsRUFBVyxNQUFPLGdCQUFBLENBQWlCO0FBQ3BFLE9BQU8sRUFBRSxNQUFBLEVBQU8sTUFBTyxpQkFBQSxDQUFrQjtBQUN6QyxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8saUJBQUEsQ0FBa0I7QUFDN0MsT0FBTyxFQUFFLE9BQUEsRUFBUSxNQUFPLGNBQUEsQ0FBZTtBQUV2QyxPQUFPLEVBQ0gsa0JBQWtCLEVBSWxCLG1CQUFtQixFQUN0QixNQUFNLDJCQUFBLENBQTRCO0FBQ25DLE9BQU8sRUFBVyx3QkFBQSxFQUF1RCxNQUFPLGlDQUFBLENBQWtDO0FBR2xIO0lBQ1ksZ0VBQTBFO0lBMENsRixzREFBbUIsV0FBd0IsRUFBVSxtQkFBd0MsRUFBVSxNQUFjO1FBQXJILFlBQ0ksa0JBQU0scURBQXFELENBQUMsU0FHL0Q7UUFKa0IsaUJBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSx5QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQVUsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQXpDckg7OztXQUdHO1FBQ0sscUJBQWUsR0FBRztZQUN0QixTQUFTLEVBQUUsRUFBRTtZQUNiLElBQUksRUFBRSxFQUFFO1lBQ1IsTUFBTSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBRUY7OztXQUdHO1FBQ0ssNkJBQXVCLEdBQWdDO1lBQzNELFFBQVEsRUFBRTtnQkFDTixTQUFTLEVBQUU7b0JBQ1AsUUFBUSxFQUFFO3dCQUNOLElBQUksRUFBRTs0QkFDRixRQUFRLEVBQUUsVUFBVTt5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S0FBSyxDQUFDLGVBQWUsQ0FBQztZQUNsRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJO2dCQUNsQjtvQkFDSSxVQUFVLENBQUMsUUFBUTtpQkFDdEI7YUFDSjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07Z0JBQ3BCO29CQUNJLFVBQVUsQ0FBQyxRQUFRO2lCQUN0QjthQUNKO1NBQ0osQ0FDSixDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sa0ZBQTJCLEdBQWxDO1FBQ0ksTUFBTSxDQUFDLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFTSxtRUFBWSxHQUFuQixVQUFvQixLQUFVO1FBQzFCLGdDQUFnQztJQUNwQyxDQUFDO0lBRU0sa0VBQVcsR0FBbEIsVUFBbUIsS0FBVTtRQUN6QixnQ0FBZ0M7SUFDcEMsQ0FBQztJQUVNLG9FQUFhLEdBQXBCO1FBQ0ksZ0NBQWdDO0lBQ3BDLENBQUM7SUFFTSxtRUFBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFTSwrREFBUSxHQUFmLFVBQWdCLFlBQTBDO1FBQ3RELE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUErQixZQUFZLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBQ0UsdURBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsMERBQTBEO29CQUNwRSxRQUFRLEVBQUUsa3VLQWdHVDtvQkFDRCxNQUFNLEVBQUUsQ0FBQyxxT0FVUixDQUFDO2lCQUNMLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwyREFBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsV0FBVyxHQUFHO1FBQ3JCLEVBQUMsSUFBSSxFQUFFLG1CQUFtQixHQUFHO1FBQzdCLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztLQUNmLEVBSjZGLENBSTdGLENBQUM7SUFDRixtREFBQztDQXZTRCxBQXVTQyxDQXRTVyxrQkFBa0IsR0FzUzdCO1NBdlNZLDRDQUE0QyIsImZpbGUiOiJjb21tb24tc2V0dGluZ3MtaXNvbGF0ZWQtZXhhbXBsZS1wYW5lbDQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==