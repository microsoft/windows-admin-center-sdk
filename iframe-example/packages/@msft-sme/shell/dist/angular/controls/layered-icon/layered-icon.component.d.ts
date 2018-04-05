import { ElementRef } from '@angular/core';
export declare class LayeredIconComponent {
    private hostElement;
    /**
     * Input binding for the size of the icon.
     * this is a css size string or number of pixels
     */
    size: number | string;
    /**
     * Host element binding for the width of the icon
     */
    readonly width: string;
    /**
     * Host element binding for the height of the icon
     */
    readonly height: string;
    /**
     * Host element binding for the font-size of the icon
     */
    readonly fontSize: string;
    constructor(hostElement: ElementRef);
}
