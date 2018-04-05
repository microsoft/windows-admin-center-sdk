import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';
import { Strings } from '../../../generated/strings';
import { HelloService } from '../hello.service';
export declare class PowershellExampleComponent implements OnInit, OnDestroy {
    private appContextService;
    private helloService;
    loading: boolean;
    displayCode: boolean;
    displayCodeButtonContent: string;
    private serviceSubscription;
    private psSession;
    errorMessage: string;
    serviceDisplayName: string;
    strings: Strings;
    serviceDefinition: any;
    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor(appContextService: AppContextService, helloService: HelloService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private getServices();
    toggleCode(): void;
}
