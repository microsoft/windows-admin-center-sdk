import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PropertyGridModule, SmeFormsModule, TooltipModule } from '@msft-sme/angular';
import { PropertyGridExampleComponent } from './property-grid-example.component';

const PropertyGridExampleRoutes: Routes = [
    {
        path: '',
        component: PropertyGridExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [PropertyGridExampleComponent],
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule,
        PropertyGridModule,
        SmeFormsModule,
        RouterModule.forChild(PropertyGridExampleRoutes)
    ],
    exports: [PropertyGridExampleComponent]
})
export class PropertyGridExampleModule { }
