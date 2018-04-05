import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppContextService } from '../angular';
import { ShellService } from './shell.service';
export declare class WebModeGuardService implements CanActivate {
    private appContextService;
    private router;
    private shellService;
    /**
     * Initializes a new instance of the WebModeGuardService class.
     * @param appContextService the application context service.
     * @param router the activated route.
     */
    constructor(appContextService: AppContextService, router: Router, shellService: ShellService);
    /**
     * Guard against navigating to web only components in app mode
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>;
}
