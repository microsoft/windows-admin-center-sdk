// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    DialogModule,
    GuidedPanelModule,
    IconModule,
    LoadingWheelModule,
    Navigation,
    NavigationService,
    PipesModule,
    ResourceService,
    SmeStylesModule
} from '@msft-sme/shell/angular';
import { DevGuideRoutingModule } from './dev-guide-routing.module';
import { DevGuideComponent } from './dev-guide.component';
import { LandingModule } from './landing/landing.module';

@NgModule({
    declarations: [
        DevGuideComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SmeStylesModule,
        DialogModule,
        IconModule,
        LoadingWheelModule,
        GuidedPanelModule,
        PipesModule,
        LandingModule,
        DevGuideRoutingModule
    ]
})
export class DevGuideModule { }