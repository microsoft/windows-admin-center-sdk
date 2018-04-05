import { Location } from '@angular/common';
import { PRIMARY_OUTLET } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvironmentModule, Logging, LogLevel } from '../../core';
/**
 * Navigation class to provide set of static helper functions.
 */
var Navigation = /** @class */ (function () {
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
    /**
     * The url options for gateway and connection.
     */
    Navigation.gatewayUrl = 'gatewayUrl';
    return Navigation;
}());
export { Navigation };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9uYXZpZ2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQTRDLGNBQWMsRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBQ25HLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUNrQyxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUM1RSxNQUFNLFlBQVksQ0FBQztBQWtCcEI7O0dBRUc7QUFDSDtJQUFBO0lBNlJBLENBQUM7SUFyUkc7OztPQUdHO0lBQ1cseUJBQWMsR0FBNUI7UUFDSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QyxVQUFVLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUU7Z0JBQy9DLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSTthQUN0QixDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ1csd0JBQWEsR0FBM0I7UUFDSSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUU7Z0JBQy9DLEtBQUssRUFBRSxVQUFVLENBQUMsZUFBZTthQUNwQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNXLHNCQUFXLEdBQXpCLFVBQTBCLElBQVksRUFBRSxJQUFZ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QixDQUFDO1FBRUQsSUFBSSxHQUFHLEdBQUcsTUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsU0FBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWdCLENBQUM7UUFFekUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakQscUVBQXFFO2dCQUNyRSxHQUFHLElBQUksY0FBYyxDQUFDO2dCQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2YsQ0FBQztZQUVELEdBQUcsSUFBSSxrQkFBZ0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFNBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFNLENBQUM7UUFDMUUsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELDhCQUE4QjtnQkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBWTtvQkFDbkIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO29CQUNyQixPQUFPLEVBQUUseURBQXlEO29CQUNsRSxNQUFNLEVBQUUsWUFBWTtpQkFDdkIsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUVELEdBQUcsSUFBSSxZQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxTQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBZ0IsQ0FBQztRQUN4RSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztZQUMvQixHQUFHLElBQUksSUFBSSxDQUFDLHVCQUF1QixDQUFDO1FBQ3hDLENBQUM7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQTNSRDs7T0FFRztJQUNXLHFCQUFVLEdBQUcsWUFBWSxDQUFDO0lBeVI1QyxpQkFBQztDQTdSRCxBQTZSQyxJQUFBO1NBN1JZLFVBQVUiLCJmaWxlIjoibmF2aWdhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=