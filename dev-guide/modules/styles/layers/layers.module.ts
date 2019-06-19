import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { LayersComponent } from './layers.component';

const LayersRoutes: Routes = [
    {
        path: '',
        component: LayersComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [LayersComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(LayersRoutes)
    ],
    exports: [LayersComponent]
})
export class LayerStylesModule { }
