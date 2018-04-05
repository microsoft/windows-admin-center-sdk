import { ElementRef } from '@angular/core';
/**
 * Representation of a dropdown. Alternative dropdown implementatins can use this to interface with the dropdown service
 */
export interface Dropdown {
    toggleElement: ElementRef;
    contentElement: ElementRef;
    isOpen: boolean;
    translateX: number;
    translateY: number;
}
