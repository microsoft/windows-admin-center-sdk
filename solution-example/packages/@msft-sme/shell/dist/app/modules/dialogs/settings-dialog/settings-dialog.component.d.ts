import { OnInit } from '@angular/core';
import { AppContextService, BaseDialogComponent, DialogOptions, DialogResult, DialogService } from '../../../../angular';
import { Strings } from '../../../../generated/Strings';
export declare class SettingsDialogComponent extends BaseDialogComponent<DialogOptions, DialogResult> implements OnInit {
    private appContextService;
    currentLocale: any;
    supportedLocales: any;
    hasExtensionsSolution: boolean;
    isExtensionsisSideLoaded: boolean;
    extensionsSolutionIcon: string;
    extensionsSolutionFontIcon: string;
    extensionsSolutionLink: string;
    strings: Strings;
    /**
     * Initializes a new instance of the Settings Pane class.
     */
    constructor(dialogService: DialogService, appContextService: AppContextService);
    ngOnInit(): void;
    setLocale(localeIndex: number): void;
    private getCurrentLocaleName();
}
