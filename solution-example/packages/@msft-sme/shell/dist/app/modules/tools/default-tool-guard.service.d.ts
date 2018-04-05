import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppContextService } from '../../../angular';
export declare class DefaultToolGuardService implements CanActivate {
    private appContextService;
    private router;
    /**
     * Initializes a new instance of the DefaultToolGuardService class.
     * @param appContextService the application context service.
     * @param router the angular router.
     */
    constructor(appContextService: AppContextService, router: Router);
    /**
     * Guard against navigating to the tools page without a tool specified. Always redirects to the default or first tool
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>;
}
