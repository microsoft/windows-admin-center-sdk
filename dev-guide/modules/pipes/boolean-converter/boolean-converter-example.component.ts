import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-controls-boolean-converter-example',
    templateUrl: './boolean-converter-example.component.html'
})
export class BooleanConverterExampleComponent {
    public checked = true;
    public checkedMap: Map<boolean, string> = new Map<boolean, string>(
        [[true, 'The box is checked'], [false, 'The box is unchecked']]
    );

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'smeBooleanConverter';
    }
}
