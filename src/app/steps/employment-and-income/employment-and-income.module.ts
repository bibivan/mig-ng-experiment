import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonTextModule } from '../../shared/button-text/button-text.module'
import { ButtonModule } from '../../shared/button/button.module'
import { ContainerModule } from '../../shared/container/container.module'
import { FormProgressModule } from '../../shared/form-progress/form-progress.module'
import { FormWrapperModule } from '../../shared/form-wrapper/form-wrapper.module'
import { InputModule } from '../../shared/input/input.module'
import { SecurityMessageModule } from '../../shared/security-message/security-message.module'
import { SelectModule } from '../../shared/select/select.module'
import { SharedModule } from '../../shared/shared.module'
import { EmploymentAndIncomeComponent } from './employment-and-income.component';



@NgModule({
  declarations: [
    EmploymentAndIncomeComponent
  ],
  exports: [
    EmploymentAndIncomeComponent
  ],
  imports: [
    CommonModule,
    FormProgressModule,
    ContainerModule,
    FormWrapperModule,
    SharedModule,
    ReactiveFormsModule,
    SelectModule,
    InputModule,
    SecurityMessageModule,
    ButtonModule,
    ButtonTextModule
  ]
})
export class EmploymentAndIncomeModule { }
