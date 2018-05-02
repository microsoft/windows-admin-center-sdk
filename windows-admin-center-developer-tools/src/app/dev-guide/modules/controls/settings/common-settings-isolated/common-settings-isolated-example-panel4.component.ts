// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {
    BasePropertiesForm,
    FormArrayValidationMessages,
    FormControlContainerValidationMessages,
    FormGroupValidationMessages,
    SettingsFormService
} from '@microsoft/windows-admin-center-sdk/angular';
import { Address, IsolatedSetting4FormData, IsolatedSettings4ServiceData } from './model/isolated-setting4-model';

@Component({
    selector: 'sme-ng2-controls-common-settings-isolated-example-panel4',
    templateUrl: './common-settings-isolated-example-panel4.component.html',
    styleUrls: [ './common-settings-isolated-example-panel4.component.css' ]
})
export class CommonSettingsIsolatedExamplePanel4Component
    extends BasePropertiesForm<IsolatedSettings4ServiceData, IsolatedSetting4FormData> {
    /**
     * Note: It's important that the names of controls are identical with the control names that you place in the form.
     * If these don't line up properly, the form won't be able to access the correct errors.
     */
    private formErrorsField = {
        addresses: [],
        name: '',
        salary: ''
    };

    /**
     * Note: It's important that the names of controls are identical with the control names that you place in the form.
     * If these don't line up properly, the form won't be able to access the correct errors.
     */
    private validationMessagesField: FormGroupValidationMessages = {
        controls: {
            addresses: {
                controls: {
                    city: {
                        required: 'Required'
                    },
                    street: {
                        required: 'Required'
                    },
                    state: {
                        required: 'Required'
                    },
                    zipCode: {
                        required: 'Required'
                    }
                }
            },
            name: {
                required: 'A name is required'
            },
            salary: {
                required: 'A salary is required'
            }
        }
    };

    constructor(public formBuilder: FormBuilder, private settingsFormService: SettingsFormService, private router: Router) {
        super('common-settings-isolate-example-panel4.component.ts');

        this.init(); // This line is important! If you don't do this, the form won't be pre-populated!
    }

    public get formErrors(): any {
        return this.formErrorsField;
    }

    public get validationMessages(): FormGroupValidationMessages {
        return this.validationMessagesField;
    }

    public fetchData(): Observable<IsolatedSettings4ServiceData> {
        let subject = new Subject<IsolatedSettings4ServiceData>();
        setTimeout(
            () => {
                subject.next({
                    addresses: [
                        {
                            city: 'Redmond',
                            state: 'Washington',
                            street: '1 Micrsoft Way',
                            zipCode: 98052
                        },
                        {
                            city: 'New York',
                            state: 'New York',
                            street: '1 Micrsoft Way',
                            zipCode: 12345
                        },
                        {
                            city: 'Bellevue',
                            state: 'Washington',
                            street: '1 Micrsoft Way',
                            zipCode: 14567
                        }
                    ],
                    name: 'Bill Gates',
                    salary: 1000000000000
                });

                subject.complete();
            },
            5000);

        return subject;
    }

    public createForm(): FormGroup {
        let addressesGroups = this.formData.addresses.map((address) => {
            this.formErrors.addresses.push({
                city: '',
                state: '',
                street: '',
                zipCode: ''
            });

            let group = this.formBuilder.group({
                city: [
                    address.city,
                    [
                        Validators.required
                    ]
                ],
                state: [
                    address.state,
                    [
                        Validators.required
                    ]
                ],
                street: [
                    address.street,
                    [
                        Validators.required
                    ]
                ],
                zipCode: [
                    address.zipCode,
                    [
                        Validators.required
                    ]
                ]
            });

            return group;
        });

        let form = this.formBuilder.group(
            {
                addresses: this.formBuilder.array(addressesGroups),
                name: [
                    this.formData.name,
                    [
                        Validators.required
                    ]
                ],
                salary: [
                    this.formData.salary,
                    [
                        Validators.required
                    ]
                ]
            }
        );

        return form;
    }

    public createFormDataFromDataModel(): IsolatedSetting4FormData {
        return new IsolatedSetting4FormData(this.dataModel);
    }

    public onFetchError(error: any): void {
        // Raise an alert or create logs
    }

    public onSaveError(error: any): void {
        // Raise an alert or create logs
    }

    public onSaveSuccess(): void {
        // Raise an alert or create logs
    }

    public onCloseClick(): void {
        this.router.navigateByUrl(this.settingsFormService.getBackRoute());
    }

    public saveForm(newDataModel: IsolatedSettings4ServiceData): Observable<IsolatedSettings4ServiceData> {
        return Observable.of<IsolatedSettings4ServiceData>(newDataModel);
    }
}
