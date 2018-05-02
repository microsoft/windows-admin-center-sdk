// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TreeNodeDataItem } from '@microsoft/windows-admin-center-sdk/angular';
import { expand } from 'rxjs/operator/expand';
import { Strings } from '../../../generated/strings';
import { TestData } from './testData';

@Component({
  selector: 'sme-tree-example',
  templateUrl: './tree-example.component.html',
  styleUrls: ['./tree-example.component.css']
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
