import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonSettingsCombinedExamplePanelBaseComponent } from './common-settings-combined-example-panel-base.component';
import { CombinedSetting3Model } from './model/combined-setting3-model';
export declare class CommonSettingsCombinedExamplePanel3Component extends CommonSettingsCombinedExamplePanelBaseComponent<CombinedSetting3Model> implements OnInit {
    constructor(router: Router, activatedRoute: ActivatedRoute, formbuilder: FormBuilder);
    ngOnInit(): void;
}
