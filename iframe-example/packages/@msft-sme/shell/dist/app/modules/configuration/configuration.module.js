import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule, GuidedPanelModule, IconModule, LoadingWheelModule, PipesModule, SettingsModule, SmeStylesModule, ToolHeaderModule } from '../../../angular';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { AccessModule } from './panels/access/access.module';
import { ConnectionComponent } from './panels/connection.component';
import { GeneralComponent } from './panels/general.component';
var ConfigurationModule = /** @class */ (function () {
    function ConfigurationModule() {
    }
    ConfigurationModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ConfigurationComponent,
                        GeneralComponent,
                        ConnectionComponent
                    ],
                    imports: [
                        AccessModule,
                        CommonModule,
                        FormsModule,
                        ToolHeaderModule,
                        ReactiveFormsModule,
                        SmeStylesModule,
                        DialogModule,
                        IconModule,
                        LoadingWheelModule,
                        GuidedPanelModule,
                        PipesModule,
                        SettingsModule,
                        ConfigurationRoutingModule
                    ]
                },] },
    ];
    /** @nocollapse */
    ConfigurationModule.ctorParameters = function () { return []; };
    return ConfigurationModule;
}());
export { ConfigurationModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBZ0IsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUN2RCxPQUFPLEVBQUUsV0FBQSxFQUFhLG1CQUFBLEVBQW9CLE1BQU8sZ0JBQUEsQ0FBaUI7QUFFbEUsT0FBTyxFQUlILFlBQVksRUFDWixpQkFBaUIsRUFDakIsVUFBVSxFQUNWLGtCQUFrQixFQUdDLFdBQUEsRUFBOEIsY0FBQSxFQUNqRCxlQUFlLEVBQUUsZ0JBQUEsRUFDcEIsTUFBTSxrQkFBQSxDQUFtQjtBQUMxQixPQUFPLEVBQUUsMEJBQUEsRUFBMkIsTUFBTyxnQ0FBQSxDQUFpQztBQUM1RSxPQUFPLEVBQUUsc0JBQUEsRUFBdUIsTUFBTywyQkFBQSxDQUE0QjtBQUNuRSxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8sK0JBQUEsQ0FBZ0M7QUFDN0QsT0FBTyxFQUFFLG1CQUFBLEVBQW9CLE1BQU8sK0JBQUEsQ0FBZ0M7QUFDcEUsT0FBTyxFQUFFLGdCQUFBLEVBQWlCLE1BQU8sNEJBQUEsQ0FBNkI7QUFHOUQ7SUFBQTtJQTJCQSxDQUFDO0lBM0J5Qyw4QkFBVSxHQUEwQjtRQUM5RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3JCLFlBQVksRUFBRTt3QkFDVixzQkFBc0I7d0JBQ3RCLGdCQUFnQjt3QkFDaEIsbUJBQW1CO3FCQUN0QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsZ0JBQWdCO3dCQUNoQixtQkFBbUI7d0JBQ25CLGVBQWU7d0JBQ2YsWUFBWTt3QkFDWixVQUFVO3dCQUNWLGtCQUFrQjt3QkFDbEIsaUJBQWlCO3dCQUNqQixXQUFXO3dCQUNYLGNBQWM7d0JBQ2QsMEJBQTBCO3FCQUM3QjtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsa0NBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRiwwQkFBQztDQTNCRCxBQTJCQyxJQUFBO1NBM0JZLG1CQUFtQiIsImZpbGUiOiJjb25maWd1cmF0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=