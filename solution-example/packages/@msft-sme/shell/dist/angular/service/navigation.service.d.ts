import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService } from './app-context.service';
/**
 * Options to override the default behavior of the navigation service
 */
export interface NavigatorServiceOptions {
    /**
     * The angular 2 default route to use during initialization and
     * if the application gets deactivated but still running
     * See @angular/router - Router.navigate method for more details
     */
    idleRoute?: any[];
}
export declare class NavigationService {
    private appContextService;
    private router;
    private activatedRoute;
    private static initialWaitTime;
    private navigationOptions;
    private lastRoute;
    private subscription;
    private options;
    private active;
    private openContext;
    private deactivateContext;
    /**
     * Creates a new instance of this service
     */
    constructor(appContextService: AppContextService, router: Router, activatedRoute: ActivatedRoute);
    /**
     * Initialize navigation communication from/to the shell.
     *
     *  Registers the methods with the remote RPC defined in the manifest
     *  Subscribes to the router events and reports the breadcrumb items
     *  back to the rpc remote
     *
     * @param options The options to override the default behavior
     */
    initialize(options?: NavigatorServiceOptions): void;
    /**
     * Shutdown the navigation communication from/to the shell.
     */
    shutdown(): void;
    private onInit(data);
    /**
     * Repeated open called until navigation is established or failed.
     *
     * @param data the RpcOpenData data.
     */
    private onOpen(data);
    /**
     * Repeated called until Guard is continued or cancelled.
     *
     * @param data the void data.
     */
    private onDeactivate2(data);
    private onActivate(data);
    private onShutdown(data);
}
