import { Component, ViewChild } from '@angular/core';
import {
    CheckValidationEventArgs, DataTableCustomSortEvent, DataTableLazyLoadEvent, EditableDataChangeSet,
    ValidationAlerts, ValidationAlertSeverity
} from '@msft-sme/angular';
import { DataTableComponent } from '@msft-sme/angular';
import { NavigationTitle } from '@msft-sme/angular';
import {
    QueryData, QueryDataItemPresetGenerator,
    QueryDataItemValueType, QueryDataOperand
} from '@msft-sme/angular';
import { TestData } from './testData';

@Component({
    selector: 'sme-dev-guide-controls-data-table',
    styleUrls: ['./data-table-example.component.css'],
    templateUrl: './data-table-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Data Table Component'
})
export class DataTableExampleComponent {
    public searchString = '';

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

    public sampleData1: any[];
    public selectedData1: any;

    public editableDataChangeset: EditableDataChangeSet;

    public sampleData2: any[];
    public selectedData2: any[];
    public sampleData3: any[];
    public selectedData3: any[];
    public sampleData4: any[] = [];
    public selectedData4: any[];
    public sampleData5: any[] = [];
    public sampleEditableData: any[] = [];
    public groupColumnField = 'City';
    public groupSortMode = '0';
    public selectedData5: any[];
    public dataSource: any[];
    public dataSource2: any[];
    public virtualCount: number;
    public virtualDataSource: any[];
    public indexToSelect: number;
    public presetQueryEditor: QueryData = {
        contents: []
    };
    public queryEditorItemPresetGenerator = new QueryDataItemPresetGenerator();

    public editableNewDataItem = {
        objectField: {
            text: '',
            number: ''
        }
    };

    public selectByIndex(): void {
        this.selectedData1 = this.sampleEditableData[this.indexToSelect];
    }

