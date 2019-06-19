import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { LinksComponent } from './links.component';

const LinksRoutes: Routes = [
    {
        path: '',
        component: LinksComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [LinksComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(LinksRoutes)
    ],
    exports: [LinksComponent]
})
export class LinkStylesModule { }
