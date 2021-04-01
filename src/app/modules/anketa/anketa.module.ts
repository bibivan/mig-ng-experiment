import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { CalculatorModule } from '../calculator/calculator.module'
import { FormProgressModule } from '../form-progress/form-progress.module'
import { ButtonModule } from '../shared/button/button.module'
import { FormWrapperModule } from '../shared/form-wrapper/form-wrapper.module'
import { InputCheckboxModule } from '../shared/input-checkbox/input-checkbox.module'
import { InputModule } from '../shared/input/input.module'
import { SharedModule } from '../shared/shared.module'
import { AnketaComponent } from './anketa.component';



@NgModule({
  declarations: [AnketaComponent],
  exports: [
    AnketaComponent
  ],
  imports: [
    CommonModule,
    FormProgressModule,
    FormWrapperModule,
    CalculatorModule,
    SharedModule,
    ReactiveFormsModule,
    InputModule,
    InputCheckboxModule,
    ButtonModule
  ]
})
export class AnketaModule { }
