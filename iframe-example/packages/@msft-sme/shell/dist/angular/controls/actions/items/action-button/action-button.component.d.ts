import { AfterViewInit, DoCheck, ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionBarComponent } from '../../containers/action-bar/action-bar.component';
import { ActionItem, ActionItemComponent, ActionItemRendererComponent } from '../action-item.component';
export declare class ActionButton extends ActionItem {
    width: number;
    constructor();
    execute(model?: any): void;
}
export declare class ActionButtonAsync<T> extends ActionButton {
    execute(target?: T): void;
    protected preExecute(target: T): void;
    protected onExecute(target: T): Observable<T>;
    protected postExecute(target: T): void;
}
export declare class ActionButtonRendererComponent extends ActionItemRendererComponent<ActionButton> implements DoCheck {
    private renderer;
    private hostElement;
    element: ElementRef;
    width: number;
    constructor(renderer: Renderer2, hostElement: ElementRef);
    itemChanged(item: ActionButton): void;
    ngDoCheck(): void;
    execute(): void;
}
export declare class ActionButtonComponent extends ActionItemComponent implements AfterViewInit, OnDestroy {
    private actionBarComponent;
    execute: EventEmitter<any>;
    constructor(actionBarComponent: ActionBarComponent);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    protected createActionItem(): ActionButton;
}
