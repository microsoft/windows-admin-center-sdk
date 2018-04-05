import { Component } from '@angular/core';
var LoadingWheelExampleComponent = (function () {
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
    return LoadingWheelExampleComponent;
}());
export { LoadingWheelExampleComponent };
LoadingWheelExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-loading-wheel-example',
                template: "\n      <div class=\"dashboard\" style=\"background: transparent\">\n          <div class=\"fixed-flex-size relative m-r-xxxs m-b-xxxs border-all\" style=\"height:200px; width:200px; background: blue;\">\n              <sme-loading-wheel size=\"small\"></sme-loading-wheel>\n              <div>hidden</div>\n          </div>\n          <div class=\"fixed-flex-size relative m-r-xxxs m-b-xxxs border-all\" style=\"height:200px; width:200px; background: blue;\">\n              <sme-loading-wheel size=\"medium\"></sme-loading-wheel>\n          </div>\n          <div class=\"fixed-flex-size relative m-r-xxxs m-b-xxxs border-all\" style=\"height:200px; width:200px; background: blue;\">\n              <sme-loading-wheel></sme-loading-wheel>\n          </div>\n          <div class=\"fixed-flex-size relative m-r-xxxs m-b-xxxs border-all\" style=\"height:200px; width:200px; background: blue;\">\n              <sme-loading-wheel size=\"small\" message=\"small\"></sme-loading-wheel>\n          </div>\n          <div class=\"fixed-flex-size relative m-r-xxxs m-b-xxxs border-all\" style=\"height:200px; width:200px; background: blue;\">\n              <sme-loading-wheel size=\"medium\" message=\"medium\"></sme-loading-wheel>\n          </div>\n          <div class=\"fixed-flex-size relative m-r-xxxs m-b-xxxs border-all\" style=\"height:200px; width:200px; background: blue;\">\n              <sme-loading-wheel message=\"large (default)\"></sme-loading-wheel>\n          </div>\n          <div class=\"fixed-flex-size relative m-r-xxxs m-b-xxxs border-all\" style=\"height:400px; width:400px; background: blue;\">\n              <sme-loading-wheel message=\"{{status}}\" buttonLabel=\"Toggle\" (buttonClick)=\"onClick()\"></sme-loading-wheel>\n          </div>\n      </div>\n    "
            },] },
];
/** @nocollapse */
LoadingWheelExampleComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9sb2FkaW5nLXdoZWVsL2xvYWRpbmctd2hlZWwtZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFLMUM7SUFBQTtRQUNXLFlBQU8sR0FBRyxLQUFLLENBQUM7SUErQzNCLENBQUM7SUE3Q2lCLDRDQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztJQUMvQixDQUFDO0lBRUQsc0JBQVcsZ0RBQU07YUFBakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLEdBQUcsZUFBZSxDQUFDO1FBQ3hELENBQUM7OztPQUFBO0lBRU0sOENBQU8sR0FBZDtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2pDLENBQUM7SUFtQ0wsbUNBQUM7QUFBRCxDQWhEQSxBQWdEQzs7QUFsQ00sdUNBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsd0NBQXdDO2dCQUNsRCxRQUFRLEVBQUUsMHZEQXlCVDthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCwyQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJsb2FkaW5nLXdoZWVsLWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==