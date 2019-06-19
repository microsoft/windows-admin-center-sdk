import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-guided-panel',
    templateUrl: './guided-panel-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Guided Panel Component'
})
export class GuidedPanelExampleComponent {}
