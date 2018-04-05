import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { AppContextService, BaseDialogComponent, DialogOptions, DialogResult, DialogService, GuidedPanelComponent } from '../../../../angular';
import { Strings } from '../../../../generated/strings';
export declare class AboutDialogComponent extends BaseDialogComponent<DialogOptions, DialogResult> implements OnDestroy {
    private appContextService;
    panel: GuidedPanelComponent;
    gatewayVersion: string;
    gatewayError: string;
    statusSubscription: Subscription;
    privacyLink: string;
    strings: Strings;
    /**
     * Initializes a new instance of the Help Pane class.
     */
    constructor(dialogService: DialogService, appContextService: AppContextService);
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    show(options: DialogOptions): Subject<DialogResult>;
    private getGatewayInventory();
    ngOnDestroy(): void;
}
