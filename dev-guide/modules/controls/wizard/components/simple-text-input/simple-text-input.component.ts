import { Component, Injector } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ReactiveFormWizardStepComponent, ValidationAlerts, ValidationAlertSeverity } from '@msft-sme/angular';
import { Strings } from '../../../../../../generated/strings';
import { Data } from '../../models/data';

@Component({
    selector: 'sme-app-simple',
    templateUrl: './simple-text-input.component.html'
})

export class SimpleTextInputComponent extends ReactiveFormWizardStepComponent<Data, Strings> {
    protected get logSourceName() {
        return 'SimpleTextInputComponent';
    }

    public nameLabel = 'Step 1 Input';

    private get nameControl(): AbstractControl {
        return this.form.controls['name'];
    }
    private get name(): string {
        return this.nameControl.value;
    }
    private set name(value: string) {
        this.nameControl.setValue(value);
    }

    constructor(injector: Injector) { super(injector); }

    public buildForm(): FormGroup {
        return this.formBuilder.group({
            name: new FormControl(this.model.name, [Validators.required, this.nameValidator()])
        });
    }

    protected updateFromForm(): void {
        this.model.name = this.name;
    }

    protected updateFromModel(): void {
        this.name = this.model.name;
    }

    private nameValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationAlerts => {
            if (/\d/.test(control.value)) {
                return {
                    noNumbers: {
                        valid: false,
                        message: 'Input is should not contain numbers.',
                        severity: ValidationAlertSeverity.Error
                    }
                };
            }
            if (control.value.length < 2) {
                return {
                    longerThanOneCharacter: {
                        valid: false,
                        message: 'Input must be longer than 1 character.',
                        severity: ValidationAlertSeverity.Error
                    }
                };
            }
            return null;
        };
    }
}
