import { Component } from '@angular/core';
import { EnumConverterPipe, NavigationTitle } from '@msft-sme/angular';
import { Color, ColorEnum } from './color';

@Component({
    selector: 'sme-dev-guide-pipes-enum-converter-example',
    templateUrl: './enum-converter-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'smeEnumConverter'
})
export class EnumConverterExampleComponent {
    public selectedColor = Color.Red;
    public color = ColorEnum;
    public code = {
        componentTs: `export class EnumConverterExampleComponent {
    public selectedColor = Color.Red;
    public color = ColorEnum;

    constructor() {
        // Ideally, this should happen once at the root of your app.
        // However there are no issues registering an enum multiple times.
        EnumConverterPipe.registerEnum(ColorEnum);
    }
}`,
        componentHtml: `<p [style.color]="selectedColor | smeEnumConverter:color.hexColorMap">
  <b>This is the selected color.</b>
</p>

<form>
  <sme-form-field type="combobox" name="color" [(ngModel)]="selectedColor" label="Selected Color">
    <sme-option *ngFor="let colorValue of color.values" [value]="colorValue"
        [label]="colorValue | smeEnumConverter:color.enumId"></sme-option>
  </sme-form-field>
</form>
`,
        colorTs: `import { Strings } from '../../../../../generated/strings';

/**
 * The Color Enumeration
 */
export enum Color {
    Red = 0,
    Blue = 1,
    Green = 2
}

/**
 * The Color Enumeration Extensions
 */
export module ColorEnum {
    /**
     * Extended Enum Interface Implementation
     * The Id of this enum
     */
    export const enumId = 'msft.sme.shell.devGuide.color';

    /**
     * Extended Enum Interface Implementation
     * The value of this enum
     */
    export const values = [Color.Red, Color.Green, Color.Blue];

    /**
     * Mapping of Colors to CSS Hex colors
     */
    export const hexColorMap = new Map<number, string>(
        [
            [Color.Red, '#F00'],
            [Color.Blue, '#00F'],
            [Color.Green, '#0F0']
        ]
    );

    /**
     * Localized enum cache
     */
    let enumStrings: Map<Color, string>;

    /**
     * Gets the enum strings and caches them in enumStrings
     */
    function getEnumStrings(): Map<Color, string> {
        if (!enumStrings) {
            let strings = MsftSme.getStrings<Strings>().MsftSmeShell.DevGuide.Pipes.EnumLocalizer.Color;
            enumStrings = new Map<Color, string>([
                [Color.Red, strings.Red],
                [Color.Blue, strings.Blue],
                [Color.Green, strings.Green]
            ])
        }
        return enumStrings;
    }

    /**
     * Extended Enum Interface Implementation
     * Gets the localized value of this enum
     */
    export function toLocaleString(value: Color): string {
        return getEnumStrings().get(value);
    }

    /**
     * Extended Enum Interface Implementation
     * Gets the raw string value of this enum
     * @param value
     */
    export function toString(value: Color): string {
        return Color[value];
    }

    /**
     * Gets the CSS hex string for the give color
     * @param color the color to get
     */
    export function toHexColor(color: Color): string {
        switch (color) {
            case Color.Red:
                return '#F00'
            case Color.Blue:
                return '#00F'
            case Color.Green:
                return '#0F0'
            default:
                return '#000';
        }
    }
}`
    };

    constructor() {
        // Ideally, this should happen once at the root of your app.
        // However there are no issues registering an enum multiple times.
        EnumConverterPipe.registerEnum(ColorEnum);
    }
}
