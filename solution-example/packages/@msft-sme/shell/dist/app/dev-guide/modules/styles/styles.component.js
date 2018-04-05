import { Component } from '@angular/core';
var StylesComponent = (function () {
    function StylesComponent() {
    }
    StylesComponent.navigationTitle = function (appContextService, snapshot) {
        return 'Styles';
    };
    return StylesComponent;
}());
export { StylesComponent };
StylesComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-styles',
                template: "\n      <div class=\"stretch-absolute flex-layout\">\n        <nav role=\"navigation\" class=\"nav side-navigation side-navigation-large theme-default fixed-flex-size p-r-xs\">\n          <ul>\n            <li><a routerLink=\"detailsPanel\" routerLinkActive=\"active\">details panel</a></li>\n            <li><a routerLink=\"detailsPaneContainer\" routerLinkActive=\"active\">details pane container</a></li>\n            <li><a routerLink=\"primeng\" routerLinkActive=\"active\">Prime NG</a></li>\n            <li><a routerLink=\"forms\" routerLinkActive=\"active\">Forms</a></li>\n          </ul>\n        </nav>\n        <div class=\"auto-flex-size relative\">\n          <router-outlet></router-outlet>\n        </div>\n      </div>\n    "
            },] },
];
/** @nocollapse */
StylesComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9zdHlsZXMvc3R5bGVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUsxQztJQUFBO0lBMkJBLENBQUM7SUExQmlCLCtCQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQXdCTCxzQkFBQztBQUFELENBM0JBLEFBMkJDOztBQXZCTSwwQkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRSx1dUJBY1Q7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsOEJBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoic3R5bGVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=