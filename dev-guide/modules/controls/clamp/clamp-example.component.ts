import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import {
    LoremIpsumP1, LoremIpsumP2, LoremIpsumP3, LoremIpsumP4, LoremIpsumP5
} from '../../../lorem-ipsum/lorem-ipsum.component';

@Component({
    selector: 'sme-ng2-controls-clamp-example',
    templateUrl: './clamp-example.component.html'
})
export class ClampExampleComponent {

    public loremIpsum = LoremIpsumP5;

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Clamp Directive';
    }

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
