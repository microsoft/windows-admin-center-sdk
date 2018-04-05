import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as ng2 from '@msft-sme/shell/angular';
import { routing } from './form-controls.routing';
import { FormControlsComponent } from './form-controls.component';
import { FormFieldsExampleComponent } from './form-fields/form-fields-example.component';
import { SodaFactoryExampleComponent } from './soda-factory/soda-factory-example.component';
import { ValidationAlertExampleComponent } from './validation-alert/validation-alert-example.component';
var FormControlsModule = /** @class */ (function () {
    function FormControlsModule() {
    }
    FormControlsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FormControlsComponent,
                        FormFieldsExampleComponent,
                        SodaFactoryExampleComponent,
                        ValidationAlertExampleComponent
                    ],
                    imports: [
                        routing,
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        ng2.SmeFormsModule
                    ]
                },] },
    ];
    /** @nocollapse */
    FormControlsModule.ctorParameters = function () { return []; };
    return FormControlsModule;
}());
export { FormControlsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9mb3JtL2Zvcm0tY29udHJvbHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUN6QyxPQUFPLEVBQUUsV0FBQSxFQUFhLG1CQUFBLEVBQW9CLE1BQU8sZ0JBQUEsQ0FBaUI7QUFFbEUsT0FBTyxLQUFLLEdBQUEsTUFBUyx5QkFBQSxDQUEwQjtBQUMvQyxPQUFPLEVBQUUsT0FBQSxFQUFRLE1BQU8seUJBQUEsQ0FBMEI7QUFFbEQsT0FBTyxFQUFFLHFCQUFBLEVBQXNCLE1BQU8sMkJBQUEsQ0FBNEI7QUFFbEUsT0FBTyxFQUFFLDBCQUFBLEVBQTJCLE1BQU8sNkNBQUEsQ0FBOEM7QUFDekYsT0FBTyxFQUFFLDJCQUFBLEVBQTRCLE1BQU8sK0NBQUEsQ0FBZ0Q7QUFDNUYsT0FBTyxFQUFFLCtCQUFBLEVBQWdDLE1BQU8sdURBQUEsQ0FBd0Q7QUFHeEc7SUFBQTtJQW9CQSxDQUFDO0lBcEJ3Qyw2QkFBVSxHQUEwQjtRQUM3RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3JCLFlBQVksRUFBRTt3QkFDVixxQkFBcUI7d0JBQ3JCLDBCQUEwQjt3QkFDMUIsMkJBQTJCO3dCQUMzQiwrQkFBK0I7cUJBQ2xDO29CQUNELE9BQU8sRUFBRTt3QkFDTCxPQUFPO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLEdBQUcsQ0FBQyxjQUFjO3FCQUNyQjtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsaUNBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRix5QkFBQztDQXBCRCxBQW9CQyxJQUFBO1NBcEJZLGtCQUFrQiIsImZpbGUiOiJmb3JtLWNvbnRyb2xzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL1NvdXJjZS9iYXNlL21zZnQtc21lLWRldmVsb3Blci10b29scy9pbmxpbmVTcmMvIn0=