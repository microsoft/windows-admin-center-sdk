import { ActivatedRouteSnapshot } from '@angular/router';
import { Alert, AlertBarService, AlertLink, AppContextService } from '@msft-sme/shell/angular';
export declare class AlertBarExampleComponent {
    private alertBarService;
    infoAlertSimple: Alert;
    infoAlertIntermediate: Alert;
    infoAlertComplex: Alert;
    warningAlertSimple: Alert;
    warningAlertIntermediate: Alert;
    warningAlertComplex: Alert;
    errorAlertSimple: Alert;
    errorAlertIntermediate: Alert;
    errorAlertComplex: Alert;
    links: AlertLink[];
    message: string;
    title: string;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    /**
     * Initializes a new instance of the {AlertBarExampleComponent} class.
     *
     * @param {AlertBarService} alertBarService The alert service.
     */
    constructor(alertBarService: AlertBarService);
    /**
     * Shows a simple informational alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    onSimpleInformationalClick(id?: string): void;
    /**
     * Shows an intermediate informational alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    onIntermediateInformationalClick(id?: string): void;
    /**
     * Shows a complex informational alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    onComplexInformationalClick(id?: string): void;
    /**
     * Shows a simple warning alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    onSimpleWarningClick(id?: string): void;
    /**
     * Shows an intermediate warning alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    onIntermediateWarningClick(id?: string): void;
    /**
     * Shows a complex warning alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    onComplexWarningClick(id?: string): void;
    /**
     * Shows a simple error alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    onSimpleErrorClick(id?: string): void;
    /**
     * Shows an intermediate error alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    onIntermediateErrorClick(id?: string): void;
    /**
     * Shows a complex error alert.
     *
     * @param {string} [id] The unique identifier of the alert bar to use.
     */
    onComplexErrorClick(id?: string): void;
}
