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
import { Spell } from '../../models/spell';
var CharacterCreatorSpellFormComponent = (function (_super) {
    __extends(CharacterCreatorSpellFormComponent, _super);
    function CharacterCreatorSpellFormComponent(formBuilder) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        return _this;
    }
    CharacterCreatorSpellFormComponent.prototype.ngOnInit = function () {
        this.spellLabel = 'Magical Spells';
        this.spells = [
            Spell.Aero,
            Spell.Fire,
            Spell.Stone,
            Spell.Thunder,
            Spell.Water
        ];
        this.spellMap = {};
        this.spellMap[Spell.Aero] = 'Aero';
        this.spellMap[Spell.Fire] = 'Fire';
        this.spellMap[Spell.Water] = 'Water';
        this.spellMap[Spell.Stone] = 'Stone';
        this.spellMap[Spell.Thunder] = 'Thunder';
        this.form = this.formBuilder.group({
            spell: this.model.spell
        });
    };
    return CharacterCreatorSpellFormComponent;
}(WizardStepComponent));
export { CharacterCreatorSpellFormComponent };
CharacterCreatorSpellFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-character-creator-name-form',
                styles: ["\n      h1, h2, h3, h4, h5, h6 {\n          margin: 0;\n          padding: 0;\n      }\n    "],
                template: "\n      <h4>Choose a Spell</h4>\n      <form [formGroup]=\"form\">\n        <div class=\"form-controls\">\n          <div class=\"form-group\">\n            <div class=\"form-input\">\n              <label for=\"spell\">{{ spellLabel }}</label>\n              <div class=\"combobox\">\n                <select class=\"form-control\" id=\"spell\" formControlName=\"spell\" [(ngModel)]=\"model.spell\">\n                  <option *ngFor=\"let spell of spells\" [ngValue]=\"spell\">{{ spellMap[spell] }}</option>\n                </select>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    "
            },] },
];
/** @nocollapse */
CharacterCreatorSpellFormComponent.ctorParameters = function () { return [
    { type: FormBuilder, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy93aXphcmQvY29tcG9uZW50cy9jaGFyYWN0ZXItY3JlYXRvci1zcGVsbC1mb3JtL2NoYXJhY3Rlci1jcmVhdG9yLXNwZWxsLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFrQixNQUFPLGVBQUEsQ0FBZ0I7QUFDbEQsT0FBTyxFQUFFLFdBQUEsRUFBbUMsTUFBTyxnQkFBQSxDQUFpQjtBQUVwRSxPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTyw4QkFBQSxDQUErQjtBQUVuRSxPQUFPLEVBQUUsS0FBQSxFQUFNLE1BQU8sb0JBQUEsQ0FBcUI7QUFHM0M7SUFBd0Qsc0RBQTJDO0lBUy9GLDRDQUFvQixXQUF3QjtRQUE1QyxZQUNJLGlCQUFPLFNBQ1Y7UUFGbUIsaUJBQVcsR0FBWCxXQUFXLENBQWE7O0lBRTVDLENBQUM7SUFFTSxxREFBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQztRQUVuQyxJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsS0FBSyxDQUFDLElBQUk7WUFDVixLQUFLLENBQUMsSUFBSTtZQUNWLEtBQUssQ0FBQyxLQUFLO1lBQ1gsS0FBSyxDQUFDLE9BQU87WUFDYixLQUFLLENBQUMsS0FBSztTQUNkLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBRXpDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDL0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztTQUMxQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBaUNMLHlDQUFDO0FBQUQsQ0FuRUEsQUFtRUMsQ0FuRXVELG1CQUFtQjs7QUFtQ3BFLDZDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLHFDQUFxQztnQkFDL0MsTUFBTSxFQUFFLENBQUMsOEZBS1IsQ0FBQztnQkFDRixRQUFRLEVBQUUsMm5CQWdCVDthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxpREFBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsV0FBVyxHQUFHO0NBQ3BCLEVBRjZGLENBRTdGLENBQUMiLCJmaWxlIjoiY2hhcmFjdGVyLWNyZWF0b3Itc3BlbGwtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9