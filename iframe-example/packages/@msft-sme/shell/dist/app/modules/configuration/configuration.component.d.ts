import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService, CommonSettingsComponentBase, CommonSettingsNavigationItem, ConfirmationDialogOptions } from '../../../angular';
import { Strings } from '../../../generated/Strings';
export declare class ConfigurationComponent extends CommonSettingsComponentBase implements OnInit {
    private appContextService;
    strings: Strings;
    settingItems: CommonSettingsNavigationItem[];
    private hasAccess;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor(appContextService: AppContextService);
    confirmContinueEditingDialogOptions(dirtyForm: FormGroup, allForms: FormGroup[]): ConfirmationDialogOptions;
    ngOnInit(): void;
}
