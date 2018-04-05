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
var NavigationService = (function () {
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
    return NavigationService;
}());
export { NavigationService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9uYXZpZ2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFPLGVBQUEsQ0FBZ0I7QUFDM0MsT0FBTyxFQUFFLGNBQUEsRUFBd0MsYUFBQSxFQUFpRCxNQUFBLEVBQXlCLE1BQ2xILGlCQUFBLENBQWtCO0FBQzNCLE9BQU8sRUFBRSxVQUFBLEVBQXlCLE1BQU8sTUFBQSxDQUFPO0FBQ2hELE9BQU8sRUFPSCxPQUFPLEVBQ1AsR0FBRyxFQUVILGtCQUFrQixFQUdsQixZQUFZLEVBQ1osbUJBQW1CLEVBTXRCLE1BQU0sWUFBQSxDQUFhO0FBQ3BCLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLHVCQUFBLENBQXdCO0FBQzFELE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxjQUFBLENBQWU7QUFvQnpDLENBQUM7QUFHRjs7O0dBR0c7QUFDSDtJQXFCSTs7T0FFRztJQUNILDJCQUNZLGlCQUFvQyxFQUNwQyxNQUFjLEVBQ2QsY0FBOEI7UUFGOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBekJsQyxzQkFBaUIsR0FBcUIsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUtuRSxnQkFBVyxHQUE4QztZQUM3RCxLQUFLLEVBQUUsSUFBSTtZQUNYLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLEtBQUssRUFBRSxJQUFJO1lBQ1gsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUM7UUFDTSxzQkFBaUIsR0FBMEQ7WUFDL0UsS0FBSyxFQUFFLElBQUk7WUFDWCxhQUFhLEVBQUUsQ0FBQztZQUNoQixLQUFLLEVBQUUsSUFBSTtZQUNYLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUM7SUFRNEMsQ0FBQztJQUUvQzs7Ozs7Ozs7T0FRRztJ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