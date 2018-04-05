import { Component, Input } from '@angular/core';
import { HealthAlertSeverity } from './models';
var PageAlertBarComponent = /** @class */ (function () {
    function PageAlertBarComponent() {
        this.strings = MsftSme.resourcesStrings();
        this.defaultDetailsLabel = this.strings.MsftSmeShell.Angular.Common.details;
    }
    /**
     * Gets the theme CSS classes for a given alert.
     *
     */
    PageAlertBarComponent.prototype.getAlertThemeClass = function () {
        var classes = ['sme-arrange-stack-h sme-position-flex-none alert-font'];
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
        var classes = ['sme-icon alert-spacing'];
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
    PageAlertBarComponent.errorThemes = {
        criticalTheme: 'alert-critical-theme',
        majorTheme: 'alert-major-theme',
        minorTheme: 'alert-minor-theme',
        cosmeticTheme: 'alert-info-theme'
    };
    PageAlertBarComponent.errorIcons = {
        criticalIcon: 'sme-icon-errorBadge',
        errorIcon: 'sme-icon-error',
        warningIcon: 'sme-icon-warning',
        infoIcon: 'sme-icon-info'
    };
    PageAlertBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-page-alert-bar',
                    template: "\n      <div [ngClass]=\"getAlertThemeClass()\">\n          <div class='sme-position-flex-auto sme-arrange-stack-h'>\n              <span [ngClass]=\"getAlertIconClass()\"></span>\n              <span class='alert-text'>{{ alert.message }}</span>\n          </div>\n          <dir *ngIf=\"!!alert.detailsCommand\" class='sme-position-flex-auto sme-arrange-stack-h sme-arrange-stack-reversed alert-spacing'>\n              <a class=\"link\" [title]=\"!!alert.detailsCaption ? alert.detailsCaption : defaultDetailsLabel\" (click)=\"alert.detailsCommand($event)\">\n                {{ !!alert.detailsLabel ? alert.detailsLabel : defaultDetailsLabel }}\n            </a>\n          </dir>\n      </div>\n    ",
                    styles: ["\n      .alert-spacing {\n          margin-left: 12px;\n          margin-right: 12px;\n          margin-top: 7px;\n          margin-bottom: 7px;\n      }\n\n      .alert-text {\n          margin-top: 7px;\n          margin-bottom: 7px;\n      }\n\n      .alert-font {\n          font-size: 16px;\n      }\n\n      .alert-critical-theme {\n          background: #ff0009;\n          color: #FFFFFF;    \n      }\n\n      .alert-major-theme {\n          background: #d82128;\n          color: #FFFFFF;\n      }\n\n      .alert-minor-theme {\n          background: #ffc20a;\n          color: #231F20;\n      }\n\n      .alert-info-theme {\n          background: #F2F2F2;\n          color: #231F20;\n      }\n\n      .link {\n          color: inherit;\n          text-decoration: underline;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    PageAlertBarComponent.ctorParameters = function () { return []; };
    PageAlertBarComponent.propDecorators = {
        'alert': [{ type: Input },],
    };
    return PageAlertBarComponent;
}());
export { PageAlertBarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvcGFnZS1hbGVydC1iYXIvcGFnZS1hbGVydC1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVcsS0FBQSxFQUFNLE1BQU8sZUFBQSxDQUFnQjtBQUVqRCxPQUFPLEVBQUUsbUJBQUEsRUFBK0IsTUFBTyxVQUFBLENBQVc7QUFHMUQ7SUFBQTtRQWdCWSxZQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUM7UUFDL0Msd0JBQW1CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUEwSGxGLENBQUM7SUFuSEc7OztPQUdHO0lBQ0ksa0RBQWtCLEdBQXpCO1FBQ0ksSUFBTSxPQUFPLEdBQUcsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1FBRTFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDdkQsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFbEUsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUUvRCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzNELE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRS9ELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNsRSxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGlEQUFpQixHQUF4QjtRQUNJLElBQU0sT0FBTyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUUzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRWhFLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFN0QsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUUvRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUQsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUF0RXNCLGlDQUFXLEdBQUc7UUFDakMsYUFBYSxFQUFFLHNCQUFzQjtRQUNyQyxVQUFVLEVBQUUsbUJBQW1CO1FBQy9CLFVBQVUsRUFBRSxtQkFBbUI7UUFDL0IsYUFBYSxFQUFFLGtCQUFrQjtLQUNwQyxDQUFDO0lBRXFCLGdDQUFVLEdBQUc7UUFDaEMsWUFBWSxFQUFFLHFCQUFxQjtRQUNuQyxTQUFTLEVBQUUsZ0JBQWdCO1FBQzNCLFdBQVcsRUFBRSxrQkFBa0I7UUFDL0IsUUFBUSxFQUFFLGVBQWU7S0FDNUIsQ0FBQztJQTJEQyxnQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxrc0JBWVQ7b0JBQ0QsTUFBTSxFQUFFLENBQUMsa3lCQXlDUixDQUFDO2lCQUNMLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxvQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNLLG9DQUFjLEdBQTJDO1FBQ2hFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0tBQzFCLENBQUM7SUFDRiw0QkFBQztDQTNJRCxBQTJJQyxJQUFBO1NBM0lZLHFCQUFxQiIsImZpbGUiOiJwYWdlLWFsZXJ0LWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9