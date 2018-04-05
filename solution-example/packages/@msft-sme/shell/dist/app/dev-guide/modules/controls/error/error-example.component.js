import { Component } from '@angular/core';
var ErrorExampleComponent = (function () {
    function ErrorExampleComponent() {
    }
    ErrorExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'sme-error';
    };
    return ErrorExampleComponent;
}());
export { ErrorExampleComponent };
ErrorExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-error-example',
                template: "\n      <div class=\"tool-container flex-layout vertical\">\n          <h1>Obsolete.</h1>\n          <h4>Use sme-alert-bar instead</h4>\n          <p>Previously this control was used to block the UX on errors. This has been changed to generate an alert instead. However\n              if you have not implemented an sme-alert-bar this will throw an error.</p>\n          <sme-error message=\"This is an error messsage that now shows as an alert\"></sme-error>\n          <!--<div class=\"fixed-flex-size\">\n              <h2>Content NOT blocked by error message</h2>\n              <button>I am always clickable</button>\n          </div>\n          <div class=\"auto-flex-size relative\">\n              <sme-error message=\"This is an error messsage\"></sme-error>\n              <h2>Content blocked by error message</h2>\n              <button>I am not clickable when because there is an error</button>\n          </div>-->\n      </div>\n    "
            },] },
];
/** @nocollapse */
ErrorExampleComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9lcnJvci9lcnJvci1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUsxQztJQUFBO0lBK0JBLENBQUM7SUE3QmlCLHFDQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQTJCTCw0QkFBQztBQUFELENBL0JBLEFBK0JDOztBQTFCTSxnQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxnQ0FBZ0M7Z0JBQzFDLFFBQVEsRUFBRSxxN0JBaUJUO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLG9DQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDIiwiZmlsZSI6ImVycm9yLWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==