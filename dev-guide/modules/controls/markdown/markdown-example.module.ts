import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule, TooltipModule } from '@msft-sme/angular';
import { MarkdownExampleComponent } from './markdown-example.component';

const MarkdownExampleRoutes: Routes = [
    {
        path: '',
        component: MarkdownExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [MarkdownExampleComponent],
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule,
        MarkdownModule,
        RouterModule.forChild(MarkdownExampleRoutes)
    ],
    exports: [MarkdownExampleComponent]
})
export class MarkdownExampleModule { }
