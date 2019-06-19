import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { SchemesComponent } from './schemes.component';

const SchemesRoutes: Routes = [
    {
        path: '',
        component: SchemesComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [SchemesComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(SchemesRoutes)
    ],
    exports: [SchemesComponent]
})
export class SchemesStylesModule { }
