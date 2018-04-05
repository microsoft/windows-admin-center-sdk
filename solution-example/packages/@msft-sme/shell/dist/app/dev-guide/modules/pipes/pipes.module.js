import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as ng2 from '../../../../angular';
import { BooleanConverterExampleComponent } from './boolean-converter/boolean-converter-example.component';
import { ByteUnitConverterExampleComponent } from './byte-unit-converter/byte-unit-converter-example.component';
import { EnumConverterExampleComponent } from './enum-converter/enum-converter-example.component';
import { FormatExampleComponent } from './format/format-example.component';
import { HighlightExampleComponent } from './highlight/highlight-example.component';
import { PipesComponent } from './pipes.component';
import { routing } from './pipes.routing';
import { YesNoConverterExampleComponent } from './yesno-converter/yesno-converter-example.component';
var PipesModule = (function () {
    function PipesModule() {
    }
    return PipesModule;
}());
export { PipesModule };
PipesModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    PipesComponent,
                    BooleanConverterExampleComponent,
                    ByteUnitConverterExampleComponent,
                    EnumConverterExampleComponent,
                    HighlightExampleComponent,
                    FormatExampleComponent,
                    YesNoConverterExampleComponent
                ],
                imports: [
                    routing,
                    CommonModule,
                    FormsModule,
                    ng2.PipesModule,
                    ng2.YesNoConverterPipeModule
                ],
                providers: []
            },] },
];
/** @nocollapse */
PipesModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9waXBlcy9waXBlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxnQkFBQSxDQUFpQjtBQUU3QyxPQUFPLEtBQUssR0FBQSxNQUFTLHFCQUFBLENBQXNCO0FBRTNDLE9BQU8sRUFBRSxnQ0FBQSxFQUFpQyxNQUFPLHlEQUFBLENBQTBEO0FBQzNHLE9BQU8sRUFBRSxpQ0FBQSxFQUFrQyxNQUFPLDZEQUFBLENBQThEO0FBQ2hILE9BQU8sRUFBRSw2QkFBQSxFQUE4QixNQUFPLG1EQUFBLENBQW9EO0FBQ2xHLE9BQU8sRUFBRSxzQkFBQSxFQUF1QixNQUFPLG1DQUFBLENBQW9DO0FBQzNFLE9BQU8sRUFBRSx5QkFBQSxFQUEwQixNQUFPLHlDQUFBLENBQTBDO0FBQ3BGLE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyxtQkFBQSxDQUFvQjtBQUNuRCxPQUFPLEVBQUUsT0FBQSxFQUFRLE1BQU8saUJBQUEsQ0FBa0I7QUFDMUMsT0FBTyxFQUFFLDhCQUFBLEVBQStCLE1BQU8scURBQUEsQ0FBc0Q7QUFHckc7SUFBQTtJQXdCQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQXhCQSxBQXdCQzs7QUF4QmlDLHNCQUFVLEdBQTBCO0lBQ3RFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDckIsWUFBWSxFQUFFO29CQUNWLGNBQWM7b0JBQ2QsZ0NBQWdDO29CQUNoQyxpQ0FBaUM7b0JBQ2pDLDZCQUE2QjtvQkFDN0IseUJBQXlCO29CQUN6QixzQkFBc0I7b0JBQ3RCLDhCQUE4QjtpQkFDakM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLE9BQU87b0JBQ1AsWUFBWTtvQkFDWixXQUFXO29CQUNYLEdBQUcsQ0FBQyxXQUFXO29CQUNmLEdBQUcsQ0FBQyx3QkFBd0I7aUJBQy9CO2dCQUNELFNBQVMsRUFBRSxFQUFFO2FBQ2hCLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCwwQkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJwaXBlcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9