import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from '../../shared/button/button.module'
import { InputRadioModule } from '../../shared/input-radio/input-radio.module'
import { RoundIconModule } from '../../shared/round-icon/round-icon.module'
import { SharedModule } from '../../shared/shared.module'
import { RefusalLoanComponent } from './refusal-loan.component';



@NgModule({
  declarations: [
    RefusalLoanComponent
  ],
  exports: [
    RefusalLoanComponent
  ],
  imports: [
    CommonModule,
    RoundIconModule,
    InputRadioModule,
    ReactiveFormsModule,
    ButtonModule,
    SharedModule
  ]
})
export class RefusalLoanModule { }
