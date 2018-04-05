import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as ng2 from '../../../../angular';
import { routing } from './styles.routing';
import { StylesComponent } from './styles.component';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { BehaviorsComponent } from './behaviors/behaviors.component';
import { ColorsComponent } from './colors/colors.component';
import { IconsComponent } from './icons/icons.component';
import { LayersComponent } from './layers/layers.component';
import { LayoutComponent } from './layout/layout.component';
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
                        TypographyComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9zdHlsZXMvc3R5bGVzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFlLG1CQUFBLEVBQW9CLE1BQU8sZ0JBQUEsQ0FBaUI7QUFFbEUsT0FBTyxLQUFLLEdBQUEsTUFBUyxxQkFBQSxDQUFzQjtBQUUzQyxPQUFPLEVBQUUsT0FBQSxFQUFRLE1BQU8sa0JBQUEsQ0FBbUI7QUFFM0MsT0FBTyxFQUFFLGVBQUEsRUFBZ0IsTUFBTyxvQkFBQSxDQUFxQjtBQUVyRCxPQUFPLEVBQUUsc0JBQUEsRUFBdUIsTUFBTyx5Q0FBQSxDQUEwQztBQUNqRixPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyxpQ0FBQSxDQUFrQztBQUNyRSxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLDJCQUFBLENBQTRCO0FBQzVELE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyx5QkFBQSxDQUEwQjtBQUN6RCxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLDJCQUFBLENBQTRCO0FBQzVELE9BQU8sRUFBRSxlQUFBLEVBQWdCLE1BQU8sMkJBQUEsQ0FBNEI7QUFDNUQsT0FBTyxFQUFFLGNBQUEsRUFBZSxNQUFPLHlCQUFBLENBQTBCO0FBQ3pELE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLCtCQUFBLENBQWdDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBQSxFQUFpQixNQUFPLDZCQUFBLENBQThCO0FBQy9ELE9BQU8sRUFBRSxnQkFBQSxFQUFpQixNQUFPLDZCQUFBLENBQThCO0FBQy9ELE9BQU8sRUFBRSxnQkFBQSxFQUFpQixNQUFPLDZCQUFBLENBQThCO0FBQy9ELE9BQU8sRUFBRSxlQUFBLEVBQWdCLE1BQU8sMkJBQUEsQ0FBNEI7QUFDNUQsT0FBTyxFQUFFLG1CQUFBLEVBQW9CLE1BQU8sbUNBQUEsQ0FBb0M7QUFHeEU7SUFBQTtJQWdDQSxDQUFDO0lBaENrQyx1QkFBVSxHQUEwQjtRQUN2RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3JCLFlBQVksRUFBRTt3QkFDVixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsZ0JBQWdCO3dCQUNoQixzQkFBc0I7d0JBQ3RCLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLG1CQUFtQjtxQkFDdEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLE9BQU87d0JBQ1AsWUFBWTt3QkFDWixHQUFHLENBQUMsa0JBQWtCO3dCQUN0QixHQUFHLENBQUMsYUFBYTt3QkFDakIsR0FBRyxDQUFDLGdCQUFnQjt3QkFDcEIsbUJBQW1CO3FCQUN0QjtvQkFDRCxTQUFTLEVBQUUsRUFBRTtpQkFDaEIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDJCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsbUJBQUM7Q0FoQ0QsQUFnQ0MsSUFBQTtTQWhDWSxZQUFZIiwiZmlsZSI6InN0eWxlcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9