import { ElementRef, EventEmitter } from '@angular/core';
import { AppContextService } from '../../../../../angular';
import { IFrameService } from '../../../iframe/iframe.service';
export declare class AddConnectionFrameComponent {
    private appContextService;
    private elementRef;
    private iFrameService;
    emitResult: EventEmitter<any>;
    private frameData;
    private setIdOfFrames;
    private frame;
    private connectionType;
    private updateDataSubscription;
    private routerHandles;
    constructor(appContextService: AppContextService, elementRef: ElementRef, iFrameService: IFrameService);
    readonly ready: boolean;
    open(connectionType: string): void;
    close(): void;
    private start(element);
    private getConnectionTypeData(connectionType);
}
