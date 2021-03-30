import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputRadioComponent} from './input-radio.component';
import {IconModule} from "../icon/icon.module";

@NgModule({
  declarations: [InputRadioComponent],
  exports: [
    InputRadioComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class InputRadioModule {
}
