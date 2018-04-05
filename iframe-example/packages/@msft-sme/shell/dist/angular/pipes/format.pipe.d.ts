import { PipeTransform } from '@angular/core';
export interface FormatPipeLink {
    text: string;
    href: string;
    target?: string;
}
export declare type FormatPipeValue = string | FormatPipeLink;
export declare class FormatPipe implements PipeTransform {
    transform(format: string, values?: FormatPipeValue | FormatPipeValue[]): string;
}
