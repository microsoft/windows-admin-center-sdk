import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsFormService } from '../../../../../../angular';
import { CommonSettingsIsolatedExamplePanelBaseComponent } from './common-settings-isolated-example-panel-base.component';
import { IsolatedSetting3Model } from './model/isolated-setting3-model';
export declare class CommonSettingsIsolatedExamplePanel3Component extends CommonSettingsIsolatedExamplePanelBaseComponent<IsolatedSetting3Model> implements OnInit {
    constructor(router: Router, activatedRoute: ActivatedRoute, formbuilder: FormBuilder, settingsFormService: SettingsFormService);
    ngOnInit(): void;
}
