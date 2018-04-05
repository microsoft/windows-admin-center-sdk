import { PipeTransform } from '@angular/core';
export declare class EnumConverterPipe implements PipeTransform {
    transform(value: number, args: Map<number, string>): string;
}
