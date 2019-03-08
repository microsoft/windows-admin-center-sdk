import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MsftSmeExperimentsComponent } from './experiments.component';

@NgModule({
    declarations: [MsftSmeExperimentsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: MsftSmeExperimentsComponent }])]
})
export class MsftSmeExperimentsModule { }
