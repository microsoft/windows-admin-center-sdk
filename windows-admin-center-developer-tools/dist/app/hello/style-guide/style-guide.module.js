import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionsModule, AlertBarModule, SmeStylesModule, SvgModule, ToolHeaderModule } from '@msft-sme/shell/angular';
import { HelloService } from '../hello.service';
import { StyleGuideComponent } from './style-guide.component';
import { routing } from './style-guide.routing';
var StyleGuideModule = /** @class */ (function () {
    function StyleGuideModule() {
    }
    StyleGuideModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        StyleGuideComponent
                    ],
                    providers: [
                        HelloService
                    ],
                    imports: [
                        ActionsModule,
                        AlertBarModule,
                        CommonModule,
                        FormsModule,
                        SmeStylesModule,
                        SvgModule,
                        routing,
                        ToolHeaderModule
                    ]
                },] },
    ];
    /** @nocollapse */
    StyleGuideModule.ctorParameters = function () { return []; };
    return StyleGuideModule;
}());
export { StyleGuideModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9oZWxsby9zdHlsZS1ndWlkZS9zdHlsZS1ndWlkZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxnQkFBQSxDQUFpQjtBQUM3QyxPQUFPLEVBQUUsYUFBQSxFQUFlLGNBQUEsRUFBZ0IsZUFBQSxFQUFpQixTQUFBLEVBQVcsZ0JBQUEsRUFBaUIsTUFBTyx5QkFBQSxDQUEwQjtBQUN0SCxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8sa0JBQUEsQ0FBbUI7QUFDaEQsT0FBTyxFQUFFLG1CQUFBLEVBQW9CLE1BQU8seUJBQUEsQ0FBMEI7QUFDOUQsT0FBTyxFQUFFLE9BQUEsRUFBUSxNQUFPLHVCQUFBLENBQXdCO0FBR2hEO0lBQUE7SUF1QkEsQ0FBQztJQXZCc0MsMkJBQVUsR0FBMEI7UUFDM0UsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUNyQixZQUFZLEVBQUU7d0JBQ1YsbUJBQW1CO3FCQUN0QjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1AsWUFBWTtxQkFDZjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsYUFBYTt3QkFDYixjQUFjO3dCQUNkLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxlQUFlO3dCQUNmLFNBQVM7d0JBQ1QsT0FBTzt3QkFDUCxnQkFBZ0I7cUJBQ25CO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwrQkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLHVCQUFDO0NBdkJELEFBdUJDLElBQUE7U0F2QlksZ0JBQWdCIiwiZmlsZSI6InN0eWxlLWd1aWRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL1NvdXJjZS9iYXNlL21zZnQtc21lLWRldmVsb3Blci10b29scy9pbmxpbmVTcmMvIn0=