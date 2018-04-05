import { Component, OnInit, QueryList } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {
    AppContextService,
    HealthAlertSeverity,
    PageAlert,
    PageAlertBarComponent    
} from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-page-alert-bar-example',
    template: `
      <sme-page-alert-bar [alert]="criticalAlert"></sme-page-alert-bar>
      <sme-page-alert-bar [alert]="errorAlert"></sme-page-alert-bar>
      <sme-page-alert-bar [alert]="warningAlert"></sme-page-alert-bar>
      <sme-page-alert-bar [alert]="informationalAlert"></sme-page-alert-bar>
    `
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
