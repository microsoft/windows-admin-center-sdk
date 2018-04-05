import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppContextService } from '../../service';
import { LoadingWheelModule } from '../loading-wheel';
import { WizardComponent, WizardFooterComponent } from './wizard.component';
var WizardModule = /** @class */ (function () {
    function WizardModule() {
    }
    WizardModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        WizardComponent,
                        WizardFooterComponent
                    ],
                    exports: [
                        WizardComponent,
                        WizardFooterComponent
                    ],
                    imports: [
                        CommonModule,
                        LoadingWheelModule
                    ],
                    providers: [
                        AppContextService
                    ]
                },] },
    ];
    /** @nocollapse */
    WizardModule.ctorParameters = function () { return []; };
    return WizardModule;
}());
export { WizardModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvd2l6YXJkL3dpemFyZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBRXpDLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLGVBQUEsQ0FBZ0I7QUFDbEQsT0FBTyxFQUFFLGtCQUFBLEVBQW1CLE1BQU8sa0JBQUEsQ0FBbUI7QUFDdEQsT0FBTyxFQUFFLGVBQUEsRUFBaUIscUJBQUEsRUFBc0IsTUFBTyxvQkFBQSxDQUFxQjtBQUc1RTtJQUFBO0lBc0JBLENBQUM7SUF0QmtDLHVCQUFVLEdBQTBCO1FBQ3ZFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDckIsWUFBWSxFQUFFO3dCQUNWLGVBQWU7d0JBQ2YscUJBQXFCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsZUFBZTt3QkFDZixxQkFBcUI7cUJBQ3hCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLGtCQUFrQjtxQkFDckI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNQLGlCQUFpQjtxQkFDcEI7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDJCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsbUJBQUM7Q0F0QkQsQUFzQkMsSUFBQTtTQXRCWSxZQUFZIiwiZmlsZSI6IndpemFyZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9