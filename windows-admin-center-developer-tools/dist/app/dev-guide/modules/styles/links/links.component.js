import { Component } from '@angular/core';
var LinksComponent = /** @class */ (function () {
    function LinksComponent() {
    }
    LinksComponent.navigationTitle = function (appContextService, snapshot) {
        return 'Links';
    };
    LinksComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-links',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-documentation\">\n          <h1>Links</h1>\n          <section>\n              <p>Links (anchors) in sme default to an indestinguishable apperance from other text.</p>\n              <p>The reason for this is that anchor tags are primaraly used for internal navigation. .\n              </p>\n\n          </section>\n\n          <h2>Default Behaviour</h2>\n          <section>\n              <p>Links (anchors) in SME default to an indestinguishable apperance from other text. They should retain this apperance when used for internal navigation or 'button' like behavior</p>\n\n              <p>\n                  Note that links are not normally used as plane text, but have some other styling applied to them, such as\n                  <a class=\"sme-link\" routerLink=\"/dev/styles/buttons\">Buttons</a>\n              </p>\n\n              <h3>Example</h3>\n\n              <div class=\"sme-documentation-example\">\n                  <a routerLink=\"/dev\">Go Back to 'Landing'</a>\n              </div>\n\n              <code>&lt;a routerLink=\"/dev\"&gt;Go Back to 'Landing'&lt;/a&gt;</code>\n\n          </section>\n\n          <h2>Traditional Behaviour</h2>\n          <section>\n              <p>The traditional link style can be restored using the 'sme-link' class. It should only be applied when the link will navigate away from the product. </p>\n              <p>Traditional link styleing may also be applied when the major focus of the page will be changing or if it needs to be distinguishable (such as in a paragraph), suchs as when navigating from managing a cluster to managing a server</p>\n\n              <h3>Example</h3>\n              <div class=\"sme-documentation-example\">\n                  <a class=\"sme-link\" href=\"http://www.bing.com\">Go to 'Bing'</a>\n              </div>\n              <code>&lt;a class=\"sme-link\" href=\"http://www.bing.com\"&gt;Go to 'Bing'&lt;/a&gt;</code>\n\n          </section>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    LinksComponent.ctorParameters = function () { return []; };
    return LinksComponent;
}());
export { LinksComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9zdHlsZXMvbGlua3MvbGlua3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBSzFDO0lBQUE7SUF3REEsQ0FBQztJQXREaUIsOEJBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBQ0UseUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLGsvREEwQ1Q7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDZCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YscUJBQUM7Q0F4REQsQUF3REMsSUFBQTtTQXhEWSxjQUFjIiwiZmlsZSI6ImxpbmtzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL1NvdXJjZS9iYXNlL21zZnQtc21lLWRldmVsb3Blci10b29scy9pbmxpbmVTcmMvIn0=