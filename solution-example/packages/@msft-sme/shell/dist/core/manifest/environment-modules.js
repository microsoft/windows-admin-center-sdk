/**
 * Environment module class.
 */
var EnvironmentModule = (function () {
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
     * resolves an entrypint from a formatted entrypoint identifier string
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
        var global = window;
        return global.MsftSme && global.MsftSme.Init && global.MsftSme.Init.moduleName;
    };
    return EnvironmentModule;
}());
export { EnvironmentModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbWFuaWZlc3QvZW52aXJvbm1lbnQtbW9kdWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4UUE7O0dBRUc7QUFDSDtJQUFBO0lBeWJBLENBQUM7SUEvVUc7Ozs7OztPQU1HO0lBQ1csOEJBQVksR0FBMUIsVUFBMkIsU0FBc0MsRUFBRSxNQUFjLEVBQUUsR0FBVztRQUMxRixJQUFNLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQztRQUNwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDZixDQUFDO1FBRUQsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLElBQU0sRUFBRSxHQUE4QixTQUFTLENBQUMsS0FBSyxDQUFDLFVBQUMsS0FBZ0MsSUFBSyxPQUFBLEtBQUssQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUExQixDQUEwQixDQUFDLENBQUM7UUFDeEgsSUFBTSxPQUFPLEdBQThCLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBQyxLQUFnQyxJQUFLLE9BQUEsS0FBSyxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQXZCLENBQXVCLENBQUMsQ0FBQztRQUMxSCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUVELE1BQU0s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UUFDOUIsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7T0FHRztJQUNXLDJDQUF5QixHQUF2QyxVQUF3QyxVQUF1QztRQUMzRSxNQUFNLENBQUksVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLFNBQUksVUFBVSxDQUFDLElBQU0sQ0FBQztJQUNoRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ1csbUNBQWlCLEdBQS9CLFVBQWdDLDZCQUFxQztRQUNqRSxFQUFFLENBQUMsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxJQUFJLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyx3QkFBd0IsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQ3RGLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLFVBQVUsRUFBN0UsQ0FBNkUsQ0FBQyxDQUFDO1FBQzNILE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUNXLCtCQUFhLEdBQTNCO1FBQ0ksSUFBSSxNQUFNLEdBQTJCLE1BQU0sQ0FBQztRQUU1QyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDbkYsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0F6YkEsQUF5YkM7O0FBeGJHOztHQUVHO0FBQ1ksK0JBQWEsR0FBc0QsSUFBSSxDQUFDO0FBRXZGOztHQUVHO0FBQ1ksZ0NBQWMsR0FBcUMsSUFBSSxDQUFDO0FBRXZFOztHQUVHO0FBQ1csNkJBQVcsR0FBRyxnQkFBZ0IsQ0FBQztBQUU3Qzs7R0FFRztBQUNXLGtDQUFnQixHQUFHLGVBQWUsQ0FBQyIsImZpbGUiOiJlbnZpcm9ubWVudC1tb2R1bGVzLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==