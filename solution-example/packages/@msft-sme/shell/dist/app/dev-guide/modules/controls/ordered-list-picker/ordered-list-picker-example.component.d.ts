import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '../../../../../angular';
export interface MyObject {
    name: string;
}
export declare class OrderedListPickerExampleComponent {
    complexAllOptions: MyObject[];
    complexPickerDisabled: boolean;
    complexSelectedOptions: MyObject[];
    largeOptions: string[];
    largeOptionsSelection: string[];
    primitiveAllOptions: string[];
    primitivePickerDisabled: boolean;
    primitiveSelectedOptions: string[];
    private counter;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    equals: (a: MyObject, b: MyObject) => boolean;
    constructor();
    addToComplexNgModel(): void;
    addToPrimitiveNgModel(): void;
    addToComplexAllOptions(): void;
    addToPrimitiveAllOptions(): void;
    onComplexValueChanged(event: any): void;
    removeFromComplexNgModel(): void;
    removeFromPrimitiveNgModel(): void;
    removeFromComplexAllOptions(): void;
    removeFromPrimitiveAllOptions(): void;
    toggleComplexDisabled(): void;
    togglePrimitiveDisabled(): void;
}
