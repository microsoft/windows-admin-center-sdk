import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-controls-loading-wheel-example',
    templateUrl: './loading-wheel-example.component.html'
})
export class LoadingWheelExampleComponent {
    public clicked = false;

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-loading-wheel';
    }

    public get status(): string {
        return this.clicked ? '(clicked)' : 'Taking longer';
    }

    public onClick(): void {
        this.clicked = !this.clicked;
    }
}
