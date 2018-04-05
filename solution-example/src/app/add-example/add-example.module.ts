import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddExampleComponent } from './add-example.component';
import { Routing } from './add-example.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Routing
  ],
  declarations: [AddExampleComponent]
})
export class AddExampleModule { }
