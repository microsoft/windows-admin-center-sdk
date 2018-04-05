import { Component } from '@angular/core';
var ErrorExampleComponent = /** @class */ (function () {
    function ErrorExampleComponent() {
    }
    ErrorExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'sme-error';
    };
    ErrorExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-error-example',
                    template: "\n      <div class=\"tool-container sme-arrange-stack-v\">\n          <h1>Obsolete.</h1>\n          <h4>Use sme-alert-bar instead</h4>\n          <p>Previously this control was used to block the UX on errors. This has been changed to generate an alert instead. However if you have not implemented an sme-alert-bar this will throw an error.</p>\n          <sme-error message=\"This is an error messsage that now shows as an alert\"></sme-error>\n          <!--<div class=\"sme-position-flex-none\">\n              <h2>Content NOT blocked by error message</h2>\n              <button>I am always clickable</button>\n          </div>\n          <div class=\"sme-layout-relative sme-position-flex-auto\">\n              <sme-error message=\"This is an error messsage\"></sme-error>\n              <h2>Content blocked by error message</h2>\n              <button>I am not clickable when because there is an error</button>\n          </div>-->\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ErrorExampleComponent.ctorParameters = function () { return []; };
    return ErrorExampleComponent;
}());
export { ErrorExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9lcnJvci9lcnJvci1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUsxQztJQUFBO0lBOEJBLENBQUM7SUE1QmlCLHFDQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUNFLGdDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGdDQUFnQztvQkFDMUMsUUFBUSxFQUFFLCs3QkFnQlQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLG9DQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsNEJBQUM7Q0E5QkQsQUE4QkMsSUFBQTtTQTlCWSxxQkFBcUIiLCJmaWxlIjoiZXJyb3ItZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbWF0d2lscy9Tb3VyY2UvYmFzZS9tc2Z0LXNtZS1kZXZlbG9wZXItdG9vbHMvaW5saW5lU3JjLyJ9