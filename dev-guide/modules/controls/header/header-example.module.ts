import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BadgeModule } from '@msft-sme/angular';
import { HeaderModule } from '@msft-sme/angular';
import { HeaderExampleComponent } from './header-example.component';

const HeaderExampleRoutes: Routes = [
    {
        path: '',
        component: HeaderExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [HeaderExampleComponent],
    imports: [
        CommonModule,
        BadgeModule,
        HeaderModule,
        RouterModule.forChild(HeaderExampleRoutes)
    ],
    exports: [HeaderExampleComponent]
})
export class HeaderExampleModule { }
