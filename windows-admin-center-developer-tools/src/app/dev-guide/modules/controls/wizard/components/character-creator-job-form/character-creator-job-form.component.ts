import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WizardStepComponent } from '@msft-sme/shell/angular';
import { CharacterCreatorParams } from '../../models/character-creator-params';
import { Job } from '../../models/job';

export interface JobDisplayObject {
    name: string;
    description: string;
}

@Component({
    selector: 'sme-ng2-character-creator-name-form',
    styleUrls: [
        '../wizard-examples.component.css'
    ],
    templateUrl: './character-creator-job-form.component.html'
})
export class CharacterCreatorJobFormComponent extends WizardStepComponent<CharacterCreatorParams> implements OnInit {
    public get selectedJob(): Job {
        return this.model.job.getValue();
    }

    public set selectedJob(value: Job) {
        this.model.job.next(value);
    }

    public form: FormGroup;

    public jobMap: { [index: number]: JobDisplayObject };

    public jobs: Job[];

    public jobLabel: string;

    constructor(private formBuilder: FormBuilder) {
        super();
    }

    public ngOnInit(): void {
        this.jobLabel = 'Choose a job';
        this.jobs = [
            Job.Paladin,
            Job.Warrior,
            Job.Rogue,
            Job.Ranger,
            Job.Wizard
        ];

        this.jobMap = {};
        this.jobMap[Job.Paladin] = {
            name: 'Paladin',
            description: 'Paladins are noble knights who have sworn to protect all those who ask it.'
        };

        this.jobMap[Job.Warrior] = {
            name: 'Warrior',
            description: 'Warriors are brutish fighters with little regard for their enemy\'s well being, or that of anyone around them.'
        };

        this.jobMap[Job.Rogue] = {
            name: 'Rogue',
            description: 'Rogues are sneaky folk who rely on not being unnoticed and striking when and where it\'s least expected.'
        };

        this.jobMap[Job.Ranger] = {
            name: 'Ranger',
            // tslint:disable-next-line:max-line-length
            description: 'Rangers employ the art of bows and arrows as well as various forms of marksmanship to eliminate enemies from a distance.'
        };

        this.jobMap[Job.Wizard] = {
            name: 'Wizard',
            // tslint:disable-next-line:max-line-length
            description: 'Wizards rely on their spells to swiftly dispatch enemies. Wizards are also very fragile and not fit for close-quarters combat.'
        };

        this.form = this.formBuilder.group({
            job: this.selectedJob
        });
    }
}
