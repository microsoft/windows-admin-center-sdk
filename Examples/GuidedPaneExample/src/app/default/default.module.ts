import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GuidedPanelModule } from '@microsoft/windows-admin-center-sdk/angular';
import { DefaultComponent } from './default.component';
import { Routing } from './default.routing';

@NgModule({
  imports: [
    CommonModule,
    GuidedPanelModule,
    Routing
  ],
  declarations: [DefaultComponent]
})
export class DefaultModule { }
