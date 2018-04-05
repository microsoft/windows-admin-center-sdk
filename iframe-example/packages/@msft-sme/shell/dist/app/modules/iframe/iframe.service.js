import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AsyncSubject, Observable, Subject } from 'rxjs';
import { AppContextService } from '../../../angular';
import { EnvironmentModule, Logging, LogLevel, NativeQ, RpcDeactivateState, RpcOpenState } from '../../../core';
import { AppBarService } from '../app-bar/app-bar.service';
import { FrameDataEventType, IFrameCache } from './iframe-cache';
/**
 * The global frames service.
 */
var IFrameService = /** @class */ (function () {
    /**
     * Initializes a new instance of the IFrameService class.
     *
     * @param appContextService the application context service.
     * @param location the Location object.
     * @param route the activate route.
     * @param router the router object.
     * @param appBarService the header service.
     */
    function IFrameService(appContextService, location, route, router, appBarService) {
        this.appContextService = appContextService;
        this.location = location;
        this.route = route;
        this.router = router;
        this.appBarService = appBarService;
        this.frameDataEvent = new Subject();
        this.strings = MsftSme.resourcesStrings();
        this.cache = new IFrameCache();
        this.openPollingCancel = false;
    }
    /**
     * Initializes set of frames.
     * - This should be called by levelx-frame.component.
     *
     * @param setId the identity of frame set.
     * @param count the count of frames in the set.
     * @param primary the primary outlet to connect header breadcrumb bar.
     * @param routerHandlers the router handlers.
     */
    IFrameService.prototype.init = function (setId, count, primary, routerHandlers) {
        this.cache.init(setId, count, primary, routerHandlers);
    };
    /**
     * Exit the set of frames management.
     * - This should be called by levelx-frame.component.
     *
     * @param setId the identity of frame set.
     */
    IFrameService.prototype.exit = function (setId) {
        return this.clean(setId, true);
    };
    /**
     * Open or update to a module from the iframe component.
     * - This should be called by iframeX.component.
     *
     * @param setId the identity of frame set.
     * @param name the module name.
     * @return FrameDataEvent the event object sent to set-frame component.
     */
    IFrameService.prototype.open = function (setId, name, entryPoint, openPath) {
        var frameDataEvent = this.cache.update(setId, name, entryPoint, openPath);
        // Execute deactivate, unload and load parallel by using forkJoin().
        switch (frameDataEvent.type) {
            case FrameDataEventType.AddOnly:
                this.routerUnsubscribe(setId);
                frameDataEvent.deferred = new AsyncSubject();
                frameDataEvent.callback = this.mapModuleToFrame.bind(this);
                this.frameDataEvent.next(frameDataEvent);
                return frameDataEvent.deferred;
            case FrameDataEventType.PushedOut:
                var unload = frameDataEvent.unloadFrameData ? this.unloadFrame(frameDataEvent.unloadFrameData) : Observable.of(null);
                this.routerUnsubscribe(setId);
                frameDataEvent.deferred = new AsyncSubject();
                frameDataEvent.callback = this.mapModuleToFrame.bind(this);
                this.frameDataEvent.next(frameDataEvent);
                // unload.subscribe();
                return Observable.forkJoin(unload, frameDataEvent.deferred, function (p0, p1) { return p1; });
            case FrameDataEventType.Swap:
                this.routerUnsubscribe(setId);
                frameDataEvent.deferred = new AsyncSubject();
                frameDataEvent.callback = this.reopenModule.bind(this);
                this.frameDataEvent.next(frameDataEvent);
                return frameDataEvent.deferred;
            case FrameDataEventType.Noop:
                break;
        }
        return Observable.of(frameDataEvent);
    };
    /**
     * Cancel current attempt of opening the module.
     */
    IFrameService.prototype.cancel = function () {
        this.openPollingCancel = true;
    };
    /**
     * Close the iframe component so all frames must be unloaded.
     * - This should be called by iframeX.component.
     *
     * @param setId the identity of frame set.
     * @param full making the full clean to reset the cache state.
     */
    IFrameService.prototype.close = function (setId) {
        return this.clean(setId, false);
    };
    /**
     * Create a single instant frame data.
     *
     * @param name the name of the module.
     * @param path the path to open the module.
     * @param element the element object.
     * @param frame the frame object.
     * @param setId the set id of frames. (single frame for this case)
     * @return Observable<FrameData> the observable of FrameData.
     */
    /* tslint:disable-next-line */
    IFrameService.prototype.openSingle = function (name, entryPoint, openPath, element, frame, setId) {
        var frameData = { id: 0, setId: setId, name: name, entryPoint: entryPoint, openPath: openPath, loadedDeferred: NativeQ.defer() };
        var frameDataEvent = { frameData: frameData, deferred: new AsyncSubject() };
        var setData = this.cache.getSetData(setId);
        setData.frameDataCollection[frameData.id] = frameData;
        setData.activeIndex = frameData.id;
        return this.mapModuleToFrame(frameDataEvent, element, frame).map(function (eventData) { return eventData.frameData; });
    };
    /**
     * Create a single instant frame data.
     *
     * @param name the name of the module.
     * @param path the path to open the module.
     * @param element the element object.
     * @param frame the frame object.
     */
    IFrameService.prototype.closeSingle = function (frameData) {
        return this.unloadFrame(frameData);
    };
    /**
     * Can deactivate tool.
     *
     * @param frameId: the frame ID.
     * @param currentRoute current activated route snapshot.
     * @param currentState current router state.
     * @param nextState next state.
     */
    IFrameService.prototype.canDeactivateToolOnFrame = function (frameId, appContext, currentRoute, currentState, nextState) {
        var _this = this;
        var setData = this.cache.getSetData(frameId);
        if (!setData || setData.activeIndex == null || setData.frameDataCollection[setData.activeIndex] == null) {
            // there is no active frame, no need to deactivate.
            return Observable.of(true);
        }
        var activeFrame = setData.frameDataCollection[setData.activeIndex];
        return Observable.fromPromise(activeFrame.loadedDeferred.promise).flatMap(function () {
            return _this.deactivateFramePolling(activeFrame);
        });
    };
    /**
     * Deactivate frame by polling.
     *
     * @param frameData the frame data.
     * @return Observable<boolean> the deactivate result.
     */
    IFrameService.prototype.deactivateFramePolling = function (frameData) {
        var _this = this;
        var oneSecond = 1000; // one second.
        var name = frameData.name, subName = frameData.subName;
        // call moduleDeactivate until it settled down to Deactivated or Canceled with 1 second interval.
        var setData = this.cache.getSetData(frameData.setId);
        return Observable.fromPromise(this.appContextService.rpc.moduleDeactivate2(name, subName, setData.primary))
            .expand(function (value, index) {
            return Observable.of(value)
                .delay(oneSecond)
                .switchMap(function () { return _this.appContextService.rpc.moduleDeactivate2(name, subName, setData.primary); });
        })
            .filter(function (value, index) { return value.state !== RpcDeactivateState.InProgress; })
            .map(function (value) { return value.state === RpcDeactivateState.Deactivated; })
            .take(1);
    };
    /**
     * Open frame by polling.
     *
     * @param frameData the frame data.
     * @return Observable<boolean> the open result.
     */
    IFrameService.prototype.openFramePolling = function (frameData, path, parameters) {
        var _this = this;
        var oneSecond = 1000; // one second.
        var name = frameData.name, subName = frameData.subName;
        this.openPollingCancel = false;
        // call moduleOpen until it settled down to Opened or Failed with 1 second interval.
        var setData = this.cache.getSetData(frameData.setId);
        return Observable.fromPromise(this.appContextService.rpc.moduleOpen(name, subName, path, parameters))
            .expand(function (value, index) {
            if (typeof value === 'boolean') {
                // older version passing here.
                return Observable.empty();
            }
            if (_this.openPollingCancel) {
                return Observable.of({
                    state: RpcOpenState.Failed, waitedTime: 0, error: _this.strings.MsftSmeShell.App.IFrame.LoadingCanceled.message
                });
            }
            return Observable.of(value)
                .delay(oneSecond)
                .switchMap(function () { return _this.appContextService.rpc.moduleOpen(name, subName, path, parameters); });
        })
            .filter(function (value, index) { return typeof value === 'boolean' || value.state !== RpcOpenState.InProgress; })
            .flatMap(function (value) {
            if (typeof value === 'boolean' || value.state === RpcOpenState.Opened) {
                return Observable.of(true);
            }
            return Observable.throw(value.error);
        })
            .take(1);
    };
    /**
     * Clean the iframe component so all frames must be unloaded.
     *
     * @param setId the identity of frame set.
     * @param full making the full clean to reset the cache state.
     */
    IFrameService.prototype.clean = function (setId, full) {
        var _this = this;
        var setData = this.cache.getSetData(setId);
        if (!setData) {
            return Promise.resolve();
        }
        if (setData.routerSubscription) {
            setData.routerSubscription.unsubscribe();
            setData.routerSubscription = null;
        }
        setData.activeIndex = null;
        var frameDataCollection = setData.frameDataCollection.slice();
        this.cache.clean(setId, full);
        return Observable.from(frameDataCollection)
            .filter(function (frameData) { return frameData != null; })
            .forEach(function (frameData) {
            // At the time of ngOnDestroy() from the parent component,
            // it cannot let Angular to wait for this clean call to complete.
            // Unload happens automatically background, so this unload cannot be
            // monitored properly. Deactivate command cannot be sent at that time.
            _this.unload(frameData);
        });
    };
    IFrameService.prototype.unloadFrame = function (frameData) {
        var _this = this;
        Logging.log({
            source: 'IFrameService', level: LogLevel.Verbose, message: 'unloadFrame: {0}'.format(frameData.name)
        });
        var setData = this.cache.getSetData(frameData.setId);
        // deactivate could be no response, just unload the frame without waiting for it.
        return Observable.fromPromise(this.appContextService.rpc.moduleDeactivate2(frameData.name, frameData.subName, setData.primary)
            .then(function (x) { return _this.unload(frameData); })
            .then(function (data) { return frameData; }));
    };
    IFrameService.prototype.mapModuleToFrame = function (frameDataEvent, element, frame) {
        var _this = this;
        var frameData = frameDataEvent.frameData;
        var setData = this.cache.getSetData(frameData.setId);
        frameData.module = EnvironmentModule.getEnvironmentModule(frameData.name);
        if (frameData.module) {
            if (frameData.element) {
                Logging.trace({
                    view: 'sme-iframe',
                    instance: frameData.module.name,
                    action: 'moduleOpen',
                    data: { name: frameData.module.displayName, entryName: frameData.entryPoint && frameData.entryPoint.displayName }
                });
                // don't need to reload the frame, but open up the view.
                var openPath = (setData.routerHandlers && setData.routerHandlers.getInnerPath(this.route, this.router, frameData))
                    || frameData.openPath;
                this.appContextService.rpc.moduleOpen(frameData.name, frameData.subName, openPath);
                return;
            }
            Logging.trace({
                view: 'sme-iframe',
                instance: frameData.module.name,
                action: 'ngOnInit',
                data: { name: frameData.module.displayName, entryName: frameData.entryPoint && frameData.entryPoint.displayName }
            });
            frameData.path = this.location.normalize(Location.joinWithSlash(frameData.module.origin, frameData.module.target));
            frameData.element = element;
            frameData.frame = frame;
            frameData.load = function (event) { return _this.onload(event, frameDataEvent); };
            frameData.element.contentWindow.location.href = frameData.path + this.moduleVersionParameter(frameData);
            frameData.element.addEventListener('load', frameData.load, true);
            frameData.loadedDeferred.promise.then(function (data) {
                frameDataEvent.deferred.next(frameDataEvent);
                frameDataEvent.deferred.complete();
            }, function (error) {
                frameDataEvent.error = error;
                frameDataEvent.deferred.next(frameDataEvent);
                frameDataEvent.deferred.complete();
            });
            return frameDataEvent.deferred;
        }
        frameDataEvent.error = 'module not found.';
        frameDataEvent.deferred.next(frameDataEvent);
        frameDataEvent.deferred.complete();
        return Observable.of(frameDataEvent);
    };
    IFrameService.prototype.moduleVersionParameter = function (frameData) {
        var msftSme = window.MsftSme;
        var version;
        if (frameData.module.version) {
            // use module version.
            version = frameData.module.version;
        }
        else if (msftSme.Environment.version) {
            // use shell version.
            version = 's-' + msftSme.Environment.version;
        }
        return version ? '?version=' + version : '';
    };
    IFrameService.prototype.reopenModule = function (frameDataEvent, element, frame) {
        var _this = this;
        var frameData = frameDataEvent.frameData;
        Logging.trace({
            view: 'sme-iframe',
            instance: frameData.module.name,
            action: 'moduleOpen',
            data: { name: frameData.module.displayName, entryName: frameData.entryPoint && frameData.entryPoint.displayName }
        });
        var setData = this.cache.getSetData(frameData.setId);
        var openPath = setData.routerHandlers.getInnerPath(this.route, this.router, frameData);
        return Observable.fromPromise(this.appContextService.rpc.moduleActivate(frameData.name, frameData.subName, setData.primary))
            .flatMap(function (value) {
            if (frameData.openPath !== openPath) {
                return Observable.fromPromise(_this.appContextService.rpc.moduleOpen(frameData.name, frameData.subName, openPath));
            }
            return Observable.of(null);
        })
            .map(function () {
            Logging.log({
                source: 'IFrameService', level: LogLevel.Verbose, message: 'reopenModule: {0}'.format(frameData.name)
            });
            frameDataEvent.deferred.next(frameDataEvent);
            frameDataEvent.deferred.complete();
            _this.routerSubscribe(frameData);
            return frameDataEvent;
        });
    };
    IFrameService.prototype.onload = function (event, frameDataEvent) {
        var _this = this;
        // wait for iframe connection, send credential and open entryPoint.
        var frameData = frameDataEvent.frameData;
        frameData.element.removeEventListener('load', frameData.load, true);
        var setData = this.cache.getSetData(frameData.setId);
        this.appContextService.rpc.moduleConnect(frameData.name, frameData.entryPoint.name, frameData.frame, setData.primary)
            .then(function (subName) {
            frameData.subName = subName;
            return _this.appContextService.rpc.moduleInit(frameData.name, frameData.subName);
        })
            .then(function () {
            _this.routerSubscribe(frameData);
            var openPath = (setData.routerHandlers && setData.routerHandlers.getInnerPath(_this.route, _this.router, frameData))
                || frameData.openPath;
            return _this.openFramePolling(frameData, openPath).toPromise();
        })
            .then(function (data) {
            Logging.trace({
                view: 'sme-iframe',
                instance: frameData.module.name,
                action: 'moduleOpen',
                data: { name: frameData.module.displayName, entryName: frameData.entryPoint && frameData.entryPoint.displayName }
            });
            Logging.log({
                source: 'IFrameService', level: LogLevel.Verbose, message: 'onload: {0}'.format(frameData.name)
            });
            frameData.loadedDeferred.resolve(frameDataEvent);
        }, function (error) {
            var message = error;
            if (error && typeof error !== 'string') {
                message = '';
                if (error.message) {
                    message += error.message;
                }
                if (error.stack) {
                    message += error.stack;
                }
            }
            message = _this.strings.MsftSmeShell.App.IFrame.FailedLoad.message.format(frameData.module.name, message);
            Logging.log({ source: 'sme-iframe', level: LogLevel.Error, message: message });
            _this.unload(frameData);
            _this.routerUnsubscribe(frameData.setId);
            setData.frameDataCollection[frameData.id] = null;
            setData.activeIndex = null;
            frameData.loadedDeferred.reject(message);
        });
    };
    IFrameService.prototype.unload = function (frameData) {
        if (frameData.subName) {
            this.appContextService.rpc.moduleRemove(frameData.name, frameData.subName);
        }
        if (frameData.element) {
            frameData.element.src = '';
            frameData.element = null;
        }
    };
    IFrameService.prototype.routerUnsubscribe = function (setId) {
        var setData = this.cache.getSetData(setId);
        if (setData.routerSubscription) {
            setData.routerSubscription.unsubscribe();
            setData.routerSubscription = null;
        }
    };
    IFrameService.prototype.routerSubscribe = function (frameData) {
        var _this = this;
        var setData = this.cache.getSetData(frameData.setId);
        this.routerUnsubscribe(frameData.setId);
        setData.routerSubscription = this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .flatMap(function (event) {
            if (setData.routerHandlers
                && setData.routerHandlers.navigationEndHandler(event, _this.appBarService.moduleLoopbackUrl, _this.route, _this.router, frameData)) {
                var openPath = setData.routerHandlers.getInnerPath(_this.route, _this.router, frameData);
                return _this.appContextService.rpc.moduleOpen(frameData.name, frameData.subName, openPath);
            }
            return Observable.of();
        })
            .subscribe();
    };
    IFrameService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    IFrameService.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: Location, },
        { type: ActivatedRoute, },
        { type: Router, },
        { type: AppBarService, },
    ]; };
    return IFrameService;
}());
export { IFrameService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2lmcmFtZS9pZnJhbWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8saUJBQUEsQ0FBa0I7QUFDM0MsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFPLGVBQUEsQ0FBZ0I7QUFDM0MsT0FBTyxFQUFFLGNBQUEsRUFBK0MsYUFBQSxFQUF1QixNQUFBLEVBQTRCLE1BQU8saUJBQUEsQ0FBa0I7QUFDcEksT0FBTyxFQUFFLFlBQUEsRUFBYyxVQUFBLEVBQVksT0FBQSxFQUFzQixNQUFPLE1BQUEsQ0FBTztBQUN2RSxPQUFPLEVBQUUsaUJBQUEsRUFBOEIsTUFBTyxrQkFBQSxDQUFtQjtBQUNqRSxPQUFPLEVBQ0gsaUJBQWlCLEVBRWpCLE9BQU8sRUFDUCxRQUFRLEVBRVIsT0FBTyxFQUVQLGtCQUFrQixFQUVsQixZQUFZLEVBRWYsTUFBTSxlQUFBLENBQWdCO0FBRXZCLE9BQU8sRUFBRSxhQUFBLEVBQWMsTUFBTyw0QkFBQSxDQUE2QjtBQUMzRCxPQUFPLEVBQ3VDLGtCQUFBLEVBQWtDLFdBQUEsRUFDL0UsTUFBTSxnQkFBQSxDQUFpQjtBQUd4Qjs7R0FFRztBQUNIO0lBTUk7Ozs7Ozs7O09BUUc7SUFDSCx1QkFDWSxpQkFBb0MsRUFDcEMsUUFBa0IsRUFDbEIsS0FBcUIsRUFDckIsTUFBYyxFQUNkLGFBQTRCO1FBSjVCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFuQmpDLG1CQUFjLEdBQTRCLElBQUksT0FBTyxFQUFrQixDQUFDO1FBQ3ZFLFlBQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQztRQUM5QyxVQUFLLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFD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S0FBSSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUN2RixNQUFNLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzlGLENBQUM7WUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBaUIsQ0FBQztRQUMxQyxDQUFDLENBQUM7YUFDRCxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0Usd0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCw0QkFBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7UUFDM0IsRUFBQyxJQUFJLEVBQUUsUUFBUSxHQUFHO1FBQ2xCLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztRQUN4QixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUsYUFBYSxHQUFHO0tBQ3RCLEVBTjZGLENBTTdGLENBQUM7SUFDRixvQkFBQztDQXhkRCxBQXdkQyxJQUFBO1NBeGRZLGFBQWEiLCJmaWxlIjoiaWZyYW1lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9