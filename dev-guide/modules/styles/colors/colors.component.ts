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

    public statusClasses = [
        { color: 'sme-color-critical', icon: 'sme-icon-statusErrorFull' },
        { color: 'sme-color-error', icon: 'sme-icon-criticalErrorSolid' },
        { color: 'sme-color-warning', icon: 'sme-icon-warningSolid' },
        { color: 'sme-color-important', icon: 'sme-icon-playPause' },
        { color: 'sme-color-progress', icon: 'sme-icon-syncStatusSolid' },
        { color: 'sme-color-info', icon: 'sme-icon-infoSolid' },
        { color: 'sme-color-success', icon: 'sme-icon-completedSolid' },
        { color: 'sme-color-neutral', icon: 'sme-icon-unknownSolid' },
        { color: 'sme-color-upsell', icon: 'sme-icon-heart' }
    ];


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
