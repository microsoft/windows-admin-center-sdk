import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {
    CheckValidationEventArgs
} from '@msft-sme/angular';
import {
    ValidationAlerts, ValidationAlertSeverity
} from '@msft-sme/angular';
import { generateSodaFactory } from '../models/soda-factory';

@Component({
    selector: 'sme-ng2-control-input-soda-factory-reactive-example',
    templateUrl: './soda-factory-reactive-example.component.html'
})
export class SodaFactoryReactiveExampleComponent implements OnInit {
    public sodaFactory: FormGroup;
    public model = generateSodaFactory();

    private get recipeTypeControl(): AbstractControl {
        return this.sodaFactory.get('recipeType');
    }

    public ngOnInit(): void {
        this.sodaFactory = new FormGroup({
            model: new FormControl(this.model.model.value),
            password: new FormControl(this.model.password.value, [c => this.validatePassword(c)]),
            recipeType: new FormControl(this.model.recipeType.value),
            upload: new FormControl(this.model.upload.value),
            sodaName: new FormControl(this.model.name.value),
            details: new FormControl(this.model.details.value),
            flavorMix: new FormControl(this.model.flavorMix.value),
            flavorMix2: new FormControl(this.model.flavorMix.value2),
            rootbeerType: new FormControl(this.model.rootbeerType.value),
            carbonationLevel: new FormControl(this.model.carbonationLevel.value),
            tags: new FormControl(this.model.tags.value),
            size: new FormControl(this.model.size.value),
            extraSugar: new FormControl(this.model.extraSugar.value),
            isDiet: new FormControl(this.model.isDiet.value),
            dietSweetener: new FormControl(this.model.dietSweetener.value),
            emergencyProduction: new FormControl(this.model.emergencyProduction.value),
            orderedList: new FormControl(this.model.orderedList.value),
            inlineRadio: new FormControl(this.model.inlineRadio.value),
            quotes: new FormControl(this.model.quotes.value)
        });

        this.recipeTypeControl.disable();
    }

    /**
     * Reactive implementation of custom validation for the password field
     * @param control the password form control
     *
     * BUG NOTE: This implementation should only return ERROR alerts.
     * use (customValidate) on the sme-form-field if you want to return other alert types
     */
    private validatePassword(control: AbstractControl): ValidationAlerts | null {
        const alerts: ValidationAlerts = {};
        const value = control.value;
        if (MsftSme.isNullOrUndefined(value) || value === '') {
            alerts['required'] = {
                message: this.model.password.required
            };
        }
        if (control.value !== 'password') {
            alerts['notMatch'] = {
                valid: false,
                message: this.model.password.notMatch,
                severity: ValidationAlertSeverity.Error
            };
        }
        if (this.sodaFactory) {
            if (Object.keys(alerts).length === 0) {
                this.recipeTypeControl.enable();
            } else {
                this.recipeTypeControl.disable();
            }
        }
        return alerts;
    }

    /**
     * This is only one of many ways to add validation to a form field.
     * @param name the field name
     * @param event the validation event
     */
    public onCustomValidate(name: string, event: CheckValidationEventArgs): void {
        const alerts: ValidationAlerts = {};
        if (name === 'carbonationLevel') {
            if (this.model.carbonationLevel.toMuch <= event.formControl.value) {
                alerts['toMuch'] = {
                    valid: true,
                    message: this.model.carbonationLevel.toMuchWarning,
                    severity: ValidationAlertSeverity.Warning
                };
            } else if (this.model.carbonationLevel.toLittle >= event.formControl.value) {
                alerts['toLittle'] = {
                    valid: true,
                    message: this.model.carbonationLevel.toLittleWarning,
                    severity: ValidationAlertSeverity.Warning
                };
            }
        } else if (name === 'extraSugar') {
            if (this.model.extraSugar.wayToMuch <= event.formControl.value) {
                alerts['wayToMuch'] = {
                    valid: false,
                    message: this.model.extraSugar.wayToMuchError,
                    severity: ValidationAlertSeverity.Error
                };
            } else if (this.model.extraSugar.toMuch <= event.formControl.value) {
                alerts['toMuch'] = {
                    valid: true,
                    message: this.model.extraSugar.toMuchWarning,
                    severity: ValidationAlertSeverity.Warning
                };
            } else if (this.model.extraSugar.toLittle >= event.formControl.value) {
                alerts['toLittle'] = {
                    valid: true,
                    message: this.model.extraSugar.toLittleWarning,
                    severity: ValidationAlertSeverity.Warning
                };
            }
        } else if (name === 'emergencyProduction') {
            if (event.formControl.value) {
                alerts['toMuch'] = {
                    valid: true,
                    message: this.model.emergencyProduction.warning,
                    severity: ValidationAlertSeverity.Warning
                };
            }
        }

        MsftSme.deepAssign(event.alerts, alerts);
    }
}
