import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from '../../shared/button/button.module'
import { ContainerModule } from '../../shared/container/container.module'
import { FormWrapperModule } from '../../shared/form-wrapper/form-wrapper.module'
import { InputModule } from '../../shared/input/input.module'
import { SecurityMessageModule } from '../../shared/security-message/security-message.module'
import { SharedModule } from '../../shared/shared.module'
import { HoldAmountComponent } from './hold-amount.component'


@NgModule({
  declarations: [
    HoldAmountComponent
  ],
  exports: [
    HoldAmountComponent
  ],
  imports: [
    CommonModule,
    ContainerModule,
    FormWrapperModule,
    SharedModule,
    ReactiveFormsModule,
    SecurityMessageModule,
    ButtonModule,
    InputModule
  ]
})
export class HoldAmountModule {}
