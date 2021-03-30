import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoundIconComponent} from './round-icon.component';
import {IconModule} from "../icon/icon.module";


@NgModule({
  declarations: [RoundIconComponent],
  exports: [RoundIconComponent],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class RoundIconModule {
}
