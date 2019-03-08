import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsFormService } from '@msft-sme/angular';
import { CommonSettingsIsolatedExamplePanelBaseComponent } from './common-settings-isolated-example-panel-base.component';
import { IsolatedSetting2Model } from './model/isolated-setting2-model';

@Component({
    selector: 'sme-ng2-controls-common-settings-isolated-example-panel2',
    templateUrl: './common-settings-isolated-example-panel2.component.html'
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
