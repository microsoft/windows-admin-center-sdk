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
import { FormBuilder } from '@angular/forms';
import { WizardStepComponent } from '../../../../../../../angular';
import { Job } from '../../models/job';
var CharacterCreatorJobFormComponent = /** @class */ (function (_super) {
    __extends(CharacterCreatorJobFormComponent, _super);
    function CharacterCreatorJobFormComponent(formBuilder) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        return _this;
    }
    Object.defineProperty(CharacterCreatorJobFormComponent.prototype, "selectedJob", {
        get: function () {
            return this.model.job.getValue();
        },
        set: function (value) {
            this.model.job.next(value);
        },
        enumerable: true,
        configurable: true
    });
    CharacterCreatorJobFormComponent.prototype.ngOnInit = function () {
        this.jobLabel = 'Choose a job';
        this.jobs = [
            Job.Paladin,
            Job.Warrior,
            Job.Rogue,
            Job.Ranger,
            Job.Wizard
        ];
        this.jobMap = {};
        this.jobMap[Job.Paladin] = {
            name: 'Paladin',
            description: 'Paladins are noble knights who have sworn to protect all those who ask it.'
        };
        this.jobMap[Job.Warrior] = {
            name: 'Warrior',
            description: 'Warriors are brutish fighters with little regard for their enemy\'s well being, or that of anyone around them.'
        };
        this.jobMap[Job.Rogue] = {
            name: 'Rogue',
            description: 'Rogues are sneaky folk who rely on not being unnoticed and striking when and where it\'s least expected.'
        };
        this.jobMap[Job.Ranger] = {
            name: 'Ranger',
            // tslint:disable-next-line:max-line-length
            description: 'Rangers employ the art of bows and arrows as well as various forms of marksmanship to eliminate enemies from a distance.'
        };
        this.jobMap[Job.Wizard] = {
            name: 'Wizard',
            // tslint:disable-next-line:max-line-length
            description: 'Wizards rely on their spells to swiftly dispatch enemies. Wizards are also very fragile and not fit for close-quarters combat.'
        };
        this.form = this.formBuilder.group({
            job: this.selectedJob
        });
    };
    CharacterCreatorJobFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-character-creator-name-form',
                    styles: ["\n      h1, h2, h3, h4, h5, h6 {\n          margin: 0;\n          padding: 0;\n      }\n    "],
                    template: "\n      <h4>Choose a Job</h4>\n      <form [formGroup]=\"form\">\n        <div class=\"form-controls\">\n          <div class=\"form-group\">\n            <div class=\"form-input\">\n              <label for=\"job\">{{ jobLabel }}</label>\n              <div class=\"combobox\">\n                <select class=\"form-control\" id=\"job\" formControlName=\"job\" [(ngModel)]=\"selectedJob\">\n                  <option *ngFor=\"let job of jobs\" [ngValue]=\"job\">{{ jobMap[job].name }}</option>\n                </select>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n\n      <div *ngIf=\"jobMap[selectedJob].description\">\n        <h6>Job Description</h6>\n        <p>{{ jobMap[selectedJob].description }}</p>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    CharacterCreatorJobFormComponent.ctorParameters = function () { return [
        { type: FormBuilder, },
    ]; };
    return CharacterCreatorJobFormComponent;
}(WizardStepComponent));
export { CharacterCreatorJobFormComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy93aXphcmQvY29tcG9uZW50cy9jaGFyYWN0ZXItY3JlYXRvci1qb2ItZm9ybS9jaGFyYWN0ZXItY3JlYXRvci1qb2ItZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQWtCLE1BQU8sZUFBQSxDQUFnQjtBQUNsRCxPQUFPLEVBQUUsV0FBQSxFQUFtQyxNQUFPLGdCQUFBLENBQWlCO0FBRXBFLE9BQU8sRUFBRSxtQkFBQSxFQUFvQixNQUFPLDhCQUFBLENBQStCO0FBRW5FLE9BQU8sRUFBRSxHQUFBLEVBQUksTUFBTyxrQkFBQSxDQUFtQjtBQVF2QztJQUFzRCxvREFBMkM7SUFpQjdGLDBDQUFvQixXQUF3QjtRQUE1QyxZQUNJLGlCQUFPLFNBQ1Y7UUFGbUIsaUJBQVcsR0FBWCxXQUFXLENBQWE7O0lBRTVDLENBQUM7SUFsQkQsc0JBQVcseURBQVc7YUFBdEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckMsQ0FBQzthQUVELFVBQXVCLEtBQVU7WUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUM7OztPQUpBO0lBa0JNLG1EQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1IsR0FBRyxDQUFDLE9BQU87WUFDWCxHQUFHLENBQUMsT0FBTztZQUNYLEdBQUcsQ0FBQyxLQUFLO1lBQ1QsR0FBRyxDQUFDLE1BQU07WUFDVixHQUFHLENBQUMsTUFBTTtTQUNiLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRztZQUN2QixJQUFJLEVBQUUsU0FBUztZQUNmLFdBQVcsRUFBRSw0RUFBNEU7U0FDNUYsQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHO1lBQ3ZCLElBQUksRUFBRSxTQUFTO1lBQ2YsV0FBVyxFQUFFLGdIQUFnSDtTQUNoSSxDQUFDO1FBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUc7WUFDckIsSUFBSSxFQUFFLE9BQU87WUFDYixXQUFXLEVBQUUsMEdBQTBHO1NBQzFILENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRztZQUN0QixJQUFJLEVBQUUsUUFBUTtZQUNkLDJDQUEyQztZQUMzQyxXQUFXLEVBQUUsMEhBQTBIO1NBQzFJLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRztZQUN0QixJQUFJLEVBQUUsUUFBUTtZQUNkLDJDQUEyQztZQUMzQyxXQUFXLEVBQUUsZ0lBQWdJO1NBQ2hKLENBQUM7UUFFRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQy9CLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUN4QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0UsMkNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUscUNBQXFDO29CQUMvQyxNQUFNLEVBQUUsQ0FBQyw4RkFLUixDQUFDO29CQUNGLFFBQVEsRUFBRSwyd0JBcUJUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwrQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsV0FBVyxHQUFHO0tBQ3BCLEVBRjZGLENBRTdGLENBQUM7SUFDRix1Q0FBQztDQXBHRCxBQW9HQyxDQXBHcUQsbUJBQW1CLEdBb0d4RTtTQXBHWSxnQ0FBZ0MiLCJmaWxlIjoiY2hhcmFjdGVyLWNyZWF0b3Itam9iLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==