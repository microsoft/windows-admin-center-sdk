import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService, DialogService, UserProfileService } from '../angular';
import { ShellService } from './shell.service';
export declare class ShellComponent implements OnInit, OnDestroy {
    private appContextService;
    private shellService;
    private userProfileService;
    private dialogService;
    private activeRoute;
    private userProfileSubscription;
    private strings;
    /**
     * Update the navigation title.
     *
     * @param appContextService the application context service.
     * @param snapshot the route snapshot.
     */
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor(appContextService: AppContextService, shellService: ShellService, userProfileService: UserProfileService, dialogService: DialogService, activeRoute: ActivatedRoute);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
