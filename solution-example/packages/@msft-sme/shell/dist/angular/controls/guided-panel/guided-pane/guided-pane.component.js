import { Component, HostBinding, Input } from '@angular/core';
var GuidedPaneComponent = (function () {
    function GuidedPaneComponent() {
        this.active = false;
    }
    Object.defineProperty(GuidedPaneComponent.prototype, "getTop", {
        /**
         * Host element binding for the display of the pane
         */
        get: function () {
            return this.active ? 'block' : 'none';
        },
        enumerable: true,
        configurable: true
    });
    return GuidedPaneComponent;
}());
export { GuidedPaneComponent };
GuidedPaneComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-guided-pane',
                template: "\n      <div *ngIf=\"active\" class=\"stretch-absolute flex-layout vertical pane\">\n          <ng-content></ng-content>\n      </div>\n    ",
                styles: ["\n      :host {\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom:0;\n      }\n\n      :host >>> .btn {\n          margin: 12px 0 0 0;\n      }\n    "]
            },] },
];
/** @nocollapse */
GuidedPaneComponent.ctorParameters = function () { return []; };
GuidedPaneComponent.propDecorators = {
    'paneId': [{ type: Input },],
    'getTop': [{ type: HostBinding, args: ['style.display',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZ3VpZGVkLXBhbmVsL2d1aWRlZC1wYW5lL2d1aWRlZC1wYW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFXLFdBQUEsRUFBYSxLQUFBLEVBQU0sTUFBTyxlQUFBLENBQWdCO0FBRzlEO0lBQUE7UUFHVyxXQUFNLEdBQUcsS0FBSyxDQUFDO0lBc0MxQixDQUFDO0lBakNJLHNCQUFJLHVDQUFNO1FBSFg7O1dBRUc7YUFDRjtZQUNHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUErQkwsMEJBQUM7QUFBRCxDQXpDQSxBQXlDQzs7QUE5Qk0sOEJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUUsOElBSVQ7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsa05BWVIsQ0FBQzthQUNMLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxrQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztBQUNLLGtDQUFjLEdBQTJDO0lBQ2hFLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzVCLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUcsRUFBRSxFQUFFO0NBQzVELENBQUMiLCJmaWxlIjoiZ3VpZGVkLXBhbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==