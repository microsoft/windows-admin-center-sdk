import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppContextService } from '../angular';
export declare class ShellGuardService implements CanActivate {
    private appContextService;
    private router;
    private static initialized;
    /**
     * Initializes a new instance of the SmeAppReadyGuard class.
     * @param appContextService the application context service.
     * @param router the activated route.
     */
    constructor(appContextService: AppContextService, router: Router);
    /**
     * Guard against navigating until the app initialization is complete
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>;
}
