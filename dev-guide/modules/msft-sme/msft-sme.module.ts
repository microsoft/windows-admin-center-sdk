import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { routing } from './msft-sme.routing';

import { MsftSmeComponent } from './msft-sme.component';

@NgModule({
    declarations: [MsftSmeComponent],
    imports: [routing, CommonModule]
})
export class MsftSmeModule { }
