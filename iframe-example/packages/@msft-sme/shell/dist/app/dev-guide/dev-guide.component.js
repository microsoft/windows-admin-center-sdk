import { Component } from '@angular/core';
var DevGuideComponent = /** @class */ (function () {
    function DevGuideComponent() {
    }
    DevGuideComponent.navigationTitle = function (appContextService, snapshot) {
        return 'Dev Guide';
    };
    DevGuideComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-dev-guide',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-arrange-stack-v\">\n          <h1 class=\"sme-position-flex-none sme-padding-squish-v-md\">Development Guide</h1>\n          <div class=\"sme-pivot sme-position-flex-none sme-padding-bottom-sm sme-padding-horizontal-md\">\n              <div role=\"tablist\">\n                  <a role=\"tab\" routerLink=\"/dev/landing\" routerLinkActive=\"sme-active\">Landing</a>\n                  <a role=\"tab\" routerLink=\"/dev/controls\" routerLinkActive=\"sme-active\">Controls</a>\n                  <a role=\"tab\" routerLink=\"/dev/pipes\" routerLinkActive=\"sme-active\">Pipes</a>\n                  <a role=\"tab\" routerLink=\"/dev/styles\" routerLinkActive=\"sme-active\">Styles</a>\n              </div>\n          </div>\n          <div class=\"sme-layout-relative sme-position-flex-auto\">\n              <router-outlet></router-outlet>\n          </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    DevGuideComponent.ctorParameters = function () { return []; };
    return DevGuideComponent;
}());
export { DevGuideComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvZGV2LWd1aWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFLN0Q7SUFBQTtJQTRCQSxDQUFDO0lBM0JpQixpQ0FBZSxHQUE3QixVQUE4QixpQkFBb0MsRUFBRSxRQUFnQztRQUNoRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFDRSw0QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUscTdCQWVUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxnQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLHdCQUFDO0NBNUJELEFBNEJDLElBQUE7U0E1QlksaUJBQWlCIiwiZmlsZSI6ImRldi1ndWlkZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9