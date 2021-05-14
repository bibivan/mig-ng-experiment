import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonFilesModule } from '../../shared/button-files/button-files.module'
import { ButtonModule } from '../../shared/button/button.module'
import { ContainerModule } from '../../shared/container/container.module'
import { FormWrapperModule } from '../../shared/form-wrapper/form-wrapper.module'
import { IconModule } from '../../shared/icon/icon.module'
import { InputModule } from '../../shared/input/input.module'
import { SharedModule } from '../../shared/shared.module'
import { ContractComponent } from './contract.component'


@NgModule({
  declarations: [
    ContractComponent
  ],
  exports: [
    ContractComponent
  ],
  imports: [
    CommonModule,
    ContainerModule,
    FormWrapperModule,
    SharedModule,
    IconModule,
    ButtonFilesModule,
    ButtonModule,
    InputModule,
    ReactiveFormsModule
  ]
})
export class ContractModule {}
