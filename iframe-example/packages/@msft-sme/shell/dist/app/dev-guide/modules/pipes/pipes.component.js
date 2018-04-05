import { Component } from '@angular/core';
var PipesComponent = /** @class */ (function () {
    function PipesComponent() {
        this.links = [
            { href: 'boolean-converter', text: 'boolean-converter' },
            { href: 'byte-unit-converter', text: 'byte-unit-converter' },
            { href: 'enum-converter', text: 'enum-converter' },
            { href: 'format', text: 'format' },
            { href: 'highlight', text: 'highlight' },
            { href: 'yesno-converter', text: 'yesno-converter' }
        ];
    }
    PipesComponent.navigationTitle = function (appContextService, snapshot) {
        return 'Pipes';
    };
    PipesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-pipes',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-arrange-stack-h\">\n          <nav role=\"navigation\" class=\"sme-position-flex-none sme-padding-right-sm\">\n              <a *ngFor=\"let link of links\" routerLinkActive=\"sme-active\" [routerLink]=\"link.href\" class=\"sme-scheme-nav-item sme-padding-squish-v-sm sme-arrange-stack-h sme-arrange-ws-nowrap\">\n                      {{link.text}}\n                  </a>\n          </nav>\n          <div class=\"sme-layout-relative sme-position-flex-auto sme-arrange-overflow-auto-y sme-focus-zone\">\n              <router-outlet></router-outlet>\n          </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    PipesComponent.ctorParameters = function () { return []; };
    return PipesComponent;
}());
export { PipesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9waXBlcy9waXBlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFLMUM7SUFBQTtRQUVXLFVBQUssR0FBRztZQUNYLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUN4RCxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUU7WUFDNUQsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ2xELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ2xDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ3hDLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRTtTQUN2RCxDQUFDO0lBeUJOLENBQUM7SUF2QmlCLDhCQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUNFLHlCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxvcEJBV1Q7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDZCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YscUJBQUM7Q0FsQ0QsQUFrQ0MsSUFBQTtTQWxDWSxjQUFjIiwiZmlsZSI6InBpcGVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=