import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpService } from '@microsoft/windows-admin-center-sdk/angular';
import { Http } from '@microsoft/windows-admin-center-sdk/core';

import { DefaultComponent } from './default.component';
import { Routing } from './default.routing';
import { PluginService } from './plugin.service';

@NgModule({
  imports: [
    CommonModule,
    Routing
  ],
  declarations: [DefaultComponent],
  providers: [
    HttpService,
    PluginService,
    Http
  ]
})
export class DefaultModule { }
