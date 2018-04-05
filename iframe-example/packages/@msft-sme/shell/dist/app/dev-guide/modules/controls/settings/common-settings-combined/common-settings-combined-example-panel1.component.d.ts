import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonSettingsCombinedExamplePanelBaseComponent } from './common-settings-combined-example-panel-base.component';
import { CombinedSetting1Model } from './model/combined-setting1-model';
export declare class CommonSettingsCombinedExamplePanel1Component extends CommonSettingsCombinedExamplePanelBaseComponent<CombinedSetting1Model> implements OnInit {
    constructor(router: Router, activatedRoute: ActivatedRoute, formbuilder: FormBuilder);
    ngOnInit(): void;
}
