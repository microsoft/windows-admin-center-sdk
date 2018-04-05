import { Component } from '@angular/core';
var PipesComponent = (function () {
    function PipesComponent() {
    }
    PipesComponent.navigationTitle = function (appContextService, snapshot) {
        return 'Pipes';
    };
    return PipesComponent;
}());
export { PipesComponent };
PipesComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-pipes',
                template: "\n      <div class=\"m-l-xxs tool-container flex-layout\">\n          <nav role=\"navigation\" class=\"nav side-navigation side-navigation-large theme-default fixed-flex-size p-r-xs\">\n              <ul>\n                  <li><a routerLink=\"boolean-converter\" routerLinkActive=\"active\">boolean-converter</a></li>\n                  <li><a routerLink=\"byte-unit-converter\" routerLinkActive=\"active\">byte-unit-converter</a></li>\n                  <li><a routerLink=\"enum-converter\" routerLinkActive=\"active\">enum-converter</a></li>\n                  <li><a routerLink=\"format\" routerLinkActive=\"active\">format</a></li>\n                  <li><a routerLink=\"highlight\" routerLinkActive=\"active\">highlight</a></li>\n                  <li><a routerLink=\"yesno-converter\" routerLinkActive=\"active\">yesno-converter</a></li>\n              </ul>\n          </nav>\n          <div class=\"auto-flex-size relative\">\n              <router-outlet></router-outlet>\n          </div>\n      </div>\n    "
            },] },
];
/** @nocollapse */
PipesComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9waXBlcy9waXBlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFLMUM7SUFBQTtJQTZCQSxDQUFDO0lBNUJpQiw4QkFBZSxHQUE3QixVQUE4QixpQkFBb0MsRUFBRSxRQUFnQztRQUNoRyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUEwQkwscUJBQUM7QUFBRCxDQTdCQSxBQTZCQzs7QUF6Qk0seUJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLDYvQkFnQlQ7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsNkJBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoicGlwZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==