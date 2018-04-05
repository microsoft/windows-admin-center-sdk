import { Component, Input } from '@angular/core';
var BreadcrumbHeaderComponent = (function () {
    function BreadcrumbHeaderComponent() {
        /**
         * List of items to be shown on the breadcrumb.
         */
        this.breadcrumbItems = [];
    }
    return BreadcrumbHeaderComponent;
}());
export { BreadcrumbHeaderComponent };
BreadcrumbHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-breadcrumb-header',
                template: "\n      <div class=\"tool-header-box\">\n        <h4 class=\"tool-header thin fixed-flex-size\">\n          <span *ngFor=\"let item of breadcrumbItems; let last = last\">\n            <a *ngIf=\"item.clickable === true\" (click)=\"item.command($event)\" class=\"breadCrumb black\" [ngClass]=\"{'font-bold': item.bold === true}\">{{item.label}}</a>\n            <span *ngIf=\"item.clickable !== true\" [ngClass]=\"{'font-bold': item.bold === true}\">{{item.label}}</span>\n\n            <!-- separator -->\n            <span *ngIf=\"!last\" [ngSwitch]=breadcrumbSeparator>              \n              <span *ngSwitchCase=\"0\">\\</span>\n              <span *ngSwitchCase=\"1\">/</span>\n              <span *ngSwitchCase=\"2\" class=\"sme-icon icon-win-chevronRight\"></span>\n            </span> \n          </span>\n        </h4>\n      </div>\n    "
            },] },
];
/** @nocollapse */
BreadcrumbHeaderComponent.ctorParameters = function () { return []; };
BreadcrumbHeaderComponent.propDecorators = {
    'breadcrumbItems': [{ type: Input },],
    'breadcrumbSeparator': [{ type: Input },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYnJlYWRjcnVtYi1oZWFkZXIvYnJlYWRjcnVtYi1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVcsS0FBQSxFQUFNLE1BQU8sZUFBQSxDQUFnQjtBQUlqRDtJQUFBO1FBRUk7O1dBRUc7UUFDSyxvQkFBZSxHQUFxQixFQUFFLENBQUM7SUFtQ25ELENBQUM7SUFBRCxnQ0FBQztBQUFELENBeENBLEFBd0NDOztBQTdCTSxvQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRSxzMUJBZ0JUO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHdDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0FBQ0ssd0NBQWMsR0FBMkM7SUFDaEUsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNyQyxxQkFBcUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0NBQ3hDLENBQUMiLCJmaWxlIjoiYnJlYWRjcnVtYi1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==