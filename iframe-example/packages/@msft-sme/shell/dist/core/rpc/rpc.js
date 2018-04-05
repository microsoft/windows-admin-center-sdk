var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Subject } from 'rxjs/Subject';
import { CoreEnvironment } from '../data/core-environment';
import { NativeQ } from '../data/native-q';
import { RpcInboundCommands, RpcOutboundCommands, RpcSeekMode, RpcType, rpcVersion } from './rpc-base';
import { RpcManager } from './rpc-manager';
/**
 * The Rpc class.
 */
var Rpc = /** @class */ (function () {
    /**
     * Initializes a new instance of the Rpc class.
     *
     * @param http the Http class instance injected.
     */
    function Rpc() {
        var _this = this;
        /**
         * Deferred response collection.
         */
        this.deferredCollection = new Map();
        /**
         * Active status of rpc by Observable.
         */
        this.stateChangedInternal = new Subject();
        /**
         * Active status of rpc.
         */
        this.stateActiveInternal = false;
        /**
         * Inbound module handlers to process when rpc is called.
         *  - called from Module to Shell.
         */
        this.rpcInboundHandlers = {
            reportHandler: function (data) {
                var result = __assign({}, data, _this.rpcManager.getSourceStatus(data.sourceName, data.sourceSubName));
                return _this.processNextForSubject(RpcInboundCommands.Report, result);
            },
            failedHandler: function (data) {
                return _this.processNextForSubject(RpcInboundCommands.Notification, data);
            },
            logHandler: function (data) {
                return _this.processNextForSubject(RpcInboundCommands.Log, data);
            },
            telemetryHandler: function (data) {
                return _this.processNextForSubject(RpcInboundCommands.Telemetry, data);
            },
            notificationHandler: function (data) {
                return _this.processNextForSubject(RpcInboundCommands.Notification, data);
            },
            forwardHandler: function (data) {
                return _this.processNextForSubject(RpcInboundCommands.Forward, data);
            },
            workItemHandler: function (data) {
                return _this.processNextForSubject(RpcInboundCommands.WorkItem, data);
            },
            updateDataHandler: function (data) {
                return _this.processNextForSubject(RpcInboundCommands.UpdateData, data);
            },
            seekHandler: function (data) {
                return Promise.resolve({ name: data.sourceName, subName: data.sourceSubName });
            },
            workItemFindHandler: function (data) {
                return _this.processNextForSubject(RpcInboundCommands.WorkItemFind, data);
            },
            shellNavigationHandler: function (data) {
                return _this.processNextForSubject(RpcInboundCommands.ShellNavigate, data);
            },
            dialogHandler: function (data) {
                return _this.processNextForSubject(RpcInboundCommands.Dialog, data);
            },
            settingsHandler: function (data) {
                return _this.processNextForSubject(RpcInboundCommands.Settings, data);
            }
        };
        /**
         * Outbound shell handlers to process when rpc is called.
         *  - called from Shell to Module.
         *  - if code reached a handler, module is not ready yet.
         *    set timeout for RPC call.
         */
        this.rpcOutboundHandlers = {
            initHandler: function (data) {
                return _this.createTimerPromise(RpcOutboundCommands.Init, Rpc.rpcTimeout, { locale: data.locale });
            },
            openHandler: function (rpcOpenData) {
                return _this.createTimerPromise(RpcOutboundCommands.Open, Rpc.rpcTimeout, rpcOpenData);
            },
            activateHandler: function (data) {
                return _this.createTimerPromise(RpcOutboundCommands.Activate, Rpc.rpcTimeout, data);
            },
            deactivate2Handler: function (data) {
                return _this.createTimerPromise(RpcOutboundCommands.Deactivate2, Rpc.rpcTimeout, data);
            },
            shutdownHandler: function (data) {
                return _this.createTimerPromise(RpcOutboundCommands.Shutdown, Rpc.rpcTimeout, data);
            },
            forwardHandler: function (data) {
                return _this.createPromise(RpcOutboundCommands.Forward, data);
            },
            pingHandler: function (data) {
                _this.changeActiveState(true);
                return Promise.resolve({ name: 'pong' });
            }
        };
        /**
         * Rpc manager object.
         */
        this.rpcManager = new RpcManager();
        this.rpcSubjects = {};
        var commands = Object.keys(RpcInboundCommands);
        commands.forEach(function (value, index, array) {
            _this.rpcSubjects[RpcInboundCommands[value]] = new Subject();
        });
    }
    Object.defineProperty(Rpc.prototype, "stateChanged", {
        /**
         * Gets observable to watch the state change.
         */
        get: function () {
            this.stateChangedInternal.next(this.stateActiveInternal);
            return this.stateChangedInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rpc.prototype, "stateActive", {
        /**
         * Gets the state of rpc.
         */
        get: function () {
            return this.stateActiveInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rpc.prototype, "isShell", {
        /**
         * Gets whether rpc is running on the shell.
         */
        get: function () {
            if (this.rpcManager.rpcChannel == null) {
                var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcNotInitialized.message;
                throw new Error(message);
            }
            return this.rpcManager.rpcChannel.rpcMode === 0 /* Shell */;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initializes Rpc configuration
     */
    Rpc.prototype.init = function () {
        this.rpcManager.init(this.rpcInboundHandlers, this.rpcOutboundHandlers);
        if (this.isShell) {
            this.changeActiveState(true);
        }
    };
    /***************************************************************
     * Section for Shell usage.
     ***************************************************************/
    /**
     * This updates its value every time there's a reported data from the rpc channel
     */
    Rpc.prototype.moduleSubjects = function (commandType) {
        return this.rpcSubjects[RpcInboundCommands[commandType]];
    };
    /**
     * Connect a module with name and iframe.
     * - start pinging to iframe to wait for response.
     *
     * @param name the name of the module.
     * @param path the path to open the module the module name.
     * @param iframe the iframe window object.
     * @param primary the primary window to affect router url.
     * @return Promise<string> the promise with subName created for the window.
     */
    Rpc.prototype.moduleConnect = function (name, path, iframe, primary) {
        return this.rpcManager.connectRpcOutbound(name, path, iframe, primary);
    };
    /**
     * Init the module.
     *
     * @param name the name of module.
     * @param subName the sub name of rpc channel.
     * @return Promise<void> the promise object of init result.
     */
    Rpc.prototype.moduleInit = function (name, subName) {
        var _this = this;
        var rpc = this.rpcManager.rpcChannel.getRpc(name, subName, RpcType.Outbound);
        var self = MsftSme.self();
        var data = {
            theme: self.Resources.theme,
            assets: self.Resources.assets,
            locale: self.Resources.localeId,
            sessionId: self.Init.sessionId,
            modules: self.Environment.modules,
            accessibilityMode: self.Resources.accessibilityMode
        };
        return rpc.init(data).then(function (result) {
            // copy the version string of remote module.
            if (result && result.version) {
                rpc.version = result.version;
            }
            _this.changeActiveState(true);
            return result;
        });
    };
    /**
     * Open the module by specifying the path and parameters.
     *
     * @param name the name of module.
     * @param subName the sub name of rpc channel.
     * @param path the open path.
     * @param parameters the parameters if any.
     * @return Promise<RpcOpenResult> the promise object of RpcOpenResult.
     */
    Rpc.prototype.moduleOpen = function (name, subName, path, parameters) {
        var rpc = this.rpcManager.rpcChannel.getRpc(name, subName, RpcType.Outbound);
        var data = {
            path: path,
            parameters: parameters
        };
        return rpc.open(data);
    };
    /**
     * Activate the module to start receiving data.
     *
     * @param name the module name.
     * @param subName the sub name of rpc channel.
     * @param primary the primary window to affect router url.
     * @return Promise<void> the promise of activation result.
     */
    Rpc.prototype.moduleActivate = function (name, subName, primary) {
        var _this = this;
        var rpc = this.rpcManager.reconnectRpcOutbound(name, subName, primary);
        return rpc.activate({}).then(function (data) {
            _this.changeActiveState(true);
            return data;
        });
    };
    /**
     * Deactivate 2 the module to stop receiving data.
     *
     * @param name the module name.
     * @param subName the sub name of rpc channel.
     * @param primary the primary window to affect router url.
     * @return Promise<void> the promise of deactivation result.
     */
    Rpc.prototype.moduleDeactivate2 = function (name, subName, primary) {
        this.changeActiveState(false);
        var rpc = this.rpcManager.rpcChannel.getRpc(name, subName, RpcType.Outbound);
        return rpc.deactivate2({});
    };
    /**
     * Request to shutdown the module.
     *
     * @param name the module name.
     * @param subName the sub name of rpc channel.
     * @param primary the primary window to affect router url.
     * @param force the forcible state.
     * @return Promise<RpcShutdownResult> the promise object of result.
     */
    Rpc.prototype.moduleShutdown = function (name, subName, primary, force) {
        var rpc = this.rpcManager.reconnectRpcOutbound(name, subName, primary);
        return rpc.shutdown({ force: force });
    };
    /**
     * Remove the module from the rpc channel.
     *
     * @param name the module name.
     * @param subName the sub name of rpc channel.
     */
    Rpc.prototype.moduleRemove = function (name, subName) {
        this.rpcManager.removeRpcOutbound(name, subName);
    };
    /**
     * Get module version string.
     *
     * @param name the name of module.
     * @param subName the sub name of rpc channel.
     * @return string the RPC version of module.
     */
    Rpc.prototype.moduleVersion = function (name, subName) {
        var rpc = this.rpcManager.rpcChannel.getRpc(name, subName, RpcType.Outbound);
        return rpc && rpc.version;
    };
    /***************************************************************
     * Section for Either usage.
     ***************************************************************/
    /**
     * report a forward update from the shell or module
     */
    Rpc.prototype.forward = function (data) {
        if (this.isShell) {
            return this.rpcManager.rpcOutbound.forward(data);
        }
        else {
            return this.rpcManager.rpcInbound.forward(data);
        }
    };
    /***************************************************************
     * Section for Module usage.
     ***************************************************************/
    /**
     * Accept delay register in case of loading/initialization took a time for module.
     *
     * @param command the RPC Shell command.
     * @param handler the handler to handle Shell request.
     */
    Rpc.prototype.register = function (command, handler) {
        var _this = this;
        var deferredData = this.deferredCollection[command];
        if (deferredData) {
            delete this.deferredCollection[command];
            handler(deferredData.data).then(deferredData.deferred.resolve, deferredData.deferred.reject);
            return;
        }
        if (command === RpcOutboundCommands.Init) {
            var modifiedHandler = function (data) {
                // node context is used before passing request to handler.
                _this.changeActiveState(true);
                var self = MsftSme.self();
                self.Init.sessionId = data.sessionId;
                self.Environment.modules = data.modules;
                if (!MsftSme.isNullOrUndefined(self.Resources.accessibilityMode) && !MsftSme.isNullOrUndefined(data.accessibilityMode)) {
                    self.Resources.accessibilityMode = data.accessibilityMode;
                    CoreEnvironment.changeAccessibilityMode(self.Resources.accessibilityMode);
                }
                CoreEnvironment.loadAssets(data.theme, data.assets);
                var localeLoader = CoreEnvironment.moduleLoadLocale(data.locale);
                var passingData = {
                    locale: data.locale,
                    sessionId: data.sessionId
                };
                return localeLoader
                    .then(function () { return _this.seekShell(RpcSeekMode.Create); })
                    .then(function () { return handler(passingData); })
                    .then(function () { return { version: rpcVersion }; });
            };
            this.rpcManager.rpcInbound.register(RpcOutboundCommands[command], modifiedHandler);
        }
        else {
            this.rpcManager.rpcInbound.register(RpcOutboundCommands[command], handler);
        }
    };
    /**
     * Module report the path update information to shell.
     */
    Rpc.prototype.report = function (data) {
        var rpc = this.rpcManager.rpcReportDataInbound;
        return rpc.report(data);
    };
    /**
     * Module report a failure.
     */
    Rpc.prototype.failed = function (data) {
        var rpc = this.rpcManager.rpcInbound;
        return rpc.failed(data);
    };
    /**
     * Module report a logging data.
     */
    Rpc.prototype.log = function (data) {
        var rpc = this.rpcManager.rpcInbound;
        return rpc.log(data);
    };
    /**
     * Module report a telemetry information.
     */
    Rpc.prototype.telemetry = function (data) {
        var rpc = this.rpcManager.rpcInbound;
        return rpc.telemetry(data);
    };
    /**
     * Module report a notification update.
     *
     * @param data the rpc notification request.
     */
    Rpc.prototype.notify = function (data) {
        var rpc = this.rpcManager.rpcInbound;
        return rpc.notify(data);
    };
    /**
     * Module submit or query a work item.
     *
     * @param data the rpc work item request.
     */
    Rpc.prototype.submitOrQueryWorkItem = function (data) {
        var rpc = this.rpcManager.rpcInbound;
        return rpc.submitOrQueryWorkItem(data);
    };
    /**
     * Module update any data results.
     *
     * @param data the rcp completed results data.
     */
    Rpc.prototype.updateData = function (name, subName, data) {
        var rpc = this.rpcManager.rpcChannel.getRpc(name, subName, RpcType.Inbound);
        if (rpc) {
            return rpc.updateData(data);
        }
        var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcNotFountInbound.message;
        return Promise.reject(message.format(name, subName));
    };
    /**
     * Seek shell frame.
     *
     * @param Promise<any> the promise object.
     */
    Rpc.prototype.seekShell = function (mode) {
        return this.rpcManager.seekShell(mode);
    };
    /**
     * Find work items.
     *
     * @param data the query notification data.
     * @return Promise<RpcWorkItemFindResult> the promise of RpcWorkItemFindResult.
     */
    Rpc.prototype.workItemFind = function (data) {
        var rpc = this.rpcManager.rpcInbound;
        return rpc.workItemFind(data);
    };
    /**
     * Shell navigation.
     *
     * @param data the navigation data to the shell.
     * @return Promise<RpcShellNavigateResult> the promise of RpcShellNavigateResult.
     */
    Rpc.prototype.shellNavigate = function (data) {
        var rpc = this.rpcManager.rpcInbound;
        return rpc.shellNavigate(data);
    };
    /**
     * The dialog request to shell.
     *
     * @param data the RpcDialogData object.
     * @return Promise<RpcDialogResult> the promise object.
     */
    Rpc.prototype.dialog = function (data) {
        var rpc = this.rpcManager.rpcInbound;
        return rpc.dialog(data);
    };
    /**
     * User Profile
     *
     * @param data the user profile operation data
     * @return Promise<RpcSettingsResult> the promise of RpcSettingsResult.
     */
    Rpc.prototype.settings = function (data) {
        var rpc = this.rpcManager.rpcInbound;
        return rpc.settings(data);
    };
    /**
     * Validate existing outbound connection and remove if it doesn't live anymore.
     *
     * @return number the count of removed outbound.
     */
    Rpc.prototype.validate = function () {
        var _this = this;
        var count = 0;
        var collection = this.rpcManager.getCurrentRpcOutbound();
        collection.forEach(function (rpc, index, array) {
            if (!_this.rpcManager.rpcChannel.validate(rpc)) {
                count++;
            }
        });
        return count;
    };
    /**
     * Change the active status of rpc.
     */
    Rpc.prototype.changeActiveState = function (state) {
        this.stateActiveInternal = state;
        this.stateChangedInternal.next(state);
    };
    /**
     * Create auto-failed timered promise.
     *
     * @param command the outbound commmand type.
     * @param timeoutMs the timeout milliseconds.
     * @param data the data context.
     * @return Promise<any> the promise.
     */
    Rpc.prototype.createTimerPromise = function (command, timeoutMs, data) {
        var _this = this;
        var deferred = NativeQ.defer();
        this.deferredCollection[command] = { deferred: deferred, data: data };
        setTimeout(function () {
            var deferredData = _this.deferredCollection[command];
            if (deferredData) {
                var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcTimeout.message;
                deferredData.deferred.reject(message);
                delete _this.deferredCollection[command];
            }
        }, timeoutMs);
        return deferred.promise;
    };
    /**
     * Create promise that does not timeout.
     *
     * @param command the outbound type.
     * @param data the data context.
     * @return Promise<any> the promise.
     */
    Rpc.prototype.createPromise = function (command, data) {
        var deferred = NativeQ.defer();
        this.deferredCollection[command] = { deferred: deferred, data: data };
        return deferred.promise;
    };
    /**
     * Process data pushing into next call of subject with defered data type.
     *
     * @param command the inbound command type.
     * @param data the rpc data came from a module/iframe.
     * @return Promise the promise which receiver must settle within fixed waiting time (10 seconds)
     */
    Rpc.prototype.processNextForSubject = function (command, data) {
        var subject = this.rpcSubjects[RpcInboundCommands[command]];
        if (subject.closed || subject.hasError) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.RpcSubjectClosed.message;
            throw new Error(message.format(RpcInboundCommands[command]));
        }
        var deferredData = {
            data: data,
            deferred: NativeQ.defer()
        };
        subject.next(deferredData);
        return deferredData.deferred.promise;
    };
    // RPC timeout 10 seconds.
    Rpc.rpcTimeout = 10 * 1000;
    return Rpc;
}());
export { Rpc };
//# sourceMappingURL=data:application/json;base64,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QUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztZQUNuRyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFFRCxJQUFJLFlBQVksR0FBaUM7WUFDN0MsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBVztTQUNyQyxDQUFDO1FBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzQixNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDekMsQ0FBQztJQTFpQkQsMEJBQTBCO0lBQ1gsY0FBVSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7SUEwaUIxQyxVQUFDO0NBNWlCRCxBQTRpQkMsSUFBQTtTQTVpQlksR0FBRyIsImZpbGUiOiJycGMuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9