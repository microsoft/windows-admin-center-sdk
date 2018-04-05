/**
 * The state definition of Tool condition.
 */
export var EnvironmentModuleToolState;
(function (EnvironmentModuleToolState) {
    /**
     * Tool is available on the connection.
     */
    EnvironmentModuleToolState[EnvironmentModuleToolState["Available"] = 0] = "Available";
    /**
     * Tool is not available because it's not configured properly.
     */
    EnvironmentModuleToolState[EnvironmentModuleToolState["NotConfigured"] = 1] = "NotConfigured";
    /**
     * Tool it not supported on the connection.
     */
    EnvironmentModuleToolState[EnvironmentModuleToolState["NotSupported"] = 2] = "NotSupported";
})(EnvironmentModuleToolState || (EnvironmentModuleToolState = {}));
/**
 * Environment module class.
 */
var EnvironmentModule = /** @class */ (function () {
    function EnvironmentModule() {
    }
    /**
     * Find resource string for the key.
     *
     * @param resources The resource.
     * @param locale The locale.
     * @param key The key string.
     */
    EnvironmentModule.findResource = function (resources, locale, key) {
        var prefix = 'resources:strings:';
        if (!key.startsWith(prefix)) {
            return key;
        }
        key = key.substr(prefix.length);
        var en = resources.first(function (value) { return value.locale === 'default'; });
        var current = resources.first(function (value) { return value.locale === locale; });
        if (current && current.strings[key]) {
            return current.strings[key];
        }
        else if (en && en.strings[key]) {
            return en.strings[key];
        }
        return key;
    };
    /**
     * Recursively processes manifest resources
     *
     * @param module the manifest object.
     * @param locale the locale string such as 'en'.
     * @param the current object, defaults to the module itself
     */
    EnvironmentModule.processModuleResources = function (module, locale, obj) {
        if (obj === void 0) { obj = module; }
        var keys = Object.keys(obj);
        keys.forEach(function (key) {
            if (typeof obj[key] === 'string') {
                obj[key] = EnvironmentModule.findResource(module.resources, locale, obj[key]);
            }
            else if (typeof obj[key] === 'object') {
                EnvironmentModule.processModuleResources(module, locale, obj[key]);
            }
        });
    };
    /**
     * Create environment object from the manifest.
     *
     * @param manifest the manifest object.
     * @param locale the locale string such as 'en'.
     */
    EnvironmentModule.createEnvironment = function (manifest, locale) {
        var global = window;
        // initialize entrypoint structures
        this.allEntryPoints = [];
        this.entryPointsByType = {};
        this.entryPointsByType['connectionProvider'] = [];
        this.entryPointsByType['solution'] = [];
        this.entryPointsByType['tool'] = [];
        this.entryPointsByType['component'] = [];
        this.entryPointsByType['service'] = [];
        this.friendlyUrlMap = {
            connectionTypes: { to: {}, from: {} },
            solutions: { to: {}, from: {} },
            tools: { to: {}, from: {} }
        };
        if (manifest.hasOwnProperty('modules')) {
            var modules = manifest.modules;
            for (var _i = 0, modules_1 = modules; _i < modules_1.length; _i++) {
                var module_1 = modules_1[_i];
                // TODO: signature is going to be removed from modules, for now always use default.
                module_1.signature = EnvironmentModule.defaultSignature;
                // if the module has no origin, use the global one.
                module_1.origin = module_1.origin || global.location.origin;
                // process resources                
                EnvironmentModule.processModuleResources(module_1, locale);
                EnvironmentModule.processEntryPoints(module_1);
                delete module_1['resources'];
            }
            // default entry point collections to be sorted alphabetically
            var alphaSort = function (a, b) { return a.displayName.localeCompareIgnoreCase(b.displayName); };
            this.allEntryPoints.sort(alphaSort);
            this.entryPointsByType['solution'].sort(alphaSort);
            this.entryPointsByType['tool'].sort(alphaSort);
        }
        // use local origin automatically.
        manifest.origin = global.location.origin;
        return manifest;
    };
    /**
     * Gets the environment module.
     *
     * @param name the name of module.
     * @return EnvironmentModule the environment module.
     */
    EnvironmentModule.getEnvironmentModule = function (name) {
        var global = window;
        var modules = global.MsftSme.Environment && global.MsftSme.Environment.modules;
        if (modules) {
            for (var _i = 0, modules_2 = modules; _i < modules_2.length; _i++) {
                var module_2 = modules_2[_i];
                if (module_2.name === name) {
                    return module_2;
                }
            }
        }
        return null;
    };
    /**
     * Process Entry points for quick and easy access later
     * @param module the modules to process
     */
    EnvironmentModule.processEntryPoints = function (module) {
        var _this = this;
        if (!EnvironmentModule.allEntryPoints) {
            EnvironmentModule.allEntryPoints = [];
        }
        if (!EnvironmentModule.entryPointsByType) {
            EnvironmentModule.entryPointsByType = {};
        }
        module.entryPoints.forEach(function (entryPoint) {
            // save the module information into the entry point
            entryPoint.parentModule = module;
            // create entry in entry points by type if it doesn't exist
            if (!EnvironmentModule.entryPointsByType[entryPoint.entryPointType]) {
                EnvironmentModule.entryPointsByType[entryPoint.entryPointType] = [];
            }
            // push to data structures
            EnvironmentModule.allEntryPoints.push(entryPoint);
            EnvironmentModule.entryPointsByType[entryPoint.entryPointType].push(entryPoint);
            if (entryPoint.urlName) {
                var entryPointId = EnvironmentModule.createFormattedEntrypoint(entryPoint);
                if (entryPoint.entryPointType === 'solution') {
                    _this.friendlyUrlMap.solutions.to[entryPointId] = entryPoint.urlName;
                    _this.friendlyUrlMap.solutions.from[entryPoint.urlName] = entryPointId;
                }
                else if (entryPoint.entryPointType === 'tool') {
                    _this.friendlyUrlMap.tools.to[entryPointId] = entryPoint.urlName;
                    _this.friendlyUrlMap.tools.from[entryPoint.urlName] = entryPointId;
                }
            }
            if (entryPoint.entryPointType === 'connectionProvider' && entryPoint.connectionTypeUrlName) {
                _this.friendlyUrlMap.connectionTypes.to[entryPoint.connectionType] = entryPoint.connectionTypeUrlName;
                _this.friendlyUrlMap.connectionTypes.from[entryPoint.connectionTypeUrlName] = entryPoint.connectionType;
            }
        });
    };
    /**
     * Evaluates all of the modules in the environment and returns a flat list of all of their entry points.
     * optionally filtered by the 'filter' function
     *
     * @param filter the filter to apply to the entry points.
     * @return a flat list of all module entry points
     */
    EnvironmentModule.getEntryPoints = function (filter) {
        var global = window;
        if (!global.MsftSme || !global.MsftSme.Environment) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.EnvironmentNotInitialized.message;
            throw Error(message);
        }
        return filter ? EnvironmentModule.allEntryPoints.filter(filter) : EnvironmentModule.allEntryPoints;
    };
    /**
     * Gets the available entry points from all of the modules in the environment, filtered by type.
     *
     * @param name the name of module.
     * @return EnvironmentModule the environment module.
     */
    EnvironmentModule.getEntryPointsByType = function (entryPointTypes) {
        var global = window;
        if (!global.MsftSme || !global.MsftSme.Environment) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.EnvironmentNotInitialized.message;
            throw Error(message);
        }
        return entryPointTypes.mapMany(function (type) { return EnvironmentModule.entryPointsByType[type]; });
    };
    /**
     * Gets the connection type mapping data.
     *
     * @return { [name: string]: EnvironmentConnectionTypeInfo } the mapping object.
     */
    EnvironmentModule.getConnectionMap = function () {
        if (!EnvironmentModule.connectionMap) {
            EnvironmentModule.connectionMap = EnvironmentModule.createConnectionMap();
        }
        return EnvironmentModule.connectionMap;
    };
    /**
     * Gets a friendly url segment from a connection type
     * @param connectionType the connection type to map.
     * @return string friendly url for the connection type or the connection type if no friendly name exists.
     */
    EnvironmentModule.getFriendlyUrlSegmentForConnectionType = function (connectionType, fallbackToUnfriendlySegment) {
        if (fallbackToUnfriendlySegment === void 0) { fallbackToUnfriendlySegment = true; }
        return EnvironmentModule.friendlyUrlMap.connectionTypes.to[connectionType] || (fallbackToUnfriendlySegment ? connectionType : null);
    };
    /**
     * Gets a connection type from a friendly url segment
     * @param urlSegment the url segment to map
     * @return string connection type found using the friendly url segment
     */
    EnvironmentModule.getConnectionTypeFromFriendlyUrlSegment = function (urlSegment) {
        return EnvironmentModule.friendlyUrlMap.connectionTypes.from[urlSegment];
    };
    /**
     * Gets a friendly url segment from an entry point id
     * @param urlSegment the url segment.
     * @param entryPointType the type of entry point to look for.
     * @return string friendly url for the entry point id
     */
    EnvironmentModule.getFriendlyUrlSegmentForEntryPoint = function (entryPoint, entryPointType, fallbackToUnfriendlySegment) {
        if (fallbackToUnfriendlySegment === void 0) { fallbackToUnfriendlySegment = true; }
        if (entryPointType === 'solution') {
            return EnvironmentModule.friendlyUrlMap.solutions.to[entryPoint] || (fallbackToUnfriendlySegment ? entryPoint : null);
        }
        else if (entryPointType === 'tool') {
            return EnvironmentModule.friendlyUrlMap.tools.to[entryPoint] || (fallbackToUnfriendlySegment ? entryPoint : null);
        }
        return null;
    };
    /**
     * Gets a friendly url segment for an entry point
     * @param urlSegment the url segment.
     * @param entryPointType the type of entry point to look for.
     * @return string friendly url for the entry point
     */
    EnvironmentModule.getEntryPointFromFriendlyUrlSegment = function (urlSegment, entryPointType) {
        if (entryPointType === 'solution') {
            return EnvironmentModule.friendlyUrlMap.solutions.from[urlSegment];
        }
        else if (entryPointType === 'tool') {
            return EnvironmentModule.friendlyUrlMap.tools.from[urlSegment];
        }
        return null;
    };
    /**
     * Gets the connection type information.
     *
     * @param typeName the type name.
     * @return EnvironmentConnectionTypeInfo the connection type information.
     */
    EnvironmentModule.getConnectionTypeInfo = function (typeName) {
        return EnvironmentModule.getConnectionMap()[typeName];
    };
    EnvironmentModule.createConnectionMap = function () {
        var _this = this;
        var map = {};
        var providers = this.getEntryPointsByType(['connectionProvider']);
        providers.forEach(function (provider) {
            if (!provider.connectionTypeDefaultSolution) {
                var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.EnvironmentMissingDefault.message;
                throw new Error(message);
            }
            var solutionEntrypoint = EnvironmentModule.splitFormattedEntrypoint(provider.connectionTypeDefaultSolution);
            var solution = _this.getEntryPointsByType(['solution'])
                .first(function (ep) { return ep.parentModule.name === solutionEntrypoint.moduleName && ep.name === solutionEntrypoint.entrypointName; });
            // TODO [tiba]: default tool for connection type is going away. Delete the tool from this code when done.
            var tool = null;
            if (provider.connectionTypeDefaultTool) {
                var toolEntrypoint_1 = EnvironmentModule.splitFormattedEntrypoint(provider.connectionTypeDefaultTool);
                tool = _this.getEntryPointsByType(['tool'])
                    .first(function (ep) { return ep.parentModule.name === toolEntrypoint_1.moduleName && ep.name === toolEntrypoint_1.entrypointName; });
            }
            map[provider.connectionType] = { provider: provider, solution: solution, tool: tool };
            if (solution && solution.parentModule && solution.parentModule.name) {
                map[solution.parentModule.name] = map[provider.connectionType];
            }
        });
        return map;
    };
    /**
     * splits an entrypoint identifier string into its respective module and entrypoint names
     * @param format the formatted entrypoint identifier string
     */
    EnvironmentModule.splitFormattedEntrypoint = function (format) {
        var parts = format.split('!');
        return { moduleName: parts[0], entrypointName: parts[1] };
    };
    /**
     * creates a formatted entrypoint identifier string from an entrypoint
     * @param entryPoint the entrypoint to create the string from
     */
    EnvironmentModule.createFormattedEntrypoint = function (entryPoint) {
        return entryPoint.parentModule.name + "!" + entryPoint.name;
    };
    /**
     * resolves an entrypoint from a formatted entrypoint identifier string
     * @param formattedEntrypointIdentifier the formatted entrypoint identifier string
     */
    EnvironmentModule.resolveEntrypoint = function (formattedEntrypointIdentifier) {
        if (!formattedEntrypointIdentifier) {
            return null;
        }
        var parts = EnvironmentModule.splitFormattedEntrypoint(formattedEntrypointIdentifier);
        if (!parts.moduleName || !parts.entrypointName) {
            return null;
        }
        var entrypoints = this.getEntryPoints(function (ep) { return ep.name === parts.entrypointName && ep.parentModule.name === parts.moduleName; });
        return entrypoints[0] || null;
    };
    /**
     * Gets the name of current shell or module.
     */
    EnvironmentModule.getModuleName = function () {
        var self = MsftSme.self();
        return self.Init.moduleName;
    };
    /**
     * Gets the version of current shell or module.
     */
    EnvironmentModule.getModuleVersion = function () {
        var self = MsftSme.self();
        if (self.Environment.version) {
            return self.Environment.version;
        }
        for (var _i = 0, _a = self.Environment.modules; _i < _a.length; _i++) {
            var module_3 = _a[_i];
            if (module_3.name === self.Init.moduleName && module_3.version) {
                self.Environment.version = module_3.version;
                return module_3.version;
            }
        }
        return '0.0.0';
    };
    /**
     * Static mapping for connection information.
     */
    EnvironmentModule.connectionMap = null;
    /**
     * Static mapping for friendly url strings to entrypoint ids
     */
    EnvironmentModule.friendlyUrlMap = null;
    /**
     * The name of shell.
     */
    EnvironmentModule.nameOfShell = 'msft.sme.shell';
    /**
     * The default signature if missing manifest.
     */
    EnvironmentModule.defaultSignature = 'version 0.0.0';
    return EnvironmentModule;
}());
export { EnvironmentModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbWFuaWZlc3QvZW52aXJvbm1lbnQtbW9kdWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnUEE7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSwwQkFlWDtBQWZELFdBQVksMEJBQTBCO0lBQ2xDOztPQUVHO0lBQ0gscUZBQVMsQ0FBQTtJQUVUOztPQUVHO0lBQ0gsNkZBQWEsQ0FBQTtJQUViOztPQUVHO0lBQ0gsMkZBQVksQ0FBQTtBQUNoQixDQUFDLEVBZlcsMEJBQTBCLEtBQTFCLDBCQUEwQixRQWVyQztBQXFIRDs7R0FFRztBQUNIO0lBQUE7SUE0Y0EsQ0FBQztJQWxXRzs7Ozs7O09BTUc7SUFDVyw4QkFBWSxHQUExQixVQUEyQixTQUFzQyxFQUFFLE1BQWMsRUFBRSxHQUFXO1FBQzFGLElBQU0sTUFBTSxHQUFHLG9CQUFvQixDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFFRCxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsSUFBTSxFQUFFLEdBQThCLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBQyxLQUFnQyxJQUFLLE9BQUEsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQTFCLENBQTBCLENBQUMsQ0FBQztRQUN4SCxJQUFNLE9BQU8sR0FBOEIsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFDLEtBQWdDLElBQUssT0FBQSxLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1FBQzFILEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFH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QyxZQUFZLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxVQUFVLEVBQTdFLENBQTZFLENBQUMsQ0FBQztRQUMzSCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBRUQ7O09BRUc7SUFDVywrQkFBYSxHQUEzQjtRQUNJLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUxQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHO0lBQ1csa0NBQWdCLEdBQTlCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7UUFDcEMsQ0FBQztRQUVELEdBQUcsQ0FBQyxDQUFlLFVBQXdCLEVBQXhCLEtBQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQXhCLGNBQXdCLEVBQXhCLElBQXdCO1lBQXRDLElBQUksUUFBTSxTQUFBO1lBQ1gsRUFBRSxDQUFDLENBQUMsUUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxRQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsUUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDMUMsTUFBTSxDQUFDLFFBQU0sQ0FBQyxPQUFPLENBQUM7WUFDMUIsQ0FBQztTQUNKO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBMWNEOztPQUVHO0lBQ1ksK0JBQWEsR0FBc0QsSUFBSSxDQUFDO0lBRXZGOztPQUVHO0lBQ1ksZ0NBQWMsR0FBcUMsSUFBSSxDQUFDO0lBRXZFOztPQUVHO0lBQ1csNkJBQVcsR0FBRyxnQkFBZ0IsQ0FBQztJQUU3Qzs7T0FFRztJQUNXLGtDQUFnQixHQUFHLGVBQWUsQ0FBQztJQXlickQsd0JBQUM7Q0E1Y0QsQUE0Y0MsSUFBQTtTQTVjWSxpQkFBaUIiLCJmaWxlIjoiZW52aXJvbm1lbnQtbW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=