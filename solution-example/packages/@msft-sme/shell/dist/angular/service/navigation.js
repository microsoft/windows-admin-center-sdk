import { Location } from '@angular/common';
import { PRIMARY_OUTLET } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvironmentModule, Logging, LogLevel } from '../../core';
/**
 * Navigation class to provide set of static helper functions.
 */
var Navigation = (function () {
    function Navigation() {
    }
    /**
     * Turn off browser history push.
     * - instead sending all path change to the Shell to create history.
     */
    Navigation.turnOffHistory = function () {
        if (window.history.pushState !== MsftSme.noop) {
            Navigation.pushStateBackup = window.history.pushState;
            Object.defineProperty(window.history, 'pushState', {
                value: MsftSme.noop
            });
        }
    };
    /**
     * Turn on browser history push.
     */
    Navigation.turnOnHistory = function () {
        if (Navigation.pushStateBackup && window.history.pushState === MsftSme.noop) {
            Object.defineProperty(window.history, 'pushState', {
                value: Navigation.pushStateBackup
            });
        }
    };
    /**
     * Compare two urls by removing leading and trailing slashes.
     *
     * @param url1 the url to compare.
     * @param url2 the url to compare.
     * @return boolean true if matches. null url returns false.
     */
    Navigation.areEqualUrl = function (url1, url2) {
        if (url1 == null || url2 == null) {
            return false;
        }
        return Navigation.trimSlash(url1) === Navigation.trimSlash(url2);
    };
    /**
     * Compare two urls for number of segments.
     *
     * @param url1 the url to compare.
     * @param url2 the url to compare.
     * @param count the number of segments to compare.
     * @return boolean true if matches for number of segments.
     */
    Navigation.areEqualSegments = function (url1, url2, count) {
        if (url1 == null || url2 == null) {
            return false;
        }
        var segments1 = Navigation.trimSlash(url1).split('/');
        var segments2 = Navigation.trimSlash(url2).split('/');
        if (segments1.length < count || segments2.length < count) {
            return false;
        }
        for (var i = 0; i < count; i++) {
            if (segments1[i] !== segments2[i]) {
                return false;
            }
        }
        return true;
    };
    Navigation.trimSlash = function (url) {
        if (url == null) {
            return url;
        }
        if (url.length > 0 && url[0] === '/') {
            url = url.substr(1);
        }
        if (url.length > 0 && url[url.length - 1] === '/') {
            url = url.substr(0, url.length - 1);
        }
        return url;
    };
    /**
     * Get url segments combined module name and path of entry point.
     *
     * @param moduleName the module name.
     * @param entryPointName the name of entry point.
     * @return {string} the url segments.
     */
    Navigation.getModuleEntryPointUrlSegment = function (moduleName, entryPointName) {
        return moduleName + "!" + entryPointName;
    };
    /**
     * Builds selectable paths from the given route.
     *
     * @param appContextService The application context service object.
     * @param route The route to extract the breadcrumb for
     * @param pathPrefix The prefix to prepend to the route path
     * @return SelectablePath[] the selectable paths.
     */
    Navigation.buildSelectablePathsForRoute = function (appContextService, route, pathPrefix) {
        var asyncArray = [];
        var selectablePaths = [];
        var childrenQueue = route.children.slice(0);
        pathPrefix = pathPrefix ? pathPrefix : '';
        while (childrenQueue.length > 0) {
            // we are only interested in primary routes that have a displayName at this time
            var child = childrenQueue.shift();
            if (child.outlet === PRIMARY_OUTLET) {
                // append the routes URL segment
                var segmentPath = child.url
                    .filter(function (seg1) { return seg1 && seg1.path && seg1.path.length > 0; })
                    .map(function (seg2) { return seg2.path; })
                    .join('/');
                if (segmentPath) {
                    // only add a segment if there's any valuable information to it.
                    pathPrefix = Location.joinWithSlash(pathPrefix, segmentPath);
                }
                var result = null;
                var data = child.data;
                var component = child.component;
                if (component && component.navigationTitle) {
                    // the label can be null to indicate if it's home page access.
                    result = component.navigationTitle(appContextService, child);
                    if (result) {
                        if (result instanceof Observable) {
                            // observable query.
                            var observable = result;
                            asyncArray.push(result);
                        }
                        else if (typeof result === 'object') {
                            // returned as array.
                            var paths = result;
                            asyncArray.push(Observable.of(paths));
                        }
                        else if (typeof result === 'string') {
                            // returned as string.
                            var selectablePath = {
                                label: result,
                                path: pathPrefix,
                                params: child.queryParams
                            };
                            asyncArray.push(Observable.of([selectablePath]));
                        }
                        else {
                            var message = MsftSme.resourcesStrings()
                                .MsftSmeShell.Angular.Navigation.NavigationTitleReturnTypeError.message;
                            throw new Error(message);
                        }
                    }
                }
            }
            // continue building recursively
            child.children.forEach(function (grandChild) {
                if (grandChild.outlet === PRIMARY_OUTLET) {
                    childrenQueue.push(grandChild);
                }
            });
        }
        return Observable.forkJoin(asyncArray).map(function (resultArray) {
            var result = [];
            resultArray.forEach(function (items, index, array) {
                items.forEach(function (item) {
                    result.push(item);
                });
            });
            return result;
        });
    };
    /**
     * Navigate to the connection.
     *
     * @param router the router.
     * @param connection the connection object.
     */
    Navigation.navigateConnection = function (router, connection) {
        var typeInfo = EnvironmentModule.getConnectionTypeInfo(connection.type);
        var moduleEntrySegment = Navigation.getModuleEntryPointUrlSegment(typeInfo.solution.parentModule.name, typeInfo.solution.name);
        var rootEntrySegment = Navigation.getModuleEntryPointUrlSegment(typeInfo.tool.parentModule.name, typeInfo.tool.name);
        var queryParams = Navigation.getConnectionQueryParams(connection);
        var pathSegments = ['solutions', moduleEntrySegment, 'tools', rootEntrySegment];
        return router.navigate(pathSegments, Navigation.getNavigationExtras(queryParams));
    };
    /**
     * Get connection query params.
     *
     * @param connection the connection object.
     */
    Navigation.getConnectionQueryParams = function (connection) {
        var queryParams = {};
        // TODO: if we implement more query params, add them back here
        return queryParams;
    };
    /**
     * Get navigation extras for default options.
     *
     * @param queryParams the query params
     */
    Navigation.getNavigationExtras = function (queryParams) {
        return { queryParams: queryParams, queryParamsHandling: 'merge' };
    };
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
    Navigation.getNavigationUrlForToolEntryPoint = function (data) {
        if (data.navigateNext) {
            return data.navigateNext;
        }
        if (!data.solution || !data.solution.moduleName) {
            // no solution goes to root (homepage)
            return '/';
        }
        else if (!data.solution.entryPointName) {
            // it requires entryPointName.
            Logging.log({
                level: LogLevel.Error,
                message: 'Argument error: entryPointName of the solution is required.',
                source: 'navigation'
            });
            return null;
        }
        var url = "/" + data.solution.moduleName + "!" + data.solution.entryPointName;
        if (data.connection) {
            if (!data.connection.name || !data.connection.type) {
                // connection list for empty connection like 'data.connection === {}'
                url += '/connections';
                return url;
            }
            url += "/connections/" + data.connection.type + "/" + data.connection.name;
        }
        if (data.tool) {
            if (data.tool.moduleName && !data.tool.entryPointName) {
                // it requires entryPointName.
                Logging.log({
                    level: LogLevel.Error,
                    message: 'Argument error: entryPointName of the tool is required.',
                    source: 'navigation'
                });
                return null;
            }
            url += "/tools/" + data.tool.moduleName + "!" + data.tool.entryPointName;
        }
        if (data.toolNestedUrlAndOptions) {
            url += data.toolNestedUrlAndOptions;
        }
        return url;
    };
    return Navigation;
}());
export { Navigation };
/**
 * The url options for gateway and connection.
 */
