import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActionsModule, DataTableModule, ToolHeaderModule } from '@microsoft/windows-admin-center-sdk/angular';
import { ContainerService } from './container.service';
import { WindowsContainersComponent } from './windows-containers.component';
import { Routing } from './windows-containers.routing';

@NgModule({
  imports: [
    CommonModule,
    Routing,
    DataTableModule,
    ActionsModule,
    ToolHeaderModule
  ],
  providers: [
    ContainerService
  ],
  declarations: [
    WindowsContainersComponent
  ]
})
export class WindowsContainersModule { }