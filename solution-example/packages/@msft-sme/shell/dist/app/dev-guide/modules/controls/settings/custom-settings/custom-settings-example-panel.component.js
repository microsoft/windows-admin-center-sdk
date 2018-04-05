import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
var CustomSettingsExamplePanelComponent = (function () {
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
    return CustomSettingsExamplePanelComponent;
}());
export { CustomSettingsExamplePanelComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jdXN0b20tc2V0dGluZ3MvY3VzdG9tLXNldHRpbmdzLWV4YW1wbGUtcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQTZCLE1BQU8sZUFBQSxDQUFnQjtBQUM3RCxPQUFPLEVBQUUsY0FBQSxFQUFlLE1BQU8saUJBQUEsQ0FBa0I7QUFLakQ7SUFHSSw2Q0FBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRDNDLGdCQUFXLEdBQUcsMEJBQTBCLENBQUM7SUFFaEQsQ0FBQztJQUVNLHNEQUFRLEdBQWY7UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUM1RCxLQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx5REFBVyxHQUFsQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEMsQ0FBQztJQUNMLENBQUM7SUFhTCwwQ0FBQztBQUFELENBN0JBLEFBNkJDOztBQVpNLDhDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLGdEQUFnRDtnQkFDMUQsUUFBUSxFQUFFLDBDQUVUO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLGtEQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7Q0FDdkIsRUFGNkYsQ0FFN0YsQ0FBQyIsImZpbGUiOiJjdXN0b20tc2V0dGluZ3MtZXhhbXBsZS1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9