import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { CommonSettingsCombinedExamplePanelBaseComponent } from './common-settings-combined-example-panel-base.component';

import { CombinedSetting1Model } from './model/combined-setting1-model';

@Component({
    selector: 'sme-ng2-controls-common-settings-combined-example-panel1',
    template: `
      <div [smeSettingsForm]="sampleForm" [formGroup]="sampleForm">
        <div class="form-group">
          <div class="form-input">
            <label for="name">
              {{nameLabel}}
            </label>
            <input id="name" type="text" class="form-control" formControlName="name" required autofocus/>
            <div *ngIf="formErrors.name" class="alert alert-danger">
              {{ formErrors.name }}
            </div>
          </div>
        </div>
      </div>
    `
})
export class CommonSettingsCombinedExamplePanel1Component
    extends CommonSettingsCombinedExamplePanelBaseComponent<CombinedSetting1Model>
    implements OnInit {
    constructor(router: Router, activatedRoute: ActivatedRoute, formbuilder: FormBuilder) {
        super(
            router,
            activatedRoute,
            formbuilder);

        this.init(
            {
                name: ''
            },
            {
                name: {
                    required: 'this is a mandatory field'
                }
            },
            {
                name: 'setting 1 name value'
            },
            'setting 1');
    }

    public ngOnInit() {
        this.sampleForm = this.formbuilder.group({
            name: [this.modelData.name, Validators.required]
        });

        super.ngOnInit();
    }
}
