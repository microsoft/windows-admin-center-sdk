import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs/Rx';
import { Strings } from '../../../generated/strings';

@Component({
  selector: 'sme-control-example',
  template: `
    <div class="flex-layout stretch-absolute">
        <div class="fixed-flex-size flex-layout vertical tree-pane tool-pane">
            <sme-tree-example class="full-height fixed-flex-size tree-pane relative border-right" (onSelectionChange)="onTreeSelectionChange($event)"></sme-tree-example>
        </div>
        <sme-cim-example class="auto-flex-size relative" *ngIf="selectedPath === 'WMI'"></sme-cim-example>
        <sme-powershell-example class="auto-flex-size relative" *ngIf="selectedPath === 'PowerShell'"></sme-powershell-example>
        <sme-dll-example *ngIf="selectedPath === 'DLL'"></sme-dll-example>
        <sme-user-profile-example *ngIf="selectedPath === 'UserProfile'"></sme-user-profile-example>
        <sme-notifications-example *ngIf="selectedPath === 'Notifications'"></sme-notifications-example>

        <div *ngIf="selectedPath === 'TreeCode'" class="overflow-margins table-indent full-row">
            The full code examples for the Tree Table can be found in this extension: "/src/app/hello/tree-example".
            <br /><br /> The Angular template follows this structure:
            <pre>
              <code>
                  &lt;sme-tree-table [items]="treeData" [(selection)]="selectedData" (onNodeSelect)="onNodeSelect($event)" class="sme-layout-absolute sme-position-inset-none" [showHeader]="false"
                  [showGrid]="false" [showLeftMargin]="false"&gt;
                      &lt;sme-tree-table-column field="label" header="Name" sortable="true" width="40%"&gt;
                          &lt;ng-template let-data&gt;
                              &lt;span *ngIf="data.type==='folder'" class="sme-icon sme-icon-folder"&gt;&lt;/span&gt;
                              &lt;span *ngIf="data.type!=='folder'" class="placeholder"&gt;&lt;/span&gt;
                              &lt;strong&gt;{{ '{' }}{{ '{' }}data.label{{ '}' }}{{ '}' }}&lt;/strong&gt;
                          &lt;/ng-template&gt;
                      &lt;/sme-tree-table-column&gt;                
                  &lt;/sme-tree-table&gt;
              </code>
          </pre>
            <br /><br /> In this example, we've loaded the data nodes from an external variable (defined in the testData.ts file):
            <pre>
              <code>
                  import {{ '{' }} TreeNodeDataItem {{ '}' }} from '@msft-sme/shell/angular';

                  /* tslint:disable */
                  export var TestData = &lt;TreeNodeDataItem&gt;{{ '{' }}
                    data: {{ '{' }}
                      label: 'API Examples',
                      type: 'folder',
                      expanded: true,
                      data: 'WMI',
                      isLeaf: false
                      {{ '}' }},
                    children: [
                    {{ '{' }}
                        data: {{ '{' }}
                          label: 'WMI',
                          type: '',
                          expanded: true,
                          data: 'WMI',
                          isLeaf: true
                          {{ '}' }}
                          {{ '}' }},
                      {{ '{' }}
                        data: {{ '{' }}
                          label: 'PowerShell',
                          type: '',
                          expanded: true,
                          data: 'PowerShell',
                          isLeaf: true
                          {{ '}' }}
                          {{ '}' }},
                      {{ '{' }}
                        data: {{ '{' }}
                          label: 'DLL',
                          type: '',
                          expanded: true,
                          data: 'DLL',
                          isLeaf: true
                          {{ '}' }}
                          {{ '}' }},
                      {{ '{' }}
                        data: {{ '{' }}
                          label: 'User Profile',
                          type: '',
                          expanded: true,
                          data: 'UserProfile',
                          isLeaf: true
                          {{ '}' }}
                          {{ '}' }},
                      {{ '{' }}
                        data: {{ '{' }}
                          label: 'Tree View Code',
                          type: '',
                          expanded: true,
                          data: 'TreeCode',
                          isLeaf: true
                          {{ '}' }}
                          {{ '}' }}
                    ]
                    {{ '}' }};
              </code>
          </pre>
          <br /><br />
          After defining the data, we load the tree into a variable that is bound to the "items" property:
          <pre>
            <code>
                public ngOnInit() {{ '{' }}
                  this.treeData = [TestData];
                  this.loading = false;
                  {{ '}' }}
            </code>
          </pre>
          Changing content of the tree (or table for that matter) is as easy as changing the data that is bound to the "items" property.  If you want to remove a node, simply remove the data element from the array.
        </div>
    </div>
  `,
  styles: [`
    .tree-pane {
        width: 320px;
      }
  
      /* Should strongly consider moving these styles out to NG2 */
      .sme-icon:before {
        margin-right: 4px;
        line-height: 14px;
        vertical-align: middle;
      }
  
      .sme-icon {
        text-align: center;
      }
  
      a.breadCrumb {
        color: black;
      }

      .full-height {
        height: 100%;
    }
  `]
})
export class ControlExampleComponent implements OnInit {
  public strings: Strings;
  private changed: Subject<string> = new Subject<string>();
  private subscription: Subscription;
  public selectedPath: string;

  constructor() {
    this.strings = MsftSme.resourcesStrings<Strings>();
  }

  public ngOnInit() {
    // Init logic if any.
    this.subscription = this.changed
      .debounceTime(250)
      .subscribe(path => {
        this.selectedPath = path;
      });

    this.selectedPath = 'WMI';
  }

  /**
   * The method to run when the selection of the file explorer directory tree is changed.
   *
   * @param {any} event The directory tree selection event.
   */
  public onTreeSelectionChange(event: any): void {
    this.changed.next(event);
  }
}
