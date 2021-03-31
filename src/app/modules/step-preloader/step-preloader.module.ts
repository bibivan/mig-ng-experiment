import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StepPreloaderComponent } from './step-preloader.component'


@NgModule({
  declarations: [StepPreloaderComponent],
  exports: [
    StepPreloaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StepPreloaderModule {}
