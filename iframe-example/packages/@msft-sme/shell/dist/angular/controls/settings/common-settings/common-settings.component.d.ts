import { OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationExtras, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CommonSettingsNavigationItem } from './common-settings-navigation-item';
import { CanComponentDeactivate } from '../settings-can-deactivate-guard.service';
import { SettingsFormService } from '../settings-form.service';
import { SettingsComponent } from '../settings.component';
export declare class CommonSettingsComponent implements OnInit, OnChanges, OnDestroy {
    private router;
    private activatedRoute;
    private settingsForms;
    settingsTitle: string;
    settings: CommonSettingsNavigationItem[];
    backRoute: {
        commands: any[];
        extras?: NavigationExtras;
    };
    settingsComponent: SettingsComponent;
    combinedForm: FormGroup;
    private addFormSubscription;
    private removeFormSubscription;
    private navigationSubscription;
    selectedSettingTitle: string;
    private latestForm;
    private latestPristineFormValue;
    private latestFormUpdateValueInComponent;
    constructor(router: Router, activatedRoute: ActivatedRoute, settingsForms: SettingsFormService);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    recalculateActivePanel(): void;
    discardAllChildForms(): void;
    acceptAllChildFormsValue(): void;
    getSmeIconClass(setting: CommonSettingsNavigationItem): {};
    canDeactivate(component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
    private resetSubscriptions();
    detectActiveSettingItem(): CommonSettingsNavigationItem;
    getActiveSettingItem(): CommonSettingsNavigationItem;
    /**
     * Returns the value of the current control and all its children recursivelly,
     * including disabled controls.
     *
     * Workaround for missing functionality added in later versions of angular
     * Currently getRawValue only returns the value of hte current control disabled
     * children but only enabled controls of other descendants:
     * https://github.com/angular/angular/commit/1ece7366c8b67f387fbe13f8d128c19f4c50dd19
     *
     * Once we upgrade angular version we can remove this code.
     *
     * @param formControl The form control to get the value from
     */
    private getRawValueRecursive(formControl);
}
