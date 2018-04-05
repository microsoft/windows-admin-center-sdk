var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Observable } from 'rxjs';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { Disposer } from './disposable';
import { Net } from './net';
/**
 * The PowerShellSession class.
 */
var PowerShellSession = /** @class */ (function () {
    function PowerShellSession(powerShell, lifetime) {
        this.powerShell = powerShell;
        this.lifetime = lifetime;
    }
    Object.defineProperty(PowerShellSession.prototype, "nodeName", {
        /**
         * Gets the node name of session.
         */
        get: function () {
            return this.powerShell.nodeName;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose the session object.
     */
    PowerShellSession.prototype.dispose = function () {
        if (this.lifetime) {
            this.lifetime.dispose();
        }
    };
    return PowerShellSession;
}());
export { PowerShellSession };
/**
 * Class containing methods related to PowerShell runspace creation/deletion/command using PowerShell Raw API plugin.
 *  - It's auto holding the session as long as it's used within last 3 minutes.
 */
var PowerShellRaw = /** @class */ (function () {
    /**
     * Initializes a new instance of the PowerShellRaw class.
     *
     * @param nodeConnection The node connection service.
     * @param context The context of PowerShell run.
     */
    function PowerShellRaw(nodeConnection, context) {
        this.nodeConnection = nodeConnection;
        this.context = context;
        this.timestampInMs = 0;
        this.markDelete = false;
        this.internalActive = false;
        this.cancelPending = false;
    }
    Object.defineProperty(PowerShellRaw.prototype, "active", {
        /**
         * Gets active status of PowerShell execution.
         */
        get: function () {
            return this.internalActive;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose the runspace.
     */
    PowerShellRaw.prototype.dispose = function () {
        if (!this.active) {
            // only close sessions that have been created.
            // If a result was cached a component may not
            // execute a command and still dispose the session
            // when the component is destroyed.
            if (this.sessionId) {
                this.close().subscribe();
            }
        }
        else {
            this.markDelete = true;
        }
    };
    /*
     * Runs the given command
     *
     * @param command The command to execute.
     */
    PowerShellRaw.prototype.runCommand = function (command, options) {
        var _this = this;
        // take the timestamp only success/healthy case.
        // error session would be auto-deleted after expiration time.
        this.internalActive = true;
        return this.command(command, options)
            .catch(function (error, caught) {
            _this.internalActive = false;
            return Observable.throw(error);
        })
            .expand(function (data, index) {
            _this.timestampInMs = Date.now();
            if (_this.checkCompleted(data)) {
                return Observable.empty();
            }
            if (_this.cancelPending) {
                // submit cancel request.
                // after set active state to false and complete the observable.
                _this.cancelPending = false;
                return _this.cancel()
                    .catch(function (error, caught) {
                    _this.internalActive = false;
                    return Observable.empty();
                })
                    .flatMap(function (x) {
                    _this.internalActive = false;
                    return Observable.empty();
                });
            }
            var url = Net.powerShellApiRetrieveOutput.format(_this.sessionId);
            return _this.nodeConnection.get(_this.context.nodeName, url, _this.context.requestOptions);
        });
    };
    /**
     * Close/Delete the session / runspace.
     */
    PowerShellRaw.prototype.close = function () {
        if (this.sessionId) {
            var sessionUri = Net.powerShellApiSessions.format(this.sessionId);
            this.sessionId = null;
            return this.nodeConnection.delete(this.context.nodeName, sessionUri, null, this.context.requestOptions);
        }
        Logging.log({
            level: LogLevel.Verbose,
            source: 'PowerShell/close',
            message: MsftSme.resourcesStrings().MsftSmeShell.Core.Error.PowerShellUnableSessionClose.message
        });
        return Observable.of(null);
    };
    /**
     * Cancel the command.
     */
    PowerShellRaw.prototype.cancelCommand = function () {
        if (this.internalActive) {
            this.cancelPending = true;
        }
        return Observable.empty();
    };
    PowerShellRaw.prototype.cancel = function () {
        if (this.sessionId && this.internalActive) {
            var cancelUri = Net.powerShellApiCancelCommand.format(this.sessionId);
            return this.nodeConnection.post(this.context.nodeName, cancelUri, null, this.context.requestOptions);
        }
        Logging.log({
            level: LogLevel.Warning,
            source: 'PowerShell',
            message: MsftSme.resourcesStrings().MsftSmeShell.Core.Error.PowerShellUnableCancelCommand.message
        });
        return Observable.empty();
    };
    Object.defineProperty(PowerShellRaw.prototype, "_isExpired", {
        /**
         * Gets if timestamp was expired.
         */
        get: function () {
            var now = Date.now();
            return this.timestampInMs !== 0 && (now - this.timestampInMs) > PowerShellRaw.maxDeltaTimeInMs;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initiate command execution. It auto recycles old sessions.
     *
     * @param command the PowerShell command.
     */
    PowerShellRaw.prototype.command = function (command, options) {
        var data = Net.createPropertiesJSONString(command.command ? command : { command: command.script });
        var newOptions = __assign({}, this.context.requestOptions, {
            logAudit: options && options.logAudit,
            logTelemetry: options && options.logTelemetry
        });
        if (this.sessionId == null || this._isExpired) {
            this.sessionId = null;
            var generatedName = (this.context.key ? this.context.key : 'X') + MsftSme.newGuid();
            var sessionUri = Net.powerShellApiSessions.format(generatedName);
            return this.nodeConnection.put(this.context.nodeName, sessionUri, data, newOptions);
        }
        else {
            var executeUri = Net.powerShellApiExecuteCommand.format(this.sessionId);
            return this.nodeConnection.post(this.context.nodeName, executeUri, data, newOptions);
        }
    };
    PowerShellRaw.prototype.checkCompleted = function (data) {
        var properties = Net.getItemProperties(data);
        if (properties.sessionId) {
            // keep the PS session GUID
            this.sessionId = properties.sessionId;
        }
        if (properties.completed.toLowerCase() === 'true') {
            this.internalActive = false;
            if (this.markDelete) {
                this.close().subscribe();
            }
            return true;
        }
        return false;
    };
    // 3 minutes holding time.
    PowerShellRaw.maxDeltaTimeInMs = 3 * 60 * 1000;
    return PowerShellRaw;
}());
export { PowerShellRaw };
/**
 * The PowerShell class.
 *
 * - Single instance of PowerShell class manages single runspace.
 * - It queues coming requests and process one at a time sequentially.
 * - If a command is slow and causing with multiple responses, it aggregates response into single Q result.
 * - A PowerShell instance should be created through create() function, and it's statically stored/managed into _map collection.
 * - In QueryCache operation, it can find the PowerShell instance to run PowerShell command by using find() function.
 * - Once all lifetime references are gone, it deletes the runspace.
 * - To dispose the PowerShell instance, it can use lifetime.dispose().
 */
var PowerShell = /** @class */ (function () {
    /**
     * Initializes a new instance of the PowerShell class.
     * (private constructor which shouldn't be called directly.)
     *
     * @param nodeConnection The node connection service.
     * @param key The shared key to queue the requests to use the single runspace.
     * @param lifetime The lifetime container.
     */
    function PowerShell(nodeName, nodeConnection, key, lifetime, options) {
        var _this = this;
        /**
         * The queue of PowerShell command requests.
         */
        this.queue = [];
        this.context = {
            nodeName: nodeName,
            key: key,
            lifetimes: [],
            requestOptions: options
        };
        this.timestamp = 0;
        this.raw = new PowerShellRaw(nodeConnection, this.context);
        if (key && lifetime) {
            lifetime.registerForDispose(new Disposer(function () { return _this.lifetimeDisposer(lifetime); }));
            this.context.lifetimes.push(lifetime);
        }
    }
    /**
     * Create script as string.
     *
     * @param resource the script text from legacy ps-code converter.
     * @param parameters the arguments.
     * @param flags (optional) the switch flags.
     */
    PowerShell.createScript = function (script, parameters, flags) {
        script = 'function cvt ($o) { return ConvertFrom-Json $o }\n function SmeSubmit {\n' + script + '}\n SmeSubmit';
        for (var parameter in parameters) {
            if (parameters.hasOwnProperty(parameter)) {
                script += ' -{0} (cvt \'{1}\')'.format(parameter, JSON.stringify(parameters[parameter]).replace(PowerShell.escapeRegex, '\'\''));
            }
        }
        if (flags) {
            for (var i = 0; i < flags.length; i++) {
                script += ' -{0}'.format(flags[i]);
            }
        }
        return script;
    };
    /**
     * Create PowerShell request command.
     * (It creates a command object of JEA PowerShell request under restricted user role environment.)
     *
     * @param resource the script resource object with command and script data from new ps-code converter.
     * @param parameters the arguments.
     * @param flags (optional) the switch flags.
     * @return PowerShellCommand the PowerShell request command object.
     */
    PowerShell.createCommand = function (resource, parameters, flags) {
        var script = 'function cvt ($o) { return ConvertFrom-Json $o }\n function SmeSubmit {\n' + resource.script + '}\n SmeSubmit';
        for (var parameter in parameters) {
            if (parameters.hasOwnProperty(parameter)) {
                script += ' -{0} (cvt \'{1}\')'.format(parameter, JSON.stringify(parameters[parameter]).replace(PowerShell.escapeRegex, '\'\''));
            }
        }
        var flagParameters = {};
        if (flags) {
            for (var i = 0; i < flags.length; i++) {
                script += ' -{0}'.format(flags[i]);
                flagParameters[flags[i]] = true;
            }
        }
        return {
            module: resource.module,
            command: resource.command,
            parameters: __assign({}, flagParameters, parameters),
            script: script
        };
    };
    PowerShell.create = function (nodeName, nodeConnection, key, lifetime, requestOptions) {
        var ps;
        if (key && lifetime) {
            ps = PowerShell.map[PowerShell.indexName(nodeName, key)];
            if (ps) {
                ps.addLifetime(lifetime);
                return ps;
            }
        }
        ps = new PowerShell(nodeName, nodeConnection, key, lifetime, requestOptions);
        if (key && lifetime) {
            PowerShell.map[this.indexName(nodeName, key)] = ps;
        }
        return ps;
    };
    /**
     * Find existing PowerShell object. Create call must be called before to create the PowerShell instance.
     *
     * @param nodeName The node name.
     * @param key The shared key to queue the requests to use the single runspace.
     */
    PowerShell.find = function (nodeName, key) {
        return PowerShell.map[PowerShell.indexName(nodeName, key)];
    };
    /**
     * Create the index name in map collection.
     *
     * @param nodeName The node name.
     * @param key The shared key to queue the requests to use the single runspace.
     */
    PowerShell.indexName = function (nodeName, key) {
        return nodeName + ':' + key;
    };
    Object.defineProperty(PowerShell.prototype, "nodeName", {
        /**
         * Gets node name from current context.
         */
        get: function () {
            return this.context.nodeName;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Run PowerShell command.
     *
     * @param command The command.
     * @param options The options.
     * @return PromiseV The result of PowerShell command.
     */
    PowerShell.prototype.run = function (scriptOrCommand, options) {
        var command = typeof scriptOrCommand === 'string' ?
            { script: scriptOrCommand } : scriptOrCommand;
        if (this.context.lifetimes.length === 0) {
            // no disposer is assigned, force to close the session after every query.
            var timeoutMs = options && options.timeoutMs;
            if (options) {
                options.timeoutMs = timeoutMs;
                options.close = true;
            }
            else {
                options = { timeoutMs: timeoutMs, close: true };
            }
        }
        // queue the request.
        var observable = this.enqueue(command, options);
        return observable;
    };
    /**
     * Cancel PowerShell command.
     */
    PowerShell.prototype.cancel = function () {
        return this.raw.cancelCommand();
    };
    /**
     * Enqueue a command request.
     *
     * @param command The command.
     * @param options The options.
     */
    PowerShell.prototype.enqueue = function (command, options) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.queue.push({ observer: observer, command: command, options: options });
            _this.dequeue();
        });
    };
    /**
     * Dequeue a command request.
     */
    PowerShell.prototype.dequeue = function () {
        var _this = this;
        if (this.raw.active) {
            return false;
        }
        var item = this.queue.shift();
        if (item) {
            this.currentData = null;
            this.timestamp = Date.now();
            this.raw.runCommand(item.command, item.options).subscribe(function (data) {
                var properties = Net.getItemProperties(data);
                _this.collect(properties, item.options && item.options.timeoutMs, item.options && item.options.partial ? item.observer : null);
            }, function (error) {
                if (item.options && item.options.close) {
                    _this.raw.close().subscribe();
                }
                item.observer.error(error);
                _this.timestamp = 0;
                _this.dequeue();
            }, function () {
                if (item.options && item.options.close) {
                    _this.raw.close().subscribe();
                }
                if (!item.options || !item.options.partial) {
                    item.observer.next(_this.currentData);
                }
                item.observer.complete();
                _this.timestamp = 0;
                _this.dequeue();
            });
            return true;
        }
        return false;
    };
    /**
     * Collect response result and aggregate into single object.
     *
     * @param properties The properties of response object.
     * @param timeoutMs The timeout to cancel command.
     * @param observer The observer of powershell results.
     */
    PowerShell.prototype.collect = function (properties, timeoutMs, observer) {
        if (timeoutMs && this.timestamp && (Date.now() - this.timestamp > timeoutMs)) {
            // force to cancel the command because of unexpected longer execution.
            this.raw.cancelCommand();
            this.timestamp = 0;
            return;
        }
        if (observer) {
            // return partial data if observer is not null.
            observer.next(properties);
            this.currentData = properties;
            return;
        }
        if (this.currentData != null && this.currentData.results && properties.results) {
            var array_1;
            if (MsftSme.getTypeOf(this.currentData.results) === 'array') {
                array_1 = this.currentData.results;
            }
            else {
                array_1 = [this.currentData.results];
            }
            if (MsftSme.getTypeOf(properties.results) === 'array') {
                properties.results.forEach(function (x) {
                    array_1.push(x);
                });
            }
            else {
                array_1.push(properties.results);
            }
            this.currentData.results = array_1;
            return;
        }
        this.currentData = properties;
    };
    /**
     * Attach lifetime object to disposer when disposing.
     *
     * @param lifetime The lifetime object.
     */
    PowerShell.prototype.addLifetime = function (lifetime) {
        var _this = this;
        var found = MsftSme.find(this.context.lifetimes, function (value) { return value === lifetime; });
        if (!found) {
            this.context.lifetimes.push(lifetime);
            lifetime.registerForDispose(new Disposer(function () { return _this.lifetimeDisposer(lifetime); }));
        }
    };
    /**
     * Callback when disposing the container of view model.
     * If none, reference the PowerShell object. Dispose it. (Delete runspace)
     *
     * @param lifetime The lifetime object.
     */
    PowerShell.prototype.lifetimeDisposer = function (lifetime) {
        var found = MsftSme.find(this.context.lifetimes, function (value) { return value === lifetime; });
        if (found) {
            MsftSme.remove(this.context.lifetimes, lifetime);
            if (this.context.lifetimes.length === 0) {
                // cancel queue command requests.
                this.queue.forEach(function (value, index, array) {
                    value.observer.next(null);
                    value.observer.complete();
                });
                // delete from the map collection and delete the runspace/session.
                delete PowerShell.map[PowerShell.indexName(this.context.nodeName, this.context.key)];
                this.raw.dispose();
            }
        }
    };
    /**
     * Static collection of PowerShell objects.
     */
    PowerShell.map = {};
    /**
     * Regular expression to match all the occurrences of a single quote
     */
    PowerShell.escapeRegex = new RegExp('\'', 'g');
    return PowerShell;
}());
export { PowerShell };
//# sourceMappingURL=data:application/json;base64,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QUFJLEtBQUssR0FBOEIsT0FBTyxDQUFDLElBQUksQ0FDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBQyxLQUFnQyxJQUFLLE9BQUEsS0FBSyxLQUFLLFFBQVEsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO1FBQ3RGLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNULElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxRQUFRLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDLENBQUM7UUFDckYsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLHFDQUFnQixHQUF4QixVQUF5QixRQUFtQztRQUN4RCxJQUFJLEtBQUssR0FBOEIsT0FBTyxDQUFDLElBQUksQ0FDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBQyxLQUFnQyxJQUFLLE9BQUEsS0FBSyxLQUFLLFFBQVEsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO1FBQ3RGLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxpQ0FBaUM7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBNEIsRUFBRSxLQUFhLEVBQUUsS0FBOEI7b0JBQzNGLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMxQixLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5QixDQUFDLENBQUMsQ0FBQztnQkFFSCxrRUFBa0U7Z0JBQ2xFLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDckYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN2QixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUF2WEQ7O09BRUc7SUFDWSxjQUFHLEdBQWtDLEVBQUUsQ0FBQztJQUV2RDs7T0FFRztJQUNZLHNCQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBZ1h2RCxpQkFBQztDQXpYRCxBQXlYQyxJQUFBO1NBelhZLFVBQVUiLCJmaWxlIjoicG93ZXJzaGVsbC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=