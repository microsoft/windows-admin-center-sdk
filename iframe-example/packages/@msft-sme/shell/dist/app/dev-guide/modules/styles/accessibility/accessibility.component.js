import { Component } from '@angular/core';
var AccessibilityComponent = /** @class */ (function () {
    function AccessibilityComponent() {
    }
    AccessibilityComponent.navigationTitle = function (appContextService, snapshot) {
        return 'Accessibility';
    };
    AccessibilityComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-accessibility',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-documentation\">\n          <h1>Accessibility</h1>\n          <section>\n              <p>Accessible design starts with these fundamental rules that our styles try to follow and encourage.</p>\n\n              <ol>\n                  <li><b>Keep html simple.</b> There is rarly a need to create complex div structures if the proper built in classes and controls are used.</li>\n                  <li><b>Let the html speak for itself.</b> Use the proper elements for your intent. For example, an anchor tag that doesnt navigate the user should be a button. Likewise a div with only text should probably be a heading or paragraph tag.</li>\n                  <li><b>Use ARIA properly</b> This is hard but worth it. <a href=\"https://msdn.microsoft.com/en-us/library/gg701982(v=vs.85).aspx\">Learn how ARIA works on MSDN.</a> and use it consistently. SME controls will use and encourage the use of these attributes\n                      as much as possible. </li>\n              </ol>\n          </section>\n\n\n          <h2>Keyboard Navigation</h2>\n          <section>\n              <p>Keyboard navigation is easy to overlook but a few simple principals will help make it simple.</p>\n\n              <ol>\n                  <li>Anchors without hrefs should always hav a tab index</li>\n                  <li>If elements appear in a different order than declared in html, use tabIndex to correct the focus order</li>\n              </ol>\n\n              <h3>Keyboard vs Mouse Focus</h3>\n              <p>SME Core includes some default functionality that will add/remove the sme-focus-hidden class when an element is focused with a mouse as opposed to a keyboard.</p>\n              <p>By default any focusable element, when it recieves focus, will show a dashed outline to indicate that it has focus. However when the sme-focus-hidden class is applied this outline does not show up.</p>\n          </section>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    AccessibilityComponent.ctorParameters = function () { return []; };
    return AccessibilityComponent;
}());
export { AccessibilityComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9zdHlsZXMvYWNjZXNzaWJpbGl0eS9hY2Nlc3NpYmlsaXR5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUsxQztJQUFBO0lBMkNBLENBQUM7SUF6Q2lCLHNDQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDM0IsQ0FBQztJQUNFLGlDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLG05REE2QlQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHFDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsNkJBQUM7Q0EzQ0QsQUEyQ0MsSUFBQTtTQTNDWSxzQkFBc0IiLCJmaWxlIjoiYWNjZXNzaWJpbGl0eS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9