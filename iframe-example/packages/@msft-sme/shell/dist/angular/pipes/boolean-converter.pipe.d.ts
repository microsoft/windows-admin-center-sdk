import { PipeTransform } from '@angular/core';
export declare class BooleanConverterPipe implements PipeTransform {
    transform(value: boolean, args: Map<boolean, string>): string;
}
