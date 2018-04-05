import { Component } from '@angular/core';
import { ValidationAlertSeverity } from '@msft-sme/shell/angular';
var SodaFactoryExampleComponent = /** @class */ (function () {
    function SodaFactoryExampleComponent() {
        this.model = this.createModel();
    }
    /**
     * Resets the form controls data model to a predefined initial state
     */
    SodaFactoryExampleComponent.prototype.createModel = function () {
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
    };
    /**
     * This is only one of many ways to add validation to a form field.
     * @param name the field name
     * @param event the validation event
     */
    SodaFactoryExampleComponent.prototype.onCustomValidate = function (name, event) {
        var alerts = {};
        if (name === 'carbinationLevel') {
            if (this.model.carbinationLevel.toMuch <= event.formControl.value) {
                alerts['toMuch'] = {
                    valid: true,
                    message: this.model.carbinationLevel.toMuchWarning,
                    severity: ValidationAlertSeverity.Warning
                };
            }
            else if (this.model.carbinationLevel.toLittle >= event.formControl.value) {
                alerts['toLittle'] = {
                    valid: true,
                    message: this.model.carbinationLevel.toLittleWarning,
                    severity: ValidationAlertSeverity.Warning
                };
            }
        }
        else if (name === 'extraSugar') {
            if (this.model.extraSugar.wayToMuch <= event.formControl.value) {
                alerts['wayToMuch'] = {
                    valid: false,
                    message: this.model.extraSugar.wayToMuchError,
                    severity: ValidationAlertSeverity.Error
                };
            }
            else if (this.model.extraSugar.toMuch <= event.formControl.value) {
                alerts['toMuch'] = {
                    valid: true,
                    message: this.model.extraSugar.toMuchWarning,
                    severity: ValidationAlertSeverity.Warning
                };
            }
            else if (this.model.extraSugar.toLittle >= event.formControl.value) {
                alerts['toLittle'] = {
                    valid: true,
                    message: this.model.extraSugar.toLittleWarning,
                    severity: ValidationAlertSeverity.Warning
                };
            }
        }
        else if (name === 'emergancyProduction') {
            if (event.formControl.value) {
                alerts['toMuch'] = {
                    valid: true,
                    message: this.model.emergancyProduction.warning,
                    severity: ValidationAlertSeverity.Warning
                };
            }
        }
        else if (name === 'password') {
            if (event.formControl.value !== 'password') {
                alerts['notMatch'] = {
                    valid: false,
                    message: this.model.password.notMatch,
                    severity: ValidationAlertSeverity.Error
                };
            }
        }
        MsftSme.deepAssign(event.alerts, alerts);
    };
    SodaFactoryExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-control-input-soda-factory-example',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-documentation\">\n\n          <h2>Soda Factory</h2>\n\n          <div class=\"sme-documentation-example\">\n              <form>\n                  <sme-form-field type=\"readonly\" name=\"model\" [(ngModel)]=\"model.model.value\" [label]=\"model.model.label\"></sme-form-field>\n                  <sme-form-field type=\"password\" name=\"password\" [(ngModel)]=\"model.password.value\" [label]=\"model.password.label\" [description]=\"model.password.description\" [required]=\"true\" (customValidate)=\"onCustomValidate('password', $event)\"></sme-form-field>\n                  <sme-form-field type=\"radiogroup\" name=\"recipeType\" [(ngModel)]=\"model.recipeType.value\" [label]=\"model.recipeType.label\" [description]=\"model.recipeType.description\" [disabled]=\"model.password.value !== 'password'\">\n                      <sme-option [value]=\"model.recipeType.options.upload.value\" [label]=\"model.recipeType.options.upload.label\">\n                          <ng-template>\n                              <sme-form-field type=\"file\" name=\"file\" [(ngModel)]=\"model.upload.value\" [label]=\"model.upload.label\" [description]=\"model.upload.description\" [required]=\"true\" [multiple]=\"true\" [fileTypes]=\"['.recipe']\"></sme-form-field>\n                          </ng-template>\n                      </sme-option>\n                      <sme-option [value]=\"model.recipeType.options.create.value\" [label]=\"model.recipeType.options.create.label\">\n                          <ng-template>\n                              <sme-form-field type=\"text\" name=\"sodaName\" [(ngModel)]=\"model.name.value\" [label]=\"model.name.label\" [required]=\"true\"></sme-form-field>\n                              <sme-form-field type=\"text\" name=\"details\" [(ngModel)]=\"model.details.value\" [label]=\"model.details.label\" [multiline]=\"true\"></sme-form-field>\n                              <sme-form-field type=\"checklist\" name=\"flavorMix\" [(ngModel)]=\"model.flavorMix.value\" [label]=\"model.flavorMix.label\" [required]=\"true\">\n                                  <sme-option [value]=\"model.flavorMix.options.cola.value\" [label]=\"model.flavorMix.options.cola.label\"></sme-option>\n                                  <sme-option [value]=\"model.flavorMix.options.pepper.value\" [label]=\"model.flavorMix.options.pepper.label\"></sme-option>\n                                  <sme-option [value]=\"model.flavorMix.options.orange.value\" [label]=\"model.flavorMix.options.orange.label\"></sme-option>\n                                  <sme-option [value]=\"model.flavorMix.options.grape.value\" [label]=\"model.flavorMix.options.grape.label\"></sme-option>\n                                  <sme-option [value]=\"model.flavorMix.options.lemonlime.value\" [label]=\"model.flavorMix.options.lemonlime.label\"></sme-option>\n                                  <sme-option [value]=\"model.flavorMix.options.cherry.value\" [label]=\"model.flavorMix.options.cherry.label\"></sme-option>\n                                  <sme-option [value]=\"model.flavorMix.options.rootbeer.value\" [label]=\"model.flavorMix.options.rootbeer.label\">\n                                      <ng-template>\n                                          <sme-form-field type=\"radiogroup\" name=\"rootbeerType\" [(ngModel)]=\"model.rootbeerType.value\" [label]=\"model.rootbeerType.label\" [description]=\"model.rootbeerType.description\">\n                                              <sme-option *ngFor=\"let option of model.rootbeerType.options\" [value]=\"option.value\" [label]=\"option.label\"></sme-option>\n                                          </sme-form-field>\n                                      </ng-template>\n                                  </sme-option>\n                              </sme-form-field>\n                              <sme-form-field type=\"slider\" name=\"carbinationLevel\" [(ngModel)]=\"model.carbinationLevel.value\" [label]=\"model.carbinationLevel.label\" [description]=\"model.carbinationLevel.description\" [min]=\"model.carbinationLevel.min\" [max]=\"model.carbinationLevel.max\"\n                                  [step]=\"model.carbinationLevel.step\" (customValidate)=\"onCustomValidate('carbinationLevel', $event)\"></sme-form-field>\n                              <sme-form-field type=\"tags\" name=\"tags\" [(ngModel)]=\"model.tags.value\" [suggestions]=\"model.tags.suggestions\" [label]=\"model.tags.label\" [description]=\"model.tags.description\"></sme-form-field>\n                              <sme-form-field type=\"select\" name=\"size\" [(ngModel)]=\"model.size.value\" [label]=\"model.size.label\" [description]=\"model.size.description\">\n                                  <sme-option *ngFor=\"let option of model.size.options\" [value]=\"option.value\" [label]=\"option.label\"></sme-option>\n                              </sme-form-field>\n                              <sme-form-field type=\"number\" name=\"extraSugar\" [(ngModel)]=\"model.extraSugar.value\" [label]=\"model.extraSugar.label\" [description]=\"model.extraSugar.description\" [min]=\"model.extraSugar.min\" [max]=\"model.extraSugar.max\" [step]=\"model.extraSugar.step\"\n                                  (customValidate)=\"onCustomValidate('extraSugar', $event)\"></sme-form-field>\n                              <sme-form-field type=\"checkbox\" name=\"isDiet\" [(ngModel)]=\"model.isDiet.value\" [label]=\"model.isDiet.label\"></sme-form-field>\n                              <sme-form-field type=\"toggle-switch\" name=\"emergancyProduction\" [(ngModel)]=\"model.emergancyProduction.value\" [label]=\"model.emergancyProduction.label\" [description]=\"model.emergancyProduction.description\" (customValidate)=\"onCustomValidate('emergancyProduction', $event)\"></sme-form-field>\n                          </ng-template>\n                      </sme-option>\n                  </sme-form-field>\n              </form>\n          </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    SodaFactoryExampleComponent.ctorParameters = function () { return []; };
    return SodaFactoryExampleComponent;
}());
export { SodaFactoryExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9mb3JtL3NvZGEtZmFjdG9yeS9zb2RhLWZhY3RvcnktZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFFMUMsT0FBTyxFQUE4Qyx1QkFBQSxFQUF3QixNQUFPLHlCQUFBLENBQTBCO0FBRzlHO0lBR0k7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxpREFBVyxHQUFsQjtRQUNJLE1BQU0sQ0FBQztZQUNILEtBQUssRUFBRTtnQkFDSCxLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsZ0JBQWdCO2FBQzFCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRSxVQUFVO2dCQUNqQixLQUFLLEVBQUUsRUFBRTtnQkFDVCwyQkFBMkI7Z0JBQzNCLFdBQVcsRUFBRSxzSEFBc0g7Z0JBQ25JLFFBQVEsRUFBRSwwREFBMEQ7YUFDdkU7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLE9BQU8sRUFBRTtvQkFDTCxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7b0JBQzVDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtpQkFDL0M7YUFDSjtZQUNELE1BQU0sRUFBRTtnQkFDSixLQUFLLEVBQUUsSUFBSTtnQkFDWCxLQUFLLEVBQUUsaUJBQWlCO2dCQUN4QixXQUFXLEVBQUUsbUNBQW1DO2FBQ25EO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLEtBQUssRUFBRSxNQUFNO2dCQUNiLEtBQUssRUFBRSxFQUFFO2FBQ1o7WUFDRCxPQUFPLEVBQUU7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QUFDLE9BQU87aUJBQzVDLENBQUM7WUFDTixDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUsscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHO29CQUNmLEtBQUssRUFBRSxJQUFJO29CQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE9BQU87b0JBQy9DLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2lCQUM1QyxDQUFDO1lBQ04sQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDekMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHO29CQUNqQixLQUFLLEVBQUUsS0FBSztvQkFDWixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUTtvQkFDckMsUUFBUSxFQUFFLHVCQUF1QixDQUFDLEtBQUs7aUJBQzFDLENBQUM7WUFDTixDQUFDO1FBQ0wsQ0FBQztRQUVELE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0Usc0NBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsNENBQTRDO29CQUN0RCxRQUFRLEVBQUUsbzdMQWtEVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsMENBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRixrQ0FBQztDQXRQRCxBQXNQQyxJQUFBO1NBdFBZLDJCQUEyQiIsImZpbGUiOiJzb2RhLWZhY3RvcnktZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbWF0d2lscy9Tb3VyY2UvYmFzZS9tc2Z0LXNtZS1kZXZlbG9wZXItdG9vbHMvaW5saW5lU3JjLyJ9