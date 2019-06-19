import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-behaviors',
    templateUrl: './behaviors.component.html'
})
@NavigationTitle({
    getTitle: () => 'Behaviors'
})
export class BehaviorsComponent { }
