import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonTextModule } from '../../shared/button-text/button-text.module'
import { CalculatorModule } from '../../shared/calculator/calculator.module'
import { FormProgressModule } from '../../shared/form-progress/form-progress.module'
import { ButtonModule } from '../../shared/button/button.module'
import { ContainerModule } from '../../shared/container/container.module'
import { FormWrapperModule } from '../../shared/form-wrapper/form-wrapper.module'
import { IconModule } from '../../shared/icon/icon.module'
import { InputCheckboxModule } from '../../shared/input-checkbox/input-checkbox.module'
import { InputModule } from '../../shared/input/input.module'
import { ModalModule } from '../../shared/modal/modal.module'
import { SharedModule } from '../../shared/shared.module'
import { AnketaComponent } from './anketa.component'


@NgModule({
  declarations: [AnketaComponent],
  exports: [
    AnketaComponent
  ],
  imports: [
    CommonModule,
    FormProgressModule,
    FormWrapperModule,
    CalculatorModule,
    SharedModule,
    ReactiveFormsModule,
    InputModule,
    InputCheckboxModule,
    ButtonModule,
    ContainerModule,
    ModalModule,
    IconModule,
    ButtonTextModule
  ]
})
export class AnketaModule {}
