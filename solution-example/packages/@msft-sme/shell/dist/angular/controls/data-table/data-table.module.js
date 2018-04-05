import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingWheelModule } from '../loading-wheel/loading-wheel.module';
import { DataTableColumnComponent } from './data-table.column.component';
import { DataTableComponent } from './data-table.component';
import { DataTableTemplateLoaderComponent } from './data-table.templateloader.component';
var DataTableModule = (function () {
    function DataTableModule() {
    }
    return DataTableModule;
}());
export { DataTableModule };
DataTableModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DataTableComponent, DataTableColumnComponent, DataTableTemplateLoaderComponent],
                exports: [DataTableComponent, DataTableColumnComponent],
                imports: [CommonModule, LoadingWheelModule]
            },] },
];
/** @nocollapse */
DataTableModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFFLGtCQUFBLEVBQW1CLE1BQU8sdUNBQUEsQ0FBd0M7QUFDM0UsT0FBTyxFQUFFLHdCQUFBLEVBQXlCLE1BQU8sK0JBQUEsQ0FBZ0M7QUFDekUsT0FBTyxFQUFFLGtCQUFBLEVBQW1CLE1BQU8sd0JBQUEsQ0FBeUI7QUFDNUQsT0FBTyxFQUFFLGdDQUFBLEVBQWlDLE1BQU8sdUNBQUEsQ0FBd0M7QUFHekY7SUFBQTtJQVVBLENBQUM7SUFBRCxzQkFBQztBQUFELENBVkEsQUFVQzs7QUFWb0MsMEJBQVUsR0FBMEI7SUFDekUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNyQixZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSx3QkFBd0IsRUFBRSxnQ0FBZ0MsQ0FBQztnQkFDOUYsT0FBTyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsd0JBQXdCLENBQUM7Z0JBQ3ZELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQzthQUM5QyxFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsOEJBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoiZGF0YS10YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9