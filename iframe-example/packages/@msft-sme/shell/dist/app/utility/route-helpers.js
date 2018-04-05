import { Observable } from 'rxjs';
import { connectionTypeConstants, ConnectionUtility, EnvironmentModule } from '../../core';
export var routeParts = {
    solutionId: 'solutionId',
    toolId: 'toolId',
    toolUrl: 'toolUrl',
    tools: 'tools',
    connections: 'connections',
    connectionName: 'connectionName',
    connectionType: 'connectionType'
};
var RouteHelpers = /** @class */ (function () {
    function RouteHelpers() {
    }
    RouteHelpers.getFullRouteParams = function (route) {
        // combine all parts of the route to get the complete picture of the route parameters
        var params = {};
        var parent = route;
        while (parent) {
            params = Object.assign({}, parent.params, params);
            parent = parent.parent;
        }
        // walk down the primary outlet chain ar well
        var child = route;
        while (child.firstChild) {
            params = Object.assign({}, params, child.firstChild.params);
            if (!child.firstChild.firstChild) {
                params = Object.assign({}, params, { toolUrl: child.firstChild.url.map(function (segment) { return segment.path; }).join('/') });
            }
            child = child.firstChild;
        }
        if (params.connectionName) {
            params.connectionName = params.connectionName.toLowerCase();
        }
        return params;
    };
    RouteHelpers.getFullShellRoutingParameters = function (route) {
        var params = RouteHelpers.getFullRouteParams(route);
        return RouteHelpers.getShellRoutingParameters(params);
    };
    RouteHelpers.getShellRoutingParameters = function (params) {
        var result = {};
        if (params[routeParts.toolUrl]) {
            result.toolUrl = params[routeParts.toolUrl].split('/');
        }
        // handle connection properties
        result.connectionName = params[routeParts.connectionName];
        var connectionTypeName = params[routeParts.connectionType];
        result.connectionType = EnvironmentModule.getConnectionTypeFromFriendlyUrlSegment(connectionTypeName);
        if (result.connectionType) {
            result.connectionFriendlyType = connectionTypeName;
        }
        else {
            result.connectionType = connectionTypeName;
        }
        // handle solution properties
        var solutionName = params[routeParts.solutionId];
        result.solutionId = EnvironmentModule.getEntryPointFromFriendlyUrlSegment(solutionName, 'solution');
        if (result.solutionId) {
            result.solutionFriendlyName = solutionName;
        }
        else {
            result.solutionId = solutionName;
        }
        result.solution = RouteHelpers.resolveEntryPointOfType(result.solutionId, 'solution');
        // handle tool properties
        var toolName = params[routeParts.toolId];
        result.toolId = EnvironmentModule.getEntryPointFromFriendlyUrlSegment(toolName, 'tool');
        if (result.toolId) {
            result.toolFriendlyName = toolName;
        }
        else {
            result.toolId = toolName;
        }
        result.tool = RouteHelpers.resolveEntryPointOfType(result.toolId, 'tool');
        return result;
    };
    RouteHelpers.resolveEntryPointOfType = function (id, entryPointType) {
        if (id) {
            var entryPoint = EnvironmentModule.resolveEntrypoint(id);
            if (entryPoint && entryPoint.entryPointType === entryPointType) {
                return entryPoint;
            }
        }
        return null;
    };
    RouteHelpers.navigateToHome = function (router) {
        return router.navigateByUrl('/');
    };
    RouteHelpers.navigateToAppHome = function (router, gateway) {
        return this.navigateToConnection(router, connectionTypeConstants.windowsClient, RouteHelpers.appModeConnectionName);
    };
    RouteHelpers.navigateToSolution = function (router, solutionEntryPoint) {
        var solutionId = EnvironmentModule.createFormattedEntrypoint(solutionEntryPoint);
        return router.navigate(['/', EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(solutionId, 'solution')]);
    };
    RouteHelpers.navigateToConnections = function (router, solutionEntryPoint) {
        if (!solutionEntryPoint) {
            // go to all connections
            RouteHelpers.navigateToHome(router);
        }
        // go to solution connections
        var solutionId = EnvironmentModule.createFormattedEntrypoint(solutionEntryPoint);
        return router.navigate([
            '/',
            EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(solutionId, 'solution'),
            routeParts.connections
        ]);
    };
    RouteHelpers.navigateToConnection = function (router, connectionType, connectionName, solution) {
        var route = ['/'];
        if (solution) {
            // go to solution connection
            var solutionId = EnvironmentModule.createFormattedEntrypoint(solution);
            route.push(EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(solutionId, 'solution'));
        }
        else {
            // go to connection types default solution connection
            var typeInfo = EnvironmentModule.getConnectionTypeInfo(connectionType);
            var solutionId = EnvironmentModule.createFormattedEntrypoint(typeInfo.solution);
            route.push(EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(solutionId, 'solution'));
        }
        var connectionTypeName = EnvironmentModule.getFriendlyUrlSegmentForConnectionType(connectionType);
        route.push(routeParts.connections, connectionTypeName, connectionName);
        return router.navigate(route);
    };
    RouteHelpers.navigateToTool = function (router, params, appendTools) {
        if (appendTools === void 0) { appendTools = null; }
        var route = ['/'];
        if (appendTools === null) {
            appendTools = params.solution.tools && params.solution.tools.enabled;
        }
        if (params.solution) {
            appendTools = appendTools && params.solution.tools && params.solution.tools.enabled;
            route.push(EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(params.solutionId, 'solution'));
            if (params.solution.rootNavigationBehavior === 'connections') {
                route.push(routeParts.connections);
                if (params.connectionName && params.connectionType) {
                    var connectionTypeName = EnvironmentModule.getFriendlyUrlSegmentForConnectionType(params.connectionType);
                    route.push(connectionTypeName, params.connectionName);
                }
                else {
                    appendTools = false;
                }
            }
            if (appendTools) {
                route.push(routeParts.tools);
                if (params.toolId) {
                    route.push(EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(params.toolId, 'tool'));
                    route.push.apply(route, params.toolUrl);
                }
            }
        }
        return router.navigate(route);
    };
    RouteHelpers.navigateByParams = function (router, params) {
        var route = ['/'];
        if (params.solution) {
            route.push(EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(params.solutionId, 'solution'));
            if (params.solution.rootNavigationBehavior === 'connections') {
                route.push(routeParts.connections);
                if (params.connectionType && params.connectionName) {
                    var connectionTypeName = EnvironmentModule.getFriendlyUrlSegmentForConnectionType(params.connectionType);
                    route.push(connectionTypeName, params.connectionName);
                }
                else {
                    return router.navigate(route);
                }
            }
            if (params.solution.tools && params.solution.tools.enabled) {
                route.push(routeParts.tools);
                if (params.toolId) {
                    route.push(EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(params.toolId, 'tool'));
                    route.push.apply(route, params.toolUrl);
                }
            }
        }
        return router.navigate(route);
    };
    RouteHelpers.getBaseToolsRoute = function (params) {
        var route = ['/'];
        if (params.solution) {
            route.push(EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(params.solutionId, 'solution'));
            if (params.solution.rootNavigationBehavior === 'connections') {
                var connectionTypeName = EnvironmentModule.getFriendlyUrlSegmentForConnectionType(params.connectionType);
                route.push(routeParts.connections, connectionTypeName, params.connectionName);
            }
            if (params.solution.tools && params.solution.tools.enabled) {
                route.push(routeParts.tools);
            }
        }
        return route;
    };
    RouteHelpers.queryToolsListFromShellParameters = function (appContextService, caches, params) {
        var connection = appContextService.connectionManager.connections
            .find(function (c) { return c.name === params.connectionName && c.type === params.connectionType; });
        if (!connection || !params.solution) {
            return Observable.of([]);
        }
        return ConnectionUtility.queryToolsList(caches, connection, params.solution);
    };
    RouteHelpers.getDefaultToolForSolution = function (appContextService, params) {
        if (!params.solution || !params.solution.tools || !params.solution.tools.enabled || !params.solution.tools.defaultTool) {
            return null;
        }
        var tools = RouteHelpers.getToolsListFromShellParametersSimple(appContextService, params);
        return tools.find(function (tool) {
            return tool.name === params.solution.tools.defaultTool
                && tool.parentModule.name === params.solution.parentModule.name;
        });
    };
    RouteHelpers.getToolsListFromShellParametersSimple = function (appContextService, params) {
        var connection = appContextService.connectionManager.connections
            .find(function (c) { return c.name === params.connectionName && c.type === params.connectionType; });
        if (!connection || !params.solution) {
            return [];
        }
        return ConnectionUtility.getToolsList(connection, params.solution);
    };
    RouteHelpers.appModeConnectionName = 'localhost';
    RouteHelpers.queryParams = {
        disableDayZero: 'disableDayZero'
    };
    return RouteHelpers;
}());
export { RouteHelpers };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC91dGlsaXR5L3JvdXRlLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBaUIsTUFBTSxNQUFNLENBQUM7QUFHakQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsaUJBQWlCLEVBT3BCLE1BQU0sWUFBWSxDQUFDO0FBZXBCLE1BQU0sQ0FBQyxJQUFNLFVBQVUsR0FBRztJQUN0QixVQUFVLEVBQUUsWUFBWTtJQUN4QixNQUFNLEVBQUUsUUFBUTtJQUNoQixPQUFPLEVBQUUsU0FBUztJQUNsQixLQUFLLEVBQUUsT0FBTztJQUNkLFdBQVcsRUFBRSxhQUFhO0lBQzFCLGNBQWMsRUFBRSxnQkFBZ0I7SUFDaEMsY0FBYyxFQUFFLGdCQUFnQjtDQUNuQyxDQUFDO0FBRUY7SUFBQTtJQWtQQSxDQUFDO0lBMU9pQiwrQkFBa0IsR0FBaEMsVUFBaUMsS0FBNkI7UUFDMUQscUZBQXFGO1FBQ3JGLElBQUksTUFBTSxHQUE4QixFQUFFLENBQUM7UUFDM0MsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLE9BQU8sTUFBTSxFQUFFLENBQUM7WUFDWixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNsRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUMzQixDQUFDO1FBRUQsNkNBQTZDO1FBQzdDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixPQUFPLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN0QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7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VSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUVELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVhLHNDQUF5QixHQUF2QyxVQUNRLGlCQUFvQyxFQUFHLE1BQThCO1FBQ3pFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNySCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMscUNBQXFDLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUYsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO1lBQ2xCLE9BQUEsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXO21CQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJO1FBRC9ELENBQytELENBQ2xFLENBQUM7SUFDTixDQUFDO0lBRWEsa0RBQXFDLEdBQW5ELFVBQ1EsaUJBQW9DLEVBQUUsTUFBOEI7UUFDeEUsSUFBSSxVQUFVLEdBQUcsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsV0FBVzthQUMzRCxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsY0FBYyxFQUFwRSxDQUFvRSxDQUFDLENBQUM7UUFDckYsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBL09hLGtDQUFxQixHQUFHLFdBQVcsQ0FBQztJQUVwQyx3QkFBVyxHQUFHO1FBQ3hCLGNBQWMsRUFBRSxnQkFBZ0I7S0FDbkMsQ0FBQztJQTRPTixtQkFBQztDQWxQRCxBQWtQQyxJQUFBO1NBbFBZLFlBQVkiLCJmaWxlIjoicm91dGUtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=