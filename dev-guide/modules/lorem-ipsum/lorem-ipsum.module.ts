import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoremIpsumComponent } from './lorem-ipsum.component';

@NgModule({
  declarations: [LoremIpsumComponent],
  imports: [CommonModule],
  exports: [LoremIpsumComponent]
})
export class LoremIpsumModule { }
