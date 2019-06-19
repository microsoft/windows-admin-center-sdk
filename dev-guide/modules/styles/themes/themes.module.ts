import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { ThemesComponent } from './themes.component';

const ThemesRoutes: Routes = [
    {
        path: '',
        component: ThemesComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [ThemesComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(ThemesRoutes)
    ],
    exports: [ThemesComponent]
})
export class ThemeStylesModule { }
