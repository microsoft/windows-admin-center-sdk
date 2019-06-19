import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-links',
    templateUrl: './links.component.html'
})
@NavigationTitle({
    getTitle: () => 'Links'
})
export class LinksComponent { }
