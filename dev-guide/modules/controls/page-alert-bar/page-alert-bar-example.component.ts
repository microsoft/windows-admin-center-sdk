import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { HealthAlertSeverity, PageAlert } from '@msft-sme/angular';
import { AppContextService } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-controls-page-alert-bar-example',
    templateUrl: './page-alert-bar-example.component.html'
})
export class PageAlertbarExampleComponent implements OnInit {
    public criticalAlert: PageAlert;
    public errorAlert: PageAlert;
    public warningAlert: PageAlert;
    public informationalAlert: PageAlert;

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-page-bar-alert';
    }

    public ngOnInit() {
        this.criticalAlert = <PageAlert> {
            severity: HealthAlertSeverity.Critical,
            message: 'A sample critical Alert',
            detailsCommand: event => alert('alert details: critical'),
            detailsCaption: 'alert Details'
        };

        this.errorAlert = <PageAlert> {
            severity: HealthAlertSeverity.Major,
            message: 'A sample Error Alert',
            detailsCommand: event => alert('alert details: error'),
            detailsCaption: 'alert Details',
            detailsLabel: 'Error Details'
        };
        this.warningAlert = <PageAlert> {
            severity: HealthAlertSeverity.Minor,
            message: 'A sample Warning Alert',
            detailsCommand: event => alert('alert details: warning'),
            detailsLabel: 'Warning Details'
        };
        this.informationalAlert = <PageAlert> {
            severity: HealthAlertSeverity.Cosmetic,
            message: 'A sample Info Alert',
            detailsCommand: event => alert('alert details: Informational')
        };
    }
}
