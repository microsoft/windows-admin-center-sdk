import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DefaultComponent } from './default.component';
import { Routing } from './default.routing';

@NgModule({
  imports: [
    CommonModule, 
    Routing
  ],
  declarations: [DefaultComponent]
})
export class DefaultModule { }
