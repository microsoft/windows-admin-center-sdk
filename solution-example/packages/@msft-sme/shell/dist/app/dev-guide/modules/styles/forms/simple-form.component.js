import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeographicLocation } from './data/simple-form-data';
var SimpleFormComponent = (function () {
    function SimpleFormComponent(router, activatedRoute, formbuilder) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.formbuilder = formbuilder;
        this.disableFormCheckBoxLabel = 'Disable the child form group';
        this.nameLabel = 'Name';
        this.nameValidationErrorMessage = '';
        this.nameRequiredMessage = 'Specify a non empty name';
        this.requiredLabel = '* Required';
        this.locationLabel = 'Location';
        this.valueLabel = 'Value';
        this.fileNameLabel = 'File Name';
        this.saveButtonLabel = 'Save';
        this.saveAndCloseButtonLabel = 'Save and close';
        this.discardButtonLabel = 'Discard';
        this.disableForm = false;
        this.locations = [
            {
                displayName: 'Right Here',
                value: GeographicLocation.Here
            },
            {
                displayName: 'Right There',
                value: GeographicLocation.There
            },
            {
                displayName: 'Far Away',
                value: GeographicLocation.FarAway
            }
        ];
        this.saving = false;
        this.originalData = {
            fileName: 'c:\\file.txt',
            location: GeographicLocation.There,
            name: 'the name from my data',
            value: 0
        };
        this.formModel = {
            disableForm: false,
            childFormGroup: {
                modelName: this.originalData.name,
                modelFileName: this.originalData.fileName,
                modelLocation: this.originalData.location,
                modelValue: this.originalData.location
            }
        };
    }
    SimpleFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.childFormGroup = this.formbuilder.group({
            // the name control
            modelName: [
                this.formModel.childFormGroup.modelName,
                [
                    Validators.required
                ]
            ],
            // the name control
            modelLocation: [
                this.formModel.childFormGroup.modelLocation
            ],
            // the value control
            modelValue: [
                this.formModel.childFormGroup.modelValue
            ],
            // the file name control
            modelFileName: [
                this.formModel.childFormGroup.modelFileName
            ]
        });
        this.simpleForm = this.formbuilder.group({
            // The check box
            disableForm: [
                this.formModel.disableForm
            ],
            // The child form group
            childFormGroup: this.childFormGroup
        });
        this.simpleForm.get('disableForm').valueChanges.subscribe(function (disable) {
            if (disable) {
                _this.childFormGroup.disable();
            }
            else {
                _this.childFormGroup.enable();
            }
            // when enabling/disabling a section we run the validation right away
            _this.processValidations();
        });
        this.nameFormControl = this.childFormGroup.get('modelName');
        this.simpleForm.valueChanges
            .debounceTime(500)
            .subscribe(function () {
            _this.processValidations();
        });
    };
    SimpleFormComponent.prototype.getNameControlError = function () {
        return this.nameFormControl.errors['required'];
    };
    SimpleFormComponent.prototype.onSaveClick = function (closeOnSuccess) {
        var _this = this;
        this.saving = true;
        // DO NOT COPY:
        // Need to show notification: saving...
        // Need to make the actual network if needed
        setTimeout(function () {
            // need notification: saved success...
            _this.saving = false;
            _this.saveFormValueToModel();
            if (closeOnSuccess) {
                // on success navigate away to whatever rroute you want, or close a dialog
                _this.router.navigate(['../'], { relativeTo: _this.activatedRoute });
                // this could be a dialog: this.hide({result: this.formModel})
                return;
            }
            _this.simpleForm.markAsPristine();
            _this.simpleForm.markAsUntouched();
        }, 1000);
    };
    SimpleFormComponent.prototype.onSaveAndClose = function () {
        this.onSaveClick(true);
    };
    SimpleFormComponent.prototype.onDiscardClick = function () {
        // reset to previous model
        // It's important that both the formModel type and the controls in the
        // formgroup follow the exact same structure fot this to work
        // otherwise you have to set each property 1 by one:
        // this.simpleForm.reset({
        //     disableForm: this.formModel.disableForm,
        //     childFormGroup: {
        //         modelName: this.formModel.childFormGroup.modelName,
        //         modelValue: this.formModel.childFormGroup.modelValue,
        //         modelLocation: this.formModel.childFormGroup.modelLocation,
        //         modelFileName: this.formModel.childFormGroup.modelFileName
        //     }
        // });
        this.simpleForm.reset(this.formModel);
        this.simpleForm.markAsPristine();
        this.simpleForm.markAsUntouched();
    };
    SimpleFormComponent.prototype.processValidations = function () {
        this.processNameValidation();
    };
    SimpleFormComponent.prototype.processNameValidation = function () {
        this.nameValidationErrorMessage = '';
        if (this.nameFormControl.valid) {
            ;
        }
        else {
            for (var propertyName in this.nameFormControl.errors) {
                if (this.nameFormControl.errors.hasOwnProperty(propertyName)) {
                    if (propertyName === 'required') {
                        this.nameValidationErrorMessage = this.nameRequiredMessage;
                    }
                    else {
                        // Unexpected validation error key
                        this.nameValidationErrorMessage = '{0}: {1}'.format(propertyName, this.nameFormControl.errors[propertyName]);
                    }
                    // We only show the first validation message
                    // However, we may choose another one depending on the scenario
                    // the developer needs to decide what validation is more important
                    // to show to the user
                    break;
                }
            }
        }
    };
    SimpleFormComponent.prototype.saveFormValueToModel = function () {
        // at this point the changes have been saved to the server and we've got a new fresh object from the server
        var updatedSimpleFormModel = {};
        // we get the new data to the form model
        // This only works if you have the exact same structure in the form as in the model
        MsftSme.deepAssign(updatedSimpleFormModel, this.simpleForm.value);
        this.formModel = updatedSimpleFormModel;
    };
    SimpleFormComponent.prototype.callActionIfDirtyAndEnabled = function (control, action) {
        if (control && control.dirty && control.enabled) {
            action(control.value);
        }
    };
    return SimpleFormComponent;
}());
export { SimpleFormComponent };
SimpleFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-forms-simple-form',
                template: "\n      <!-- this checkbox is just to show case how to disable a form -->\n      <fieldset [disabled]=\"saving\">\n        <form [formGroup]=\"simpleForm\" (ngSubmit)=\"onSaveClick()\">\n          <div class=\"form-controls\">\n            <div class=\"checkbox\">\n              <label class=\"control-label\" for=\"disableFormCheckBox\">\n                  <input #dynamicMemoryCheckBox id=\"disableFormCheckBox\" type=\"checkbox\" class=\"form-control\" formControlName=\"disableForm\"/>\n                  <span>{{ disableFormCheckBoxLabel }}</span>\n                </label>\n            </div>\n\n            <div class=\"form-group\" formGroupName=\"childFormGroup\" [class.disabled]=\"childFormGroup.disabled\">\n              <div class=\"form-input\">\n                <label for=\"name\">\n                  {{nameLabel}}\n                </label>\n                <div class=\"required-clue\">{{requiredLabel}}</div>\n                <input id=\"name\" type=\"text\" class=\"form-control\" formControlName=\"modelName\" />\n                <div *ngIf=\"nameValidationErrorMessage\" class=\"alert alert-danger\">\n                  {{ nameValidationErrorMessage }}\n                </div>\n              </div>\n              <div class=\"form-input\">\n                <label for=\"value\">\n                  {{valueLabel}}\n                </label>\n                <input id=\"value\" type=\"number\" class=\"form-control\" formControlName=\"modelValue\" />\n              </div>\n\n              <div class=\"form-input\">\n                <label for=\"location\">\n                  {{locationLabel}}\n                </label>\n                <div class=\"combobox\">\n                  <select formControlName=\"modelLocation\" id=\"location\" class=\"form-control\">\n                    <option *ngFor=\"let location of locations\"\n                      [value]=\"location.value\">\n                          {{location.displayName}}\n                    </option>\n                  </select>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"form-buttons\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSaveClick()\" [disabled]=\"!simpleForm.dirty || !simpleForm.valid\">{{ saveButtonLabel }}</button>\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSaveAndClose()\" [disabled]=\"!simpleForm.dirty || !simpleForm.valid\">{{ saveAndCloseButtonLabel }}</button>\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onDiscardClick()\" [disabled]=\"!simpleForm.dirty\">{{ discardButtonLabel }}</button>\n          </div>\n        </form>\n      </fieldset>\n    "
            },] },
];
/** @nocollapse */
SimpleFormComponent.ctorParameters = function () { return [
    { type: Router, },
    { type: ActivatedRoute, },
    { type: FormBuilder, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9zdHlsZXMvZm9ybXMvc2ltcGxlLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQTZCLE1BQU8sZUFBQSxDQUFnQjtBQUM3RCxPQUFPLEVBQUUsV0FBQSxFQUFxQyxVQUFBLEVBQVcsTUFBTyxnQkFBQSxDQUFpQjtBQUNqRixPQUFPLEVBQUUsY0FBQSxFQUFnQixNQUFBLEVBQU8sTUFBTyxpQkFBQSxDQUFrQjtBQUl6RCxPQUFPLEVBQUUsa0JBQUEsRUFBbUMsTUFBTyx5QkFBQSxDQUEwQjtBQUk3RTtJQTJDSSw2QkFBb0IsTUFBYyxFQUFVLGNBQThCLEVBQVUsV0FBd0I7UUFBeEYsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBMUNyRyw2QkFBd0IsR0FBRyw4QkFBOEIsQ0FBQztRQUMxRCxjQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ25CLCtCQUEwQixHQUFHLEVBQUUsQ0FBQztRQUMvQix3QkFBbUIsR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxrQkFBYSxHQUFHLFlBQVksQ0FBQztRQUM3QixrQkFBYSxHQUFHLFVBQVUsQ0FBQztRQUMzQixlQUFVLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLGtCQUFhLEdBQUcsV0FBVyxDQUFDO1FBRTVCLG9CQUFlLEdBQUcsTUFBTSxDQUFDO1FBRXpCLDRCQUF1QixHQUFHLGdCQUFnQixDQUFDO1FBRTNDLHVCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUUvQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUVwQixjQUFTLEdBQUc7WUFDZjtnQkFDSSxXQUFXLEVBQUUsWUFBWTtnQkFDekIsS0FBSyxFQUFFLGtCQUFrQixDQUFDLElBQUk7YUFDakM7WUFDRDtnQkFDSSxXQUFXLEVBQUUsYUFBYTtnQkFDMUIsS0FBSyxFQUFFLGtCQUFrQixDQUFD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LEdBQUcsc0JBQXNCLENBQUM7SUFDNUMsQ0FBQztJQUVPLHlEQUEyQixHQUFuQyxVQUFvQyxPQUFvQixFQUFFLE1BQTRCO1FBQ2xGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsQ0FBQztJQUNMLENBQUM7SUFpRUwsMEJBQUM7QUFBRCxDQWpSQSxBQWlSQzs7QUFoRU0sOEJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxRQUFRLEVBQUUsaXFGQW9EVDthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxrQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO0lBQ2hCLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztJQUN4QixFQUFDLElBQUksRUFBRSxXQUFXLEdBQUc7Q0FDcEIsRUFKNkYsQ0FJN0YsQ0FBQyIsImZpbGUiOiJzaW1wbGUtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9