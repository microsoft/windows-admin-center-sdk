import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { IconsComponent } from './icons.component';

const IconsRoutes: Routes = [
    {
        path: '',
        component: IconsComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [IconsComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(IconsRoutes)
    ],
    exports: [IconsComponent]
})
export class IconStylesModule { }
