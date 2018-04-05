import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IFrameComponent } from './iframe.component';
import { Routing } from './iframe.routing';

@NgModule({
  imports: [
    CommonModule,
    Routing
  ],
  declarations: [IFrameComponent]
})
export class IFrameModule { }
