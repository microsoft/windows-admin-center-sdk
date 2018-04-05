import { ActivatedRouteSnapshot, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Connection, RpcShellNavigate, SelectablePath } from '../../core';
import { AppContextService } from './app-context.service';
/**
 * Navigation class to provide set of static helper functions.
 */
export declare class Navigation {
    /**
     * The url options for gateway and connection.
     */
    static gatewayUrl: string;
    private static pushStateBackup;
    /**
     * Turn off browser history push.
     * - instead sending all path change to the Shell to create history.
     */
    static turnOffHistory(): void;
    /**
     * Turn on browser history push.
     */
    static turnOnHistory(): void;
    /**
     * Compare two urls by removing leading and trailing slashes.
     *
     * @param url1 the url to compare.
     * @param url2 the url to compare.
     * @return boolean true if matches. null url returns false.
     */
    static areEqualUrl(url1: string, url2: string): boolean;
    /**
     * Compare two urls for number of segments.
     *
     * @param url1 the url to compare.
     * @param url2 the url to compare.
     * @param count the number of segments to compare.
     * @return boolean true if matches for number of segments.
     */
    static areEqualSegments(url1: string, url2: string, count: number): boolean;
    private static trimSlash(url);
    /**
     * Get url segments combined module name and path of entry point.
     *
     * @param moduleName the module name.
     * @param entryPointName the name of entry point.
     * @return {string} the url segments.
     */
    static getModuleEntryPointUrlSegment(moduleName: string, entryPointName?: string): string;
    /**
     * Builds selectable paths from the given route.
     *
     * @param appContextService The application context service object.
     * @param route The route to extract the breadcrumb for
     * @param pathPrefix The prefix to prepend to the route path
     * @return SelectablePath[] the selectable paths.
     */
    static buildSelectablePathsForRoute(appContextService: AppContextService, route: ActivatedRouteSnapshot, pathPrefix?: string): Observable<SelectablePath[]>;
    /**
     * Navigate to the connection.
     *
     * @param router the router.
     * @param connection the connection object.
     */
    static navigateConnection(router: Router, connection: Connection): Promise<boolean>;
    /**
     * Get connection query params.
     *
     * @param connection the connection object.
     */
    static getConnectionQueryParams(connection: Connection): any;
    /**
     * Get navigation extras for default options.
     *
     * @param queryParams the query params
     */
    static getNavigationExtras(queryParams: any): NavigationExtras;
    /**
     * Get navigation URL by solution/name, module/name, connection/name and connection/type.
     *
     * (ex.
     *    - /
     *    - /msft.sme.server-manager!servers
     *    - /msft.sme.server-manager!servers/tools/msft.sme.server-manager!overview
     *    - /msft.sme.server-manager!servers +
     *          /connections/msft.sme.connection-type.server/sme-full1.redmond.corp.microsoft.com +
     *          /tools/msft.sme.server-manager!overview)
     * @param data the RPC shell navigate data.
     * @return string the url to navigate to the tool.
     */
    static getNavigationUrlForToolEntryPoint(data: RpcShellNavigate): string;
}
