import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ShellRoutingParameters } from '../../utility/route-helpers';
import { MultiToolComponent } from './multi-tool/multi-tool.component';
import { ToolComponent } from './tool/tool.component';
/**
 * Shell can-deactivate tool callback interface.
 */
export interface ShellCanDeactivateTool {
    canDeactivateTool(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean>;
}
export declare abstract class ToolsGuardBaseService<T extends ShellCanDeactivateTool> implements CanActivate, CanDeactivate<T> {
    protected router: Router;
    /**
     * Initializes a new instance of the ToolsGuardBaseService class.
     * @param router the angular router
     */
    constructor(router: Router);
    /**
     * Guard against navigating to a tool route that is not supported by the current solution
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
    /**
     * Guard against going away from current tool.
     *
     * @param component The component object.
     * @param currentRoute The current route object.
     * @param currentState The current state.
     * @param nextState The next state.
     */
    canDeactivate(component: T, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | boolean;
    /**
     * Guard against navigating to solution route unless supported by the solution
     * @param route the current route snapshot
     * @param state the current router state snapshot
     * @param entryPoint the current solutions entryPoint
     */
    protected abstract canActivateForSolution(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, params: ShellRoutingParameters): boolean;
}
export declare class ToolGuardService extends ToolsGuardBaseService<ToolComponent> {
    /**
     * Initializes a new instance of the ToolGuardService class.
     * @param router the angular router
     */
    constructor(router: Router);
    /**
     * Guard against navigating to a single tool page unless supported by the solution
     * @param route the current route snapshot
     * @param state the current router state snapshot
     * @param entryPoint the current solutions entryPoint
     */
    protected canActivateForSolution(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, params: ShellRoutingParameters): boolean;
}
export declare class MultiToolGuardService extends ToolsGuardBaseService<MultiToolComponent> {
    /**
     * Initializes a new instance of the MultiToolGuardService class.
     * @param router the angular router
     */
    constructor(router: Router);
    /**
     * Guard against navigating to a multi tool page unless supported by the solution
     * @param route the current route snapshot
     * @param state the current router state snapshot
     * @param entryPoint the current solutions entryPoint
     */
    protected canActivateForSolution(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, params: ShellRoutingParameters): boolean;
}
