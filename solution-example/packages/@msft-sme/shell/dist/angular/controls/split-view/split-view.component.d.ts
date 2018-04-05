import { AfterContentInit, EventEmitter } from '@angular/core';
import { Layout } from '../common/interfaces';
/**
 * The pane orientation of the split view.
 */
export declare type SplitViewOrientation = 'top' | 'left' | 'right' | 'bottom';
/**
 * The component definition of the split view content.
 */
export declare class SplitViewContentComponent {
}
/**
 * The component definition of the split view pane.
 */
export declare class SplitViewPaneComponent {
}
/**
 * The component definition of the split view.
 */
export declare class SplitViewComponent implements AfterContentInit, Layout {
    /**
     * It implements the ILayout interface. It's triggered when the layout is changed.
     * It's used to tell the child components to coordate with the layout change.
     */
    layoutChanged: EventEmitter<void>;
    /**
     * The content of the component.
     */
    content: SplitViewContentComponent;
    /**
     * The pane of the component.
     */
    pane: SplitViewPaneComponent;
    /**
     * Gets the CSS classes of the component.
     */
    readonly hostClass: string;
    /**
     * Gets the flex direction of the component.
     */
    readonly flexDirection: string;
    /**
     * Whether the pane is expanded.
     */
    isExpanded: boolean;
    private internalIsExpanded;
    /**
     * The orientation of the pane.
     */
    orientation: SplitViewOrientation;
    /**
     * The event fired when the pane's expanded state is being toggled.
     */
    paneToggling: EventEmitter<{
        isExpanded: boolean;
    }>;
    /**
     * The event fired when the pane's expanded state has been toggled.
     */
    paneToggled: EventEmitter<{
        isExpanded: boolean;
    }>;
    /**
     * The method called after content is initialized.
     */
    ngAfterContentInit(): void;
    onWindowResized(): void;
    /**
     * Toggles the expanded state of the pane.
     */
    togglePane(): void;
}
