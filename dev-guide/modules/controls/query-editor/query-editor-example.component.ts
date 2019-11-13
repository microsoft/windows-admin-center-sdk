import { Component, ViewChild } from '@angular/core';
import {
    ColumnPickerService,
    DataTableColumnComponent,
    DataTableColumnPickerExtension,
    DataTableComponent,
    Debounce,
    DialogService,
    ExtensionBrokerService,
    QueryDataItemPresetOption,
    QueryDataItemPresetOptions,
    QueryEditorComponent
} from '@msft-sme/angular';
import { NavigationTitle } from '@msft-sme/angular';
import {
    QueryData, QueryDataItemPresetGenerator,
    QueryDataItemValueType, QueryDataOperand
} from '@msft-sme/angular';
import { DateRange } from '@msft-sme/core/base/date/date-range';
import { DataTableColumn } from '@msft-sme/core/data/column-picker';
import {
    ColumnPickerDialogResponse,
    ColumnPickerDialogResponseParameters
} from '@msft-sme/core/data/column-picker';
import { Globalization } from '../../../../../../core/data/globalization';
import { Strings } from '../../../../generated/strings';

@Component({
    selector: 'sme-dev-guide-controls-query-editor',
    styleUrls: ['./query-editor-example.component.css'],
    templateUrl: './query-editor-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Query Editor Component'
})
export class QueryEditorExampleComponent {

    public get queryDataItemValueType() {
        return QueryDataItemValueType;
    }

    constructor(private columnPickerService: ColumnPickerService) {
        this.applyPresetDatetimeRangeOptions();
        this.initDataTableData();
        this.resetPresetQueryFilter();
        this.setApplyButtonInnerHtml(QueryEditorExampleComponent.applyButtonString);
        this.strings = MsftSme.getStrings();
        this.initMasterViewData();
    }
    public static applyButtonString = 'Apply Preset Editor';
    public static unapplyButtonString = 'Clear Preset Editor';

    @ViewChild('dataTable1')
    public dataTable1: DataTableComponent;

    @ViewChild('dataTable2')
    public dataTable2: DataTableComponent;

    @ViewChild('queryEditor1')
    public queryEditor1: QueryEditorComponent;

    @ViewChild('queryEditor2')
    public queryEditor2: QueryEditorComponent;

    public sampleData: any[];
    public selectedData: any;
    public dataSource: any[];
    public isPresetApplied = false;
    public applyButtonInnerHtml: string;
    public showResetButton = true;
    public showAddButton = true;

    public get showResetButtonText() {
        return !this.showResetButton ? 'Show reset button' : 'Hide reset button';
    }

    public get showAddButtonText() {
        return !this.showAddButton ? 'Show add button' : 'Hide add button';
    }

    public presetQueryEditor: QueryData = {
        contents: []
    };

    public presetDatetimeRangeOptions: QueryDataItemPresetOptions = {
        contents: []
    };

    public queryEditorItemPresetGenerator = new QueryDataItemPresetGenerator();
    private columnPickerDialogData: ColumnPickerDialogResponseParameters;
    private dataTable2ColumnPicker: DataTableColumnPickerExtension;

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

    private localizedDataSet: Set<SampleData> = new Set();

    private applyPresetDatetimeRangeOptions() {
        if (!this.presetDatetimeRangeOptions) {
            this.presetDatetimeRangeOptions = {
                contents: []
            };
        }
        this.presetDatetimeRangeOptions.contents.push({
            fieldName: 'shortDisplayTime',
            fieldValue: [
                {
                    label: 'Next Minute',
                    value: new DateRange(new Date().valueOf(), new Date().valueOf() + 1000 * 60)
                },
                {
                    label: 'Prev Minute',
                    value: new DateRange(new Date().valueOf() - 1000 * 60, new Date().valueOf())
                }
            ]
        });
    }

    private initMasterViewData() {
        for (let i = 0; i < 50; i++) {
            this.items.push({ name: i, displayName: 'Item ' + i });
        }
    }

    private setApplyButtonInnerHtml(input: string) {
        this.applyButtonInnerHtml = input;
    }

    public applyPresetQueryFilter(isPresetApplied?: boolean) {
        if (!isPresetApplied) {
            this.setIsPresetApplied(true);
            this.applyPresetQueryFilterData();
        } else {
            this.setIsPresetApplied(false);
            this.resetPresetQueryFilter();
        }
        this.queryEditor1.resetQueryEditor();
    }

