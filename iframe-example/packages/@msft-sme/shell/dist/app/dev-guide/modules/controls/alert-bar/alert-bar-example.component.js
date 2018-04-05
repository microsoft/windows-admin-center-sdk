import { Component } from '@angular/core';
import { AlertBarService, AlertSeverity } from '../../../../../angular';
var AlertBarExampleComponent = /** @class */ (function () {
    /**
     * Initializes a new instance of the {AlertBarExampleComponent} class.
     *
     * @param {AlertBarService} alertBarService The alert service.
     */
    function AlertBarExampleComponent(alertBarService) {
        this.alertBarService = alertBarService;
        this.title = 'Header';
        this.message = 'Paragraph lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        this.links = [
            {
                displayText: 'Go to loading wheel (/controls/loading-wheel)',
                event: ['/controls/loading-wheel']
            },
            {
                displayText: 'Go to error (../error)',
                event: ['../error']
            },
            {
                displayText: 'Pop up an alert',
                event: function () {
                    alert('Hello!');
                }
            },
            {
                displayText: 'Pop up an alert',
                event: function () {
                    alert('Hello!');
                }
            },
            {
                displayText: 'Go to dialogs (/controls/dialog)',
                event: ['/controls/dialog']
            },
            {
                displayText: 'Pop up an alert',
                event: function () {
                    alert('Hello!');
                }
            }
        ];
        this.infoAlertSimple = {
            message: this.message,
            severity: AlertSeverity.Informational
        };
        this.infoAlertIntermediate = {
            message: this.message,
            severity: AlertSeverity.Informational,
            title: this.title
        };
        this.infoAlertComplex = {
            links: this.links,
            message: this.message,
            severity: AlertSeverity.Informational,
            title: this.title
        };
        this.warningAlertSimple = {
            message: this.message,
            severity: AlertSeverity.Warning
        };
        this.warningAlertIntermediate = {
            message: this.message,
            severity: AlertSeverity.Warning,
            title: this.title
        };
        this.warningAlertComplex = {
            links: this.links,
            message: this.message,
            severity: AlertSeverity.Warning,
            title: this.title
        };
        this.errorAlertSimple = {
            message: this.message,
            severity: AlertSeverity.Error
        };
        this.errorAlertIntermediate = {
            message: this.message,
            severity: AlertSeverity.Error,
            title: this.title
        };
        this.errorAlertComplex = {
            links: this.links,
            message: this.message,
            severity: AlertSeverity.Error,
            title: this.title
        };
    }
    AlertBarExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'sme-alert-bar';
    };
    /**
     * Shows a simple informational alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    AlertBarExampleComponent.prototype.onSimpleInformationalClick = function (id) {
        this.alertBarService.show(this.infoAlertSimple, id);
    };
    /**
     * Shows an intermediate informational alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    AlertBarExampleComponent.prototype.onIntermediateInformationalClick = function (id) {
        this.alertBarService.show(this.infoAlertIntermediate, id);
    };
    /**
     * Shows a complex informational alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    AlertBarExampleComponent.prototype.onComplexInformationalClick = function (id) {
        this.alertBarService.show(this.infoAlertComplex, id);
    };
    /**
     * Shows a simple warning alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    AlertBarExampleComponent.prototype.onSimpleWarningClick = function (id) {
        this.alertBarService.show(this.warningAlertSimple, id);
    };
    /**
     * Shows an intermediate warning alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    AlertBarExampleComponent.prototype.onIntermediateWarningClick = function (id) {
        this.alertBarService.show(this.warningAlertIntermediate, id);
    };
    /**
     * Shows a complex warning alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    AlertBarExampleComponent.prototype.onComplexWarningClick = function (id) {
        this.alertBarService.show(this.warningAlertComplex, id);
    };
    /**
     * Shows a simple error alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    AlertBarExampleComponent.prototype.onSimpleErrorClick = function (id) {
        this.alertBarService.show(this.errorAlertSimple, id);
    };
    /**
     * Shows an intermediate error alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    AlertBarExampleComponent.prototype.onIntermediateErrorClick = function (id) {
        this.alertBarService.show(this.errorAlertIntermediate, id);
    };
    /**
     * Shows a complex error alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    AlertBarExampleComponent.prototype.onComplexErrorClick = function (id) {
        this.alertBarService.show(this.errorAlertComplex, id);
    };
    AlertBarExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-alert-bar-example',
                    template: "\n      <div class=\"m-l-xxs tool-container\">\n         <div>\n          <h3>Anonymous alert bar component</h3>\n          <p>Below is an example of a &lt;sme-alert-bar&gt;&lt;/sme-alert-bar&gt; with no id passed in.</p>\n          <sme-alert-bar></sme-alert-bar>\n          <div style=\"margin-top: 10px\">\n            <p>Click the buttons below to generate informational alerts</p>\n            <button (click)=\"onSimpleInformationalClick()\">Simple</button>\n            <button (click)=\"onIntermediateInformationalClick()\">Intermediate</button>\n            <button (click)=\"onComplexInformationalClick()\">Complex</button>\n          </div>\n          <div style=\"margin-top: 10px\">\n            <p>Click the buttons below to generate warning alerts</p>\n            <button (click)=\"onSimpleWarningClick()\">Simple</button>\n            <button (click)=\"onIntermediateWarningClick()\">Intermediate</button>\n            <button (click)=\"onComplexWarningClick()\">Complex</button>\n          </div>\n          <div style=\"margin-top: 10px\">\n            <p>Click the buttons below to generate error alerts</p>\n            <button (click)=\"onSimpleErrorClick()\">Simple</button>\n            <button (click)=\"onIntermediateErrorClick()\">Intermediate</button>\n            <button (click)=\"onComplexErrorClick()\">Complex</button>\n          </div>\n        </div>\n\n        <div>\n          <h3>Alert bar component with an ID</h3>\n          <p>Below is an example of a &lt;sme-alert-bar id=&quot;alert1&quot;&gt;&lt;/sme-alert-bar&gt; with an id passed in.</p>\n          <sme-alert-bar id=\"alert1\"></sme-alert-bar>\n          <div style=\"margin-top: 10px\">\n            <p>Click the buttons below to generate informational alerts</p>\n            <button (click)=\"onSimpleInformationalClick('alert1')\">Simple</button>\n            <button (click)=\"onIntermediateInformationalClick('alert1')\">Intermediate</button>\n            <button (click)=\"onComplexInformationalClick('alert1')\">Complex</button>\n          </div>\n          <div style=\"margin-top: 10px\">\n            <p>Click the buttons below to generate warning alerts</p>\n            <button (click)=\"onSimpleWarningClick('alert1')\">Simple</button>\n            <button (click)=\"onIntermediateWarningClick('alert1')\">Intermediate</button>\n            <button (click)=\"onComplexWarningClick('alert1')\">Complex</button>\n          </div>\n          <div style=\"margin-top: 10px\">\n            <p>Click the buttons below to generate error alerts</p>\n            <button (click)=\"onSimpleErrorClick('alert1')\">Simple</button>\n            <button (click)=\"onIntermediateErrorClick('alert1')\">Intermediate</button>\n            <button (click)=\"onComplexErrorClick('alert1')\">Complex</button>\n          </div>\n        </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    AlertBarExampleComponent.ctorParameters = function () { return [
        { type: AlertBarService, },
    ]; };
    return AlertBarExampleComponent;
}());
export { AlertBarExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9hbGVydC1iYXIvYWxlcnQtYmFyLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBRTFDLE9BQU8sRUFBUyxlQUFBLEVBQTRCLGFBQUEsRUFBaUMsTUFBTyx3QkFBQSxDQUF5QjtBQUc3RztJQXFCSTs7OztPQUlHO0lBQ0gsa0NBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoRCxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLG9FQUFvRSxDQUFDO1FBQ3BGLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVDtnQkFDSSxXQUFXLEVBQUUsK0NBQStDO2dCQUM1RCxLQUFLLEVBQUUsQ0FBRSx5QkFBeUIsQ0FBRTthQUN2QztZQUNEO2dCQUNJLFdBQVcsRUFBRSx3QkFBd0I7Z0JBQ3JDLEtBQUssRUFBRSxDQUFFLFVBQVUsQ0FBRTthQUN4QjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxpQkFBaUI7Z0JBQzlCLEtBQUssRUFBRTtvQkFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3BCLENBQUM7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxpQkFBaUI7Z0JBQzlCLEtBQUssRUFBRTtvQkFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3BCLENBQUM7YUFDSjtZQUNEO2dCQUNJLFdBQVcsRUFBRSxrQ0FBa0M7Z0JBQy9DLEtBQUssRUFBRSxDQUFFLGtCQUFrQixDQUFFO2FBQ2hDO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLGlCQUFpQjtnQkFDOUIsS0FBSyxFQUFFO29CQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEIsQ0FBQzthQUNKO1NBQ0osQ0FBQztRQUVGLElBQUksQ0FBQyxlQUFlLEdBQUc7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