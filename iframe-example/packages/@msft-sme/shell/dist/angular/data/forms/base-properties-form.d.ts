import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BaseFormData } from './base-form-data';
/**
 * The interface for exposing form control validation messages.
 *
 * Example:
 * {
 *      formControlA: {
 *          required: 'Name field cannot be empty.',
 *          maxLength: 'Name cannot be greater than 100 characters long.'
 *          ...
 *      },
 *      fromGroupA: {
 *          formControlAA: {
 *              required: 'city required',
 *          },
 *          formControlAB: {
 *              zipvalidator: 'ZIP code should be 5 numbers'
 *          },
 *          formGroup: (error: any) => {
 *              this.processFormGroupAErrors(error); // You need to implement this function in your super class.
 *          }
 *      },
 *      formArrayA: {
 *          formControlAA: {
 *              ...
 *          },
 *          formControlAB: {
 *              ...
 *          },
 *          formArray: (error: any) => {
 *              if (error.duplicateName) {
 *                  this.processDuplicateNameError(error);
 *              }
 *          }
 *      }
 * }
 */
export interface FormControlContainerValidationMessages {
    controls: {
        [key: string]: ({
            [key: string]: string | (() => string);
        } | FormGroupValidationMessages | FormArrayValidationMessages);
    };
}
/**
 * The interface for exposing validation messages for form arrays.
 */
export interface FormArrayValidationMessages extends FormControlContainerValidationMessages {
    /**
     * A callback that takes the form array validation errors and processes them accordingly.
     */
    formArray?: (error: any) => void;
}
/**
 * The interface for exposing validation messages for form groups.
 */
export interface FormGroupValidationMessages extends FormControlContainerValidationMessages {
    /**
     * A callback that takes the form group validation errors and processes them accordingly.
     */
    formGroup?: (error: any) => void;
}
/**
 * A base class for an Angular component containing a form.
 *
 * @classdesc A base class for an Angular component containing a form that is pre-populated with fetched data.
 * The deriving class should call init() when setup is complete (sometime after calling super()) to begin the fetch
 * and initialize the form.
 *
 * @version 1.0.0
 */
export declare abstract class BasePropertiesForm<TDataModel, TFormData extends BaseFormData<TDataModel>> {
    protected loggingSource: string;
    /**
     * The reactive form containing all form controls.
     */
    form: FormGroup;
    /**
     * Indicates data is being fetched.
     */
    loading: boolean;
    /**
     * Indicated data is being saved.
     */
    saving: boolean;
    /**
     * The data model that contains data from the service.
     */
    protected dataModel: TDataModel;
    /**
     * The data model supplying the form field values.
     */
    protected formData: TFormData;
    /**
     * Initializes a new instance of the BasePropertiesForm class.
     *
     * @param [loggingSource] - The source of log messages.
     */
    constructor(loggingSource?: string);
    /**
     * Gets the form errors.
     */
    protected readonly abstract formErrors: any;
    /**
     * Gets the validation messages.
     */
    protected readonly abstract validationMessages: FormGroupValidationMessages;
    /**
     * Fetches data for the form.
     *
     * @returns The latest version of the form data.
     */
    protected abstract fetchData(): Observable<TDataModel>;
    /**
     * Creates the form.
     *
     * @returns The form group object.
     */
    protected abstract createForm(): FormGroup;
    /**
     * Creates form data from the backing data model.
     *
     * @returns The form data object.
     */
    protected abstract createFormDataFromDataModel(): TFormData;
    /**
     * The method to run when the data fetch fails.
     *
     * @param error - The error object.
     */
    protected abstract onFetchError(error: any): void;
    /**
     * The method to run when the form save fails.
     *
     * @param error - The error object.
     */
    protected abstract onSaveError(error: any): void;
    /**
     * The method to run when the form save succeeeds.
     */
    protected abstract onSaveSuccess(): void;
    /**
     * Saves the form according to the new data model.
     *
     * @param newDataModel - The new data model to save.
     * @returns The newest version of the data model.
     */
    protected abstract saveForm(newDataModel: TDataModel): Observable<TDataModel>;
    /**
     * Gets the current value of the form.
     */
    protected readonly formCurrentValue: TFormData;
    /**
     * Discards the current form edits.
     */
    onDiscard(): void;
    /**
     * Saves the content of the form. The newest version of data for the form
     * will be fetched before performing the save operation.
     */
    onSave(): void;
    /**
     * The method to initialize the form with data.
     */
    protected init(): void;
    /**
     * Resets the form and displays the original values while marking the form as pristine and untouched.
     */
    protected resetForm(): void;
    /**
     * Processes a control for validation.
     *
     * @param control - The control to validate.
     * @param formErrors - The errors of the form.
     * @param validationMessages - The validation messages of the form.
     * @param formErrorsIndex - The form errors index.
     */
    protected processControlForValidation(control: AbstractControl, formErrors: any, validationMessages: FormControlContainerValidationMessages | {
        [key: string]: string | (() => string);
    }, formErrorsIndex: string): void;
    /**
     * Updates the form errors.
     *
     * @param form - The form to update.
     * @param formErrors - The form errors to apply.
     * @param validationMessages - The validation messages to apply.
     */
    protected updateFormErrors(form: FormGroup, formErrors: any, validationMessages: FormGroupValidationMessages): void;
    /**
     * Updates the form array errors.
     *
     * @param formArray - The form array to update.
     * @param formErrors - The form errors to apply.
     * @param validationMessages - The validation messages to apply.
     */
    protected updateFormErrorsForArray(formArray: FormArray, formErrors: any, validationMessages: FormArrayValidationMessages): void;
    /**
     * Initializes the form validation.
     */
    private initializeValidation();
    /**
     * The method to call when the form value changes.
     */
    private onValueChanged(data?);
    /**
     * Resets the data backing the form without updating the display.
     *
     * @param existingForm - The existing form group of the display.
     */
    private resetFormData(existingForm?);
}
