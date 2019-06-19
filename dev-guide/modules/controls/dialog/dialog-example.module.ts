import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogModule, LoadingWheelModule, TooltipModule } from '@msft-sme/angular';
import { DialogChainComponent } from './dialog-example-dialog-chain.component';
import { FullScreenExampleDialogComponent } from './dialog-example-full-screen-dialog.component';
import { DialogExampleComponent } from './dialog-example.component';

const DialogExampleRoutes: Routes = [
    {
        path: '',
        component: DialogExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [
        DialogExampleComponent,
        DialogChainComponent,
        FullScreenExampleDialogComponent
    ],
    imports: [
        CommonModule,
        TooltipModule,
        DialogModule,
        LoadingWheelModule,
        RouterModule.forChild(DialogExampleRoutes)
    ],
    exports: [DialogExampleComponent]
})
export class DialogExampleModule { }
