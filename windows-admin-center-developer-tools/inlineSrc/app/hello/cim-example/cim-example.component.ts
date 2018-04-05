import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';
import { Net } from '@msft-sme/shell/core';
import { AjaxError, Subscription } from 'rxjs/Rx';
import { Strings } from '../../../generated/strings';
import { HelloService } from '../hello.service';

/*
//  This component illustrates how to execute a CIM / WMI call to fetch the running processes
//  on the current host (the machine that the app is running on).
//  
//  Included in this example is the PrimeNG grid that we re currently using for displaying 
//  table based data.  

//  NOTE: There might be a future shift away from PrimeNG data grids, but the current direction
//  is as it stands.
*/
@Component({
    selector: 'sme-cim-example',
    template: `
      <sme-loading-wheel *ngIf="loading"></sme-loading-wheel>
      <sme-split-view #sv>
        <sme-split-view-content>
            <sme-master-view>
                <div class="stretch-absolute flex-layout vertical">
                    <sme-tool-header>Processes via WMI call</sme-tool-header>
                    <div class="overflow-margins table-indent">
                      This component provides a short overview / example on how to execute a CIM / WMI call and wait for the resulting dataset.
                      On return, the results are loaded into a data grid that has a fixed height, and is sortable on the "name" column.
                      In future updates, this component will contain examples on how to use the selection mode to view a datagrid item's
                      details inside the SME Details control.
                    </div>
                    <div class="sme-layout-relative sme-position-flex-auto">
                      <div class="sme-layout-relative sme-position-flex-auto">
                        <sme-data-table #smeDataTable [items]="processes" style="height: 300px;" class="sme-layout-absolute sme-position-inset-none" [defaultSortColumn]="customSortColumn" [defaultSortMode]="1">
                          <sme-data-table-column field="name" header="name" sortable="true" width="10%"></sme-data-table-column>
                          <!-- <sme-data-table-column  #customSortColumn  field="commandLine" header="exe" sortable="true">
                            <ng-template let-data>
                              <span class="status-icon sme-icon sme-icon-cluster"></span>
                              <strong>{{data|json}}</strong>
                              <input style="width:60px" />
                          </ng-template>
                          </sme-data-table-column> -->
                          <sme-data-table-column field="cpuPercent" header="CPU %" sortable="true">
                            <ng-template let-data>
                              <!-- <span class="status-icon sme-icon sme-icon-cluster"></span> -->
                              <strong>{{data.cpuPercent}}</strong>
                              <!-- <button onclick="alert('Hello~~~')">I'm a button. I need focus.</button> -->
                            </ng-template>
                          </sme-data-table-column>
                          <sme-data-table-column field="executablePath" header="Path" sortable="true"></sme-data-table-column>
                        </sme-data-table>
                      </div>
                    </div>
                  </div>
              </sme-master-view>
        </sme-split-view-content>
        <sme-split-view-pane>
            <button *ngIf="!sv.isExpanded" (click)="sv.togglePane()">{{ strings.HelloWorld.cim.viewCode }}</button>
            <button *ngIf="sv.isExpanded" (click)="sv.togglePane()">{{ strings.HelloWorld.cim.hideCode }}</button>
            <div *ngIf="sv.isExpanded">
              The presentation layer utilizes Honolulu's custom data grid control.  The code looks like this:
              <pre>
                <code>
                    &lt;sme-data-table #simpleDataTable [items]="dataSource" [(selection)]="selectedData1" class="sme-layout-absolute sme-position-inset-none" [defaultSortColumn]="customSortColumn" [defaultSortMode]="1"&gt;
                  &lt;sme-data-table-column field="process" header="id" sortable="true" width="10%"&gt;&lt;/sme-data-table-column&gt;
                  &lt;sme-data-table-column  #customSortColumn  field="name" header="name" sortable="true"&gt;
                    &lt;ng-template let-data&gt;
                      &lt;span class="status-icon sme-icon sme-icon-cluster"&gt;&lt;/span&gt;
                      &lt;strong&gt;{{ '{' }}{{ '{' }}data.name{{ '}' }}{{ '}' }}&lt;/strong&gt;
                      &lt;input style="width:60px" /&gt;
                  &lt;/ng-template&gt;
                  &lt;/sme-data-table-column&gt;
                  &lt;sme-data-table-column field="cpuPercent" header="CPU %" sortable="true"&gt;
                    &lt;ng-template let-data&gt;
                      &lt;span class="status-icon sme-icon sme-icon-cluster"&gt;&lt;/span&gt;
                      &lt;strong&gt;{{ '{' }}{{ '{' }}data.cpuPercent{{ '}' }}{{ '}' }}&lt;/strong&gt;
                      &lt;button onclick="alert('Hello~~~')"&gt;I'm a button. I need focus.&lt;/button&gt;
                    &lt;/ng-template&gt;
                  &lt;/sme-data-table-column&gt;
                &lt;/sme-data-table&gt;
                </code>
              </pre>
              <br />
              Using the Data Table requires that we import the DataTableModule in the parent module (in this case hello.module.ts).
              <pre>
                <code>
      ...
      imports: [
        ActionsModule,
        AlertBarModule,
        CommonModule,
        <span style="background-color: yellow;">DataTableModule,</span>
        DetailsModule,
        FormsModule,
        LoadingWheelModule,
        SmeStylesModule,
        SvgModule,
        routing,
        ToolHeaderModule,
        TreeTableModule,
        SplitViewModule,
        MasterViewModule
      ]
                </code>
              </pre>
              <br />
              <br />
              The data table is then filled with the results from a WMI call (CIM).  Full code can be found in the file: /src/app/hello/cim-example/cim-example.component.ts.
            </div>
            <!-- <button (click)="sv.togglePane()">Click me to toggle the pane</button>
            <p>I'm the pane. The pane is the area that grows/shrinks.</p>
            <p>The pane takes as much room as it needs.</p>
            <p><b>isExpanded</b>: {{sv.isExpanded}}</p>
            <p *ngIf="sv.isExpanded">You can only see this because the pane is expanded. Because this string is longer, you'll see the pane grow when I appear.
            </p> -->
        </sme-split-view-pane>
      </sme-split-view>
    `,
    styles: [`

    `]
})
export class CimExampleComponent implements OnInit, OnDestroy {
    private processesSubscription: Subscription;
    public processes: any[];
    public errorMessage: string;
    public loading = true;
    public selectedProces: any;
    public strings: Strings;
    public isExpanded: boolean;

    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return MsftSme.resourcesStrings<Strings>().HelloWorld.cim.title;
    }

    constructor(private appContextService: AppContextService,
        private helloService: HelloService) {
        this.strings = MsftSme.resourcesStrings<Strings>();
    }

    public ngOnInit() {
        this.getProcesses();
    }

    /**
     * When dealing with Rx / subscriptions, always remember to unsubscribe to avoid memory leaks
     */
    public ngOnDestroy() {
        this.processesSubscription.unsubscribe();
    }

    public onRowSelect(selectedProcess) {
        // TODO: manage click / grid selection.
    }

    /**
     *  The Get Processes call on the "hello service" execute a WIM call utilizing the CIM standard.
     *  More info: https://msdn.microsoft.com/en-us/library/aa389234(v=vs.85).aspx
     *  Also: https://en.wikipedia.org/wiki/Windows_Management_Instrumentation
     * 
     * This method uses a local subscription reference.  This method should be used on any long running 
     * calls (greater than 200ms) as the ngOnDestroy will ensure that the subscription is canceled,
     * which then results in the cancelation of the task / call.  This is important for navigation, if a
     * user opens a page and navigates away before the call is executed.
     */
    private getProcesses() {
        this.processesSubscription = this.helloService.getProcesses().subscribe(
            (response: any) => {
                this.processes = response;
                this.loading = false;
            },
            (error: AjaxError) => {
                this.errorMessage = Net.getErrorMessage(error);
                this.loading = false;
            }
        );
    }

    /**
     * Refresh all current active queue.
     */
    public refresh(): void {
        // Refresh any QueryCache components and recall data from services.
    }
}