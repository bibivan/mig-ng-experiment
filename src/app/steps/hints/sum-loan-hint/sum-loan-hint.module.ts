import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ButtonModule } from '../../../shared/button/button.module'
import { RoundIconModule } from '../../../shared/round-icon/round-icon.module'
import { SumLoanHintComponent } from './sum-loan-hint.component'


@NgModule({
  declarations: [
    SumLoanHintComponent
  ],
  exports: [
    SumLoanHintComponent
  ],
  imports: [
    CommonModule,
    RoundIconModule,
    ButtonModule
  ]
})
export class SumLoanHintModule {}
