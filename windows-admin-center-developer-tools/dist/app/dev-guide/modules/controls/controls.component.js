import { Component } from '@angular/core';
var ControlsComponent = /** @class */ (function () {
    function ControlsComponent() {
        this.links = [
            { href: 'actions', text: 'action-bar' },
            { href: 'alert-bar', text: 'alert-bar' },
            { href: 'breadcrumb-header', text: 'breadcrumb-header' },
            { href: 'data-table', text: 'data-table' },
            { href: 'details', text: 'details' },
            { href: 'dialog', text: 'dialog' },
            { href: 'dropdown', text: 'dropdown' },
            { href: 'forms', text: 'forms' },
            { href: 'doughnut-chart', text: 'doughnut-chart' },
            { href: 'guided-panel', text: 'guided-panel' },
            { href: 'horizontal-bar-chart', text: 'horizontal-bar-chart' },
            { href: 'icons', text: 'layered icons' },
            { href: 'loading-wheel', text: 'loading-wheel' },
            { href: 'line-chart', text: 'line-chart' },
            { href: 'master-view', text: 'master-view' },
            { href: 'ordered-list-picker', text: 'ordered-list-picker' },
            { href: 'page-alert-bar', text: 'page-alert-bar' },
            { href: 'resizer', text: 'resizer' },
            { href: 'settings', text: 'settings' },
            { href: 'split-view', text: 'split view' },
            { href: 'tree-table', text: 'tree-table' },
            { href: 'wizard', text: 'wizard' }
        ];
    }
    ControlsComponent.navigationTitle = function (appContextService, snapshot) {
        return 'controls';
    };
    ControlsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-arrange-stack-h\">\n          <nav role=\"tablist\" class=\"sme-position-flex-none sme-padding-right-sm\">\n              <a *ngFor=\"let link of links\" routerLinkActive=\"sme-active\" [routerLink]=\"link.href\" class=\"sme-scheme-nav-item sme-padding-squish-v-sm sme-arrange-stack-h sme-arrange-ws-nowrap\">\n                  {{link.text}}\n              </a>\n          </nav>\n          <div class=\"sme-layout-relative sme-position-flex-auto sme-arrange-overflow-auto-y sme-focus-zone\">\n              <router-outlet></router-outlet>\n          </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ControlsComponent.ctorParameters = function () { return []; };
    return ControlsComponent;
}());
export { ControlsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9jb250cm9scy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFLMUM7SUFBQTtRQUVXLFVBQUssR0FBRztZQUNYLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3ZDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ3hDLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUN4RCxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUMxQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNwQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUNsQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUN0QyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtZQUNoQyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDbEQsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDOUMsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFO1lBQzlELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ3hDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ2hELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQzFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQzVDLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRTtZQUM1RCxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDbEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDcEMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDdEMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDMUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDMUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7U0FDckMsQ0FBQztJQXlCTixDQUFDO0lBdkJpQixpQ0FBZSxHQUE3QixVQUE4QixpQkFBb0MsRUFBRSxRQUFnQztRQUNoRyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFDRSw0QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSx5b0JBV1Q7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGdDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0Ysd0JBQUM7Q0FsREQsQUFrREMsSUFBQTtTQWxEWSxpQkFBaUIiLCJmaWxlIjoiY29udHJvbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL21hdHdpbHMvU291cmNlL2Jhc2UvbXNmdC1zbWUtZGV2ZWxvcGVyLXRvb2xzL2lubGluZVNyYy8ifQ==