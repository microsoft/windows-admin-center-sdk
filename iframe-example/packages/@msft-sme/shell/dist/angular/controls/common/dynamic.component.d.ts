import { ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Type } from '@angular/core';
export declare class DynamicComponentBase<T> implements OnInit, OnDestroy {
    private componentFactoryResolver;
    private container;
    protected componentType: Type<T>;
    protected ref: ComponentRef<T>;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected createComponent(): void;
    protected cleanComponent(): void;
}
