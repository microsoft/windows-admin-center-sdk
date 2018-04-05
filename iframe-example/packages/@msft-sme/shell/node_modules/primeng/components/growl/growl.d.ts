import { ElementRef, AfterViewInit, DoCheck, OnDestroy, EventEmitter, IterableDiffers } from '@angular/core';
import { Message } from '../common/message';
import { DomHandler } from '../dom/domhandler';
export declare class Growl implements AfterViewInit, DoCheck, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    differs: IterableDiffers;
    sticky: boolean;
    life: number;
    style: any;
    styleClass: string;
    immutable: boolean;
    onClick: EventEmitter<any>;
    onClose: EventEmitter<any>;
    valueChange: EventEmitter<Message[]>;
    containerViewChild: ElementRef;
    _value: Message[];
    zIndex: number;
    container: HTMLDivElement;
    timeout: any;
    preventRerender: boolean;
    differ: any;
    constructor(el: ElementRef, domHandler: DomHandler, differs: IterableDiffers);
    ngAfterViewInit(): void;
    value: Message[];
    ngDoCheck(): void;
    handleValueChange(): void;
    clearTrigger(): void;
    remove(index: number, msgel: any): void;
    removeAll(): void;
    onMessageClick(i: number): void;
    ngOnDestroy(): void;
}
export declare class GrowlModule {
}
