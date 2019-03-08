import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Breadcrumb } from '@msft-sme/angular';
import { BreadcrumbSeparator } from '@msft-sme/angular';
import { AppContextService } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-controls-breadcrumb-example',
    templateUrl: './breadcrumb-example.component.html'
})
export class BreadcrumbExampleComponent implements OnInit {
    public breadcrumbs: Breadcrumb[] = [];
    public separators: BreadcrumbSeparator[];

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-breadcrumb';
    }

    public ngOnInit() {
        this.separators = [
            BreadcrumbSeparator.BackSlash,
            BreadcrumbSeparator.ChevronRight,
            BreadcrumbSeparator.Slash
        ];
        this.breadcrumbs = [
            {
                label: 'item 1',
                emphasized: true,
                action: event => alert('item 1')
            },
            {
                label: 'item 2',
                action: event => alert('item 2')
            },
            {
                label: 'item 3',
                emphasized: true
            }
        ];
    }
}
