import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from '../../shared/button/button.module'
import { ContainerModule } from '../../shared/container/container.module'
import { FormProgressModule } from '../../shared/form-progress/form-progress.module'
import { FormWrapperModule } from '../../shared/form-wrapper/form-wrapper.module'
import { IconModule } from '../../shared/icon/icon.module'
import { InputCheckboxModule } from '../../shared/input-checkbox/input-checkbox.module'
import { InputModule } from '../../shared/input/input.module'
import { KladrAddressModule } from '../../shared/kladr-address/kladr-address.module'
import { ModalModule } from '../../shared/modal/modal.module'
import { SecurityMessageModule } from '../../shared/security-message/security-message.module'
import { SharedModule } from '../../shared/shared.module'
import { TextareaModule } from '../../shared/textarea/textarea.module'
import { SnilsHintModule } from '../hints/snils-hint/snils-hint.module'
import { PassportComponent } from './passport.component';



@NgModule({
  declarations: [
    PassportComponent,
  ],
  exports: [
    PassportComponent
  ],
  imports: [
    CommonModule,
    FormProgressModule,
    ContainerModule,
    FormWrapperModule,
    InputModule,
    SharedModule,
    ReactiveFormsModule,
    TextareaModule,
    InputCheckboxModule,
    KladrAddressModule,
    SecurityMessageModule,
    ButtonModule,
    IconModule,
    ModalModule,
    SnilsHintModule,
  ]
})
export class PassportModule { }
