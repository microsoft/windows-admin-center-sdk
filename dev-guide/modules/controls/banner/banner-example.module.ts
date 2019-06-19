import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerModule, TooltipModule } from '@msft-sme/angular';
import { BannerExampleComponent } from './banner-example.component';

const BannerExampleRoutes: Routes = [
    {
        path: '',
        component: BannerExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [BannerExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        BannerModule,
        RouterModule.forChild(BannerExampleRoutes)
    ],
    exports: [BannerExampleComponent]
})
export class BannerExampleModule { }
