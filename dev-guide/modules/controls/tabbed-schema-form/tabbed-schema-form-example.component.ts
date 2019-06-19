// tslint:disable:max-line-length
// tslint:disable:object-literal-key-quotes
// tslint:disable:quotemark
import { Component, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {
    CheckValidationEventArgs,
    ConfirmationDialogOptions,
    SchemaFormComponent, SchemaObjectProperty, SchemaPrimitiveType,
    SchemaUtilities,
    TabbedFormLoaderComponent,
    ValidationAlerts, ValidationAlertSeverity
} from '@msft-sme/angular';
import { NavigationTitle } from '@msft-sme/angular';
import { Observable } from 'rxjs';

@Component({
    selector: 'sme-dev-guide-controls-tabbed-schema-form',
    templateUrl: './tabbed-schema-form-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Tabbed Schema Form Component'
})
export class TabbedSchemaFormExampleComponent {
    @ViewChild('tabbedFormGroup')
    private tabbedFormGroups: SchemaFormComponent;

    public formActionLog = '';

    public tabbedFormGroupSchema = {
        properties: [
            <SchemaObjectProperty>{
                type: SchemaPrimitiveType.Object,
                format: 'default',
                name: 'form1',
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
                        name: 'data1',
                        label: 'actual_string:Data1',
                        required: false,
                        options: {
                            multipleline: false
                        }
                    }
                ],
                emptyByDefault: false
            },
            <SchemaObjectProperty>{
                type: SchemaPrimitiveType.Object,
                format: 'default',
                name: 'form2',
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
                        name: 'data2',
                        label: 'actual_string:Data2',
                        required: false,
                        options: {
                            multipleline: false
                        }
                    }
                ],
                emptyByDefault: false
            },
            <SchemaObjectProperty>{
                type: SchemaPrimitiveType.Object,
                format: 'default',
                name: 'form3',
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
                        name: 'data3',
                        label: 'actual_string:Data3',
                        required: false,
                        options: {
                            multipleline: false
                        }
                    }
                ],
                emptyByDefault: false
            },
            <SchemaObjectProperty>{
                type: SchemaPrimitiveType.Object,
                format: 'default',
                name: 'form4',
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
                        name: 'data4',
                        label: 'actual_string:Data4',
                        required: false,
                        options: {
                            multipleline: false
                        }
                    }
                ],
                emptyByDefault: false
            },
            <SchemaObjectProperty>{
                type: SchemaPrimitiveType.Object,
                format: 'default',
                name: 'form5',
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
                        name: 'data5',
                        label: 'actual_string:Data5',
                        required: false,
                        options: {
                            multipleline: false
                        }
                    }
                ],
                emptyByDefault: false
            }
        ],
        format: 'tabbed-form',
        options: {
            groups: [
                {
                    displayName: 'actual_string:Group 1',
                    forms: [
                        {
                            name: 'form1',
                            displayName: 'actual_string:Form 1',
                            icon: 'sme-icon-permissions',
                            saveButtonText: 'resources:strings:MsftSmeShell.Angular.Common.save',
                            discardButtonText: 'resources:strings:MsftSmeShell.Angular.Common.discard',
                            closeButtonText: 'resources:strings:MsftSmeShell.Angular.Common.close'
                        },
                        {
                            name: 'form2',
                            displayName: 'actual_string:Form 2',
                            icon: 'sme-icon-permissions',
                            saveButtonText: 'resources:strings:MsftSmeShell.Angular.Common.save',
                            discardButtonText: 'resources:strings:MsftSmeShell.Angular.Common.discard',
                            closeButtonText: 'resources:strings:MsftSmeShell.Angular.Common.close'
                        },
                        {
                            name: 'form3',
                            displayName: 'actual_string:Form 3',
                            icon: 'sme-icon-permissions',
                            saveButtonText: 'resources:strings:MsftSmeShell.Angular.Common.save',
                            discardButtonText: 'resources:strings:MsftSmeShell.Angular.Common.discard',
                            closeButtonText: 'resources:strings:MsftSmeShell.Angular.Common.close'
                        }
                    ]
                },
                {
                    displayName: 'actual_string:Group 2',
                    forms: [
                        {
                            name: 'form4',
                            displayName: 'actual_string:Form 4',
                            icon: 'sme-icon-permissions',
                            saveButtonText: 'resources:strings:MsftSmeShell.Angular.Common.save',
                            discardButtonText: 'resources:strings:MsftSmeShell.Angular.Common.discard',
                            closeButtonText: 'resources:strings:MsftSmeShell.Angular.Common.close'
                        },
                        {
                            name: 'form5',
                            displayName: 'actual_string:Form 5',
                            icon: 'sme-icon-permissions',
                            saveButtonText: 'resources:strings:MsftSmeShell.Angular.Common.save',
                            discardButtonText: 'resources:strings:MsftSmeShell.Angular.Common.discard',
                            closeButtonText: 'resources:strings:MsftSmeShell.Angular.Common.close'
                        }
                    ]
                }
            ],
            supportRoute: true
        },
        label: 'actual_string:Sample Title'
    };

    public tabbedFormGroupData: any;

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
        this.tabbedFormGroupData = SchemaUtilities.setUpFormData(this.tabbedFormGroupData, this.tabbedFormGroupSchema);
    }

    public onFormActionExecuted(action: string, data: any): void {
        this.formActionLog += 'Action:' + action + '  data:' + JSON.stringify(data) + '\r\n';
    }
    public canDeactivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const tabbedFormLoaderComponent = <TabbedFormLoaderComponent>this.tabbedFormGroups.getFormContainerLoaderComponent();
        return tabbedFormLoaderComponent.canDeactivate(route, state, this.confirmContinueEditingDialogOptions());
    }

    public getDataJsonText(): string {
        return JSON.stringify(this.tabbedFormGroupData, null, 4);
    }

    private confirmContinueEditingDialogOptions(): ConfirmationDialogOptions {
        return {
            cancelButtonText: 'Discard changes',
            confirmButtonText: 'Continue editing',
            message: `Do you want to to continue editing or discard your changes?`,
            title: 'You have unsaved changes'
        };
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
