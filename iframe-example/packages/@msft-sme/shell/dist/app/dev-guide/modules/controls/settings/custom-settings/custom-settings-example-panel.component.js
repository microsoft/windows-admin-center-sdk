import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
var CustomSettingsExamplePanelComponent = /** @class */ (function () {
    function CustomSettingsExamplePanelComponent(activatedRoute) {
        this.activatedRoute = activatedRoute;
        this.settingName = 'NotConfiguredSettingName';
    }
    CustomSettingsExamplePanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            _this.settingName = params['settingName'].toString();
        });
    };
    CustomSettingsExamplePanelComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    CustomSettingsExamplePanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-custom-settings-example-panel',
                    template: "\n      <div>{{settingName}}</div>\n    "
                },] },
    ];
    /** @nocollapse */
    CustomSettingsExamplePanelComponent.ctorParameters = function () { return [
        { type: ActivatedRoute, },
    ]; };
    return CustomSettingsExamplePanelComponent;
}());
export { CustomSettingsExamplePanelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jdXN0b20tc2V0dGluZ3MvY3VzdG9tLXNldHRpbmdzLWV4YW1wbGUtcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQTZCLE1BQU8sZUFBQSxDQUFnQjtBQUM3RCxPQUFPLEVBQUUsY0FBQSxFQUFlLE1BQU8saUJBQUEsQ0FBa0I7QUFLakQ7SUFHSSw2Q0FBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRDNDLGdCQUFXLEdBQUcsMEJBQTBCLENBQUM7SUFFaEQsQ0FBQztJQUVNLHNEQUFRLEdBQWY7UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUM1RCxLQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx5REFBVyxHQUFsQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEMsQ0FBQztJQUNMLENBQUM7SUFDRSw4Q0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxnREFBZ0Q7b0JBQzFELFFBQVEsRUFBRSwwQ0FFVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsa0RBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztLQUN2QixFQUY2RixDQUU3RixDQUFDO0lBQ0YsMENBQUM7Q0E3QkQsQUE2QkMsSUFBQTtTQTdCWSxtQ0FBbUMiLCJmaWxlIjoiY3VzdG9tLXNldHRpbmdzLWV4YW1wbGUtcGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==