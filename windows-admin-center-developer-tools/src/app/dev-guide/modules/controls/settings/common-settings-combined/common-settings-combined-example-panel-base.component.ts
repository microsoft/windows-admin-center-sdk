// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

export class CommonSettingsCombinedExamplePanelBaseComponent<TModelData> implements OnInit, OnDestroy {
    public subscription: Subscription;
    public saveButtonLabel = 'Save';
    public discardButtonLabel = 'Discard';
    public nameLabel = 'Name:';

    public sampleForm: FormGroup;

    public formErrors: any;
    public validationMessages: any;
    protected modelData: TModelData;
    public settingName: string;

    constructor(protected router: Router,
                protected activatedRoute: ActivatedRoute,
                protected formbuilder: FormBuilder) {
    }

    public init(formErrors: any,
                validationMessages: any,
                modelData: TModelData,
                settingName: string) {
            this.formErrors = formErrors;
            this.validationMessages = validationMessages;
            this.modelData = modelData;
            this.settingName = settingName;
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
