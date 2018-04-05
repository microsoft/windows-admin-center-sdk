import { BaseFormData } from '../../../../../../../angular';
export interface Address {
    city: string;
    street: string;
    state: string;
    zipCode: number;
}
export interface IsolatedSettings4ServiceData {
    addresses: Address[];
    name: string;
    salary: number;
}
export declare class IsolatedSetting4FormData extends BaseFormData<IsolatedSettings4ServiceData> {
    addresses: Address[];
    name: string;
    salary: number;
    constructor(dataModel: IsolatedSettings4ServiceData);
    applyUpdatesToModel(target: IsolatedSettings4ServiceData): void;
    convertToModel(): IsolatedSettings4ServiceData;
    initializeFromModel(): void;
}
