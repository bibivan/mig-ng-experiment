import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatSliderModule } from '@angular/material/slider'
import { InputModule } from '../input/input.module'
import { PreloaderModule } from '../preloader/preloader.module'
import { SharedModule } from '../shared.module'
import { CalculatorComponent } from './calculator.component'


@NgModule({
  declarations: [CalculatorComponent],
  exports: [
    CalculatorComponent
  ],
  imports: [
    CommonModule,
    PreloaderModule,
    SharedModule,
    MatSliderModule,
    InputModule,
    ReactiveFormsModule
  ]
})
export class CalculatorModule {}
