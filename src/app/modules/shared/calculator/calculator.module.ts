import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatSliderModule } from '@angular/material/slider'
import { InputModule } from '../input/input.module'
import { PreloaderModule } from '../preloader/preloader.module'
import { SharedModule } from '../shared.module'
import { CalculatorComponent } from './calculator.component'
import { InputSliderModule } from '../input-slider/input-slider.module'


@NgModule({
  declarations: [CalculatorComponent],
  exports: [
    CalculatorComponent
  ],
  imports: [
    CommonModule,
    InputSliderModule,
    PreloaderModule,
    SharedModule,
    MatSliderModule,
    InputModule,
    ReactiveFormsModule
  ]
})
export class CalculatorModule {}
