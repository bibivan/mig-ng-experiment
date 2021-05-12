import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { IconModule } from '../icon/icon.module'
import { InputRadioComponent } from './input-radio.component'

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
