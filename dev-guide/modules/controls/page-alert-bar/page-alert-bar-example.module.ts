import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAlertBarModule, TooltipModule } from '@msft-sme/angular';
import { PageAlertBarExampleComponent } from './page-alert-bar-example.component';

const PageAlertBarExampleRoutes: Routes = [
    {
        path: '',
        component: PageAlertBarExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [PageAlertBarExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        PageAlertBarModule,
        RouterModule.forChild(PageAlertBarExampleRoutes)
    ],
    exports: [PageAlertBarExampleComponent]
})
export class PageAlertBarExampleModule { }
