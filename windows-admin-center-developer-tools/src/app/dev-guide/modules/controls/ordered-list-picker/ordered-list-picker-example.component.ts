// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

export interface MyObject {
    name: string;
}

@Component({
    selector: 'sme-ng2-controls-ordered-list-picker-example',
    templateUrl: './ordered-list-picker-example.component.html',
    styleUrls: [ './ordered-list-picker-example.component.css' ]
})
export class OrderedListPickerExampleComponent {
    public complexAllOptions: MyObject[];
    public complexPickerDisabled: boolean;
    public complexSelectedOptions: MyObject[];

    public largeOptions: string[];
    public largeOptionsSelection: string[];

    public primitiveAllOptions: string[];
    public primitivePickerDisabled: boolean;
    public primitiveSelectedOptions: string[];

    private counter = 65;

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-ordered-list-picker';
    }

    public equals: (a: MyObject, b: MyObject) => boolean = (a: MyObject, b: MyObject) => a.name === b.name;

    constructor() {
        const myObject1: MyObject = {
            name: 'Jason'
        };

        const myObject2: MyObject = {
            name: 'Joey'
        };

        this.complexPickerDisabled = false;
        this.complexSelectedOptions = [myObject1, myObject2];
        this.complexAllOptions = [
            myObject1,
            myObject2,
            {
                name: 'Holly'
            },
            {
                name: 'Jerry'
            }, {
                name: 'Zack'
            },
            {
                name: 'Linda'
            }
        ];

        const myPrimitive1 = 'Jason';
        const myPrimitive2 = 'Joey';
        this.primitivePickerDisabled = false;
        this.primitiveSelectedOptions = [myPrimitive1, myPrimitive2];
        this.primitiveAllOptions = [
            myPrimitive1,
            myPrimitive2,
            'Kathy',
            'Linda',
            'Billy'
        ];

        this.largeOptionsSelection = [];
        this.largeOptions = [];
        for (let i = 0; i < 100; i++) {
            this.largeOptions.push(i.toString());
        }
    }

    public addToComplexNgModel(): void {
        let str = String.fromCharCode(this.counter++);
        let obj: MyObject = {
            name: str
        };

        this.complexSelectedOptions.push(obj);
        this.complexAllOptions.push(obj);
    }

    public addToPrimitiveNgModel(): void {
        let str = String.fromCharCode(this.counter++);

        this.primitiveSelectedOptions.push(str);
        this.primitiveAllOptions.push(str);
    }

    public addToComplexAllOptions(): void {
        let str = String.fromCharCode(this.counter++);
        this.complexAllOptions.push({
            name: str
        });
    }

    public addToPrimitiveAllOptions(): void {
        let str = String.fromCharCode(this.counter++);
        this.primitiveAllOptions.push(str);
    }

    public onComplexValueChanged(event: any): void {
        console.log(event);
    }

    public removeFromComplexNgModel(): void {
        let target = this.complexSelectedOptions[this.complexSelectedOptions.length - 1];
        MsftSme.remove(this.complexSelectedOptions, target);
    }

    public removeFromPrimitiveNgModel(): void {
        let target = this.primitiveSelectedOptions[this.primitiveSelectedOptions.length - 1];
        MsftSme.remove(this.primitiveSelectedOptions, target);
    }

    public removeFromComplexAllOptions(): void {
        let target = this.complexAllOptions[this.complexAllOptions.length - 1];
        MsftSme.remove(this.complexAllOptions, target);
        MsftSme.remove(this.complexSelectedOptions, target);
    }

    public removeFromPrimitiveAllOptions(): void {
        let target = this.primitiveAllOptions[this.primitiveAllOptions.length - 1];
        MsftSme.remove(this.primitiveAllOptions, target);
        MsftSme.remove(this.primitiveSelectedOptions, target);
    }

    public toggleComplexDisabled(): void {
        this.complexPickerDisabled = !this.complexPickerDisabled;
    }

    public togglePrimitiveDisabled(): void {
        this.primitivePickerDisabled = !this.primitivePickerDisabled;
    }
}
