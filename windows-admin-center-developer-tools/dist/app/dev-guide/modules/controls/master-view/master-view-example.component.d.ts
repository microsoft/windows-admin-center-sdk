import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';
export declare class MasterViewExampleComponent {
    groupByOptions: {
        displayName: string;
        field: string;
    }[];
    groupField: string;
    active: boolean;
    items: any[];
    selection: any;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor();
    alert(arg: string): void;
    onDropdownChange(field: string): void;
}
