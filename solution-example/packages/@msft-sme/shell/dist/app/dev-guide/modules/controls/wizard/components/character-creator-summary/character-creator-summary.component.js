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
import { WizardStepComponent } from '../../../../../../../angular';
import { Job } from '../../models/job';
import { Spell } from '../../models/spell';
var CharacterCreatorSummaryComponent = (function (_super) {
    __extends(CharacterCreatorSummaryComponent, _super);
    function CharacterCreatorSummaryComponent() {
        return _super.call(this) || this;
    }
    CharacterCreatorSummaryComponent.prototype.ngOnInit = function () {
        this.jobMap = {};
        this.spellMap = {};
        this.jobMap[Job.Paladin] = 'Paladin';
        this.jobMap[Job.Ranger] = 'Ranger';
        this.jobMap[Job.Rogue] = 'Rogue';
        this.jobMap[Job.Warrior] = 'Warrior';
        this.jobMap[Job.Wizard] = 'Wizard';
        this.spellMap[Spell.Aero] = 'Aero';
        this.spellMap[Spell.Fire] = 'Fire';
        this.spellMap[Spell.Stone] = 'Stone';
        this.spellMap[Spell.Thunder] = 'Thunder';
        this.spellMap[Spell.Water] = 'Water';
    };
    return CharacterCreatorSummaryComponent;
}(WizardStepComponent));
export { CharacterCreatorSummaryComponent };
CharacterCreatorSummaryComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-character-creator-summary',
                styles: ["\n      h1, h2, h3, h4, h5, h6 {\n          margin: 0;\n          padding: 0;\n      }\n    "],
                template: "\n      <h4>Summary</h4>\n      <ul>\n        <li>\n          <b>Character Name:</b> {{ model.name }}\n        </li>\n        <li>\n          <b>Job:</b> {{ jobMap[model.job.getValue()] }}\n        </li>\n        <li *ngIf=\"model.job.getValue() === 3\">\n          <b>Spell:</b> {{ spellMap[model.spell] }}\n        </li>\n      </ul>\n    "
            },] },
];
/** @nocollapse */
CharacterCreatorSummaryComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy93aXphcmQvY29tcG9uZW50cy9jaGFyYWN0ZXItY3JlYXRvci1zdW1tYXJ5L2NoYXJhY3Rlci1jcmVhdG9yLXN1bW1hcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFrQixNQUFPLGVBQUEsQ0FBZ0I7QUFFbEQsT0FBTyxFQUFFLG1CQUFBLEVBQW9CLE1BQU8sOEJBQUEsQ0FBK0I7QUFFbkUsT0FBTyxFQUFFLEdBQUEsRUFBSSxNQUFPLGtCQUFBLENBQW1CO0FBQ3ZDLE9BQU8sRUFBRSxLQUFBLEVBQU0sTUFBTyxvQkFBQSxDQUFxQjtBQUczQztJQUFzRCxvREFBMkM7SUFLN0Y7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUFFTSxtREFBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUVuQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQ3pDLENBQUM7SUE2QkwsdUNBQUM7QUFBRCxDQXJEQSxBQXFEQyxDQXJEcUQsbUJBQW1COztBQXlCbEUsMkNBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsbUNBQW1DO2dCQUM3QyxNQUFNLEVBQUUsQ0FBQyw4RkFLUixDQUFDO2dCQUNGLFFBQVEsRUFBRSx1VkFhVDthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCwrQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJjaGFyYWN0ZXItY3JlYXRvci1zdW1tYXJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=