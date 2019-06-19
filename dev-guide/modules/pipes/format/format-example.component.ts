import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-pipes-format-example',
    templateUrl: './format-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'smeFormat'
})
export class FormatExampleComponent {
    public formatSimple = 'Format {0} {1}';
    public formatLinks = 'Format with {0} {1}';
    public simple1 = 'string';
    public simple2 = 'works';
    public link1 = 'link';
    public link1href = 'http://www.bing.com';
    public link2 = 'works';
}
