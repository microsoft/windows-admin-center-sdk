import { OnChanges, SimpleChanges, Type } from '@angular/core';
import { ActionContainer } from '../containers/action-container';
/**
 * Defines the model of an action item including which renderer to use.
 * The consumer can provide an array of these to the action bar 'actions' attribute.
 */
export declare class ActionItem {
    readonly renderer: Type<any>;
    iconClass: string;
    text: string;
    width: number;
    busy: boolean;
    enabled: boolean;
    hidden: boolean;
    target: any;
    container: ActionContainer;
    ready: boolean;
    constructor(renderer: Type<any>);
    setActionState(target: any, container: ActionContainer): void;
    clearActionState(): void;
    addedToContainer(target: any, container: ActionContainer): void;
    removedFromContainer(): void;
}
/**
 * The base class for the components that actually renders actions.
 * This is refereed to by the 'renderer' property of ActionItem
 * Internally it is used by the DynamicActionItemComponent to create an action item
 *
 */
export declare class ActionItemRendererComponent<T extends ActionItem> {
    item: T;
    itemChanged(item: T): void;
}
/**
 * Provides the ability to add action items from html best for simple scenarios without a complex command model
 */
export declare abstract class ActionItemComponent implements OnChanges {
    enabled: boolean;
    text: string;
    iconClass: string;
    action: ActionItem;
    constructor();
    protected abstract createActionItem(): ActionItem;
    ngOnChanges(changes: SimpleChanges): void;
}
