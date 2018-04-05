import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionsModule, AlertBarModule, DataTableModule, DetailsModule, GuidedPanelModule, HttpService, LoadingWheelModule, MasterViewModule, SmeStylesModule, SplitViewModule, SvgModule, ToolHeaderModule } from '@msft-sme/shell/angular';
import { HelloComponent } from './hello.component';
import { HelloRouting } from './hello.routing';
import { HelloService } from './hello.service';
import { CimExampleComponent } from './cim-example/cim-example.component';
import { ControlExampleComponent } from './control-example/control-example.component';
import { DllExampleComponent } from './dll-example/dll-example.component';
import { NotificationsExampleComponent } from './notifications-example/notifications-example.component';
import { PowershellExampleComponent } from './powershell-example/powershell-example.component';
import { TreeExampleComponent } from './tree-example/tree-example.component';
import { UserProfileExampleComponent } from './user-profile-example/user-profile-example.component';
var HelloModule = /** @class */ (function () {
    function HelloModule() {
    }
    HelloModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        HelloComponent,
                        PowershellExampleComponent,
                        CimExampleComponent,
                        NotificationsExampleComponent,
                        ControlExampleComponent,
                        TreeExampleComponent,
                        DllExampleComponent,
                        UserProfileExampleComponent
                    ],
                    providers: [
                        HttpService,
                        HelloService
                    ],
                    imports: [
                        ActionsModule,
                        AlertBarModule,
                        CommonModule,
                        DataTableModule,
                        DetailsModule,
                        FormsModule,
                        LoadingWheelModule,
                        SmeStylesModule,
                        SvgModule,
                        HelloRouting,
                        ToolHeaderModule,
                        SplitViewModule,
                        MasterViewModule,
                        GuidedPanelModule
                    ]
                },] },
    ];
    /** @nocollapse */
    HelloModule.ctorParameters = function () { return []; };
    return HelloModule;
}());
export { HelloModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9oZWxsby9oZWxsby5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxnQkFBQSxDQUFpQjtBQUM3QyxPQUFPLEVBQ0gsYUFBYSxFQUNiLGNBQWMsRUFDZCxlQUFlLEVBQ2YsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLGdCQUFnQixFQUNoQixlQUFlLEVBQ2YsZUFBZSxFQUNmLFNBQVMsRUFDVCxnQkFBZ0IsRUFDbkIsTUFBTSx5QkFBQSxDQUEwQjtBQUNqQyxPQUFPLEVBQUUsY0FBQSxFQUFlLE1BQU8sbUJBQUEsQ0FBb0I7QUFDbkQsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUUvQyxPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTyxxQ0FBQSxDQUFzQztBQUMxRSxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw2Q0FBQSxDQUE4QztBQUN0RixPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTyxxQ0FBQSxDQUFzQztBQUMxRSxPQUFPLEVBQUUsNkJBQUEsRUFBOEIsTUFBTyx5REFBQSxDQUEwRDtBQUN4RyxPQUFPLEVBQUUsMEJBQUEsRUFBMkIsTUFBTyxtREFBQSxDQUFvRDtBQUMvRixPQUFPLEVBQUUsb0JBQUEsRUFBcUIsTUFBTyx1Q0FBQSxDQUF3QztBQUM3RSxPQUFPLEVBQUUsMkJBQUEsRUFBNEIsTUFBTyx1REFBQSxDQUF3RDtBQUdwRztJQUFBO0lBcUNBLENBQUM7SUFyQ2lDLHNCQUFVLEdBQTBCO1FBQ3RFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDckIsWUFBWSxFQUFFO3dCQUNWLGNBQWM7d0JBQ2QsMEJBQTBCO3dCQUMxQixtQkFBbUI7d0JBQ25CLDZCQUE2Qjt3QkFDN0IsdUJBQXVCO3dCQUN2QixvQkFBb0I7d0JBQ3BCLG1CQUFtQjt3QkFDbkIsMkJBQTJCO3FCQUM5QjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1AsV0FBVzt3QkFDWCxZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDTCxhQUFhO3dCQUNiLGNBQWM7d0JBQ2QsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsV0FBVzt3QkFDWCxrQkFBa0I7d0JBQ2xCLGVBQWU7d0JBQ2YsU0FBUzt3QkFDVCxZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjtxQkFDcEI7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDBCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0Ysa0JBQUM7Q0FyQ0QsQUFxQ0MsSUFBQTtTQXJDWSxXQUFXIiwiZmlsZSI6ImhlbGxvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL1NvdXJjZS9iYXNlL21zZnQtc21lLWRldmVsb3Blci10b29scy9pbmxpbmVTcmMvIn0=