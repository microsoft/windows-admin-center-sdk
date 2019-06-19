import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-layers',
    templateUrl: './layers.component.html'
})
@NavigationTitle({
    getTitle: () => 'Layers'
})
export class LayersComponent { }
