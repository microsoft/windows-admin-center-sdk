import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppContextService, AppErrorHandler, CoreServiceModule, DialogModule, GuidedPanelModule, IconModule, IdleModule, LoadingWheelModule, PipesModule, ResourceService, SmeStylesModule, SvgModule } from '@msft-sme/shell/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
var AppModule = /** @class */ (function () {
    function AppModule(appContextService) {
        this.appContextService = appContextService;
        this.appContextService.initializeModule({});
    }
    AppModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AppComponent
                    ],
                    imports: [
                        CoreServiceModule,
                        CommonModule,
                        BrowserModule,
                        DialogModule,
                        FormsModule,
                        SmeStylesModule,
                        SvgModule,
                        IconModule,
                        LoadingWheelModule,
                        GuidedPanelModule,
                        PipesModule,
                        IdleModule,
                        AppRoutingModule
                    ],
                    providers: [
                        ResourceService,
                        {
                            provide: ErrorHandler,
                            useClass: AppErrorHandler
                        }
                    ],
                    bootstrap: [AppComponent]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = function () { return [
        { type: AppContextService, },
    ]; };
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsWUFBQSxFQUFjLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDdkQsT0FBTyxFQUFFLFdBQUEsRUFBWSxNQUFPLGdCQUFBLENBQWlCO0FBQzdDLE9BQU8sRUFBRSxhQUFBLEVBQWMsTUFBTywyQkFBQSxDQUE0QjtBQUMxRCxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsWUFBWSxFQUNaLGlCQUFpQixFQUNqQixVQUFVLEVBQ1YsVUFBVSxFQUNWLGtCQUFrQixFQUNsQixXQUFXLEVBQ1gsZUFBZSxFQUNmLGVBQWUsRUFDZixTQUFTLEVBQ1osTUFBTSx5QkFBQSxDQUEwQjtBQUNqQyxPQUFPLEVBQUUsZ0JBQUEsRUFBaUIsTUFBTyxzQkFBQSxDQUF1QjtBQUN4RCxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFHL0M7SUFDSSxtQkFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDRSxvQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3JCLFlBQVksRUFBRTt3QkFDVixZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDTCxpQkFBaUI7d0JBQ2pCLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsZUFBZTt3QkFDZixTQUFTO3dCQUNULFVBQVU7d0JBQ1Ysa0JBQWtCO3dCQUNsQixpQkFBaUI7d0JBQ2pCLFdBQVc7d0JBQ1gsVUFBVTt3QkFDVixnQkFBZ0I7cUJBQ25CO29CQUNELFNBQVMsRUFBRTt3QkFDUCxlQUFlO3dCQUNmOzRCQUNJLE9BQU8sRUFBRSxZQUFZOzRCQUNyQixRQUFRLEVBQUUsZUFBZTt5QkFDNUI7cUJBQ0o7b0JBQ0QsU0FBUyxFQUFFLENBQUMsWUFBWSxDQUFDO2lCQUM1QixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsd0JBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO0tBQzFCLEVBRjZGLENBRTdGLENBQUM7SUFDRixnQkFBQztDQXRDRCxBQXNDQyxJQUFBO1NBdENZLFNBQVMiLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL3NvdXJjZS9tc2Z0LXNtZS1pZnJhbWUtZXh0ZW5zaW9uL2lubGluZVNyYy8ifQ==