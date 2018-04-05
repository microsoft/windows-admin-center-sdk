import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsFormService } from '@msft-sme/shell/angular';
import { CommonSettingsIsolatedExamplePanelBaseComponent } from './common-settings-isolated-example-panel-base.component';
import { IsolatedSetting2Model } from './model/isolated-setting2-model';
export declare class CommonSettingsIsolatedExamplePanel2Component extends CommonSettingsIsolatedExamplePanelBaseComponent<IsolatedSetting2Model> implements OnInit {
    constructor(router: Router, activatedRoute: ActivatedRoute, formbuilder: FormBuilder, settingsFormService: SettingsFormService);
    ngOnInit(): void;
}
