import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-dropdown',
    templateUrl: './dropdown-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Dropdown Component'
})
export class DropdownExampleComponent {

    public data = [
        {name: 'Item 1', value: 1},
        {name: 'Item 2', value: 2},
        {name: 'Item 3', value: 3},
        {name: 'Item 4', value: 4}
    ];
}
