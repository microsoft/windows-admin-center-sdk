import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AppContextService } from '../../../angular';
export declare class SolutionGuardService implements CanActivate {
    private appContextService;
    private router;
    /**
     * Initializes a new instance of the SolutionGuardService class.
     * @param appContextService the application context service.
     */
    constructor(appContextService: AppContextService, router: Router);
    /**
     * Guard against navigating to solutions that dont exist
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
}
