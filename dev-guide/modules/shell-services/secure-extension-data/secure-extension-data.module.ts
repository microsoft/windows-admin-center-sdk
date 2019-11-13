import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpService, MarkdownModule } from '@msft-sme/angular';
import { Http } from '@msft-sme/core';
import { SecureExtensionDataComponent } from './secure-extension-data.component';

const ConnectionManagerRoutes: Routes = [
    {
        path: '',
        component: SecureExtensionDataComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [
        SecureExtensionDataComponent,
    ],
    imports: [
        CommonModule,
        MarkdownModule,
        RouterModule.forChild(ConnectionManagerRoutes)
    ],
    providers: [
        HttpService,
        Http
    ],
    exports: [SecureExtensionDataComponent]
})
export class SecureExtensionDataModule { }
