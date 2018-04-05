import { Component } from '@angular/core';

import { CheckValidationEventArgs, ValidationAlerts, ValidationAlertSeverity } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-control-input-soda-factory-example',
    template: `
      <div class="sme-layout-absolute sme-position-inset-none sme-documentation">

          <h2>Soda Factory</h2>

          <div class="sme-documentation-example">
              <form>
                  <sme-form-field type="readonly" name="model" [(ngModel)]="model.model.value" [label]="model.model.label"></sme-form-field>
                  <sme-form-field type="password" name="password" [(ngModel)]="model.password.value" [label]="model.password.label" [description]="model.password.description" [required]="true" (customValidate)="onCustomValidate('password', $event)"></sme-form-field>
                  <sme-form-field type="radiogroup" name="recipeType" [(ngModel)]="model.recipeType.value" [label]="model.recipeType.label" [description]="model.recipeType.description" [disabled]="model.password.value !== 'password'">
                      <sme-option [value]="model.recipeType.options.upload.value" [label]="model.recipeType.options.upload.label">
                          <ng-template>
                              <sme-form-field type="file" name="file" [(ngModel)]="model.upload.value" [label]="model.upload.label" [description]="model.upload.description" [required]="true" [multiple]="true" [fileTypes]="['.recipe']"></sme-form-field>
                          </ng-template>
                      </sme-option>
                      <sme-option [value]="model.recipeType.options.create.value" [label]="model.recipeType.options.create.label">
                          <ng-template>
                              <sme-form-field type="text" name="sodaName" [(ngModel)]="model.name.value" [label]="model.name.label" [required]="true"></sme-form-field>
                              <sme-form-field type="text" name="details" [(ngModel)]="model.details.value" [label]="model.details.label" [multiline]="true"></sme-form-field>
                              <sme-form-field type="checklist" name="flavorMix" [(ngModel)]="model.flavorMix.value" [label]="model.flavorMix.label" [required]="true">
                                  <sme-option [value]="model.flavorMix.options.cola.value" [label]="model.flavorMix.options.cola.label"></sme-option>
                                  <sme-option [value]="model.flavorMix.options.pepper.value" [label]="model.flavorMix.options.pepper.label"></sme-option>
                                  <sme-option [value]="model.flavorMix.options.orange.value" [label]="model.flavorMix.options.orange.label"></sme-option>
                                  <sme-option [value]="model.flavorMix.options.grape.value" [label]="model.flavorMix.options.grape.label"></sme-option>
                                  <sme-option [value]="model.flavorMix.options.lemonlime.value" [label]="model.flavorMix.options.lemonlime.label"></sme-option>
                                  <sme-option [value]="model.flavorMix.options.cherry.value" [label]="model.flavorMix.options.cherry.label"></sme-option>
                                  <sme-option [value]="model.flavorMix.options.rootbeer.value" [label]="model.flavorMix.options.rootbeer.label">
                                      <ng-template>
                                          <sme-form-field type="radiogroup" name="rootbeerType" [(ngModel)]="model.rootbeerType.value" [label]="model.rootbeerType.label" [description]="model.rootbeerType.description">
                                              <sme-option *ngFor="let option of model.rootbeerType.options" [value]="option.value" [label]="option.label"></sme-option>
                                          </sme-form-field>
                                      </ng-template>
                                  </sme-option>
                              </sme-form-field>
                              <sme-form-field type="slider" name="carbinationLevel" [(ngModel)]="model.carbinationLevel.value" [label]="model.carbinationLevel.label" [description]="model.carbinationLevel.description" [min]="model.carbinationLevel.min" [max]="model.carbinationLevel.max"
                                  [step]="model.carbinationLevel.step" (customValidate)="onCustomValidate('carbinationLevel', $event)"></sme-form-field>
                              <sme-form-field type="tags" name="tags" [(ngModel)]="model.tags.value" [suggestions]="model.tags.suggestions" [label]="model.tags.label" [description]="model.tags.description"></sme-form-field>
                              <sme-form-field type="select" name="size" [(ngModel)]="model.size.value" [label]="model.size.label" [description]="model.size.description">
                                  <sme-option *ngFor="let option of model.size.options" [value]="option.value" [label]="option.label"></sme-option>
                              </sme-form-field>
                              <sme-form-field type="number" name="extraSugar" [(ngModel)]="model.extraSugar.value" [label]="model.extraSugar.label" [description]="model.extraSugar.description" [min]="model.extraSugar.min" [max]="model.extraSugar.max" [step]="model.extraSugar.step"
                                  (customValidate)="onCustomValidate('extraSugar', $event)"></sme-form-field>
                              <sme-form-field type="checkbox" name="isDiet" [(ngModel)]="model.isDiet.value" [label]="model.isDiet.label"></sme-form-field>
                              <sme-form-field type="toggle-switch" name="emergancyProduction" [(ngModel)]="model.emergancyProduction.value" [label]="model.emergancyProduction.label" [description]="model.emergancyProduction.description" (customValidate)="onCustomValidate('emergancyProduction', $event)"></sme-form-field>
                          </ng-template>
                      </sme-option>
                  </sme-form-field>
              </form>
          </div>
      </div>
    `
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
