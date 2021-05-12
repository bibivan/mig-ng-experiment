import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ContainerModule } from '../../shared/container/container.module'
import { FormWrapperModule } from '../../shared/form-wrapper/form-wrapper.module'
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
    FormWrapperModule
  ]
})
export class ContractModule {}
