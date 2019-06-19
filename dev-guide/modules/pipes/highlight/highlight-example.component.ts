import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';
import { LoremIpsum } from '../../lorem-ipsum/lorem-ipsum.component';

@Component({
    selector: 'sme-dev-guide-pipes-highlight-example',
    templateUrl: './highlight-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'smeHighlight'
})
export class HighlightExampleComponent {
    // tslint:disable:no-trailing-whitespace
    public text = LoremIpsum;
    public search = 'qu';
    public class = 'sme-padding-horizontal-xxxs sme-border-inset-sm';
}
