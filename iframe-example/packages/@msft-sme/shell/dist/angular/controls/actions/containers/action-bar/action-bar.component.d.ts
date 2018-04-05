import { AfterViewInit, DoCheck, ElementRef, IterableDiffers, Renderer2 } from '@angular/core';
import { ActionItem } from '../../items/action-item.component';
import { ActionContainerComponent } from '../action-container.component';
export declare class ActionBarComponent extends ActionContainerComponent implements DoCheck, AfterViewInit {
    private renderer;
    private hostElement;
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
    private dropDownButtonElement;
    constructor(iterableDiffers: IterableDiffers, renderer: Renderer2, hostElement: ElementRef);
    ngAfterViewInit(): void;
    onWindowResize(event: any): void;
    onActionItemChanged(): void;
    updateActionBar(): void;
}
