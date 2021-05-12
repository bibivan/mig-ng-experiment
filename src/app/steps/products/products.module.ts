import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonTextModule } from '../../shared/button-text/button-text.module'
import { ButtonModule } from '../../shared/button/button.module'
import { ContainerModule } from '../../shared/container/container.module'
import { FormWrapperModule } from '../../shared/form-wrapper/form-wrapper.module'
import { IconModule } from '../../shared/icon/icon.module'
import { InputCheckboxModule } from '../../shared/input-checkbox/input-checkbox.module'
import { ModalModule } from '../../shared/modal/modal.module'
import { RoundIconModule } from '../../shared/round-icon/round-icon.module'
import { SharedModule } from '../../shared/shared.module'
import { ProductsComponent } from './products.component'


@NgModule({
  declarations: [
    ProductsComponent,
  ],
  exports: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ContainerModule,
    FormWrapperModule,
    SharedModule,
    IconModule,
    ButtonTextModule,
    ButtonModule,
    ModalModule,
    InputCheckboxModule,
    ReactiveFormsModule,
    RoundIconModule
  ]
})
export class ProductsModule {}
