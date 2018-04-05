import { ElementRef } from '@angular/core';
export declare class IconLayerComponent {
    private hostElement;
    /**
     * Input binding for the size of the layer.
     */
    size: number | string;
    /**
     * Input binding for the top position of the layer.
     */
    top: number | string;
    /**
     * Input binding for the left position of the layer.
     */
    left: number | string;
    /**
     * Input binding for the height of the layer.
     */
    height: number | string;
    /**
     * Input binding for the width of the layer.
     */
    width: number | string;
    /**
     * Host element binding for the right position of the layer
     */
    readonly getTop: string;
    /**
     * Host element binding for the left position of the layer
     */
    readonly getLeft: string;
    /**
     * Host element binding for the width of the layer
     */
    readonly getWidth: string;
    /**
     * Host element binding for the height of the layer
     */
    readonly getHeight: string;
    /**
     * Host element binding for the font-size of the icon
     */
    readonly fontSize: string;
    constructor(hostElement: ElementRef);
}
