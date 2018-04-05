import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppContextService } from '../../../angular';
import { ShellService } from '../../shell.service';
export declare class SolutionGuardService implements CanActivate {
    private appContextService;
    private router;
    private shellService;
    private windowsClientSolutionId;
    /**
     * Initializes a new instance of the SolutionGuardService class.
     * @param appContextService the application context service.
     */
    constructor(appContextService: AppContextService, router: Router, shellService: ShellService);
    /**
     * Guard against navigating to solutions that dont exist
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>;
}
