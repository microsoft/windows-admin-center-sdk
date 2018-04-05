import { Component } from '@angular/core';
var BehaviorsComponent = /** @class */ (function () {
    function BehaviorsComponent() {
    }
    BehaviorsComponent.navigationTitle = function (appContextService, snapshot) {
        return 'Behaviors';
    };
    BehaviorsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-behaviors',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-documentation\">\n          <h1>Behaviors</h1>\n          <section>\n              <p>Behviors are special sets of classes that require more than one element. Each behaviour consists of at least one trigger and at least one target.</p>\n              <p>Behviors enable functionailty that would otherwise require complex css or custom javascript. Behaviors are also contextually aware and may change according to the type of screen being used. For example, a hover trigger will have different effects\n                  on a touchscreen vs a regular monitor.\n              </p>\n\n          </section>\n\n          <h2>Behavior Classes</h2>\n          <section>\n              <p>The trigger class of a behaviour must be appliead to a parent element of a trigger and the target class must be applied to a child element to apply the behaviour</p>\n              <table>\n                  <thead>\n                      <tr>\n                          <th>Trigger Class</th>\n                          <th>Target Class</th>\n                          <th>Effect</th>\n                      </tr>\n                  </thead>\n                  <tbody>\n                      <tr>\n                          <td>.sme-behavior-hover-trigger</td>\n                          <td>\n                              <div>.sme-behavior-hover-target-show</div>\n                              <div>.sme-behavior-hover-target-hide</div>\n                          </td>\n                          <td>\n                              <div>Shows the target only when the trigger element is hovered (or focused)</div>\n                              <div>Hides the target only when the trigger element is hovered (or focused)</div>\n                          </td>\n                      </tr>\n                  </tbody>\n              </table>\n          </section>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    BehaviorsComponent.ctorParameters = function () { return []; };
    return BehaviorsComponent;
}());
export { BehaviorsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9zdHlsZXMvYmVoYXZpb3JzL2JlaGF2aW9ycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFLMUM7SUFBQTtJQW9EQSxDQUFDO0lBbERpQixrQ0FBZSxHQUE3QixVQUE4QixpQkFBb0MsRUFBRSxRQUFnQztRQUNoRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFDRSw2QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxvNURBc0NUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxpQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLHlCQUFDO0NBcERELEFBb0RDLElBQUE7U0FwRFksa0JBQWtCIiwiZmlsZSI6ImJlaGF2aW9ycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbWF0d2lscy9Tb3VyY2UvYmFzZS9tc2Z0LXNtZS1kZXZlbG9wZXItdG9vbHMvaW5saW5lU3JjLyJ9