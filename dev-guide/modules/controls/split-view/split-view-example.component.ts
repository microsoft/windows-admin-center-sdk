import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-split-view',
    templateUrl: './split-view-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Split View Component'
})
export class SplitViewExampleComponent { }
