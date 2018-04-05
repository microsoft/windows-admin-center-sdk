import { Component } from '@angular/core';
var SplitViewExampleComponent = /** @class */ (function () {
    function SplitViewExampleComponent() {
    }
    SplitViewExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-split-view-example',
                    template: "\n      <sme-split-view #sv>\n          <sme-split-view-pane>\n              <button (click)=\"sv.togglePane()\">Click me to toggle the pane</button>\n              <p>I'm the pane. The pane is the area that grows/shrinks.</p>\n              <p>The pane takes as much room as it needs.</p>\n              <p><b>isExpanded</b>: {{sv.isExpanded}}</p>\n              <p *ngIf=\"sv.isExpanded\">You can only see this because the pane is expanded. Because this string is longer, you'll see the pane grow when I appear.\n              </p>\n          </sme-split-view-pane>\n\n          <sme-split-view-content>\n              <div class=\"sme-layout-absolute- sme-position-inset-none\">\n                  <p>I'm the content. I take up whatever room is left over.</p>\n              </div>\n          </sme-split-view-content>\n      </sme-split-view>\n    "
                },] },
    ];
    /** @nocollapse */
    SplitViewExampleComponent.ctorParameters = function () { return []; };
    return SplitViewExampleComponent;
}());
export { SplitViewExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zcGxpdC12aWV3L3NwbGl0LXZpZXctZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFHMUM7SUFBQTtJQTBCQSxDQUFDO0lBMUIrQyxvQ0FBVSxHQUEwQjtRQUNwRixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFFBQVEsRUFBRSxzMUJBaUJUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCx3Q0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLGdDQUFDO0NBMUJELEFBMEJDLElBQUE7U0ExQlkseUJBQXlCIiwiZmlsZSI6InNwbGl0LXZpZXctZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9