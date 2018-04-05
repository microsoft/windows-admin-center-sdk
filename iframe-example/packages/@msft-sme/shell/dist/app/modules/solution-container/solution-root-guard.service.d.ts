import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { EnvironmentModuleEntryPoint } from '../../../core';
export declare abstract class SolutionRootGuardBaseService implements CanActivate {
    protected router: Router;
    /**
     * Initializes a new instance of the SolutionRootGuardBaseService class.
     * @param router the angular router
     */
    constructor(router: Router);
    /**
     * Guard against navigating to a root solution route that is not supported by the solution
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
    /**
     * Guard against navigating to solution route unless supported by the solution
     * @param route the current route snapshot
     * @param state the current router state snapshot
     * @param entryPoint the current solutions entryPoint
     */
    protected abstract canActivateSolution(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, entryPoint: EnvironmentModuleEntryPoint): boolean;
}
export declare class SolutionRootConnectionsGuardService extends SolutionRootGuardBaseService {
    /**
     * Initializes a new instance of the SolutionRootConnectionsGuardService class.
     * @param router the angular router
     */
    constructor(router: Router);
    /**
     * Guard against navigating to solution route unless supported by the solution
     * @param route the current route snapshot
     * @param state the current router state snapshot
     * @param entryPoint the current solutions entryPoint
     */
    protected canActivateSolution(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, entryPoint: EnvironmentModuleEntryPoint): boolean;
}
export declare class SolutionRootPathGuardService extends SolutionRootGuardBaseService {
    /**
     * Initializes a new instance of the SolutionRootPathGuardService class.
     * @param router the angular router
     */
    constructor(router: Router);
    /**
     * Guard against navigating to solution root route unless supported by the solution
     * @param route the current route snapshot
     * @param state the current router state snapshot
     * @param entryPoint the current solutions entryPoint
     */
    protected canActivateSolution(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, entryPoint: EnvironmentModuleEntryPoint): boolean;
}
