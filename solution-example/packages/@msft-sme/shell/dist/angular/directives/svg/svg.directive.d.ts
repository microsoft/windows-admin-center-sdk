import { ElementRef } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ResourceService } from '../../service';
/**
 * SVG image directive to place SVG image at background-image by CSS style class.
 */
export declare class SvgDirective {
    private elementRef;
    private resourceService;
    /**
     * Initializes a new instance of the SvgDirective class.
     *
     * @param elementRef the element reference.
     * @param resourceService the resource service.
     */
    constructor(elementRef: ElementRef, resourceService: ResourceService);
    /**
     * Set "smeSvg" input as id string of SVG resource.
     *
     * @param id The identification of SVG resource.
     */
    smeSvg: string;
}
/**
 * SVG image directive to place SVG image as inline into the element.
 */
export declare class SvgInlineDirective {
    private viewContainer;
    private resourceService;
    /**
     * Initializes a new instance of the SvgInlineDirective class.
     *
     * @param viewContainer the view container reference.
     * @param resourceService the resource service.
     */
    constructor(viewContainer: ViewContainerRef, resourceService: ResourceService);
    smeSvgInline: string;
}
