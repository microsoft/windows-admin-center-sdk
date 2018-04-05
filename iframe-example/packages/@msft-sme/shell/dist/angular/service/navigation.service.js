import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NativeQ, Net, RpcDeactivateState, RpcOpenState, RpcOutboundCommands } from '../../core';
import { AppContextService } from './app-context.service';
import { Navigation } from './navigation';
;
/**
 * Once initialize this class uses the underlying RPC channel
 * to communicate with the remote RPC service.
 */
var NavigationService = /** @class */ (function () {
    /**
     * Creates a new instance of this service
     */
    function NavigationService(appContextService, router, activatedRoute) {
        this.appContextService = appContextService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.navigationOptions = { skipLocationChange: true };
        this.openContext = {
            state: null,
            requestedTime: 0,
            timer: null,
            deferred: null,
            error: null
        };
        this.deactivateContext = {
            state: null,
            requestedTime: 0,
            timer: null,
            deferred: null
        };
    }
    /**
     * Initialize navigation communication from/to the shell.
     *
     *  Registers the methods with the remote RPC defined in the manifest
     *  Subscribes to the router events and reports the breadcrumb items
     *  back to the rpc remote
     *
     * @param options The options to override the default behavior
     */
    NavigationService.prototype.initialize = function (options) {
        var _this = this;
        this.active = true;
        this.options = options ? options : { idleRoute: ['idle'] };
        // navigate to idle.
        this.router.navigate(this.options.idleRoute, this.navigationOptions);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .switchMap(function (event) { return Navigation.buildSelectablePathsForRoute(_this.appContextService, _this.activatedRoute.snapshot)
            .map(function (selectablePaths) { return ({ event: event, selectablePaths: selectablePaths }); }); })
            .subscribe(function (data) {
            // in the case of initial idle state, reporting url will cause rpc error. all other cases should be ok.
            if (_this.active && data.event.url !== ("/" + _this.options.idleRoute)) {
                _this.appContextService.rpc.report({
                    path: decodeURI(data.event.urlAfterRedirects),
                    beforeRedirectedPath: decodeURI(data.event.url),
                    selectablePath: data.selectablePaths
                });
            }
        });
        this.appContextService.rpc.register(RpcOutboundCommands.Init, this.onInit.bind(this));
        this.appContextService.rpc.register(RpcOutboundCommands.Open, this.onOpen.bind(this));
        this.appContextService.rpc.register(RpcOutboundCommands.Deactivate2, this.onDeactivate2.bind(this));
        this.appContextService.rpc.register(RpcOutboundCommands.Activate, this.onActivate.bind(this));
        this.appContextService.rpc.register(RpcOutboundCommands.Shutdown, this.onShutdown.bind(this));
    };
    /**
     * Shutdown the navigation communication from/to the shell.
     */
    NavigationService.prototype.shutdown = function () {
        this.active = false;
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    };
    NavigationService.prototype.onInit = function (data) {
        this.active = true;
        return Promise.resolve();
    };
    /**
     * Repeated open called until navigation is established or failed.
     *
     * @param data the RpcOpenData data.
     */
    NavigationService.prototype.onOpen = function (data) {
        var _this = this;
        var context = this.openContext;
        if (context.state != null) {
            var result = {
                waitedTime: Date.now() - context.requestedTime,
                state: this.openContext.state,
                error: context.error
            };
            if (context.state !== RpcOpenState.InProgress) {
                context.state = null;
                context.requestedTime = null;
            }
            return Promise.resolve(result);
        }
        context.requestedTime = Date.now();
        context.state = RpcOpenState.InProgress;
        context.deferred = NativeQ.defer();
        // set timeout to respond back status to shell.
        context.timer = setTimeout(function () {
            context.deferred.resolve({
                waitedTime: Date.now() - context.requestedTime,
                state: context.state
            });
            context.timer = null;
            context.deferred = null;
        }, NavigationService.initialWaitTime);
        this.appContextService.servicesReady
            .take(1)
            .flatMap(function () {
            var commands = [decodeURI(data.path)];
            if (data.parameters) {
                commands.push(data.parameters);
            }
            return _this.router.navigate(commands, _this.navigationOptions);
        })
            .map(function (success) {
            context.state = RpcOpenState.Opened;
            // if timer isn't fired yet, just complete with success navigation.
            if (context.timer) {
                clearTimeout(context.timer);
                context.deferred.resolve({
                    waitedTime: Date.now() - context.requestedTime,
                    state: context.state,
                    error: context.error
                });
                context.state = null;
                context.requestedTime = null;
                context.timer = null;
                context.deferred = null;
            }
        })
            .catch(function (error, caught) {
            context.state = RpcOpenState.Failed;
            var message = '';
            if (error && error.xhr) {
                message = Net.getErrorMessage(error);
            }
            else if (typeof error === 'string') {
                message = error;
            }
            else {
                if (error.stack) {
                    message = error.stack;
                }
                else if (error.message) {
                    message = error.message;
                }
            }
            context.error = message;
            // if timer isn't fired yet, just complete with error navigation.
            if (context.timer) {
                clearTimeout(context.timer);
                context.deferred.reject(context.error);
                context.state = null;
                context.requestedTime = null;
                context.timer = null;
                context.deferred = null;
            }
            return Observable.empty();
        })
            .subscribe();
        return context.deferred.promise;
    };
    /**
     * Repeated called until Guard is continued or cancelled.
     *
     * @param data the void data.
     */
    NavigationService.prototype.onDeactivate2 = function (data) {
        var _this = this;
        var context = this.deactivateContext;
        if (context.state != null) {
            var result = {
                waitedTime: Date.now() - context.requestedTime,
                state: context.state
            };
            if (context.state !== RpcDeactivateState.InProgress) {
                context.state = null;
                context.requestedTime = null;
            }
            return Promise.resolve(result);
        }
        // it's already inactive.
        if (!this.active) {
            return Promise.resolve({
                waitedTime: 0,
                state: RpcDeactivateState.Deactivated
            });
        }
        this.active = false;
        var current = decodeURI(this.router.url);
        context.requestedTime = Date.now();
        context.state = RpcDeactivateState.InProgress;
        context.deferred = NativeQ.defer();
        // set timeout to respond back status to shell.
        context.timer = setTimeout(function () {
            context.deferred.resolve({
                waitedTime: Date.now() - context.requestedTime,
                state: context.state
            });
            context.timer = null;
            context.deferred = null;
            // if it isn't in progress, reset the state.
            if (context.state !== RpcDeactivateState.InProgress) {
                context.state = null;
                context.requestedTime = null;
            }
        }, NavigationService.initialWaitTime);
        // try navigate to idle.
        this.router.navigate(this.options.idleRoute, this.navigationOptions)
            .then(function (success) {
            if (success) {
                // navigate away so inactive mode.
                _this.lastRoute = [current];
                context.state = RpcDeactivateState.Deactivated;
            }
            else {
                // navigate cancel so active mode.
                _this.active = true;
                context.state = RpcDeactivateState.Cancelled;
            }
            // if timer isn't fired yet, just complete with success navigation.
            if (context.timer) {
                clearTimeout(context.timer);
                context.deferred.resolve({
                    waitedTime: Date.now() - context.requestedTime,
                    state: context.state
                });
                context.timer = null;
                context.deferred = null;
                context.state = null;
                context.requestedTime = null;
            }
        });
        return context.deferred.promise;
    };
    NavigationService.prototype.onActivate = function (data) {
        var newRoute = this.lastRoute || [''];
        this.active = true;
        return this.router.navigate(newRoute, this.navigationOptions);
    };
    NavigationService.prototype.onShutdown = function (data) {
        return this.router.navigate(this.options.idleRoute, this.navigationOptions)
            .then(function (result) { return { canShutdown: result }; });
    };
    NavigationService.initialWaitTime = 2000;
    NavigationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: Router, },
        { type: ActivatedRoute, },
    ]; };
    return NavigationService;
}());
export { NavigationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9uYXZpZ2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFPLGVBQUEsQ0FBZ0I7QUFDM0MsT0FBTyxFQUFFLGNBQUEsRUFBd0MsYUFBQSxFQUFpRCxNQUFBLEVBQXlCLE1BQ2xILGlCQUFBLENBQWtCO0FBQzNCLE9BQU8sRUFBRSxVQUFBLEVBQXlCLE1BQU8sTUFBQSxDQUFPO0FBQ2hELE9BQU8sRUFPSCxPQUFPLEVBQ1AsR0FBRyxFQUVILGtCQUFrQixFQUdsQixZQUFZLEVBQ1osbUJBQW1CLEVBTXRCLE1BQU0sWUFBQSxDQUFhO0FBQ3BCLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLHVCQUFBLENBQXdCO0FBQzFELE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxjQUFBLENBQWU7QUFvQnpDLENBQUM7QUFHRjs7O0dBR0c7QUFDSDtJQXFCSTs7T0FFRztJQUNILDJCQUNZLGlCQUFvQyxFQUNwQyxNQUFjLEVBQ2QsY0FBOEI7UUFGOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBekJsQyxzQkFBaUIsR0FBcUIsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUtuRSxnQkFBVyxHQUE4QztZQUM3RCxLQUFLLEVBQUUsSUFBSTtZQUNYLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLEtBQUssRUFBRSxJQUFJO1lBQ1gsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUM7UUFDTSxzQkFBaUIsR0FBMEQ7WUFDL0UsS0FBSyxFQUFFLElBQUk7WUFDWCxhQUFhLEVBQUUsQ0FBQztZQUNoQixLQUFLLEVBQUUsSUFBSTtZQUNYLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUM7SUFRNEMsQ0FBQztJQUUvQzs7Ozs7Ozs7T0FRRztJ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