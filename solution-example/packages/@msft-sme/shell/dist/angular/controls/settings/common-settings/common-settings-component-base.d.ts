import { QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ConfirmationDialogOptions } from '../../dialog';
import { CommonSettingsComponent } from '../common-settings/common-settings.component';
import { SingleSettingComponent } from '../common-settings/single-setting.component';
import { CanComponentDeactivate } from '../settings-can-deactivate-guard.service';
export declare abstract class CommonSettingsComponentBase implements CanComponentDeactivate {
    commonSettingsComponent: QueryList<CommonSettingsComponent>;
    canDeactivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
    abstract confirmContinueEditingDialogOptions(dirtyForm: FormGroup, allForms: FormGroup[]): ConfirmationDialogOptions;
    readonly combinedForm: FormGroup;
}
export declare abstract class SingleSettingComponentBase implements CanComponentDeactivate {
    singleSettingComponent: QueryList<SingleSettingComponent>;
    canDeactivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
    abstract confirmContinueEditingDialogOptions(dirtyForm: FormGroup, allForms: FormGroup[]): ConfirmationDialogOptions;
}
