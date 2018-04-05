import { ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class Tooltip implements OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    tooltipPosition: string;
    tooltipEvent: string;
    appendTo: any;
    positionStyle: string;
    tooltipStyleClass: string;
    disabled: boolean;
    escape: boolean;
    showDelay: number;
    hideDelay: number;
    container: any;
    styleClass: string;
    tooltipText: any;
    showTimeout: any;
    hideTimeout: any;
    documentResizeListener: Function;
    active: boolean;
    _text: string;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2);
    onMouseEnter(e: Event): void;
    onMouseLeave(e: Event): void;
    onFocus(e: Event): void;
    onBlur(e: Event): void;
    activate(): void;
    deactivate(): void;
    text: string;
    create(): void;
    show(): void;
    hide(): void;
    updateText(): void;
    align(): void;
    getHostOffset(): {
        left: any;
        top: any;
    };
    alignRight(): void;
    alignLeft(): void;
    alignTop(): void;
    alignBottom(): void;
    preAlign(): void;
    isOutOfBounds(): boolean;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    destroy(): void;
    ngOnDestroy(): void;
}
export declare class TooltipModule {
}
