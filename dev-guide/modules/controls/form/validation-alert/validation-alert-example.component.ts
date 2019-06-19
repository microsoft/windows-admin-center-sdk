import { Component } from '@angular/core';
import { ValidationAlertSeverity } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-control-validation-alert-example',
    templateUrl: './validation-alert-example.component.html'
})
export class ValidationAlertExampleComponent {
    public model: any;
    public showBackground = false;
    private test = `This is a error alert with a [link to bing](https://www.bing.com)
and multiple paragraphs of text

It also includes:
- a
- bullet
-list

\`\`\` html
and some code
\`\`\`

`;

    constructor() {
        this.model = {
            alerts: {
                pending: { message: 'This is a pending alert', pending: true },
                success: { message: 'This is a success alert', valid: true },
                error: { message: 'This is a error alert', severity: ValidationAlertSeverity.Error, valid: false },
                warn: { message: 'This is a warning alert', severity: ValidationAlertSeverity.Warning, valid: true },
                info: { message: 'This is a info alert', severity: ValidationAlertSeverity.Informational, valid: true },
                markdown: {
                    message: this.test,
                    severity: ValidationAlertSeverity.Error,
                    valid: false,
                    isMarkdownMessage: true
                }
            }
        };
    }

    public ToggleBackground(): void {
        this.showBackground = !this.showBackground;
    }
}
