// tslint:disable:max-line-length
// tslint:disable:object-literal-key-quotes
// tslint:disable:quotemark
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {
    CheckValidationEventArgs,
    DataSchema,
    SchemaArrayProperty, SchemaFormComponent, SchemaObjectProperty, SchemaPrimitiveType,
    SchemaUtilities,
    ValidationAlerts, ValidationAlertSeverity
} from '@msft-sme/angular';
import { Observable } from 'rxjs';
@Component({
    selector: 'sme-ng2-controls-form-v2-example',
    templateUrl: './schema-form-example.component.html'
})
export class SchemaFormExampleComponent {
    public sodaFormSchema: DataSchema = {
        properties: [
            {
                type: SchemaPrimitiveType.String,
                format: 'textbox',
                name: 'model',
                label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Model.Title',
                required: true,
                options: {
                    multipleline: false
                }
            },
            {
                type: SchemaPrimitiveType.String,
                format: 'password',
                name: 'password',
                label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Password.Title',
                required: true,
                description: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Password.Description',
                customValidation: 'formData.validatePassword',
                options: {
                }
            },
            <SchemaArrayProperty>{
                type: SchemaPrimitiveType.Array,
                format: 'simple-list',
                name: 'retailStores',
                label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.RetailStores.Title',
                required: false,
                options: {
                },
                item: <SchemaObjectProperty>{
                    type: SchemaPrimitiveType.Object,
                    format: 'default',
                    required: false,
                    options: {
                        columnCount: 1,
                        hideHeader: false,
                        collapsible: {
                            yes: false,
                            state: 'collapsed'
                        }
                    },
                    properties: [
                        {
                            type: SchemaPrimitiveType.String,
                            format: 'textbox',
                            name: 'name',
                            label: 'Name',
                            required: false,
                            description: 'Data',
                            options: {
                                multipleline: false
                            }
                        }
                    ],
                    emptyByDefault: false
                }
            },
            <SchemaObjectProperty>{
                type: SchemaPrimitiveType.Object,
                format: 'radio-group',
                name: 'recipe',
                label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.Title',
                required: false,
                options: {
                    items: [
                        {
                            label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.Upload.Title',
                            value: 'upload'
                        },
                        {
                            label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.Create.Title',
                            value: 'create'
                        }
                    ]
                },
                properties: [
                    {
                        type: SchemaPrimitiveType.String,
                        format: 'textbox',
                        name: 'option',
                        required: false,
                        options: {
                            multipleline: false
                        }
                    },
                    <SchemaObjectProperty>{
                        type: SchemaPrimitiveType.Object,
                        format: 'default',
                        name: 'objectOptions',
                        required: false,
                        options: {
                            columnCount: 1,
                            hideHeader: false,
                            collapsible: {
                                yes: false,
                                state: 'collapsed'
                            }
                        },
                        properties: [
                            <SchemaObjectProperty>{
                                type: SchemaPrimitiveType.Object,
                                format: 'default',
                                name: 'upload',
                                label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.Upload.Title',
                                required: false,
                                options: {
                                    hideHeader: true,
                                    columnCount: 1,
                                    collapsible: {
                                        yes: false,
                                        state: 'collapsed'
                                    }
                                },
                                properties: [
                                    {
                                        type: SchemaPrimitiveType.File,
                                        format: 'default',
                                        name: 'file',
                                        label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.Upload.File.Title',
                                        required: true,
                                        options: {
                                            multiple: true,
                                            fileTypes: [
                                                '.recipe'
                                            ]
                                        }
                                    }
                                ],
                                emptyByDefault: false
                            },
                            <SchemaObjectProperty>{
                                type: SchemaPrimitiveType.Object,
                                format: 'default',
                                name: 'create',
                                label: 'Create',
                                required: false,
                                options: {
                                    hideHeader: true,
                                    columnCount: 1,
                                    collapsible: {
                                        yes: false,
                                        state: 'collapsed'
                                    }
                                },
                                properties: [
                                    {
                                        type: SchemaPrimitiveType.String,
                                        format: 'textbox',
                                        name: 'name',
                                        label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.Name.Title',
                                        required: true,
                                        options: {
                                            multipleline: false
                                        }
                                    },
                                    {
                                        type: SchemaPrimitiveType.String,
                                        format: 'textbox',
                                        name: 'description',
                                        label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.Description.Title',
                                        required: false,
                                        options: {
                                            multipleline: true
                                        }
                                    },
                                    <SchemaObjectProperty>{
                                        type: SchemaPrimitiveType.Object,
                                        format: 'checklist',
                                        name: 'flavorMix',
                                        label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.FlavorMix.Title',
                                        required: true,
                                        options: {
                                            items: [
                                                {
                                                    label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.FlavorMix.Cola',
                                                    value: 'cola'
                                                },
                                                {
                                                    label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.FlavorMix.Pepper',
                                                    value: 'pepper'
                                                },
                                                {
                                                    label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.FlavorMix.Orange',
                                                    value: 'orange'
                                                },
                                                {
                                                    label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.FlavorMix.LemonLime',
                                                    value: 'lemonLime'
                                                },
                                                {
                                                    label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.FlavorMix.RootBeer.Title',
                                                    value: 'rootBeer'
                                                }
                                            ]
                                        },
                                        properties: [
                                            <SchemaArrayProperty>{
                                                type: SchemaPrimitiveType.Array,
                                                format: 'simple-list',
                                                name: 'options',
                                                required: false,
                                                options: {
                                                },
                                                item: {
                                                    type: SchemaPrimitiveType.String,
                                                    format: 'textbox',
                                                    required: false,
                                                    options: {
                                                        multipleline: false
                                                    }
                                                }
                                            },
                                            <SchemaObjectProperty>{
                                                type: SchemaPrimitiveType.Object,
                                                format: 'default',
                                                name: 'objectOptions',
                                                required: false,
                                                options: {
                                                    columnCount: 1,
                                                    hideHeader: false,
                                                    collapsible: {
                                                        yes: false,
                                                        state: 'collapsed'
                                                    }
                                                },
                                                properties: [
                                                    <SchemaObjectProperty>{
                                                        type: SchemaPrimitiveType.Object,
                                                        format: 'default',
                                                        name: 'rootBeer',
                                                        required: false,
                                                        options: {
                                                            columnCount: 1,
                                                            hideHeader: false,
                                                            collapsible: {
                                                                yes: false,
                                                                state: 'collapsed'
                                                            }
                                                        },
                                                        properties: [
                                                            <SchemaObjectProperty>{
                                                                type: SchemaPrimitiveType.Object,
                                                                format: 'radio-group',
                                                                name: 'rootBeerVariant',
                                                                label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.FlavorMix.RootBeer.RootBeerVariant.Title',
                                                                required: false,
                                                                options: {
                                                                    items: [
                                                                        {
                                                                            value: 'regular',
                                                                            label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.FlavorMix.RootBeer.RootBeerVariant.Regular'
                                                                        },
                                                                        {
                                                                            value: 'birch',
                                                                            label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.FlavorMix.RootBeer.RootBeerVariant.Birch'
                                                                        },
                                                                        {
                                                                            value: 'sarsaparilla',
                                                                            label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.FlavorMix.RootBeer.RootBeerVariant.Sarsaparilla'
                                                                        }
                                                                    ]
                                                                },
                                                                properties: [
                                                                    {
                                                                        type: SchemaPrimitiveType.String,
                                                                        format: 'textbox',
                                                                        name: 'option',
                                                                        required: false,
                                                                        options: {
                                                                            multipleline: false
                                                                        }
                                                                    },
                                                                    <SchemaObjectProperty>{
                                                                        type: SchemaPrimitiveType.Object,
                                                                        format: 'default',
                                                                        name: 'objectOptions',
                                                                        required: false,
                                                                        options: {
                                                                            columnCount: 1,
                                                                            hideHeader: false,
                                                                            collapsible: {
                                                                                yes: false,
                                                                                state: 'collapsed'
                                                                            }
                                                                        },
                                                                        properties: [
                                                                        ],
                                                                        emptyByDefault: false
                                                                    }
                                                                ],
                                                                emptyByDefault: false
                                                            }
                                                        ],
                                                        emptyByDefault: false
                                                    }
                                                ],
                                                emptyByDefault: false
                                            }
                                        ],
                                        emptyByDefault: false
                                    },
                                    {
                                        type: SchemaPrimitiveType.Number,
                                        format: 'slider',
                                        name: 'carbonationLevel',
                                        label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.CarbonationLevel.Title',
                                        required: false,
                                        options: {
                                            min: 0,
                                            max: 10,
                                            step: 0.5,
                                            tooMuch: 7,
                                            tooLittle: 2,
                                            description: 'Carbonation level as measuered in "volumes of CO2". 0 volumes will result in avery smooth soda while 10 volumes will produce a soda with a kick.',
                                            tooMuchWarning: 'This soda will have quite a kick',
                                            tooLittleWarning: 'This soda might be a little flat'
                                        }
                                    },
                                    <SchemaArrayProperty>{
                                        type: SchemaPrimitiveType.Array,
                                        format: 'tags',
                                        name: 'tags',
                                        label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.Tags.Title',
                                        required: false,
                                        description: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.Tags.Description',
                                        options: {
                                            suggestions: [
                                                'sweet',
                                                'spicy',
                                                'smooth',
                                                'knocks you socks off',
                                                'full of flavor'
                                            ]
                                        },
                                        item: {
                                            type: SchemaPrimitiveType.String,
                                            required: false,
                                            options: {
                                            }
                                        }
                                    },
                                    {
                                        type: SchemaPrimitiveType.String,
                                        format: 'combobox',
                                        name: 'size',
                                        label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.ServingSize.Title',
                                        required: false,
                                        options: {
                                            items: [
                                                {
                                                    label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.ServingSize.Can',
                                                    value: 'can'
                                                },
                                                {
                                                    label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.ServingSize.Bottle',
                                                    value: 'smBottle'
                                                },
                                                {
                                                    label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.ServingSize.MdBottle',
                                                    value: 'mdBottle'
                                                },
                                                {
                                                    label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.ServingSize.LgBottle',
                                                    value: 'lgBottle'
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        type: SchemaPrimitiveType.Number,
                                        format: 'textbox',
                                        name: 'extraSugar',
                                        label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.ExtraSugar.Title',
                                        required: false,
                                        description: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.ExtraSugar.Description',
                                        options: {
                                            min: 0,
                                            max: 100,
                                            step: 1,
                                            tooMuch: 0,
                                            tooLittle: 0
                                        }
                                    },
                                    {
                                        type: SchemaPrimitiveType.Boolean,
                                        format: 'checkbox',
                                        name: 'isDiet',
                                        label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.ProduceDietSoda.Title',
                                        required: false,
                                        options: {
                                        }
                                    },
                                    {
                                        type: SchemaPrimitiveType.Boolean,
                                        format: 'toggle-switch',
                                        name: 'emergencyProduction',
                                        label: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.EmergencyProduction.Title',
                                        required: false,
                                        description: 'resources:strings:MsftSmeShell.App.DevGuide.SchemaFormExample.Recipe.EmergencyProduction.Description',
                                        options: {
                                        }
                                    }
                                ],
                                emptyByDefault: false
                            }
                        ],
                        emptyByDefault: false
                    }
                ],
                emptyByDefault: false
            }
        ]
    };

    public sodaFormData: any = {
        "retailStores": [],
        "model": "Soda Line 3000",
        "password": "",
        "recipe": {
            "option": "create",
            "objectOptions": {
                "upload": {
                    "file": null
                },
                "create": {
                    "name": "",
                    "description": "",
                    "flavorMix": {
                        "options": [],
                        "objectOptions": {
                            "rootBeer": {
                                "rootBeerVariant": {
                                    "option": "",
                                    "objectOptions": {}
                                }
                            }
                        }
                    },
                    "carbonationLevel": null,
                    "tags": [],
                    "size": "",
                    "extraSugar": 0,
                    "isDiet": false,
                    "emergencyProduction": null
                }
            }
        }
    };
    public playgroundSchema: DataSchema;

    public playgroundData: any;

    public formController = {
        sampleDynamicItemsForBinding: [
            {
                label: 'actual_string:Dynamic Option AAA',
                value: 'dynamicOptionAAA'
            },
            {
                label: 'actual_string:Dynamic Option BBB',
                value: 'dynamicOptionBBB'
            },
            {
                label: 'actual_string:Dynamic Option CCC',
                value: 'dynamicOptionCCC'
            }
        ],
        sampleValidate: (event: CheckValidationEventArgs) => {
            const alerts: ValidationAlerts = {};
            if (event.formControl.value !== 'hello') {
                alerts['notMatch'] = {
                    valid: false,
                    message: 'The value is not "hello"...',
                    severity: ValidationAlertSeverity.Error
                };
            }
            MsftSme.deepAssign(event.alerts, alerts);
        }
    };

    constructor() {
        this.sodaFormData = SchemaUtilities.setUpFormData(this.sodaFormData, this.sodaFormSchema);
        this.sodaFormData.validatePassword = (event: CheckValidationEventArgs) => {
            const alerts: ValidationAlerts = {};
            if (event.formControl.value !== 'pass') {
                alerts['notMatch'] = {
                    valid: false,
                    message: 'The value is not "pass"...',
                    severity: ValidationAlertSeverity.Error
                };
            }
            MsftSme.deepAssign(event.alerts, alerts);
        };
    }

    public onFormActionExecuted(action: string, data: any): void {
        alert('Action:' + action + '  data:' + JSON.stringify(data));
    }

    public getDataJsonText(tabIndex: number): string {
        let result;
        switch (tabIndex) {
            case 1:
                result = this.playgroundData;
                break;
            case 2:
                result = this.sodaFormData;
                break;
        }
        return JSON.stringify(result, null, 4);
    }
}

export interface FormViewModel {
    model: string;
    password: string;
    retailStores: {
        name: string;
    }[];
    recipe: {
        option: string;
        objectOptions: {
            upload: {
                file: Blob;
            };
            create: {
                name: string;
                description: string,
                flavorMix: {
                    options: string[],
                    objectOptions: {
                        rootBeer: {
                            rootBeerVariant: {
                                option: string,
                                objectOptions: {

                                }
                            }
                        }
                    }
                },
                carbonationLevel: number,
                tags: string[],
                size: string,
                extraSugar: number,
                isDiet: boolean,
                emergencyProduction: boolean
            }
        }
    };
}
