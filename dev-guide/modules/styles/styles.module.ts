import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActionsModule } from '@msft-sme/angular';
import { LoadingWheelModule } from '@msft-sme/angular';
import { ToolHeaderModule } from '@msft-sme/angular';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { AnimationComponent } from './animation/animation.component';
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
import { StylesComponent } from './styles.component';
import { routing } from './styles.routing';
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
        AnimationComponent,
        BehaviorsComponent,
        PivotComponent,
        ProgressComponent,
        TypographyComponent,
        LinksComponent
    ],
    imports: [
        routing,
        CommonModule,
        LoadingWheelModule,
        ActionsModule,
        ToolHeaderModule,
        ReactiveFormsModule
    ],
    providers: []
})
export class StylesModule { }
