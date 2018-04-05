var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService, SettingsFormService } from '../../../../angular';
import { PanelBaseComponent } from './panel-base.component';
var ConnectionComponent = /** @class */ (function (_super) {
    __extends(ConnectionComponent, _super);
    function ConnectionComponent(appContextService, router, activatedRoute, formbuilder, settingsFormService) {
        return _super.call(this, appContextService, router, activatedRoute, formbuilder, settingsFormService, {
            name: ''
        }, {
            name: {
                required: 'this is a mandatory field'
            }
        }, {
            name: 'setting 3 model value'
        }, 'settings three') || this;
    }
    ConnectionComponent.prototype.ngOnInit = function () {
        this.sampleForm = this.formbuilder.group({
            name3: [this.modelData.name, Validators.required]
        });
        _super.prototype.ngOnInit.call(this);
    };
    ConnectionComponent.decorators = [
        { type: Component, args: [{
                    template: "\n      <form id=\"sme-connectionForm\" [smeSettingsForm]=\"sampleForm\">\n        <sme-settings-content>\n          <fieldset [disabled]=\"saving\" [formGroup]=\"sampleForm\">\n            <div class=\"form-group\">\n              <div class=\"form-input\">\n                <label for=\"name\">\n                  {{nameLabel}}\n                </label>\n                <input id=\"name\" type=\"text\" class=\"form-control\" formControlName=\"name\" required autofocus/>\n                <div *ngIf=\"formErrors.name\" class=\"alert alert-danger\" role=\"alert\">\n                  {{ formErrors.name }}\n                </div>\n              </div>\n            </div>\n          </fieldset>\n        </sme-settings-content>\n        <sme-settings-footer class=\"footer\">\n          <button type=\"submit\" form=\"sme-connectionForm\" class=\"btn btn-primary\" (click)=\"onSaveClick()\" [disabled]=\"!sampleForm.dirty || !sampleForm.valid || saving\">{{ saveButtonLabel }}</button>\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onDiscardClick()\" [disabled]=\"!sampleForm.dirty || saving\">{{ discardButtonLabel }}</button>\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCloseClick()\">{{ closeButtonLabel }}</button>\n        </sme-settings-footer>\n      </form>\n    "
                },] },
    ];
    /** @nocollapse */
    ConnectionComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: Router, },
        { type: ActivatedRoute, },
        { type: FormBuilder, },
        { type: SettingsFormService, },
    ]; };
    return ConnectionComponent;
}(PanelBaseComponent));
export { ConnectionComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vcGFuZWxzL2Nvbm5lY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFDN0QsT0FBTyxFQUFFLFdBQUEsRUFBcUMsVUFBQSxFQUFXLE1BQU8sZ0JBQUEsQ0FBaUI7QUFDakYsT0FBTyxFQUFFLGNBQUEsRUFBZ0IsTUFBQSxFQUFPLE1BQU8saUJBQUEsQ0FBa0I7QUFJekQsT0FBTyxFQUFFLGlCQUFBLEVBQW1CLG1CQUFBLEVBQW9CLE1BQU8scUJBQUEsQ0FBc0I7QUFFN0UsT0FBTyxFQUFFLGtCQUFBLEVBQW1CLE1BQU8sd0JBQUEsQ0FBeUI7QUFLNUQ7SUFDZSx1Q0FBbUM7SUFFOUMsNkJBQVksaUJBQW9DLEVBQUUsTUFBYyxFQUFFLGNBQThCLEVBQzNGLFdBQXdCLEVBQUUsbUJBQXdDO2VBQ25FLGtCQUNJLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sY0FBYyxFQUNkLFdBQVcsRUFDWCxtQkFBbUIsRUFDbkI7WUFDSSxJQUFJLEVBQUUsRUFBRTtTQUNYLEVBQ0Q7WUFDSSxJQUFJLEVBQUU7Z0JBQ0YsUUFBUSxFQUFFLDJCQUEyQjthQUN4QztTQUNKLEVBQ0Q7WUFDSSxJQUFJLEVBQUUsdUJBQXVCO1NBQ2hDLEVBQ0QsZ0JBQWdCLENBQUM7SUFDekIsQ0FBQztJQUVNLHNDQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ3JDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDcEQsQ0FBQyxDQUFDO1FBRUgsaUJBQU0sUUFBUSxXQUFFLENBQUM7SUFDckIsQ0FBQztJQUNFLDhCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLHN6Q0F1QlQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGtDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztRQUMzQixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUsY0FBYyxHQUFHO1FBQ3hCLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztRQUNyQixFQUFDLElBQUksRUFBRSxtQkFBbUIsR0FBRztLQUM1QixFQU42RixDQU03RixDQUFDO0lBQ0YsMEJBQUM7Q0FwRUQsQUFvRUMsQ0FuRWMsa0JBQWtCLEdBbUVoQztTQXBFWSxtQkFBbUIiLCJmaWxlIjoiY29ubmVjdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9