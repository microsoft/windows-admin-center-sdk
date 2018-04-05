import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertBarService, AlertSeverity } from './alert-bar.service';
var AlertBarComponent = /** @class */ (function () {
    /**
     * Initializes a new instance of the {AlertBarComponent} class.
     *
     * @param {AlertBarService} alertBarService The alert service.
     * @param {Router} router The router.
     * @param {ActivatedRoute} activatedRoute The activated route.
     */
    function AlertBarComponent(alertBarService, router, activatedRoute) {
        this.alertBarService = alertBarService;
        this.router = router;
        this.activatedRoute = activatedRoute;
    }
    /**
     * The method to run when the component is initialized.
     */
    AlertBarComponent.prototype.ngOnInit = function () {
        this.alerts = [];
        this.alertKeyToAlertInfoMap = {};
        this.alertBarService.register(this, this.id);
    };
    /**
     * The method to run when the component is destroyed.
     */
    AlertBarComponent.prototype.ngOnDestroy = function () {
        this.alertBarService.unregister(this.id);
    };
    /**
     * Gets the theme CSS classes for a given alert.
     *
     * @param {Alert} alert The alert.
     */
    AlertBarComponent.prototype.getThemeClasses = function (alert) {
        var classes = ['sme-arrange-stack-h'];
        if (alert.severity === AlertSeverity.Error) {
            classes.push('alert-error-theme');
        }
        else if (alert.severity === AlertSeverity.Informational) {
            classes.push('alert-info-theme');
        }
        else {
            classes.push('alert-warning-theme');
        }
        return classes;
    };
    /**
     * Gets the icon CSS classes for a given alert.
     *
     * @param {Alert} item The alert.
     */
    AlertBarComponent.prototype.getIconClasses = function (alert) {
        var classes = ['sme-icon', 'sme-icon-size-md', 'sme-position-flex-none', 'alert-icon'];
        if (alert.severity === AlertSeverity.Error) {
            classes.push('sme-icon-error');
        }
        else if (alert.severity === AlertSeverity.Informational) {
            classes.push('sme-icon-info');
        }
        else {
            classes.push('sme-icon-warning');
        }
        return classes;
    };
    /**
     * Shows an alert.
     *
     * @param {Alert} alert The alert to show.
     */
    AlertBarComponent.prototype.show = function (alert) {
        var _this = this;
        if (this.alertKeyToAlertInfoMap.hasOwnProperty(this.indexName(alert.message, alert.severity))) {
            this.alertKeyToAlertInfoMap[this.indexName(alert.message, alert.severity)].refCount++;
        }
        else {
            var alertInfo = { alert: alert, refCount: 1 };
            this.alertKeyToAlertInfoMap[this.indexName(alert.message, alert.severity)] = alertInfo;
            this.alerts.unshift(alert);
        }
        if (alert.severity === AlertSeverity.Informational) {
            setTimeout(function () { _this.dismiss(alert); }, 10000);
        }
    };
    /**
     * Dismisses an alert.
     *
     * @param {Alert} alert The alert to dismiss.
     */
    AlertBarComponent.prototype.dismiss = function (alert) {
        MsftSme.remove(this.alerts, alert);
        delete this.alertKeyToAlertInfoMap[this.indexName(alert.message, alert.severity)];
    };
    /**
     * Navigates to the provided route of an event or invokes the event function.
     *
     * @param {AlertLink} link The link that was clicked.
     */
    AlertBarComponent.prototype.linkClick = function (link) {
        if (typeof (link.event) === 'function') {
            link.event();
        }
        else {
            if (link.event[0] && link.event[0].startsWith('/')) {
                this.router.navigate(link.event);
            }
            else {
                this.router.navigate(link.event, {
                    relativeTo: this.activatedRoute
                });
            }
        }
    };
    /**
     * Create the index name in map collection.
     *
     * @param message The alert message string.
     * @param sev The severity number for the alert.
     */
    AlertBarComponent.prototype.indexName = function (message, severity) {
        return severity + ':' + message;
    };
    AlertBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-alert-bar',
                    template: "\n      <div class=\"growl\">\n          <div *ngFor=\"let alert of alerts\" class=\"growl-item\" [ngClass]=\"getThemeClasses(alert)\" role=\"alert\">\n              <div [ngClass]=\"getIconClasses(alert)\"></div>\n              <div class=\"sme-position-flex-auto alert-content\">\n                  <!-- TODO: Temporarily not render header for consistency. -->\n                  <!-- In the future, revisit this and unify UI pattern -->\n                  <!--<h1 *ngIf=\"alert.title\">{{ alert.title }}</h1>-->\n                  <!-- TODO: Show alert group count once we have UI. -->\n                  <p>\n                      {{ alert.message }}\n                      <span class=\"alert-link-list\">\n              <div *ngFor=\"let link of alert.links\">\n              <a class=\"alert-link callback-link\" href=\"#\" (click)=\"linkClick(link)\">{{ link.displayText }}</a>\n              </div>\n            </span>\n                  </p>\n              </div>\n              <button class=\"sme-icon sme-icon-size-md sme-icon-cancel sme-position-flex-none alert-icon sme-button-auto-width\" (click)=\"dismiss(alert)\"></button>\n          </div>\n      </div>\n    ",
                    styles: ["\n      .growl {\n          z-index: 200;\n          position: absolute;\n          width: 300px;\n          right: 0px;\n          top: 0px;\n      }\n\n      .growl-item {\n          margin-top: 12px;\n          margin-right: 12px;\n      }\n\n\n      /* Theme styles */\n\n      .alert-error-theme {\n          background-color: #D82128;\n          color: #FFFFFF;\n      }\n\n      .alert-info-theme {\n          background-color: #F2F2F2;\n          color: #231F20;\n      }\n\n      .alert-warning-theme {\n          background-color: #FFC20A;\n          color: #231F20;\n      }\n\n\n      /* Link styles */\n\n      .alert-link-list {\n          padding: 1px 1px 1px 15px;\n      }\n\n      .alert-error-theme a {\n          color: #FFFFFF;\n      }\n\n      a {\n          text-decoration: underline;\n      }\n\n      .alert-link {\n          cursor: pointer;\n          padding-right: 10px;\n      }\n\n\n      /* Icon styles */\n\n      .alert-icon {\n          height: 48px;\n          width: 48px;\n          background: transparent;\n          border: 0;\n      }\n\n      .sme-icon-info::before {\n          font-size: 24px;\n          padding-left: 12px;\n          padding-top: 12px;\n      }\n\n      .sme-icon-warning::before {\n          font-size: 24px;\n          padding-left: 12px;\n          padding-top: 12px;\n      }\n\n      .sme-icon-error::before {\n          font-size: 24px;\n          padding-left: 12px;\n          padding-top: 12px;\n      }\n\n      .sme-icon-cancel::before {\n          font-size: 15px;\n      }\n\n\n      /* Content styles */\n\n      .alert-content {\n          padding-top: 12px;\n          padding-bottom: 12px;\n          overflow: hidden;\n          word-wrap: break-word;\n      }\n\n      h1 {\n          padding: 0 0 8px 0;\n          font-size: 18px;\n          line-height: 24px;\n          font-family: \"Segoe UI\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n      }\n\n      p {\n          font-size: 13px;\n          padding: 0;\n          line-height: normal;\n          font-family: \"Segoe UI\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n          vertical-align: middle;\n          margin-top: 2px;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    AlertBarComponent.ctorParameters = function () { return [
        { type: AlertBarService, },
        { type: Router, },
        { type: ActivatedRoute, },
    ]; };
    AlertBarComponent.propDecorators = {
        'id': [{ type: Input },],
    };
    return AlertBarComponent;
}());
export { AlertBarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYWxlcnQtYmFyL2FsZXJ0LWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxLQUFBLEVBQXlCLE1BQU8sZUFBQSxDQUFnQjtBQUNwRSxPQUFPLEVBQUUsY0FBQSxFQUFnQixNQUFBLEVBQU8sTUFBTyxpQkFBQSxDQUFrQjtBQUN6RCxPQUFPLEVBQW1CLGVBQUEsRUFBdUMsYUFBQSxFQUFjLE1BQU8scUJBQUEsQ0FBc0I7QUFHNUc7SUFRSTs7Ozs7O09BTUc7SUFDSCwyQkFBMkIsZUFBZ0MsRUFBVSxNQUFjLEVBQVUsY0FBOEI7UUFBaEcsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUFJLENBQUM7SUFFaEk7O09BRUc7SUFDSSxvQ0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7T0FFRztJQUNJLHVDQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksMkNBQWUsR0FBdEIsVUFBdUIsS0FBWTtRQUMvQixJQUFJLE9BQU8sR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3hELE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSwwQ0FBYyxHQUFyQixVQUFzQixLQUFZO1FBQzlCLElBQUksT0FBTyxHQUFHLENBQUMsVUFBVSxFQUFFLGtCQUFrQixFQUFFLHdCQUF3QixFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3ZGLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN4RCxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGdDQUFJLEdBQVgsVUFBWSxLQUFZO1FBQXhCLGlCQWNDO1FBWkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVGLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFMUYsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBTSxTQUFTLEdBQWMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUN2RixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNqRCxVQUFVLENBQUMsY0FBUSxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3RELENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLG1DQUFPLEdBQWQsVUFBZSxLQUFZO1FBQ3ZCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxxQ0FBUyxHQUFoQixVQUFpQixJQUFlO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBYSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDN0IsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjO2lCQUNsQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBRUwsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLHFDQUFTLEdBQWpCLFVBQWtCLE9BQWUsRUFBRSxRQUFnQjtRQUMvQyxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUM7SUFDcEMsQ0FBQztJQUNFLDRCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSw4cENBcUJUO29CQUNELE1BQU0sRUFBRSxDQUFDLGdxRUE2R1IsQ0FBQztpQkFDTCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsZ0NBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGVBQWUsR0FBRztRQUN6QixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUsY0FBYyxHQUFHO0tBQ3ZCLEVBSjZGLENBSTdGLENBQUM7SUFDSyxnQ0FBYyxHQUEyQztRQUNoRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtLQUN2QixDQUFDO0lBQ0Ysd0JBQUM7Q0FuUkQsQUFtUkMsSUFBQTtTQW5SWSxpQkFBaUIiLCJmaWxlIjoiYWxlcnQtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=