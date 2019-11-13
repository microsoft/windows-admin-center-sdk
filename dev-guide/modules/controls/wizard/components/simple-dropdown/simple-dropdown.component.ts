import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { ReactiveFormWizardStepComponent, ValidationAlerts, ValidationAlertSeverity, WizardStepComponent } from '@msft-sme/angular';
import { Strings } from '../../../../../../generated/strings';
import { Data } from '../../models/data';
import { DropdownOne } from '../../models/dropdown-one';
import { DropdownTwo } from '../../models/dropdown-two';

export interface OptionDisplayObject {
    name: string;
    description: string;
}

@Component({
    selector: 'sme-app-simple-dropdown',
    templateUrl: './simple-dropdown.component.html',
})
export class SimpleDropdownComponent extends ReactiveFormWizardStepComponent<Data, Strings> {

    protected get logSourceName() {
        return 'SimpleDropdownComponent';
    }

    public dropdownOneOptionsMap: { [index: number]: OptionDisplayObject };

    public options = [
        { label: 'Option 1', value: DropdownOne.Option1 },
        { label: 'Option 2', value: DropdownOne.Option2 },
        { label: 'Option 3', value: DropdownOne.Option3 },
        { label: 'Option 4', value: DropdownOne.Option4 },
        { label: 'Option 5', value: DropdownOne.Option5 }
    ];

    public dropdownLabel: string;

    private get dropdownOneOptionControl(): AbstractControl {
        return this.form.controls['dropdownOneOption'];
    }
    private get dropdownOneOption(): DropdownOne {
        return this.dropdownOneOptionControl.value;
    }
    private set dropdownOneOption(value: DropdownOne) {
        this.dropdownOneOptionControl.setValue(value);
    }

    constructor(injector: Injector) { super(injector); }

    public buildForm(): FormGroup {
        this.dropdownLabel = 'Choose from dropdown:';
        this.dropdownOneOptionsMap = {};
        this.dropdownOneOptionsMap[DropdownOne.Option1] = { name: 'Option1', description: 'Text for Option 1.' };
        this.dropdownOneOptionsMap[DropdownOne.Option2] = { name: 'Option2', description: 'Text for Option 2.' };
        this.dropdownOneOptionsMap[DropdownOne.Option3] = { name: 'Option3', description: 'Text for Option 3.' };
        this.dropdownOneOptionsMap[DropdownOne.Option4] = { name: 'Option4', description: 'Text for Option 4.' };
        this.dropdownOneOptionsMap[DropdownOne.Option5] = { name: 'Option5', description: 'Text for Option 5.' };

        return this.formBuilder.group({
            dropdownOneOption: this.model.dropdownOneOption
        });
    }

    protected updateFromForm(): void {
        this.model.dropdownOneOption = this.dropdownOneOption;
    }

    protected updateFromModel(): void {
        this.dropdownOneOption = this.model.dropdownOneOption;

    }
}
