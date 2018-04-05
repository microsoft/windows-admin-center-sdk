import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { DataTableSortMode } from './data-table.contract';
var DataTableColumnComponent = (function () {
    function DataTableColumnComponent() {
        this.sortMode = DataTableSortMode.None;
    }
    return DataTableColumnComponent;
}());
export { DataTableColumnComponent };
DataTableColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-data-table-column',
                template: ''
            },] },
];
/** @nocollapse */
DataTableColumnComponent.ctorParameters = function () { return []; };
DataTableColumnComponent.propDecorators = {
    'field': [{ type: Input },],
    'header': [{ type: Input },],
    'sortable': [{ type: Input },],
    'compareFunction': [{ type: Input },],
    'selectionMode': [{ type: Input },],
    'bodyTemplate': [{ type: ContentChild, args: [TemplateRef,] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLmNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxZQUFBLEVBQTRCLEtBQUEsRUFBeUIsV0FBQSxFQUFZLE1BQU8sZUFBQSxDQUFnQjtBQUU1RyxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyx1QkFBQSxDQUF3QjtBQUcxRDtJQUFBO1FBZ0JXLGFBQVEsR0FBc0IsaUJBQWlCLENBQUMsSUFBSSxDQUFDO0lBcUJoRSxDQUFDO0lBQUQsK0JBQUM7QUFBRCxDQXJDQSxBQXFDQzs7QUFqQk0sbUNBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUUsRUFBRTthQUNmLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCx1Q0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztBQUNLLHVDQUFjLEdBQTJDO0lBQ2hFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzNCLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzVCLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzlCLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDckMsZUFBZSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDbkMsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRyxFQUFFLEVBQUU7Q0FDL0QsQ0FBQyIsImZpbGUiOiJkYXRhLXRhYmxlLmNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9