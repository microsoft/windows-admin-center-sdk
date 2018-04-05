import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { SettingsFormService } from '@msft-sme/shell/angular';

import { CommonSettingsIsolatedExamplePanelBaseComponent } from './common-settings-isolated-example-panel-base.component';

import { IsolatedSetting3Model } from './model/isolated-setting3-model';

@Component({
    selector: 'sme-ng3-controls-common-settings-isolated-example-panel3',
    template: `
      <form [smeSettingsForm]="sampleForm" aria-labelledby="sme-shell-setting-selectedTitle">
        <sme-settings-content>
          <fieldset [disabled]="saving" [formGroup]="sampleForm">
            <div class="form-group">
              <div class="form-input">
                <label for="name2">
                    {{nameLabel}}
                  </label>
                <input id="name3" type="text" class="form-control" formControlName="name3" required autofocus/>
                <div *ngIf="formErrors.name3" class="alert alert-danger">
                  {{ formErrors.name3 }}
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
export class CommonSettingsIsolatedExamplePanel3Component
       extends CommonSettingsIsolatedExamplePanelBaseComponent<IsolatedSetting3Model>
       implements OnInit {
    constructor(router: Router, activatedRoute: ActivatedRoute, formbuilder: FormBuilder, settingsFormService: SettingsFormService) {
        super(
            router,
            activatedRoute,
            formbuilder,
            settingsFormService,
            {
                name3: ''
            },
            {
                name3: {
                    required: 'this is a mandatory field'
                }
            },
            {
                name3: 'setting 3 model value'
            },
            'settings three');
    }

    public ngOnInit() {
        this.sampleForm = this.formbuilder.group({
            name3: [this.modelData.name3, Validators.required]
        });

        super.ngOnInit();
    }
}
