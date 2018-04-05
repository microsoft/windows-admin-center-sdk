import { Component } from '@angular/core';
import { AppContextService } from '../../../angular';
var UnsupportedBrowserComponent = /** @class */ (function () {
    function UnsupportedBrowserComponent(appContextService) {
        this.appContextService = appContextService;
        this.strings = MsftSme.resourcesStrings().MsftSmeShell.App;
    }
    /**
     * Update the navigation title.
     *
     * @param appContextService the application context service.
     * @param snapshot the route snapshot.
     */
    UnsupportedBrowserComponent.navigationTitle = function (appContextService, snapshot) {
        return MsftSme.resourcesStrings().MsftSmeShell.App.Errors.UnsupportedBrowser.title;
    };
    Object.defineProperty(UnsupportedBrowserComponent.prototype, "bodyMessage", {
        get: function () {
            var originUrl = window.location.origin;
            return this.strings.Errors.UnsupportedBrowserBody.message.format(originUrl);
        },
        enumerable: true,
        configurable: true
    });
    UnsupportedBrowserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-errors-unsupported-browser',
                    template: "\n      <div class=\"sme-position-center-h-inline sme-padding-top-xl sme-custom-unsupprted-browser-outer\">\n        <h2>{{strings.Errors.UnsupportedBrowserCommon.message}}</h2>\n        <p>{{bodyMessage}}</p>\n        <p>\n          {{strings.Errors.UnsupportedBrowserFootBegin.message}}\n          <a class=\"sme-link\" href=\"{{strings.Overview.feedback.link.href}}\"><p>{{strings.Overview.feedback.link.text}}</p></a>{{strings.Errors.UnsupportedBrowserFootEnd.message}}\n        </p>\n      </div>\n    ",
                    styles: ["\n      .sme-custom-unsupprted-browser-outer {\n          width: 60%;\n          margin: auto;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    UnsupportedBrowserComponent.ctorParameters = function () { return [
        { type: AppContextService, },
    ]; };
    return UnsupportedBrowserComponent;
}());
export { UnsupportedBrowserComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Vycm9ycy91bnN1cHBvcnRlZC1icm93c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUUxQyxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxrQkFBQSxDQUFtQjtBQUtyRDtJQWFJLHFDQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQVpqRCxZQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztJQVlYLENBQUM7SUFWNUQ7Ozs7O09BS0c7SUFDVywyQ0FBZSxHQUE3QixVQUE4QixpQkFBb0MsRUFBRSxRQUFnQztRQUNoRyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDO0lBQ2hHLENBQUM7SUFJRCxzQkFBVyxvREFBVzthQUF0QjtZQUNJLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hGLENBQUM7OztPQUFBO0lBQ0Usc0NBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsZ0NBQWdDO29CQUMxQyxRQUFRLEVBQUUsNmZBU1Q7b0JBQ0QsTUFBTSxFQUFFLENBQUMsK0dBS1IsQ0FBQztpQkFDTCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsMENBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO0tBQzFCLEVBRjZGLENBRTdGLENBQUM7SUFDRixrQ0FBQztDQTVDRCxBQTRDQyxJQUFBO1NBNUNZLDJCQUEyQiIsImZpbGUiOiJ1bnN1cHBvcnRlZC1icm93c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=