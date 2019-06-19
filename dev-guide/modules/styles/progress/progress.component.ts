import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-progress',
    templateUrl: './progress.component.html'
})
@NavigationTitle({
    getTitle: () => 'Progress'
})
export class ProgressComponent { }
