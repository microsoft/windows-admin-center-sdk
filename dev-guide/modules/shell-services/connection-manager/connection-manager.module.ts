import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from '@msft-sme/angular';
import { ConnectionManagerComponent } from './connection-manager.component';

const ConnectionManagerRoutes: Routes = [
    {
        path: '',
        component: ConnectionManagerComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [
        ConnectionManagerComponent,
    ],
    imports: [
        CommonModule,
        MarkdownModule,
        RouterModule.forChild(ConnectionManagerRoutes)
    ],
    exports: [ConnectionManagerComponent]
})
export class ConnectionManagerModule { }
