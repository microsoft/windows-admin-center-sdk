import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
var StylesModule = /** @class */ (function () {
    function StylesModule() {
    }
    StylesModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    StylesModule.ctorParameters = function () { return []; };
    return StylesModule;
}());
export { StylesModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9zdHlsZXMvc3R5bGVzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFlLG1CQUFBLEVBQW9CLE1BQU8sZ0JBQUEsQ0FBaUI7QUFFbEUsT0FBTyxLQUFLLEdBQUEsTUFBUyx5QkFBQSxDQUEwQjtBQUUvQyxPQUFPLEVBQUUsT0FBQSxFQUFRLE1BQU8sa0JBQUEsQ0FBbUI7QUFFM0MsT0FBTyxFQUFFLGVBQUEsRUFBZ0IsTUFBTyxvQkFBQSxDQUFxQjtBQUVyRCxPQUFPLEVBQUUsc0JBQUEsRUFBdUIsTUFBTyx5Q0FBQSxDQUEwQztBQUNqRixPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyxpQ0FBQSxDQUFrQztBQUNyRSxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLDJCQUFBLENBQTRCO0FBQzVELE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyx5QkFBQSxDQUEwQjtBQUN6RCxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLDJCQUFBLENBQTRCO0FBQzVELE9BQU8sRUFBRSxlQUFBLEVBQWdCLE1BQU8sMkJBQUEsQ0FBNEI7QUFDNUQsT0FBTyxFQUFFLGNBQUEsRUFBZSxNQUFPLHlCQUFBLENBQTBCO0FBQ3pELE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyx5QkFBQSxDQUEwQjtBQUN6RCxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTywrQkFBQSxDQUFnQztBQUNsRSxPQUFPLEVBQUUsZ0JBQUEsRUFBaUIsTUFBTyw2QkFBQSxDQUE4QjtBQUMvRCxPQUFPLEVBQUUsZ0JBQUEsRUFBaUIsTUFBTyw2QkFBQSxDQUE4QjtBQUMvRCxPQUFPLEVBQUUsZ0JBQUEsRUFBaUIsTUFBTyw2QkFBQSxDQUE4QjtBQUMvRCxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLDJCQUFBLENBQTRCO0FBQzVELE9BQU8sRUFBRSxtQkFBQSxFQUFvQixNQUFPLG1DQUFBLENBQW9DO0FBR3hFO0lBQUE7SUFpQ0EsQ0FBQztJQWpDa0MsdUJBQVUsR0FBMEI7UUFDdkUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUNyQixZQUFZLEVBQUU7d0JBQ1YsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixjQUFjO3dCQUNkLGdCQUFnQjt3QkFDaEIsc0JBQXNCO3dCQUN0QixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QsaUJBQWlCO3dCQUNqQixtQkFBbUI7d0JBQ25CLGNBQWM7cUJBQ2pCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxPQUFPO3dCQUNQLFlBQVk7d0JBQ1osR0FBRyxDQUFDLGtCQUFrQjt3QkFDdEIsR0FBRyxDQUFDLGFBQWE7d0JBQ2pCLEdBQUcsQ0FBQyxnQkFBZ0I7d0JBQ3BCLG1CQUFtQjtxQkFDdEI7b0JBQ0QsU0FBUyxFQUFFLEVBQUU7aUJBQ2hCLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwyQkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLG1CQUFDO0NBakNELEFBaUNDLElBQUE7U0FqQ1ksWUFBWSIsImZpbGUiOiJzdHlsZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL21hdHdpbHMvU291cmNlL2Jhc2UvbXNmdC1zbWUtZGV2ZWxvcGVyLXRvb2xzL2lubGluZVNyYy8ifQ==