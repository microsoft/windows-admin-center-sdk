import { Component, Input, ViewContainerRef } from '@angular/core';
var DataTableTemplateLoaderComponent = /** @class */ (function () {
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
    return DataTableTemplateLoaderComponent;
}());
export { DataTableTemplateLoaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLXRlbXBsYXRlLWxvYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBS0wsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBQSxDQUFnQjtBQVF2QjtJQVlJLDBDQUFvQixhQUErQjtRQUEvQixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7SUFDbkQsQ0FBQztJQUVNLG1EQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM3RCxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDcEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQzFCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxzREFBVyxHQUFsQixVQUFtQixPQUFPO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLENBQUM7UUFDWCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUM7UUFDbEUsQ0FBQztJQUNMLENBQUM7SUFFTSxzREFBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNFLDJDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGdDQUFnQztvQkFDMUMsUUFBUSxFQUFFLEVBQUU7aUJBQ2YsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLCtDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxnQkFBZ0IsR0FBRztLQUN6QixFQUY2RixDQUU3RixDQUFDO0lBQ0ssK0NBQWMsR0FBMkM7UUFDaEUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDMUIsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDOUIsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7S0FDN0IsQ0FBQztJQUNGLHVDQUFDO0NBakRELEFBaURDLElBQUE7U0FqRFksZ0NBQWdDIiwiZmlsZSI6ImRhdGEtdGFibGUtdGVtcGxhdGUtbG9hZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=