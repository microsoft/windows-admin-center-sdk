import { ElementRef, Renderer2 } from '@angular/core';
import { AppContextService } from '../../../angular';
import { BaseComponent } from './base.component';
/**
 * A base class to bootstrap control components.
 * The difference between this and BaseComponent is that this class is geared toward components that do DOM manipulation.
 * Whereas most normal components do not directly manipulate the dom and can just use BaseComponent
 * @template TResourceStrings The typed interface for resource strings.
 */
export declare abstract class BaseControl<TStrings> extends BaseComponent<TStrings> {
    protected renderer: Renderer2;
    protected hostElement: ElementRef;
    /**
     * Initializes a new instance of the {BaseControl} class.
     *
     * @param {AppContextService} appContextService The app context service.
     */
    constructor(renderer: Renderer2, hostElement: ElementRef, appContextService: AppContextService);
    /**
     * Gets the initial host classes to be applied to this element
     */
    protected getInitialHostClasses(): string[];
    /**
     * Applies the initial classes to this components host element.
     * We preserve any custom classes by removing them, applying the base classes and reapplying the custom classes.
     */
    private applyInitialHostClasses();
}
