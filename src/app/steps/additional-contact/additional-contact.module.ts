import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalContactComponent } from './additional-contact.component';



@NgModule({
  declarations: [
    AdditionalContactComponent
  ],
  exports: [
    AdditionalContactComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdditionalContactModule { }
