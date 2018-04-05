import { EventEmitter, OnInit } from '@angular/core';
import { AuthorizationCredentials } from '../../../core';
import { Strings } from '../../../generated/strings';
import { AppContextService } from '../../service';
export declare class NodeCredentialsFormComponent implements OnInit {
    private appContextService;
    strings: Strings;
    isServiceMode: boolean;
    hasPerNodeCredentials: boolean;
    globalUsername: string;
    /**
     * Gets or sets the Username
     */
    username: string;
    /**
     * Gets or sets the password
     */
    password: string;
    /**
     * Gets or sets a value indicating if these settings should be applied to all nodes
     */
    applyToAll: boolean;
    /**
     * Gets or sets a value indicating if LAPS should be used
     */
    useLaps: boolean;
    /**
     * Gets or sets the laps Local Admin Name
     */
    lapsLocalAdminName: string;
    /**
     * Gets or sets a value indicating if global auth should be used
     */
    useGlobalAuth: boolean;
    /**
     * Model to hold internal form field values;
     */
    private model;
    credentialsChanged: EventEmitter<AuthorizationCredentials>;
    showApplyToAll: boolean;
    /**
     * Initializes a new instance of the NodeCredentialsForm class.
     */
    constructor(appContextService: AppContextService);
    /**
     * Angular component initialization method
     */
    ngOnInit(): void;
    reset(nodeName: string): void;
    updateAuthorizationCredentials(): void;
}
