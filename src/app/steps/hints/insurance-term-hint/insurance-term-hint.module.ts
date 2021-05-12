import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ButtonModule } from '../../../shared/button/button.module'
import { InsuranceTermHintComponent } from './insurance-term-hint.component'


@NgModule({
  declarations: [
    InsuranceTermHintComponent
  ],
  exports: [
    InsuranceTermHintComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class InsuranceTermHintModule {}
