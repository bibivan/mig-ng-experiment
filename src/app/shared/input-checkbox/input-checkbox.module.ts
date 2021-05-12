import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { IconModule } from '../icon/icon.module'
import { InputCheckboxComponent } from './input-checkbox.component'


@NgModule({
  declarations: [InputCheckboxComponent],
  exports: [
    InputCheckboxComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class InputCheckboxModule {
}
