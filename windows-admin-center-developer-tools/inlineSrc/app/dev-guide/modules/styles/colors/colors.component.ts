import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-colors',
    template: `
      <div class="sme-layout-absolute sme-position-inset-none sme-documentation">
        <h1>Colors</h1>
        <section>
          <p>
            <span>In general,</span>
            <a class="sme-link" routerLink="/dev/styles/schemes">Schemes</a>
            <span>should be used instead of these color utilities.</span>
          </p>
          <p>Hover over a color to get the classes accosiated with it</p>
        </section>
        <h2>Named Colors</h2>
        <section>
          <p>These colors change with the current theme.</p>
          <div *ngFor="let color of namedColors">
            <h3>{{getColorName(color)}}</h3>
            <div class="sme-arrange-stack-h sme-margin-bottom-sm">
              <div class="sme-square-md" [ngClass]="'sme-background-color-' + color" [title]="getColorClasses(color)"></div>
              <div *ngFor="let mix of mixes" class="sme-square-md" [ngClass]="'sme-background-color-' + color + '-' + mix" [title]="getColorClasses(color, mix)"></div>
            </div>
          </div>
        </section>
        <h2>Base Colors</h2>
        <section>
          <p>These colors do not change with the current theme.</p>
          <div *ngFor="let color of baseColors">
            <h3>{{getColorName(color)}}</h3>
            <div class="sme-arrange-stack-h sme-margin-bottom-sm">
              <div class="sme-square-md" [ngClass]="'sme-background-color-' + color" [title]="getColorClasses(color)"></div>
              <div *ngFor="let mix of mixes" class="sme-square-md" [ngClass]="'sme-background-color-' + color + '-' + mix" [title]="getColorClasses(color, mix)"></div>
            </div>
          </div>
        </section>
      </div>
    `
})
export class ColorsComponent {

    public namedColors = ['base', 'alt', 'accent'];
    public baseColors = ['white', 'black', 'blue', 'purple', 'magenta', 'red', 'orange', 'yellow', 'green', 'teal', 'dark-blue'];
    public mixes = [90, 80, 70, 60, 50, 40, 30, 20, 15, 10, 5];

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Colors';
    }

    public getColorName(color: string) {
        return color.charAt(0).toUpperCase() + color.slice(1)
    }

    public getColorClasses(color: string, mix?: number) {
        let classString = mix ? `${color}-${mix}` : color;
        return `.sme-color-${classString}
.sme-background-color-${classString}
.sme-border-color-${classString}
.sme-border-top-color-${classString}
.sme-border-left-color-${classString}
.sme-border-bottom-color-${classString}
.sme-border-right-color-${classString}`
    }
}
