import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService, SettingsFormService } from '../../../../angular';
import { PanelBaseComponent } from './panel-base.component';
import { ConnectionModel } from './model/connection-model';
export declare class ConnectionComponent extends PanelBaseComponent<ConnectionModel> implements OnInit {
    constructor(appContextService: AppContextService, router: Router, activatedRoute: ActivatedRoute, formbuilder: FormBuilder, settingsFormService: SettingsFormService);
    ngOnInit(): void;
}
