import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
export declare class CustomSettingsExamplePanelComponent implements OnInit, OnDestroy {
    private activatedRoute;
    subscription: Subscription;
    settingName: string;
    constructor(activatedRoute: ActivatedRoute);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
