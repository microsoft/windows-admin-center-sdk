import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { CommonSettingsCombinedExamplePanelBaseComponent } from './common-settings-combined-example-panel-base.component';

import { CombinedSetting2Model } from './model/combined-setting2-model';

@Component({
    selector: 'sme-ng2-controls-common-settings-combined-example-panel2',
    template: `
      <div [smeSettingsForm]="sampleForm" [formGroup]="sampleForm">
        <div class="form-group">
          <div class="form-input">
            <label for="name2">
              {{nameLabel}}
            </label>
            <input id="name2" type="text" class="form-control" formControlName="name2" required autofocus/>
            <div *ngIf="formErrors.name2" class="alert alert-danger">
              {{ formErrors.name2 }}
            </div>
          </div>
        </div>
      </div>
    `
})
export class CommonSettingsCombinedExamplePanel2Component
    extends CommonSettingsCombinedExamplePanelBaseComponent<CombinedSetting2Model>
    implements OnInit {
    constructor(router: Router, activatedRoute: ActivatedRoute, formbuilder: FormBuilder) {
        super(
            router,
            activatedRoute,
            formbuilder);

        this.init(
            {
                name2: ''
            },
            {
                name2: {
                    required: 'this is a mandatory field'
                }
            },
            {
                name2: 'setting 2 name value'
            },
            'setting 2');
    }

    public ngOnInit() {
        this.sampleForm = this.formbuilder.group({
            name2: [this.modelData.name2, Validators.required]
        });

        super.ngOnInit();
    }
}
