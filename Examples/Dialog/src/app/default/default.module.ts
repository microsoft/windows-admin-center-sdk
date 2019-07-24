import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule, TooltipModule } from '@microsoft/windows-admin-center-sdk/angular';

import { CredentialDialogComponent } from './credential-dialog/credential-dialog.component';
import { DefaultComponent } from './default.component';
import { Routing } from './default.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    DialogModule,
    Routing
  ],
  declarations: [DefaultComponent, CredentialDialogComponent]
})
export class DefaultModule { }
