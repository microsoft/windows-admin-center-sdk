import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TreeNodeDataItem } from '@msft-sme/shell/angular';
import { expand } from 'rxjs/operator/expand';
import { Strings } from '../../../generated/strings';
import { TestData } from './testData';

@Component({
  selector: 'sme-tree-example',
  template: `
    <sme-tree-table [items]="treeData" [(selection)]="selectedData" (onNodeSelect)="onNodeSelect($event)" class="sme-layout-absolute sme-position-inset-none" [showHeader]="false"
    [showGrid]="false" [showLeftMargin]="false">
        <sme-tree-table-column field="label" header="Name" sortable="true" width="40%">
            <ng-template let-data>
                <span *ngIf="data.type==='folder'" class="sme-icon sme-icon-folder"></span>
                <span *ngIf="data.type!=='folder'" class="placeholder"></span>
                <strong>{{data.label}}</strong>
            </ng-template>
        </sme-tree-table-column>                
    </sme-tree-table>
  `,
  styles: [`

  `]
})
export class TreeExampleComponent implements OnInit {
  @Output()
  public onSelectionChange = new EventEmitter<string>();
  public strings: Strings;
  public loading: boolean;
  public treeData: TreeNodeDataItem[];
  public selectedData: TreeNodeDataItem;

  constructor() {
    this.strings = MsftSme.resourcesStrings<Strings>();
    this.loading = true;
  }

  /**
   * Information on PrimeNG's TreeTable can be found here:
   * https://www.primefaces.org/primeng/#/treetable
   */
  public ngOnInit() {
      this.treeData = [TestData];
      this.loading = false;
  }

  public getIconCssClasses(nodeName) {
    // todo
  }

  /**
   * The method to run when a node is selected.
   */
  public onNodeSelect(event: any): void {
    this.onSelectionChange.emit(event.node.data.data);
  }

    /**
     * The method to run when a node is expanded.
     */
    public onNodeExpand(event: any): void {
      // let node = event.node;
      // const selectedPath = node.data.path;
      // if (!this.pathIsLoaded(selectedPath)) {
      //     this.markNodeAsLoading(node);
      //     this.pushAgent(selectedPath, node);
      // }
  }
}
