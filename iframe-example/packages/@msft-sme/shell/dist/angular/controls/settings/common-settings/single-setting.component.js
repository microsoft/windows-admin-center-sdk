import { Component, Input, ViewChild } from '@angular/core';
import { SettingsComponent } from '../settings.component';
var SingleSettingComponent = /** @class */ (function () {
    function SingleSettingComponent() {
        // do nothing?
    }
    SingleSettingComponent.prototype.ngOnInit = function () {
        // do nothing?
    };
    SingleSettingComponent.prototype.ngOnChanges = function (changes) {
        // do nothing?
    };
    SingleSettingComponent.prototype.ngOnDestroy = function () {
        // do nothing?
    };
    SingleSettingComponent.prototype.canDeactivate = function (component, route, state) {
        var continueNavigation = true;
        if (this.settingsComponent) {
            return this.settingsComponent.canDeactivate(component, route, state);
        }
        return true;
    };
    SingleSettingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-single-setting',
                    template: "\n      <sme-settings [backRoute]=\"backRoute\">\n        <sme-settings-header>\n          <h4>{{settingsTitle}}</h4>\n        </sme-settings-header>\n        <sme-settings-content>\n          <ng-content select=\"sme-settings-content\"></ng-content>\n          <ng-content select=\"sme-settings-footer\"></ng-content>\n        </sme-settings-content>\n      </sme-settings>\n    ",
                    styles: ["\n      :host >>> sme-settings-header h4 {\n        padding-top: 0px;\n      }\n\n      :host {\n        height: 100%\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    SingleSettingComponent.ctorParameters = function () { return []; };
    SingleSettingComponent.propDecorators = {
        'settingsTitle': [{ type: Input },],
        'backRoute': [{ type: Input },],
        'settingsComponent': [{ type: ViewChild, args: [SettingsComponent,] },],
    };
    return SingleSettingComponent;
}());
export { SingleSettingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3MvY29tbW9uLXNldHRpbmdzL3NpbmdsZS1zZXR0aW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUF3QyxLQUFBLEVBQTRDLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFzQjlILE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLHVCQUFBLENBQXdCO0FBRzFEO0lBV0k7UUFDSSxjQUFjO0lBQ2xCLENBQUM7SUFFTSx5Q0FBUSxHQUFmO1FBQ0ksY0FBYztJQUNqQixDQUFDO0lBRUssNENBQVcsR0FBbEIsVUFBbUIsT0FBTztRQUN0QixjQUFjO0lBQ2xCLENBQUM7SUFFTSw0Q0FBVyxHQUFsQjtRQUNJLGNBQWM7SUFDbEIsQ0FBQztJQUVNLDhDQUFhLEdBQXBCLFVBQ0ksU0FBaUMsRUFDakMsS0FBNkIsRUFDN0IsS0FBMEI7UUFDMUIsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRSxpQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSw4WEFVVDtvQkFDRCxNQUFNLEVBQUUsQ0FBQyxzSUFRUixDQUFDO2lCQUNMLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxxQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNLLHFDQUFjLEdBQTJDO1FBQ2hFLGVBQWUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ25DLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQy9CLG1CQUFtQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLGlCQUFpQixFQUFHLEVBQUUsRUFBRTtLQUN2RSxDQUFDO0lBQ0YsNkJBQUM7Q0F2RUQsQUF1RUMsSUFBQTtTQXZFWSxzQkFBc0IiLCJmaWxlIjoic2luZ2xlLXNldHRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==