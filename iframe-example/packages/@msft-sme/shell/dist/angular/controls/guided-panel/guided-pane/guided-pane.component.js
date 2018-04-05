import { Component, HostBinding, Input } from '@angular/core';
var GuidedPaneComponent = /** @class */ (function () {
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
    GuidedPaneComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-guided-pane',
                    template: "\n      <div *ngIf=\"active\" class=\"sme-layout-absolute sme-position-inset-none sme-arrange-stack-v\">\n          <ng-content></ng-content>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    GuidedPaneComponent.ctorParameters = function () { return []; };
    GuidedPaneComponent.propDecorators = {
        'paneId': [{ type: Input },],
        'getTop': [{ type: HostBinding, args: ['style.display',] },],
    };
    return GuidedPaneComponent;
}());
export { GuidedPaneComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZ3VpZGVkLXBhbmVsL2d1aWRlZC1wYW5lL2d1aWRlZC1wYW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFXLFdBQUEsRUFBYSxLQUFBLEVBQU0sTUFBTyxlQUFBLENBQWdCO0FBRzlEO0lBQUE7UUFHVyxXQUFNLEdBQUcsS0FBSyxDQUFDO0lBeUIxQixDQUFDO0lBcEJJLHNCQUFJLHVDQUFNO1FBSFg7O1dBRUc7YUFDRjtZQUNHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUNFLDhCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLG1LQUlUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxrQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNLLGtDQUFjLEdBQTJDO1FBQ2hFLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzVCLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUcsRUFBRSxFQUFFO0tBQzVELENBQUM7SUFDRiwwQkFBQztDQTVCRCxBQTRCQyxJQUFBO1NBNUJZLG1CQUFtQiIsImZpbGUiOiJndWlkZWQtcGFuZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9