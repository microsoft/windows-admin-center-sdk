import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconModule, TooltipModule } from '@msft-sme/angular';
import { LayeredIconsExampleComponent } from './layered-icons-example.component';

const LayeredIconsExampleRoutes: Routes = [
    {
        path: '',
        component: LayeredIconsExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [LayeredIconsExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        IconModule,
        RouterModule.forChild(LayeredIconsExampleRoutes)
    ],
    exports: [LayeredIconsExampleComponent]
})
export class LayeredIconsExampleModule { }
