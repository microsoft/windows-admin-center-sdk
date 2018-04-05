import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WizardStepComponent } from '@msft-sme/shell/angular';
import { CharacterCreatorParams } from '../../models/character-creator-params';
import { Job } from '../../models/job';
export interface JobDisplayObject {
    name: string;
    description: string;
}
export declare class CharacterCreatorJobFormComponent extends WizardStepComponent<CharacterCreatorParams> implements OnInit {
    private formBuilder;
    selectedJob: Job;
    form: FormGroup;
    jobMap: {
        [index: number]: JobDisplayObject;
    };
    jobs: Job[];
    jobLabel: string;
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
}
