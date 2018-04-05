import { FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ConfirmationDialogOptions } from '../dialog';
export interface CanComponentDeactivate {
    canDeactivate: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean> | Promise<boolean> | boolean;
    confirmContinueEditingDialogOptions: (dirtyForm: FormGroup, allForms: FormGroup[]) => ConfirmationDialogOptions;
}
export declare class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean>;
}
