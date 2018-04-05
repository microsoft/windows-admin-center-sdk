import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

export enum color {
    Red = 0,
    Blue = 1,
    Green = 2
}

@Component({
    selector: 'sme-ng2-controls-enum-converter-example',
    template: `
      <div class="p-xxs tool-container">
          <div>
              <label>enum-converter input</label>
              <select [(ngModel)]="value">
                  <option [ngValue]="i" *ngFor="let i of colors">{{i}} - {{colorEnum[i]}}</option>
              </select>
          </div>
          <div>
              <span>Default Output:</span>
              <span style="font-weight: bold">{{ value | smeEnumConverter }}</span>
          </div>
          <div>
              <span>Mapped Pipe Output:</span>
              <span style="font-weight: bold" [style.color]="value | smeEnumConverter : colorMap">{{ value | smeEnumConverter : colorMap }}</span>
          </div>
      </div>
    `
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