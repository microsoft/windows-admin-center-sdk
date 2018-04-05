import { Component } from '@angular/core';
var LoadingWheelExampleComponent = /** @class */ (function () {
    function LoadingWheelExampleComponent() {
        this.clicked = false;
    }
    LoadingWheelExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'sme-loading-wheel';
    };
    Object.defineProperty(LoadingWheelExampleComponent.prototype, "status", {
        get: function () {
            return this.clicked ? '(clicked)' : 'Taking longer';
        },
        enumerable: true,
        configurable: true
    });
    LoadingWheelExampleComponent.prototype.onClick = function () {
        this.clicked = !this.clicked;
    };
    LoadingWheelExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-loading-wheel-example',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-arrange-wrapstack-h\">\n          <div class=\"sme-layout-relative sme-position-flex-none sme-margin-inset-xxs sme-border-inset-sm\" style=\"height:200px; width:200px; background: blue;\">\n              <sme-loading-wheel size=\"small\"></sme-loading-wheel>\n              <div>hidden</div>\n          </div>\n          <div class=\"sme-layout-relative sme-position-flex-none sme-margin-inset-xxs sme-border-inset-sm\" style=\"height:200px; width:200px; background: blue;\">\n              <sme-loading-wheel size=\"medium\"></sme-loading-wheel>\n              <div>hidden</div>\n          </div>\n          <div class=\"sme-layout-relative sme-position-flex-none sme-margin-inset-xxs sme-border-inset-sm\" style=\"height:200px; width:200px; background: blue;\">\n              <sme-loading-wheel></sme-loading-wheel>\n              <div>hidden</div>\n          </div>\n          <div class=\"sme-layout-relative sme-position-flex-none sme-margin-inset-xxs sme-border-inset-sm\" style=\"height:200px; width:200px; background: blue;\">\n              <sme-loading-wheel size=\"small\" message=\"small\"></sme-loading-wheel>\n              <div>hidden</div>\n          </div>\n          <div class=\"sme-layout-relative sme-position-flex-none sme-margin-inset-xxs sme-border-inset-sm\" style=\"height:200px; width:200px; background: blue;\">\n              <sme-loading-wheel size=\"medium\" message=\"medium\"></sme-loading-wheel>\n              <div>hidden</div>\n          </div>\n          <div class=\"sme-layout-relative sme-position-flex-none sme-margin-inset-xxs sme-border-inset-sm\" style=\"height:200px; width:200px; background: blue;\">\n              <sme-loading-wheel message=\"large (default)\"></sme-loading-wheel>\n              <div>hidden</div>\n          </div>\n          <div class=\"sme-layout-relative sme-position-flex-none sme-margin-inset-xxs sme-border-inset-sm\" style=\"height:400px; width:400px; background: blue;\">\n              <sme-loading-wheel message=\"{{status}}\" buttonLabel=\"Toggle\" (buttonClick)=\"onClick()\"></sme-loading-wheel>\n              <div>hidden</div>\n          </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    LoadingWheelExampleComponent.ctorParameters = function () { return []; };
    return LoadingWheelExampleComponent;
}());
export { LoadingWheelExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9sb2FkaW5nLXdoZWVsL2xvYWRpbmctd2hlZWwtZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFLMUM7SUFBQTtRQUNXLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFxRDNCLENBQUM7SUFuRGlCLDRDQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztJQUMvQixDQUFDO0lBRUQsc0JBQVcsZ0RBQU07YUFBakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7UUFDeEQsQ0FBQzs7O09BQUE7SUFFTSw4Q0FBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDakMsQ0FBQztJQUNFLHVDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLHdDQUF3QztvQkFDbEQsUUFBUSxFQUFFLDBxRUErQlQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDJDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsbUNBQUM7Q0F0REQsQUFzREMsSUFBQTtTQXREWSw0QkFBNEIiLCJmaWxlIjoibG9hZGluZy13aGVlbC1leGFtcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=