    constructor() {
        const item1column = this.queryEditorItemPresetGenerator
            .columnGenerator('String Field 5 (Custom Sort: put all items with \'2\' at one side', 'field5');
        const item1value = this.queryEditorItemPresetGenerator
            .valueGenerator('field 5 1');
        const item1 = this.queryEditorItemPresetGenerator
            .itemGenerator(item1column, QueryDataOperand.Eq, item1value, null, true);

        const item2column = this.queryEditorItemPresetGenerator
            .columnGenerator('Object Field Number', 'objectField.number');
        const item2value = this.queryEditorItemPresetGenerator
            .valueGenerator('15123412342341234');
        const item2 = this.queryEditorItemPresetGenerator
            .itemGenerator(item2column, QueryDataOperand.Lt, item2value, null, null, 'sme-icon sme-icon-heart');

        const item3column = this.queryEditorItemPresetGenerator
            .columnGenerator('String Field1', 'field1');
        const item3value = this.queryEditorItemPresetGenerator
            .valueGenerator('Field 1 1', QueryDataItemValueType.SingleDropdown);
        const item3 = this.queryEditorItemPresetGenerator
            .itemGenerator(item3column, QueryDataOperand.Eq, item3value, true, null, 'sme-icon sme-icon-heart');

        const item4column = this.queryEditorItemPresetGenerator
            .columnGenerator('Object Field Text', 'objectField.text', true);
        const item4value = this.queryEditorItemPresetGenerator
            .valueGenerator(['Object Field 1', 'Object Field 9'], QueryDataItemValueType.MultiSelectDropdown);
        const item4 = this.queryEditorItemPresetGenerator
            .itemGenerator(item4column, QueryDataOperand.Eq, item4value, true, null, 'sme-icon sme-icon-contact');

        this.presetQueryEditor.contents.push(item1, item2, item3, item4);
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
                this.dataSource2 = MsftSme.deepAssign(this.dataSource.filter((item, index) => {
                    return index <= 30;
                }));

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
                const items = [];

                const sortedData = this.sampleData3.sort((a, b): number => {
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
    }

    public onChangesetUpdated(changeSet: EditableDataChangeSet) {
        this.editableDataChangeset = changeSet;
    }

    public getDataJsonText(): string {
        return JSON.stringify(this.sampleEditableData, null, 4);
    }

    public getDataJsonTextForAddedData(): string {
        return this.editableDataChangeset && this.editableDataChangeset.addedItems.map(item => item.stringField1).join(', ');
    }

    public getDataJsonTextForUpdatedData(): string {
        return this.editableDataChangeset && this.editableDataChangeset.updatedItems.map(item => item.stringField1).join(', ');
    }

    public getDataJsonTextForDeletedData(): string {
        return this.editableDataChangeset && this.editableDataChangeset.deletedItems.map(item => item.stringField1).join(', ');
    }

    public onNewEditableRowAdded(data) {
        data.objectField.text = 'Readonly Text ' + (this.sampleEditableData.length + 1);
    }

    public useSample1(): void {
        this.dataSource = this.sampleData1.map(item => item);
    }

    public useSample2(): void {
        this.dataSource = this.sampleData2.map(item => item);
    }

    public customSortCompare(a: any, b: any, field: string): number {
        let aValue = a.field5;
        let bValue = b.field5;

        const dataType = typeof aValue;
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
        const start = this.sampleData4.length;
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

    private doDataStreaming(count: number): void {
        const step = 1000;
        if (count < Number.MAX_VALUE) {
            this.dataStreamingTimer = setTimeout(
                () => {
                    if (!this.sampleData4) {
                        this.sampleData4 = [];
                    }

                    const start = this.sampleData4.length;
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
        const filteredData = this.sampleData5.filter(item =>
            ((item[this.groupColumnField] && item[this.groupColumnField].toString()) || undefined) === data);
        return 'Count: ' + filteredData.length;
    }

    public onGroupColumnChanged(): void {
        const column = this.groupDataTable.columns.filter(currentColumn => currentColumn.field === this.groupColumnField)[0];
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

    public scrollSelectedDataIntoView(): void {
        this.currentDataTable.scrollSelectedItemIntoView(true);
    }

    public refreshDataSource(): void {
        const items = this.currentDataTable.items;
        this.currentDataTable.items = null;
        setTimeout(
            () => {
                this.currentDataTable.items = JSON.parse(JSON.stringify(items));
            },
            2000);
    }

    public getItemIdentityFunction(data: any): string {
        return data.field1;
    }

    public getGroupItemIdentityFunction(data: any): string {
        return data.ContactName;
    }

    public useEmptyData() {
        this.sampleEditableData = [];
    }

    public useSampleEditableData() {
        const sampleData = [];

        for (let i = 0; i < 5; i++) {
            sampleData.push({
                stringField1: 'String Field ' + i,
                stringField2: 'String Field' + i,
                checkboxField: i % 2 === 0,
                numberField: i * 100,
                passwordField: 'Password ' + i,
                sliderField: i,
                objectField: { text: 'Object Text ' + i, number: i },
                comboboxField: 'Value 1',
                toggleField: i % 2 === 1,
            });
        }

        this.sampleEditableData = sampleData;
    }

    public sampleValidate1(event: CheckValidationEventArgs) {
        const alerts: ValidationAlerts = {};
        if (parseInt(event.formControl.value, 0) < 100) {
            alerts['notValid'] = {
                valid: false,
                message: '"Number Field" is not greater than 100...',
                severity: ValidationAlertSeverity.Error
            };
        }
        MsftSme.deepAssign(event.alerts, alerts);
    }

    public sampleValidate2(rowData: any, event: CheckValidationEventArgs) {
        const alerts: ValidationAlerts = {};
        if (parseInt(event.formControl.value, 0) < parseInt(rowData.numberField, 0)) {
            alerts['notValid'] = {
                valid: false,
                message: '"Object Field Number" is not greater than "Number Field"\'s value...',
                severity: ValidationAlertSeverity.Error
            };
        }
        MsftSme.deepAssign(event.alerts, alerts);
    }

    public sampleValidate3(rowData: any, event: CheckValidationEventArgs) {
        const alerts: ValidationAlerts = {};

        for (let i = 0; i < this.sampleEditableData.length; i++) {
            if (this.sampleEditableData[i] !== rowData
                && this.sampleEditableData[i].stringField1 === rowData.stringField1) {
                alerts['duplicated'] = {
                    valid: false,
                    message: '"String Field 1" value is duplicated with other "String Field 1" values...',
                    severity: ValidationAlertSeverity.Error
                };
                break;
            }
        }
        MsftSme.deepAssign(event.alerts, alerts);
    }

    private doDataStreamingReverse(count: number): void {
        const step = 20;
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
