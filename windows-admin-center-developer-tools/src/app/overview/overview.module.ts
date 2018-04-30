// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview.component';
import { Routing } from './overview.routing';

@NgModule({
  imports: [
    CommonModule,
    Routing
  ],
  declarations: [OverviewComponent]
})
export class OverviewModule { }
