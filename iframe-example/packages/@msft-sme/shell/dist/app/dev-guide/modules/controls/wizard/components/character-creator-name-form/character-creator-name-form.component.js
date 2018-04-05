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
import { Subject } from 'rxjs/Subject';
import { WizardStepComponent } from '../../../../../../../angular';
var CharacterCreatorNameFormComponent = /** @class */ (function (_super) {
    __extends(CharacterCreatorNameFormComponent, _super);
    function CharacterCreatorNameFormComponent(formBuilder) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        return _this;
    }
    CharacterCreatorNameFormComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.forEach(function (subscription) {
                if (subscription) {
                    subscription.unsubscribe();
                }
            });
        }
    };
    CharacterCreatorNameFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nameLabel = 'Name';
        this.subscriptions = [];
        this.runValidation = function () {
            return _this.validate();
        };
        this.form = this.formBuilder.group({
            name: [
                this.model.name,
                [
                    Validators.required
                ]
            ]
        });
        this.subscriptions.push(this.form.valueChanges.subscribe(function () {
            _this.valid = _this.form.valid;
        }));
    };
    CharacterCreatorNameFormComponent.prototype.validate = function () {
        var _this = this;
        var subject = new Subject();
        setTimeout(function () {
            if (_this.model.name === 'Jeff') {
                subject.next({
                    errorMessage: 'Jeff is not a good name',
                    isValid: false
                });
            }
            else {
                subject.next({
                    isValid: true
                });
            }
        }, 4000);
        return subject;
    };
    CharacterCreatorNameFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-character-creator-name-form',
                    styles: ["\n      h1, h2, h3, h4, h5, h6 {\n          margin: 0;\n          padding: 0;\n      }\n    "],
                    template: "\n      <h4>Character Name</h4>\n      <form [formGroup]=\"form\">\n        <div class=\"form-controls\">\n          <div class=\"form-group\">\n            <div class=\"form-input\">\n              <label for=\"name\">{{ nameLabel }}</label>\n              <div class=\"required-clue\">* Required</div>\n              <input type=\"text\" class=\"form-control\" id=\"name\" formControlName=\"name\" [(ngModel)]=\"model.name\">\n            </div>\n          </div>\n        </div>\n      </form>\n    "
                },] },
    ];
    /** @nocollapse */
    CharacterCreatorNameFormComponent.ctorParameters = function () { return [
        { type: FormBuilder, },
    ]; };
    return CharacterCreatorNameFormComponent;
}(WizardStepComponent));
export { CharacterCreatorNameFormComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy93aXphcmQvY29tcG9uZW50cy9jaGFyYWN0ZXItY3JlYXRvci1uYW1lLWZvcm0vY2hhcmFjdGVyLWNyZWF0b3ItbmFtZS1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxXQUFBLEVBQXdCLFVBQUEsRUFBVyxNQUFPLGdCQUFBLENBQWlCO0FBRXBFLE9BQU8sRUFBRSxPQUFBLEVBQVEsTUFBTyxjQUFBLENBQWU7QUFHdkMsT0FBTyxFQUNILG1CQUFtQixFQUV0QixNQUFNLDhCQUFBLENBQStCO0FBSXRDO0lBQXVELHFEQUEyQztJQU85RiwyQ0FBb0IsV0FBd0I7UUFBNUMsWUFDSSxpQkFBTyxTQUNWO1FBRm1CLGlCQUFXLEdBQVgsV0FBVyxDQUFhOztJQUU1QyxDQUFDO0lBRU0sdURBQVcsR0FBbEI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFlBQVk7Z0JBQ3BDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ2YsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMvQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVNLG9EQUFRLEdBQWY7UUFBQSxpQkFxQkM7UUFwQkcsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFFeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRztZQUNqQixNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDL0IsSUFBSSxFQUFFO2dCQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtnQkFDZjtvQkFDSSxVQUFVLENBQUMsUUFBUTtpQkFDdEI7YUFDSjtTQUNKLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7WUFDN0IsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVPLG9EQUFRLEdBQWhCO1FBQUEsaUJBbUJDO1FBbEJHLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxFQUF3QixDQUFDO1FBQ2xELFVBQVUsQ0FDTjtZQUNJLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ1QsWUFBWSxFQUFFLHlCQUF5QjtvQkFDdkMsT0FBTyxFQUFFLEtBQUs7aUJBQ2pCLENBQUMsQ0FBQztZQUNQLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNULE9BQU8sRUFBRSxJQUFJO2lCQUNoQixDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQyxFQUNELElBQUksQ0FDUCxDQUFDO1FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBQ0UsNENBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUscUNBQXFDO29CQUMvQyxNQUFNLEVBQUUsQ0FBQyw4RkFLUixDQUFDO29CQUNGLFFBQVEsRUFBRSx3ZkFhVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsZ0RBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztLQUNwQixFQUY2RixDQUU3RixDQUFDO0lBQ0Ysd0NBQUM7Q0E3RkQsQUE2RkMsQ0E3RnNELG1CQUFtQixHQTZGekU7U0E3RlksaUNBQWlDIiwiZmlsZSI6ImNoYXJhY3Rlci1jcmVhdG9yLW5hbWUtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9