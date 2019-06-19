import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-forms-slider',
    templateUrl: './slider-styles.component.html'
})
@NavigationTitle({
    getTitle: () => 'Slider Styles'
})
export class SliderStylesComponent { }
