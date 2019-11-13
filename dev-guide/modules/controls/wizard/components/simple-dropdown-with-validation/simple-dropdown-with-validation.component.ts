import { Component, Injector } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { ValidationAlerts, ValidationAlertSeverity } from '@msft-sme/angular';
import { ReactiveFormWizardStepComponent } from '@msft-sme/angular';
import { Strings } from '../../../../../../generated/strings';
import { Data } from '../../models/data';
import { DropdownTwo } from '../../models/dropdown-two';

@Component({
    selector: 'sme-app-simple-dropdown-with-validation',
    templateUrl: './simple-dropdown-with-validation.component.html'
})
export class SimpleDropdownWithValidationComponent extends ReactiveFormWizardStepComponent<Data, Strings> {

    protected get logSourceName() {
        return 'SimpleDropdownWithValidationComponent';
    }

    public options = [
        { label: 'Option A', value: DropdownTwo.OptionA },
        { label: 'Invalid option', value: DropdownTwo.Invalid },
        { label: 'Option B', value: DropdownTwo.OptionB },
        { label: 'Option C', value: DropdownTwo.OptionC }
    ];
    public dropdownLabel = 'Choose option below';

    private get dropdownTwoOptionControl(): AbstractControl {
        return this.form.controls['dropdownTwoOption'];
    }
    private get dropdownTwoOption(): DropdownTwo {
        return this.dropdownTwoOptionControl.value;
    }
    private set dropdownTwoOption(value: DropdownTwo) {
        this.dropdownTwoOptionControl.setValue(value);
    }

    constructor(injector: Injector) { super(injector); }

    public buildForm(): FormGroup {
        return this.formBuilder.group({
            dropdownTwoOption: new FormControl(this.model.dropdownTwoOption, [this.dropDownValidator()])
        });
    }

    protected updateFromForm(): void {
        this.model.dropdownTwoOption = this.dropdownTwoOption;
    }

    protected updateFromModel(): void {
        this.dropdownTwoOption = this.model.dropdownTwoOption;

    }

    private dropDownValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationAlerts => {
            if (control.value === DropdownTwo.Invalid) {
                return {
                    invalidDropdown: {
                        valid: false,
                        message: 'Selection is invalid.',
                        severity: ValidationAlertSeverity.Error
                    }
                };
            }
            return null;
        };
    }
}
