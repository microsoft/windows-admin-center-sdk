import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AsyncSubject, Observable, Subscription } from 'rxjs';
import { EnvironmentModule, EnvironmentModuleEntryPoint, NativeDeferred } from '../../../core';
export interface FrameView {
    id: number;
    class: string;
}
export interface FrameCallback {
    (frameData: FrameDataEvent, element: any, frame: Window): Observable<FrameDataEvent>;
}
export interface LoadCallback {
    (event: any): void;
}
export interface RouterHandlers {
    /**
     * Handle navigation end event.
     *
     * @param event the navigation end event.
     * @param moduleLoopbackUrl the module loopback url.
     * @param route the activated route.
     * @param router the router.
     * @param frameData the frame data object.
     * @return string true to call RpcOpen.
     */
    navigationEndHandler: (event: NavigationEnd, moduleLoopbackUrl: string, route: ActivatedRoute, router: Router, frameData: FrameData) => boolean;
    /**
     * Get path within the child iframe.
     *
     * @param route the activated route.
     * @param router the router.
     * @param frameData the frame data object.
     * @return string return open path to call Rpc, return null if it cannot determine.
     */
    getInnerPath: (route: ActivatedRoute, router: Router, frameData: FrameData) => string;
}
export interface FrameData {
    /**
     * The frame ID.
     */
    id: number;
    /**
     * The set identity of cached frames.
     */
    setId: number;
    /**
     * The module name.
     */
    name: string;
    /**
     * The entry point name.
     */
    entryPoint: EnvironmentModuleEntryPoint;
    /**
     * The open path.
     */
    openPath: string;
    /**
     * The sub name.
     */
    subName: string;
    /**
     * The last timestamp for any activity of this frame object.
     */
    timestamp: number;
    /**
     * The load function instance to remove it later.
     */
    load: LoadCallback;
    /**
     * The promise of loaded state.
     */
    loadedDeferred: NativeDeferred<FrameDataEvent>;
    /**
     * The path name.
     */
    path?: string;
    /**
     * The module object.
     */
    module?: EnvironmentModule;
    /**
     * The frame element.
     */
    element?: any;
    /**
     * The frame window.
     */
    frame?: Window;
}
export interface FrameSetData {
    /**
     * The number of frames per set.
     */
    count: number;
    /**
     * The frame data object collection.
     */
    frameDataCollection: FrameData[];
    /**
     * The active index.
     */
    activeIndex: number;
    /**
     * The primary outlet routing.
     */
    primary: boolean;
    /**
     * The router handlers
     */
    routerHandlers: RouterHandlers;
    /**
     * The subscription of router.
     */
    routerSubscription?: Subscription;
}
export declare enum FrameDataEventType {
    AddOnly = 0,
    PushedOut = 1,
    Swap = 2,
    Noop = 3,
}
export interface FrameDataEvent {
    /**
     * The event type.
     */
    type: FrameDataEventType;
    /**
     * The frame data.
     */
    frameData: FrameData;
    /**
     * The frame component callback.
     */
    callback?: FrameCallback;
    /**
     * The deferred object to indicated completion of open operation.
     */
    deferred?: AsyncSubject<FrameDataEvent>;
    /**
     * The frame data to be inactive.
     */
    activeFrameData?: FrameData;
    /**
     * The frame data to be unloaded.
     */
    unloadFrameData?: FrameData;
    /**
     * The error result message.
     */
    error?: string;
}
/**
 * The global frames service.
 */
export declare class IFrameCache {
    private collection;
    /**
     * Initializes set of cached frames.
     *
     * @param setId the id of frame set.
     * @param count the count of frames in the set.
     * @param primary the primary outlet to connect header breadcrumb bar.
     * @param routerHandlers the router handlers.
     */
    init(setId: number, count: number, primary: boolean, routerHandlers: RouterHandlers): void;
    /**
     * Gets the frame set data.
     *
     * @param setId the set id number.
     */
    getSetData(setId: number): FrameSetData;
    /**
     * Sets the frame set data.
     *
     * @param setId the set id number.
     * @param setData the set data.
     */
    setSetData(setId: number, setData: FrameSetData): void;
    /**
     * Clean the cached content so all frames must be unloaded.
     *
     * @param setId the set id number.
     * @param full making full clean to reset the cache state.
     */
    clean(setId: number, full: boolean): void;
    /**
     * Update module data with router information.
     *
     * @param setId the set id of frames.
     * @param name the name of module.
     * @param openPath the open url path within the module.
     * @return Observable<FrameDataEvent> the event data observable.
     */
    update(setId: number, name: string, entryPoint: EnvironmentModuleEntryPoint, openPath: string): FrameDataEvent;
    private cacheIn(added, frameData);
    private cacheOut(frameData);
}
