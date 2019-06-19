import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-loading-wheel',
    templateUrl: './loading-wheel-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Loading Wheel Component'
})
export class LoadingWheelExampleComponent {
    public clicked = false;

    public get status(): string {
        return this.clicked ? '(clicked)' : 'Taking longer';
    }

    public onClick(): void {
        this.clicked = !this.clicked;
    }
}
