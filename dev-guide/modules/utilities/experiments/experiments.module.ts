import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { MsftSmeExperimentsComponent } from './experiments.component';

const routes: Routes = [
    {
        path: '',
        component: MsftSmeExperimentsComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [MsftSmeExperimentsComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(routes)
    ],
    exports: [MsftSmeExperimentsComponent]
})
export class MsftSmeExperimentsModule { }
