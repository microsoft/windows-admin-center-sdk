import { Component } from '@angular/core';
import { PropertyGridItemComponent } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-controls-property-grid-example',
    templateUrl: './property-grid-example.component.html'
})
export class PropertyGridExampleComponent {

    public propertyAction: MsftSme.Action1<PropertyGridItemComponent>;
    public oneColumn = false;

    public static navigationTitle(): string {
        return 'Property Grid Component';
    }

    constructor() {
        this.propertyAction = (item: PropertyGridItemComponent) => {
            alert(`You clicked on: ${item.label}`);
        };
    }
}
