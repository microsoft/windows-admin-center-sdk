import { Component } from '@angular/core';
import { ValidationAlertSeverity } from '@msft-sme/shell/angular';
@Component({
    selector: 'sme-ng2-control-validation-alert-example',
    template: `
      <div class="sme-layout-absolute sme-position-inset-none sme-documentation">
          <p>Use the validation-alert component when you want to communicate a message about the state of a form field to the user.</p>
          <h2>Examples</h2>
          <section>
              <h3>Code:</h3>
              <code>&lt;sme-validation-alert [alert]="alert"&gt;&lt;/sme-validation-alert&gt;</code>

              <h3>Error</h3>
              <div class="sme-documentation-example">
                  <sme-validation-alert [alert]="model.alerts.error"></sme-validation-alert>
              </div>
              <p><b>Alert:</b></p>
              <code>{{'{'}} message: 'This is a error alert', severity: ValidationAlertSeverity.Error, valid: false}</code>

              <h3>Warning</h3>
              <div class="sme-documentation-example">
                  <sme-validation-alert [alert]="model.alerts.warn"></sme-validation-alert>
              </div>
              <p><b>Alert:</b></p>
              <code>{{'{'}} message: 'This is a warning alert', severity: ValidationAlertSeverity.Warning, valid: true}</code>

              <h3>Informational</h3>
              <div class="sme-documentation-example">
                  <sme-validation-alert [alert]="model.alerts.info"></sme-validation-alert>
              </div>
              <p><b>Alert:</b></p>
              <code>{{'{'}} message: 'This is a info alert', severity: ValidationAlertSeverity.Informational, valid: true}</code>

              <h3>Success</h3>
              <div class="sme-documentation-example">
                  <sme-validation-alert [alert]="model.alerts.success"></sme-validation-alert>
              </div>
              <p><b>Alert:</b></p>
              <code>{{'{'}} message: 'This is a success alert', valid: true}</code>
          </section>
      </div>
    `
})
export class ValidationAlertExampleComponent {
    public model: any;

    constructor() {
        this.model = {
            alerts: {
                success: { message: 'This is a success alert', valid: true },
                error: { message: 'This is a error alert', severity: ValidationAlertSeverity.Error, valid: false },
                warn: { message: 'This is a warning alert', severity: ValidationAlertSeverity.Warning, valid: true },
                info: { message: 'This is a info alert', severity: ValidationAlertSeverity.Informational, valid: true }
            }
        }
    }
}
