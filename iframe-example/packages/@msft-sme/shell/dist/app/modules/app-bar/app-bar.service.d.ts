import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppContextService, DialogService } from '../../../angular';
export interface Breadcrumb {
    label: string;
    params: Params;
    url: string;
}
export interface ModuleBreadcrumb {
    path: string;
    beforeRedirectedPath: string;
    source: string;
    entryPoint?: string;
    breadCrumbItems: Breadcrumb[];
}
export declare class AppBarService {
    private activatedRoute;
    private router;
    private appContextService;
    private dialogService;
    private location;
    private title;
    static toolsUrlPrefix: string;
    moduleLoopbackUrl: string;
    private moduleDialog;
    constructor(activatedRoute: ActivatedRoute, router: Router, appContextService: AppContextService, dialogService: DialogService, location: Location, title: Title);
    /**
     * Retrieves an observable for the combined list of breadcrumbs.
     */
    getBreadcrumbs(): Observable<Breadcrumb[]>;
    /**
     * Retrieves an observable from navigation end events and RPC report event.
     */
    private moduleRouteChangeEvents();
    /**
     * Retrieves an for breadcrumbs that come from our own router
     */
    private getRouterBreadcrumbs(data);
    /**
     * Retrieves an observable for breadcrumbs that come from the rpc
     */
    private getRpcBreadcrumbs(data);
    private normalizeModuleBreadcrumbPath(moduleBreadcrumb);
    /**
     * Gets the url for a module given a modules source
     * @param moduleName the module name of source.
     * @param entryPointName the name of entry point.
     */
    private getToolUrl(moduleName, entryPointName);
    /**
     * Add the default entry point path if not present.
     *
     * @param moduleName the name of module.
     * @param entryPointName the name of entry point.
     * @param currentPath the current URL.
     * @return {string} the updated URL.
     */
    private normalizeWithDefaultEntryPointPath(moduleName, entryPointName, currentPath);
}
