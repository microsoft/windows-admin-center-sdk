import { OnDestroy, OnInit } from '@angular/core';
import { AppContextService } from '@msft-sme/shell/angular';
import { Strings } from '../../generated/strings';
export declare class HelloComponent implements OnInit, OnDestroy {
    private appContextService;
    loading: boolean;
    errorMessage: string;
    strings: Strings;
    constructor(appContextService: AppContextService);
    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    ngOnInit(): void;
    ngOnDestroy(): void;
}
