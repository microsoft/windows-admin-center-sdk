import { PipeTransform } from '@angular/core';
export declare class FilterPipe implements PipeTransform {
    private tmp;
    transform(value: Array<any>, filter: string | MsftSme.Func1<any, boolean>, not?: any): Array<any>;
}
