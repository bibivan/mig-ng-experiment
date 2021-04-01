import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormProgressComponent } from './form-progress.component'
import { ContainerModule } from '../shared/container/container.module'


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
