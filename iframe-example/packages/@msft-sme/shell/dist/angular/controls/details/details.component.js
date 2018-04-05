import { Component, EventEmitter, Input, Output } from '@angular/core';
var DetailsComponent = /** @class */ (function () {
    function DetailsComponent() {
        this.strings = MsftSme.resourcesStrings();
        this.isExpandedChange = new EventEmitter();
    }
    DetailsComponent.prototype.toggleExpansion = function () {
        this.isExpanded = !this.isExpanded;
        this.isExpandedChange.emit(this.isExpanded);
    };
    DetailsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-details',
                    template: "\n      <div class=\"sme-button sme-button-trigger sme-button-auto-width sme-padding-squish-v-lg sme-position-stretch-h sme-position-left-inline sme-arrange-stack-h\" role=\"button\" tabindex=\"0\" (click)=\"toggleExpansion()\" [title]=\"isExpanded ? strings.MsftSmeShell.Angular.Common.collapse : strings.MsftSmeShell.Angular.Common.expand\">\n          <h3 class=\"sme-position-flex-auto\">{{title}}</h3>\n          <span class=\"sme-icon sme-position-flex-none\" [ngClass]=\"{'sme-icon-chevronUpMed': !isExpanded, 'sme-icon-chevronDownMed': isExpanded}\"></span>\n      </div>\n\n      <div class=\"sme-layout-relative sme-layout-details-panel sme-margin-bottom-sm sme-arrange-overflow-auto\" [class.sme-layout-none]=\"!isExpanded\">\n          <ng-content></ng-content>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    DetailsComponent.ctorParameters = function () { return []; };
    DetailsComponent.propDecorators = {
        'title': [{ type: Input },],
        'isExpanded': [{ type: Input },],
        'isExpandedChange': [{ type: Output },],
    };
    return DetailsComponent;
}());
export { DetailsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGV0YWlscy9kZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFXLFlBQUEsRUFBYyxLQUFBLEVBQU8sTUFBQSxFQUFPLE1BQU8sZUFBQSxDQUFnQjtBQUl2RTtJQUFBO1FBQ1csWUFBTyxHQUFZLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDO1FBU3ZELHFCQUFnQixHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO0lBNkJqRixDQUFDO0lBM0JVLDBDQUFlLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNFLDJCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSwyeEJBU1Q7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLCtCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0ssK0JBQWMsR0FBMkM7UUFDaEUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDM0IsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDaEMsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtLQUN0QyxDQUFDO0lBQ0YsdUJBQUM7Q0F2Q0QsQUF1Q0MsSUFBQTtTQXZDWSxnQkFBZ0IiLCJmaWxlIjoiZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9