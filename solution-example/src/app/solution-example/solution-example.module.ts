import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolutionExampleComponent } from './solution-example.component';
import { Routing } from './solutionExample.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Routing
  ],
  declarations: [SolutionExampleComponent]
})
export class SolutionExampleModule { }
