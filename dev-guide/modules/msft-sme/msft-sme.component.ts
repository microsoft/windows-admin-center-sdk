import { Component } from '@angular/core';
import { msftSmeRoutingConstants } from './msft-sme.routing.constants';

@Component({
    selector: 'sme-ng2-msft-sme',
    templateUrl: './msft-sme.component.html'
})
export class MsftSmeComponent {
    public links = [
        msftSmeRoutingConstants.overview,
        msftSmeRoutingConstants.experiments
    ];

    public static navigationTitle(): string {
        return msftSmeRoutingConstants.root.title;
    }

}
