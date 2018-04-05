import { ConnectionUtility, EnvironmentModule } from '../../core';
export var routeParts = {
    solutionId: 'solutionId',
    toolId: 'toolId',
    toolUrl: 'toolUrl',
    tools: 'tools',
    connections: 'connections',
    connectionName: 'connectionName',
    connectionType: 'connectionType'
};
var RouteHelpers = (function () {
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
    RouteHelpers.getToolsListFromShellParameters = function (appContextService, params) {
        var connection = appContextService.connectionManager.connections
            .find(function (c) { return c.name === params.connectionName && c.type === params.connectionType; });
        if (!connection || !params.solution) {
            return [];
        }
        return ConnectionUtility.getToolsList(connection, params.solution);
    };
    RouteHelpers.getDefaultToolForSolution = function (appContextService, params) {
        if (!params.solution || !params.solution.tools || !params.solution.tools.enabled || !params.solution.tools.defaultTool) {
            return null;
        }
        var tools = RouteHelpers.getToolsListFromShellParameters(appContextService, params);
        return tools.find(function (tool) {
            return tool.name === params.solution.tools.defaultTool
                && tool.parentModule.name === params.solution.parentModule.name;
        });
    };
    return RouteHelpers;
}());
export { RouteHelpers };
RouteHelpers.queryParams = {
    disableDayZero: 'disableDayZero'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC91dGlsaXR5L3JvdXRlLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUVILGlCQUFpQixFQUNqQixpQkFBaUIsRUFHcEIsTUFBTSxZQUFZLENBQUM7QUFlcEIsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUFHO0lBQ3RCLFVBQVUsRUFBRSxZQUFZO0lBQ3hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLEtBQUssRUFBRSxPQUFPO0lBQ2QsV0FBVyxFQUFFLGFBQWE7SUFDMUIsY0FBYyxFQUFFLGdCQUFnQjtJQUNoQyxjQUFjLEVBQUUsZ0JBQWdCO0NBQ25DLENBQUM7QUFFRjtJQUFBO0lBaU9BLENBQUM7SUEzTmlCLCtCQUFrQixHQUFoQyxVQUFpQyxLQUE2QjtRQUMxRCxxRkFBcUY7UUFDckYsSUFBSSxNQUFNLEdBQThCLEVBQUUsQ0FBQztRQUMzQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkIsT0FBTyxNQUFNLEVBQUUsQ0FBQztZQUNaLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2xELE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzNCLENBQUM7UUFFRCw2Q0FBNkM7UUFDN0MsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLE9BQU8sS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3RCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1RCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFB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TSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNySCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsK0JBQStCLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFcEYsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO1lBQ2xCLE9BQUEsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXO21CQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJO1FBRC9ELENBQytELENBQ2xFLENBQUM7SUFDTixDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQWpPQSxBQWlPQzs7QUEvTmlCLHdCQUFXLEdBQUc7SUFDeEIsY0FBYyxFQUFFLGdCQUFnQjtDQUNuQyxDQUFDIiwiZmlsZSI6InJvdXRlLWhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9