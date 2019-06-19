import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoremIpsum1Component } from './lorem-ipsum1.component';

@NgModule({
    declarations: [LoremIpsum1Component],
    imports: [
        CommonModule
    ],
    exports: [LoremIpsum1Component]
})

export class LoremIpsum1Module { }
