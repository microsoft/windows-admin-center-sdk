import { ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormControl, ValidationErrors, Validator } from '@angular/forms';
import { Strings } from '../../../../generated/strings';
import { AppContextService } from '../../../service';
import { BaseControl } from '../../common/base-control.component';
/**
 * Base component class for form inputs. Inputs are the editable content portion of a form field
 */
export declare class FormInputBaseComponent<TStrings, TModel> extends BaseControl<TStrings> implements ControlValueAccessor, Validator {
    /**
     * Indicates that this form control is disabled
     */
    disabled: boolean;
    /**
     * Placeholder for the onChange callback that is registered by the Forms API
     */
    onChange: MsftSme.Action1<TModel>;
    /**
     * Placeholder for the onTouched callback that is registered by the Forms API
     */
    onTouched: MsftSme.Action;
    /**
     * Getter for the forms actual value
     */
    /**
     * Setter for the forms actual value.
     */
    value: TModel;
    /**
     * Internal placeholder for the forms actual value
     */
    private internalValue;
    /**
     * Constructs a new instance of FormInputBaseComponent
     */
    constructor(renderer: Renderer2, hostElement: ElementRef, appContextService: AppContextService, initialValue: TModel);
    /**
     * Implementation of ControlValueAccessor interface.
     * Registers a callback function that should be called when the control's value changes in the UI.
     * @param fn the onChange function to call when the control should propagated changes to the view
     */
    registerOnChange(fn: MsftSme.Action1<TModel>): void;
    /**
     * Implementation of ControlValueAccessor interface.
     * Registers a callback function that should be called when the control receives a blur event.
     * @param fn the onTouched function to call when the control should be considered blurred
     */
    registerOnTouched(fn: MsftSme.Action): void;
    /**
     * Implementation of ControlValueAccessor interface.
     * Called when the controls status changes to or from "DISABLED"
     * @param isDisabled Indicates if the control should be disabled.
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * Implementation of ControlValueAccessor interface.
     * This method will be called by the forms API to write to the view when programmatic (model -> view) changes are requested.
     * @param value The new value of the model for this form control
     */
    writeValue(value: TModel): void;
    /**
     * Implementation of Validator interface.
     * Validates the value of this control
     * @param changes The changed properties
     * @return Formatted null when valid, otherwise returns a validation object in the form of "{ errorType: {valid: false} }".
     */
    validate(c: FormControl): ValidationErrors | null;
    /**
     * Occurs any time value changed.
     */
    protected onValueChanged(): void;
}
/**
 * Internal base component for SME. It simply removes the need to supply the string type parameter to FormInputBaseComponent
 * This class is exported from this file, but not meant to be exported from index.ts bundles.
 */
export declare class SmeInternalFormInputBaseComponent<TModel> extends FormInputBaseComponent<Strings, TModel> {
}
