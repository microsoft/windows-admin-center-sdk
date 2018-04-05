import { FormArray, FormGroup } from '@angular/forms';
import { isArray, isFunction } from 'util';
import { Logging, LogLevel } from '../../../core';
/**
 * A base class for an Angular component containing a form.
 *
 * @classdesc A base class for an Angular component containing a form that is pre-populated with fetched data.
 * The deriving class should call init() when setup is complete (sometime after calling super()) to begin the fetch
 * and initialize the form.
 *
 * @version 1.0.0
 */
var BasePropertiesForm = (function () {
    /**
     * Initializes a new instance of the BasePropertiesForm class.
     *
     * @param [loggingSource] - The source of log messages.
     */
    function BasePropertiesForm(loggingSource) {
        if (loggingSource === void 0) { loggingSource = 'BasePropertiesForm'; }
        this.loggingSource = loggingSource;
        /**
         * Indicates data is being fetched.
         */
        this.loading = true;
    }
    Object.defineProperty(BasePropertiesForm.prototype, "formCurrentValue", {
        /**
         * Gets the current value of the form.
         */
        get: function () {
            return this.form.value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Discards the current form edits.
     */
    BasePropertiesForm.prototype.onDiscard = function () {
        // TODO: The empty form should be created synchronousaly so angular
        // can bind to it. The values can be updated once the real data is available
        this.formData = this.createFormDataFromDataModel();
        this.resetForm();
    };
    /**
     * Saves the content of the form. The newest version of data for the form
     * will be fetched before performing the save operation.
     */
    BasePropertiesForm.prototype.onSave = function () {
        var _this = this;
        if (this.saving) {
            return;
        }
        this.saving = true;
        MsftSme.deepAssign(this.formData, this.form.value);
        var updatedModel;
        this.fetchData().flatMap(function (freshModel) {
            _this.formData.applyUpdatesToModel(freshModel);
            updatedModel = freshModel;
            return _this.saveForm(freshModel);
        }).subscribe(function (freshModel) {
            _this.saving = false;
            if (freshModel) {
                _this.dataModel = freshModel;
            }
            else {
                _this.dataModel = updatedModel;
            }
            _this.formData = _this.createFormDataFromDataModel();
            _this.resetForm();
            _this.onSaveSuccess();
        }, function (error) {
            _this.saving = false;
            _this.onSaveError(error);
        });
    };
    /**
     * The method to initialize the form with data.
     */
    BasePropertiesForm.prototype.init = function () {
        var _this = this;
        this.loading = true;
        this.fetchData().subscribe(function (data) {
            _this.dataModel = data;
            _this.resetFormData();
            _this.initializeValidation();
        }, function (error) {
            _this.onFetchError(error);
            _this.form.disable();
            // TODO: Have a mechanism to refresh the data
        }, function () {
            _this.loading = false;
        });
    };
    /**
     * Resets the form and displays the original values while marking the form as pristine and untouched.
     */
    BasePropertiesForm.prototype.resetForm = function () {
        this.form.reset(this.formData);
    };
    /**
     * Processes a control for validation.
     *
     * @param control - The control to validate.
     * @param formErrors - The errors of the form.
     * @param validationMessages - The validation messages of the form.
     * @param formErrorsIndex - The form errors index.
     */
    BasePropertiesForm.prototype.processControlForValidation = function (control, formErrors, validationMessages, formErrorsIndex) {
        var isFormGroup = control instanceof FormGroup;
        var isFormArray = false;
        if (!isFormGroup) {
            isFormArray = control instanceof FormArray;
        }
        if (isFormGroup) {
            // iterate
            this.updateFormErrors(control, formErrors[formErrorsIndex], (validationMessages));
        }
        else if (isFormArray) {
            this.updateFormErrorsForArray(control, formErrors[formErrorsIndex], (validationMessages));
        }
        else {
            // for controls, clear the previous error messages
            formErrors[formErrorsIndex] = '';
        }
        if (!control.valid && control.dirty) {
            if (isFormGroup || isFormArray) {
                // form groups and arrays are processed outside this for loop once all children have been processed
                return;
            }
            var messages = validationMessages;
            if (!messages) {
                return;
            }
            for (var key in control.errors) {
                if (control.errors.hasOwnProperty(key)) {
                    var message = messages[key];
                    if (isFunction(message)) {
                        message = message();
                    }
                    formErrors[formErrorsIndex] = message;
                    // Only one error message per control
                    break;
                }
            }
        }
    };
    /**
     * Updates the form errors.
     *
     * @param form - The form to update.
     * @param formErrors - The form errors to apply.
     * @param validationMessages - The validation messages to apply.
     */
    BasePropertiesForm.prototype.updateFormErrors = function (form, formErrors, validationMessages) {
        for (var field in formErrors) {
            if (formErrors.hasOwnProperty(field)) {
                var control = form.get(field);
                if (control) {
                    this.processControlForValidation(control, formErrors, validationMessages.controls[field], field);
                }
            }
        }
        if (!form.valid && validationMessages.formGroup) {
            validationMessages.formGroup(form.errors);
        }
    };
    /**
     * Updates the form array errors.
     *
     * @param formArray - The form array to update.
     * @param formErrors - The form errors to apply.
     * @param validationMessages - The validation messages to apply.
     */
    BasePropertiesForm.prototype.updateFormErrorsForArray = function (formArray, formErrors, validationMessages) {
        var processItems = true;
        if (!isArray(formErrors)) {
            // form errors for form arrays should be an array of logSource
            processItems = false;
            Logging.log({
                source: this.loggingSource,
                level: LogLevel.Warning,
                message: "Unexpected form errors type for form array. " +
                    ("It should be an array but it is " + typeof formErrors + ". Skipping valilidation")
            });
        }
        var errorsArray = formErrors;
        if (errorsArray.length !== formArray.length) {
            processItems = false;
            Logging.log({
                source: this.loggingSource,
                level: LogLevel.Warning,
                message: "Unexpected count of errors type for form array. " +
                    ("It should be " + formArray.length + " but it is " + errorsArray.length + ". Skipping valilidation")
            });
        }
        if (processItems) {
            for (var i = 0; i < formArray.length; i++) {
                var stringIndex = '' + i;
                var control = formArray.get(stringIndex);
                if (control) {
                    this.processControlForValidation(control, formErrors, validationMessages, stringIndex);
                }
            }
        }
        if (!formArray.valid && validationMessages.formArray) {
            validationMessages.formArray(formArray.errors);
        }
    };
    /**
     * Initializes the form validation.
     */
    BasePropertiesForm.prototype.initializeValidation = function () {
        var _this = this;
        this.form.valueChanges
            .debounceTime(500)
            .subscribe(function (data) {
            _this.onValueChanged(data);
        });
        this.onValueChanged();
    };
    /**
     * The method to call when the form value changes.
     */
    BasePropertiesForm.prototype.onValueChanged = function (data) {
        // TODO: Validate that the data? paramter was not needed
        if (!this.form) {
            return;
        }
        var form = this.form;
        this.updateFormErrors(form, this.formErrors, this.validationMessages);
    };
    /**
     * Resets the data backing the form without updating the display.
     *
     * @param existingForm - The existing form group of the display.
     */
    BasePropertiesForm.prototype.resetFormData = function (existingForm) {
        this.formData = this.createFormDataFromDataModel();
        this.form = this.createForm();
    };
    return BasePropertiesForm;
}());
export { BasePropertiesForm };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvZGF0YS9mb3Jtcy9iYXNlLXByb3BlcnRpZXMtZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW1CLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWdFbEQ7Ozs7Ozs7O0dBUUc7QUFDSDtJQTBCSTs7OztPQUlHO0lBQ0gsNEJBQXNCLGFBQTRDO1FBQTVDLDhCQUFBLEVBQUEsb0NBQTRDO1FBQTVDLGtCQUFhLEdBQWIsYUFBYSxDQUErQjtRQXpCbEU7O1dBRUc7UUFDSSxZQUFPLEdBQUcsSUFBSSxDQUFDO0lBc0IrQyxDQUFDO0lBK0R0RSxzQkFBYyxnREFBZ0I7UUFIOUI7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVEOztPQUVHO0lBQ0ksc0NBQVMsR0FBaEI7UUFDSSxtRUFBbUU7UUFDbkUsNEVBQTRFO1FBRTVFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxtQ0FBTSxHQUFiO1FBQUEsaUJBZ0NDO1FBL0JHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5ELElBQUksWUFB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LENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0ssMkNBQWMsR0FBdEIsVUFBdUIsSUFBVTtRQUM3Qix3REFBd0Q7UUFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFFRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLDBDQUFhLEdBQXJCLFVBQXNCLFlBQXdCO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0F0VkEsQUFzVkMsSUFBQSIsImZpbGUiOiJiYXNlLXByb3BlcnRpZXMtZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=