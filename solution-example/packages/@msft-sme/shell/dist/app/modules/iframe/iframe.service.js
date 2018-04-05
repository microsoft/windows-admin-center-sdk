import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AsyncSubject, Observable, Subject } from 'rxjs';
import { EnvironmentModule, Logging, LogLevel, NativeQ, RpcDeactivateState, RpcOpenState } from '../../../core';
import { AppBarService } from '../app-bar/app-bar.service';
import { FrameDataEventType, IFrameCache } from './iframe-cache';
/**
 * The global frames service.
 */
var IFrameService = (function () {
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
    return IFrameService;
}());
export { IFrameService };
IFrameService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
IFrameService.ctorParameters = function () { return [
    null,
    { type: Location, },
    { type: ActivatedRoute, },
    { type: Router, },
    { type: AppBarService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2lmcmFtZS9pZnJhbWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8saUJBQUEsQ0FBa0I7QUFDM0MsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFPLGVBQUEsQ0FBZ0I7QUFDM0MsT0FBTyxFQUFFLGNBQUEsRUFBK0MsYUFBQSxFQUF1QixNQUFBLEVBQTRCLE1BQU8saUJBQUEsQ0FBa0I7QUFDcEksT0FBTyxFQUFFLFlBQUEsRUFBYyxVQUFBLEVBQVksT0FBQSxFQUFzQixNQUFPLE1BQUEsQ0FBTztBQUV2RSxPQUFPLEVBQ0gsaUJBQWlCLEVBRWpCLE9BQU8sRUFDUCxRQUFRLEVBRVIsT0FBTyxFQUVQLGtCQUFrQixFQUVsQixZQUFZLEVBRWYsTUFBTSxlQUFBLENBQWdCO0FBRXZCLE9BQU8sRUFBRSxhQUFBLEVBQWMsTUFBTyw0QkFBQSxDQUE2QjtBQUMzRCxPQUFPLEVBQ3VDLGtCQUFBLEVBQWtDLFdBQUEsRUFDL0UsTUFBTSxnQkFBQSxDQUFpQjtBQUd4Qjs7R0FFRztBQUNIO0lBTUk7Ozs7Ozs7O09BUUc7SUFDSCx1QkFDWSxpQkFBb0MsRUFDcEMsUUFBa0IsRUFDbEIsS0FBcUIsRUFDckIsTUFBYyxFQUNkLGFBQTRCO1FBSjVCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFuQmpDLG1CQUFjLEdBQTRCLElBQUksT0FBTyxFQUFrQixDQUFDO1FBQ3ZFLFlBQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQztRQUM5QyxVQUFLLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDdkMsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO0lBaUJsQyxDQUFDO0lBRUQ7Ozs7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QWlCLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDOUYsQ0FBQztZQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFpQixDQUFDO1FBQzFDLENBQUMsQ0FBQzthQUNELFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFZTCxvQkFBQztBQUFELENBeGRBLEFBd2RDOztBQVhNLHdCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtDQUNuQixDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsNEJBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLElBQUk7SUFDSixFQUFDLElBQUksRUFBRSxRQUFRLEdBQUc7SUFDbEIsRUFBQyxJQUFJLEVBQUUsY0FBYyxHQUFHO0lBQ3hCLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztJQUNoQixFQUFDLElBQUksRUFBRSxhQUFhLEdBQUc7Q0FDdEIsRUFONkYsQ0FNN0YsQ0FBQyIsImZpbGUiOiJpZnJhbWUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=