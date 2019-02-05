import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@msft-sme/angular';
import { LandingComponent } from './landing.component';
import { LongRunningNotificationDialogComponent } from './long-running-notification-dialog.component';

@NgModule({
  declarations: [ LandingComponent, LongRunningNotificationDialogComponent ],
  imports: [ CommonModule, DialogModule, FormsModule, ReactiveFormsModule ],
  exports: [ LandingComponent, LongRunningNotificationDialogComponent ]
})
export class LandingModule { }
