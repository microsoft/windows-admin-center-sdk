import { Component } from '@angular/core';
import { PropertyGridItemComponent } from '@msft-sme/angular';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-property-grid',
    templateUrl: './property-grid-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Property Grid Component'
})
export class PropertyGridExampleComponent {

    public propertyAction: MsftSme.Action1<PropertyGridItemComponent>;
    public oneColumn = false;

    constructor() {
        this.propertyAction = (item: PropertyGridItemComponent) => {
            alert(`You clicked on: ${item.label}`);
        };
    }
}
