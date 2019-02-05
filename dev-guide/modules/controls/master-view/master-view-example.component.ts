import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import { Strings } from '../../../../../generated/strings';

@Component({
    selector: 'sme-ng2-controls-master-view-example',
    templateUrl: './master-view-example.component.html'
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

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-master-view';
    }

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
