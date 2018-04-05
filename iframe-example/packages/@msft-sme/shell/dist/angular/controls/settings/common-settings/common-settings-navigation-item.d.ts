import { FormGroup } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
export interface CommonSettingsNavigationItem {
    routeParams: {
        commands: any[];
        extras?: NavigationExtras;
    };
    label: string;
    smeIconClassName: string;
}
export interface CommonSettingsNavigationItemWithForm extends CommonSettingsNavigationItem {
    form: FormGroup;
    updateValueInComponent: boolean;
}
