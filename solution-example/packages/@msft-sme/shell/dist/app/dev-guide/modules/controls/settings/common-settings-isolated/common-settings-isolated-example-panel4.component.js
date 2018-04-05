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
import { BasePropertiesForm } from '../../../../../../angular';
import { IsolatedSetting4FormData } from './model/isolated-setting4-model';
var CommonSettingsIsolatedExamplePanel4Component = (function (_super) {
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
    return CommonSettingsIsolatedExamplePanel4Component;
}(BasePropertiesForm));
export { CommonSettingsIsolatedExamplePanel4Component };
CommonSettingsIsolatedExamplePanel4Component.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-common-settings-isolated-example-panel4',
                template: "\n      <form [smeSettingsForm]=\"form\">\n        <sme-settings-content>\n          <fieldset *ngIf=\"!loading\" [disabled]=\"saving\" [formGroup]=\"form\">\n            <span>This is the generic settings message!</span>\n            <h6>Identity Information</h6>\n              <div class=\"form-group\">\n              <div class=\"form-input\">\n                <label class=\"control-label\" for=\"name\">Name Label</label>\n                <div class=\"required-clue\">Required Clue *</div>\n                <div>\n                  <input id=\"name\" [title]=\"formErrors.name\" class=\"form-control\" type=\"text\" formControlName=\"name\" required autofocus/>\n                </div>\n                <div *ngIf=\"formErrors.name\" class=\"alert alert-danger\">\n                  {{ formErrors.name }}\n                </div>\n              </div>\n            </div>\n            <h6>Financial Information</h6>\n            <div class=\"form-group\">\n              <div class=\"form-input\">\n                <label class=\"control-label\" for=\"salary\">Salary Label</label>\n                <div class=\"required-clue\">Required Clue *</div>\n                <div>\n                  <input id=\"salary\" [title]=\"formErrors.salary\" class=\"form-control\" type=\"text\" formControlName=\"salary\" required />\n                </div>\n                <div *ngIf=\"formErrors.salary\" class=\"alert alert-danger\">\n                  {{ formErrors.salary }}\n                </div>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div formArrayName=\"addresses\">\n                <div *ngFor=\"let address of form.controls.addresses.controls; let i = index;\" [formGroupName]=\"i\">\n                  <h6>Address {{ i + 1 }}</h6>\n                  <div class=\"form-group\">\n                    <div class=\"form-input\">\n                      <label class=\"control-label\" for=\"city\">City Label</label>\n                      <div class=\"required-clue\">Required Clue *</div>\n                      <div>\n                        <input id=\"city\" [title]=\"formErrors.addresses[i].city\" class=\"form-control\" type=\"text\" formControlName=\"city\" required\n                        />\n                      </div>\n                      <div *ngIf=\"formErrors.addresses[i].city\" class=\"alert alert-danger\">\n                        {{ formErrors.addresses[i].city }}\n                      </div>\n                    </div>\n\n                    <div class=\"form-input\">\n                      <label class=\"control-label\" for=\"state\">State Label</label>\n                      <div class=\"required-clue\">Required Clue *</div>\n                      <div>\n                        <input id=\"state\" [title]=\"formErrors.addresses[i].state\" class=\"form-control\" type=\"text\" formControlName=\"state\" required\n                        />\n                      </div>\n                      <div *ngIf=\"formErrors.addresses[i].state\" class=\"alert alert-danger\">\n                        {{ formErrors.addresses[i].state }}\n                      </div>\n                    </div>\n\n                    <div class=\"form-input\">\n                      <label class=\"control-label\" for=\"street\">Street Label</label>\n                      <div class=\"required-clue\">Required Clue *</div>\n                      <div>\n                        <input id=\"street\" [title]=\"formErrors.addresses[i].street\" class=\"form-control\" type=\"text\" formControlName=\"street\" required\n                        />\n                      </div>\n                      <div *ngIf=\"formErrors.addresses[i].street\" class=\"alert alert-danger\">\n                        {{ formErrors.addresses[i].street }}\n                      </div>\n                    </div>\n\n                    <div class=\"form-input\">\n                      <label class=\"control-label\" for=\"zipCode\">Zip Label</label>\n                      <div class=\"required-clue\">Required Clue *</div>\n                      <div>\n                        <input id=\"zipCode\" [title]=\"formErrors.addresses[i].zipCode\" class=\"form-control\" type=\"number\" formControlName=\"zipCode\"\n                          min=\"0\" required />\n                      </div>\n                      <div *ngIf=\"formErrors.addresses[i].zipCode\" class=\"alert alert-danger\">\n                        {{ formErrors.addresses[i].zipCode }}\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </fieldset>\n          <sme-loading-wheel *ngIf=\"loading\"></sme-loading-wheel>\n        </sme-settings-content>\n        <sme-settings-footer class=\"footer\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onSave()\" [disabled]=\"!form || !form.dirty || !form.valid || saving\">Save</button>\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onDiscard()\" [disabled]=\"!form || !form.dirty || saving\">Discard</button>\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCloseClick()\">Close</button>\n        </sme-settings-footer>\n      </form>\n    ",
                styles: ["\n      input[type=number]::-webkit-inner-spin-button,\n      input[type=number]::-webkit-outer-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n      }\n\n      h4 {\n        padding-top: 0;\n      }\n    "]
            },] },
];
/** @nocollapse */
CommonSettingsIsolatedExamplePanel4Component.ctorParameters = function () { return [
    { type: FormBuilder, },
    null,
    { type: Router, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jb21tb24tc2V0dGluZ3MtaXNvbGF0ZWQvY29tbW9uLXNldHRpbmdzLWlzb2xhdGVkLWV4YW1wbGUtcGFuZWw0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxXQUFBLEVBQXdCLFVBQUEsRUFBVyxNQUFPLGdCQUFBLENBQWlCO0FBQ3BFLE9BQU8sRUFBRSxNQUFBLEVBQU8sTUFBTyxpQkFBQSxDQUFrQjtBQUN6QyxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8saUJBQUEsQ0FBa0I7QUFDN0MsT0FBTyxFQUFFLE9BQUEsRUFBUSxNQUFPLGNBQUEsQ0FBZTtBQUV2QyxPQUFPLEVBQ0gsa0JBQWtCLEVBS3JCLE1BQU0sMkJBQUEsQ0FBNEI7QUFDbkMsT0FBTyxFQUFXLHdCQUFBLEVBQXVELE1BQU8saUNBQUEsQ0FBa0M7QUFHbEg7SUFDWSxnRUFBMEU7SUEwQ2xGLHNEQUFtQixXQUF3QixFQUFVLG1CQUF3QyxFQUFVLE1BQWM7UUFBckgsWUFDSSxrQkFBTSxxREFBcUQsQ0FBQyxTQUcvRDtRQUprQixpQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHlCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFBVSxZQUFNLEdBQU4sTUFBTSxDQUFRO1FBekNySDs7O1dBR0c7UUFDSyxxQkFBZSxHQUFHO1lBQ3RCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsSUFBSSxFQUFFLEVBQUU7WUFDUixNQUFNLEVBQUUsRUFBRTtTQUNiLENBQUM7UUFFRjs7O1dBR0c7UUFDSyw2QkFBdUIsR0FBZ0M7WUFDM0QsUUFBUSxFQUFFO2dCQUNOLFNBQVMsRUFBRTtvQkFDUCxRQUFRLEVBQUU7d0JBQ04sSUFBSSxFQUFFOzRCQUNGLFFBQVEsRUFBRSxVQUFVO3lCQUN2Qjt3QkFDRCxN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ZSxDQUFDO1lBQ2xELElBQUksRUFBRTtnQkFDRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7Z0JBQ2xCO29CQUNJLFVBQVUsQ0FBQyxRQUFRO2lCQUN0QjthQUNKO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTTtnQkFDcEI7b0JBQ0ksVUFBVSxDQUFDLFFBQVE7aUJBQ3RCO2FBQ0o7U0FDSixDQUNKLENBQUM7UUFFRixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxrRkFBMkIsR0FBbEM7UUFDSSxNQUFNLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVNLG1FQUFZLEdBQW5CLFVBQW9CLEtBQVU7UUFDMUIsZ0NBQWdDO0lBQ3BDLENBQUM7SUFFTSxrRUFBVyxHQUFsQixVQUFtQixLQUFVO1FBQ3pCLGdDQUFnQztJQUNwQyxDQUFDO0lBRU0sb0VBQWEsR0FBcEI7UUFDSSxnQ0FBZ0M7SUFDcEMsQ0FBQztJQUVNLG1FQUFZLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVNLCtEQUFRLEdBQWYsVUFBZ0IsWUFBMEM7UUFDdEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQStCLFlBQVksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUF3SEwsbURBQUM7QUFBRCxDQXZTQSxBQXVTQyxDQXRTVyxrQkFBa0I7O0FBK0t2Qix1REFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSwwREFBMEQ7Z0JBQ3BFLFFBQVEsRUFBRSw4cUtBZ0dUO2dCQUNELE1BQU0sRUFBRSxDQUFDLHFPQVVSLENBQUM7YUFDTCxFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsMkRBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztJQUNyQixJQUFJO0lBQ0osRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO0NBQ2YsRUFKNkYsQ0FJN0YsQ0FBQyIsImZpbGUiOiJjb21tb24tc2V0dGluZ3MtaXNvbGF0ZWQtZXhhbXBsZS1wYW5lbDQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==