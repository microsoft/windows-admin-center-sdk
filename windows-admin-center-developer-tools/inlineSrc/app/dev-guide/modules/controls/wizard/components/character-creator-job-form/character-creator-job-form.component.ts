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
    styles: [`
      h1, h2, h3, h4, h5, h6 {
          margin: 0;
          padding: 0;
      }
    `],
    template: `
      <h4>Choose a Job</h4>
      <form [formGroup]="form">
        <div class="form-controls">
          <div class="form-group">
            <div class="form-input">
              <label for="job">{{ jobLabel }}</label>
              <div class="combobox">
                <select class="form-control" id="job" formControlName="job" [(ngModel)]="selectedJob">
                  <option *ngFor="let job of jobs" [ngValue]="job">{{ jobMap[job].name }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div *ngIf="jobMap[selectedJob].description">
        <h6>Job Description</h6>
        <p>{{ jobMap[selectedJob].description }}</p>
      </div>
    `
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
