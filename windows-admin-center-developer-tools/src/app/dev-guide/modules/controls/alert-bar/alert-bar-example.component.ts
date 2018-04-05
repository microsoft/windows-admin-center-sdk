import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Alert, AlertBarService, AlertLink, AlertSeverity, AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-alert-bar-example',
    templateUrl: './alert-bar-example.component.html'
})
export class AlertBarExampleComponent {
    public infoAlertSimple: Alert;
    public infoAlertIntermediate: Alert;
    public infoAlertComplex: Alert;

    public warningAlertSimple: Alert;
    public warningAlertIntermediate: Alert;
    public warningAlertComplex: Alert;

    public errorAlertSimple: Alert;
    public errorAlertIntermediate: Alert;
    public errorAlertComplex: Alert;

    public links: AlertLink[];
    public message: string;
    public title: string;
        
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-alert-bar';
    }

    /**
     * Initializes a new instance of the {AlertBarExampleComponent} class.
     *
     * @param {AlertBarService} alertBarService The alert service.
     */
    constructor(private alertBarService: AlertBarService) {
        this.title = 'Header';
        this.message = 'Paragraph lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        this.links = [
            {
                displayText: 'Go to loading wheel (/controls/loading-wheel)',
                event: [ '/controls/loading-wheel' ]
            },
            {
                displayText: 'Go to error (../error)',
                event: [ '../error' ]
            },
            {
                displayText: 'Pop up an alert',
                event: () => {
                    alert('Hello!');
                }
            },
            {
                displayText: 'Pop up an alert',
                event: () => {
                    alert('Hello!');
                }
            },
            {
                displayText: 'Go to dialogs (/controls/dialog)',
                event: [ '/controls/dialog' ]
            },
            {
                displayText: 'Pop up an alert',
                event: () => {
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

    /**
     * Shows a simple informational alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    public onSimpleInformationalClick(id?: string): void {
        this.alertBarService.show(this.infoAlertSimple, id);
    }

    /**
     * Shows an intermediate informational alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    public onIntermediateInformationalClick(id?: string): void {
        this.alertBarService.show(this.infoAlertIntermediate, id);
    }

    /**
     * Shows a complex informational alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    public onComplexInformationalClick(id?: string): void {
        this.alertBarService.show(this.infoAlertComplex, id);
    }

    /**
     * Shows a simple warning alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    public onSimpleWarningClick(id?: string): void {
        this.alertBarService.show(this.warningAlertSimple, id);
    }

    /**
     * Shows an intermediate warning alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    public onIntermediateWarningClick(id?: string): void {
        this.alertBarService.show(this.warningAlertIntermediate, id);
    }

    /**
     * Shows a complex warning alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    public onComplexWarningClick(id?: string): void {
        this.alertBarService.show(this.warningAlertComplex, id);
    }

    /**
     * Shows a simple error alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    public onSimpleErrorClick(id?: string): void {
        this.alertBarService.show(this.errorAlertSimple, id);
    }

    /**
     * Shows an intermediate error alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    public onIntermediateErrorClick(id?: string): void {
        this.alertBarService.show(this.errorAlertIntermediate, id);
    }

    /**
     * Shows a complex error alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    public onComplexErrorClick(id?: string): void {
        this.alertBarService.show(this.errorAlertComplex, id);
    }
}
