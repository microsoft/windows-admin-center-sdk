import { Location } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AppContextService } from '../../../angular';
import { EnvironmentModuleEntryPoint } from '../../../core';
import { AppBarService } from '../app-bar/app-bar.service';
import { FrameData, FrameDataEvent, RouterHandlers } from './iframe-cache';
export declare class IFrameService {
    private appContextService;
    private location;
    private route;
    private router;
    private appBarService;
    frameDataEvent: Subject<FrameDataEvent>;
    private strings;
    private cache;
    private openPollingCancel;
    /**
     * Initializes a new instance of the IFrameService class.
     *
     * @param appContextService the application context service.
     * @param location the Location object.
     * @param route the activate route.
     * @param router the router object.
     * @param appBarService the header service.
     */
    constructor(appContextService: AppContextService, location: Location, route: ActivatedRoute, router: Router, appBarService: AppBarService);
    /**
     * Initializes set of frames.
     * - This should be called by levelx-frame.component.
     *
     * @param setId the identity of frame set.
     * @param count the count of frames in the set.
     * @param primary the primary outlet to connect header breadcrumb bar.
     * @param routerHandlers the router handlers.
     */
    init(setId: number, count: number, primary: boolean, routerHandlers: RouterHandlers): void;
    /**
     * Exit the set of frames management.
     * - This should be called by levelx-frame.component.
     *
     * @param setId the identity of frame set.
     */
    exit(setId: number): Promise<void>;
    /**
     * Open or update to a module from the iframe component.
     * - This should be called by iframeX.component.
     *
     * @param setId the identity of frame set.
     * @param name the module name.
     * @return FrameDataEvent the event object sent to set-frame component.
     */
    open(setId: number, name: string, entryPoint: EnvironmentModuleEntryPoint, openPath: string): Observable<FrameDataEvent>;
    /**
     * Cancel current attempt of opening the module.
     */
    cancel(): void;
    /**
     * Close the iframe component so all frames must be unloaded.
     * - This should be called by iframeX.component.
     *
     * @param setId the identity of frame set.
     * @param full making the full clean to reset the cache state.
     */
    close(setId: number): Promise<void>;
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
    openSingle(name: string, entryPoint: EnvironmentModuleEntryPoint, openPath: string, element: Element, frame: Window, setId: number): Observable<FrameData>;
    /**
     * Create a single instant frame data.
     *
     * @param name the name of the module.
     * @param path the path to open the module.
     * @param element the element object.
     * @param frame the frame object.
     */
    closeSingle(frameData: FrameData): Observable<FrameData>;
    /**
     * Can deactivate tool.
     *
     * @param frameId: the frame ID.
     * @param currentRoute current activated route snapshot.
     * @param currentState current router state.
     * @param nextState next state.
     */
    canDeactivateToolOnFrame(frameId: number, appContext: AppContextService, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean>;
    /**
     * Deactivate frame by polling.
     *
     * @param frameData the frame data.
     * @return Observable<boolean> the deactivate result.
     */
    private deactivateFramePolling(frameData);
    /**
     * Open frame by polling.
     *
     * @param frameData the frame data.
     * @return Observable<boolean> the open result.
     */
    private openFramePolling(frameData, path, parameters?);
    /**
     * Clean the iframe component so all frames must be unloaded.
     *
     * @param setId the identity of frame set.
     * @param full making the full clean to reset the cache state.
     */
    private clean(setId, full);
    private unloadFrame(frameData);
    private mapModuleToFrame(frameDataEvent, element, frame);
    private moduleVersionParameter(frameData);
    private reopenModule(frameDataEvent, element, frame);
    private onload(event, frameDataEvent);
    private unload(frameData);
    private routerUnsubscribe(setId);
    private routerSubscribe(frameData);
}
