import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DialogService } from '../../../angular';
import { AppBarService, Breadcrumb } from './app-bar.service';
export declare class AppBarComponent implements OnInit, OnDestroy {
    private titleService;
    appBarService: AppBarService;
    dialogService: DialogService;
    activePane: string;
    notifications: any;
    firstBreadcrumb: Breadcrumb;
    secondBreadcrumb: Breadcrumb;
    unsupportedBrowser: boolean;
    solutionsDropdown: ElementRef;
    private breadcrumbsSubscription;
    constructor(titleService: Title, appBarService: AppBarService, dialogService: DialogService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * toggles notification pane
     */
    togglePane(paneId: string): void;
    closeActionPanes(): void;
    getNotificationCount(): number;
}
