import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-themes',
    templateUrl: './themes.component.html'
})
@NavigationTitle({
    getTitle: () => 'Themes'
})
export class ThemesComponent { }
