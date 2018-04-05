import { ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { DynamicComponentBase } from '../../common/dynamic.component';
import { ActionItem, ActionItemRendererComponent } from './action-item.component';
export declare class DynamicActionItemComponent extends DynamicComponentBase<ActionItemRendererComponent<ActionItem>> {
    private itemRef;
    item: ActionItem;
    itemChanged: EventEmitter<void>;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    protected createComponent(): void;
    private updateOptions(item);
}
