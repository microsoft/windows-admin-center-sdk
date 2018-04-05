import { Component } from '@angular/core';
var UnsupportedBrowserComponent = (function () {
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
    return UnsupportedBrowserComponent;
}());
export { UnsupportedBrowserComponent };
UnsupportedBrowserComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-errors-unsupported-browser',
                template: "\n      <div class=\"text-center p-t-xl unsupprted-browser-outer\">\n        <h3><b>{{strings.Errors.UnsupportedBrowserCommon.message}}</b></h3>\n        <p>{{bodyMessage}}</p>\n        <p>\n          {{strings.Errors.UnsupportedBrowserFootBegin.message}}\n          <a href=\"{{strings.Overview.feedback.link.href}}\">{{strings.Overview.feedback.link.text}}</a>{{strings.Errors.UnsupportedBrowserFootEnd.message}}\n        </p>\n      </div>\n    ",
                styles: ["\n      .unsupprted-browser-outer {\n          width: 60%;\n          margin: auto;\n      }\n    "]
            },] },
];
/** @nocollapse */
UnsupportedBrowserComponent.ctorParameters = function () { return [
    null,
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Vycm9ycy91bnN1cHBvcnRlZC1icm93c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQU8xQztJQWFJLHFDQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQVpqRCxZQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztJQVlYLENBQUM7SUFWNUQ7Ozs7O09BS0c7SUFDVywyQ0FBZSxHQUE3QixVQUE4QixpQkFBb0MsRUFBRSxRQUFnQztRQUNoRyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDO0lBQ2hHLENBQUM7SUFJRCxzQkFBVyxvREFBVzthQUF0QjtZQUNJLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hGLENBQUM7OztPQUFBO0lBMEJMLGtDQUFDO0FBQUQsQ0E1Q0EsQUE0Q0M7O0FBekJNLHNDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLGdDQUFnQztnQkFDMUMsUUFBUSxFQUFFLGtjQVNUO2dCQUNELE1BQU0sRUFBRSxDQUFDLG9HQUtSLENBQUM7YUFDTCxFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsMENBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLElBQUk7Q0FDSCxFQUY2RixDQUU3RixDQUFDIiwiZmlsZSI6InVuc3VwcG9ydGVkLWJyb3dzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==