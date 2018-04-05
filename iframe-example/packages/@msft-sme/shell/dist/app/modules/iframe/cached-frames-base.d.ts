import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { AppContextService } from '../../../angular';
import { FrameView } from './iframe-cache';
import { IFrameService } from './iframe.service';
export declare class CachedFramesBase implements OnInit, OnDestroy {
    protected appContextService: AppContextService;
    protected elementRef: ElementRef;
    protected iFrameService: IFrameService;
    protected setIdOfFrames: any;
    protected numberOfFrames: any;
    frameCollection: FrameView[];
    private serviceSubscription;
    private replay;
    private routerHandles;
    constructor(appContextService: AppContextService, elementRef: ElementRef, iFrameService: IFrameService, setIdOfFrames: any, numberOfFrames: any);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private setFrame(frameData);
}
