import { QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ConfirmationDialogOptions } from '../../dialog';
import { CommonSettingsIsolatedSettingsComponent } from '../common-settings/common-settings-isolated-settings.component';
import { CanComponentDeactivate } from '../settings-can-deactivate-guard.service';
export declare abstract class CommonSettingsIsolatedSettingsBaseComponent implements CanComponentDeactivate {
    isolatedSettingsComponent: QueryList<CommonSettingsIsolatedSettingsComponent>;
    canDeactivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
    abstract confirmContinueEditingDialogOptions(dirtyForm: FormGroup, allForms: FormGroup[]): ConfirmationDialogOptions;
}
