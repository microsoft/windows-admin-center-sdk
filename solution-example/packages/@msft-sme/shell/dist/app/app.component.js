import { Component } from '@angular/core';
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
export { AppComponent };
AppComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-root',
                template: "\n      <sme-styles class=\"sme-layout-absolute sme-position-inset-none sme-arrange-stack-v\" role=\"application\">\n        <sme-app-bar class=\"sme-position-flex-none\"></sme-app-bar>\n        <div class=\"sme-layout-relative sme-position-flex-auto\">\n          <div class=\"sme-layout-absolute sme-position-inset-none\">\n            <sme-alert-bar></sme-alert-bar>\n            <sme-notifications-dialog></sme-notifications-dialog>\n            <sme-manage-as-dialog></sme-manage-as-dialog>\n            <sme-settings-dialog></sme-settings-dialog>\n            <sme-about-dialog></sme-about-dialog>\n            <sme-common-dialogs></sme-common-dialogs>\n            <sme-add-connection-dialog></sme-add-connection-dialog>\n          </div>\n          <div class=\"sme-layout-absolute sme-position-inset-none\">\n            <router-outlet></router-outlet>\n          </div>\n        </div>\n        <sme-day-zero-dialog></sme-day-zero-dialog>\n      </sme-styles>\n    ",
                styles: ["\n      :host >>> sme-dialog > sme-backdrop,\n      :host >>> sme-alert-bar .growl {\n          /* TODO: \n           * Move alert implementation from ng2 since modules only show alerts through rpc and long running powershell\n           * untill then, the position of the alert bar is fixed, so we have to override it to absolute to not overflow the header\n           */\n          position: absolute !important;\n      }\n    "]
            },] },
];
/** @nocollapse */
AppComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBRzFDO0lBQUE7SUFzQ0EsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0F0Q0EsQUFzQ0M7O0FBdENrQyx1QkFBVSxHQUEwQjtJQUN2RSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsaTlCQW1CVDtnQkFDRCxNQUFNLEVBQUUsQ0FBQywrYUFTUixDQUFDO2FBQ0wsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDJCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9