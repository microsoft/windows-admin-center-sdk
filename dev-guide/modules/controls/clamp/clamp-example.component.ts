import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';
import {
    LoremIpsumP1, LoremIpsumP2, LoremIpsumP3, LoremIpsumP4, LoremIpsumP5
} from '../../lorem-ipsum/lorem-ipsum.component';

@Component({
    selector: 'sme-dev-guide-controls-clamp',
    templateUrl: './clamp-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Clamp Directive'
})
export class ClampExampleComponent {

    public loremIpsum = LoremIpsumP5;

    constructor() {
        const paragraphs = [LoremIpsumP1, LoremIpsumP2, LoremIpsumP3, LoremIpsumP4, LoremIpsumP5];
        let index = 0;
        setInterval(() => {
            index++;
            if (index >= paragraphs.length) {
                index = 0;
            }
            this.loremIpsum = paragraphs[index];
        },          500);
    }
}
