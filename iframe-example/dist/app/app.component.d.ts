import { OnDestroy, OnInit } from '@angular/core';
import { AppContextService, NavigationService } from '@msft-sme/shell/angular';
export declare class AppComponent implements OnDestroy, OnInit {
    private appContext;
    private navigationService;
    constructor(appContext: AppContextService, navigationService: NavigationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
