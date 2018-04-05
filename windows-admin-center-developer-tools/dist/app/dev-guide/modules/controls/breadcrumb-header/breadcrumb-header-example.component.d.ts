import { OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService, BreadcrumbItem, BreadcrumbSeparator } from '@msft-sme/shell/angular';
export declare class BreadcrumbHeaderExampleComponent implements OnInit {
    itemsList: BreadcrumbItem[];
    separator1: BreadcrumbSeparator;
    separator2: BreadcrumbSeparator;
    separator3: BreadcrumbSeparator;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    private getStartingData();
    ngOnInit(): void;
}
