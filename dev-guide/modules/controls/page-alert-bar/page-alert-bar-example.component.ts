import { Component } from '@angular/core';
import { HealthAlertSeverity, PageAlert } from '@msft-sme/angular';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-page-alert-bar',
    templateUrl: './page-alert-bar-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Page Alert Bar Component'
})
export class PageAlertBarExampleComponent {
    public alerts: PageAlert[] = [{
        severity: HealthAlertSeverity.Critical,
        message: 'A sample critical Alert',
        detailsCommand: event => alert('alert details: critical'),
        detailsCaption: 'Details'
    }, {
        severity: HealthAlertSeverity.Error,
        message: 'A sample Error Alert',
        detailsCommand: event => alert('alert details: Error'),
        detailsCaption: 'alert Details'
    }, {
        severity: HealthAlertSeverity.Warning,
        // tslint:disable-next-line:max-line-length
        message: 'A sample really long Warning Alert A sample really long Warning Alert A sample really long Warning Alert A sample really long Warning Alert A sample really long Warning Alert A sample really long Warning Alert A sample really long Warning Alert ',
        detailsCommand: event => alert('alert details: Warning'),
        detailsLabel: 'Details'
    }, {
        severity: HealthAlertSeverity.Progress,
        message: 'A sample Progress Alert',
        detailsCommand: event => alert('alert details: Progress')
    }, {
        severity: HealthAlertSeverity.Info,
        message: 'A sample Info Alert',
        detailsCommand: event => alert('alert details: Informational')
    }, {
        severity: HealthAlertSeverity.Success,
        message: 'A sample Success Alert',
        detailsCommand: event => alert('alert details: Success')
    }, {
        severity: HealthAlertSeverity.Neutral,
        message: 'A sample Neutral Alert',
        detailsCommand: event => alert('alert details: Neutral')
    }, {
        severity: HealthAlertSeverity.Upsell,
        message: 'A sample Upsell Alert',
        detailsCommand: event => alert('alert details: Upsell'),
        detailsLabel: 'Custom Detail Message'
    }
    ];
}
