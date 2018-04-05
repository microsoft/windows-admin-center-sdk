import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule, SharedModule, TreeTableModule } from 'primeng/primeng';
import * as ng2 from '../../../../angular';
import { routing } from './styles.routing';
import { DetailsPaneContainerComponent } from './details-pane-container/details-pane-container.component';
import { DetailsPanelComponent } from './details-panel/details-panel.component';
import { PrimeNGComponent } from './prime-ng/prime-ng.component';
import { StylesComponent } from './styles.component';
import { FormsComponent } from './forms/forms.component';
import { SimpleFormComponent } from './forms/simple-form.component';
var StylesModule = (function () {
    function StylesModule() {
    }
    return StylesModule;
}());
export { StylesModule };
StylesModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    StylesComponent,
                    DetailsPanelComponent,
                    DetailsPaneContainerComponent,
                    PrimeNGComponent,
                    FormsComponent,
                    SimpleFormComponent
                ],
                imports: [
                    routing,
                    CommonModule,
                    ng2.LoadingWheelModule,
                    ng2.ActionsModule,
                    ng2.ToolHeaderModule,
                    DataTableModule,
                    SharedModule,
                    TreeTableModule,
                    HttpModule,
                    ReactiveFormsModule
                ],
                providers: []
            },] },
];
/** @nocollapse */
StylesModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9zdHlsZXMvc3R5bGVzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFlLG1CQUFBLEVBQW9CLE1BQU8sZ0JBQUEsQ0FBaUI7QUFDbEUsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFTLGVBQUEsQ0FBZ0I7QUFFN0MsT0FBTyxFQUFFLGVBQUEsRUFBaUIsWUFBQSxFQUF3QixlQUFBLEVBQWdCLE1BQU8saUJBQUEsQ0FBa0I7QUFFM0YsT0FBTyxLQUFLLEdBQUEsTUFBUyxxQkFBQSxDQUFzQjtBQUUzQyxPQUFPLEVBQUUsT0FBQSxFQUFRLE1BQU8sa0JBQUEsQ0FBbUI7QUFFM0MsT0FBTyxFQUFFLDZCQUFBLEVBQThCLE1BQU8sMkRBQUEsQ0FBNEQ7QUFDMUcsT0FBTyxFQUFFLHFCQUFBLEVBQXNCLE1BQU8seUNBQUEsQ0FBMEM7QUFDaEYsT0FBTyxFQUFFLGdCQUFBLEVBQWlCLE1BQU8sK0JBQUEsQ0FBZ0M7QUFDakUsT0FBTyxFQUFFLGVBQUEsRUFBZ0IsTUFBTyxvQkFBQSxDQUFxQjtBQUVyRCxPQUFPLEVBQUUsY0FBQSxFQUFlLE1BQU8seUJBQUEsQ0FBMEI7QUFDekQsT0FBTyxFQUFFLG1CQUFBLEVBQW9CLE1BQU8sK0JBQUEsQ0FBZ0M7QUFHcEU7SUFBQTtJQTRCQSxDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQTVCQSxBQTRCQzs7QUE1QmtDLHVCQUFVLEdBQTBCO0lBQ3ZFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDckIsWUFBWSxFQUFFO29CQUNWLGVBQWU7b0JBQ2YscUJBQXFCO29CQUNyQiw2QkFBNkI7b0JBQzdCLGdCQUFnQjtvQkFDaEIsY0FBYztvQkFDZCxtQkFBbUI7aUJBQ3RCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxPQUFPO29CQUNQLFlBQVk7b0JBQ1osR0FBRyxDQUFDLGtCQUFrQjtvQkFDdEIsR0FBRyxDQUFDLGFBQWE7b0JBQ2pCLEdBQUcsQ0FBQyxnQkFBZ0I7b0JBQ3BCLGVBQWU7b0JBQ2YsWUFBWTtvQkFDWixlQUFlO29CQUNmLFVBQVU7b0JBQ1YsbUJBQW1CO2lCQUN0QjtnQkFDRCxTQUFTLEVBQUUsRUFBRTthQUNoQixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsMkJBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoic3R5bGVzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=