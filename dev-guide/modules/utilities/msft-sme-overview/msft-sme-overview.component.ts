import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-utilities-msft-sme',
    templateUrl: './msft-sme-overview.component.html'
})
@NavigationTitle({
    getTitle: () => 'MsftSme Overview'
})
export class MsftSmeOverviewComponent { }
