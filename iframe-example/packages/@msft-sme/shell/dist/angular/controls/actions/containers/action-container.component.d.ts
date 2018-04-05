import { AfterContentInit, DoCheck, EventEmitter, IterableDiffers, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ActionItem, ActionItemComponent } from '../items/action-item.component';
import { ActionContainer, ActionItemExecutedEventArgs } from './action-container';
export declare class ActionContainerComponent implements AfterContentInit, DoCheck, OnInit, OnDestroy, ActionContainer {
    private iterableDiffers;
    childActions: QueryList<ActionItemComponent>;
    actions: ActionItem[];
    target: any;
    enabled: boolean;
    error: EventEmitter<any>;
    executed: EventEmitter<ActionItemExecutedEventArgs>;
    readonly isBusy: boolean;
    combinedActions: ActionItem[];
    internalActions: ActionItem[];
    inlineActions: ActionItem[];
    private enabledInternal;
    private internalTarget;
    private actionsDiffer;
    private wasBusy;
    private completedSubscription;
    constructor(iterableDiffers: IterableDiffers);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    /**
     * Angular's doCheck life cycle hook. Note there is an odd condition when trying to create dynamic toolbar items inline with ng for.
     * Somehow  this method is not getting called in time to initialize the button that is created by the ng for statement.
     * Needs more investigation
     */
    ngDoCheck(): void;
    updateActionStates(): void;
    private updateActions();
}
