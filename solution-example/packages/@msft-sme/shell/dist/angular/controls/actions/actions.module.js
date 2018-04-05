import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../pipes/pipes.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { ActionBarComponent } from './containers/action-bar/action-bar.component';
import { ActionMenuComponent } from './containers/action-menu/action-menu.component';
import { ActionButtonComponent, ActionButtonRendererComponent } from './items/action-button/action-button.component';
import { DynamicActionItemComponent } from './items/dynamic-action-item.component';
var ActionsModule = (function () {
    function ActionsModule() {
    }
    return ActionsModule;
}());
export { ActionsModule };
ActionsModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    ActionBarComponent,
                    ActionButtonComponent,
                    ActionButtonRendererComponent,
                    DynamicActionItemComponent
                ],
                declarations: [
                    ActionBarComponent,
                    ActionMenuComponent,
                    ActionButtonComponent,
                    ActionButtonRendererComponent,
                    DynamicActionItemComponent
                ],
                imports: [
                    CommonModule,
                    PipesModule,
                    DropdownModule
                ],
                entryComponents: [
                    ActionButtonRendererComponent
                ]
            },] },
];
/** @nocollapse */
ActionsModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYWN0aW9ucy9hY3Rpb25zLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFFekMsT0FBTyxFQUFFLFdBQUEsRUFBWSxNQUFPLDBCQUFBLENBQTJCO0FBQ3ZELE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyw2QkFBQSxDQUE4QjtBQUU3RCxPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyw4Q0FBQSxDQUErQztBQUNsRixPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTyxnREFBQSxDQUFpRDtBQUVyRixPQUFPLEVBQUUscUJBQUEsRUFBdUIsNkJBQUEsRUFBOEIsTUFBTywrQ0FBQSxDQUFnRDtBQUNySCxPQUFPLEVBQUUsMEJBQUEsRUFBMkIsTUFBTyx1Q0FBQSxDQUF3QztBQUduRjtJQUFBO0lBNEJBLENBQUM7SUFBRCxvQkFBQztBQUFELENBNUJBLEFBNEJDOztBQTVCbUMsd0JBQVUsR0FBMEI7SUFDeEUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNyQixPQUFPLEVBQUU7b0JBQ0wsa0JBQWtCO29CQUNsQixxQkFBcUI7b0JBQ3JCLDZCQUE2QjtvQkFDN0IsMEJBQTBCO2lCQUM3QjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1Ysa0JBQWtCO29CQUNsQixtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsNkJBQTZCO29CQUM3QiwwQkFBMEI7aUJBQzdCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsY0FBYztpQkFDakI7Z0JBQ0QsZUFBZSxFQUFFO29CQUNiLDZCQUE2QjtpQkFDaEM7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsNEJBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoiYWN0aW9ucy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9