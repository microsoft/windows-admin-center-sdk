// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { SettingsFormService } from '@microsoft/windows-admin-center-sdk/angular';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

export class CommonSettingsIsolatedExamplePanelBaseComponent<TModelData> implements OnInit, OnDestroy {
    public subscription: Subscription;
    public saveButtonLabel = 'Save';
    public discardButtonLabel = 'Discard';
    public closeButtonLabel = 'Close';
    public nameLabel = 'Name:';

    public saving = false;

    public sampleForm: FormGroup;

    constructor(protected router: Router,
                protected activatedRoute: ActivatedRoute,
                protected formbuilder: FormBuilder,
                protected settingsFormService: SettingsFormService,
                public formErrors: any,
                public validationMessages: any,
                protected modelData: TModelData,
                public settingName: string) {
    }

    public ngOnInit() {
        this.sampleForm.valueChanges.subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    public ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public onSaveClick() {
        this.saving = true;
        // remote action started
        setTimeout(
            () => {
                // remote action finished
                this.saving = false;
                alert('submit: \r\nOriginal: ' + JSON.stringify(this.modelData) + '\r\nUpdated: ' + JSON.stringify(this.sampleForm.value));
                this.modelData = this.sampleForm.value;
                this.sampleForm.reset(this.modelData);
                this.sampleForm.markAsUntouched();
            },
            1000);
    }

    public onDiscardClick() {
        // revert data
        this.sampleForm.reset(this.modelData);
        this.sampleForm.markAsPristine();
    }

    public onCloseClick() {
        this.router.navigateByUrl(this.settingsFormService.getBackRoute('/controls/settings'));
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
