import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSliderComponent } from './input-slider.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxCurrencyModule} from "ngx-currency";
import {MatSliderModule} from "@angular/material/slider";



@NgModule({
  declarations: [InputSliderComponent],
  exports: [
    InputSliderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSliderModule,
    NgxCurrencyModule
  ]
})
export class InputSliderModule { }
