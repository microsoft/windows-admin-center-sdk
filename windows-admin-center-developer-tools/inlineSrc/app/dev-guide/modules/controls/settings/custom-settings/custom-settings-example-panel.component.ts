import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'sme-ng2-controls-custom-settings-example-panel',
    template: `
      <div>{{settingName}}</div>
    `
})
export class CustomSettingsExamplePanelComponent implements OnInit, OnDestroy {
    public subscription: Subscription;
    public settingName = 'NotConfiguredSettingName';
    constructor(private activatedRoute: ActivatedRoute) {
    }

    public ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.settingName = params['settingName'].toString();
        });
    }

    public ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
