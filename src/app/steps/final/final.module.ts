import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ButtonModule } from '../../shared/button/button.module'
import { ContainerModule } from '../../shared/container/container.module'
import { FinalIconModule } from '../../shared/final-icon/final-icon.module'
import { FormWrapperModule } from '../../shared/form-wrapper/form-wrapper.module'
import { RoundIconModule } from '../../shared/round-icon/round-icon.module'
import { FinalComponent } from './final.component'


@NgModule({
  declarations: [
    FinalComponent
  ],
  exports: [
    FinalComponent
  ],
  imports: [
    CommonModule,
    ContainerModule,
    FormWrapperModule,
    RoundIconModule,
    FinalIconModule,
    ButtonModule
  ]
})
export class FinalModule {}
