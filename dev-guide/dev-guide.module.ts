import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@msft-sme/angular';
import { GuidedPanelModule } from '@msft-sme/angular';
import { IconModule } from '@msft-sme/angular';
import { LoadingWheelModule } from '@msft-sme/angular';
import { PivotModule } from '@msft-sme/angular';
import { DevGuideRoutingModule } from './dev-guide-routing.module';
import { DevGuideComponent } from './dev-guide.component';
import { LandingModule } from './landing/landing.module';
import { LoremIpsumModule } from './lorem-ipsum/lorem-ipsum.module';

@NgModule({
    declarations: [
        DevGuideComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        IconModule,
        LoadingWheelModule,
        GuidedPanelModule,
        LandingModule,
        DevGuideRoutingModule,
        LoremIpsumModule,
        PivotModule
    ]
})
export class DevGuideModule { }
