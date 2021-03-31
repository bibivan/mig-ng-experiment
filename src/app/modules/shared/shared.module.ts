import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatAutocompleteModule } from '@angular/material/autocomplete'

import {
  InvalidControlFocusDirective
} from '../../directives/invalid-control-focus.directive'
import { CurrencyRubPipe } from '../../pipes/currency-rub.pipe'
import { ErrorMessagePipe } from '../../pipes/error-message.pipe'
import { MobilePhonePipe } from '../../pipes/mobile-phone.pipe'
import { TermLoanPipe } from '../../pipes/term-loan.pipe'
import { TimerTimePipe } from '../../pipes/timer-time.pipe'
import { ButtonTextModule } from './ui/button-text/button-text.module'
import { ButtonModule } from './ui/button/button.module'
import { IconModule } from './ui/icon/icon.module'

@NgModule({
  declarations: [
    ErrorMessagePipe,
    CurrencyRubPipe,
    TermLoanPipe,
    MobilePhonePipe,
    TimerTimePipe,
    InvalidControlFocusDirective,
  ],
  imports: [
    CommonModule,
    IconModule,
    ButtonModule,
    ButtonTextModule,
    MatAutocompleteModule,
  ],
  exports: [
    ErrorMessagePipe,
    CurrencyRubPipe,
    TermLoanPipe,
    MobilePhonePipe,
    TimerTimePipe,
    InvalidControlFocusDirective,
  ],
})
export class SharedModule {}
