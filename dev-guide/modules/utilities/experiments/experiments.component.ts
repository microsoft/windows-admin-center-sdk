import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-utilities-msft-sme-experiments',
    templateUrl: './experiments.component.html'
})
@NavigationTitle({
    getTitle: () => 'Experiments'
})
export class MsftSmeExperimentsComponent { }
