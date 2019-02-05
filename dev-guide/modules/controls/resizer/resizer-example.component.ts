import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'sme-ng2-controls-resizer-example',
    templateUrl: './resizer-example.component.html'
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
