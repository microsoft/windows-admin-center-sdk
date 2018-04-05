import { Component, Input } from '@angular/core';
import { HealthAlertSeverity } from './';
var PageAlertBarComponent = (function () {
    function PageAlertBarComponent() {
        this.strings = MsftSme.resourcesStrings();
        this.defaultDetailsLabel = this.strings.MsftSmeShell.Angular.Common.details;
    }
    /**
     * Gets the theme CSS classes for a given alert.
     *
     */
    PageAlertBarComponent.prototype.getAlertThemeClass = function () {
        var classes = ['flex-layout fixed-flex-size horizontal alert-font'];
        if (this.alert) {
            if (this.alert.severity === HealthAlertSeverity.Critical) {
                classes.push(PageAlertBarComponent.errorThemes.criticalTheme);
            }
            else if (this.alert.severity === HealthAlertSeverity.Major) {
                classes.push(PageAlertBarComponent.errorThemes.majorTheme);
            }
            else if (this.alert.severity === HealthAlertSeverity.Minor) {
                classes.push(PageAlertBarComponent.errorThemes.minorTheme);
            }
            else {
                classes.push(PageAlertBarComponent.errorThemes.cosmeticTheme);
            }
        }
        return classes;
    };
    /**
     * Gets the icon CSS classes for a given alert.
     *
     */
    PageAlertBarComponent.prototype.getAlertIconClass = function () {
        var classes = ['sme-icon sme-icon-16 alert-spacing'];
        if (this.alert) {
            if (this.alert.severity === HealthAlertSeverity.Critical) {
                classes.push(PageAlertBarComponent.errorIcons.criticalIcon);
            }
            else if (this.alert.severity === HealthAlertSeverity.Major) {
                classes.push(PageAlertBarComponent.errorIcons.errorIcon);
            }
            else if (this.alert.severity === HealthAlertSeverity.Minor) {
                classes.push(PageAlertBarComponent.errorIcons.warningIcon);
            }
            else {
                classes.push(PageAlertBarComponent.errorIcons.infoIcon);
            }
        }
        return classes;
    };
    return PageAlertBarComponent;
}());
export { PageAlertBarComponent };
PageAlertBarComponent.errorThemes = {
    criticalTheme: 'alert-critical-theme',
    majorTheme: 'alert-major-theme',
    minorTheme: 'alert-minor-theme',
    cosmeticTheme: 'alert-info-theme'
};
PageAlertBarComponent.errorIcons = {
    criticalIcon: 'icon-win-errorBadge',
    errorIcon: 'icon-win-error',
    warningIcon: 'icon-win-warning',
    infoIcon: 'icon-win-info'
};
PageAlertBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-page-alert-bar',
                template: "\n      <div [ngClass]=\"getAlertThemeClass()\">\n        <div class='auto-flex-size flex-layout'>\n            <span [ngClass]=\"getAlertIconClass()\"></span>\n            <span class='alert-text'>{{ alert.message }}</span>            \n        </div>\n        <dir *ngIf=\"!!alert.detailsCommand\" class='auto-flex-size flex-layout reverse alert-spacing'>\n            <a class=\"link\" [title]=\"!!alert.detailsCaption ? alert.detailsCaption : defaultDetailsLabel\" (click)=\"alert.detailsCommand($event)\">\n                {{ !!alert.detailsLabel ? alert.detailsLabel : defaultDetailsLabel }}\n            </a>      \n        </dir>\n      </div>\n    ",
                styles: ["\n      .alert-spacing {\n          margin-left: 12px;\n          margin-right: 12px;\n          margin-top: 7px;\n          margin-bottom: 7px;\n      }\n\n      .alert-text {\n          margin-top: 7px;\n          margin-bottom: 7px;\n      }\n\n      .alert-font {\n          font-size: 16px;\n      }\n\n      .alert-critical-theme {\n          background: #ff0009;\n          color: #FFFFFF;    \n      }\n\n      .alert-major-theme {\n          background: #d82128;\n          color: #FFFFFF;\n      }\n\n      .alert-minor-theme {\n          background: #ffc20a;\n          color: #231F20;\n      }\n\n      .alert-info-theme {\n          background: #F2F2F2;\n          color: #231F20;\n      }\n\n      .link {\n          color: inherit;\n          text-decoration: underline;\n      }\n    "]
            },] },
];
/** @nocollapse */
PageAlertBarComponent.ctorParameters = function () { return []; };
PageAlertBarComponent.propDecorators = {
    'alert': [{ type: Input },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvcGFnZS1hbGVydC1iYXIvcGFnZS1hbGVydC1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVcsS0FBQSxFQUFNLE1BQU8sZUFBQSxDQUFnQjtBQUVqRCxPQUFPLEVBQUUsbUJBQUEsRUFBK0IsTUFBTyxJQUFBLENBQUs7QUFHcEQ7SUFBQTtRQWdCWSxZQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUM7UUFDL0Msd0JBQW1CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUEwSGxGLENBQUM7SUFuSEc7OztPQUdHO0lBQ0ksa0RBQWtCLEdBQXpCO1FBQ0ksSUFBTSxPQUFPLEdBQUcsQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1FBRXRFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDdkQsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFbEUsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUUvRCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzNELE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRS9ELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNsRSxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGlEQUFpQixHQUF4QjtRQUNJLElBQU0sT0FBTyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUV2RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRWhFLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFN0QsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUUvRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUQsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFtRUwsNEJBQUM7QUFBRCxDQTNJQSxBQTJJQzs7QUF6STBCLGlDQUFXLEdBQUc7SUFDakMsYUFBYSxFQUFFLHNCQUFzQjtJQUNyQyxVQUFVLEVBQUUsbUJBQW1CO0lBQy9CLFVBQVUsRUFBRSxtQkFBbUI7SUFDL0IsYUFBYSxFQUFFLGtCQUFrQjtDQUNwQyxDQUFDO0FBRXFCLGdDQUFVLEdBQUc7SUFDaEMsWUFBWSxFQUFFLHFCQUFxQjtJQUNuQyxTQUFTLEVBQUUsZ0JBQWdCO0lBQzNCLFdBQVcsRUFBRSxrQkFBa0I7SUFDL0IsUUFBUSxFQUFFLGVBQWU7Q0FDNUIsQ0FBQztBQTJEQyxnQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRSxtcEJBWVQ7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsa3lCQXlDUixDQUFDO2FBQ0wsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLG9DQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0FBQ0ssb0NBQWMsR0FBMkM7SUFDaEUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDMUIsQ0FBQyIsImZpbGUiOiJwYWdlLWFsZXJ0LWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9