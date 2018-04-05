import { Component } from '@angular/core';
import { ValidationAlertSeverity } from '@msft-sme/shell/angular';
var ValidationAlertExampleComponent = /** @class */ (function () {
    function ValidationAlertExampleComponent() {
        this.model = {
            alerts: {
                success: { message: 'This is a success alert', valid: true },
                error: { message: 'This is a error alert', severity: ValidationAlertSeverity.Error, valid: false },
                warn: { message: 'This is a warning alert', severity: ValidationAlertSeverity.Warning, valid: true },
                info: { message: 'This is a info alert', severity: ValidationAlertSeverity.Informational, valid: true }
            }
        };
    }
    ValidationAlertExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-control-validation-alert-example',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-documentation\">\n          <p>Use the validation-alert component when you want to communicate a message about the state of a form field to the user.</p>\n          <h2>Examples</h2>\n          <section>\n              <h3>Code:</h3>\n              <code>&lt;sme-validation-alert [alert]=\"alert\"&gt;&lt;/sme-validation-alert&gt;</code>\n\n              <h3>Error</h3>\n              <div class=\"sme-documentation-example\">\n                  <sme-validation-alert [alert]=\"model.alerts.error\"></sme-validation-alert>\n              </div>\n              <p><b>Alert:</b></p>\n              <code>{{'{'}} message: 'This is a error alert', severity: ValidationAlertSeverity.Error, valid: false}</code>\n\n              <h3>Warning</h3>\n              <div class=\"sme-documentation-example\">\n                  <sme-validation-alert [alert]=\"model.alerts.warn\"></sme-validation-alert>\n              </div>\n              <p><b>Alert:</b></p>\n              <code>{{'{'}} message: 'This is a warning alert', severity: ValidationAlertSeverity.Warning, valid: true}</code>\n\n              <h3>Informational</h3>\n              <div class=\"sme-documentation-example\">\n                  <sme-validation-alert [alert]=\"model.alerts.info\"></sme-validation-alert>\n              </div>\n              <p><b>Alert:</b></p>\n              <code>{{'{'}} message: 'This is a info alert', severity: ValidationAlertSeverity.Informational, valid: true}</code>\n\n              <h3>Success</h3>\n              <div class=\"sme-documentation-example\">\n                  <sme-validation-alert [alert]=\"model.alerts.success\"></sme-validation-alert>\n              </div>\n              <p><b>Alert:</b></p>\n              <code>{{'{'}} message: 'This is a success alert', valid: true}</code>\n          </section>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ValidationAlertExampleComponent.ctorParameters = function () { return []; };
    return ValidationAlertExampleComponent;
}());
export { ValidationAlertExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9mb3JtL3ZhbGlkYXRpb24tYWxlcnQvdmFsaWRhdGlvbi1hbGVydC1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUMxQyxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyx5QkFBQSxDQUEwQjtBQUVsRTtJQUdJO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULE1BQU0sRUFBRTtnQkFDSixPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtnQkFDNUQsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtnQkFDbEcsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtnQkFDcEcsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTthQUMxRztTQUNKLENBQUE7SUFDTCxDQUFDO0lBQ0UsMENBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxRQUFRLEVBQUUsKzJEQXFDVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsOENBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRixzQ0FBQztDQTNERCxBQTJEQyxJQUFBO1NBM0RZLCtCQUErQiIsImZpbGUiOiJ2YWxpZGF0aW9uLWFsZXJ0LWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL21hdHdpbHMvU291cmNlL2Jhc2UvbXNmdC1zbWUtZGV2ZWxvcGVyLXRvb2xzL2lubGluZVNyYy8ifQ==