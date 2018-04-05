import { Component } from '@angular/core';
import { AlertSeverity } from '../../../../../angular';
var AlertBarExampleComponent = (function () {
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
    return AlertBarExampleComponent;
}());
export { AlertBarExampleComponent };
AlertBarExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-alert-bar-example',
                template: "\n      <div class=\"m-l-xxs tool-container\">\n         <div>\n          <h3>Anonymous alert bar component</h3>\n          <p>Below is an example of a &lt;sme-alert-bar&gt;&lt;/sme-alert-bar&gt; with no id passed in.</p>\n          <sme-alert-bar></sme-alert-bar>\n          <div style=\"margin-top: 10px\">\n            <p>Click the buttons below to generate informational alerts</p>\n            <button (click)=\"onSimpleInformationalClick()\">Simple</button>\n            <button (click)=\"onIntermediateInformationalClick()\">Intermediate</button>\n            <button (click)=\"onComplexInformationalClick()\">Complex</button>\n          </div>\n          <div style=\"margin-top: 10px\">\n            <p>Click the buttons below to generate warning alerts</p>\n            <button (click)=\"onSimpleWarningClick()\">Simple</button>\n            <button (click)=\"onIntermediateWarningClick()\">Intermediate</button>\n            <button (click)=\"onComplexWarningClick()\">Complex</button>\n          </div>\n          <div style=\"margin-top: 10px\">\n            <p>Click the buttons below to generate error alerts</p>\n            <button (click)=\"onSimpleErrorClick()\">Simple</button>\n            <button (click)=\"onIntermediateErrorClick()\">Intermediate</button>\n            <button (click)=\"onComplexErrorClick()\">Complex</button>\n          </div>\n        </div>\n\n        <div>\n          <h3>Alert bar component with an ID</h3>\n          <p>Below is an example of a &lt;sme-alert-bar id=&quot;alert1&quot;&gt;&lt;/sme-alert-bar&gt; with an id passed in.</p>\n          <sme-alert-bar id=\"alert1\"></sme-alert-bar>\n          <div style=\"margin-top: 10px\">\n            <p>Click the buttons below to generate informational alerts</p>\n            <button (click)=\"onSimpleInformationalClick('alert1')\">Simple</button>\n            <button (click)=\"onIntermediateInformationalClick('alert1')\">Intermediate</button>\n            <button (click)=\"onComplexInformationalClick('alert1')\">Complex</button>\n          </div>\n          <div style=\"margin-top: 10px\">\n            <p>Click the buttons below to generate warning alerts</p>\n            <button (click)=\"onSimpleWarningClick('alert1')\">Simple</button>\n            <button (click)=\"onIntermediateWarningClick('alert1')\">Intermediate</button>\n            <button (click)=\"onComplexWarningClick('alert1')\">Complex</button>\n          </div>\n          <div style=\"margin-top: 10px\">\n            <p>Click the buttons below to generate error alerts</p>\n            <button (click)=\"onSimpleErrorClick('alert1')\">Simple</button>\n            <button (click)=\"onIntermediateErrorClick('alert1')\">Intermediate</button>\n            <button (click)=\"onComplexErrorClick('alert1')\">Complex</button>\n          </div>\n        </div>\n      </div>\n    "
            },] },
];
/** @nocollapse */
AlertBarExampleComponent.ctorParameters = function () { return [
    null,
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9hbGVydC1iYXIvYWxlcnQtYmFyLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBRTFDLE9BQU8sRUFBcUMsYUFBQSxFQUFpQyxNQUFPLHdCQUFBLENBQXlCO0FBRzdHO0lBcUJJOzs7O09BSUc7SUFDSCxrQ0FBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsb0VBQW9FLENBQUM7UUFDcEYsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNUO2dCQUNJLFdBQVcsRUFBRSwrQ0FBK0M7Z0JBQzVELEtBQUssRUFBRSxDQUFFLHlCQUF5QixDQUFFO2FBQ3ZDO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLHdCQUF3QjtnQkFDckMsS0FBSyxFQUFFLENBQUUsVUFBVSxDQUFFO2FBQ3hCO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLGlCQUFpQjtnQkFDOUIsS0FBSyxFQUFFO29CQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEIsQ0FBQzthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLGlCQUFpQjtnQkFDOUIsS0FBSyxFQUFFO29CQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEIsQ0FBQzthQUNKO1lBQ0Q7Z0JBQ0ksV0FBVyxFQUFFLGtDQUFrQztnQkFDL0MsS0FBSyxFQUFFLENBQUUsa0JBQWtCLENBQUU7YUFDaEM7WUFDRDtnQkFDSSxXQUFXLEVBQUUsaUJBQWlCO2dCQUM5QixLQUFLLEVBQUU7b0JBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNwQixDQUFDO2FBQ0o7U0FDSixDQUFDO1FBRUYsSUFBSSxDQUFDLGVBQWUsR0FBRztZQUNuQixPQUFP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QyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksd0RBQXFCLEdBQTVCLFVBQTZCLEVBQVc7UUFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7OztPQUlHO0lBQ0kscURBQWtCLEdBQXpCLFVBQTBCLEVBQVc7UUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksMkRBQXdCLEdBQS9CLFVBQWdDLEVBQVc7UUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksc0RBQW1CLEdBQTFCLFVBQTJCLEVBQVc7UUFDbEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUE2REwsK0JBQUM7QUFBRCxDQWpRQSxBQWlRQzs7QUE1RE0sbUNBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsb0NBQW9DO2dCQUM5QyxRQUFRLEVBQUUsd3lGQWtEVDthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCx1Q0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsSUFBSTtDQUNILEVBRjZGLENBRTdGLENBQUMiLCJmaWxlIjoiYWxlcnQtYmFyLWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==