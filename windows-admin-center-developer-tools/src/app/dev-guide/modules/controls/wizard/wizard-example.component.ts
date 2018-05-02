// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { AppContextService, WizardComponent, WizardModel, WizardStep } from '@microsoft/windows-admin-center-sdk/angular';
import { CharacterCreatorJobFormComponent } from './components/character-creator-job-form/character-creator-job-form.component';
import { CharacterCreatorNameFormComponent } from './components/character-creator-name-form/character-creator-name-form.component';
import { CharacterCreatorSpellFormComponent } from './components/character-creator-spell-form/character-creator-spell-form.component';
import { CharacterCreatorSummaryComponent } from './components/character-creator-summary/character-creator-summary.component';
import { CharacterCreatorParams } from './models/character-creator-params';
import { Job } from './models/job';
import { Spell } from './models/spell';

@Component({
    selector: 'sme-ng2-controls-wizard-example',
    templateUrl: './wizard-example.component.html',
    styleUrls: [
        './wizard-example.component.css'
    ]
})
export class WizardExampleComponent implements OnDestroy, OnInit {
    @ViewChild(WizardComponent)
    public wizard: WizardComponent;

    public model: CharacterCreatorParams;

    public steps: WizardStep[];

    public nameStep: WizardStep;

    public jobStep: WizardStep;

    public jobSubject: BehaviorSubject<Job>;

    private summaryStep: WizardStep;

    private subscriptions: Subscription[];

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-wizard';
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
        this.subscriptions = [];
        this.initializeSteps();

        this.jobSubject = new BehaviorSubject<Job>(Job.Paladin);

        this.initializeModel();
    }

    private configureStandardJobSteps(): void {
        this.summaryStep.dependencies = [
            this.nameStep,
            this.jobStep
        ];

        this.steps = [
            this.nameStep,
            this.jobStep,
            this.summaryStep
        ];
    }

    private configureWizardJobSteps(): void {
        if (!(this.steps.length === 4 && this.steps[2].renderer === CharacterCreatorSpellFormComponent)) {
            let spellStep = new WizardStep(
                CharacterCreatorSpellFormComponent,
                {
                    name: 'Choose a Spell',
                    dependencies: [
                        this.jobStep
                    ]
                }
            );

            this.summaryStep.dependencies = [
                this.nameStep,
                this.jobStep,
                spellStep
            ];

            this.steps = [
                this.nameStep,
                this.jobStep,
                spellStep,
                this.summaryStep
            ];
        }
    }

    private initializeModel(): void {
        this.model = {
            name: '',
            job: this.jobSubject,
            spell: Spell.Fire
        };

        this.subscriptions.push(
            this.model.job.subscribe((job: Job) => {
                this.onJobChange(job);
            })
        );
    }

    private initializeSteps(): void {
        this.nameStep = new WizardStep(
            CharacterCreatorNameFormComponent,
            {
                name: 'Character Name'
            }
        );

        this.jobStep = new WizardStep(
            CharacterCreatorJobFormComponent,
            {
                name: 'Choose a Job',
                dependencies: [
                    this.nameStep
                ]
            }
        );

        this.summaryStep = new WizardStep(
            CharacterCreatorSummaryComponent,
            {
                name: 'Summary',
                dependencies: [
                    this.nameStep,
                    this.jobStep
                ]
            }
        );

        this.steps = [
            this.nameStep,
            this.jobStep,
            this.summaryStep
        ];
    }

    private onJobChange(job: Job): void {
        switch (job) {
            case Job.Wizard:
                this.configureWizardJobSteps();
                break;
            default:
                this.configureStandardJobSteps();
                break;
        }
    }
}
