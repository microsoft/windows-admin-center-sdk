import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-controls-yesno-converter-example',
    templateUrl: './yesno-converter-example.component.html'
})
export class YesNoConverterExampleComponent {
    public checked = true;

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'smeBooleanToYesNoConverter';
    }
}
