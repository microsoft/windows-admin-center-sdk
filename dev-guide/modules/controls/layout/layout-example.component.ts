import { Component, ViewChild } from '@angular/core';
import { LayoutComponent } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-controls-layout-example',
    templateUrl: './layout-example.component.html'
})
export class LayoutExampleComponent {
    @ViewChild(LayoutComponent)
    private layoutComponent: LayoutComponent;

    public currentDefinition: string;
    public tabIndex = 1;
    public testDataList = [];

    public getCurrentLayoutDefinitionName(): string {
        if (this.layoutComponent && this.layoutComponent.currentLayoutDefinition) {
            return this.layoutComponent.currentLayoutDefinition.name;
        }
    }
}
