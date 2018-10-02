// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    ActionsModule,
    AlertBarModule,
    DataTableModule,
    DetailsModule,
    GuidedPanelModule,
    HttpService,
    LoadingWheelModule,
    MasterViewModule,
    SmeStylesModule,
    SplitViewModule,
    SvgModule,
    ToolHeaderModule
} from '@microsoft/windows-admin-center-sdk/angular';

import { CimExampleComponent } from './cim-example/cim-example.component';
import { ControlExampleComponent } from './control-example/control-example.component';
import { HelloComponent } from './hello.component';
import { HelloRouting } from './hello.routing';
import { HelloService } from './hello.service';
import { PowershellExampleComponent } from './powershell-example/powershell-example.component';
import { TreeExampleComponent } from './tree-example/tree-example.component';
import { UserProfileExampleComponent } from './user-profile-example/user-profile-example.component';

@NgModule({
    declarations: [
        HelloComponent,
        PowershellExampleComponent,
        CimExampleComponent,
        ControlExampleComponent,
        TreeExampleComponent,
        UserProfileExampleComponent
    ],
    providers: [
        HttpService,
        HelloService
    ],
    imports: [
        ActionsModule,
        AlertBarModule,
        CommonModule,
        DataTableModule,
        DetailsModule,
        FormsModule,
        LoadingWheelModule,
        SmeStylesModule,
        SvgModule,
        HelloRouting,
        ToolHeaderModule,
        SplitViewModule,
        MasterViewModule,
        GuidedPanelModule
    ]
})
export class HelloModule { }
