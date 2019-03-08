import { Component } from '@angular/core';
import {
    CheckAsyncValidationEventArgs,
    CheckValidationEventArgs,
    ValidationAlerts,
    ValidationAlertSeverity
} from '@msft-sme/angular';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { generateSodaFactory } from '../models/soda-factory';

@Component({
    selector: 'sme-ng2-control-input-soda-factory-example',
    templateUrl: './soda-factory-example.component.html'
})
export class SodaFactoryExampleComponent {
    public model: any;
    public loadingSweeteners = false;

    private sweetenersLoaded = false;
    private sweeteners: any;

    constructor() {
        this.model = generateSodaFactory();
        this.sweeteners = this.model.dietSweetener.options;
        this.model.dietSweetener.options = [];
    }

    public isDietChanged() {
        if (!this.sweetenersLoaded) {
            this.loadingSweeteners = true;
            this.sweetenersLoaded = true;
            setTimeout(() => {
                this.model.dietSweetener.options = this.sweeteners;
                this.sweeteners = null;
                this.loadingSweeteners = false;
            }, 2000);
        }
    }

    /**
     * This is only one of many ways to add validation to a form field.
     * @param name the field name
     * @param event the validation event
     */
    public onCustomValidate(name: string, event: CheckValidationEventArgs) {
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
        } else if (name === 'emergencyProduction') {
            if (event.formControl.value) {
                alerts['toMuch'] = {
                    valid: true,
                    message: this.model.emergencyProduction.warning,
                    severity: ValidationAlertSeverity.Warning
                };
            }
        } else if (name === 'password') {
            const value = event.formControl.value;
            if (MsftSme.isNullOrUndefined(value) || value === '') {
                alerts['required'] = {
                    message: this.model.password.required
                };
            }
            if (event.formControl.value !== 'password') {
                alerts['notMatch'] = {
                    valid: false,
                    message: this.model.password.notMatch,
                    severity: ValidationAlertSeverity.Error
                };
            }
        }

        MsftSme.deepAssign(event.alerts, alerts);
    }

    /**
     * This is only one of many ways to add validation to a form field.
     * @param name the field name
     * @param event the validation event
     */
    public onCustomAsyncValidate(name: string, event: CheckAsyncValidationEventArgs) {
        const value = event.formControl.value;
        event.alerts.push(
            of(null).pipe(
                delay(5000),
                map(() => {
                    const alerts: ValidationAlerts = {};
                    if (name === 'extraSugar') {
                        if (this.model.extraSugar.wayToMuch <= value) {
                            alerts['wayToMuch'] = {
                                valid: false,
                                message: this.model.extraSugar.wayToMuchError,
                                severity: ValidationAlertSeverity.Error
                            };
                        } else if (this.model.extraSugar.toMuch <= value) {
                            alerts['toMuch'] = {
                                valid: true,
                                message: this.model.extraSugar.toMuchWarning,
                                severity: ValidationAlertSeverity.Warning
                            };
                        } else if (this.model.extraSugar.toLittle >= value) {
                            alerts['toLittle'] = {
                                valid: true,
                                message: this.model.extraSugar.toLittleWarning,
                                severity: ValidationAlertSeverity.Warning
                            };
                        }
                    }
                    return alerts;
                })
            )
        );
    }

    public onSodaNameAction(value: string) {
        alert(`The value of the sodaName form field is: ${value}`);
    }
}
