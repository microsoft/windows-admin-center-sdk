import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppContextService, WizardComponent, WizardStep } from '../../../../../angular';
import { CharacterCreatorParams } from './models/character-creator-params';
import { Job } from './models/job';
export declare class WizardExampleComponent implements OnDestroy, OnInit {
    wizard: WizardComponent;
    model: CharacterCreatorParams;
    steps: WizardStep[];
    nameStep: WizardStep;
    jobStep: WizardStep;
    jobSubject: BehaviorSubject<Job>;
    private summaryStep;
    private subscriptions;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    ngOnDestroy(): void;
    ngOnInit(): void;
    private configureStandardJobSteps();
    private configureWizardJobSteps();
    private initializeModel();
    private initializeSteps();
    private onJobChange(job);
}
