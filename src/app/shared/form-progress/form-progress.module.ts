import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ContainerModule } from '../container/container.module'
import { FormProgressComponent } from './form-progress.component'


@NgModule({
  declarations: [FormProgressComponent],
  exports: [
    FormProgressComponent]
  ,
  imports: [
    CommonModule,
    ContainerModule
  ]
})
export class FormProgressModule {
}
