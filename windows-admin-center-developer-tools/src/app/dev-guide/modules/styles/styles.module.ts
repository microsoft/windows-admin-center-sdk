import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as ng2 from '@msft-sme/shell/angular';

import { routing } from './styles.routing';

import { StylesComponent } from './styles.component';

import { AccessibilityComponent } from './accessibility/accessibility.component';
import { BehaviorsComponent } from './behaviors/behaviors.component';
import { ColorsComponent } from './colors/colors.component';
import { IconsComponent } from './icons/icons.component';
import { LayersComponent } from './layers/layers.component';
import { LayoutComponent } from './layout/layout.component';
import { LinksComponent } from './links/links.component';
import { PivotComponent } from './pivot/pivot.component';
import { ProgressComponent } from './progress/progress.component';
import { SchemesComponent } from './schemes/schemes.component';
import { ShadowsComponent } from './shadows/shadows.component';
import { SpacingComponent } from './spacing/spacing.component';
import { ThemesComponent } from './themes/themes.component';
import { TypographyComponent } from './typography/typography.component';

@NgModule({
    declarations: [
        LayoutComponent,
        LayersComponent,
        SpacingComponent,
        ColorsComponent,
        SchemesComponent,
        StylesComponent,
        ThemesComponent,
        IconsComponent,
        ShadowsComponent,
        AccessibilityComponent,
        BehaviorsComponent,
        PivotComponent,
        ProgressComponent,
        TypographyComponent,
        LinksComponent
    ],
    imports: [
        routing,
        CommonModule,
        ng2.LoadingWheelModule,
        ng2.ActionsModule,
        ng2.ToolHeaderModule,
        ReactiveFormsModule
    ],
    providers: []
})
export class StylesModule { }
