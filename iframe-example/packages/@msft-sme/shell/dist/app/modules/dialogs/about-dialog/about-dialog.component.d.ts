import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { AppContextService, DialogOptions, DialogResult, DialogService, GuidedPanelComponent } from '../../../../angular';
import { Strings } from '../../../../generated/strings';
import { ShellService } from '../../../shell.service';
import { AppBarBaseDialogComponent } from '../app-bar-dialog.component';
export declare class AboutDialogComponent extends AppBarBaseDialogComponent<DialogOptions, DialogResult> implements OnDestroy {
    private appContextService;
    private shellService;
    panel: GuidedPanelComponent;
    gatewayVersion: string;
    gatewayError: string;
    isUpdateAvailable: boolean;
    statusSubscription: Subscription;
    privacyLink: string;
    strings: Strings;
    /**
     * Initializes a new instance of the Help Pane class.
     */
    constructor(dialogService: DialogService, appContextService: AppContextService, shellService: ShellService);
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
