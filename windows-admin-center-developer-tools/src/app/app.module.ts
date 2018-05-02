// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
    AppContextService,
    AppErrorHandler,
    CoreServiceModule,
    DialogModule,
    GuidedPanelModule,
    IconModule,
    IdleModule,
    LoadingWheelModule,
    PipesModule,
    ResourceService,
    SmeStylesModule,
    SvgModule
} from '@microsoft/windows-admin-center-sdk/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CoreServiceModule,
        CommonModule,
        BrowserModule,
        DialogModule,
        FormsModule,
        SmeStylesModule,
        SvgModule,
        IconModule,
        LoadingWheelModule,
        GuidedPanelModule,
        PipesModule,
        IdleModule,
        AppRoutingModule
    ],
    providers: [
        ResourceService,
        {
            provide: ErrorHandler,
            useClass: AppErrorHandler
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private appContextService: AppContextService) {
        this.appContextService.initializeModule({});
    }
}