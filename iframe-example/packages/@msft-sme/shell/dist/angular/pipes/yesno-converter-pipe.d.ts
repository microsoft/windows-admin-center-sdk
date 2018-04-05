import { PipeTransform } from '@angular/core';
export declare class YesNoConverterPipe implements PipeTransform {
    private strings;
    transform(value: boolean): string;
}