    private setIsPresetApplied(input: boolean) {
        this.isPresetApplied = input;
        if (input) {
            this.setApplyButtonInnerHtml(QueryEditorExampleComponent.unapplyButtonString);
        } else {
            this.setApplyButtonInnerHtml(QueryEditorExampleComponent.applyButtonString);
        }
    }

    public applyPresetQueryFilterData() {
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
            .itemGenerator(item3column, QueryDataOperand.Eq, item3value, null, null, 'sme-icon sme-icon-heart');

        const item4column = this.queryEditorItemPresetGenerator
            .columnGenerator('Object Field Text', 'objectField.text', true);
        const item4value = this.queryEditorItemPresetGenerator
            .valueGenerator(['Object Field 1', 'Object Field 9'], QueryDataItemValueType.MultiSelectDropdown);
        const item4 = this.queryEditorItemPresetGenerator
            .itemGenerator(item4column, QueryDataOperand.Eq, item4value, true, null, 'sme-icon sme-icon-contact');

        const item5column = this.queryEditorItemPresetGenerator
            .columnGenerator('Short Display Time', 'shortDisplayTime');
        const item5value = this.queryEditorItemPresetGenerator
            .valueGenerator(this.presetDatetimeRangeOptions.contents[0].fieldValue[1], QueryDataItemValueType.TimespanDropdown);
        const item5 = this.queryEditorItemPresetGenerator
            .itemGenerator(item5column, QueryDataOperand.Eq, item5value);

        this.presetQueryEditor.contents.push(item1, item2, item3, item4, item5);
    }

    private resetPresetQueryFilter() {
        this.presetQueryEditor.contents = [];
    }

    private initDataTableData() {
        const newData = [];
        const currentTime = new Date();
        let currentTimeValue = currentTime.valueOf();
        for (let i = 0; i < 30; i++) {
            currentTimeValue -= i * 1000;
            const currentTimeDate = new Date(currentTimeValue);

            newData.push({
                field1: 'Field 1 ' + i,
                field2: i,
                field3: 'Field 3 ' + i,
                field4: i,
                field5: 'Field 5 ' + i,
                description: i % 3 === 0 ?
                    'Long description'
                    : 'short description',
                objectField: {
                    text: 'Object Field ' + i,
                    number: i
                },
                timestamp: currentTimeValue,
                shortDisplayTime: currentTimeDate
            });
            newData.push({
                field1: 'Field 1 ' + i,
                field2: i + 0.5,
                field3: 'Field 3 ' + (i + 0.5),
                field4: i + 0.5,
                field5: 'Field 5 ' + (i + 0.5),
                description: i % 3 === 0 ?
                    'Long description'
                    : 'short description',
                objectField: {
                    text: 'Object Field ' + (i + 0.5),
                    number: i + 0.5
                },
                timestamp: currentTimeValue,
                shortDisplayTime: currentTimeDate
            });
        }

        this.dataSource = newData;
    }

    public getItemIdentityFunction(data: any): string {
        return data.field1;
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

    public localizeTime(localizedDataRecord: SampleData): string {
        if (!this.localizedDataSet.has(localizedDataRecord)) {
            const validDate = new Date(localizedDataRecord.timestamp);
            localizedDataRecord.shortDisplayTime = Globalization.dateTimeOnly(validDate);
            localizedDataRecord.fullDisplayTime = Globalization.fullTime(validDate);
            this.localizedDataSet.add(localizedDataRecord);
        }
        return localizedDataRecord.fullDisplayTime;
    }

    public showColumnPicker() {
        if (this.dataTable2) {
            if (!this.dataTable2ColumnPicker) {
                this.dataTable2ColumnPicker = new DataTableColumnPickerExtension(this.dataTable2);
            }

            this.columnPickerService.show(this.dataTable2ColumnPicker.mapColumn(), this.columnPickerDialogData)
                .subscribe((result: ColumnPickerDialogResponse) => {
                    if (result && result.confirmed === true) {
                        this.dataTable2ColumnPicker.applyColumnPickerChange(result.parameters);
                        this.columnPickerDialogData = result.parameters;
                    }
                });
        }
    }
}

export interface SampleData {
    field1: string;
    field2: number;
    field3: string;
    field4: number;
    field5: string;
    description: string;
    objectField: object;
    timestamp: number;
    shortDisplayTime?: string;
    fullDisplayTime?: string;
}
