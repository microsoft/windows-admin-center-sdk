import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { DataTableSortMode } from './data-table-contract';
var DataTableColumnComponent = /** @class */ (function () {
    function DataTableColumnComponent() {
        this.searchable = true;
        this.sortMode = DataTableSortMode.None;
    }
    DataTableColumnComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-data-table-column, sme-tree-table-column',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    DataTableColumnComponent.ctorParameters = function () { return []; };
    DataTableColumnComponent.propDecorators = {
        'field': [{ type: Input },],
        'header': [{ type: Input },],
        'sortable': [{ type: Input },],
        'width': [{ type: Input },],
        'compareFunction': [{ type: Input },],
        'selectionMode': [{ type: Input },],
        'styleClass': [{ type: Input },],
        'searchable': [{ type: Input },],
        'bodyTemplate': [{ type: ContentChild, args: [TemplateRef,] },],
    };
    return DataTableColumnComponent;
}());
export { DataTableColumnComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLWNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxZQUFBLEVBQTRCLEtBQUEsRUFBeUIsV0FBQSxFQUFZLE1BQU8sZUFBQSxDQUFnQjtBQUU1RyxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyx1QkFBQSxDQUF3QjtBQUcxRDtJQUFBO1FBdUJXLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFFbEIsYUFBUSxHQUFzQixpQkFBaUIsQ0FBQyxJQUFJLENBQUM7SUF3QmhFLENBQUM7SUFwQk0sbUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsOENBQThDO29CQUN4RCxRQUFRLEVBQUUsRUFBRTtpQkFDZixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsdUNBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDSyx1Q0FBYyxHQUEyQztRQUNoRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMzQixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUM1QixVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUM5QixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMzQixpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ3JDLGVBQWUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ25DLFlBQVksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ2hDLFlBQVksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ2hDLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUcsRUFBRSxFQUFFO0tBQy9ELENBQUM7SUFDRiwrQkFBQztDQWpERCxBQWlEQyxJQUFBO1NBakRZLHdCQUF3QiIsImZpbGUiOiJkYXRhLXRhYmxlLWNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9