import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormWrapperComponent} from "./form-wrapper.component";


@NgModule({
  declarations: [FormWrapperComponent],
  exports: [
    FormWrapperComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormWrapperModule {
}
