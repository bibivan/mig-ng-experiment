import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormWrapperComponent } from './form-wrapper.component'


@NgModule({
  declarations: [FormWrapperComponent],
  exports: [
    FormWrapperComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormWrapperModule {
}
