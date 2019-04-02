import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmeFormsModule } from '@microsoft/windows-admin-center-sdk/angular';
import { DefaultComponent } from './default.component';
import { Routing } from './default.routing';

@NgModule({
  imports: [
    CommonModule,
    Routing,
    // These are the imports I added.
    FormsModule,
    ReactiveFormsModule,
    SmeFormsModule
  ],
  declarations: [DefaultComponent]
})
export class DefaultModule { }
