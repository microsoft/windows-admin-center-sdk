import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsFormService } from '@msft-sme/angular';
import { CommonSettingsIsolatedExamplePanelBaseComponent } from './common-settings-isolated-example-panel-base.component';
import { IsolatedSetting3Model } from './model/isolated-setting3-model';

@Component({
    selector: 'sme-ng3-controls-common-settings-isolated-example-panel3',
    templateUrl: './common-settings-isolated-example-panel3.component.html'
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
