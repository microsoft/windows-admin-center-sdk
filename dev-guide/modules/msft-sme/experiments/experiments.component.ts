import { Component } from '@angular/core';
import { msftSmeRoutingConstants } from '../msft-sme.routing.constants';

@Component({
    selector: 'sme-ng2-msft-sme-experiments',
    templateUrl: './experiments.component.html'
})
export class MsftSmeExperimentsComponent {
    public static navigationTitle(): string {
        return msftSmeRoutingConstants.experiments.title;
    }

}
