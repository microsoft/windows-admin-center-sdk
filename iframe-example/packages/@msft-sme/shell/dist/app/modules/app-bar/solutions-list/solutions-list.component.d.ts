import { OnDestroy, OnInit } from '@angular/core';
import { AppContextService } from '../../../../angular';
import { Connection, EnvironmentModuleEntryPoint } from '../../../../core';
export interface SolutionMenuItem {
    entryPoint: EnvironmentModuleEntryPoint;
    fontIcon: string;
    link: string;
    moduleName: string;
}
export declare class SolutionsListComponent implements OnInit, OnDestroy {
    private appContextService;
    strings: {
        installedSolutions: string;
        sideLoadWarning: string;
        getMore: string;
        settings: string;
    };
    showDevMode: boolean;
    isMenuExpanded: boolean;
    connection: Connection;
    solutions: SolutionMenuItem[];
    extensionsSolution: SolutionMenuItem;
    private activeConnectionChangedSubscription;
    private connectionMap;
    /**
     * Initializes a new instance of the NavigationComponent class.
     *
     * @param appContextService the application context service.
     */
    constructor(appContextService: AppContextService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private getSolutionRootPath(entryPoint);
}
