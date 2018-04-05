import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { 
    WizardStepComponent,
    WizardStepValidation 
} from '@msft-sme/shell/angular';
import { CharacterCreatorParams } from '../../models/character-creator-params';

@Component({
    selector: 'sme-ng2-character-creator-name-form',
    styles: [`
      h1, h2, h3, h4, h5, h6 {
          margin: 0;
          padding: 0;
      }
    `],
    template: `
      <h4>Character Name</h4>
      <form [formGroup]="form">
        <div class="form-controls">
          <div class="form-group">
            <div class="form-input">
              <label for="name">{{ nameLabel }}</label>
              <div class="required-clue">* Required</div>
              <input type="text" class="form-control" id="name" formControlName="name" [(ngModel)]="model.name">
            </div>
          </div>
        </div>
      </form>
    `
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
