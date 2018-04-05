import { PipeTransform } from '@angular/core';
export declare class HighlightPipe implements PipeTransform {
    transform(attribute: any, search: string, highlightClass?: string): string;
}
