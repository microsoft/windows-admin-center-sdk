import { Component, HostBinding } from '@angular/core';
import { LoremIpsumP1 } from './lorem-ipsum.component';

@Component({
    selector: 'sme-lorem-ipsum1',
    template: '<p>{{loremIpsum1}}</p>'
})
export class LoremIpsum1Component {
    public loremIpsum1 = LoremIpsumP1;

    @HostBinding('class.sme-documentation')
    public defaultClasses = true;
}
