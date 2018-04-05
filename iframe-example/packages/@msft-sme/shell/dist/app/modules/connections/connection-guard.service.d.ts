import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppContextService } from '../../../angular';
import { ShellService } from '../../shell.service';
export declare class ConnectionGuardService implements CanActivate {
    private appContextService;
    private router;
    private shellService;
    /**
     * Initializes a new instance of the ConnectionGuardService class.
     * @param appContextService the application context service.
     * @param router the angular router.
     */
    constructor(appContextService: AppContextService, router: Router, shellService: ShellService);
    /**
     * Gaurd against navigating until the app initialization is complete
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>;
    /**
     * Determines and activates the best redirect route
     * @param route the current route snapshot
     */
    private redirectRoute(route);
}
