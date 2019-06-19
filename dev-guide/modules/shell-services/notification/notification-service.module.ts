import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ActionsModule, DialogMode, DialogModule, SmeFormsModule, TooltipModule } from '@msft-sme/angular';
import { LongRunningNotificationDialogComponent } from './long-running-notification-dialog/long-running-notification-dialog.component';
import { NotificationServiceExampleComponent } from './notification-service.component';

const routes: Routes = [
    {
        path: '',
        component: NotificationServiceExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [
        NotificationServiceExampleComponent,
        LongRunningNotificationDialogComponent
    ],
    imports: [
        ActionsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SmeFormsModule,
        TooltipModule,
        DialogModule,
        RouterModule.forChild(routes)
    ]
})
export class NotificationServiceExampleModule { }
