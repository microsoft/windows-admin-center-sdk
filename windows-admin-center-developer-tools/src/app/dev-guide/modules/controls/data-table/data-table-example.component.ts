import { Component, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { DataTableComponent, DataTableCustomSortEvent, DataTableLazyLoadEvent } from '@msft-sme/shell/angular';
import { TestData } from './testData';

@Component({
    selector: 'sme-ng2-controls-data-table-example',
    styleUrls: ['./data-table-example.component.css'],
    templateUrl: './data-table-example.component.html'
})
export class DataTableExampleComponent {
    @ViewChild('dataTableForDataStreaming')
    private dataTableForDataStreaming: DataTableComponent;

    private dataStreamingTimer: any;
    private dataStreamingSortDirection = 1;

    @ViewChild('groupDataTable')
    private groupDataTable: DataTableComponent;

    @ViewChild('simpleDataTable')
    private simpleDataTable: DataTableComponent;

    @ViewChild(DataTableComponent)
    private currentDataTable: DataTableComponent;

    public tabIndex = 1;
    public sampleData1: any[];
    public selectedData1: any;
    public sampleData2: any[];
    public selectedData2: any[];
    public sampleData3: any[];
    public selectedData3: any[];
    public sampleData4: any[] = [];
    public selectedData4: any[];
    public sampleData5: any[] = [];
    public groupColumnField = 'City';
    public groupSortMode = '0';
    public selectedData5: any[];
    public dataSource: any[];
    public virtualCount: number;
    public virtualDataSource: any[];

    constructor() {
        setTimeout(
            () => {
                let newData = [];
                for (let i = 0; i < 6000; i++) {
                    newData.push({
                        field1: 'Field 1 ' + i,
                        field2: i,
                        field3: 'Field 3 ' + i,
                        field4: i,
                        field5: 'Field 5 ' + i,
                        description: i % 3 === 0 ?
                            'Looooooooooooooooooooooooooooooooooooooooooooooooooooooong description'
                            : 'short description',
                        objectField: {
                            text: 'Object Field ' + i,
                            number: i
                        }
                    });
                }
                this.sampleData1 = newData;

                newData = [];
                for (let i = 0; i < 600000; i++) {
                    newData.push({
                        field1: 'Field 1 ' + i + '  for Sample 2',
                        field2: i * 2,
                        field3: 'Field 3 ' + i + ' for Sample 2',
                        field4: i,
                        field5: 'Field 5 ' + i + ' for Sample 2',
                        description: i % 3 === 0 ?
                            'Sample 2 Looooooooooooooooooooooooooooooooooooooooooooooooooooooong description'
                            : 'Sample 2 short description',
                        objectField: {
                            text: 'Object Field ' + i,
                            number: i
                        }
                    });
                }
                this.sampleData2 = newData;
                this.dataSource = this.sampleData1;

                newData = [];
                for (let i = 0; i < 5000; i++) {
                    newData.push({
                        field1: 'Field 1 ' + i + '  for Sample 3',
                        field2: i,
                        field3: 'Field 3 ' + i + ' for Sample 3',
                        field4: i,
                        field5: 'Field 5 ' + i + ' for Sample 3',
                        description: i % 3 === 0 ?
                            'Sample 3 Looooooooooooooooooooooooooooooooooooooooooooooooooooooong description'
                            : 'Sample 3 short description'
                    });
                }
                this.sampleData3 = newData;
                this.virtualCount = this.sampleData3.length;

                this.sampleData5 = TestData;                
            },
            1000);
    }

    public onLazyLoad(event: DataTableLazyLoadEvent) {
        setTimeout(
            () => {
                let items = [];

                let sortedData = this.sampleData3.sort((a, b): number => {
                    return a[event.sortField] === b[event.sortField] ? 0 : (a[event.sortField] > b[event.sortField] ? 1 : -1);
                });

                if (event.sortOrder >= 0) {
                    for (let i = event.start; i < event.start + event.length; i++) {
                        items.push(sortedData[i]);
                    }
                } else {
                    for (let i = this.sampleData3.length - 1 - event.start;
                        i >= this.sampleData3.length - (event.start + event.length); i--) {
                        items.push(sortedData[i]);
                    }
                }
                event.finishLoadingData(items);
            },
            500);
    };

    public useSample1(): void {
        this.dataSource = this.sampleData1.map(item => item);
    }

    public useSample2(): void {
        this.dataSource = this.sampleData2.map(item => item);
    }

    public customSortCompare(a: any, b: any, field: string): number {
        let aValue = a.field5;
        let bValue = b.field5;

        let dataType = typeof aValue;
        if (dataType === 'number') {
            aValue = aValue || Number.MIN_VALUE;
            bValue = bValue || Number.MIN_VALUE;
        } else {
            aValue = aValue && aValue.toString && aValue.toString().toLocaleLowerCase() || '';
            bValue = bValue && aValue.toString && bValue.toString().toLocaleLowerCase() || '';
        }

        let result = 0;

        if (aValue.indexOf('field 5 2') === 0 && bValue.indexOf('field 5 2') === -1) {
            result = -1;
        } else if (aValue.indexOf('field 5 2') === -1 && bValue.indexOf('field 5 2') === 0) {
            result = 1;
        } else if (aValue > bValue) {
            result = 1;
        } else if (aValue < bValue) {
            result = -1;
        }
        return result;
    }

    public onGroupSortModeChanged(): void {
        this.groupDataTable.groupSortMode = parseInt(this.groupSortMode, 2);
    }

    public addData() {
        let start = this.sampleData4.length;
        for (let i = start; i < start + 100000; i++) {
            this.sampleData4.push({
                field1: 'Field 1 ' + i + '  for Sample 4',
                field2: i * 2,
                field3: 'Field 3 ' + i + ' for Sample 4',
                field4: i,
                field5: 'Field 5 ' + i + ' for Sample 4',
                description: i % 3 === 0 ?
                    'Sample 4 Looooooooooooooooooooooooooooooooooooooooooooooooooooooong description'
                    : 'Sample 4 short description'
            });
        }
        this.dataTableForDataStreaming.refreshData();
    }

    public doCustomSort($event: DataTableCustomSortEvent): void {
        if (this.sampleData4.length === 100) {
            $event.fallBackToDefaultSort();
        } else {
            if ($event.direction !== this.dataStreamingSortDirection) {
                this.dataStreamingSortDirection = $event.direction;

                this.sampleData4 = undefined;
                clearTimeout(this.dataStreamingTimer);
                if (this.dataStreamingSortDirection === 1) {
                    this.doDataStreaming(0);
                } else {
                    this.doDataStreamingReverse(5);
                }
            }
        }
    }

    public startDataStreaming(): void {
        this.doDataStreaming(0);
    }

    public stopDataStreaming(): void {
        clearTimeout(this.dataStreamingTimer);
    }

    public clickTab(tabIndex: number) {
        this.tabIndex = tabIndex;        
    }

    private doDataStreaming(count: number): void {
        let step = 1000;
        if (count < Number.MAX_VALUE) {
            this.dataStreamingTimer = setTimeout(
                () => {
                    if (!this.sampleData4) {
                        this.sampleData4 = [];
                    }

                    let start = this.sampleData4.length;
                    for (let i = start; i < start + step; i++) {
                        this.sampleData4.push({
                            field1: 'Field 1 ' + i + '  for Sample 4',
                            field2: i * 2,
                            field3: 'Field 3 ' + i + ' for Sample 4',
                            field4: i,
                            field5: 'Field 5 ' + i + ' for Sample 4',
                            description: i % 3 === 0 ?
                                'Sample 4 Looooooooooooooooooooooooooooooooooooooooooooooooooooooong description'
                                : 'Sample 4 short description'
                        });
                    }

                    this.dataTableForDataStreaming.refreshData();

                    this.doDataStreaming(count + 1);
                },
                300);
        }
    }

    public getGroupSummary(data: string) {
        let filteredData = this.sampleData5.filter(item =>
            ((item[this.groupColumnField] && item[this.groupColumnField].toString()) || undefined) === data);
        return 'Count: ' + filteredData.length;
    }

    public onGroupColumnChanged(): void {
        let column = this.groupDataTable.columns.filter(currentColumn => currentColumn.field === this.groupColumnField)[0];
        this.groupDataTable.groupColumn = column;
    }

    public up(): void {
        this.currentDataTable.moveToPreviousRenderedItem();
    }

    public down(): void {
        this.currentDataTable.moveToNextRenderedItem();
    }

    public home(): void {
        this.currentDataTable.moveToHeadOfRenderedItems();
    }

    public end(): void {
        this.currentDataTable.moveToEndOfRenderedItems();
    }

    public pageUp(): void {
        this.currentDataTable.moveToPreviousPageOfRenderedItems();
    }

    public pageDown(): void {
        this.currentDataTable.moveToNextPageOfRenderedItems();
    }

    private doDataStreamingReverse(count: number): void {
        let step = 20;
        if (count > 0) {
            this.dataStreamingTimer = setTimeout(
                () => {
                    if (!this.sampleData4) {
                        this.sampleData4 = [];
                    }

                    for (let i = count * step - 1; i >= (count - 1) * 20; i--) {
                        this.sampleData4.push({
                            field1: 'Field 1 ' + i + '  for Sample 4',
                            field2: i * 2,
                            field3: 'Field 3 ' + i + ' for Sample 4',
                            field4: i,
                            field5: 'Field 5 ' + i + ' for Sample 4',
                            description: i % 3 === 0 ?
                                'Sample 4 Looooooooooooooooooooooooooooooooooooooooooooooooooooooong description'
                                : 'Sample 4 short description'
                        });
                    }

                    this.dataTableForDataStreaming.refreshData();

                    this.doDataStreamingReverse(count - 1);
                },
                300);
        }
    }
}
