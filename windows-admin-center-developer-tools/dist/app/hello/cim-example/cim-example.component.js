import { Component } from '@angular/core';
import { AppContextService } from '@msft-sme/shell/angular';
import { Net } from '@msft-sme/shell/core';
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
var CimExampleComponent = /** @class */ (function () {
    function CimExampleComponent(appContextService, helloService) {
        this.appContextService = appContextService;
        this.helloService = helloService;
        this.loading = true;
        this.strings = MsftSme.resourcesStrings();
    }
    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    CimExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return MsftSme.resourcesStrings().HelloWorld.cim.title;
    };
    CimExampleComponent.prototype.ngOnInit = function () {
        this.getProcesses();
    };
    /**
     * When dealing with Rx / subscriptions, always remember to unsubscribe to avoid memory leaks
     */
    CimExampleComponent.prototype.ngOnDestroy = function () {
        this.processesSubscription.unsubscribe();
    };
    CimExampleComponent.prototype.onRowSelect = function (selectedProcess) {
        // TODO: manage click / grid selection.
    };
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
    CimExampleComponent.prototype.getProcesses = function () {
        var _this = this;
        this.processesSubscription = this.helloService.getProcesses().subscribe(function (response) {
            _this.processes = response;
            _this.loading = false;
        }, function (error) {
            _this.errorMessage = Net.getErrorMessage(error);
            _this.loading = false;
        });
    };
    /**
     * Refresh all current active queue.
     */
    CimExampleComponent.prototype.refresh = function () {
        // Refresh any QueryCache components and recall data from services.
    };
    CimExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-cim-example',
                    template: "\n      <sme-loading-wheel *ngIf=\"loading\"></sme-loading-wheel>\n      <sme-split-view #sv>\n        <sme-split-view-content>\n            <sme-master-view>\n                <div class=\"stretch-absolute flex-layout vertical\">\n                    <sme-tool-header>Processes via WMI call</sme-tool-header>\n                    <div class=\"overflow-margins table-indent\">\n                      This component provides a short overview / example on how to execute a CIM / WMI call and wait for the resulting dataset.\n                      On return, the results are loaded into a data grid that has a fixed height, and is sortable on the \"name\" column.\n                      In future updates, this component will contain examples on how to use the selection mode to view a datagrid item's\n                      details inside the SME Details control.\n                    </div>\n                    <div class=\"sme-layout-relative sme-position-flex-auto\">\n                      <div class=\"sme-layout-relative sme-position-flex-auto\">\n                        <sme-data-table #smeDataTable [items]=\"processes\" style=\"height: 300px;\" class=\"sme-layout-absolute sme-position-inset-none\" [defaultSortColumn]=\"customSortColumn\" [defaultSortMode]=\"1\">\n                          <sme-data-table-column field=\"name\" header=\"name\" sortable=\"true\" width=\"10%\"></sme-data-table-column>\n                          <!-- <sme-data-table-column  #customSortColumn  field=\"commandLine\" header=\"exe\" sortable=\"true\">\n                            <ng-template let-data>\n                              <span class=\"status-icon sme-icon sme-icon-cluster\"></span>\n                              <strong>{{data|json}}</strong>\n                              <input style=\"width:60px\" />\n                          </ng-template>\n                          </sme-data-table-column> -->\n                          <sme-data-table-column field=\"cpuPercent\" header=\"CPU %\" sortable=\"true\">\n                            <ng-template let-data>\n                              <!-- <span class=\"status-icon sme-icon sme-icon-cluster\"></span> -->\n                              <strong>{{data.cpuPercent}}</strong>\n                              <!-- <button onclick=\"alert('Hello~~~')\">I'm a button. I need focus.</button> -->\n                            </ng-template>\n                          </sme-data-table-column>\n                          <sme-data-table-column field=\"executablePath\" header=\"Path\" sortable=\"true\"></sme-data-table-column>\n                        </sme-data-table>\n                      </div>\n                    </div>\n                  </div>\n              </sme-master-view>\n        </sme-split-view-content>\n        <sme-split-view-pane>\n            <button *ngIf=\"!sv.isExpanded\" (click)=\"sv.togglePane()\">{{ strings.HelloWorld.cim.viewCode }}</button>\n            <button *ngIf=\"sv.isExpanded\" (click)=\"sv.togglePane()\">{{ strings.HelloWorld.cim.hideCode }}</button>\n            <div *ngIf=\"sv.isExpanded\">\n              The presentation layer utilizes Honolulu's custom data grid control.  The code looks like this:\n              <pre>\n                <code>\n                    &lt;sme-data-table #simpleDataTable [items]=\"dataSource\" [(selection)]=\"selectedData1\" class=\"sme-layout-absolute sme-position-inset-none\" [defaultSortColumn]=\"customSortColumn\" [defaultSortMode]=\"1\"&gt;\n                  &lt;sme-data-table-column field=\"process\" header=\"id\" sortable=\"true\" width=\"10%\"&gt;&lt;/sme-data-table-column&gt;\n                  &lt;sme-data-table-column  #customSortColumn  field=\"name\" header=\"name\" sortable=\"true\"&gt;\n                    &lt;ng-template let-data&gt;\n                      &lt;span class=\"status-icon sme-icon sme-icon-cluster\"&gt;&lt;/span&gt;\n                      &lt;strong&gt;{{ '{' }}{{ '{' }}data.name{{ '}' }}{{ '}' }}&lt;/strong&gt;\n                      &lt;input style=\"width:60px\" /&gt;\n                  &lt;/ng-template&gt;\n                  &lt;/sme-data-table-column&gt;\n                  &lt;sme-data-table-column field=\"cpuPercent\" header=\"CPU %\" sortable=\"true\"&gt;\n                    &lt;ng-template let-data&gt;\n                      &lt;span class=\"status-icon sme-icon sme-icon-cluster\"&gt;&lt;/span&gt;\n                      &lt;strong&gt;{{ '{' }}{{ '{' }}data.cpuPercent{{ '}' }}{{ '}' }}&lt;/strong&gt;\n                      &lt;button onclick=\"alert('Hello~~~')\"&gt;I'm a button. I need focus.&lt;/button&gt;\n                    &lt;/ng-template&gt;\n                  &lt;/sme-data-table-column&gt;\n                &lt;/sme-data-table&gt;\n                </code>\n              </pre>\n              <br />\n              Using the Data Table requires that we import the DataTableModule in the parent module (in this case hello.module.ts).\n              <pre>\n                <code>\n      ...\n      imports: [\n        ActionsModule,\n        AlertBarModule,\n        CommonModule,\n        <span style=\"background-color: yellow;\">DataTableModule,</span>\n        DetailsModule,\n        FormsModule,\n        LoadingWheelModule,\n        SmeStylesModule,\n        SvgModule,\n        routing,\n        ToolHeaderModule,\n        TreeTableModule,\n        SplitViewModule,\n        MasterViewModule\n      ]\n                </code>\n              </pre>\n              <br />\n              <br />\n              The data table is then filled with the results from a WMI call (CIM).  Full code can be found in the file: /src/app/hello/cim-example/cim-example.component.ts.\n            </div>\n            <!-- <button (click)=\"sv.togglePane()\">Click me to toggle the pane</button>\n            <p>I'm the pane. The pane is the area that grows/shrinks.</p>\n            <p>The pane takes as much room as it needs.</p>\n            <p><b>isExpanded</b>: {{sv.isExpanded}}</p>\n            <p *ngIf=\"sv.isExpanded\">You can only see this because the pane is expanded. Because this string is longer, you'll see the pane grow when I appear.\n            </p> -->\n        </sme-split-view-pane>\n      </sme-split-view>\n    ",
                    styles: ["\n\n    "]
                },] },
    ];
    /** @nocollapse */
    CimExampleComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: HelloService, },
    ]; };
    return CimExampleComponent;
}());
export { CimExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9oZWxsby9jaW0tZXhhbXBsZS9jaW0tZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBRTdELE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLHlCQUFBLENBQTBCO0FBQzVELE9BQU8sRUFBRSxHQUFBLEVBQUksTUFBTyxzQkFBQSxDQUF1QjtBQUczQyxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8sa0JBQUEsQ0FBbUI7QUFFaEQ7Ozs7Ozs7OztFQVNFO0FBRUY7SUFpQkksNkJBQW9CLGlCQUFvQyxFQUM1QyxZQUEwQjtRQURsQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQzVDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBZC9CLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFlbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQztJQUN2RCxDQUFDO0lBWEQ7OztPQUdHO0lBQ1csbUNBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQ3BFLENBQUM7SUFPTSxzQ0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRztJQUNJLHlDQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFTSx5Q0FBVyxHQUFsQixVQUFtQixlQUFlO1FBQzlCLHVDQUF1QztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0ssMENBQVksR0FBcEI7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FDbkUsVUFBQyxRQUFhO1lBQ1YsS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQyxFQUNELFVBQUMsS0FBZ0I7WUFDYixLQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSSxxQ0FBTyxHQUFkO1FBQ0ksbUVBQW1FO0lBQ3ZFLENBQUM7SUFDRSw4QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSwybE1BbUdUO29CQUNELE1BQU0sRUFBRSxDQUFDLFVBRVIsQ0FBQztpQkFDTCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsa0NBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO1FBQzNCLEVBQUMsSUFBSSxFQUFFLFlBQVksR0FBRztLQUNyQixFQUg2RixDQUc3RixDQUFDO0lBQ0YsMEJBQUM7Q0FuTEQsQUFtTEMsSUFBQTtTQW5MWSxtQkFBbUIiLCJmaWxlIjoiY2ltLWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL21hdHdpbHMvU291cmNlL2Jhc2UvbXNmdC1zbWUtZGV2ZWxvcGVyLXRvb2xzL2lubGluZVNyYy8ifQ==