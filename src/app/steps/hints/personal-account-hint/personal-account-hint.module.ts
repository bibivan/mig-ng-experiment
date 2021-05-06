import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../../../shared/button/button.module'
import { RoundIconModule } from '../../../shared/round-icon/round-icon.module'
import { PersonalAccountHintComponent } from './personal-account-hint.component';



@NgModule({
  declarations: [
    PersonalAccountHintComponent
  ],
  exports: [
    PersonalAccountHintComponent
  ],
  imports: [
    CommonModule,
    RoundIconModule,
    ButtonModule
  ]
})
export class PersonalAccountHintModule { }
