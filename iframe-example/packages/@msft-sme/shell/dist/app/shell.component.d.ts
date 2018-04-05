import { OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService, DialogService } from '../angular';
import { ShellService } from './shell.service';
export declare class ShellComponent implements OnInit {
    private appContextService;
    private shellService;
    private dialogService;
    private activeRoute;
    private strings;
    /**
     * Update the navigation title.
     *
     * @param appContextService the application context service.
     * @param snapshot the route snapshot.
     */
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor(appContextService: AppContextService, shellService: ShellService, dialogService: DialogService, activeRoute: ActivatedRoute);
    ngOnInit(): void;
}
