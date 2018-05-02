// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { BaseFormData } from '@microsoft/windows-admin-center-sdk/angular';

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

export class IsolatedSetting4FormData extends BaseFormData<IsolatedSettings4ServiceData> {
    public addresses: Address[];
    public name: string;
    public salary: number;

    constructor(dataModel: IsolatedSettings4ServiceData) {
        super(dataModel);
    }

    public applyUpdatesToModel(target: IsolatedSettings4ServiceData): void {
        target.addresses = this.addresses;
        target.name = this.name;
        target.salary = this.salary;
    }

    public convertToModel(): IsolatedSettings4ServiceData {
        let newModel: IsolatedSettings4ServiceData = <any>{};
        Object.assign(newModel, this.dataModel);
        this.applyUpdatesToModel(newModel);

        return newModel;
    }

    public initializeFromModel(): void {
        this.addresses = this.dataModel.addresses;
        this.name = this.dataModel.name;
        this.salary = this.dataModel.salary;
    }
}
