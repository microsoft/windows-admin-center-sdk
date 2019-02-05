import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-colors',
    templateUrl: './colors.component.html'
})
export class ColorsComponent {

    public namedColors = [
        'base', 'alt', 'accent', 'blue-base', 'purple-base',
        'magenta-base', 'red-base', 'orange-base', 'yellow-base',
        'green-base', 'teal-base', 'dark-blue-base', 'blue-alt',
        'purple-alt', 'magenta-alt', 'red-alt', 'orange-alt',
        'yellow-alt', 'green-alt', 'teal-alt', 'dark-blue-alt'
    ];
    public baseColors = ['white', 'black', 'blue', 'purple', 'magenta', 'red', 'orange', 'yellow', 'green', 'teal', 'dark-blue'];
    public mixes = [90, 80, 70, 60, 50, 40, 30, 20, 15, 10, 5];

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Colors';
    }

    public getColorName(color: string) {
        return color.charAt(0).toUpperCase() + color.slice(1);
    }

    public getColorClasses(color: string, mix?: number) {
        const classString = mix ? `${color}-${mix}` : color;
        return `.sme-color-${classString}
.sme-background-color-${classString}
.sme-border-color-${classString}
.sme-border-top-color-${classString}
.sme-border-left-color-${classString}
.sme-border-bottom-color-${classString}
.sme-border-right-color-${classString}`;
    }
}
