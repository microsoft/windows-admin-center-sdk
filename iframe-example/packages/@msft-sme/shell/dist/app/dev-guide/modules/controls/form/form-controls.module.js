import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as ng2 from '../../../../../angular';
import { routing } from './form-controls.routing';
import { FormControlsComponent } from './form-controls.component';
import { FormControlsService } from './form-controls.service';
import { TagsExampleComponent } from './inputs/tags/tags-example.component';
var FormControlsModule = /** @class */ (function () {
    function FormControlsModule() {
    }
    FormControlsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FormControlsComponent,
                        TagsExampleComponent
                    ],
                    imports: [
                        routing,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        ng2.SmeFormsModule
                    ],
                    providers: [
                        FormControlsService
                    ]
                },] },
    ];
    /** @nocollapse */
    FormControlsModule.ctorParameters = function () { return []; };
    return FormControlsModule;
}());
export { FormControlsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9mb3JtL2Zvcm0tY29udHJvbHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUN6QyxPQUFPLEVBQUUsV0FBQSxFQUFhLG1CQUFBLEVBQW9CLE1BQU8sZ0JBQUEsQ0FBaUI7QUFFbEUsT0FBTyxLQUFLLEdBQUEsTUFBUyx3QkFBQSxDQUF5QjtBQUM5QyxPQUFPLEVBQUUsT0FBQSxFQUFRLE1BQU8seUJBQUEsQ0FBMEI7QUFFbEQsT0FBTyxFQUFFLHFCQUFBLEVBQXNCLE1BQU8sMkJBQUEsQ0FBNEI7QUFDbEUsT0FBTyxFQUFFLG1CQUFBLEVBQW9CLE1BQU8seUJBQUEsQ0FBMEI7QUFFOUQsT0FBTyxFQUFFLG9CQUFBLEVBQXFCLE1BQU8sc0NBQUEsQ0FBdUM7QUFHNUU7SUFBQTtJQXFCQSxDQUFDO0lBckJ3Qyw2QkFBVSxHQUEwQjtRQUM3RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3JCLFlBQVksRUFBRTt3QkFDVixxQkFBcUI7d0JBQ3JCLG9CQUFvQjtxQkFDdkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLE9BQU87d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsR0FBRyxDQUFDLGNBQWM7cUJBQ3JCO29CQUNELFNBQVMsRUFBRTt3QkFDUCxtQkFBbUI7cUJBQ3RCO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxpQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLHlCQUFDO0NBckJELEFBcUJDLElBQUE7U0FyQlksa0JBQWtCIiwiZmlsZSI6ImZvcm0tY29udHJvbHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==