import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from '../../shared/button/button.module'
import { ContainerModule } from '../../shared/container/container.module'
import { FormWrapperModule } from '../../shared/form-wrapper/form-wrapper.module'
import { InputModule } from '../../shared/input/input.module'
import { RoundIconModule } from '../../shared/round-icon/round-icon.module'
import { SecurityMessageModule } from '../../shared/security-message/security-message.module'
import { SharedModule } from '../../shared/shared.module'
import { SnilsComponent } from './snils.component'


@NgModule({
  declarations: [
    SnilsComponent
  ],
  exports: [
    SnilsComponent
  ],
  imports: [
    CommonModule,
    ContainerModule,
    FormWrapperModule,
    RoundIconModule,
    ReactiveFormsModule,
    InputModule,
    SharedModule,
    SecurityMessageModule,
    ButtonModule
  ]
})
export class SnilsModule {}
