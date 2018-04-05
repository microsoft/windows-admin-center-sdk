import { Component, Input, ViewContainerRef } from '@angular/core';
var DataTableTemplateLoaderComponent = (function () {
    function DataTableTemplateLoaderComponent(viewContainer) {
        this.viewContainer = viewContainer;
    }
    DataTableTemplateLoaderComponent.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.template, {
            $implicit: this.data,
            rowIndex: this.rowIndex
        });
    };
    DataTableTemplateLoaderComponent.prototype.ngOnChanges = function (changes) {
        if (!this.view) {
            return;
        }
        if ('rowIndex' in changes) {
            this.view.context.rowIndex = changes['rowIndex'].currentValue;
        }
    };
    DataTableTemplateLoaderComponent.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return DataTableTemplateLoaderComponent;
}());
export { DataTableTemplateLoaderComponent };
DataTableTemplateLoaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-data-table-template-loader',
                template: ''
            },] },
];
/** @nocollapse */
DataTableTemplateLoaderComponent.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
DataTableTemplateLoaderComponent.propDecorators = {
    'data': [{ type: Input },],
    'rowIndex': [{ type: Input },],
    'template': [{ type: Input },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLnRlbXBsYXRlbG9hZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFLTCxnQkFBZ0IsRUFDbkIsTUFBTSxlQUFBLENBQWdCO0FBT3ZCO0lBWUksMENBQW9CLGFBQStCO1FBQS9CLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtJQUNuRCxDQUFDO0lBRU0sbURBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzdELFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNwQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDMUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHNEQUFXLEdBQWxCLFVBQW1CLE9BQU87UUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNiLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUNsRSxDQUFDO0lBQ0wsQ0FBQztJQUVNLHNEQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBZ0JMLHVDQUFDO0FBQUQsQ0FqREEsQUFpREM7O0FBZk0sMkNBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsZ0NBQWdDO2dCQUMxQyxRQUFRLEVBQUUsRUFBRTthQUNmLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCwrQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEdBQUc7Q0FDekIsRUFGNkYsQ0FFN0YsQ0FBQztBQUNLLCtDQUFjLEdBQTJDO0lBQ2hFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzFCLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzlCLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0NBQzdCLENBQUMiLCJmaWxlIjoiZGF0YS10YWJsZS50ZW1wbGF0ZWxvYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9