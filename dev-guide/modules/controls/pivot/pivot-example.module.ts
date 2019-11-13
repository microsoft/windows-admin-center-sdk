import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PivotModule, TooltipModule } from '@msft-sme/angular';
import { LoremIpsumModule } from '../../lorem-ipsum/lorem-ipsum.module';
import { LoremIpsum1Component } from '../../lorem-ipsum/lorem-ipsum1.component';
import { LoremIpsum1Module } from '../../lorem-ipsum/lorem-ipsum1.module';
import { LoremIpsum2Component } from '../../lorem-ipsum/lorem-ipsum2.component';
import { LoremIpsum2Module } from '../../lorem-ipsum/lorem-ipsum2.module';
import { PivotExampleComponent } from './pivot-example.component';

const PivotExampleRoutes: Routes = [
    {
        path: '',
        component: PivotExampleComponent,
        children: [
            {
                path: 'lorem-ipsum1',
                component: LoremIpsum1Component
            },
            {
                path: 'lorem-ipsum2',
                component: LoremIpsum2Component
            },
            {
                path: 'lorem-ipsum3',
                component: LoremIpsum1Component
            },
            {
                path: '**',
                redirectTo: 'lorem-ipsum1'
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [PivotExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        PivotModule,
        LoremIpsumModule,
        LoremIpsum1Module,
        LoremIpsum2Module,
        RouterModule.forChild(PivotExampleRoutes)
    ],
    exports: [PivotExampleComponent]
})
export class PivotExampleModule { }
