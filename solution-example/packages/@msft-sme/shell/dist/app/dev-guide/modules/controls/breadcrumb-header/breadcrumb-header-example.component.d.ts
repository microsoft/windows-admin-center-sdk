import { OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService, BreadcrumbItem, BreadcrumbSeparator } from '../../../../../angular';
export declare class BreadcrumbHeaderExampleComponent implements OnInit {
    itemsList: BreadcrumbItem[];
    separator: BreadcrumbSeparator;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    private getStartingData();
    ngOnInit(): void;
}
