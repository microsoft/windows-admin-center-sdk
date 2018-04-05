import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import * as ng2 from '@msft-sme/shell/angular';

import { StylesComponent } from './styles.component';

import { ColorsComponent } from './colors/colors.component';
import { IconsComponent } from './icons/icons.component';
import { LayersComponent } from './layers/layers.component';
import { LayoutComponent } from './layout/layout.component';
import { LinksComponent } from './links/links.component';
import { SchemesComponent } from './schemes/schemes.component';
import { ShadowsComponent } from './shadows/shadows.component';
import { SpacingComponent } from './spacing/spacing.component';
import { ThemesComponent } from './themes/themes.component';

import { AccessibilityComponent } from './accessibility/accessibility.component';
import { BehaviorsComponent } from './behaviors/behaviors.component';
import { PivotComponent } from './pivot/pivot.component';
import { ProgressComponent } from './progress/progress.component';
import { TypographyComponent } from './typography/typography.component';

export const routing: ModuleWithProviders = RouterModule.forChild(
    [
        {
            path: '',
            component: StylesComponent,
            children: [
                { path: '', redirectTo: 'accessibility', pathMatch: 'full' },
                { path: 'accessibility', component: AccessibilityComponent },
                { path: 'behaviors', component: BehaviorsComponent },
                { path: 'colors', component: ColorsComponent },
                { path: 'icons', component: IconsComponent },
                { path: 'forms', loadChildren: 'app/dev-guide/modules/styles/form/form-styles.module#FormStylesModule' },
                { path: 'layers', component: LayersComponent },
                { path: 'layout', component: LayoutComponent },
                { path: 'links', component: LinksComponent },
                { path: 'pivot', component: PivotComponent },
                { path: 'progress', component: ProgressComponent },
                { path: 'schemes', component: SchemesComponent },
                { path: 'shadows', component: ShadowsComponent },
                { path: 'spacing', component: SpacingComponent },
                { path: 'themes', component: ThemesComponent },
                { path: 'typography', component: TypographyComponent }
            ]
        }
    ]);
