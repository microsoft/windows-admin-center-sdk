import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { AppContextService } from '../../../../angular';
import { CachedFramesBase } from '../cached-frames-base';
import { IFrameService } from '../iframe.service';
export declare class CachedFramesComponent extends CachedFramesBase implements OnInit, OnDestroy {
    static cachedFrameId: number;
    static numberOfFrames: number;
    constructor(appContextService: AppContextService, elementRef: ElementRef, iFrameService: IFrameService);
}
