import { Component } from '@angular/core';
var StylesComponent = /** @class */ (function () {
    function StylesComponent() {
        this.links = [
            { href: 'accessibility', text: 'Accessibility' },
            { href: 'behaviors', text: 'Behaviors' },
            { href: 'colors', text: 'Colors' },
            { href: 'forms', text: 'Forms' },
            { href: 'icons', text: 'Icons' },
            { href: 'layers', text: 'Layers' },
            { href: 'layout', text: 'Layout' },
            { href: 'pivot', text: 'Pivots' },
            { href: 'progress', text: 'Progress' },
            { href: 'schemes', text: 'Schemes' },
            { href: 'shadows', text: 'Shadows' },
            { href: 'spacing', text: 'Spacing' },
            { href: 'themes', text: 'Themes' },
            { href: 'typography', text: 'Typography' }
        ];
    }
    StylesComponent.navigationTitle = function (appContextService, snapshot) {
        return 'Styles';
    };
    StylesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-styles',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-arrange-stack-h\">\n          <nav role=\"navigation\" class=\"sme-position-flex-none sme-padding-right-sm\">\n              <a *ngFor=\"let link of links\" routerLinkActive=\"sme-active\" [routerLink]=\"link.href\" class=\"sme-scheme-nav-item sme-padding-squish-v-sm sme-arrange-stack-h sme-arrange-ws-nowrap\">\n                  {{link.text}}\n              </a>\n          </nav>\n          <div class=\"sme-layout-relative sme-position-flex-auto sme-arrange-overflow-auto-y sme-focus-zone\">\n              <router-outlet></router-outlet>\n          </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    StylesComponent.ctorParameters = function () { return []; };
    return StylesComponent;
}());
export { StylesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9zdHlsZXMvc3R5bGVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUsxQztJQUFBO1FBQ1csVUFBSyxHQUFHO1lBQ1gsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDaEQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDeEMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDbEMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDaEMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDaEMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDbEMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDbEMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDakMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDdEMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDcEMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDcEMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDcEMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDbEMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUU7U0FDN0MsQ0FBQztJQTBCTixDQUFDO0lBeEJpQiwrQkFBZSxHQUE3QixVQUE4QixpQkFBb0MsRUFBRSxRQUFnQztRQUNoRyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRSwwQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSw0b0JBV1Q7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDhCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0Ysc0JBQUM7Q0ExQ0QsQUEwQ0MsSUFBQTtTQTFDWSxlQUFlIiwiZmlsZSI6InN0eWxlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9