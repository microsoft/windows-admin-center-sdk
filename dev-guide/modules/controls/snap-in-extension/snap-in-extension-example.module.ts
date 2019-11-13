import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule, SnapInExtensionModule } from '@msft-sme/angular';
import { SnapInExtensionExampleComponent } from './snap-in-extension-example.component';

const SnapInExtensionExampleRoutes: Routes = [
    {
        path: '',
        component: SnapInExtensionExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    declarations: [SnapInExtensionExampleComponent],
    imports: [
        CommonModule,
        SnapInExtensionModule,
        LayoutModule,
        RouterModule.forChild(SnapInExtensionExampleRoutes)
    ],
    exports: [SnapInExtensionExampleComponent]
})
export class SnapInExtensionExampleModule { }
