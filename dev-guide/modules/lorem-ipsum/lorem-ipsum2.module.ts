import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoremIpsum2Component } from './lorem-ipsum2.component';

@NgModule({
    declarations: [LoremIpsum2Component],
    imports: [
        CommonModule
    ],
    exports: [LoremIpsum2Component]
})

export class LoremIpsum2Module { }
