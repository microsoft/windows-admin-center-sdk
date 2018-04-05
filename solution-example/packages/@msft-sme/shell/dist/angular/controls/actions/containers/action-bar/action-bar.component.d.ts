import { AfterViewInit, DoCheck, IterableDiffers } from '@angular/core';
import { ActionItem } from '../../items/action-item.component';
import { ActionContainerComponent } from '../action-container.component';
export declare class ActionBarComponent extends ActionContainerComponent implements DoCheck, AfterViewInit {
    displayedActions: ActionItem[];
    trayActions: ActionItem[];
    moreActionsDisplay: string;
    menuDisplayRight: boolean;
    private strings;
    private elementWidth;
    private previousButtonWidth;
    private menuWidth;
    private timer;
    private element;
    private dropDownElement;
    constructor(iterableDiffers: IterableDiffers);
    ngAfterViewInit(): void;
    onWindowResize(event: any): void;
    onActionItemChanged(): void;
    updateActionBar(): void;
}
