import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {InputCheckboxComponent} from './input-checkbox.component'
import {IconModule} from '../icon/icon.module'


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
