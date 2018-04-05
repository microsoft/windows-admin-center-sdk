import { OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService, PageAlert } from '../../../../../angular';
export declare class PageAlertbarExampleComponent implements OnInit {
    criticalAlert: PageAlert;
    errorAlert: PageAlert;
    warningAlert: PageAlert;
    informationalAlert: PageAlert;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    ngOnInit(): void;
}
