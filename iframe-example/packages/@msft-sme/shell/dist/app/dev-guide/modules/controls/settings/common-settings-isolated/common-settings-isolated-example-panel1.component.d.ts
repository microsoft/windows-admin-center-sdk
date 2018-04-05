import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsFormService } from '../../../../../../angular';
import { CommonSettingsIsolatedExamplePanelBaseComponent } from './common-settings-isolated-example-panel-base.component';
import { IsolatedSetting1Model } from './model/isolated-setting1-model';
export declare class CommonSettingsIsolatedExamplePanel1Component extends CommonSettingsIsolatedExamplePanelBaseComponent<IsolatedSetting1Model> implements OnInit {
    constructor(router: Router, activatedRoute: ActivatedRoute, formbuilder: FormBuilder, settingsFormService: SettingsFormService);
    ngOnInit(): void;
}
