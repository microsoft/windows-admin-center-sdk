import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule, SplitViewModule } from '../../../angular';
import { CachedFramesModule } from '../iframe/cached-frames/cached-frames.module';
import { IFrameModule } from '../iframe/iframe.module';
import { DefaultToolGuardService } from './default-tool-guard.service';
import { MultiToolComponent } from './multi-tool/multi-tool.component';
import { ToolComponent } from './tool/tool.component';
import { MultiToolGuardService, ToolGuardService } from './tools-guard-base.service';
import { ToolsRoutingModule } from './tools-routing.module';
var ToolsModule = /** @class */ (function () {
    function ToolsModule() {
    }
    ToolsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        MultiToolComponent,
                        ToolComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        PipesModule,
                        CachedFramesModule,
                        IFrameModule,
                        ToolsRoutingModule,
                        SplitViewModule
                    ],
                    providers: [
                        MultiToolGuardService,
                        ToolGuardService,
                        DefaultToolGuardService
                    ]
                },] },
    ];
    /** @nocollapse */
    ToolsModule.ctorParameters = function () { return []; };
    return ToolsModule;
}());
export { ToolsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3Rvb2xzL3Rvb2xzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFFLFdBQUEsRUFBYSxtQkFBQSxFQUFvQixNQUFPLGdCQUFBLENBQWlCO0FBRWxFLE9BQU8sRUFBRSxXQUFBLEVBQWEsZUFBQSxFQUFnQixNQUFPLGtCQUFBLENBQW1CO0FBRWhFLE9BQU8sRUFBRSxrQkFBQSxFQUFtQixNQUFPLDhDQUFBLENBQStDO0FBQ2xGLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyx5QkFBQSxDQUEwQjtBQUV2RCxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw4QkFBQSxDQUErQjtBQUN2RSxPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyxtQ0FBQSxDQUFvQztBQUN2RSxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8sdUJBQUEsQ0FBd0I7QUFDdEQsT0FBTyxFQUFFLHFCQUFBLEVBQXVCLGdCQUFBLEVBQWlCLE1BQU8sNEJBQUEsQ0FBNkI7QUFDckYsT0FBTyxFQUFFLGtCQUFBLEVBQW1CLE1BQU8sd0JBQUEsQ0FBeUI7QUFHNUQ7SUFBQTtJQTBCQSxDQUFDO0lBMUJpQyxzQkFBVSxHQUEwQjtRQUN0RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3JCLFlBQVksRUFBRTt3QkFDVixrQkFBa0I7d0JBQ2xCLGFBQWE7cUJBQ2hCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixXQUFXO3dCQUNYLGtCQUFrQjt3QkFDbEIsWUFBWTt3QkFDWixrQkFBa0I7d0JBQ2xCLGVBQWU7cUJBQ2xCO29CQUNELFNBQVMsRUFBRTt3QkFDUCxxQkFBcUI7d0JBQ3JCLGdCQUFnQjt3QkFDaEIsdUJBQXVCO3FCQUMxQjtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsMEJBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRixrQkFBQztDQTFCRCxBQTBCQyxJQUFBO1NBMUJZLFdBQVciLCJmaWxlIjoidG9vbHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==