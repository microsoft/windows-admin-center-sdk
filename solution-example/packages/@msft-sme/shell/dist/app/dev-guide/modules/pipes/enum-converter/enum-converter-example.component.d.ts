import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '../../../../../angular';
export declare enum color {
    Red = 0,
    Blue = 1,
    Green = 2,
}
export declare class EnumConverterExampleComponent {
    value: color;
    colorEnum: typeof color;
    colors: color[];
    colorMap: Map<number, string>;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
}
