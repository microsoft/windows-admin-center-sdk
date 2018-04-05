import { Component, EventEmitter, Input, Output } from '@angular/core';
var DetailsComponent = (function () {
    function DetailsComponent() {
        this.strings = MsftSme.resourcesStrings();
        this.isExpandedChange = new EventEmitter();
    }
    DetailsComponent.prototype.toggleExpansion = function () {
        this.isExpanded = !this.isExpanded;
        this.isExpandedChange.emit(this.isExpanded);
    };
    return DetailsComponent;
}());
export { DetailsComponent };
DetailsComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-details',
                styles: ["\n      /*\n          Header Styles\n      */\n\n      .header {\n          margin: 20px 24px 12px 24px;\n      }\n\n      .header:hover{\n          cursor: pointer;\n          background: rgba(33,33,33,0.05);\n      }\n\n      .header.collapsed{\n          margin:0;\n      }\n\n      .header button {\n          background: transparent;\n          border: 0;\n          height: 40px;\n          padding: 0;\n          width: 40px;\n      }\n\n      .header button:before {\n          color: #333333;\n      }\n\n      .header-content {\n          padding-left: 10px;\n      }\n\n      .header.collapsed .header-content {\n          padding: 0 20px 0 34px;\n      }\n\n      /*\n          Content Area Styles\n      */\n\n      .content {\n          margin-bottom: 12px;\n          overflow: auto;\n          height: 30vh;\n          max-height: 600px;\n          min-height: 150px;\n      }\n\n      .content.collapsed {\n          display: none;\n      }\n\n      /*\n          Header Title Styles\n      */\n\n      .header h5 {\n          color: #333333;\n          font-weight: bold;\n          padding: 0;\n          line-height:40px;\n      }\n    "],
                template: "\n      <div class=\"header\" [class.expanded]=\"isExpanded\" [class.collapsed]=\"!isExpanded\">\n        <div class=\"header-content flex-layout\" (click)=\"toggleExpansion()\">\n          <h5 class=\"auto-flex-size\">{{title}}</h5>\n          <button class=\"sme-icon sme-icon-16 fixed-flex-size\" [title]=\"isExpanded?strings.MsftSmeShell.Angular.Common.collapse:strings.MsftSmeShell.Angular.Common.expand\"\n            [class.icon-win-chevronUpMed]=\"!isExpanded\" [class.icon-win-chevronDownMed]=\"isExpanded\">\n        </button>\n        </div>\n      </div>\n      <div class=\"content relative\" [class.collapsed]=\"!isExpanded\">\n        <ng-content></ng-content>\n      </div>\n    "
            },] },
];
/** @nocollapse */
DetailsComponent.ctorParameters = function () { return []; };
DetailsComponent.propDecorators = {
    'title': [{ type: Input },],
    'isExpanded': [{ type: Input },],
    'isExpandedChange': [{ type: Output },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGV0YWlscy9kZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFXLFlBQUEsRUFBYyxLQUFBLEVBQU8sTUFBQSxFQUFPLE1BQU8sZUFBQSxDQUFnQjtBQUl2RTtJQUFBO1FBQ1csWUFBTyxHQUFZLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDO1FBU3ZELHFCQUFnQixHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO0lBaUdqRixDQUFDO0lBL0ZVLDBDQUFlLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQTRGTCx1QkFBQztBQUFELENBM0dBLEFBMkdDOztBQTNGTSwyQkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixNQUFNLEVBQUUsQ0FBQyxzb0NBZ0VSLENBQUM7Z0JBQ0YsUUFBUSxFQUFFLHlyQkFZVDthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCwrQkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztBQUNLLCtCQUFjLEdBQTJDO0lBQ2hFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzNCLFlBQVksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ2hDLGtCQUFrQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7Q0FDdEMsQ0FBQyIsImZpbGUiOiJkZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=