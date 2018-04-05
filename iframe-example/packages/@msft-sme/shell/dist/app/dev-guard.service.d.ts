import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
export declare class DevGuardService implements CanActivate {
    /**
     * Guard against navigating until the app initialization is complete
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
}
