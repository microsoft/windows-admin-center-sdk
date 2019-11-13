import { Component, Injector } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ReactiveFormWizardStepComponent } from '@msft-sme/angular';
import { Strings } from '../../../../../../generated/strings';
import { Data } from '../../models/data';
@Component({
    selector: 'sme-app-simple-checkbox',
    templateUrl: './simple-checkbox.component.html'
})
export class SimpleCheckboxComponent extends ReactiveFormWizardStepComponent<Data, Strings> {
    protected get logSourceName() {
        return 'SimpleCheckboxComponent';
    }

    private get checkboxControl(): AbstractControl {
        return this.form.controls['checkbox'];
    }
    private get checkbox(): boolean {
        return this.checkboxControl.value;
    }
    private set checkbox(value: boolean) {
        this.checkboxControl.setValue(value);
    }

    constructor(injector: Injector) { super(injector); }

    public buildForm(): FormGroup {
        return this.formBuilder.group({
            checkbox: this.model.checkbox
        });
    }

    protected updateFromForm(): void {
        this.model.checkbox = this.checkbox;
    }

    protected updateFromModel(): void {
        this.checkbox = this.model.checkbox;
    }
}
