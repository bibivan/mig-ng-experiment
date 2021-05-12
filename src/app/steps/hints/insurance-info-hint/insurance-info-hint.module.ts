import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ButtonModule } from '../../../shared/button/button.module'
import { RoundIconModule } from '../../../shared/round-icon/round-icon.module'
import { InsuranceInfoHintComponent } from './insurance-info-hint.component'


@NgModule({
  declarations: [
    InsuranceInfoHintComponent
  ],
  exports: [
    InsuranceInfoHintComponent
  ],
  imports: [
    CommonModule,
    RoundIconModule,
    ButtonModule
  ]
})
export class InsuranceInfoHintModule {}
