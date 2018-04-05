import { BaseDialogComponent, DialogCloseReason, DialogOptions, DialogResult, DialogService, GuidedPanelComponent } from '../../../../angular';
import { Strings } from '../../../../generated/strings';
import { ShellService } from '../../../shell.service';
export declare class DayZeroDialogPane {
    paneId: string;
    gifPath: string;
    title: string;
    subtext: string;
    secondarySubtext: string;
    leftButtonText: string;
    rightButtonText: string;
}
export declare class DayZeroDialogComponent extends BaseDialogComponent<DialogOptions, DialogResult> {
    shellService: ShellService;
    static dayZeroDialogComponentId: string;
    static gifs: string[];
    static numberOfPanes: number;
    panel: GuidedPanelComponent;
    dialogPanes: DayZeroDialogPane[];
    strings: Strings;
    private currentIndex;
    /**
     * Initializes a new instance of the Day Zero Dialog class.
     */
    constructor(shellService: ShellService, dialogService: DialogService);
    private createDialogPanes();
    leftButtonClick(): void;
    rightButtonClick(): void;
    getPaneId(index: number): string;
    goToPane(index: number): void;
    closeRequested(reason: DialogCloseReason): void;
}
