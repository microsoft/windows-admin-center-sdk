import { Component, HostBinding } from '@angular/core';
import { LoremIpsumP2 } from './lorem-ipsum.component';

@Component({
    selector: 'sme-lorem-ipsum2',
    template: '<p>{{loremIpsum2}}</p>'
})
export class LoremIpsum2Component {
    public loremIpsum2 = LoremIpsumP2;

    @HostBinding('class.sme-documentation')
    public defaultClasses = true;
}
