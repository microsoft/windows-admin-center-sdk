import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppContextService, AuthorizationService, BaseDialogComponent, DialogOptions, DialogResult, DialogService, NodeCredentialsFormComponent } from '../../../../angular';
import { AuthorizationCredentials } from '../../../../core';
import { Strings } from '../../../../generated/strings';
/**
 * The manage as dialog options.
 */
export interface ManageAsDialogOptions extends DialogOptions {
    /**
     * The node names to look up credentials for
     */
    nodeNames: string[];
}
/**
 * The manage as dialog result.
 */
export interface ManageAsDialogResult extends DialogResult {
    /**
     * Indication of the users choice to continue with a failed authorization.
     */
    continue: boolean;
    /**
     * The new credentials
     */
    credentials?: AuthorizationCredentials;
}
/**
 * TODO: While this dialog works for current scenarios, we will need to think broader when non-node connections come into play.
 * One option would be to treat this dialog similar to the add-connection dialog and let connection providers
 * also provide the authentication mechanism for those connections
 */
export declare class ManageAsDialogComponent extends BaseDialogComponent<ManageAsDialogOptions, ManageAsDialogResult> implements OnInit {
    private appContextService;
    private authorizationService;
    message: string;
    creds: AuthorizationCredentials;
    checkingCredentials: boolean;
    showCheckingCredentials: boolean;
    credentialsError: string;
    strings: Strings;
    private nodeNames;
    credentialsForm: NodeCredentialsFormComponent;
    /**
     * Initializes a new instance of the ManageAsDialogComponent class.
     */
    constructor(dialogService: DialogService, appContextService: AppContextService, authorizationService: AuthorizationService);
    ngOnInit(): void;
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    show(options: ManageAsDialogOptions): Subject<ManageAsDialogResult>;
    onCredentialsChanged(creds: AuthorizationCredentials): void;
    /**
     * The method to call when the confirm button is clicked.
     */
    onContinue(): void;
    /**
     * The method to call when the cancel button is clicked.
     */
    onCancel(): void;
}
