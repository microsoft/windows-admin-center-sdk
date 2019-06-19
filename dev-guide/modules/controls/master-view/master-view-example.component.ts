import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';
import { Strings } from '../../../../generated/strings';

@Component({
    selector: 'sme-dev-guide-controls-master-view',
    templateUrl: './master-view-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Master View Component'
})
export class MasterViewExampleComponent {
    public strings: Strings;
    public searchString = '';

    public groupByOptions = [
        { displayName: 'Option 1', field: 'field 1' },
        { displayName: 'Option 2', field: 'field 2' },
        { displayName: 'Option 3', field: 'field 3' },
        { displayName: 'Some other thing', field: 'field 4' }
    ];

    public active = false;
    public groupActive = false;
    public items = [];

    public selection = null;

    public masterView: any = { searchable: false, header: null };

    constructor() {
        this.strings = MsftSme.getStrings();
        for (let i = 0; i < 500; i++) {
            this.items.push({ name: i, displayName: 'Item ' + i });
        }
    }

    public alert(arg: string) {
        alert(arg);
    }

    public onDropdownChange(field: string) {
        this.alert(field);
    }

    public convertForCustomColumn(name: number): string {
        return 'Converted Value: ' + name * 1.3;
    }
}
