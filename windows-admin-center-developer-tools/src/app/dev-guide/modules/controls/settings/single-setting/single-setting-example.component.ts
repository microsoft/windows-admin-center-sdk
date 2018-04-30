// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, RouterStateSnapshot } from '@angular/router';

import {
    CommonSettingsNavigationItem,
    ConfirmationDialogOptions,
    SingleSettingComponentBase
} from '@msft-sme/shell/angular';

import { SingleSettingModel } from './single-setting-model';

@Component({
    selector: 'sme-ng2-controls-single-setting-example',
    templateUrl: './single-setting-example.component.html'
})
export class SingleSettingComponent extends SingleSettingComponentBase implements OnInit {
    public saveButtonLabel = 'Save';
    public discardButtonLabel = 'Discard';
    public nameLabel = 'Name:';

    public sampleForm: FormGroup;

    public backRoute: { commands: any[], extras?: NavigationExtras };
    public formErrors: any;
    public validationMessages: any;

    public saving = false;

    private modelData: SingleSettingModel;

    constructor(private formBuilder: FormBuilder) {
        super();
        this.backRoute = { commands: ['../'] };
        this.modelData = {
            name: 'SingleSetting default name value'
        };

        this.formErrors = {
            name: ''
        };

        this.validationMessages = {
            name: {
                required: 'this is a mandatory field'
            }
        };
    }

    public ngOnInit() {
        this.sampleForm = this.formBuilder.group({
            name: [this.modelData.name, Validators.required]
        });

        this.sampleForm.valueChanges.subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    public onSaveClick() {
        this.saving = true;
        // remote action started
        setTimeout(
            () => {
                // remote action finished
                alert('submit: \r\nOriginal: ' + JSON.stringify(this.modelData) + '\r\nUpdated: ' + JSON.stringify(this.sampleForm.value));
                this.modelData = this.sampleForm.value;
                this.sampleForm.reset(this.modelData);
                this.sampleForm.markAsUntouched();
                this.saving = false;
            },
            300);
    }

    public onDiscardClick() {
        // revert data
        this.sampleForm.reset(this.modelData);
        this.sampleForm.markAsPristine();
    }

    public confirmContinueEditingDialogOptions(
        dirtyForm: FormGroup,
        allForms: FormGroup[]): ConfirmationDialogOptions {
        return {
            cancelButtonText: 'Discard changes',
            confirmButtonText: 'Continue editing',
            message:
            `Do you want to to continue editing or discard your changes?: \r\n unsaved changes: ${JSON.stringify(dirtyForm.value)}`,
            title: 'You have unsaved changes'
        };
    }

    private onValueChanged(data?: any) {
        if (!this.sampleForm) {
            return;
        }

        const form = this.sampleForm;

        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);

                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }
}
