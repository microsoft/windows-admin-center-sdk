import { OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AlertBarService, AppContextService, BaseDialogComponent, DialogOptions, DialogResult, DialogService, GuidedPanelComponent } from '../../../../angular';
import { AuthorizationCredentials, Connection, EnvironmentModuleEntryPoint } from '../../../../core';
import { AddConnectionFrameComponent } from './add-connection-frame/add-connection-frame.component';
/**
 * The Add Connection dialog options.
 */
export interface AddConnectionDialogOptions extends DialogOptions {
    connectionTypes?: string[];
}
/**
 * The manage as dialog result.
 */
export interface AddConnectionDialogResult extends DialogResult {
    /**
     * The new connections to add
     */
    connections?: Connection[];
    /**
     * The tags to add to all the new connections
     */
    tags?: string[];
    /**
     * The credentials to use for these connections
     */
    credentials?: AuthorizationCredentials;
}
export declare class AddConnectionDialogComponent extends BaseDialogComponent<AddConnectionDialogOptions, AddConnectionDialogResult> implements OnInit {
    private appContextService;
    static dialogId: string;
    strings: {
        title: string;
        typeTitleFormat: string;
        sideLoadWarning: string;
        tags: {
            label: string;
        };
        buttons: {
            cancel: string;
        };
    };
    connectionProviders: EnvironmentModuleEntryPoint[];
    selectedProvider: EnvironmentModuleEntryPoint;
    tags: string[];
    tagSuggestions: string[];
    panel: GuidedPanelComponent;
    addConnectionFrame: AddConnectionFrameComponent;
    private allConnectionProviders;
    static addConnection(dialogService: DialogService, appContextService: AppContextService, alertBarService: AlertBarService, options: AddConnectionDialogOptions): void;
    /**
     * Initializes a new instance of the AddConnectionDialogComponent class.
     */
    constructor(appContextService: AppContextService, dialogService: DialogService);
    ngOnInit(): void;
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    show(options: AddConnectionDialogOptions): Subject<AddConnectionDialogResult>;
    openConnectionType(connectionProvider: EnvironmentModuleEntryPoint): void;
    closeConnectionType(): void;
    hide(result: AddConnectionDialogResult): void;
    /**
     * The method to call when the cancel button is clicked.
     */
    onCancel(): void;
}
