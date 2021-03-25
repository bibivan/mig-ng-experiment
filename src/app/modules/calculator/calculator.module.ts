import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import {InputSliderModule} from "../../shared/ui/input-slider/input-slider.module";



@NgModule({
  declarations: [CalculatorComponent],
  exports: [
    CalculatorComponent
  ],
  imports: [
    CommonModule,
    InputSliderModule
  ]
})
export class CalculatorModule { }
