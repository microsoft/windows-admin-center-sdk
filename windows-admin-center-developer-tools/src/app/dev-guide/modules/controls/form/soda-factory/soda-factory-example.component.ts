// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component } from '@angular/core';

import { CheckValidationEventArgs, ValidationAlerts, ValidationAlertSeverity } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-control-input-soda-factory-example',
    templateUrl: './soda-factory-example.component.html'
})
export class SodaFactoryExampleComponent {
    public model: any;

    constructor() {
        this.model = this.createModel();
    }

    /**
     * Resets the form controls data model to a predefined initial state
     */
    public createModel() {
        return {
            model: {
                label: 'Model',
                value: 'Soda Line 3000'
            },
            password: {
                label: 'Password',
                value: '',
                // tslint:disable-next-line
                description: 'This SodaBuilder is password protected, You cannot make soda without the password. Hint: The password is "password".',
                notMatch: 'The password is incorrect. Hint: try "password" instead.'
            },
            recipeType: {
                value: 'upload',
                label: 'Recipe:',
                options: {
                    upload: { label: 'Upload', value: 'upload' },
                    create: { label: 'Create', value: 'create' }
                }
            },
            upload: {
                value: null,
                label: 'Choose A Recipe',
                description: 'Only ".recipe" files are allowed.'
            },
            name: {
                label: 'Name',
                value: ''
            },
            details: {
                label: 'Description',
                value: ''
            },
            flavorMix: {
                label: 'Flavor Mix',
                value: {},
                options: {
                    cola: { label: 'Cola', value: 'cola' },
                    pepper: { label: 'Pepper', value: 'pepper' },
                    orange: { label: 'Orange', value: 'orange' },
                    grape: { label: 'Grape', value: 'grape' },
                    lemonlime: { label: 'Lemon Lime', value: 'lemonlime' },
                    cherry: { label: 'Cherry', value: 'cherry' },
                    rootbeer: { label: 'Root Beer', value: 'rootbeer' }
                }
            },
            rootbeerType: {
                value: 'regular',
                label: 'Rootbeer Variant:',
                description: 'Choose the type of recipe. ',
                options: [
                    { label: 'Regular', value: 'regular' },
                    { label: 'Birch', value: 'birch' },
                    { label: 'Sarsaparilla', value: 'sarsaparilla' }
                ]
            },
            carbinationLevel: {
                label: 'Carbination Level',
                value: 4,
                min: 0,
                max: 10,
                step: .5,
                toMuch: 7,
                toLittle: 2,
                // tslint:disable-next-line
                description: 'Carbination level as measuered in "volumes of CO2". 0 volumes will result in avery smooth soda while 10 volumes will produce a soda with a kick.',
                toMuchWarning: 'This soda will have quite a kick',
                toLittleWarning: 'This soda might be a little flat'
            },
            tags: {
                label: 'Tags',
                value: [],
                suggestions: ['sweet', 'spicy', 'smooth', 'knocks you socks off', 'full of flavor'],
                description: 'These tags will help others find your recipe in the intergalactic soda index.'
            },
            size: {
                value: 'can',
                label: 'Serving Size',
                options: [
                    { label: 'Can (8oz)', value: 'can' },
                    { label: 'Bottle (12oz)', value: 'smBottle' },
                    { label: 'Md Bottle (1 L)', value: 'mdBottle' },
                    { label: 'Lg Bottle (2 L)', value: 'lgBottle' }
                ]
            },
            extraSugar: {
                value: 25,
                min: 0,
                max: 100,
                step: 5,
                toMuch: 60,
                wayToMuch: 100,
                toLittle: 10,
                label: 'Extra Sugar',
                // tslint:disable-next-line
                description: 'Adding extra sugar to the soda will make it sweet and mask the chemical flavors, but will be even worse for your health.',
                toMuchWarning: 'This might be too sweet',
                toLittleWarning: 'This might not be sweet enough',
                wayToMuchError: 'Thats just downright dangerous'
            },
            isDiet: {
                value: false,
                label: 'Produce Diet Soda'
            },
            emergancyProduction: {
                // toggle-switch
                value: false,
                label: 'Emergency Production',
                // tslint:disable-next-line
                description: 'Turn this on if you need soda now! This will continuosly despense a stream of soda rather than filling each bottle then stopping.',
                warning: 'This could get messy...'
            }
        };
    }

    /**
     * This is only one of many ways to add validation to a form field. 
     * @param name the field name
     * @param event the validation event
     */
    public onCustomValidate(name: string, event: CheckValidationEventArgs) {
        let alerts: ValidationAlerts = {};
        if (name === 'carbinationLevel') {
            if (this.model.carbinationLevel.toMuch <= event.formControl.value) {
                alerts['toMuch'] = {
                    valid: true,
                    message: this.model.carbinationLevel.toMuchWarning,
                    severity: ValidationAlertSeverity.Warning
                };
            } else if (this.model.carbinationLevel.toLittle >= event.formControl.value) {
                alerts['toLittle'] = {
                    valid: true,
                    message: this.model.carbinationLevel.toLittleWarning,
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
        } else if (name === 'emergancyProduction') {
            if (event.formControl.value) {
                alerts['toMuch'] = {
                    valid: true,
                    message: this.model.emergancyProduction.warning,
                    severity: ValidationAlertSeverity.Warning
                };
            }
        } else if (name === 'password') {
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
}
