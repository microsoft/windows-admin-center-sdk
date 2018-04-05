import { Component } from '@angular/core';
var DevGuideComponent = (function () {
    function DevGuideComponent() {
    }
    DevGuideComponent.navigationTitle = function (appContextService, snapshot) {
        return 'Dev Guide';
    };
    return DevGuideComponent;
}());
export { DevGuideComponent };
DevGuideComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-dev-guide',
                template: "\n      <sme-styles>\n          <div class=\"tool-container flex-layout vertical\">\n              <ul class=\"nav nav-tabs fixed-flex-size\" role=\"tablist\">\n                  <li role=\"presentation\">\n                      <a routerLink=\"/dev/landing\" routerLinkActive=\"active\" role=\"tab\">Landing</a>\n                  </li>\n                  <li role=\"presentation\">\n                      <a routerLink=\"/dev/controls\" routerLinkActive=\"active\" role=\"tab\">Controls</a>\n                  </li>\n                  <li role=\"presentation\">\n                      <a routerLink=\"/dev/pipes\" routerLinkActive=\"active\" role=\"tab\">Pipes</a>\n                  </li>\n                  <li role=\"presentation\">\n                      <a routerLink=\"/dev/styles\" routerLinkActive=\"active\" role=\"tab\">Styles</a>\n                  </li>\n              </ul>\n              <div class=\"auto-flex-size relative m-t-xxxs\">\n                  <router-outlet></router-outlet>\n              </div>\n          </div>\n      </sme-styles>\n    "
            },] },
];
/** @nocollapse */
DevGuideComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvZGV2LWd1aWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFLN0Q7SUFBQTtJQW1DQSxDQUFDO0lBbENpQixpQ0FBZSxHQUE3QixVQUE4QixpQkFBb0MsRUFBRSxRQUFnQztRQUNoRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFnQ0wsd0JBQUM7QUFBRCxDQW5DQSxBQW1DQzs7QUEvQk0sNEJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLGdqQ0FzQlQ7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsZ0NBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoiZGV2LWd1aWRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=