// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs/Rx';
import { Strings } from '../../../generated/strings';

@Component({
  selector: 'sme-control-example',
  templateUrl: './control-example.component.html',
  styleUrls: ['./control-example.component.css']
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
