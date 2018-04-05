import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../pipes/pipes.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { ActionBarComponent } from './containers/action-bar/action-bar.component';
import { ActionMenuComponent } from './containers/action-menu/action-menu.component';
import { ActionButtonComponent, ActionButtonRendererComponent } from './items/action-button/action-button.component';
import { DynamicActionItemComponent } from './items/dynamic-action-item.component';
var ActionsModule = /** @class */ (function () {
    function ActionsModule() {
    }
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
    return ActionsModule;
}());
export { ActionsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYWN0aW9ucy9hY3Rpb25zLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFFekMsT0FBTyxFQUFFLFdBQUEsRUFBWSxNQUFPLDBCQUFBLENBQTJCO0FBQ3ZELE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyw2QkFBQSxDQUE4QjtBQUU3RCxPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyw4Q0FBQSxDQUErQztBQUNsRixPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTyxnREFBQSxDQUFpRDtBQUVyRixPQUFPLEVBQUUscUJBQUEsRUFBdUIsNkJBQUEsRUFBOEIsTUFBTywrQ0FBQSxDQUFnRDtBQUNySCxPQUFPLEVBQUUsMEJBQUEsRUFBMkIsTUFBTyx1Q0FBQSxDQUF3QztBQUduRjtJQUFBO0lBNEJBLENBQUM7SUE1Qm1DLHdCQUFVLEdBQTBCO1FBQ3hFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDckIsT0FBTyxFQUFFO3dCQUNMLGtCQUFrQjt3QkFDbEIscUJBQXFCO3dCQUNyQiw2QkFBNkI7d0JBQzdCLDBCQUEwQjtxQkFDN0I7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLDZCQUE2Qjt3QkFDN0IsMEJBQTBCO3FCQUM3QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixXQUFXO3dCQUNYLGNBQWM7cUJBQ2pCO29CQUNELGVBQWUsRUFBRTt3QkFDYiw2QkFBNkI7cUJBQ2hDO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCw0QkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLG9CQUFDO0NBNUJELEFBNEJDLElBQUE7U0E1QlksYUFBYSIsImZpbGUiOiJhY3Rpb25zLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=