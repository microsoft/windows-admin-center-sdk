import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingWheelModule } from '../loading-wheel/loading-wheel.module';
import { DataTableColumnComponent } from './data-table-column.component';
import { DataTableTemplateLoaderComponent } from './data-table-template-loader.component';
import { DataTableComponent, TreeTableComponent } from './data-table.component';
var DataTableModule = /** @class */ (function () {
    function DataTableModule() {
    }
    DataTableModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DataTableComponent, DataTableColumnComponent, DataTableTemplateLoaderComponent, TreeTableComponent],
                    exports: [DataTableComponent, DataTableColumnComponent, TreeTableComponent],
                    imports: [CommonModule, LoadingWheelModule]
                },] },
    ];
    /** @nocollapse */
    DataTableModule.ctorParameters = function () { return []; };
    return DataTableModule;
}());
export { DataTableModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFFLGtCQUFBLEVBQW1CLE1BQU8sdUNBQUEsQ0FBd0M7QUFDM0UsT0FBTyxFQUFFLHdCQUFBLEVBQXlCLE1BQU8sK0JBQUEsQ0FBZ0M7QUFDekUsT0FBTyxFQUFFLGdDQUFBLEVBQWlDLE1BQU8sd0NBQUEsQ0FBeUM7QUFDMUYsT0FBTyxFQUFFLGtCQUFBLEVBQW9CLGtCQUFBLEVBQW1CLE1BQU8sd0JBQUEsQ0FBeUI7QUFHaEY7SUFBQTtJQVVBLENBQUM7SUFWb0MsMEJBQVUsR0FBMEI7UUFDekUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUNyQixZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSx3QkFBd0IsRUFBRSxnQ0FBZ0MsRUFBRSxrQkFBa0IsQ0FBQztvQkFDbEgsT0FBTyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQUUsa0JBQWtCLENBQUM7b0JBQzNFLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQztpQkFDOUMsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDhCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0Ysc0JBQUM7Q0FWRCxBQVVDLElBQUE7U0FWWSxlQUFlIiwiZmlsZSI6ImRhdGEtdGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==