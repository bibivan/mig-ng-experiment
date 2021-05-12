import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ContainerModule } from '../../shared/container/container.module'
import { FormWrapperModule } from '../../shared/form-wrapper/form-wrapper.module'
import { StepPreloaderComponent } from './step-preloader.component'


@NgModule({
  declarations: [StepPreloaderComponent],
  exports: [
    StepPreloaderComponent
  ],
  imports: [
    CommonModule,
    ContainerModule,
    FormWrapperModule
  ]
})
export class StepPreloaderModule {}
