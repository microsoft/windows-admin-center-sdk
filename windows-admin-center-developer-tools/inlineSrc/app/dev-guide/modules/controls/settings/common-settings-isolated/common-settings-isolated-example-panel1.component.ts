import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { SettingsFormService } from '@msft-sme/shell/angular';

import { CommonSettingsIsolatedExamplePanelBaseComponent } from './common-settings-isolated-example-panel-base.component';

import { IsolatedSetting1Model } from './model/isolated-setting1-model';

@Component({
    selector: 'sme-ng2-controls-common-settings-isolated-example-panel1',
    template: `
      <form [smeSettingsForm]="sampleForm" aria-labelledby="sme-shell-setting-selectedTitle">
        <sme-settings-content>
          <fieldset [disabled]="saving" [formGroup]="sampleForm">
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
export class CommonSettingsIsolatedExamplePanel1Component
    extends CommonSettingsIsolatedExamplePanelBaseComponent<IsolatedSetting1Model>
    implements OnInit {
    constructor(router: Router, activatedRoute: ActivatedRoute, formbuilder: FormBuilder, settingsFormService: SettingsFormService) {
        super(
            router,
            activatedRoute,
            formbuilder,
            settingsFormService,
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
