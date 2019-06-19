import { Component, OnInit } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';
import { Breadcrumb } from '@msft-sme/angular';
import { BreadcrumbSeparator } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-breadcrumb',
    templateUrl: './breadcrumb-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Breadcrumb Component'
})
export class BreadcrumbExampleComponent implements OnInit {
    public breadcrumbs: Breadcrumb[] = [];
    public separators: BreadcrumbSeparator[];

    public ngOnInit() {
        this.separators = [
            BreadcrumbSeparator.BackSlash,
            BreadcrumbSeparator.ChevronRight,
            BreadcrumbSeparator.Slash,
            BreadcrumbSeparator.Comma
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
