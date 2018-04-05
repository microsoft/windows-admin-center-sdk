import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService } from '../../../angular';
import { IFrameService } from './iframe.service';
export declare enum OpenState {
    Settled = 0,
    Started = 1,
    InProgress = 2,
    Delayed = 3,
    Canceled = 4,
    Error = 5,
}
export declare class IFrameComponent implements OnInit, OnDestroy {
    private appContext;
    private route;
    private router;
    private iFrameService;
    private static timeInProgress;
    private static timeDelayed;
    private strings;
    private subscription;
    private reopenSubscription;
    private startTime;
    private timer;
    errorTitle: string;
    errorMessage: string;
    name: string;
    entryPointName: string;
    openState: OpenState;
    openStateEnum: typeof OpenState;
    constructor(appContext: AppContextService, route: ActivatedRoute, router: Router, iFrameService: IFrameService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    reopen(): void;
    cancel(): void;
    private open();
    private next(event);
}
