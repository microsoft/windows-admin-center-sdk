import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-master-view-example',
    template: `
      <sme-split-view class="sme-layout-absolute sme-position-inset-none" #sv>
          <sme-split-view-pane>
              <sme-details title="My Details Title" [(isExpanded)]="sv.isExpanded">
                  <div>this is the content</div>
                  <div>this is the content</div>
                  <div>this is the content</div>
                  <div>this is the content</div>
                  <div>this is the content</div>
                  <div>this is the content</div>
                  <div>this is the content</div>
                  <div>this is the content</div>
                  <div>this is the content</div>
                  <div>this is the content</div>
              </sme-details>
          </sme-split-view-pane>

          <sme-split-view-content>
              <sme-master-view #masterView header="Master View Example" [showCustomFilter]="true" [total]="smeDataTable.renderedItems.length" [selection]="selection" [filterActive]="active" (clearSelection)="selection = null" (refresh)="alert('refreshed')" (filter)="active = !active; alert('filter active: ' + active)"
                  (clearSelection)="selection=null">
                  <sme-action-bar #actionBar>
                      <sme-action-button #action [text]="'Toggle Search'" (execute)="masterView.searchable = !masterView.searchable"></sme-action-button>
                      <sme-action-button #action [text]="'Toggle Header'" (execute)="masterView.header = masterView.header ? '' : 'Header' "></sme-action-button>
                  </sme-action-bar>

                  <div class="sme-master-view-custom-filter sme-arrange-stack-h sme-layout-action-bar-item">
                      <span class="sme-scheme-secondary-text sme-arrange-ws-nowrap" for="groupBy"> Group by:</span>
                      <div class="sme-select">
                          <select id="groupBy" required [(ngModel)]="groupField" name="groupBy" #groupBy="ngModel" (ngModelChange)="onDropdownChange($event)">
                            <option *ngFor="let option of groupByOptions" [value]="option.field">{{option.displayName}}</option>
                          </select>
                      </div>
                  </div>
                  <!-- 
             
      :host >>> .extra-filter-container .combobox {
          width: unset;
      }

      :host >>> .extra-filter-container select {
          color: #2D3239;
          border-color: #B3B3B3;
          font-size: 14px;
      }

      :host >>> .extra-filter-container .extra-filter-label {
          color: #686868;
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          margin-right: 6px;
          margin-left: 12px;
          max-width: 150px;
      } */
                   -->


                  <input #search type="search" pInputText autofocus>

                  <sme-data-table #smeDataTable [items]="items" [(selection)]="selection" [globalFilter]="search">
                      <sme-data-table-column field="name" header="Name" sortable="true">
                      </sme-data-table-column>
                      <sme-data-table-column field="displayName" header="Display Name" sortable="true" [searchable]="false">
                      </sme-data-table-column>
                  </sme-data-table>
              </sme-master-view>
          </sme-split-view-content>
      </sme-split-view>
    `
})
export class MasterViewExampleComponent {

    public groupByOptions = [
        { displayName: 'Optoin 1', field: 'field 1' },
        { displayName: 'Option 2', field: 'field 2' },
        { displayName: 'Option 3', field: 'field 3' },
        { displayName: 'Some other thing', field: 'field 4' }
    ];

    public groupField = '';

    public active = false;
    public items = [];

    public selection = null;

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-master-view';
    }

    constructor() {
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
}
