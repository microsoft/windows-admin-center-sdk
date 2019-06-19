import { Component, OnInit } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-resizer',
    templateUrl: './resizer-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Resizer Component'
})
export class ResizerExampleComponent implements OnInit {
    public tabIndex = 1;
    public testDataList = [];
    public filter1 = '';
    public filter2 = '';
    public filter3 = '';
    public filter4 = '';

    public ngOnInit(): void {
        for (let i = 0; i < 500; i++) {
            this.testDataList.push({ name: i, displayName: 'Item ' + i });
        }
    }

    public clickTab(tabIndex: number) {
        this.tabIndex = tabIndex;
    }
}
