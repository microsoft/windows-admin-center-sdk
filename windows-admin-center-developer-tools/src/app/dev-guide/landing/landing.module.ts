// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/primeng';
import { LandingComponent } from './landing.component';

@NgModule({
  declarations: [ LandingComponent ],
  imports: [ CommonModule ],
  exports: [ LandingComponent ]
})
export class LandingModule { }