Navigation.gatewayUrl = 'gatewayUrl';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9uYXZpZ2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQTRDLGNBQWMsRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBQ25HLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUNrQyxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUM1RSxNQUFNLFlBQVksQ0FBQztBQWtCcEI7O0dBRUc7QUFDSDtJQUFBO0lBNlJBLENBQUM7SUFyUkc7OztPQUdHO0lBQ1cseUJBQWMsR0FBNUI7UUFDSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QyxVQUFVLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUU7Z0JBQy9DLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSTthQUN0QixDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ1csd0JBQWEsR0FBM0I7UUFDSSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUU7Z0JBQy9DLEtBQUssRUFBRSxVQUFVLENBQUMsZUFBZTthQUNwQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNXLHNCQUFXLEdBQXpCLFVBQTBCLElBQVksRUFBRSxJQUFZ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RyxHQUFHLE1BQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLFNBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFnQixDQUFDO1FBRXpFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELHFFQUFxRTtnQkFDckUsR0FBRyxJQUFJLGNBQWMsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNmLENBQUM7WUFFRCxHQUFHLElBQUksa0JBQWdCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxTQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBTSxDQUFDO1FBQzFFLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCw4QkFBOEI7Z0JBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQVk7b0JBQ25CLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztvQkFDckIsT0FBTyxFQUFFLHlEQUF5RDtvQkFDbEUsTUFBTSxFQUFFLFlBQVk7aUJBQ3ZCLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFFRCxHQUFHLElBQUksWUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsU0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWdCLENBQUM7UUFDeEUsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7WUFDL0IsR0FBRyxJQUFJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUN4QyxDQUFDO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFDTCxpQkFBQztBQUFELENBN1JBLEFBNlJDOztBQTVSRzs7R0FFRztBQUNXLHFCQUFVLEdBQUcsWUFBWSxDQUFDIiwiZmlsZSI6Im5hdmlnYXRpb24uanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9