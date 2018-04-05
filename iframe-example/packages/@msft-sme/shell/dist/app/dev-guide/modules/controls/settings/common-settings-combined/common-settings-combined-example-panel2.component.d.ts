import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonSettingsCombinedExamplePanelBaseComponent } from './common-settings-combined-example-panel-base.component';
import { CombinedSetting2Model } from './model/combined-setting2-model';
export declare class CommonSettingsCombinedExamplePanel2Component extends CommonSettingsCombinedExamplePanelBaseComponent<CombinedSetting2Model> implements OnInit {
    constructor(router: Router, activatedRoute: ActivatedRoute, formbuilder: FormBuilder);
    ngOnInit(): void;
}
