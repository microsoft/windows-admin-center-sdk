import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DropdownService } from './dropdown.service';
import { Dropdown } from './models';
/**
 * Component to create an dropdown
 */
export declare class DropdownComponent implements OnDestroy, OnInit, Dropdown {
    private renderer;
    private element;
    private dropdownService;
    /**
     * Event Emitter for when the dropdown opens or closes. Emits a boolean to indicate if the dropdown is open
     */
    onToggled: EventEmitter<boolean>;
    /**
     * It indicates should the drop down menu aligns to right of the UI.
     */
    alignToRight: boolean;
    /**
     * The content element. This must be provided by the DropdownContentDirective or possibly some custom implementation
     */
    contentElement: ElementRef;
    /**
     * The toggle element. This must be provided by the DropdownToggleDirective or possibly some custom implementation
     */
    toggleElement: ElementRef;
    /**
     * Indicates the open state of the dropdown
     */
    isOpen: boolean;
    /**
     * Indicates how far the dropdown content has been translated to remain fully on screen
     */
    translateX: number;
    /**
     * Indicates how far the dropdown content has been translated to remain fully on screen
     */
    translateY: number;
    /**
     * Indicates that dropdown should be disabled.
     */
    private disabled;
    private unsubscribeToggleClick;
    /**
     * Initializes a new instance of the DropdownDirective
     * @param dropdownService
     */
    constructor(renderer: Renderer2, element: ElementRef, dropdownService: DropdownService);
    /**
     * Angulars On Init Lifecycle Hook
     */
    ngOnInit(): void;
    /**
     * Angulars On Destroy Lifecycle Hook
     */
    ngOnDestroy(): void;
    /**
     * Opens this dropdown
     */
    open(): void;
    /**
     * Closes this dropdown
     */
    close(): void;
    /**
     * Toggles the dropdown
     * @param open Optional. If provided, forces the dropdown open or closed.
     */
    toggle(open?: boolean): void;
    /**
     * Handler for the click event for the toggle element
     * @param event the mouse event of the click
     */
    private onToggleClick(event);
}
