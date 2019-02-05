import { Component } from '@angular/core';
import { msftSmeRoutingConstants } from '../msft-sme.routing.constants';

@Component({
    selector: 'sme-ng2-msft-sme-overview',
    templateUrl: './overview.component.html'
})
export class MsftSmeOverviewComponent {
    public static navigationTitle(): string {
        return msftSmeRoutingConstants.overview.title;
    }

}
