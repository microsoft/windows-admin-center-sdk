import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {
    AppContextService,
    BreadcrumbHeaderComponent,
    BreadcrumbItem,
    BreadcrumbSeparator
} from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-breadcrumb-header-example',
    template: `
      <sme-breadcrumb-header [breadcrumbSeparator]="separator1" [breadcrumbItems]="itemsList"></sme-breadcrumb-header>
      <sme-breadcrumb-header [breadcrumbSeparator]="separator2" [breadcrumbItems]="itemsList"></sme-breadcrumb-header>
      <sme-breadcrumb-header [breadcrumbSeparator]="separator3" [breadcrumbItems]="itemsList"></sme-breadcrumb-header>
    `
})
export class BreadcrumbHeaderExampleComponent implements OnInit {
    public itemsList: BreadcrumbItem[] = [];
    public separator1: BreadcrumbSeparator;
    public separator2: BreadcrumbSeparator;
    public separator3: BreadcrumbSeparator;

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-breadcrumb-header';
    }

    private getStartingData(): BreadcrumbItem[] {

        return [
                {
                    label: 'item 1',
                    clickable: true,
                    bold: true,
                    command: event => alert('item 1')
                },
                {
                    label: 'item 2',
                    clickable: true,
                    command: event => alert('item 2')
                },
                {
                    label: 'item 3',
                    clickable: false,
                    bold: true
                }
            ];
    }

    public ngOnInit() {
        this.separator1 = BreadcrumbSeparator.BackSlash;
        this.separator2 = BreadcrumbSeparator.ChevronRight;
        this.separator3 = BreadcrumbSeparator.Slash;
        this.itemsList = this.getStartingData();
    }
}
