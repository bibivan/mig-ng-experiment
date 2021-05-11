import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { InputRadioComponent } from './input-radio.component'
import { IconModule } from '../icon/icon.module'

@NgModule({
  declarations: [InputRadioComponent],
  exports: [
    InputRadioComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    ReactiveFormsModule
  ]
})
export class InputRadioModule {
}
