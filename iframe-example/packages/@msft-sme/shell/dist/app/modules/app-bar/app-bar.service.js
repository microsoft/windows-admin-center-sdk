var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppContextService, DialogService, Navigation } from '../../../angular';
import { EnvironmentModule, RpcInboundCommands, RpcRemoteState } from '../../../core';
import { ModuleDialog } from './module-dialog';
var HeaderNavigationEventType;
(function (HeaderNavigationEventType) {
    HeaderNavigationEventType[HeaderNavigationEventType["NavigationEnd"] = 0] = "NavigationEnd";
    HeaderNavigationEventType[HeaderNavigationEventType["RpcReport"] = 1] = "RpcReport";
})(HeaderNavigationEventType || (HeaderNavigationEventType = {}));
var AppBarService = /** @class */ (function () {
    function AppBarService(activatedRoute, router, appContextService, dialogService, location, title) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.appContextService = appContextService;
        this.dialogService = dialogService;
        this.location = location;
        this.title = title;
        this.moduleLoopbackUrl = null;
        // navigate to where requested by URL.
        this.appContextService.rpc.moduleSubjects(RpcInboundCommands.ShellNavigate)
            .subscribe(function (navigateData) {
            // force to reload all document at current url.
            if (navigateData.data.reload) {
                window.location.reload(true);
            }
            var url = Navigation.getNavigationUrlForToolEntryPoint(navigateData.data);
            if (!url) {
                navigateData.deferred.resolve({ status: false });
                return;
            }
            _this.router.navigateByUrl(url).then(function (data) { return navigateData.deferred.resolve({ status: data }); }, function (error) { return navigateData.deferred.reject(error); });
        });
        this.moduleDialog = new ModuleDialog(this.appContextService, this.dialogService);
    }
    /**
     * Retrieves an observable for the combined list of breadcrumbs.
     */
    AppBarService.prototype.getBreadcrumbs = function () {
        var _this = this;
        var changeEvents = this.moduleRouteChangeEvents().share();
        return Observable.combineLatest(changeEvents.flatMap(function (data) { return _this.getRouterBreadcrumbs(data); }), changeEvents.flatMap(function (data) { return _this.getRpcBreadcrumbs(data); }))
            .map(function (values) { return (values[0] || []).concat((values[1] || [])); });
    };
    /**
     * Retrieves an observable from navigation end events and RPC report event.
     */
    AppBarService.prototype.moduleRouteChangeEvents = function () {
        var _this = this;
        // we are only interested in navigation end events where the url is not the loopback url
        return Observable.merge(
        // Retrieves an observable router navigation end events that are not to the current moduleLoopbackUrl.
        this.router.events
            .filter(function (event) { return event instanceof NavigationEnd
            && !Navigation.areEqualUrl(_this.moduleLoopbackUrl, decodeURI(event.url).split(/[?#]/)[0]); })
            .map(function (event) { return ({ type: HeaderNavigationEventType.NavigationEnd, event: event }); }), 
        // Retrieves an observable to listen for rpc report data.
        this.appContextService.rpc.moduleSubjects(RpcInboundCommands.Report)
            .filter(function (rpcData) {
            // filter rpc report to only messages occurring while the RpcRemoteState is Active
            if (rpcData.data.status === RpcRemoteState.Active) {
                return true;
            }
            // respond as resolved state to operate as noop.
            // race condition can happen between shell and a module.
            rpcData.deferred.resolve('RpcRemoteState.Inactive');
            return false;
        }).map(function (rpcData) { return ({ type: HeaderNavigationEventType.RpcReport, rpcData: rpcData }); }));
    };
    /**
     * Retrieves an for breadcrumbs that come from our own router
     */
    AppBarService.prototype.getRouterBreadcrumbs = function (data) {
        var moduleUrl = null;
        if (data.type === HeaderNavigationEventType.RpcReport) {
            moduleUrl = this.getToolUrl(data.rpcData.data.sourceName, data.rpcData.data.entryPoint);
        }
        var breadcrumbs = Navigation.buildSelectablePathsForRoute(this.appContextService, this.activatedRoute.root.snapshot)
            .map(function (selectablePaths) { return selectablePaths
            .map(function (selectablePath) { return ({
            label: selectablePath.label,
            params: selectablePath.params,
            url: moduleUrl && selectablePath.path.startsWith(moduleUrl) ? moduleUrl : selectablePath.path
        }); }); });
        return breadcrumbs;
    };
    /**
     * Retrieves an observable for breadcrumbs that come from the rpc
     */
    AppBarService.prototype.getRpcBreadcrumbs = function (data) {
        var _this = this;
        var nodesToolsDepth = 4;
        // if we get a navigation end that is not a loopback, then
        // there is no rpc breadcrumbs until the rpc reports them again
        if (data.type === HeaderNavigationEventType.NavigationEnd) {
            return Observable.of([]);
        }
        // Use active connection to the queryParams on the url.
        var queryParams = {};
        if (this.appContextService.activeConnection) {
            queryParams = Navigation.getConnectionQueryParams(this.appContextService.connectionManager.activeConnection);
        }
        // map rpc report into module breadcrumb
        var rpcReportData = data.rpcData.data;
        data.rpcData.deferred.resolve('RpcRemoteState.Active');
        var moduleBreadcrumb = {
            path: rpcReportData.path,
            beforeRedirectedPath: rpcReportData.beforeRedirectedPath,
            source: rpcReportData.sourceName,
            entryPoint: rpcReportData.entryPoint,
            breadCrumbItems: rpcReportData.selectablePath.map(function (item) {
                return {
                    label: item.label,
                    params: __assign({}, item.params, queryParams),
                    url: item.path
                };
            })
        };
        // calc module url
        var toolUrl = this.getToolUrl(moduleBreadcrumb.source, moduleBreadcrumb.entryPoint);
        // generate the module breadcrumb and add the items from the moduleBreadcrumb
        var breadcrumbs = [];
        moduleBreadcrumb.breadCrumbItems.forEach(function (item) {
            item.url = _this.location.normalize(Location.joinWithSlash(toolUrl, item.url));
            if (item.label) {
                // don't create entry if it has no label which means the homepage of the module.
                breadcrumbs.push(item);
            }
        });
        // looping back the requested URL on the shell so active route can be set properly,
        // only if current locatiofn is different. if it's redirected, don't re-navigate.
        // nodesToolsDepth checks current url matching if async delay causing unexpected url requested.
        var locationUrl = this.location.path().split(/[?#]/)[0]; // Remove the query params
        var currentUrl = this.normalizeWithDefaultEntryPointPath(moduleBreadcrumb.source, moduleBreadcrumb.entryPoint, locationUrl);
        var moduleBreadcrumbPath = this.normalizeModuleBreadcrumbPath(moduleBreadcrumb);
        var newPath = Location.joinWithSlash(toolUrl, moduleBreadcrumbPath);
        var newLocation = this.location.normalize(newPath);
        var beforePath = Location.joinWithSlash(toolUrl, moduleBreadcrumb.beforeRedirectedPath || moduleBreadcrumbPath);
        var beforeLocation = this.location.normalize(beforePath);
        if (!Navigation.areEqualUrl(newLocation, currentUrl)
            && !Navigation.areEqualUrl(beforeLocation, currentUrl)
            && Navigation.areEqualSegments(newLocation, currentUrl, nodesToolsDepth)) {
            // new location navigation to make active route remember, but does not make rpc call to module.
            this.moduleLoopbackUrl = newLocation;
            return Observable.fromPromise(this.router.navigate([newLocation], { queryParams: queryParams, queryParamsHandling: 'merge' }))
                .map(function () {
                _this.moduleLoopbackUrl = null;
                return breadcrumbs;
            }).catch(function () {
                _this.moduleLoopbackUrl = null;
                return Observable.of(breadcrumbs);
            });
        }
        return Observable.of(breadcrumbs);
    };
    AppBarService.prototype.normalizeModuleBreadcrumbPath = function (moduleBreadcrumb) {
        var entryPoint = EnvironmentModule
            .getEntryPoints(function (ep) { return ep.parentModule.name === moduleBreadcrumb.source && ep.name === moduleBreadcrumb.entryPoint; })
            .first();
        var path = moduleBreadcrumb.path;
        var lowerCaseEntryPath = entryPoint.path.toLowerCase();
        path = MsftSme.trimStart(path, '/');
        path = MsftSme.trimEnd(path, '/');
        lowerCaseEntryPath = MsftSme.trimStart(lowerCaseEntryPath, '/');
        lowerCaseEntryPath = MsftSme.trimEnd(lowerCaseEntryPath, '/');
        var lowerCasePath = path.toLowerCase();
        var index = lowerCasePath.indexOf(lowerCaseEntryPath);
        if (index >= 0) {
            return path.substr(0, index) + path.substr(index + lowerCaseEntryPath.length);
        }
        return path;
    };
    /**
     * Gets the url for a module given a modules source
     * @param moduleName the module name of source.
     * @param entryPointName the name of entry point.
     */
    AppBarService.prototype.getToolUrl = function (moduleName, entryPointName) {
        if (!AppBarService.toolsUrlPrefix) {
            throw new Error('Missing the toolsUrlPrefix from Header service.');
        }
        var entryPoint = EnvironmentModule.getEntryPoints(function (ep) { return ep.parentModule.name === moduleName && ep.name === entryPointName; }).first();
        var segment = EnvironmentModule.createFormattedEntrypoint(entryPoint);
        var friendlySegment = EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(segment, entryPoint.entryPointType);
        return Location.joinWithSlash(AppBarService.toolsUrlPrefix, friendlySegment);
    };
    /**
     * Add the default entry point path if not present.
     *
     * @param moduleName the name of module.
     * @param entryPointName the name of entry point.
     * @param currentPath the current URL.
     * @return {string} the updated URL.
     */
    AppBarService.prototype.normalizeWithDefaultEntryPointPath = function (moduleName, entryPointName, currentPath) {
        var module = EnvironmentModule.getEnvironmentModule(moduleName);
        if (!module) {
            throw new Error('Missing the module manifest: {0}'.format(moduleName));
        }
        var entryPoint = module.entryPoints.find(function (value) { return value.name === entryPointName; });
        if (!entryPoint) {
            throw new Error('Missing the entry point in manifest: {0}, {1}'.format(moduleName, entryPointName));
        }
        var entryPointPath = MsftSme.trimStart(entryPoint.path, '/');
        if (currentPath.endsWith('!' + entryPointName)) {
            return Location.joinWithSlash(currentPath, entryPointPath);
        }
        return currentPath;
    };
    AppBarService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AppBarService.ctorParameters = function () { return [
        { type: ActivatedRoute, },
        { type: Router, },
        { type: AppContextService, },
        { type: DialogService, },
        { type: Location, },
        { type: Title, },
    ]; };
    return AppBarService;
}());
export { AppBarService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcC1iYXIvYXBwLWJhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGlCQUFBLENBQWtCO0FBQzNDLE9BQU8sRUFBVSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQ25ELE9BQU8sRUFBRSxLQUFBLEVBQU0sTUFBTywyQkFBQSxDQUE0QjtBQUNsRCxPQUFPLEVBQUUsY0FBQSxFQUFnQixhQUFBLEVBQXVDLE1BQUEsRUFBbUIsTUFBTyxpQkFBQSxDQUFrQjtBQUM1RyxPQUFPLEVBQUUsVUFBQSxFQUFrQyxNQUFPLE1BQUEsQ0FBTztBQUN6RCxPQUFPLEVBQUUsaUJBQUEsRUFBbUIsYUFBQSxFQUFlLFVBQUEsRUFBVyxNQUFPLGtCQUFBLENBQW1CO0FBQ2hGLE9BQU8sRUFHSCxpQkFBaUIsRUFHakIsa0JBQWtCLEVBQ2xCLGNBQWMsRUFLakIsTUFBTSxlQUFBLENBQWdCO0FBQ3ZCLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQWdCL0MsSUFBSyx5QkFHSjtBQUhELFdBQUsseUJBQUE7SUFDRCwyRkFBZ0IsQ0FBQTtJQUNoQixtRkFBWSxDQUFBO0FBQ2hCLENBQUMsRUFISSx5QkFBQSxLQUFBLHlCQUFBLFFBR0o7QUFTRDtJQU1JLHVCQUNZLGNBQThCLEVBQzlCLE1BQWMsRUFDZCxpQkFBb0MsRUFDcEMsYUFBNEIsRUFDNUIsUUFBa0IsRUFDbEIsS0FBWTtRQU54QixpQkEwQkM7UUF6QlcsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsVUFBSyxHQUFMLEtBQUssQ0FBTztRQVRqQixzQkFBaUIsR0FBVyxJQUFJLENBQUM7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TSxHQUFHLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUVELElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLElBQUksS0FBSyxjQUFjLEVBQTdCLENBQTZCLENBQUMsQ0FBQztRQUNqRixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUN4RyxDQUFDO1FBRUQsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUNFLHdCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsNEJBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztRQUN4QixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7UUFDM0IsRUFBQyxJQUFJLEVBQUUsYUFBYSxHQUFHO1FBQ3ZCLEVBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRztRQUNsQixFQUFDLElBQUksRUFBRSxLQUFLLEdBQUc7S0FDZCxFQVA2RixDQU83RixDQUFDO0lBQ0Ysb0JBQUM7Q0FsUEQsQUFrUEMsSUFBQTtTQWxQWSxhQUFhIiwiZmlsZSI6ImFwcC1iYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=