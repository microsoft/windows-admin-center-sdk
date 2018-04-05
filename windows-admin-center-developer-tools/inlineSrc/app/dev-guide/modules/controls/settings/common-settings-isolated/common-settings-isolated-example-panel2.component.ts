import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { SettingsFormService } from '@msft-sme/shell/angular';

import { CommonSettingsIsolatedExamplePanelBaseComponent } from './common-settings-isolated-example-panel-base.component';

import { IsolatedSetting2Model } from './model/isolated-setting2-model';

@Component({
    selector: 'sme-ng2-controls-common-settings-isolated-example-panel2',
    template: `
      <form [smeSettingsForm]="sampleForm" aria-labelledby="sme-shell-setting-selectedTitle">
        <sme-settings-content>
          <fieldset [disabled]="saving" [formGroup]="sampleForm">
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
          </fieldset>
        </sme-settings-content>
        <sme-settings-footer class="footer">
          <button type="submit" class="btn btn-primary" (click)="onSaveClick()" [disabled]="!sampleForm.dirty || !sampleForm.valid || saving">{{ saveButtonLabel }}</button>
          <button type="button" class="btn btn-secondary" (click)="onDiscardClick()" [disabled]="!sampleForm.dirty || saving">{{ discardButtonLabel }}</button>
          <button type="button" class="btn btn-secondary" (click)="onCloseClick()">{{ closeButtonLabel }}</button>
        </sme-settings-footer>
      </form>
    `
})
export class CommonSettingsIsolatedExamplePanel2Component
       extends CommonSettingsIsolatedExamplePanelBaseComponent<IsolatedSetting2Model>
       implements OnInit {
    constructor(router: Router, activatedRoute: ActivatedRoute, formbuilder: FormBuilder, settingsFormService: SettingsFormService) {
        super(
            router,
            activatedRoute,
            formbuilder,
            settingsFormService,
            {
                name2: ''
            },
            {
                name2: {
                    required: 'this is a mandatory field'
                }
            },
            {
                name2: 'Setting2 name value'
            },
            'setting two');
    }

    public ngOnInit() {
        this.sampleForm = this.formbuilder.group({
            name2: [this.modelData.name2, Validators.required]
        });

        super.ngOnInit();
    }
}
