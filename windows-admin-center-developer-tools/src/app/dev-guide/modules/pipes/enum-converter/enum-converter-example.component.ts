// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';

export enum color {
    Red = 0,
    Blue = 1,
    Green = 2
}

@Component({
    selector: 'sme-ng2-controls-enum-converter-example',
    templateUrl: './enum-converter-example.component.html'
})
export class EnumConverterExampleComponent {
    public value: color = color.Red;
    public colorEnum = color;
    public colors = [color.Red, color.Blue, color.Green];
    public colorMap: Map<number, string> = new Map<number, string>(
        [
            [color.Red, '#F00'],
            [color.Blue, '#00F'],
            [color.Green, '#0F0']
        ]
    );
    
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'smeEnumConverter';
    }
}