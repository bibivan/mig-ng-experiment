import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from '../../shared/button/button.module'
import { ContainerModule } from '../../shared/container/container.module'
import { FormProgressModule } from '../../shared/form-progress/form-progress.module'
import { FormWrapperModule } from '../../shared/form-wrapper/form-wrapper.module'
import { InputModule } from '../../shared/input/input.module'
import { SecurityMessageModule } from '../../shared/security-message/security-message.module'
import { SelectModule } from '../../shared/select/select.module'
import { SharedModule } from '../../shared/shared.module'
import { AdditionalContactComponent } from './additional-contact.component'


@NgModule({
  declarations: [
    AdditionalContactComponent
  ],
  exports: [
    AdditionalContactComponent
  ],
  imports: [
    CommonModule,
    FormProgressModule,
    ContainerModule,
    FormWrapperModule,
    InputModule,
    ReactiveFormsModule,
    SharedModule,
    SelectModule,
    SecurityMessageModule,
    ButtonModule
  ]
})
export class AdditionalContactModule {}
