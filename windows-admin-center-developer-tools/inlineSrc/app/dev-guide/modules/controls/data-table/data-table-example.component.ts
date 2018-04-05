import { Component, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { DataTableComponent, DataTableCustomSortEvent, DataTableLazyLoadEvent } from '@msft-sme/shell/angular';
import { TestData } from './testData';

@Component({
    selector: 'sme-ng2-controls-data-table-example',
    styles: [`
      /* The following style is only for the example page to hardcode a height for the data table. */
      /* In the actual UI code we don't do this to the data table. */
      :host >>> .data-table-container{
          position: relative;
          height:300px
      }

      :host >>> .table-chart{
          padding: 10px 0;
          display: block;
      }
    `],
    template: `
      <div class="sme-layout-absolute sme-position-inset-none sme-arrange-stack-v">
          <section class="sme-position-flex-none">
              <h2>Data Table Component</h2>
          </section>

          <section class="sme-position-flex-none">
              <br/>
              <ul class="nav nav-tabs" role="tablist" role="presentation">
                  <li [class.active]="tabIndex===1">
                      <a (click)="clickTab(1)">Simple Scenario</a>
                  </li>
                  <li [class.active]="tabIndex===2">
                      <a (click)="clickTab(2)">Multiple Selection</a>
                  </li>
                  <li [class.active]="tabIndex===3">
                      <a (click)="clickTab(3)">Lazy Loading</a>
                  </li>
                  <li [class.active]="tabIndex===4">
                      <a (click)="clickTab(4)">Data Streaming</a>
                  </li>
                  <li [class.active]="tabIndex===5">
                      <a (click)="clickTab(5)">Grouping</a>
                  </li>
              </ul>        
          </section>
          <section *ngIf="tabIndex==1" class="sme-position-flex-auto sme-arrange-stack-v">
              <h4 class="sme-position-flex-none">Simple Scenarios</h4>
              <div class="sme-position-flex-none">
                  <button (click)="useSample1()">Use Sample 1 Data</button>
                  <button (click)="useSample2()">Use Sample 2 Data</button>
              </div>
              <div class="sme-layout-relative sme-position-flex-auto">
                  <sme-data-table #simpleDataTable [items]="dataSource" [(selection)]="selectedData1" class="sme-layout-absolute sme-position-inset-none"
                      [defaultSortColumn]="customSortColumn" [defaultSortMode]="1">
                      <sme-data-table-column field="field1" header="String Field 1" sortable="true"></sme-data-table-column>
                      <sme-data-table-column field="field2" header="Number Field 2" sortable="true">
                          <ng-template let-data>
                              <span class="status-icon sme-icon sme-icon-cluster"></span>
                              <strong>{{data.field2}}</strong>
                              <a href="http://www.google.com" target="_blank">Link</a>
                          </ng-template>
                      </sme-data-table-column>
                      <sme-data-table-column field="field3" header="String Field 3" sortable="true" width="20%">
                          <ng-template let-data>
                              <span class="status-icon sme-icon sme-icon-cluster"></span>
                              <strong>{{data.field3}}</strong>
                              <button onclick="alert('Hello~~~')">I'm a button. I need focus.</button>
                          </ng-template>
                      </sme-data-table-column>
                      <sme-data-table-column #customSortColumn field="field4" header="number Field 4" sortable="true">
                          <ng-template let-data>
                              <span class="status-icon sme-icon sme-icon-cluster"></span>
                              <strong>{{data.field4}}</strong>
                              <input style="width:60px" />
                          </ng-template>
                      </sme-data-table-column>
                      <sme-data-table-column field="field5" header="String Field 5 (Custom Sort: put all items with '2' at one side" sortable="custom"
                          [compareFunction]="customSortCompare"></sme-data-table-column>
                      <sme-data-table-column field="description" header="Long Text Column" sortable="true" width="30%"></sme-data-table-column>
                      <sme-data-table-column field="objectField.text" header="Object Field Text" sortable="true"></sme-data-table-column>
                      <sme-data-table-column field="objectField.number" header="Object Field Number" sortable="true"></sme-data-table-column>
                  </sme-data-table>
              </div>
              <div class="sme-position-flex-none sme-focus-zone">
                  <span>Selected Item: </span>
                  <span class='selected-items-1'>{{selectedData1 && selectedData1.field1}}</span>
                  <span>, Selected Index: {{simpleDataTable.getActiveRenderedItemIndex()}}</span>
                  <button onclick="alert('Hello~~~')">I'm a button. I need focus.</button>
              </div>
          </section>
          <section *ngIf="tabIndex==2" class="sme-position-flex-auto sme-arrange-stack-v">
              <h4 class="sme-position-flex-none">Multiple Selection</h4>
              <div class="sme-layout-relative sme-position-flex-auto">
                  <sme-data-table [items]="dataSource" [(selection)]="selectedData2" selectionMode="multiple" class="sme-layout-absolute sme-position-inset-none">
                      <sme-data-table-column field="field1" header="String Field 1" sortable="true"></sme-data-table-column>
                      <sme-data-table-column field="field2" header="Number Field 2" sortable="true">
                          <ng-template let-index="index" let-data>
                              <span [ngClass]="{'sme-icon-cluster':index%2==0}" class="status-icon sme-icon"></span>
                              <strong>{{data.field2}}</strong>
                          </ng-template>
                      </sme-data-table-column>
                      <sme-data-table-column field="field3" header="String Field 3" sortable="true">
                           <ng-template let-data>
                              <span class="status-icon sme-icon sme-icon-cluster"></span>
                              <strong>{{data.field3}}</strong>                        
                          </ng-template>
                      </sme-data-table-column>
                      <sme-data-table-column field="field4" header="Number Field 4" sortable="true">
                          <ng-template let-data>
                              <sme-capacity-bar-chart class="table-chart" [height]="10" [totalCapacity]="100" [capacityUsed]="data.field4"></sme-capacity-bar-chart>
                          </ng-template>
                      </sme-data-table-column>
                      <sme-data-table-column field="field5" header="String Field 5" sortable="custom" [compareFunction]="customSortCompare"></sme-data-table-column>
                      <sme-data-table-column field="description" header="Long Text Column" sortable="true"></sme-data-table-column>
                  </sme-data-table>
              </div>
              <div class="sme-position-flex-none">
                  <span>Selected Items: </span>
                  <span class='selected-items-2' *ngIf="selectedData2 && selectedData2.length<10">
                      <span *ngFor="let item of selectedData2">{{item.field1}} </span>
                  </span>
                  <span *ngIf="selectedData2 && selectedData2.length>=10">
                      {{selectedData2.length}} items
                  </span>
              </div>
          </section>
          <section *ngIf="tabIndex==3" class="sme-position-flex-auto sme-arrange-stack-v">
              <h4 class="sme-position-flex-none">Lazy Loading</h4>
              <div class="sme-layout-relative sme-position-flex-auto">
                  <sme-data-table [lazyLoad]="true" [virtualCount]="virtualCount" (lazyLoadingData)="onLazyLoad($event)" [(selection)]="selectedData3"
                      class="sme-layout-absolute sme-position-inset-none">
                      <sme-data-table-column field="field1" header="String Field 1" sortable="true"></sme-data-table-column>
                      <sme-data-table-column field="field2" header="Number Field 2" sortable="true">
                          <ng-template let-index="index" let-data>
                              <span [ngClass]="{'sme-icon-cluster':index%2==0}" class="status-icon sme-icon"></span>
                              <strong>{{data.field2}}</strong>
                          </ng-template>
                      </sme-data-table-column>
                      <sme-data-table-column field="field3" header="String Field 3" sortable="true"></sme-data-table-column>
                      <sme-data-table-column field="field4" header="Number Field 4" sortable="true">
                          <ng-template let-data>
                              <sme-capacity-bar-chart class="table-chart" [height]="10" [totalCapacity]="100" [capacityUsed]="data.field4"></sme-capacity-bar-chart>
                          </ng-template>
                      </sme-data-table-column>
                      <sme-data-table-column field="field5" header="String Field 5" sortable="custom" [compareFunction]="customSortCompare"></sme-data-table-column>
                      <sme-data-table-column field="description" header="Long Text Column" sortable="true"></sme-data-table-column>
                  </sme-data-table>
              </div>
          </section>
          <section *ngIf="tabIndex==4" class="sme-position-flex-auto sme-arrange-stack-v">
              <h4 class="sme-position-flex-none">Data Streaming</h4>
              <div class="sme-position-flex-none">
                  <button (click)="startDataStreaming()">Start Data Streaming</button> <button (click)="stopDataStreaming()">Stop Data Streaming</button>
                  <span>Count: {{sampleData4 && sampleData4.length}}</span>
              </div>
              <div class="sme-layout-relative sme-position-flex-auto">
                  <sme-data-table #dataTableForDataStreaming [items]="sampleData4" [(selection)]="selectedData4" class="sme-layout-absolute sme-position-inset-none"
                      [defaultSortColumn]="defaultSortColumn" [defaultSortMode]="1" (doCustomSort)="doCustomSort($event)">
                      <sme-data-table-column field="field1" header="String Field 1" sortable="true"></sme-data-table-column>
                      <sme-data-table-column field="field2" header="Number Field 2" sortable="true">
                          <ng-template let-index="index" let-data>
                              <span [ngClass]="{'sme-icon-cluster':index%2==0}" class="status-icon sme-icon"></span>
                              <strong>{{data.field2}}</strong>
                          </ng-template>
                      </sme-data-table-column>
                      <sme-data-table-column field="field3" header="String Field 3" sortable="true"></sme-data-table-column>
                      <sme-data-table-column field="field4" header="Number Field 4" sortable="true">
                          <ng-template let-data>
                              <sme-capacity-bar-chart class="table-chart" [height]="10" [totalCapacity]="100" [capacityUsed]="data.field4"></sme-capacity-bar-chart>
                          </ng-template>
                      </sme-data-table-column>
                      <sme-data-table-column #defaultSortColumn field="field5" header="String Field 5" sortable="true"></sme-data-table-column>
                      <sme-data-table-column field="description" header="Long Text Column" sortable="true"></sme-data-table-column>
                  </sme-data-table>
              </div>
          </section>
          <section *ngIf="tabIndex==5" class="sme-position-flex-auto sme-arrange-stack-v">
              <h4 class="sme-position-flex-none">Grouping</h4>
              <div class="sme-position-flex-none">
                  <span>Group Column</span>
                  <select [(ngModel)]="groupColumnField" (change)="onGroupColumnChanged()">
              <option value="">(None)</option>
              <option *ngFor="let column of groupDataTable.columns" value="{{column.field}}">{{column.header}}</option>
            </select>
                  <span>Sort</span>
                  <select [(ngModel)]="groupSortMode" (change)="onGroupSortModeChanged()">
              <option value="0">None</option>
              <option value="1">Ascend</option>
              <option value="2">Descend</option>
            </select>
                  <button (click)="groupDataTable.expandAllGroup()">Expand all groups</button>
                  <button (click)="groupDataTable.collaseAllGroup()">Collapse all groups</button>
              </div>
              <div class="sme-layout-relative sme-position-flex-auto">
                  <sme-data-table #groupDataTable [items]="sampleData5" selectionMode="multiple" [groupColumn]="groupColumn" useGroupToggle="true"
                      [defaultGroupToggleExpanded]="true" [(selection)]="selectedData5" class="sme-layout-absolute sme-position-inset-none"
                      [defaultSortColumn]="customSortColumn" [defaultSortMode]="1">
                      <ng-template let-data #group>
                          <b>{{data || '(empty)'}}</b> <span>{{getGroupSummary(data)}}</span>
                      </ng-template>
                      <sme-data-table-column field="ContactName" header="Contract Name" sortable="true"></sme-data-table-column>
                      <sme-data-table-column field="CompanyName" header="Company Name" sortable="true"></sme-data-table-column>
                      <sme-data-table-column field="ContactTitle" header="Contact Title" sortable="true">
                          <ng-template let-data>
                              <span class="status-icon sme-icon sme-icon-cluster"></span>
                              <b>{{data.ContactTitle}}</b>
                          </ng-template>
                      </sme-data-table-column>
                      <sme-data-table-column field="Address" header="Address" sortable="true"></sme-data-table-column>
                      <sme-data-table-column #groupColumn field="City" header="City" sortable="true"></sme-data-table-column>
                      <sme-data-table-column field="PostalCode" header="PostalCode" sortable="true"></sme-data-table-column>
                      <sme-data-table-column field="Country" header="Country" sortable="true"></sme-data-table-column>
                      <sme-data-table-column field="Phone" header="Phone" sortable="true"></sme-data-table-column>
                      <sme-data-table-column field="Fax" header="Fax" sortable="true"></sme-data-table-column>
                  </sme-data-table>
              </div>
              <div class="sme-position-flex-none">
                  Selected Items: <span *ngFor="let item of selectedData5">{{item.ContactName}} </span>
              </div>
          </section>
      </div>
    `
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
