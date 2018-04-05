import { BaseDialogComponent, DialogCloseReason, DialogOptions, DialogResult, DialogService, GuidedPanelComponent } from '../../../../angular';
import { Strings } from '../../../../generated/strings';
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
    constructor(dialogService: DialogService);
    private createDialogPanes();
    leftButtonClick(): void;
    rightButtonClick(): void;
    getPaneId(index: number): string;
    goToPane(index: number): void;
    closeRequested(reason: DialogCloseReason): void;
}
