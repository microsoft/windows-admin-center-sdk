// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { 
    WizardStepComponent,
    WizardStepValidation 
} from '@microsoft/windows-admin-center-sdk/angular';
import { CharacterCreatorParams } from '../../models/character-creator-params';

@Component({
    selector: 'sme-ng2-character-creator-name-form',
    styleUrls: [
        '../wizard-examples.component.css'
    ],
    templateUrl: './character-creator-name-form.component.html'
})
export class CharacterCreatorNameFormComponent extends WizardStepComponent<CharacterCreatorParams> implements OnDestroy, OnInit {
    public form: FormGroup;

    public nameLabel: string;

    private subscriptions: Subscription[];

    constructor(private formBuilder: FormBuilder) {
        super();
    }

    public ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription) => {
                if (subscription) {
                    subscription.unsubscribe();
                }
            });
        }
    }

    public ngOnInit(): void {
        this.nameLabel = 'Name';

        this.subscriptions = [];
        this.runValidation = () => {
            return this.validate();
        };
        this.form = this.formBuilder.group({
            name: [
                this.model.name,
                [
                    Validators.required
                ]
            ]
        });

        this.subscriptions.push(
            this.form.valueChanges.subscribe(() => {
                this.valid = this.form.valid;
            })
        );
    }

    private validate(): Observable<WizardStepValidation> {
        let subject = new Subject<WizardStepValidation>();
        setTimeout(
            () => {
                if (this.model.name === 'Jeff') {
                    subject.next({
                        errorMessage: 'Jeff is not a good name',
                        isValid: false
                    });
                } else {
                    subject.next({
                        isValid: true
                    });
                }
            },
            4000
        );

        return subject;
    }
}
