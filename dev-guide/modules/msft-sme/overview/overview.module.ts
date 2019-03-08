import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MsftSmeOverviewComponent } from './overview.component';

@NgModule({
    declarations: [MsftSmeOverviewComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: MsftSmeOverviewComponent }])]
})
export class MsftSmeOverviewModule { }
