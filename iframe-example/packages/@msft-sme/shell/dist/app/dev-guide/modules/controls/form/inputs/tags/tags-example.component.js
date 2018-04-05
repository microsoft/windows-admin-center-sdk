import { Component } from '@angular/core';
import { FormControlsService } from '../../form-controls.service';
var TagsExampleComponent = /** @class */ (function () {
    function TagsExampleComponent(formControlsService) {
        this.formControlsService = formControlsService;
        this.model = formControlsService.createModel();
    }
    TagsExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-control-input-tags-example',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-documentation\">\n          <p>Use the sme-input[type=\"tags\"] component when you want to allow the user to edit a list of strings accoiated with an object.</p>\n          <h2>Examples</h2>\n          <section>\n              <h3>Model Values</h3>\n              <p><b>model.tags:</b> {{model.tags | json}}</p>\n              <h3>Template Driven</h3>\n              <section>\n                  <div class=\"sme-documentation-example\">\n                      <form>\n                          <div role=\"group\" [attr.aria-label]=\"'Tags Control'\" class=\"form-group\">\n                              <label>Tags Control</label>\n                              <sme-input name=\"tags\" type=\"tags\" [(ngModel)]=\"model.tags\" [suggestions]=\"model.tagSuggestions\"></sme-input>\n                          </div>\n                      </form>\n                  </div>\n                  <p><b>Code:</b></p>\n                  <code>&lt;form&gt;\n          &lt;sme-input type=\"tags\" [(ngModel)]=\"model.tags\" [suggestions]=\"model.tagSuggestions\"&gt;&lt;/sme-input&gt;\n      &lt;/form&gt;</code>\n              </section>\n\n              <h3>Reactive</h3>\n              <p>Coming Soon...</p>\n\n              <h3>Disabled</h3>\n              <section>\n                  <div class=\"sme-documentation-example\">\n                      <form>\n                          <sme-input name=\"disabledTags\" type=\"tags\" [(ngModel)]=\"model.tags\" [disabled]=\"true\"></sme-input>\n                      </form>\n                  </div>\n                  <p><b>Code:</b></p>\n                  <code>&lt;form&gt;\n          &lt;sme-input type=\"tags\" [(ngModel)]=\"model.tags\" [disabled]=\"true\"&gt;&lt;/sme-input&gt;\n      &lt;/form&gt;</code>\n              </section>\n          </section>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    TagsExampleComponent.ctorParameters = function () { return [
        { type: FormControlsService, },
    ]; };
    return TagsExampleComponent;
}());
export { TagsExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9mb3JtL2lucHV0cy90YWdzL3RhZ3MtZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFFMUMsT0FBTyxFQUFvQixtQkFBQSxFQUFvQixNQUFPLDZCQUFBLENBQThCO0FBRXBGO0lBR0ksOEJBQW9CLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hELElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUNFLCtCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLG9DQUFvQztvQkFDOUMsUUFBUSxFQUFFLHcyREF3Q1Q7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLG1DQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxtQkFBbUIsR0FBRztLQUM1QixFQUY2RixDQUU3RixDQUFDO0lBQ0YsMkJBQUM7Q0F4REQsQUF3REMsSUFBQTtTQXhEWSxvQkFBb0IiLCJmaWxlIjoidGFncy1leGFtcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=