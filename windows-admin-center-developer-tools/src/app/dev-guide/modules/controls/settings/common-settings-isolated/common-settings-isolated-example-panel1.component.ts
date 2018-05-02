// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { SettingsFormService } from '@microsoft/windows-admin-center-sdk/angular';

import { CommonSettingsIsolatedExamplePanelBaseComponent } from './common-settings-isolated-example-panel-base.component';

import { IsolatedSetting1Model } from './model/isolated-setting1-model';

@Component({
    selector: 'sme-ng2-controls-common-settings-isolated-example-panel1',
    templateUrl: './common-settings-isolated-example-panel1.component.html'
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
