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
var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
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
    return PipesModule;
}());
export { PipesModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9waXBlcy9waXBlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxnQkFBQSxDQUFpQjtBQUU3QyxPQUFPLEtBQUssR0FBQSxNQUFTLHFCQUFBLENBQXNCO0FBRTNDLE9BQU8sRUFBRSxnQ0FBQSxFQUFpQyxNQUFPLHlEQUFBLENBQTBEO0FBQzNHLE9BQU8sRUFBRSxpQ0FBQSxFQUFrQyxNQUFPLDZEQUFBLENBQThEO0FBQ2hILE9BQU8sRUFBRSw2QkFBQSxFQUE4QixNQUFPLG1EQUFBLENBQW9EO0FBQ2xHLE9BQU8sRUFBRSxzQkFBQSxFQUF1QixNQUFPLG1DQUFBLENBQW9DO0FBQzNFLE9BQU8sRUFBRSx5QkFBQSxFQUEwQixNQUFPLHlDQUFBLENBQTBDO0FBQ3BGLE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyxtQkFBQSxDQUFvQjtBQUNuRCxPQUFPLEVBQUUsT0FBQSxFQUFRLE1BQU8saUJBQUEsQ0FBa0I7QUFDMUMsT0FBTyxFQUFFLDhCQUFBLEVBQStCLE1BQU8scURBQUEsQ0FBc0Q7QUFHckc7SUFBQTtJQXdCQSxDQUFDO0lBeEJpQyxzQkFBVSxHQUEwQjtRQUN0RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3JCLFlBQVksRUFBRTt3QkFDVixjQUFjO3dCQUNkLGdDQUFnQzt3QkFDaEMsaUNBQWlDO3dCQUNqQyw2QkFBNkI7d0JBQzdCLHlCQUF5Qjt3QkFDekIsc0JBQXNCO3dCQUN0Qiw4QkFBOEI7cUJBQ2pDO29CQUNELE9BQU8sRUFBRTt3QkFDTCxPQUFPO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxHQUFHLENBQUMsV0FBVzt3QkFDZixHQUFHLENBQUMsd0JBQXdCO3FCQUMvQjtvQkFDRCxTQUFTLEVBQUUsRUFBRTtpQkFDaEIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDBCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0Ysa0JBQUM7Q0F4QkQsQUF3QkMsSUFBQTtTQXhCWSxXQUFXIiwiZmlsZSI6InBpcGVzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=