import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HighlightPipeModule, TooltipModule } from '@msft-sme/angular';
import { HighlightExampleComponent } from './highlight-example.component';

const routes: Routes = [
    {
        path: '',
        component: HighlightExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [HighlightExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        HighlightPipeModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [HighlightExampleComponent]
})
export class HighlightExampleModule { }
