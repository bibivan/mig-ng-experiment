import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input.component';
import {NgxMaskModule} from "ngx-mask";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxCurrencyModule} from "ngx-currency";
import {PreloaderModule} from "../preloader/preloader.module";


@NgModule({
  declarations: [InputComponent],
  exports: [
    InputComponent
  ],
    imports: [
        CommonModule,
        NgxMaskModule.forRoot(),
        ReactiveFormsModule,
        NgxCurrencyModule,
        PreloaderModule
    ]
})
export class InputModule {
}
