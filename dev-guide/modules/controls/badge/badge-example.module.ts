import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BadgeModule, SmeFormsModule, TooltipModule } from '@msft-sme/angular';
import { BadgeExampleComponent } from './badge-example.component';

const BadgeExampleRoutes: Routes = [
    {
        path: '',
        component: BadgeExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [BadgeExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        BadgeModule,
        FormsModule,
        SmeFormsModule,
        RouterModule.forChild(BadgeExampleRoutes)
    ],
    exports: [BadgeExampleComponent]
})
export class BadgeExampleModule { }
