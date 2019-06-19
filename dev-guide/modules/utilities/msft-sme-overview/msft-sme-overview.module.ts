import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { MsftSmeOverviewComponent } from './msft-sme-overview.component';

const routes: Routes = [
    {
        path: '',
        component: MsftSmeOverviewComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [MsftSmeOverviewComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(routes)
    ],
    exports: [MsftSmeOverviewComponent]
})
export class MsftSmeOverviewModule { }
